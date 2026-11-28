#!/usr/bin/env node

const token = process.env.IVAN_VHS_SYNC_TOKEN;
if (!token) throw new Error('IVAN_VHS_SYNC_TOKEN is required for cross-repository contents:write and pull_requests:write access.');

const apiRoot = 'https://api.github.com';
const sourceRepo = process.env.KASKAD_REPOSITORY || 'Ivan-VHS/Kaskad';
const manifestPath = 'docs/VYUNENKO_ECOSYSTEM_SYNC.v1.json';
const markerStart = '<!-- vyunenko-k3-reference:start -->';
const markerEnd = '<!-- vyunenko-k3-reference:end -->';
const theoryUrl = 'https://github.com/' + sourceRepo + '/blob/main/docs/VYUNENKO_THEORY.md';
const proofUrl = 'https://github.com/' + sourceRepo + '/blob/main/docs/K3_CRT_IDEMPOTENTS_AND_INFINITE_CASCADES.md';
const styleUrl = 'https://github.com/Ivan-VHS/DAK/blob/main/docs/PSYCHOPORTER_DOCUMENTATION_STYLE_V1.md';

async function request(method, path, payload) {
  const response = await fetch(apiRoot + path, {
    method,
    headers: {
      Authorization: 'Bearer ' + token,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json',
      'User-Agent': 'Ivan-VHS-Vyunenko-Documentation-Sync'
    },
    body: payload === undefined ? undefined : JSON.stringify(payload)
  });
  const raw = await response.text();
  let data = null;
  if (raw) {
    try { data = JSON.parse(raw); }
    catch { data = raw; }
  }
  if (!response.ok) {
    const error = new Error(method + ' ' + path + ' returned ' + response.status + ': ' + raw.slice(0, 1200));
    error.status = response.status;
    throw error;
  }
  return data;
}

async function getOptional(path) {
  try { return await request('GET', path); }
  catch (error) {
    if (error.status === 404) return null;
    throw error;
  }
}

function apiRepo(repo, endpoint) {
  return '/repos/' + repo + endpoint;
}

function encodePath(path) {
  return path.split('/').map(encodeURIComponent).join('/');
}

async function readTextFile(repo, path, ref) {
  const url = apiRepo(repo, '/contents/' + encodePath(path)) + '?ref=' + encodeURIComponent(ref);
  const result = await getOptional(url);
  if (!result) return null;
  if (result.type !== 'file' || result.encoding !== 'base64' || typeof result.content !== 'string') {
    throw new Error('Unsupported contents response for ' + repo + ':' + path);
  }
  return {
    sha: result.sha,
    content: Buffer.from(result.content.replace(/\n/g, ''), 'base64').toString('utf8')
  };
}

async function writeTextFile(repo, path, branchName, current, content, message) {
  const payload = {
    message,
    content: Buffer.from(content, 'utf8').toString('base64'),
    branch: branchName
  };
  if (current && current.sha) payload.sha = current.sha;
  await request('PUT', apiRepo(repo, '/contents/' + encodePath(path)), payload);
}

