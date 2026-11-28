<a id="top"></a>

# Kaskad — 以 1000 为基数的位置记数系统

**Kaskad** 是一个数学研究项目。它的主要方向是 **维尤年科 K3 理论**，研究如何把整数按每组三个十进制数字来表示，以及这种表示具有哪些数学性质。

K3 的目标是准确规定这种记数方式，描述相关运算，并研究其数学性质；计算结果不会被当作数学证明。

**从这里开始：** [主要文档 — 维尤年科 K3 理论](docs/VYUNENKO_THEORY.md) · [完整文档索引](docs/INDEX.md)

| 首先需要了解 | 当前状态 |
|---|---|
| 项目状态 | 研究仍在进行。K3 的有限位置表示核心已有明确规定；各项扩展的成熟程度不同。 |
| 适合读者 | 对记数系统、数论和精确算术感兴趣的学生、教师、数学研究者和开发者。 |
| 原始语言 | 俄语。README 简版另有[英文](README.en.md)、[乌克兰文](README.uk.md)和[中文](README.zh-CN.md)。 |
| 理论翻译 | K3 的主要理论文档目前以俄语维护。翻译情况请查看[语言登记表](docs/LANGUAGE_REGISTER.md)。 |

## 一分钟了解 K3

普通十进制写法中的 50,000,007，在 K3 中可以按每组三位数字写成：

**50k0k7**

这里的 **k** 是组与组之间的分隔符。它不表示乘法，也不是数字。

| 写法 | 从高位到低位的分组 | 数值 |
|---|---:|---:|
| **7** | (7) | 7 |
| **1k** | (1, 0) | 1,000 |
| **50k0k7** | (50, 0, 7) | 50,000,007 |
| **50k7** | (50, 7) | 50,007 |
| **50k0k** | (50, 0, 0) | 50,000,000 |

**50k0k7** 中间的零占据一个独立的位置。删除它就会改变数值：**50k7 = 50,007**。因此，不能在没有明确规则和相应证明的情况下删除或移动零与分隔符。

## 三个关键定义

**1. 基数。** K3 固定使用基数

\[
B=1000=10^3=2^3\cdot5^3.
\]

每个组允许的系数为

\[
D_B=\{0,1,\ldots,999\}.
\]

例子：**50** 是允许的系数。反例：**1000** 不能作为一个规范组的系数。

**2. 级联向量。** 级联向量是一个有限系数序列

\[
a=(a_m,\ldots,a_1,a_0),\qquad a_i\in D_B,
\]

其中索引 \(i\) 表示基数的幂次。文本从高位组写到低位组；计算数值时则从低位位置开始。

例子：**50k0k7** 对应向量 \((50,0,7)\)。反例：\((50,1000,7)\) 不是规范级联向量，因为系数 1000 超出了允许范围。

**3. 数值求值。** 求值函数把有限系数向量映射为非负整数：

\[
\operatorname{Val}_{K3}:
\bigcup_{m\ge0}D_B^{m+1}\to\mathbb N_0,
\qquad
\operatorname{Val}_{K3}(a)=\sum_{i=0}^{m}a_iB^i.
\]

例子：

\[
\operatorname{Val}_{K3}(50,0,7)
=50\cdot1000^2+0\cdot1000+7
=50\,000\,007.
\]

错误读法的反例：**50k0k7** 不等于 \(50\cdot7\)，而 **k** 也不是乘号。

**请区分三种对象：** 文本字符串 **50k0k7**、向量 \((50,0,7)\) 和整数 \(50\,000\,007\)。它们通过解析规则相互关联，但不是同一种对象。

### 符号表

| 符号 | 含义 | 定义位置 |
|---|---|---|
| \(B\) | 基数，\(1000\) | [K3 理论](docs/VYUNENKO_THEORY.md) |
| \(D_B\) | 允许的系数 \(0,\ldots,999\) | [K3 理论](docs/VYUNENKO_THEORY.md) |
| \(k\) | 相邻数字组之间的分隔符 | [规范语法](docs/K3_CANONICAL_SYNTAX.md) |
| \(a_i\) | \(B^i\) 位置上的系数 | [K3 理论](docs/VYUNENKO_THEORY.md) |
| \(m\) | 最高位置的索引 | [K3 理论](docs/VYUNENKO_THEORY.md) |
| \(\operatorname{Val}_{K3}\) | 计算向量数值的函数 | [K3 理论](docs/VYUNENKO_THEORY.md) |

