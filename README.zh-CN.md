<div align="center">
  <img src="assets/kaskad-jade-atlas.svg" alt="Kaskad 数学研究翡翠图谱" width="100%" />
  <p><strong>KASKAD · 数学研究文档库</strong></p>
  <p><sub>维尤年科 K3 理论 · 瘟疫裁决理论 CV-1 · 形式数学</sub></p>
  <h1>定义要准确。结构要清楚。结论要有依据。</h1>
  <p>从这里开始了解 Kaskad 数学文档库：研究理念、理论、研究方向以及结果验证方法。</p>
</div>

<p align="center">
  <a href="README.md">RU</a> · <a href="README.en.md">EN</a> · <a href="README.uk.md">UA</a> · <strong>中文</strong>
  <br />
  <a href="docs/INDEX.md">文档索引</a> ·
  <a href="docs/VYUNENKO_THEORY.md">K3 理论</a> ·
  <a href="docs/CHUMNY_VERDICT_THEORY.md">CV-1 理论</a> ·
  <a href="CONTRIBUTING.md">如何参与</a>
</p>

---

## 01 · 引言

欢迎来到 **Kaskad**。

这里是一个数学研究空间。研究者将想法转化为准确的定义，再用定义建立模型；对于数学命题，则给出证明、反例，或明确标记为尚未解决的问题。

基本原则很简单：**先弄清楚研究对象，再准确描述它，最后才能得出结论**。

## 02 · 关于项目

**Kaskad** 不是一个公式，也不是一套单独的理论。它是一个有组织的数学研究文档库，包含多个独立的数学方向、各自的主要文档、研究结果、计算证据和开放问题。

本项目致力于：
- 描述数学对象及其相互关系；
- 建立准确且可以检查的定义与模型；
- 研究数、结构和变换的性质；
- 区分已经证明的结果、假设和实验；
- 保存研究过程，让其他人能够检查并继续研究。

文档库的两个核心方向是彼此独立的 **K3** 和 **CV-1**。它们研究不同的问题，也有各自的定义。仅仅因为它们位于同一个代码仓库，并不意味着它们属于同一套公理系统。

| 方向 | 研究内容 | 主要文档 |
|---|---|---|
| **K3** | 以 1000 为基数的位置数表示 | [维尤年科理论](docs/VYUNENKO_THEORY.md) |
| **CV-1** | 整数集上的一种特殊有向关系 | [瘟疫裁决理论](docs/CHUMNY_VERDICT_THEORY.md) |
| **整个文档库** | 文档之间的联系、研究状态和支持材料 | [文档索引](docs/INDEX.md) |

## 03 · 文档库的数学基础

数学研究首先需要明确规则。Kaskad 中的每项研究都应说明四件事：

1. **对象：** 研究的是什么——数、序列、关系、函数、图或其他结构。
2. **范围：** 哪些数值和情况是允许的。
3. **规则：** 对象之间的运算和关系如何定义。
4. **依据：** 为什么结论成立，以及它依赖哪些条件。

Kaskad 没有一套共同公理系统来取代各个理论自身的定义。例如，基数 1000 属于 K3，而有向关系的参数属于 CV-1。这些概念不能混为一谈。

K3 使用的主要符号如下：

| 符号 | 含义 |
|---|---|
| $B$ | 基数：$1000=10^3=2^3\cdot5^3$ |
| $D_B$ | 允许的规范系数：$\{0,1,\ldots,999\}$ |
| $a_i$ | 第 $i$ 个位置上的组系数 |
| $k$ | 相邻组之间的分隔符，不是数字或乘数 |
| $\operatorname{Val}_{K3}$ | 计算级联数值的函数 |

完整约定见[ K3 规范理论](docs/VYUNENKO_THEORY.md)和[数学文档科学标准](docs/SCIENTIFIC_MATHEMATICAL_DOCUMENTATION_STANDARD.md)。

## 04 · 维尤年科 K3 理论

**K3** 是一种以 1000 为基数、按组书写整数的位置数系统。

其基数固定为：

$$
B=1000=10^3=2^3\cdot5^3,
\qquad
D_B=\{0,1,\ldots,999\}.
$$

一个级联数可以表示为有限系数向量。如果从最低位到最高位排列系数，则

$$
a=(a_0,a_1,\ldots,a_m),
\qquad
\operatorname{Val}_{K3}(a)=\sum_{i=0}^{m}a_iB^i.
$$

