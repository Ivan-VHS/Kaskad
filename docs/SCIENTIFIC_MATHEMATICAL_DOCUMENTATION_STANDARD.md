# Научный стандарт математической документации Kaskad — Cascade Edition

**Полное обозначение:** Cascade Edition 1.0.0  
**Версия:** 1.0.0  
**Область действия:** README, математические главы, спецификации, исследовательские обзоры, методологические документы, шаблоны, таблицы и графики Kaskad.  
**Статус:** обязательный научно-редакционный и методологический стандарт; не является аксиоматикой K3 и не доказывает математических утверждений.  
**Языки:** 中文 · English · Русский · Українська.

[中文](#中文) · [English](#english) · [Русский](#русский) · [Українська](#українська)

## Общие положения

Стандарт применяется ко всему научному корпусу. Каждое требование применяется в той мере, в какой оно относится к содержанию документа. Неприменимое требование обозначается «не применимо», отсутствующее подтверждение — «не проверено» или «не установлено». Пустое поле не считается подтверждением.

Kaskad — математический исследовательский корпус. Вычислительные средства имеют вспомогательный статус: они могут проверять точные следствия, конечные области, численные оценки или воспроизводимые эксперименты, но не заменяют доказательство. Kaskad не является операционной системой, языком программирования, IDE, набором драйверов или прикладной платформой.

### Каноническая нотация K3

| Обозначение | Формальное значение | Роль |
|---|---|---|
| \(B\) | \(1000=10^3=2^3\cdot5^3\) | Числовое основание |
| \(k\) | Лексический разделитель соседних групп | Символ грамматики; не основание |
| \(S_B\) | Отдельно определяемый оператор позиционного сдвига | Сдвиг на одну позицию основания \(B\) |
| \(a_i\) | \(0\le a_i\le999\) в канонической форме | Коэффициент позиции \(i\) |
| \(\operatorname{Val}_{K3}(a)\) | \(\sum_{i=0}^{m}a_iB^i\) | Числовая оценка конечного каскада |

Индексы коэффициентного вектора возрастают от младшей позиции к старшей; текстовая запись определяется грамматикой K3 в документе K3_CANONICAL_SYNTAX.md. Записи \(k=1000\) и \(k\equiv1000\) запрещены: они смешивают разделитель и основание.

Пример: **50k0k** кодирует \(50\cdot1000^2=50\,000\,000\), а вектор от младшей позиции к старшей равен \((0,0,50)\). Умножение **50k0k × 25** даёт \(1\,250\,000\,000\), каноническая запись — **1k250k0k**. Для **999k999 + 1** результат равен \(1\,000\,000\) и записывается **1k0k**; запись **1k0k0k** этому результату не эквивалентна.

## Русский

### Десять обязательных правил

### 1. Научная идентичность, авторство и цитирование

Каждый документ имеет однозначные название, тип, версию или дату редакции, происхождение авторства и исследовательский статус. DOI, arXiv, журнальные и препринтные идентификаторы приводятся только после фактического присвоения или публикации. До этого указываются «рукопись в подготовке» и ссылка на репозиторий. Запрещено выдумывать авторов, даты, версии или идентификаторы. Файлы CITATION.cff и CITATION.bib содержат сведения для цитирования репозитория. Действующая LICENSE — Apache-2.0; её нельзя молча заменять или приписывать математическим идеям отдельную лицензию без явного решения и соответствующего текста лицензии.

### 2. Формальная постановка, область и предпосылки

В начале математического документа задаются исследуемые объекты, универсум, область определения, целевые отображения или функционалы, кванторы, ограничения и все предпосылки, необходимые последующим утверждениям. Указываются границы применимости. Аксиома, определение, предположение, гипотеза и теорема не взаимозаменяются. Обзор, дорожная карта или аналогия прямо называются соответствующим типом документа и не имитируют доказательную статью.

### 3. Единая нотация, индексация и терминология

До сложных выводов размещаются таблица символов и соглашения об индексах, типах объектов, областях значений, нормах, размерностях, единицах и нормировках. Смысл символа не меняется внутри документа. Для новых терминов указывается классический математический аналог и границы соответствия. Многоязычный глоссарий закрепляет одинаковое математическое значение на китайском, английском, русском и украинском языках.

Для K3 обязательно сохранять \(B=1000\), **k** как лексический разделитель и \(S_B\) как отдельный оператор. Сырые целочисленные векторы и канонические коэффициенты \(0,\ldots,999\) — разные объекты. Ноль, пустая последовательность, пустое множество, отсутствующее и неопределённое значения не отождествляются.

### 4. Теоремы, доказательства и эпистемический статус

Каждое нетривиальное математическое утверждение получает точную формулировку, область действия, кванторы, предпосылки и зависимости. Теорема сопровождается доказательством; используемые внешние результаты цитируются. Гипотезы, открытые задачи, условные результаты, контрпримеры, конечные исчерпывающие проверки, вычислительные наблюдения, эмпирические наблюдения, численные оценки, эвристики и метафоры маркируются раздельно.

Конечная проверка доказывает только утверждение в полностью перечисленной конечной области. Совпадение с тестовыми примерами или множество численных запусков сами по себе не доказывают универсального утверждения. Изменение статуса результата сопровождается историей и основанием изменения.

### 5. Разделение точной теории, аппроксимации и дискретизации

Точные определения и аналитические выводы отделяются от асимптотических оценок, статистических оценивателей, численных аппроксимаций, дискретизаций, усечений и итерационных схем. Для приближённых методов указываются параметр дискретизации, порядок ошибки, область устойчивости, условия сходимости, критерий остановки и оценка остатка. Если порядок сходимости не доказан и не измерен, он обозначается как неизвестный.

### 6. Алгоритмическая прозрачность и соответствие математике

Если документ описывает алгоритм, приводятся входные и выходные типы, предусловия, постусловия, инвариант, правило остановки и доказательство корректности либо явный статус отсутствующего доказательства. Псевдокод или исходный код связывается с определениями и утверждениями, которые он реализует. Сложность указывается только для определённого алгоритма и параметра размера. Различаются число операций над группами и битовая сложность; модель стоимости арифметики объявляется явно. Не реализованные методы, например FFT/БПФ, не включаются в оценку как достигнутые результаты.

### 7. Воспроизводимость, детерминизм и происхождение данных

Для каждого вычислительного или эмпирического результата фиксируются ревизия исходных материалов, версии реально используемых инструментов, параметры, точность, режим округления, происхождение и лицензия данных, контрольная сумма SHA-256, команды воспроизведения и выходные артефакты. Для случайного процесса указываются генератор, версия, seed и влияние параллельного порядка редукции. Если расчёт не использует внешнее окружение, случайность или набор данных, соответствующее поле отмечается «не применимо».

Python, NumPy, SymPy, pytest, Docker, Nix и GPU не являются обязательными сами по себе. Указываются только реально использованные средства с точными версиями и lock-файлами, если они существуют. Нельзя заявлять побитовую межмашинную идентичность без проверки фактической среды, детерминированных операций и порядка вычислений.

### 8. Эталонные примеры, тесты и контрольные суммы

Каждая центральная конструкция имеет положительные примеры, граничные случаи и контрпримеры. Для вычислимых операций приводятся вход, операция, точный результат и проверяемый статус. Эталонные данные, таблицы и результаты автоматических проверок хранятся в машиночитаемом формате с однозначной схемой. Результат теста называется пройденным только после фактического выполнения на указанной ревизии. Непроверенный пример не помечается как PASS.

### 9. Численная устойчивость, сложность и визуальные материалы

Для приближённых вычислений описываются формат арифметики, округление, погрешность, обусловленность, устойчивость, потеря значащих цифр, переполнение, исчезновение порядка и вырожденные случаи. При необходимости применяются интервальные или произвольной точности методы с раскрытием их гарантий. Производительность описывается только измеренными данными; указываются оборудование, среда, число повторов, разброс и ограничения сравнения.

Графики и схемы добавляются лишь тогда, когда несут математическую информацию. Каждая визуализация имеет определение отображаемой величины, исходные данные и процедуру построения. SVG/PDF предпочтительны для научных графиков, но сами по себе не гарантируют корректность. Иллюстрация не заменяет аналитическое доказательство.

### 10. Мультиязычная эквивалентность, нейтральный стиль и открытые вопросы

Основные публичные точки входа предоставляют семантически эквивалентные версии на 中文, English, Русском и Українською. Перевод сохраняет определения, формулы, кванторы, эпистемические метки, ссылки и статус результата. Если полный перевод конкретного исследования отсутствует, это прямо указывается в реестре языковых редакций, а не скрывается кратким пересказом.

Текст использует нейтральный научный язык. Запрещены рекламные оценки, необоснованные превосходные степени, декоративные эмодзи и утверждения о новизне без обзора литературы. В заключении перечисляются доказанные результаты, ограничения, неразрешённые вопросы и следующие математические шаги. Дорожная карта не выдаётся за уже выполненную работу.

### Минимальный паспорт математического документа

Каждый документ, насколько применимо, содержит: название; тип; происхождение авторства; версию и дату; язык основной редакции и статус переводов; предмет и границы; обозначения; эпистемический статус; зависимости и ссылки; вычислительный протокол либо отметку «не применимо»; историю изменений. Отсутствующие значения помечаются явно.

## Контрольный глоссарий K3

| Русский | English | Українська | 中文（简体） |
|---|---|---|---|
| каскадный перенос | cascade carry | каскадне перенесення | 级联进位 |
| заём | borrow | позика | 借位 |
| каноническая форма | canonical form | канонічна форма | 规范形式 |
| основание системы счисления | radix / base | основа системи числення | 基数 |
| разделитель групп | group separator | роздільник груп | 分组分隔符 |
| позиционный сдвиг | positional shift | позиційний зсув | 位移 |
| свёртка коэффициентов | coefficient convolution | згортка коефіцієнтів | 系数卷积 |
| остаточное дерево | residue tree | дерево лишків | 剩余类树 |
| составное адическое пополнение | composite-adic completion | складене адичне поповнення | 复合进位完备化 |
| ультраметрика | ultrametric | ультраметрика | 超度量 |

---

## 中文

### Kaskad 数学科研文档规范 — Cascade Edition

本标准适用于 Kaskad 的全部科学文档：README、数学章节、形式化规范、研究综述、方法论文档、模板、数据表和图形。它是科研编辑与方法规范，不是 K3 公理，也不构成数学证明。不适用的要求必须标记为“不适用”；尚未核实的内容必须标记为“未核实”或“尚未确定”。

**K3 符号约定：** \(B=1000=10^3=2^3\cdot5^3\) 是数值基数；符号 **k** 是相邻分组之间的词法分隔符；\(S_B\) 是单独定义的位置移位算子。禁止写作 \(k=1000\) 或 \(k\equiv1000\)。系数向量的索引从最低位递增到最高位，规范系数满足 \(0\le a_i\le999\)，数值定义为 \(\operatorname{Val}_{K3}(a)=\sum_{i=0}^{m}a_iB^i\)。**50k0k** 表示 \(50\cdot1000^2=50\,000\,000\)，其低位到高位系数向量为 \((0,0,50)\)。

### 十项强制规则

1. **科学身份、作者与引用。** 每份文档必须具有明确标题、类型、版本或修订日期、作者来源和研究状态。DOI、arXiv、期刊和预印本标识符只有在实际分配或发表后才能使用；在此之前应注明“准备中的手稿”并引用仓库。不得虚构作者、日期、版本或标识符。CITATION.cff 与 CITATION.bib 提供仓库引用信息。现有 LICENSE 为 Apache-2.0；未经明确决定和相应许可文本，不得暗中替换许可证或声称数学思想具有不同许可证。

2. **形式化问题、范围与假设。** 数学文档开头应说明研究对象、全集、定义域、目标映射或泛函、量词、约束及所有必要假设，并明确适用边界。公理、定义、假设、猜想和定理必须严格区分。综述、路线图和类比必须明确其文档类型，不得伪装成证明论文。

3. **统一符号、索引和术语。** 在复杂推导之前提供符号表，说明索引起点、对象类型、值域、范数、维数、单位和归一化方式。符号在同一文档中不得改变含义。新术语必须注明经典数学对应关系及其边界，并通过中英俄乌术语表保持语义一致。K3 中不得混淆 \(B\)、**k** 和 \(S_B\)；原始整数系数向量与规范系数必须分开；零、空序列、空集、缺失值和未定义值不得混为一谈。

4. **定理、证明与认识状态。** 每个非平凡数学命题必须具有精确陈述、定义域、量词、前提和依赖关系。定理必须给出证明，外部结果必须引用。猜想、开放问题、条件结果、反例、有限穷举验证、计算观察、经验观察、数值估计、启发式和隐喻必须分别标记。有限验证只支持完全列举的有限范围。测试样例一致或大量数值运行不能自动证明一般命题。状态变化必须记录理由和历史。

5. **区分精确理论、近似与离散化。** 精确定义和解析推导必须与渐近估计、统计估计量、数值近似、离散化、截断和迭代格式分开。近似方法应说明离散参数、误差阶、稳定范围、收敛假设、停止准则和残差估计。未经证明或测量的收敛阶必须标记为未知。

6. **算法透明度与数学对应。** 算法文档必须给出输入/输出类型、前置条件、后置条件、不变量、终止规则和正确性证明，或明确说明证明尚未完成。伪代码和程序必须关联相应定义与命题。复杂度必须针对明确算法和规模参数给出，并区分分组运算次数与位复杂度。未实现的 FFT 等方法不得作为已实现性能报告。

7. **可复现性、确定性与数据来源。** 每项计算或经验结果应记录源版本、实际使用工具版本、参数、精度、舍入规则、输入数据来源与许可、SHA-256 校验和、复现命令及输出。随机过程须记录生成器、版本、seed 和并行归约顺序的影响。不适用字段必须明确标记。Python、NumPy、SymPy、pytest、Docker、Nix 和 GPU 不是默认要求；只记录实际使用的工具。未经验证，不得声称跨机器逐位一致。

8. **基准例、测试与校验和。** 每个核心构造应包含正例、边界情况和反例。可计算操作应提供输入、运算、精确结果和验证状态。自动检查使用的基准数据应以机器可读格式保存并具有明确结构。只有在指定版本上实际执行后，测试才能标记为通过；未执行的示例不得标记为 PASS。

9. **数值稳定性、复杂度与图形。** 对近似计算说明算术格式、舍入、误差、条件数、稳定性、有效数字损失、溢出、下溢和退化情况。必要时使用区间算术或任意精度方法并说明保证。性能报告必须基于实际测量，并注明硬件、环境、重复次数、离散程度和比较限制。图形仅在提供数学信息时使用，并说明定义、数据和生成方法。SVG/PDF 不能保证数学正确性；图示不能替代证明。

10. **多语言等价、学术中性与开放问题。** 主要公开入口应提供中文、英文、俄文和乌克兰文的语义等价版本。翻译必须保留定义、公式、量词、认识状态、引用和结果状态。若研究文档尚无全文翻译，必须在语言登记中明确说明。禁止营销性描述、未经证实的最高级、装饰性表情和缺少文献综述支持的创新声明。结尾应列出已证明结果、限制、开放问题和后续数学工作；路线图不是完成证明。

每份文档应尽可能包含科学档案：标题、类型、作者来源、版本和日期、主要语言及翻译状态、研究对象和范围、符号、认识状态、依赖与引用、计算协议或“不适用”、以及修订历史。

---

## English

### Kaskad Scientific Mathematical Documentation Standard — Cascade Edition

This standard governs the entire Kaskad research corpus: README files, mathematical chapters, formal specifications, research reviews, methodological documents, templates, tables and figures. It is a scholarly editorial and methodological standard, not an axiom system for K3 and not a mathematical proof. A non-applicable requirement must be marked “not applicable”; missing evidence must be marked “not verified” or “not established.”

**Canonical K3 notation:** \(B=1000=10^3=2^3\cdot5^3\) is the numerical radix; **k** is the lexical separator between adjacent groups; \(S_B\) is a separately defined positional-shift operator. The forms \(k=1000\) and \(k\equiv1000\) are prohibited. Coefficient-vector indices increase from the least significant position to the most significant position; canonical coefficients satisfy \(0\le a_i\le999\), and \(\operatorname{Val}_{K3}(a)=\sum_{i=0}^{m}a_iB^i\). **50k0k** denotes \(50\cdot1000^2=50\,000\,000\), with low-to-high coefficient vector \((0,0,50)\).

### Ten mandatory rules

1. **Scientific identity, authorship and citation.** Every document has an unambiguous title, type, version or revision date, authorship provenance and research status. DOI, arXiv, journal or preprint identifiers may be cited only after they are actually assigned or published. Until then, state “manuscript in preparation” and cite the repository. Never invent authors, dates, versions or identifiers. CITATION.cff and CITATION.bib provide repository citation data. The existing LICENSE is Apache-2.0; do not silently replace it or claim a separate license for mathematical ideas without an explicit decision and corresponding license text.

2. **Formal problem, scope and assumptions.** State the mathematical objects, universe, domain, target maps or functionals, quantifiers, constraints and all assumptions required by later claims at the beginning. State applicability boundaries. Axiom, definition, assumption, conjecture and theorem are distinct statuses. A review, roadmap or analogy must identify itself as such rather than imitate a proof paper.

3. **Unified notation, indexing and terminology.** Before complex derivations, provide a symbol table and conventions for index origins, object types, codomains, norms, dimensions, units and normalization. A symbol must not change meaning within a document. New terms require a bounded crosswalk to classical mathematics and consistent Chinese, English, Russian and Ukrainian terminology. Preserve the distinct K3 roles of \(B\), **k** and \(S_B\); distinguish raw integer coefficient vectors from canonical coefficients; never identify zero, an empty sequence, the empty set, a missing value and an undefined value.

4. **Theorems, proofs and epistemic status.** Every nontrivial mathematical claim needs a precise statement, domain, quantifiers, assumptions and dependencies. A theorem requires a proof and citations for external results. Conjectures, open problems, conditional results, counterexamples, exhaustive finite verification, computational observations, empirical observations, numerical estimates, heuristics and metaphors must be labeled separately. Finite verification supports only the fully enumerated finite domain. Agreement with examples or repeated numerical runs does not establish a universal theorem. Status changes require a reason and an audit trail.

5. **Separate exact theory, approximation and discretization.** Exact definitions and analytic deductions must be separated from asymptotic estimates, statistical estimators, numerical approximations, discretizations, truncations and iterative schemes. For approximate methods, state the discretization parameter, error order, stability range, convergence assumptions, stopping rule and residual estimate. An unproved and unmeasured convergence order is unknown, not presumed.

6. **Algorithmic transparency and mathematical correspondence.** An algorithm description must state input/output types, preconditions, postconditions, invariants, termination rule and a correctness proof, or explicitly state that the proof is absent. Pseudocode and source code must map to the definitions and claims they implement. Complexity is stated only for a specified algorithm and size parameter. Distinguish group-operation count from bit complexity and declare the arithmetic cost model. Unimplemented methods such as FFT must not be reported as achieved performance.

7. **Reproducibility, determinism and data provenance.** Every computational or empirical result records the source revision, versions of tools actually used, parameters, precision, rounding mode, input provenance and license, SHA-256 checksum, reproduction commands and outputs. Random processes specify generator, version, seed and the effect of parallel reduction order. Mark irrelevant fields “not applicable.” Python, NumPy, SymPy, pytest, Docker, Nix and GPUs are not default requirements; record only tools actually used. Do not claim bitwise identity across machines without checking the environment, deterministic operations and evaluation order.

8. **Reference examples, tests and checksums.** Every central construction includes positive examples, boundary cases and counterexamples. Computable operations include input, operation, exact result and verification status. Reference data and vectors used by automated checks are stored in machine-readable formats with explicit schemas. A test may be marked passed only after execution on the stated revision; an unexecuted example must not be labeled PASS.

9. **Numerical stability, complexity and visual material.** For approximate computation, document arithmetic format, rounding, error, conditioning, stability, loss of significance, overflow, underflow and degenerate cases. Use interval or arbitrary-precision methods when needed and state their guarantees. Performance claims require measured data and must state hardware, environment, repetitions, variability and comparison limits. Figures are included only when they convey mathematical information; define the plotted quantity and identify its data and generation procedure. SVG/PDF does not guarantee correctness. A diagram never replaces an analytic proof.

10. **Multilingual equivalence, neutral style and open problems.** Main public entry points provide semantically equivalent Chinese, English, Russian and Ukrainian editions. Translation preserves definitions, formulas, quantifiers, epistemic labels, references and result status. If a complete translation of a research document is unavailable, record this explicitly in the language register. Prohibit promotional language, unsupported superlatives, decorative emoji and novelty claims without a literature review. Concluding sections identify proved results, limitations, unresolved questions and subsequent mathematical work. A roadmap is not evidence of completion.

Each document should include, as applicable, a scholarly record: title, type, authorship provenance, version and date, primary language and translation status, subject and scope, notation, epistemic status, dependencies and citations, a computational protocol or “not applicable,” and revision history.

---

---

## Українська

### Десять правил наукового математичного оформлення документації

1. **Ідентичність і цитування.** Назва, тип, авторство, версія, дата та статус зазначаються явно. DOI та arXiv наводяться лише після присвоєння. До публікації вказують «рукопис готується» та посилання на репозиторій. Не можна вигадувати бібліографічні дані. CITATION.cff і CITATION.bib містять посилання на корпус Kaskad; чинна LICENSE — Apache-2.0.

2. **Формальна постановка.** На початку фіксують об'єкт, область, квантори, відображення, обмеження, припущення та межі застосовності. Аксіома, означення, припущення, гіпотеза й теорема мають різні статуси.

3. **Нотація.** До формул наводять символи, індекси, типи, норми, розмірності та одиниці. У K3 основа — \(B=1000\); \(k\) — роздільник; \(S_B\) — оператор зсуву. Запис \(k=1000\) заборонений. Нуль, порожня послідовність, порожня множина, відсутність і невизначеність розрізняються.

4. **Доведення та статус.** Теореми мають точні передумови й доведення. Гіпотези, відкриті задачі, контрприклади, скінченні перевірки, обчислювальні та емпіричні спостереження, числові оцінки й евристики позначаються окремо. Скінченний перебір не доводить нескінченне твердження.

5. **Теорія й наближення.** Точні формули відокремлюють від асимптотики, статистичних оцінок, дискретизації та ітерацій. Для наближень зазначають похибку, стійкість, умови збіжності й критерій зупинки. Невідомий порядок збіжності не припускають.

6. **Алгоритми та складність.** Описують типи входу/виходу, передумови, постумови, інваріант, завершення та коректність. Складність стосується конкретного алгоритму; розрізняють операції над групами й бітову складність. Нереалізовані методи не вважають досягнутими.

7. **Відтворюваність.** Для обчислювального результату зазначають ревізію, версії інструментів, параметри, точність, округлення, дані, ліцензію, SHA-256, команду запуску й виходи. Для випадкових методів фіксують генератор і seed. Непридатні поля позначають явно. Необов'язкові інструменти не нав'язуються.

8. **Еталонні приклади.** Наводять позитивні, граничні та негативні випадки. Автотести використовують машинозчитувані дані. PASS дозволено лише після фактичного запуску на зазначеній ревізії.

9. **Числова коректність і графіки.** Документують похибку, зумовленість, округлення, стійкість і переповнення. Бенчмарки публікують лише з вимірюваннями та описом середовища. Графіки мають точне визначення даних і процедури побудови; вони не замінюють доведення.

10. **Мови й науковий стиль.** Публічні вхідні документи мають еквівалентні версії китайською, англійською, російською та українською. Повноту перекладів зазначають явно. Заборонені рекламні оцінки, непідтверджена новизна й декоративні елементи. Наприкінці перелічують результати, обмеження та відкриті задачі.
