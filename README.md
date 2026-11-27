# Kaskad — Mathematical Research Corpus for Vyunenko Theory K3

[中文](#中文) · [English](#english) · [Русский](#русский) · [Українська](#українська)

Kaskad is a mathematical research corpus. Its subject is the formulation, analysis and proof of mathematical structures, with the Vyunenko Theory of K3 as its foundational research object. This repository is not an operating system, programming language, IDE, driver collection, application or general-purpose software platform.

**Normative documentation:** [Scientific Mathematical Documentation Standard — Cascade Edition](docs/SCIENTIFIC_MATHEMATICAL_DOCUMENTATION_STANDARD.md)  
**Language coverage:** [Language Edition Register](docs/LANGUAGE_REGISTER.md)  
**Citation:** [CITATION.cff](CITATION.cff) · [BibTeX](CITATION.bib)  
**License:** [Apache License 2.0](LICENSE)

---

## Mathematical identity

The K3 positional system uses the fixed numerical radix

\[
B=1000=10^3=2^3\cdot5^3.
\]

A finite coefficient vector \(a=(a_0,\ldots,a_m)\), indexed from the least significant position, has value

\[
\operatorname{Val}_{K3}(a)=\sum_{i=0}^{m}a_iB^i.
\]

Canonical coefficients satisfy \(0\le a_i\le999\), with the canonical text grammar specified separately.

| Symbol | Meaning | Status |
|---|---|---|
| \(B\) | Numerical radix, \(1000\) | Fixed definition |
| \(k\) | Lexical separator between adjacent text groups | Grammar symbol |
| \(S_B\) | Positional shift by one radix position | Separately defined operator |
| \(a_i\) | Coefficient at position \(i\) | Canonical range \(0,\ldots,999\) |
| \(\operatorname{Val}_{K3}\) | Polynomial evaluation map | Defined by the displayed sum |

The symbol **k is not the radix**. The expressions \(k=1000\) and \(k\equiv1000\) are invalid under the canonical notation. The numerical base is \(B=1000\); \(k\) separates text groups; \(S_B\) expresses the positional shift.

For example, **50k0k** represents \(50\cdot1000^2=50\,000\,000\), with low-to-high vector \((0,0,50)\). The multiplication **50k0k × 25** gives \(1\,250\,000\,000\), represented canonically by **1k250k0k**. The sum **999k999 + 1** equals \(1\,000\,000\) and is represented by **1k0k**.

## Mathematical foundations

The core research distinguishes textual syntax, coefficient vectors and integer values. Canonical nonnegative K3 words represent \(\mathbb N_0\) bijectively; the signed extension represents \(\mathbb Z\). This is a positional representation and formal mathematical framework, not a claim that ordinary integer arithmetic is replaced by a different number system.

The foundational corpus includes:

- Existence and uniqueness of canonical positional representation.
- Cascade carry, borrow and value-preserving normalization, including the recurrence
  \[
  c_i+t_i=Bt_{i+1}+r_i,\qquad 0\le r_i<B.
  \]
- Algebraic interpretation by polynomial evaluation and coefficient convolution.
- Modular arithmetic for the composite radix \(1000=2^3\cdot5^3\).
- Level-wise Chinese remainder decomposition
  \[
  \mathbb Z/1000^r\mathbb Z\cong
  \mathbb Z/2^{3r}\mathbb Z\times\mathbb Z/5^{3r}\mathbb Z.
  \]
- The completion as a topological ring
  \[
  \widehat{\mathbb Z}_{1000}\cong\mathbb Z_2\times\mathbb Z_5.
  \]

The composite radix imposes important restrictions. \(\mathbb Z/1000\mathbb Z\) is not a field. An element modulo \(1000^r\) is invertible exactly when \(\gcd(n,1000)=1\). The condition \(\nu_{1000}(n)=0\) alone is not an invertibility criterion, and \(\nu_{1000}\) is not a multiplicative \(p\)-adic valuation. The established divisor inequalities and their hypotheses are stated in the mathematical chapters. No cryptographic security claim follows from modular arithmetic alone.

The canonical zero word is **0**. The empty coefficient sequence, empty set, missing value and undefined value are separate objects. The empty sum is \(0\); the empty product is \(1\).

## Research scope and epistemic status

Kaskad covers mathematical logic, set theory, algebra, number theory, geometry, topology, analysis, functional analysis, trigonometry, combinatorics, probability, statistics, numerical mathematics, optimization, computability and rigorously specified interdisciplinary models. Each proposed connection to K3 must identify the mathematical map, preserved structure, assumptions and counterexamples.

Every statement is classified as appropriate: definition, axiom, assumption, lemma, theorem, corollary, conjecture, counterexample, conditional result, exhaustive finite verification, computational observation, empirical observation, numerical estimate, heuristic, rejected statement or open research program. An experiment does not become a theorem by repetition. A finite search proves only the fully enumerated finite case.

Research programs such as recursive K-suffixes and cooperative formula synthesis remain distinct from the canonical K3 foundation. Their hypotheses and models do not alter K3 semantics unless a separate formal result is established.

## Computation and reproducibility

Scripts and computational tools are optional supporting instruments for exact calculations, finite verification, counterexample search, numerical estimates and reproducible experiments. They do not replace proofs and are not the repository's primary deliverable.

For computational claims, documentation records the source revision, actual tool versions, arithmetic precision, rounding policy, input provenance, data license, SHA-256 checksums, random generator and seed where relevant, execution procedure, outputs and verification status. Unused tools or environmental requirements are marked not applicable. No particular programming language, Python package, container, GPU or runtime is mandatory by default. Unexecuted examples are not labeled as passed tests.

## Research document index

### K3 foundations

- [Vyunenko Theory K3 — foundational specification](docs/VYUNENKO_THEORY.md)
- [Chapter II — cascade balance, normalization and invariants](docs/CHAPTER_II_CASCADE_BALANCE.md)
- [Canonical K3 syntax and formal grammar](docs/K3_CANONICAL_SYNTAX.md)
- [Canonical foundations, algebra and semantics](docs/K3_CANONICAL_FOUNDATIONS_AND_ALGEBRA.md)
- [Composite-radix arithmetic: CRT, units, zero divisors and residue trees](docs/K3_COMPOSITE_RADIX_ARITHMETIC.md)
- [Classical mathematics crosswalk](docs/CLASSICAL_MATHEMATICS_CROSSWALK.md)
- [Reference principles of mathematics](docs/MATHEMATICAL_FOUNDATIONS_REFERENCE.md)

### Research methodology

- [Formal epistemic and proof framework](docs/FORMAL_EPISTEMIC_AND_PROOF_FRAMEWORK.md)
- [Mathematical domain architecture](docs/MATHEMATICAL_DOMAIN_ARCHITECTURE.md)
- [Computational methods and mathematical research contracts](docs/COMPUTATIONAL_RESEARCH_ARCHITECTURE.md)
- [Experimental, empirical and statistical method](docs/EXPERIMENTAL_EMPIRICAL_METHOD.md)
- [Mathematical research methodology and supporting computation](docs/RESEARCH_COMPUTATIONAL_FOUNDATION.md)
- [Mathematical research program roadmap](docs/RESEARCH_PLATFORM_ROADMAP.md)
- [Research record template](docs/RESEARCH_RECORD_TEMPLATE.md)
- [Theory development rules](docs/THEORY_DEVELOPMENT_RULES.md)
- [Constructive research roadmap](docs/CONSTRUCTIVE_RESEARCH_ROADMAP.md)
- [Recursive K-suffixes: speculative research review](docs/K_SUFFIX_SPECULATIVE_RESEARCH_REVIEW.md)
- [Cooperative Vitruvian formula synthesis](docs/COOPERATIVE_VITRUVIAN_FORMULA_SYNTHESIS.md)

### Verification and governance

- [K3 reference vectors](docs/K3_REFERENCE_VECTORS.json)
- [Scientific mathematical documentation standard](docs/SCIENTIFIC_MATHEMATICAL_DOCUMENTATION_STANDARD.md)
- [Language edition register](docs/LANGUAGE_REGISTER.md)
- [Project contract](project-contract.json)
- [Mathematical quality contract](quality-mathematics.json)
- [Computational quality contract](quality-computation.json)
- [Research evolution stages](engineering-evolution.v1.json)

## Citation and publication status

Cite the repository using the metadata in CITATION.cff or the BibTeX record in CITATION.bib. No DOI or arXiv identifier is currently assigned to this repository. The manuscript/preprint status must not be overstated. The repository license is Apache-2.0; see LICENSE for its exact terms.

---

## Русский

### Kaskad — математический исследовательский корпус Теории Вьюненко K3

Kaskad предназначен для математического исследования: точного определения объектов, построения моделей, формулирования гипотез, доказательства теорем, поиска контрпримеров и установления связей между математическими дисциплинами. Фундаментальный объект — Теория Вьюненко K3. Репозиторий не является ОС, языком программирования, IDE, комплектом драйверов, приложением или универсальной программной платформой.

**Нормативный стандарт:** [Научный стандарт математической документации — Cascade Edition](docs/SCIENTIFIC_MATHEMATICAL_DOCUMENTATION_STANDARD.md)  
**Реестр языков:** [Реестр языковых редакций](docs/LANGUAGE_REGISTER.md)  
**Цитирование:** [CITATION.cff](CITATION.cff) · [BibTeX](CITATION.bib)  
**Лицензия:** [Apache License 2.0](LICENSE)

### Формальная идентичность K3

Числовое основание:

\[
B=1000=10^3=2^3\cdot5^3.
\]

Для конечного вектора коэффициентов \(a=(a_0,\ldots,a_m)\), индексируемого от младшей позиции, значение задаётся формулой

\[
\operatorname{Val}_{K3}(a)=\sum_{i=0}^{m}a_iB^i.
\]

В канонической форме \(0\le a_i\le999\).

| Символ | Значение | Роль |
|---|---|---|
| \(B\) | \(1000\) | Числовое основание |
| \(k\) | Разделитель соседних текстовых групп | Символ грамматики |
| \(S_B\) | Позиционный сдвиг на одну степень \(B\) | Отдельный оператор |
| \(a_i\) | Коэффициент позиции \(i\) | Канонический диапазон \(0,\ldots,999\) |

Символ **k не является основанием**. Записи \(k=1000\) и \(k\equiv1000\) противоречат канонической нотации. Основание обозначается \(B\), разделитель — \(k\), позиционный сдвиг — \(S_B\).

Запись **50k0k** представляет \(50\cdot1000^2=50\,000\,000\), её вектор от младшей позиции к старшей равен \((0,0,50)\). Умножение **50k0k × 25** даёт \(1\,250\,000\,000\), каноническая запись — **1k250k0k**. Сумма **999k999 + 1** равна \(1\,000\,000\) и записывается **1k0k**.

### Математические основания

Канонические неотрицательные записи K3 взаимно однозначно представляют \(\mathbb N_0\); знаковое расширение представляет \(\mathbb Z\). Теория не утверждает, что заменяет классическую арифметику: она задаёт фиксированное позиционное представление и исследует его структуру.

Основной корпус включает теорему единственности разложения, каскадный перенос и заём, нормализацию с сохранением значения, полиномиальную оценку, свёртку коэффициентов, арифметику составного основания, китайское разложение остатков и топологическое пополнение.

\[
\mathbb Z/1000^r\mathbb Z\cong
\mathbb Z/2^{3r}\mathbb Z\times\mathbb Z/5^{3r}\mathbb Z,
\qquad
\widehat{\mathbb Z}_{1000}\cong\mathbb Z_2\times\mathbb Z_5.
\]

Основание \(1000\) составное. Кольцо \(\mathbb Z/1000\mathbb Z\) не является полем. Обратимость по модулю \(1000^r\) эквивалентна \(\gcd(n,1000)=1\). Условие \(\nu_{1000}(n)=0\) само по себе не гарантирует обратимость; \(\nu_{1000}\) не является мультипликативной \(p\)-адической оценкой. Ноль, пустая последовательность коэффициентов, пустое множество, отсутствующее и неопределённое значения — разные объекты. Пустая сумма равна \(0\), пустое произведение — \(1\).

### Область исследования и статус результатов

Kaskad охватывает математическую логику, теорию множеств, алгебру, теорию чисел, геометрию, топологию, анализ, функциональный анализ, тригонометрию, комбинаторику, вероятность, статистику, численные методы, оптимизацию и теорию вычислимости. Связь каждой дисциплины с K3 устанавливается только через определённые отображения, сохранение структуры, предпосылки и контрпримеры.

Аксиомы, определения, предположения, леммы, теоремы, следствия, гипотезы, контрпримеры, условные результаты, конечные проверки, вычислительные и эмпирические наблюдения, численные оценки, эвристики и исследовательские программы имеют разные статусы. Повтор эксперимента не превращает наблюдение в теорему. Конечный перебор подтверждает только полностью перечисленную конечную область.

Рекурсивные K-суффиксы и кооперативный синтез формул остаются отдельными исследовательскими программами и не изменяют семантику канонической K3 без отдельного формального результата.

### Вычисления и воспроизводимость

Скрипты и вычислительные инструменты являются вспомогательными средствами точного расчёта, конечной проверки, поиска контрпримеров, численных оценок и воспроизводимых экспериментов. Они не заменяют доказательства и не являются самостоятельной целью репозитория.

Для вычислительного результата указываются ревизия исходных материалов, фактически использованные версии инструментов, параметры, точность, округление, происхождение и лицензия данных, SHA-256, генератор и seed при наличии случайности, команда воспроизведения, выходы и статус проверки. Неприменимые поля отмечаются явно. Python, библиотеки, контейнеры, GPU и конкретный рантайм не являются обязательными по умолчанию. Незапущенный пример не обозначается как успешно пройденный тест.

### Каталог научных документов

**Фундамент K3:** [Теория Вьюненко](docs/VYUNENKO_THEORY.md) · [Каскадный баланс](docs/CHAPTER_II_CASCADE_BALANCE.md) · [Канонический синтаксис](docs/K3_CANONICAL_SYNTAX.md) · [Основания и алгебра](docs/K3_CANONICAL_FOUNDATIONS_AND_ALGEBRA.md) · [Составная арифметика](docs/K3_COMPOSITE_RADIX_ARITHMETIC.md) · [Классическая математика](docs/CLASSICAL_MATHEMATICS_CROSSWALK.md).

**Методология:** [Формальная доказательная методология](docs/FORMAL_EPISTEMIC_AND_PROOF_FRAMEWORK.md) · [Карта математических дисциплин](docs/MATHEMATICAL_DOMAIN_ARCHITECTURE.md) · [Вычислительные методы](docs/COMPUTATIONAL_RESEARCH_ARCHITECTURE.md) · [Экспериментальная методология](docs/EXPERIMENTAL_EMPIRICAL_METHOD.md) · [Исследовательская методология и вспомогательные вычисления](docs/RESEARCH_COMPUTATIONAL_FOUNDATION.md) · [Дорожная карта программы](docs/RESEARCH_PLATFORM_ROADMAP.md) · [Шаблон записи](docs/RESEARCH_RECORD_TEMPLATE.md) · [Правила развития теории](docs/THEORY_DEVELOPMENT_RULES.md) · [Конструктивная карта исследований](docs/CONSTRUCTIVE_RESEARCH_ROADMAP.md) · [Ревизия K-суффиксов](docs/K_SUFFIX_SPECULATIVE_RESEARCH_REVIEW.md) · [Кооперативный синтез формул](docs/COOPERATIVE_VITRUVIAN_FORMULA_SYNTHESIS.md).

**Контроль и управление:** [Эталонные векторы K3](docs/K3_REFERENCE_VECTORS.json) · [Научный стандарт](docs/SCIENTIFIC_MATHEMATICAL_DOCUMENTATION_STANDARD.md) · [Реестр языковых редакций](docs/LANGUAGE_REGISTER.md) · [Контракт проекта](project-contract.json) · [Контракт качества математики](quality-mathematics.json) · [Контракт вычислений](quality-computation.json) · [Этапы исследования](engineering-evolution.v1.json).

### Цитирование и публикационный статус

Для цитирования используются CITATION.cff или BibTeX-запись CITATION.bib. DOI и arXiv ID репозиторию пока не присвоены. Статус рукописи или препринта не должен завышаться. Условия лицензии приведены в LICENSE; лицензия репозитория — Apache-2.0.

---

## Українська

### Kaskad — математичний дослідницький корпус Теорії В'юненка K3

Kaskad призначений для математичних досліджень: точного означення об'єктів, побудови моделей, формулювання гіпотез, доведення теорем, пошуку контрприкладів і встановлення зв'язків між математичними дисциплінами. Фундаментальний об'єкт — Теорія В'юненка K3. Репозиторій не є ОС, мовою програмування, IDE, набором драйверів, застосунком чи універсальною програмною платформою.

**Нормативний стандарт:** [Науковий стандарт математичної документації — Cascade Edition](docs/SCIENTIFIC_MATHEMATICAL_DOCUMENTATION_STANDARD.md)  
**Реєстр мов:** [Реєстр мовних редакцій](docs/LANGUAGE_REGISTER.md)  
**Цитування:** [CITATION.cff](CITATION.cff) · [BibTeX](CITATION.bib)  
**Ліцензія:** [Apache License 2.0](LICENSE)

### Формальна ідентичність K3

Числова основа:

\[
B=1000=10^3=2^3\cdot5^3.
\]

Для скінченного вектора коефіцієнтів \(a=(a_0,\ldots,a_m)\), індексованого від молодшої позиції, значення дорівнює

\[
\operatorname{Val}_{K3}(a)=\sum_{i=0}^{m}a_iB^i.
\]

У канонічній формі \(0\le a_i\le999\).

| Позначення | Значення | Роль |
|---|---|---|
| \(B\) | \(1000\) | Числова основа |
| \(k\) | Роздільник сусідніх текстових груп | Символ граматики |
| \(S_B\) | Позиційний зсув на один степінь \(B\) | Окремий оператор |
| \(a_i\) | Коефіцієнт позиції \(i\) | Канонічний діапазон \(0,\ldots,999\) |

Символ **k не є основою**. Записи \(k=1000\) і \(k\equiv1000\) суперечать канонічній нотації. Основа позначається \(B\), роздільник — \(k\), позиційний зсув — \(S_B\).

Запис **50k0k** задає \(50\cdot1000^2=50\,000\,000\), його вектор від молодшої позиції до старшої дорівнює \((0,0,50)\). Множення **50k0k × 25** дає \(1\,250\,000\,000\), канонічний запис — **1k250k0k**. Сума **999k999 + 1** дорівнює \(1\,000\,000\) і записується **1k0k**.

### Математичні основи

Канонічні невід'ємні записи K3 взаємно однозначно представляють \(\mathbb N_0\); знакове розширення представляє \(\mathbb Z\). Теорія не заявляє про заміну класичної арифметики: вона задає фіксоване позиційне представлення та досліджує його структуру.

Основний корпус охоплює теорему єдиності розкладу, каскадне перенесення й позику, нормалізацію зі збереженням значення, поліноміальну оцінку, згортку коефіцієнтів, арифметику складеної основи, китайський розклад лишків і топологічне поповнення.

\[
\mathbb Z/1000^r\mathbb Z\cong
\mathbb Z/2^{3r}\mathbb Z\times\mathbb Z/5^{3r}\mathbb Z,
\qquad
\widehat{\mathbb Z}_{1000}\cong\mathbb Z_2\times\mathbb Z_5.
\]

Основа \(1000\) складена. Кільце \(\mathbb Z/1000\mathbb Z\) не є полем. Оберненість за модулем \(1000^r\) еквівалентна \(\gcd(n,1000)=1\). Умова \(\nu_{1000}(n)=0\) сама по собі не гарантує оберненості; \(\nu_{1000}\) не є мультиплікативною \(p\)-адичною оцінкою. Нуль, порожня послідовність коефіцієнтів, порожня множина, відсутнє та невизначене значення — різні об'єкти. Порожня сума дорівнює \(0\), порожній добуток — \(1\).

### Дослідницька область і статус результатів

Kaskad охоплює математичну логіку, теорію множин, алгебру, теорію чисел, геометрію, топологію, аналіз, функціональний аналіз, тригонометрію, комбінаторику, ймовірність, статистику, числові методи, оптимізацію та теорію обчислюваності. Зв'язок кожної дисципліни з K3 встановлюється лише через визначені відображення, збереження структури, припущення та контрприклади.

Аксіоми, означення, припущення, леми, теореми, наслідки, гіпотези, контрприклади, умовні результати, скінченні перевірки, обчислювальні й емпіричні спостереження, числові оцінки, евристики та дослідницькі програми мають різні статуси. Повтор експерименту не перетворює спостереження на теорему. Скінченний перебір підтверджує лише повністю перелічену скінченну область.

Рекурсивні K-суфікси та кооперативний синтез формул залишаються окремими дослідницькими програмами й не змінюють семантику канонічної K3 без окремого формального результату.

### Обчислення та відтворюваність

Скрипти й обчислювальні засоби є допоміжними інструментами точних обчислень, скінченної перевірки, пошуку контрприкладів, числових оцінок і відтворюваних експериментів. Вони не замінюють доведень і не є самостійною метою репозиторію.

Для обчислювального результату зазначають ревізію джерел, фактично використані версії інструментів, параметри, точність, округлення, походження й ліцензію даних, SHA-256, генератор і seed за наявності випадковості, команду відтворення, виходи та статус перевірки. Непридатні поля позначають явно. Python, бібліотеки, контейнери, GPU та конкретне середовище не є обов'язковими за замовчуванням. Приклад без фактичного запуску не позначається як успішно пройдений тест.

### Каталог наукових документів

**Фундамент K3:** [Теорія В'юненка](docs/VYUNENKO_THEORY.md) · [Каскадний баланс](docs/CHAPTER_II_CASCADE_BALANCE.md) · [Канонічний синтаксис](docs/K3_CANONICAL_SYNTAX.md) · [Основи й алгебра](docs/K3_CANONICAL_FOUNDATIONS_AND_ALGEBRA.md) · [Складена арифметика](docs/K3_COMPOSITE_RADIX_ARITHMETIC.md) · [Класична математика](docs/CLASSICAL_MATHEMATICS_CROSSWALK.md).

**Методологія:** [Формальна доказова методологія](docs/FORMAL_EPISTEMIC_AND_PROOF_FRAMEWORK.md) · [Карта математичних дисциплін](docs/MATHEMATICAL_DOMAIN_ARCHITECTURE.md) · [Обчислювальні методи](docs/COMPUTATIONAL_RESEARCH_ARCHITECTURE.md) · [Експериментальна методологія](docs/EXPERIMENTAL_EMPIRICAL_METHOD.md) · [Дослідницька методологія та допоміжні обчислення](docs/RESEARCH_COMPUTATIONAL_FOUNDATION.md) · [Дорожня карта програми](docs/RESEARCH_PLATFORM_ROADMAP.md) · [Шаблон запису](docs/RESEARCH_RECORD_TEMPLATE.md) · [Правила розвитку теорії](docs/THEORY_DEVELOPMENT_RULES.md) · [Конструктивна карта досліджень](docs/CONSTRUCTIVE_RESEARCH_ROADMAP.md) · [Ревізія K-суфіксів](docs/K_SUFFIX_SPECULATIVE_RESEARCH_REVIEW.md) · [Кооперативний синтез формул](docs/COOPERATIVE_VITRUVIAN_FORMULA_SYNTHESIS.md).

**Контроль і управління:** [Еталонні вектори K3](docs/K3_REFERENCE_VECTORS.json) · [Науковий стандарт](docs/SCIENTIFIC_MATHEMATICAL_DOCUMENTATION_STANDARD.md) · [Реєстр мовних редакцій](docs/LANGUAGE_REGISTER.md) · [Контракт проєкту](project-contract.json) · [Контракт якості математики](quality-mathematics.json) · [Контракт обчислень](quality-computation.json) · [Етапи дослідження](engineering-evolution.v1.json).

### Цитування та публікаційний статус

Для цитування використовуються CITATION.cff або BibTeX-запис CITATION.bib. DOI та arXiv ID репозиторію поки не присвоєно. Статус рукопису чи препринту не можна перебільшувати. Умови ліцензії наведено в LICENSE; ліцензія репозиторію — Apache-2.0.

---

## 中文

### Kaskad — 维尤年科 K3 理论数学研究仓库

Kaskad 是数学研究仓库，研究对象包括数学结构的精确定义、模型构造、猜想提出、定理证明、反例搜索以及数学学科之间的联系。基础研究对象是维尤年科 K3 理论。本仓库不是操作系统、编程语言、IDE、驱动程序集合、应用程序或通用软件平台。

**规范标准：** [Cascade Edition 数学科研文档标准](docs/SCIENTIFIC_MATHEMATICAL_DOCUMENTATION_STANDARD.md)  
**语言登记：** [语言版本登记表](docs/LANGUAGE_REGISTER.md)  
**引用：** [CITATION.cff](CITATION.cff) · [BibTeX](CITATION.bib)  
**许可证：** [Apache License 2.0](LICENSE)

### K3 的形式化定义

数值基数为

\[
B=1000=10^3=2^3\cdot5^3.
\]

有限系数向量 \(a=(a_0,\ldots,a_m)\) 从最低位开始编号，其数值定义为

\[
\operatorname{Val}_{K3}(a)=\sum_{i=0}^{m}a_iB^i.
\]

规范形式中的系数满足 \(0\le a_i\le999\)。

| 符号 | 含义 | 角色 |
|---|---|---|
| \(B\) | \(1000\) | 数值基数 |
| \(k\) | 相邻文本分组之间的分隔符 | 语法符号 |
| \(S_B\) | 跨越一个 \(B\) 位权的位置移位 | 独立定义的算子 |
| \(a_i\) | 第 \(i\) 位系数 | 规范范围 \(0,\ldots,999\) |

**k 不是数值基数。** \(k=1000\) 和 \(k\equiv1000\) 均违反规范符号约定。数值基数记为 \(B\)，分隔符记为 \(k\)，位置移位算子记为 \(S_B\)。

**50k0k** 表示 \(50\cdot1000^2=50\,000\,000\)，从低位到高位的系数向量为 \((0,0,50)\)。乘法 **50k0k × 25** 得到 \(1\,250\,000\,000\)，规范表示为 **1k250k0k**。加法 **999k999 + 1** 得到 \(1\,000\,000\)，规范表示为 **1k0k**。

### 数学基础

规范非负 K3 表示与 \(\mathbb N_0\) 一一对应；带符号扩展与 \(\mathbb Z\) 对应。该理论不声称取代经典整数算术，而是定义一种固定的位置表示并研究其结构。

核心研究包括规范表示的存在性与唯一性、级联进位与借位、保持数值的规范化、多项式求值、系数卷积、复合基数算术、中国剩余分解以及拓扑完备化。

\[
\mathbb Z/1000^r\mathbb Z\cong
\mathbb Z/2^{3r}\mathbb Z\times\mathbb Z/5^{3r}\mathbb Z,
\qquad
\widehat{\mathbb Z}_{1000}\cong\mathbb Z_2\times\mathbb Z_5.
\]

基数 \(1000\) 是合数。\(\mathbb Z/1000\mathbb Z\) 不是域。模 \(1000^r\) 可逆的充要条件是 \(\gcd(n,1000)=1\)。仅有 \(\nu_{1000}(n)=0\) 并不足以判定可逆；\(\nu_{1000}\) 不是乘法型 \(p\)-进赋值。零、空系数序列、空集、缺失值和未定义值是不同对象。空和为 \(0\)，空积为 \(1\)。

### 研究范围与认识状态

Kaskad 涵盖数学逻辑、集合论、代数、数论、几何、拓扑、数学分析、泛函分析、三角学、组合数学、概率论、统计学、数值数学、优化和可计算性理论。与 K3 的联系只有在给出明确映射、结构保持条件、假设和反例之后才能成立。

公理、定义、假设、引理、定理、推论、猜想、反例、条件结果、有限穷举验证、计算观察、经验观察、数值估计、启发式和研究计划具有不同的认识状态。重复实验不会自动把观察转化为定理。有限枚举只能验证完全列出的有限范围。

递归 K 后缀和合作公式综合是独立的研究计划；在没有单独形式化结果之前，它们不改变规范 K3 语义。

### 计算与可复现性

脚本和计算工具仅用于精确计算、有限验证、反例搜索、数值估计和可复现实验。它们不能替代证明，也不是仓库的独立目标。

对于计算结果，必须记录源修订版本、实际使用工具的版本、参数、精度、舍入规则、输入数据来源与许可证、SHA-256、随机过程的生成器和 seed、复现命令、输出以及验证状态。不适用字段必须明确标记。Python、软件包、容器、GPU 或特定运行时并非默认要求。未实际运行的示例不得标记为通过测试。

### 科研文档目录

**K3 基础：** [维尤年科 K3 理论](docs/VYUNENKO_THEORY.md) · [级联平衡](docs/CHAPTER_II_CASCADE_BALANCE.md) · [规范语法](docs/K3_CANONICAL_SYNTAX.md) · [基础与代数](docs/K3_CANONICAL_FOUNDATIONS_AND_ALGEBRA.md) · [复合基数算术](docs/K3_COMPOSITE_RADIX_ARITHMETIC.md) · [经典数学对应](docs/CLASSICAL_MATHEMATICS_CROSSWALK.md)。

**研究方法：** [形式化证明框架](docs/FORMAL_EPISTEMIC_AND_PROOF_FRAMEWORK.md) · [数学学科架构](docs/MATHEMATICAL_DOMAIN_ARCHITECTURE.md) · [计算方法](docs/COMPUTATIONAL_RESEARCH_ARCHITECTURE.md) · [实验方法](docs/EXPERIMENTAL_EMPIRICAL_METHOD.md) · [数学研究方法与辅助计算](docs/RESEARCH_COMPUTATIONAL_FOUNDATION.md) · [研究计划路线图](docs/RESEARCH_PLATFORM_ROADMAP.md) · [研究记录模板](docs/RESEARCH_RECORD_TEMPLATE.md) · [理论发展规则](docs/THEORY_DEVELOPMENT_RULES.md) · [构造性研究路线图](docs/CONSTRUCTIVE_RESEARCH_ROADMAP.md) · [K 后缀研究评议](docs/K_SUFFIX_SPECULATIVE_RESEARCH_REVIEW.md) · [合作公式综合](docs/COOPERATIVE_VITRUVIAN_FORMULA_SYNTHESIS.md)。

**验证与治理：** [K3 参考向量](docs/K3_REFERENCE_VECTORS.json) · [科研文档标准](docs/SCIENTIFIC_MATHEMATICAL_DOCUMENTATION_STANDARD.md) · [语言版本登记](docs/LANGUAGE_REGISTER.md) · [项目契约](project-contract.json) · [数学质量契约](quality-mathematics.json) · [计算质量契约](quality-computation.json) · [研究阶段](engineering-evolution.v1.json)。

### 引用与发表状态

引用本仓库时请使用 CITATION.cff 或 CITATION.bib。当前尚未分配 DOI 或 arXiv 编号。不得夸大手稿或预印本状态。仓库许可证为 Apache-2.0，具体条款见 LICENSE。