简单来说：每个数值组都有自己的位置，而位置决定了它对整个数值的贡献。

| 写法 | 从最低位到最高位的向量 | 数值 |
|---|---:|---:|
| **1k** | $(0,1)$ | $1\,000$ |
| **50k0k7** | $(7,0,50)$ | $50\,000\,007$ |
| **50k0k** | $(0,0,50)$ | $50\,000\,000$ |
| **50k7** | $(7,50)$ | $50\,007$ |

在规范语法中，末尾的 **k** 恰好表示一个额外的隐式最低位零组。零的规范写法是 **0**。

**为什么零组很重要？** 在 **50k0k7** 中，中间组虽然等于零，但仍然占据一个位置。删除它就会得到 **50k7**，数值也随之改变。因此，不能在没有明确规则和相应证明的情况下删除、移动或合并零与分隔符。

K3 还区分三种结构处理模式：

- **Canonical** — 严格解析符合规范的写法；
- **K3-PAD** — 明确选择的输入导入与规范化模式；
- **K3-RAW** — 保留原始输入及其结构。

这三种模式不能在没有说明的情况下互相替代。

**继续阅读：** [完整理论](docs/VYUNENKO_THEORY.md) · [语法](docs/K3_CANONICAL_SYNTAX.md) · [进位与借位](docs/CHAPTER_II_CASCADE_BALANCE.md) · [基础与代数](docs/K3_CANONICAL_FOUNDATIONS_AND_ALGEBRA.md)。

## 05 · 瘟疫裁决理论 CV-1

**CV-1** 是定义在整数集上的一种独立有向关系数学模型。

首先，固定选择一个非零整数：

$$
c\in\mathbb Z\setminus\{0\}.
$$

然后定义关系：

$$
x\prec_c y
\iff
(x=_{\mathbb Z}0)\land(y=_{\mathbb Z}c),
\qquad
\prec_c=\{(0,c)\}.
$$

这表示在给定模型中，该关系恰好包含一个有序数对：$(0,c)$。它具有方向性：由 $0\prec_c c$ 不能推出 $c\prec_c0$。

此外，还单独定义一个表示固定数值变化的关系：

$$
x\rightsquigarrow_c y
\iff
y=_{\mathbb Z}x+c.
$$

这是两种不同的数学关系。**CV-1 不改变整数的普通相等关系**，不把不同整数视为同一个数，也不修改标准算术规则。

**继续阅读：** [瘟疫裁决理论](docs/CHUMNY_VERDICT_THEORY.md)。

## 06 · 数学研究方向与扩展

文档库不只包含基础定义。其他文档还研究更多性质、模型和开放问题。

主要方向包括：
- **算术与代数：** 级联运算、整除性、余数以及合数基数的性质。
- **同余系统与 CRT：** 模系统之间的联系，以及基数的素因数分解。
- **拓扑与无限级联：** 极限构造和无限序列的性质。
- **结构与组合数学：** 组序列、表达式树、图、排列和不变量。
- **几何与动态模型：** 描述数值轮廓、状态转移和变化的其他方法。
- **开放问题：** 仍需严格证明或进一步研究的问题。

可以从[经典数学对应关系](docs/CLASSICAL_MATHEMATICS_CROSSWALK.md)、[CRT 与无限级联](docs/K3_CRT_IDEMPOTENTS_AND_INFINITE_CASCADES.md)、[维尤年科图论](docs/VYUNENKO_GRAPH_THEORY.md)和[K3-M 形态学](docs/K3_STRATIFIED_MATHEMATICS.md)开始。

这些方向的成熟程度并不相同。每份文档都会说明哪些内容已经定义或证明，哪些仍然只是研究提案。

## 07 · 应用数学模型与项目集成

Kaskad 也研究其他技术项目中的数学问题。但这并不意味着这些项目的源代码成为 K3 的一部分。每个项目都有自己的类型、规则、限制，以及与数学对象之间的映射方式。

应用数学图谱包含：

| 项目 | 数学描述范围 |
|---|---|
| **DAK** | 进程、内存、权限、图、网络和系统状态 |
| **Reaper** | 类型、中间表示、字节码、内存和 ABI |
| **Pytyliki** | 计算精度、有限结构和可验证的不变量 |
| **VentuSample** | 数字信号、时间参数和音频处理 |
| **OPlague** | 设备、标识符、匹配图和证据 |

