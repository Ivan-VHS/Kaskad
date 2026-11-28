<div align="center">
  <img src="assets/kaskad-jade-atlas.svg" alt="Kaskad — 维尤年科 K3 理论" width="100%" />
  <p><strong>翡翠图谱 · 级联数学</strong></p>
  <p><sub>维尤年科 K3 理论 · TCHV · 位置 · 结构 · 证明</sub></p>
</div>

<p align="center">
  <a href="README.md">RU</a> · <a href="README.en.md">EN</a> · <a href="README.uk.md">UK</a> ·
  <a href="docs/INDEX.md">文档索引</a> · <a href="docs/VYUNENKO_THEORY.md">规范理论</a>
</p>

# Kaskad — 维尤年科 K3 理论

**位置决定结构的数学。** Kaskad 是一个数学研究文档库，用于严格描述千进级联整数、其算术、结构、整除性及相关扩展。数学模型与软件代码彼此区分，计算实验不被当作证明。

> **K3 原则：** 数值由系数及其位置决定；分隔符标记位置转换，零保留自身位置。

## ◈ 视觉语言

三种艺术气质的原创融合，不复制角色、画面或标志。

| 灵感方向 | 色彩 | 设计角色 |
|---|---|---|
| *Kung Fu Panda 3* | 翡翠、金色、漆红、花色 | 技艺、清晰与和谐 |
| 瘟疫骑士 | 炭黑、灰烬、梅紫、酒红 | 对比、未知与边界情况 |
| Ging Freecss（*Hunter × Hunter*） | 蓝灰、砂色、土色、低饱和青绿 | 探索与路线感 |

**色板：** 翡翠 \#247A60 / \#8BC8A6；金色 \#D8AD58；漆红 \#B83A45；梅紫 \#63394F；黑曜石 \#10131A；灰烬 \#A9ADB4；砂色 \#DEBCA1；青灰 \#769194。颜色用于导航，不是证据。

## 1. 数学核心

维尤年科 K3 理论固定复合基数

\[
B=1000=10^3=2^3\cdot5^3,\qquad D_B=\{0,1,\ldots,999\}.
\]

有限级联由向量

\[
a=(a_m,\ldots,a_1,a_0),\qquad a_i\in D_B
\]

定义，其中 $a_0$ 是最低位组。其数值为

\[
\boxed{\operatorname{Val}_{K3}(a)=\sum_{i=0}^{m}a_i\,1000^i.}
\]

正数的规范表示具有非零最高位系数；零的唯一规范形式为 $(0)$。有符号扩展另行处理。

### 读取级联

符号 **k** 分隔相邻组。它只是分隔符，不是数字、乘数、基数或乘法运算符。每个分隔边界推进到下一个 (1000) 次幂；组内十进制位数不会生成新位置。

| 写法 | 从高位到低位的系数 | 数值 |
|---|---:|---:|
| **7** | $(7)$ | $7$ |
| **1k** | $(1,0)$ | $1,000$ |
| **1k0k1** | $(1,0,1)$ | $1,000,001$ |
| **50k0k7** | $(50,0,7)$ | $50,000,007$ |
| **50k0k** | $(50,0,0)$ | $50,000,000$ |
| **12k34k56** | $(12,34,56)$ | $12,034,056$ |

末尾的 **k** 表示恰好省略一个最低位零组。显式零组也占据位置。未经等价性证明，不得删除、移动或合并零与分隔符：深度和数值是不同特征。

## 2. 规范形式与输入模式

| 模式 | 用途 |
|---|---|
| **Canonical** | 严格解析 K3 规范语法允许的词 |
| **K3-PAD** | 显式导入并规范化非规范 token |
| **K3-RAW** | 保留分组、顺序和操作数形式的结构输入 |

规范化不会静默执行。文本、系数向量、数值、有序表达式树和操作轨迹具有不同的相等关系。数值相同不意味着原始写法或计算历史相同。位置移位算子 (S_B) 与分隔符分别定义。

## 3. 级联平衡

进位与借位是同一法则的两种情况：