function localizedSection(path, version) {
  const releaseLink = '[' + version + '](' + theoryUrl + ')';
  const proofLink = '[CRT and infinite-cascade proof](' + proofUrl + ')';
  const localLink = '[local research note](docs/VYUNENKO_K3_RESEARCH_REFERENCE.md)';
  const lead = 'The ' + releaseLink + ' formalizes the radix-1000 divisibility completion, compatible CRT idempotents, and unique infinite positional expansions by coefficients 0..999. ';
  const tail = 'This is a documentation-only mathematical reference; it does not add a runtime/build dependency or change local implementation, APIs, schemas, data formats, hardware behavior or licensing. See ' + proofLink + ' and the ' + localLink + '.';
  const lang = path === 'README.uk.md' ? 'uk' : path === 'README.ru.md' ? 'ru' : path === 'README.zh-CN.md' ? 'zh' : 'en';
  if (lang === 'uk') return '## Пов’язане математичне дослідження\n\n' + releaseLink + ' формалізує поповнення з основою 1000, сумісні CRT-ідемпотенти та єдині нескінченні позиційні розклади коефіцієнтами 0..999. Це лише документаційне математичне посилання: воно не додає залежності runtime/збірки й не змінює реалізацію, API, схеми, формати даних, апаратну поведінку або ліцензію. Див. ' + proofLink + ' та ' + localLink + '.';
  if (lang === 'ru') return '## Связанное математическое исследование\n\n' + releaseLink + ' формализует пополнение с основанием 1000, совместимые CRT-идемпотенты и единственные бесконечные позиционные разложения коэффициентами 0..999. Это только документационная математическая ссылка: она не добавляет runtime/build-зависимость и не меняет реализацию, API, схемы, форматы данных, аппаратное поведение или лицензию. См. ' + proofLink + ' и ' + localLink + '.';
  if (lang === 'zh') return '## 相关数学研究\n\n' + releaseLink + ' 对基数 1000 的完备化、兼容 CRT 幂等元以及系数 0..999 的唯一无限位置展开进行了形式化。这只是文档层面的数学参考；不会增加运行时/构建依赖，也不会改变本仓库的实现、API、模式、数据格式、硬件行为或许可证。参见' + proofLink + '和' + localLink + '。';
  return '## Related mathematical research\n\n' + lead + tail;
}

function replaceSection(content, path, version, repo) {
  const block = markerStart + '\n' + localizedSection(path, version) + '\n' + markerEnd;
  const start = content.indexOf(markerStart);
  if (start >= 0) {
    const end = content.indexOf(markerEnd, start);
    if (end < 0) throw new Error('Unclosed K3 sync marker in ' + repo + ':' + path);
    return content.slice(0, start) + block + content.slice(end + markerEnd.length);
  }
  const headings = [
    '## Related mathematical research',
    '## Пов’язане математичне дослідження',
    '## Пов\'язане математичне дослідження',
    '## Связанное математическое исследование',
    '## 相关数学研究'
  ];
  let oldStart = -1;
  for (const heading of headings) {
    const found = content.indexOf(heading);
    if (found >= 0 && (oldStart < 0 || found < oldStart)) oldStart = found;
  }
  if (oldStart >= 0) {
    const nextHeading = content.indexOf('\n## ', oldStart + 4);
    const end = nextHeading >= 0 ? nextHeading : content.length;
    return content.slice(0, oldStart) + block + content.slice(end);
  }
  return content.trimEnd() + '\n\n' + block + '\n';
}

function researchNote(repo, version) {
  return '# Vyunenko Theory K3 ' + version + ' — external mathematical reference\n\n' +
    '> This note is documentation-only. It does not declare a product integration or implementation.\n\n' +
    'The [canonical theory](' + theoryUrl + ') and its [CRT / infinite-cascade proof](' + proofUrl + ') formalize the radix-1000 completion, compatible orthogonal idempotents and unique infinite positional expansions by coefficients 0..999.\n\n' +
    '## Relationship to ' + repo + '\n\n' +
    'This is an external mathematical reference only. It does not import Kaskad source code, add a runtime/build dependency, change a local API/ABI/schema, alter product behavior or transfer licensing rights. Any future implementation-level adoption requires a separate versioned contract, tests and an explicit compatibility decision in the owning repository.\n\n' +
    'See the [Psychoporter 666 documentation profile](' + styleUrl + '). Existing author credits, license terms, notices and third-party attribution remain authoritative.\n';
}

function indexSection(version) {
  return '## Related mathematical research\n\n- [Vyunenko Theory K3 ' + version + ' — external research reference](VYUNENKO_K3_RESEARCH_REFERENCE.md) — CRT completion and infinite base-1000 expansions; documentation-only, no runtime dependency.';
}