## K3 具体研究什么

K3 研究有限位置表示、规范形式、进位与借位、算术运算、整除性、余数，以及单独定义的拓扑扩展。

K3 的数值算术与普通整数算术一致：基数 1000 只是把十进制数字每三位分为一组。项目并不声称要用一种新系统取代整数或普通整数算术。研究重点是准确的记数语言、位置结构、零组的保留，以及单独形式化的扩展。与已有数学的比较见[经典数学对应关系](docs/CLASSICAL_MATHEMATICS_CROSSWALK.md)。

仓库中还包含其他研究方向。例如，**CV-1** 是一个具有独立对象和定义的数学模型。它不会仅仅因为与 K3 存放在同一仓库中，就成为 K3 公理系统的一部分。

## 结果状态与限制

状态属于具体的数学主张，而不是整个仓库。[K3 主张登记册](docs/K3_CLAIM_REGISTRY.json)目前包含 52 条记录：

| 登记内容 | 数量 | 含义 |
|---|---:|---|
| 定义 | 13 | 对象和术语已作出规定 |
| 等待独立审查的证明 | 14 | 已登记证明文本，但尚无独立审查记录 |
| 等待独立审查的经典特化结果 | 7 | 使用已有数学结果，但其表述与条件尚无审查记录 |
| 未解决的假设 | 10 | 仍需证明或反例 |
| 反例 | 5 | 已记录具体案例，用来否定过于宽泛的说法 |
| 应用模型（不是定理） | 2 | 描述应用，不证明软件实现正确 |
| 等待 CI 的目录完整性检查 | 1 | 尚未登记为已完成 |

登记册目前没有为这 52 条记录登记独立审查。这不表示所有主张都是错误的；它表示独立审查尚未得到文档确认。

**本项目不声称：**

- K3 的所有扩展都已经得到证明；
- 计算测试能够证明关于所有整数的命题；
- 所有结果都已经通过独立评审；
- 项目已经获得外部学术认证或认可；
- 应用模型就意味着软件集成已经完成或经过验证。

已知边界、失败的推广和开放问题见[反例与边界目录](docs/K3_COUNTEREXAMPLES_AND_BOUNDARIES.md)。计算部分的当前限制见[开发状态](docs/DEVELOPMENT_STATUS.md)。

## 下一步阅读

| 想要了解 | 请阅读 |
|---|---|
| 完整 K3 理论 | [维尤年科 K3 理论](docs/VYUNENKO_THEORY.md) |
| 了解位于公式末尾的终端积分 | [K3-TI 终端积分算子](docs/K3_TERMINAL_INTEGRAL_OPERATOR.md) |
| 了解 ▼ 单词算子和 64 项研究目录 | [K3-RZ-WORD](docs/K3_RIGHT_ZERO_WORD_OPERATOR_THEORY.md) · [K3-SCT-01](docs/K3_SELF_CREATED_THEORIES_CATALOGUE.md) |
| 了解有向判定与 CV-K3-M1 | [Chumny Verdict CV-1 理论](docs/CHUMNY_VERDICT_THEORY.md)（v1.2.1；单调性结论仅适用于明确给定的模型） |
| 记数和解析规则 | [K3 规范语法](docs/K3_CANONICAL_SYNTAX.md) |
| 进位与借位 | [级联平衡](docs/CHAPTER_II_CASCADE_BALANCE.md) |
| 与经典数学的联系 | [经典数学对应关系](docs/CLASSICAL_MATHEMATICS_CROSSWALK.md) |
| 主张及其状态 | [主张登记册](docs/K3_CLAIM_REGISTRY.json) |
| 实现和测试的边界 | [开发状态](docs/DEVELOPMENT_STATUS.md) |
| 其他所有文档 | [完整文档索引](docs/INDEX.md) |
| 了解数值、编码、结构与语境之间的类型关系 | [K3-NS 数值语义](docs/K3_NUMERATIVE_SEMANTICS.md)（俄文原版） |
| 了解局部护照、范畴下降与级联效应 | [K3-GCS 图—范畴—符号综合](docs/K3_GRAPH_CATEGORY_SEMIOTIC_SYNTHESIS.md)（俄文原版） |

