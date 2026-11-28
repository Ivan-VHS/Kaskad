# Архитектура математического репозитория Kaskad

> Cascade Edition 1.0.0 · Нормативная карта организации научных материалов.
> **Статус:** архитектурная спецификация репозитория, не математическое доказательство.
> **Канон K3:** \(B=1000\); \(k\) — лексический разделитель; \(S_B\) — отдельный оператор позиционного сдвига.

## 1. Правило разделения

Репозиторий разводит шесть типов материалов: математические объекты и предпосылки; теоремы и доказательства; гипотезы и контрпримеры; эталонные вычисления и эксперименты; типизированные прикладные модели; реально существующий исходный код, тесты и автоматизацию.

Ни один тип свидетельства не повышает автоматически статус другого. Код не является доказательством; ожидаемый вектор не является результатом выполненного теста; описание API не означает, что API реализован; CI проверяет только явно закодированные конечные условия.

## 2. Дерево слоёв

Канонические документы пока сохраняют исторические пути в docs/. Вложенные каталоги ниже — навигационные входы к ним, а не копии теории. Это исключает массовое перемещение файлов и разрыв ссылок в активных PR.

~~~text
Kaskad/
├── .github/workflows/
│   ├── ci.yml
│   ├── foundation-validation.yml
│   ├── k3-contract-validation.yml
│   └── vyunenko-ecosystem-sync.yml
├── docs/
│   ├── 01-foundations/README.md
│   ├── 02-core-theory/README.md
│   ├── 03-proofs-and-theorems/README.md
│   ├── 04-algebra-and-topology/README.md
│   ├── 05-classical-crosswalk/README.md
│   ├── 06-open-problems/README.md
│   ├── 07-applied-models/README.md
│   ├── 08-computational-evidence/README.md
│   ├── VYUNENKO_THEORY.md
│   ├── K3_CANONICAL_SYNTAX.md
│   ├── K3_GRAPH_CATEGORY_SEMIOTIC_SYNTHESIS.md
│   ├── CHAPTER_II_CASCADE_BALANCE.md
│   ├── K3_CLAIM_REGISTRY.json
│   ├── K3_COUNTEREXAMPLES_AND_BOUNDARIES.md
│   ├── K3_REFERENCE_VECTORS.json
│   └── INDEX.md
├── formal/README.md
├── schemas/
│   ├── k3-claim-registry.v1.schema.json
│   ├── k3-reference-vectors.v1.schema.json
│   └── oplague-k3-model.v1.schema.json
├── src/kaskad_k3/
│   ├── __init__.py
│   └── core.py
├── tests/
│   ├── vectors/k3-vectors.json
│   ├── test_core.py
│   ├── test_vectors.py
│   └── README.md
├── scripts/
│   ├── validate-foundation.mjs
│   ├── validate-k3-contract.mjs
│   ├── sync_vyunenko_docs.mjs
│   └── README.md
├── assets/
├── CITATION.cff
├── CITATION.bib
├── CONTRIBUTING.md
├── SECURITY.md
├── LICENSE
├── project-contract.json
├── quality-mathematics.json
├── quality-computation.json
├── engineering-evolution.v1.json
├── pyproject.toml
└── README.md
~~~

## 3. Назначение слоёв

| Слой | Вход | Что хранится |
|---|---|---|
| 01 · Основания | docs/01-foundations/README.md | Постулаты, определения, алфавит, типы и границы |
| 02 · Ядро | docs/02-core-theory/README.md | Каноническая семантика, арифметика и нормализация |
| 03 · Доказательства | docs/03-proofs-and-theorems/README.md | Формулировки, доказательства, зависимости и статусы |
| 04 · Алгебра и топология | docs/04-algebra-and-topology/README.md | Кольца, делимость, CRT, метрики и пополнения |
| 05 · Crosswalk | docs/05-classical-crosswalk/README.md | Классические соответствия, источники и атрибуция |
| 06 · Открытые задачи | docs/06-open-problems/README.md | Гипотезы, контрпримеры, ограничения и вопросы |
| 07 · Прикладные модели | docs/07-applied-models/README.md | DAK, Reaper, Pytyliki, VentuSample и OPlague |
| 08 · Вычислительные свидетельства | docs/08-computational-evidence/README.md | Векторы, код, тесты, эксперименты и CI |

## 4. Источники истины

- Теория: docs/VYUNENKO_THEORY.md.
- Графо-категориально-семиотическая модель, локальные паспорта и эффекты: docs/K3_GRAPH_CATEGORY_SEMIOTIC_SYNTHESIS.md.
- Синтаксис: docs/K3_CANONICAL_SYNTAX.md.
- Статусы и зависимости: docs/K3_CLAIM_REGISTRY.json.
- Контрпримеры: docs/K3_COUNTEREXAMPLES_AND_BOUNDARIES.md.
- Ожидаемые значения: docs/K3_REFERENCE_VECTORS.json.
- Схемы данных: schemas/.
- Эталонный исполняемый код: src/kaskad_k3/.
- Фактические тесты и фикстуры: tests/.
- Валидаторы и интеграционная автоматизация: scripts/ и .github/workflows/.

Канонические документы не копируются в новые каталоги: индексные README ведут к единственному нормативному месту. Перемещение существующего документа требует отдельного атомарного обновления всех локальных ссылок, реестров, workflow и активных веток.

## 5. Машинная формализация

Каталог formal/ зарезервирован для будущей машинной формализации. На текущей ревизии не принят Lean, Coq, Agda, Isabelle или SMT toolchain. Ни одно утверждение реестра не объявляется machine-checked. Ручные доказательства расположены в теории и специализированных главах.

Выбор proof assistant требует определить логику, библиотеки, импортируемые аксиомы, соответствие claim ID формальным именам теорем, версии инструментария и воспроизводимый CI-процесс. Пустой каталог или placeholder-файл не является формализацией.

## 6. Связанные контракты

- [Карта документов](INDEX.md)
- [Реестр утверждений](K3_CLAIM_REGISTRY.json)
- [Контрпримеры](K3_COUNTEREXAMPLES_AND_BOUNDARIES.md)
- [Формальная эпистемика](FORMAL_EPISTEMIC_AND_PROOF_FRAMEWORK.md)
- [Научный стандарт](SCIENTIFIC_MATHEMATICAL_DOCUMENTATION_STANDARD.md)
- [Контракт проекта](../project-contract.json)
