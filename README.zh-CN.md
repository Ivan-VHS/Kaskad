# Kaskad — 维尤年科 K3 理论

[Русский](README.md) · [English](README.en.md) · [Українська](README.uk.md)

> **Kaskad** 是维尤年科 K3 理论的数学研究文档库。其核心是以 1000 为基数的有限位置系统；扩展研究算术、表示结构、整除性及相关数学空间。数学理论、计算检验与软件实现彼此区分。

## 1. 数学核心

固定
[
B=1000=10^3=2^3cdot5^3,qquad D_B={0,1,ldots,999}.
]

规范级联是有限系数向量
[
a=(a_m,ldots,a_1,a_0),qquad a_iin D_B,
]
其中 (a_0) 是最低位。其数值为
[
operatorname{Val}_{K3}(a)=sum_{i=0}^{m}a_iB^i.
]

正数的最高位系数非零；零只有规范形式 ((0))。负数属于单独的有符号扩展。

## 2. 位置具有语义

符号 `k` 分隔相邻数值组。它不是数字、基数、乘数或乘法运算符。只有 `k` 边界才推进到下一个 (1000) 次幂；组内十进制数字的位数不会产生新位置。

| 写法 | 从高位到低位的系数 | 数值 |
|---|---:|---:|
| `1k` | ((1,0)) | (1,000) |
| `50k0k7` | ((50,0,7)) | (50,000,007) |
| `50k0k` | ((50,0,0)) | (50,000,000) |

末尾的 `k` 表示恰好省略一个最低位零组。显式零组也保留其位置。未经等价性证明，不得删除、移动或合并零与分隔符：深度相同不代表数值相同。

## 3. 输入模式与相等关系

- **规范模式**只接受严格 K3 语法允许的写法。
- **K3-PAD** 是显式选择的导入与规范化模式，不改变严格解析规则。
- **K3-RAW** 为结构分析保留原始操作数结构及其顺序。

文本、系数结构、数值、表达式树和操作轨迹具有不同的相等关系。最终数值相同，不代表原始写法或计算历史相同。位置移位算子 (S_B) 与符号 `k` 分别定义。

## 4. 算术与扩展

进位和借位由同一个平衡关系描述：
[
c_i+t_i=1000t_{i+1}+r_i,qquad 0le r_ile999.
]
合法规范化保持加权数值；证明和条件见相应数学章节。

由于基数是合数，中国剩余定理对 (rge1) 给出
[
mathbb Z/1000^rmathbb Zcong
mathbb Z/2^{3r}mathbb Z	imesmathbb Z/5^{3r}mathbb Z.
]
相应完备化是环 (mathbb Z_2	imesmathbb Z_5)，不是域。CRT 与无限级联属于独立拓扑扩展，不改变有限 K3 语义。

## 5. 范围与主张状态

K3 为整数提供精确表示，并研究其位置、代数、整除、组合与拓扑性质。测量值、物理单位、统计数据、图和软件实体需要各自的类型、单位与明确映射，不会自动成为 K3 数。

定义引入对象；公设固定约定；定理必须证明；经典结果保留来源和适用条件。计算测试只支持已检查的输入。规范或猜想不等同于实现事实或已确立的定理。

## 6. 文档与验证

- [文档索引](docs/INDEX.md) · [文档指南](docs/DOCUMENTATION_GUIDE.md)
- [规范理论](docs/VYUNENKO_THEORY.md) · [基础与代数](docs/K3_CANONICAL_FOUNDATIONS_AND_ALGEBRA.md)
- [语法](docs/K3_CANONICAL_SYNTAX.md) · [级联平衡](docs/CHAPTER_II_CASCADE_BALANCE.md)
- [CRT 与无限级联](docs/K3_CRT_IDEMPOTENTS_AND_INFINITE_CASCADES.md) · [经典数学对照](docs/CLASSICAL_MATHEMATICS_CROSSWALK.md)
- [开发状态](docs/DEVELOPMENT_STATUS.md) · [科学文档标准](docs/SCIENTIFIC_MATHEMATICAL_DOCUMENTATION_STANDARD.md)

本地验证命令：
```bash
PYTHONPATH=src python -m unittest discover -s tests -v
```
CI 配置覆盖 Python 3.11–3.14；验证结果只适用于对应的运行记录和 Git 修订版。

## 引用与许可

请引用具体 Git 修订版。引用元数据见 [CITATION.cff](CITATION.cff) 和 [CITATION.bib](CITATION.bib)。许可证：[Apache-2.0](LICENSE)。
