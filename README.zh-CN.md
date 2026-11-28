<div align="center">
  <img src="assets/kaskad-jade-atlas.svg" alt="Kaskad 翡翠图谱" width="100%" />
  <p><strong>KASKAD · 数学研究文档库</strong></p>
  <p><sub>维尤年科 K3 理论 · 瘟疫裁决理论 CV-1 · 形式数学</sub></p>
  <h1>位置必须保留。结构必须区分。结论必须证明。</h1>
  <p>统一入口：两套独立理论、各自的证据体系及兼容的研究扩展。</p>
</div>

<p align="center">
  <a href="README.md">RU</a> · <a href="README.en.md">EN</a> · <a href="README.uk.md">UA</a> · <strong>中文</strong>
  <br />
  <a href="docs/INDEX.md">文档索引</a> ·
  <a href="docs/VYUNENKO_THEORY.md">K3 规范理论</a> ·
  <a href="docs/CHUMNY_VERDICT_THEORY.md">CV-1</a> ·
  <a href="docs/VYUNENKO_APPLIED_MATHEMATICAL_ATLAS.md">应用数学图谱</a>
</p>

---

## 项目简介

**Kaskad** 是一个数学研究文档库，用于形式化研究位置数、算术结构、有向关系和数学证据。

项目严格区分数学理论、计算检验与软件实现。计算可以确认某个具体结果或有限案例集，但不能代替证明。研究假设不会被表述为定理，文档或代码的存在也不会被当作实现已获验证的证据。

### 项目概览

| | 范围 | 主要文档 |
|---|---|---|
| **K3** | 以 1000 为基数的有限位置系统 | [维尤年科理论](docs/VYUNENKO_THEORY.md) |
| **CV-1** | 具有一个固定非零参数的有向关系 | [瘟疫裁决理论](docs/CHUMNY_VERDICT_THEORY.md) |
| **导航** | 章节、扩展和机器可读材料的完整目录 | [文档索引](docs/INDEX.md) |

## 两条独立的研究路线

### 01 · 维尤年科 K3 理论

K3 使用固定基数描述有限整数级联：

$$
B=1000=10^3=2^3\cdot5^3,
\qquad
D_B=\{0,1,\ldots,999\}.
$$

每个规范组系数都属于 $D_B$。对于按从最低位到最高位排列的向量，

$$
a=(a_0,a_1,\ldots,a_m),
\qquad
\operatorname{Val}_{K3}(a)=\sum_{i=0}^{m}a_iB^i.
$$

符号 **k** 是相邻组之间的词法分隔符，不是数字、基数或乘数。组的索引决定其权重。零系数仍保留自己的位置；未经等价性证明，不得删除或移动它。

**主要章节：** [规范理论](docs/VYUNENKO_THEORY.md) · [语法](docs/K3_CANONICAL_SYNTAX.md) · [级联平衡](docs/CHAPTER_II_CASCADE_BALANCE.md) · [基础与代数](docs/K3_CANONICAL_FOUNDATIONS_AND_ALGEBRA.md)。

### 02 · 瘟疫裁决理论 CV-1

CV-1 研究标准整数集上的一个独立有向关系。对于预先固定的参数 $c\in\mathbb Z\setminus\{0\}$，其基本关系定义为：

$$
x\prec_c y
\iff
(x=_{\mathbb Z}0)\land(y=_{\mathbb Z}c),
\qquad
\prec_c=\{(0,c)\}.
$$

因此 $0\prec_c c$，而 $c\not\prec_c0$；标准数值不等式 $0\ne_{\mathbb Z}c$ 仍然成立。

另行定义独立的加法转移关系：

$$
x\rightsquigarrow_c y
\iff
y=_{\mathbb Z}x+c.
$$

这两种关系具有不同的定义和作用。CV-1 不会重新定义普通相等关系，不会合并不同整数，也不会改变标准算术运算。

**主要文档：** [瘟疫裁决理论 — CV-1](docs/CHUMNY_VERDICT_THEORY.md)。

## K3：位置决定数值

以下示例说明，决定数值的是完整的组序列，而不只是分隔符的数量。

| 写法 | 从最低位到最高位的向量 | 数值 |
|---|---:|---:|
| **1k** | $(0,1)$ | $1\,000$ |
| **50k0k7** | $(7,0,50)$ | $50\,000\,007$ |
| **50k0k** | $(0,0,50)$ | $50\,000\,000$ |
| **50k7** | $(7,50)$ | $50\,007$ |