文档之间的关系：

~~~mermaid
flowchart TD
    A["README · 项目介绍"] --> B["文档索引"]
    B --> C["维尤年科 K3 理论"]
    C --> D["规范语法"]
    C --> E["算术与证明"]
    E --> F["主张登记册与反例"]
    C --> G["研究扩展"]
    B --> H["独立研究方向，包括 CV-1"]
~~~

### 其他重要文档

- [K3 科学整合文档](docs/K3_SCIENTIFIC_CONSOLIDATION.md) · [形式认识论与证明](docs/FORMAL_EPISTEMIC_AND_PROOF_FRAMEWORK.md) · [参考向量](docs/K3_REFERENCE_VECTORS.json)
- [原始级联公式](docs/K3_ORIGINAL_CASCADE_FORMULAS.md) · [双通道几何与进位规则](docs/K3_BIPRIME_GEOMETRY_AND_CARRY_LAW.md) · [仓库架构](docs/REPOSITORY_ARCHITECTURE.md)
- [参考向量数据结构](schemas/k3-reference-vectors.v1.schema.json) · [数学术语表](docs/MATHEMATICAL_GLOSSARY.md) · [科学质量计划](docs/SCIENTIFIC_QUALITY_IMPLEMENTATION_PLAN.md)
- [Cascade Edition 科学文档标准](docs/SCIENTIFIC_MATHEMATICAL_DOCUMENTATION_STANDARD.md) · [Kaskad 研究院章程](docs/KASKAD_INSTITUTE_CHARTER.md)

## 检查参考实现

仓库中包含辅助包 **src/kaskad_k3/**、位于 **tests/** 的测试，以及 **tests/vectors/** 中的参考数据。该软件包使用 Python 标准库，没有额外的运行时依赖。CI 配置覆盖 Python 3.11–3.14。

在仓库根目录运行：

~~~bash
PYTHONPATH=src python -m unittest discover -s tests -v
~~~

Windows PowerShell：

~~~powershell
$env:PYTHONPATH = "src"
python -m unittest discover -s tests -v
~~~

测试检查具体的解析与格式化案例、系数求值、规范化、算术、除法、整除性、序列化和参考向量。它们不会证明一般性定理，也不会验证所有数学扩展。

请在 [GitHub Actions](https://github.com/Ivan-VHS/Kaskad/actions) 中检查具体 commit 的 CI。准备本版 README 时，源 main 修订 **eac38c147001ea554b3afdad2e659000ef1404e6** 没有 GitHub status-check 记录。因此，本 README 不声称当前 main 已通过 CI。

## 作者、引用与参与

- **Kaskad 文档库和维尤年科 K3 理论的作者：** [Ivan-VHS](https://github.com/Ivan-VHS)。角色、材料来源和作者权利范围见 [AUTHORS.md](AUTHORS.md) 与[署名说明](docs/ATTRIBUTION_AND_RIGHTS.md)。
- **引用方式：** [CITATION.cff](CITATION.cff) 和 [CITATION.bib](CITATION.bib)。目前尚未分配 DOI 或 arXiv 标识符。
- **许可证：** 仓库根目录声明 Apache-2.0。没有单独声明仅适用于 README 文本的许可证；第三方材料保留各自的许可条款。
- **提交修改建议：** [CONTRIBUTING.md](CONTRIBUTING.md) 或 [GitHub Issues](https://github.com/Ivan-VHS/Kaskad/issues)。
- **已确认错误的记录：** [ERRATA](docs/ERRATA.md)。

**编写过程说明：** 本版 README 在 AI 辅助下根据仓库文档编写。尚无针对本编辑版本的独立审查记录。数学定义和状态均链接到主要来源。这是文档编辑，不是新的数学结果。

---

[返回 README 顶部](#top)