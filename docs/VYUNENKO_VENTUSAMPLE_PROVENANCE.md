# Происхождение математического переноса VentuSample

**Назначение:** контроль источников, из которых извлечены математические определения, каталоги и ограничения для Теории Вьюненко K3.  
**Дата снимка:** 2026-11-28  
**Исходный репозиторий:** [Ivan-VHS/VentuSample](https://github.com/Ivan-VHS/VentuSample)  
**Исходная ветвь:** main  
**Тип идентификатора:** SHA в таблице — Git blob SHA файла, а не SHA коммита ветви.

## 1. Правило происхождения

Математическая ветвь Kaskad содержит производные формулы, определения, типизированные отображения и каталоги стабильных ID. Исходные реализации VentuSample не копируются в Kaskad и не объявляются реализациями K3. Для каждого существенного математического определения сохраняется ссылка на первичный файл и его blob SHA на момент обследования.

Изменение любого зафиксированного файла может изменить смысл формулы, диапазоны параметров, обработку границ или стабильные ID. Поэтому при обновлении VentuSample необходимо повторно проверить этот реестр и синхронизировать производные документы. Один только совпадающий путь файла не гарантирует совпадения содержания.

## 2. Ключевые документы источника

| Файл VentuSample | Blob SHA | Использованное содержание |
|---|---|---|
| docs/ARCHITECTURE.md | 28413ac6798dba66f6f09c26ff5905e186b56abc | границы архитектуры, offline scope, frame и processor limits |
| docs/QUANTUM_AUDIO_ENGINE.md | a7bf0fa53463aabb6edc4726a5797a5b599f0043 | 133 DSP identities, 21 kernels, параметрические и архитектурные ограничения |
| docs/ATOMIC_QUANTUM_133.md | 69eb40b6c722a17b518b2ad24d0e3ced26b6861c | независимый Atomic-Quantum каталог и шесть семейств |
| docs/PLUGINS.md | 694a395c8af0f6fc3a1a324a9526659ef4f818e5 | 19 встроенных модулей, plugin identity и lifecycle boundaries |
| docs/OFFLINE_SPECTRUM_ANALYSIS.md | db6299805551eb8745535e0e8c94c57babcff693 | FFT window, bin layout, spectral centroid и rolloff |
| docs/MIDI_AND_RESAMPLING.md | 1c7bddc61a36bf207728fe0192345f36354dad4c | MIDI SMF limits, tempo metadata, linear and sinc resampling |
| docs/OCTA8.md | b15e7e59b50d671f1c58abc84aab0ded8702ca46 | рекурсивные value types и validation bounds |
| docs/MULTI_SYNTAX_DSP_CHAIN.md | e67847fc1611332b2c822cc7c69054430d0b2482 | syntax-neutral chain contract и transaction semantics |
| docs/CRATE_PRODUCTION_SUITE.md | 6e11ccd755ec89c79eea9bfd075dc57269c98c63 | музыкальный workflow и его implemented/not-claimed границы |

## 3. Основные исходные реализации

| Файл VentuSample | Blob SHA | Математический слой Kaskad |
|---|---|---|
| src/generator.hpp | 5ee56fd312983eef61ccfe6af1331d513ca05b93 | типы параметров, сигнального буфера и измерений |
| src/generator.cpp | 0da25f3d6acbb11b5dc2ce39a834a4fedbf36216 | синтез, BPM/grid, swing, envelopes, panning, source chops, PCM export |
| src/quantum_audio.hpp | efddc4355adb393107acf13b5a61fdf859bbe77d | тип DSP модели, plugin identity, параметрические структуры и chain reports |
| src/quantum_audio.cpp | 4285aa36a21cbf1173c9d4e66cf016e591fd6032 | все 133 QP entries и 21 общая DSP-модель |
| src/stochastic_router.hpp | f22d93b6be919dcf176a689950e8665ecc5138db | типизированная конфигурация эффекта и графа маршрута |
| src/stochastic_router.cpp | c20b33c04bde80ac24f4f38cfa30979a3364d8a6 | seed-derived планы, весовой выбор, топологии, ограничители |
| src/atomic_quantum.hpp | 1f685daed8601a9b6404d8c51a438b30730ff5b7 | тип комплексного регистра и операции симуляции |
| src/atomic_quantum.cpp | 44864c2307e2f0fc494dc6f6e70ac47398a4c704 | 133 Atomic-Quantum IDs и явные амплитудные операции |
| src/octa8.hpp | 65437da3f950db1ed114557387c322c3974c7847 | восемь типов значений, рекурсивная проверка и числовая конечность |

## 4. Низкоуровневый C11 DSP

| Файл VentuSample | Blob SHA | Математический слой |
|---|---|---|
| src/compat/pytyliki-dsp/dsp.h | ec737800c70f49dad791b69265fdf3b6d71d1188 | audio buffer and measurement contracts |
| src/compat/pytyliki-dsp/dsp.c | 7df96460d460a5b1d4f2299e3e821994fd2ce1f0 | gain, one-pole low-pass, compressor, tanh saturator, statistics, PCM16 I/O |
| src/compat/pytyliki-dsp/dsp_engine.h | 0142cf999c606ca55eae4a9797183a4b7b243a58 | scalar engine, biquad, FIR, limiter states |
| src/compat/pytyliki-dsp/dsp_engine.c | 36b5c2a071b079d6330cc0cf9067955839378a4b | recurrence equations for biquad, FIR and envelope limiter |
| src/compat/pytyliki-dsp/resample.h | a7fb126206919a033b913eca0e28cf448f351995 | public resampler signatures and quality boundaries |
| src/compat/pytyliki-dsp/resample.c | 9d6371bb90edd4b2c0d58d404b66e3fb8b97095b | linear and 16-tap windowed-sinc interpolation |
| src/compat/pytyliki-dsp/spectrum.h | 073813d33b592a55d725f7f950b60593302337bb | FFT limits and spectrum measurement contract |
| src/compat/pytyliki-dsp/spectrum.c | eff815cbf74a96610e2f5a9fb916c6f4b2b06bd9 | radix-2 FFT, Hann window and spectral metrics |
| src/compat/pytyliki-dsp/midi_file.h | 8662baf80de0c5cb9e6f03cb89af04308ebd7c6b | bounded MIDI event data types |
| src/compat/pytyliki-dsp/midi_file.c | 1fdf19ff3278c8d50a83bccc118d4d06bcb406bd | bounded SMF 0/1 parser |


## 5. Дополнительные доменные и runtime-источники

| Файл VentuSample | Blob SHA | Формализованный домен |
|---|---|---|
| src/audio_telemetry.hpp | e14a77bc9b59178292bc12f68ed460fdad685bed | типы счётчиков callback, memory budget и render stages |
| src/audio_telemetry.cpp | b641ddc0fb72dc1fde2687335017cd599b7da9b4 | load ppm, overrun counters, Normal/Reduced/Emergency policy |
| src/budget_planner.hpp | 98187e6e6925d040b04177af78f846b8684c4fbf | шестимерное целочисленное распределение бюджета |
| src/budget_planner.cpp | cb9f8e6ee2b0efdbcdf7fc0166ba238effc8e3f5 | суммы категорий, remaining и within-budget predicate |
| src/occasion_planner.hpp | 078d4748f54b0e6ef65f7719874496aa0879e224 | целочисленные allocation, bounded catalog и gift-plan types |
| src/occasion_planner.cpp | 40222eb866c099e0cce0d506344b1f524dc8bd53 | equal/largest-remainder split, комбинации, greedy basket, bipartite greeting graph |
| src/careguard.hpp | 38ee7ca6bea78eb477c0eb640fa7cb0ce4d8b08e | workload snapshot, rule score и resilience reserve |
| src/careguard.cpp | 1b30c0740c47a5b27f4eb273105b33a3bfdd942a | piecewise pressure heuristic, ceiling reserve, bounded string checks |
| src/plugin_manager.hpp | 7fa2b3e9ce38533744d2f75a1531480f10fd85ff | plugin descriptor, handler lifecycle и versioned metadata types |
| src/plugin_manager.cpp | b8e32ac03a2517b9fe3dedbaf649547bdad47705 | manifest validation, bounded parsing, registration and lifecycle |
| src/builtin_plugins.cpp | f5c358a78f127d41edc611460b26bb08a8975792 | 19 встроенных операций и их workflow contracts |
| src/preset_store.hpp | 455502c9b27fda3b4f41fba42dbf88345225f492 | preset schema identity and typed parameter API |
| src/preset_store.cpp | c19c2f8c3c06c01e29be94c1e821c6115f69c072 | whitelist parsing, range validation and candidate commit |
| src/reaper_expression.hpp | cef32d9c03ba7b573c3235dd3a3bfd34c57cfe51 | optional Reaper integer-expression ABI and selfhood lookup |
| src/reaper_expression.cpp | 0ae077bc98c4d0fa0d10c0f2c1294501f2dd06e8 | ABI status, int64 candidate publication and 1 MiB input limit |
| src/runtime_transaction.hpp | 4ee53d8a5cabc3221870b450b99853e98a01b461 | committed/staged payload, generation, schema and transaction status |
| src/runtime_transaction.cpp | 7b3863d8f0cc639970ea6bf6de19d44ce4832356 | CRC32 integrity check, generation conflict, commit and rollback |

## 6. Schema source files

| Файл VentuSample | Blob SHA | Роль |
|---|---|---|
| schemas/quantum-audio-chain.v1.schema.json | eb22068cffefa6625d62216654e03f17c00b47de | typed chain JSON contract and 133-step limit |
| schemas/atomic-quantum-functions.v1.json | 50521890a69ec02f92e0487cda25f6b7374f4ace | Atomic-Quantum function registry |

## 7. Производные документы Kaskad

| Документ Kaskad | Что переносит |
|---|---|
| VYUNENKO_AUDIO_MATHEMATICS.md | формулы дискретных сигналов, генерации, DSP, статистики, анализа и численных ограничений |
| VYUNENKO_AUDIO_CATALOGUE.md | полный реестр 133 DSP identities и отдельный реестр 133 Atomic-Quantum IDs |
| VYUNENKO_K3_AUDIO_BRIDGE.md | точное кодирование индексов и целых PCM-кодов, единицы, фиксированная точность и tensor mapping |
| VYUNENKO_THEORY.md, раздел 73 | согласование прикладной математической ветви с фундаментальной K3 |

## 8. Ограничения доказательности

1. Blob SHA удостоверяет идентичность содержимого отдельного файла, но не удостоверяет весь repository snapshot как единый commit.
2. Документация источника не заменяет исходный алгоритм. Формулы по возможности сверялись с реализацией.
3. Наличие каталожного ID не доказывает, что у него есть самостоятельный kernel или полноценная физическая модель.
4. Конечный тест не доказывает универсальную теорему для всех входов.
5. Производный документ должен сохранять distinction между implemented, specified, planned и metaphorical behavior.
6. Отсутствующие или не проверенные файлы не получают вымышленных SHA и не включаются как подтверждённые источники.

## 9. Правило обновления

При изменении источника:
- повторно получить blob SHA исходных файлов и схем;
- сравнить старые и новые математические зависимости;
- обновить каталог только после проверки уникальности ID и числа записей;
- обновить формулы только после сверки с кодом и параметрическими пределами;
- добавить тестовые векторы для изменившихся отображений;
- пересмотреть связанные секции основной Теории Вьюненко и Kaskad README;
- сохранить предыдущую версию документов через git history.