在规范语法中，末尾的 **k** 恰好表示一个额外的隐式最低位零组。显式零组同样保留其位置。例如，从 **50k0k7** 中删除中间组，会使数值从 50,000,007 变为 50,007。

K3 将以下概念分别处理：

- **Canonical** — 对规范词进行严格解析；
- **K3-PAD** — 明确选择的导入与规范化模式；
- **K3-RAW** — 保留原始结构；
- 文本、系数结构、数值、表达式树和操作轨迹的相等关系。

规范化不得静默发生：必须明确指定转换模式及需要保持的不变量。

## 科学严谨性与可验证性

每项主张都需要明确适用范围、前提、证据类型和状态。

| 材料类型 | 能够确立的内容 |
|---|---|
| 定义 | 新对象或术语的含义 |
| 证明 | 在所声明前提下成立的普遍命题 |
| 反例 | 某个一般命题的边界或反驳 |
| 计算检验 | 仅限已执行的输入、有限范围或数值实验 |
| 假设 / 开放问题 | 仍需研究的问题 |
| 实现状态 | 特定修订版本中经过检查的状态 |

Kaskad 的核心规则是：**计算验证不能代替数学证明**。规范、计划、测试和实现事实具有不同的状态。

规范性文档：[Cascade Edition 1.0.0](docs/SCIENTIFIC_MATHEMATICAL_DOCUMENTATION_STANDARD.md) · [形式认识论与证明框架](docs/FORMAL_EPISTEMIC_AND_PROOF_FRAMEWORK.md) · [研究成熟度路径](docs/RESEARCH_MATURITY_AND_RECOGNITION_PATH.md)。

## 阅读路线

| 目标 | 推荐路线 |
|---|---|
| 了解项目结构 | [文档索引](docs/INDEX.md) → 本 README |
| 学习 K3 | [维尤年科理论](docs/VYUNENKO_THEORY.md) → [语法](docs/K3_CANONICAL_SYNTAX.md) → [级联平衡](docs/CHAPTER_II_CASCADE_BALANCE.md) |
| 学习 CV-1 | [瘟疫裁决理论](docs/CHUMNY_VERDICT_THEORY.md) |
| 检查公式与主张状态 | [参考向量](docs/K3_REFERENCE_VECTORS.json) · [主张登记册](docs/K3_CLAIM_REGISTRY.json) |
| 探索应用对应关系 | [统一应用数学图谱](docs/VYUNENKO_APPLIED_MATHEMATICAL_ATLAS.md) |
| 查看仓库状态 | [开发状态](docs/DEVELOPMENT_STATUS.md) · [语言登记册](docs/LANGUAGE_REGISTER.md) |

## 应用数学模型

文档库包含与 **DAK、Reaper、Pytyliki、VentuSample 和 OPlague** 对应的类型化数学模型。这些模型描述各自独立的研究领域，不会自动成为有限 K3 核心的公理。每种对应关系都需要明确的类型、前提、映射和证明义务。

建议从[统一应用数学图谱](docs/VYUNENKO_APPLIED_MATHEMATICAL_ATLAS.md)开始。主要章节与 crosswalk 收录于[文档索引](docs/INDEX.md)。

## 计算检验

仓库包含辅助参考实现及测试。本地运行命令：<code>PYTHONPATH=src python -m unittest discover -s tests -v</code>。

结果仅适用于实际运行的修订版本和已检查案例。它不能证明全部 K3 或 CV-1 定理，也不能认证其他修订版本。关于当前 CI，请查阅 [Development Status](docs/DEVELOPMENT_STATUS.md) 和 Actions 页面。

## 语言、署名与许可

- **语言版本：** [Русский](README.md) · [English](README.en.md) · [Українська](README.uk.md) · [简体中文](README.zh-CN.md)。长篇研究章节的翻译覆盖情况另见[语言登记册](docs/LANGUAGE_REGISTER.md)。
- **引用：** 使用 [CITATION.cff](CITATION.cff)，并注明具体 Git 修订版本。未实际分配 DOI 或 arXiv ID 时，不作此类声明。
- **权利与来源：** [署名与来源规则](docs/ATTRIBUTION_AND_RIGHTS.md)。
- **仓库许可：** [Apache-2.0](LICENSE)。

---

<p align="center">
  <strong>KASKAD</strong><br />
  <sub>定义确立研究对象。证明支撑结论。导航连接文档，但不混淆它们的状态。</sub>
</p>