\[
\boxed{c_i+t_i=1000t_{i+1}+r_i,\qquad 0\le r_i\le999.}
\]

因此

\[
t_{i+1}=\left\lfloor\frac{c_i+t_i}{1000}\right\rfloor,
\qquad r_i=c_i+t_i-1000t_{i+1}.
\]

合法规范化保持加权和：

\[
\sum_i c_i1000^i=\sum_i r_i1000^i.
\]

## 4. 复合基数与扩展

由于 (1000=2^3\cdot5^3)，中国剩余定理对 (r\ge1) 给出

\[
\mathbb Z/1000^r\mathbb Z\cong
\mathbb Z/2^{3r}\mathbb Z\times\mathbb Z/5^{3r}\mathbb Z.
\]

相应完备化是拓扑环

\[
\widehat{\mathbb Z}_{1000}\cong\mathbb Z_2\times\mathbb Z_5,
\]

而不是域。其他研究层包括整除性、超度量、无限级联、结构语义、组合学、统计学和张量不变量。每层都有独立定义域与状态，不会未经说明改变基础核心。

## 5. 维尤年科理论与 TCHV

**维尤年科 K3 理论**是 Kaskad 的形式化核心：有限级联、规范位置表示、多项式求值及兼容的代数和拓扑扩展。

**TCHV**作为相邻研究语境被提及，并保持独立理论方向。此处不表示 TCHV 与 K3 等同，也不把其主张纳入 K3 公理。两者的联系需要明确对象、映射、假设和可验证命题。

## 6. 主张状态

| 标记 | 状态 | 含义 |
|---|---|---|
| **DEF** | 定义 | 对象具有明确的定义域 |
| **AX** | 公设 | 固定起始约定 |
| **THM** | 定理 | 给出完整证明 |
| **CLASSIC** | 经典结果 | 标明来源和条件 |
| **CHECK** | 计算检验 | 检验具体输入或有限范围 |
| **SPEC** | 规格 | 描述需求或模型 |
| **HYP** | 假设 | 命题仍待研究 |
| **IMPL** | 实现事实 | 存在代码和可复现检查 |

测试不能替代证明。有限枚举只支持实际枚举的有限范围。缺少验证不等于通过；软件实现也不定义数学意义。

## 7. 文档地图

- [维尤年科 K3 理论](docs/VYUNENKO_THEORY.md)
- [规范语法](docs/K3_CANONICAL_SYNTAX.md) · [基础与代数](docs/K3_CANONICAL_FOUNDATIONS_AND_ALGEBRA.md)
- [级联平衡](docs/CHAPTER_II_CASCADE_BALANCE.md) · [结构语义](docs/K3_STRUCTURAL_SEMANTICS_AND_ORDERED_SUMS.md)
- [CRT 与无限级联](docs/K3_CRT_IDEMPOTENTS_AND_INFINITE_CASCADES.md)
- [经典数学对照](docs/CLASSICAL_MATHEMATICS_CROSSWALK.md) · [证明框架](docs/FORMAL_EPISTEMIC_AND_PROOF_FRAMEWORK.md)
- [实现状态](docs/DEVELOPMENT_STATUS.md) · [完整文档索引](docs/INDEX.md)

## 8. 可复现性与许可

辅助实现位于 **src/kaskad_k3/**，测试位于 **tests/**，向量位于 **tests/vectors/**。它们是计算工具，不是数学核心的替代品。

    PYTHONPATH=src python -m unittest discover -s tests -v

CI 配置覆盖 Python 3.11–3.14；结果只适用于对应 commit 和 GitHub Actions 运行。

- [贡献指南](CONTRIBUTING.md) · [科学文档标准](docs/SCIENTIFIC_MATHEMATICAL_DOCUMENTATION_STANDARD.md)
- [署名与权利](docs/ATTRIBUTION_AND_RIGHTS.md) · [引用](CITATION.cff) · [Apache-2.0](LICENSE)

---

<p align="center"><strong>位置就是结构。</strong><br/><sub>零保留位置 · 公式保留数值 · 证明保留意义</sub></p>