async function main() {
  const manifestFile = await readTextFile(sourceRepo, 'docs/VYUNENKO_ECOSYSTEM_SYNC.v1.json', 'main');
  if (!manifestFile) throw new Error('Missing synchronization registry: ' + manifestPath);
  const manifest = JSON.parse(manifestFile.content);
  const version = manifest.theory.version;
  const branchName = 'automation/vyunenko-k3-sync-' + version.replace(/[^0-9A-Za-z-]/g, '-');
  const results = [];

  for (const entry of manifest.ecosystem_dependents || []) {
    const repo = entry.repository;
    const repoMeta = await request('GET', apiRepo(repo, ''));
    const base = repoMeta.default_branch;
    const baseRef = await request('GET', apiRepo(repo, '/git/ref/heads/' + base));
    let branchRef = await getOptional(apiRepo(repo, '/git/ref/heads/' + branchName));
    const targetRef = branchRef ? branchName : base;
    const pending = [];

    for (const path of entry.readmes || ['README.md']) {
      const current = await readTextFile(repo, path, targetRef);
      if (!current) {
        if (path === 'README.md') throw new Error('Missing root README in ' + repo);
        continue;
      }
      const desired = replaceSection(current.content, path, version, repo);
      if (desired !== current.content) pending.push({ path, desired, message: 'docs: reference Vyunenko Theory K3 ' + version });
    }

    const notePath = entry.research_reference || 'docs/VYUNENKO_K3_RESEARCH_REFERENCE.md';
    const noteCurrent = await readTextFile(repo, notePath, targetRef);
    const noteContent = researchNote(repo, version);
    if (!noteCurrent || noteCurrent.content !== noteContent) pending.push({ path: notePath, desired: noteContent, message: 'docs: add Vyunenko Theory K3 ' + version + ' research reference' });

    const indexPath = entry.index || 'docs/README.md';
    const indexCurrent = await readTextFile(repo, indexPath, targetRef);
    if (indexCurrent) {
      const section = indexSection(version);
      const hasReference = indexCurrent.content.includes('VYUNENKO_K3_RESEARCH_REFERENCE.md');
      const desired = hasReference
        ? indexCurrent.content.replace(/## Related mathematical research[\s\S]*?(?=\n## |$)/, section)
        : indexCurrent.content.trimEnd() + '\n\n' + section + '\n';
      if (desired !== indexCurrent.content) pending.push({ path: indexPath, desired, message: 'docs: index Vyunenko Theory K3 ' + version + ' reference' });
    }

    if (pending.length === 0) {
      results.push({ repository: repo, status: 'already_current', branch: branchName });
      continue;
    }

    if (!branchRef) {
      try {
        await request('POST', apiRepo(repo, '/git/refs'), { ref: 'refs/heads/' + branchName, sha: baseRef.object.sha });
      } catch (error) {
        if (error.status !== 422) throw error;
      }
      branchRef = await request('GET', apiRepo(repo, '/git/ref/heads/' + branchName));
    }

    for (const item of pending) {
      const latest = await readTextFile(repo, item.path, branchName);
      if (latest && latest.content === item.desired) continue;
      await writeTextFile(repo, item.path, branchName, latest, item.desired, item.message);
    }

    const owner = repo.split('/')[0];
    const openPulls = await request('GET', apiRepo(repo, '/pulls?state=open&head=' + encodeURIComponent(owner + ':' + branchName) + '&base=' + encodeURIComponent(base)));
    let pr = openPulls[0] || null;
    if (!pr) {
      pr = await request('POST', apiRepo(repo, '/pulls'), {
        title: '[Docs] Sync Vyunenko Theory K3 ' + version,
        head: branchName,
        base,
        draft: true,
        body: '## Automated documentation synchronization\n\nKaskad merged the canonical Vyunenko Theory K3 ' + version + ' release. This PR synchronizes localized README references, the documentation index and a local research note.\n\nThis is documentation-only: it does not import source code, add runtime dependencies, modify local APIs/schemas or transfer license rights. Existing copyright, license, NOTICE and attribution material is preserved.\n\nPlease run repository checks and review before merge. The workflow never writes directly to the target default branch.'
      });
    }
    results.push({ repository: repo, status: 'pull_request_open', branch: branchName, pull_request: pr.html_url || null, files: pending.map(item => item.path) });
  }

  process.stdout.write(JSON.stringify({ version, results }, null, 2) + '\n');
}

main().catch(error => {
  process.stderr.write(String(error && error.stack ? error.stack : error) + '\n');
  process.exitCode = 1;
});
