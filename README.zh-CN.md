# Kaskad

[简体中文](README.zh-CN.md) · [English](README.en.md) · [Русский](README.md) · [Українська](README.uk.md)

维尤年科 K3 理论数学研究文档库。本仓库用于精确定义数学对象、建立数学模型、
给出证明与反例，并研究其与经典数学理论之间的联系。

## 引用

截至本版本，仓库尚未登记独立的期刊论文、预印本、DOI 或已发表的实验结果集。
本 README 不声称对应任何未注明的论文。为保证研究可复现，请引用具体的
Git commit，而不只是会变化的分支名称。

仓库引用信息（BibTeX）：

~~~bibtex
@misc{vyunenko_kaskad_2026,
  author       = {Vyunenko, Ivan},
  title        = {Kaskad: Mathematical Research Corpus for the Vyunenko Theory of K3},
  year         = {2026},
  howpublished = {GitHub repository},
  url          = {https://github.com/Ivan-VHS/Kaskad},
  note         = {Cite a specific Git revision; no DOI is registered}
}
~~~

## 目录

- [项目目的与范围](#项目目的与范围)
- [K3 数学模型](#k3-数学模型)
- [数学主张的认知状态](#数学主张的认知状态)
- [研究方法](#研究方法)
- [文档与仓库结构](#文档与仓库结构)
- [可复现验证](#可复现验证)
- [数据与实验结果](#数据与实验结果)
- [指标与硬件要求](#指标与硬件要求)
- [许可证与署名](#许可证与署名)
- [参与贡献与问题报告](#参与贡献与问题报告)

## 项目目的与范围

Kaskad 是一个持续维护的数学研究文档库。其主要研究对象是维尤年科 K3 理论
及经过严格定义的数学扩展。研究流程如下：

**研究问题 → 经典数学背景 → 定义 → 模型 → 证明或反例 → 精确或数值检验
推论 → 独立审查 → 记录研究结果。**

Kaskad 不是操作系统、编程语言、IDE、驱动程序、应用软件或通用软件平台项目。
与其他仓库的联系仅限于数学关系，包括共同定义、映射、模型、可证明的推论，
以及明确说明适用边界的类比。

代码和计算工具仅可作为辅助工具，用于精确算术、有限范围验证、可复现实验、
文档检查或形式化验证。计算不能替代数学证明，也不能仅凭计算就把猜想升级为定理。

## K3 数学模型

K3 基础系统固定使用复合基数

\[
B=1000=10^3=2^3\cdot5^3.
\]

规范级联表示由有限系数向量给出：

\[
a=(a_m,\ldots,a_1,a_0),\qquad a_i\in\{0,1,\ldots,999\},
\]

其数值由多项式求值定义：

\[
\operatorname{Val}_{K3}(a)=\sum_{i=0}^{m}a_iB^i.
\]

索引 \(i=0\) 表示最低位组。在文本记法中，各组由符号
\(\mathtt{k}\) 分隔。\(\mathtt{k}\) 是词法分组分隔符，不是数字、乘数或
乘法运算符。位置移位算子 \(S_B\) 另行定义。

| 参数 | 规范值 |
|---|---|
| 系统 | K3 |
| 基数 | \(B=1000=2^3\cdot5^3\) |
| 规范组范围 | \(0\ldots999\) |
| 分组符号 | \(\mathtt{k}\) |
| 非负数值域 | \(\mathbb N_0\) |
| 有符号扩展 | \(\mathbb Z\) |
| 零的规范表示 | \(0\) |
| 空词 | 不是规范表示 |

规范非负级联表示 \(\mathbb N_0\)；有符号扩展则单独用于
\(\mathbb Z\)。由于基数是合数，未经证明不得把素数 \(p\)-进制的性质
直接移植到 K3。在第 \(r\) 层，使用如下分解：

\[
\mathbb Z/1000^r\mathbb Z
\cong
\mathbb Z/2^{3r}\mathbb Z\times\mathbb Z/5^{3r}\mathbb Z,
\]

相应的完备化是拓扑环 \(\mathbb Z_2\times\mathbb Z_5\)，而不是域。

## 数学主张的认知状态

文档分别标注定义、公设、假设、引理、定理、推论、猜想、反例、
穷尽有限验证、计算观察、经验观察、数值估计、启发式方法、条件性结果、
已否定的表述以及研究计划。

研究路线图中的条目并不因此成为已证明结果。有限枚举只能支持已完全枚举
的有限范围内的结论。经验规律或数值估计不能充当普遍性证明。除非相应的
形式化证明已经发布，否则文本证明不得称为机器形式化证明。

## 研究方法

~~~mermaid
flowchart TD
    A[数学问题] --> B[经典背景与符号约定]
    B --> C[精确定义与适用范围]
    C --> D[形式模型]
    D --> E{是否已有证明？}
    E -->|是| F[定理与证明]
    E -->|否| G[猜想、反例或开放问题]
    F --> H[对推论进行精确或数值检验]
    G --> H
    H --> I[独立审查并记录状态]
    I --> J[文档化]
~~~

该图描述研究方法，不构成任何定理的证明，也不是来自未注明出版物的插图。

## 文档与仓库结构

### K3 基础理论

- [维尤年科 K3 理论——基础规范](docs/VYUNENKO_THEORY.md)
- [级联平衡、规范化与不变量](docs/CHAPTER_II_CASCADE_BALANCE.md)
- [K3 规范语法与形式文法](docs/K3_CANONICAL_SYNTAX.md)
- [K3 规范基础、代数与语义](docs/K3_CANONICAL_FOUNDATIONS_AND_ALGEBRA.md)
- [K3 复合基数算术](docs/K3_COMPOSITE_RADIX_ARITHMETIC.md)
- [经典数学与术语对应表](docs/CLASSICAL_MATHEMATICS_CROSSWALK.md)
- [基础数学原理参考手册](docs/MATHEMATICAL_FOUNDATIONS_REFERENCE.md)

### 方法论与研究计划

- [数学理论发展规则](docs/THEORY_DEVELOPMENT_RULES.md)
- [K3 建设性研究路线图](docs/CONSTRUCTIVE_RESEARCH_ROADMAP.md)
- [计算研究基础](docs/RESEARCH_COMPUTATIONAL_FOUNDATION.md)
- [数学学科及依赖关系图](docs/MATHEMATICAL_DOMAIN_ARCHITECTURE.md)
- [形式化、认知与证明方法论](docs/FORMAL_EPISTEMIC_AND_PROOF_FRAMEWORK.md)
- [计算研究架构](docs/COMPUTATIONAL_RESEARCH_ARCHITECTURE.md)
- [实验、经验与统计方法论](docs/EXPERIMENTAL_EMPIRICAL_METHOD.md)
- [研究计划路线图](docs/RESEARCH_PLATFORM_ROADMAP.md)
- [可复现研究记录模板](docs/RESEARCH_RECORD_TEMPLATE.md)
- [递归 K 后缀：研究计划与形式审查](docs/K_SUFFIX_SPECULATIVE_RESEARCH_REVIEW.md)
- [协作公式综合：比例与兼容性](docs/COOPERATIVE_VITRUVIAN_FORMULA_SYNTHESIS.md)

### 质量契约与验证

- [项目契约](project-contract.json)
- [数学质量契约](quality-mathematics.json)
- [计算质量契约](quality-computation.json)
- [项目演进契约](engineering-evolution.v1.json)
- [研究基础验证脚本](scripts/validate-foundation.mjs)
- [GitHub Actions：基础验证](.github/workflows/foundation-validation.yml)

## 可复现验证

当前 CI 检查项目契约与数学契约的一致性、K3 规范语义、必需文档以及
README 中的相对链接。这是文档与契约检查，不是对数学证明的机器验证，
也不是数学计算内核的测试套件。

本地验证需要 Node.js 22；这是当前 CI workflow 选择的主版本。
验证脚本仅使用 Node.js 内置模块，无需安装第三方软件包。

~~~bash
git clone https://github.com/Ivan-VHS/Kaskad.git
cd Kaskad
node --version
node scripts/validate-foundation.mjs
~~~

当契约与本地链接有效时，预期输出为：

~~~text
Kaskad mathematical scope, K3 notation, algebraic semantics, arithmetic contracts and local links: OK
~~~

Workflow 使用标签为 ubuntu-latest 的 GitHub 托管运行器、
actions/checkout v4 和 actions/setup-node v4。这是对当前 CI 配置的说明，
并非为数值研究实验完全锁定的环境。未来研究计算应记录工具的准确版本、
源代码修订、精度与舍入设置、输入数据及 SHA-256 校验和；随机过程还应
记录 PRNG 和 seed。

## 数据与实验结果

在所检查的仓库树中，没有已发布的数据集、实验测量档案、benchmark 表格
或相应数据校验和。仓库的主要内容是数学理论研究。因此，本 README 不会
编造数据集链接、模型训练结果、运行次数或统计区间。

未来任何计算或经验结果至少应包含：实验标识、理论版本、Git revision、
算法版本、运行环境、输入校验和、参数、精度与舍入模式、PRNG 和 seed、
时间戳、输出工件以及验证状态。原始数据、派生数据和分析结果应分别保存。

## 指标与硬件要求

理论结果的主要评价标准是定义的正确性、假设的完整性、证明的有效性以及
经典数学对应关系的准确性。凡引入物理量或数值量，均应明确其单位。

本版本没有报告硬件测量、模型训练、推理时间、算法性能，也没有与 SOTA
或基线方法进行比较。理论结果不适用硬件性能指标；未来计算实验应随具体
实验协议一并公布硬件信息。

## 集成数学扩展（2026-11-28）

Kaskad 研究文档库现已纳入 K3 有序算术专著、定向位置组合、基数 \(1000=2^3\cdot5^3\) 的双通道几何，以及 K3-M 的十层有限系数轮廓形态学。

相关应用数学来源分别记录：[DAK](docs/DAK_SYSTEM_MATHEMATICS.md)、[Reaper](docs/REAPER_MATHEMATICAL_FOUNDATIONS.md) 和 [VentuSample 音频数学](docs/VYUNENKO_AUDIO_MATHEMATICS.md)。这些内容是数学模型与对应关系，不表示 Kaskad 实现了这些源项目。

请参阅[CRT 完备化与无限级联](docs/K3_CRT_IDEMPOTENTS_AND_INFINITE_CASCADES.md)、[科学文档标准](docs/SCIENTIFIC_MATHEMATICAL_DOCUMENTATION_STANDARD.md)、[完整文档目录](docs/INDEX.md)和[语言状态登记册](docs/LANGUAGE_REGISTER.md)。K3 的规范基数、系数范围、分隔符和零位置语义均保持不变。

## 许可证与署名

仓库包含 [Apache License 2.0](LICENSE)。当前目录中没有单独声明数据集
或模型许可证。第三方材料的权利与使用条件必须另行注明。

引用时请使用上方 BibTeX 条目，并记录所用文档版本对应的 commit hash。
在 DOI、SWHID 或归档版本标识实际注册之前，不应填写这些编号。

## 参与贡献与问题报告

报告数学问题时，请提供具体文档与章节、待讨论命题、全部假设，以及最小
反例或可检查的推导过程。报告计算问题时，请提供 Git revision、输入数据
或安全的最小示例、参数、准确环境和实际观察结果。

贡献与审查规则见 [CONTRIBUTING.md](CONTRIBUTING.md)，漏洞报告见 [SECURITY.md](SECURITY.md)。数学建议应明确列出假设并提供可检查的论证；未经独立证明，不得将猜想提升为定理。