请从[统一应用数学图谱](docs/VYUNENKO_APPLIED_MATHEMATICAL_ATLAS.md)开始。它将各个专业文档连接起来，但不会取代这些文档，也不会声称所有相关实现都已完成。

## 08 · 科学方法与数学证明

科学研究必须区分一个想法和支持研究结果的证据。

| 材料类型 | 通俗解释 |
|---|---|
| **定义** | 准确说明一个术语或对象的含义 |
| **假设条件** | 某项推理所采用的条件 |
| **定理** | 已经给出证明的数学命题 |
| **猜想** | 尚待证明的预期结果 |
| **反例** | 说明某个一般性命题不成立的具体情况 |
| **计算结果** | 运行程序或检查有限案例后得到的结果 |
| **实现事实** | 通过检查某个具体版本的源代码或测试而确认的事实 |

一种材料不能自动证明另一种材料。例如，测试成功只能确认实际测试过的案例，不能证明某个命题对所有整数都成立。

Kaskad 记录每项结果的适用范围、前提、来源、符号和限制。研究过程遵循 [Cascade Edition 1.0.0](docs/SCIENTIFIC_MATHEMATICAL_DOCUMENTATION_STANDARD.md)、[形式认识论与证明框架](docs/FORMAL_EPISTEMIC_AND_PROOF_FRAMEWORK.md)以及[理论发展规则](docs/THEORY_DEVELOPMENT_RULES.md)。

## 09 · 计算基础设施与验证

计算工具可以帮助发现错误、检查示例和重复实验。仓库中包含 K3 参考实现、测试、参考案例以及机器可读的数据结构规范。

相关材料：
- [参考实现](docs/REFERENCE_IMPLEMENTATION.md)；
- [K3 参考向量](docs/K3_REFERENCE_VECTORS.json)；
- [数学主张登记册](docs/K3_CLAIM_REGISTRY.json)；
- [数据结构规范](schemas/README.md)；
- [开发与验证状态](docs/DEVELOPMENT_STATUS.md)。

在本地运行测试：

~~~bash
PYTHONPATH=src python -m unittest discover -s tests -v
~~~

结果只适用于实际运行的版本和实际检查过的案例。仓库中配置了 CI，并不代表当前修订版本已经通过全部检查。要作出这样的判断，必须打开具体的 GitHub Actions 运行记录并查看结果。

## 10 · 文档、发展与参与

本 README 是 Kaskad 的简要介绍，不会取代完整的数学文档库。需要深入了解时，请使用以下资源：

| 需要查找的内容 | 对应资源 |
|---|---|
| 全部文档及其关系 | [文档索引](docs/INDEX.md) |
| 文档阅读与修改规则 | [文档指南](docs/DOCUMENTATION_GUIDE.md) |
| 研究工作计划 | [建设性研究路线图](docs/CONSTRUCTIVE_RESEARCH_ROADMAP.md) |
| 当前开发状态 | [Development Status](docs/DEVELOPMENT_STATUS.md) |
| 翻译覆盖情况 | [语言版本登记册](docs/LANGUAGE_REGISTER.md) |
| 如何参与项目 | [CONTRIBUTING.md](CONTRIBUTING.md) |
| 作者与材料来源 | [署名与权利](docs/ATTRIBUTION_AND_RIGHTS.md) |
| 引用信息 | [CITATION.cff](CITATION.cff) |
| 许可证 | [Apache-2.0](LICENSE) |

### 阅读路线

~~~mermaid
flowchart TD
    A["README · 项目介绍"] --> B["文档索引"]
    B --> C["维尤年科 K3 理论"]
    B --> D["瘟疫裁决理论 CV-1"]
    C --> E["定义 · 公式 · 证明"]
    D --> E
    E --> F["研究扩展"]
    F --> G["应用数学模型"]
    G --> H["验证与可复现性"]
~~~

### 语言版本

[Русский](README.md) · [English](README.en.md) · [Українська](README.uk.md) · [简体中文](README.zh-CN.md)。

长篇研究章节的完整翻译情况单独记录。实际状态见[语言版本登记册](docs/LANGUAGE_REGISTER.md)。

---

<p align="center">
  <strong>KASKAD</strong><br />
  <sub>清晰的解释。准确的定义。可以检查的数学结论。</sub>
</p>
