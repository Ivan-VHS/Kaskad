# Формальные модели и инварианты DAK: каталог переноса в K3

**Документ:** DSM-02  
**Версия:** 1.0.0  
**Источник:** репозиторий [Ivan-VHS/DAK](https://github.com/Ivan-VHS/DAK), ветка main, состояние проверки 28 ноября 2026 года  
**Базовый математический слой:** [Теория Вьюненко K3](VYUNENKO_THEORY.md)  
**Основная модель:** [Математическая основа DAK](DAK_SYSTEM_MATHEMATICS.md)  
**Трассировка:** [DAK ↔ K3](DAK_K3_ALIGNMENT_AND_TRACEABILITY.md)  
**Полный реестр:** [340 исходных файлов DAK](DAK_REPOSITORY_MATHEMATICAL_INVENTORY.md)

---

## 1. Назначение и правила чтения

Этот каталог раскрывает математические модели по исходным подсистемам DAK и связывает каждый предметный блок с источниками. Он нужен для проверки полноты переноса: новая формула должна иметь источник, тип объекта, единицы, предусловия, ограничения, сохраняемые инварианты и статус реализации.

В колонке зрелости указывается статус той части системы, которую подтверждают источники DAK. Статус относится к конкретной границе: например, Reaper-контракт может быть исполняемым в reference runtime, но нативный механизм ядра — отсутствовать.

Термины:
- **модель** — математический объект и его тип;
- **инвариант** — свойство, сохраняемое допустимыми переходами;
- **контракт** — проверяемая граница входа, выхода и ограничений;
- **свидетельство** — тест, исходный код, сборка, эмуляторный лог или аппаратная проверка;
- **непокрытая часть** — поведение, которое нельзя вывести из текущего источника.

## 2. Модель загрузки и ядра

| Источник DAK | Математическая структура | Сохраняемый инвариант | Граница свидетельства |
|---|---|---|---|
| duckos/kernel/boot.rpr | Конечный автомат фаз из 9 состояний | Разрешены только соседние переходы reset → firmware → memory → interrupts → scheduler → ipc → drivers → services → desktop | Последовательность Reaper-контракта; не весь пользовательский запуск |
| duckos/kernel/arch/x86_64.rpr | Профиль аппаратных признаков, модель IDT-gate, диапазоны страниц | Gate имеет корректные vector/selector/type/DPL/IST; страничные адреса выровнены на 4096 | Контракт x86-64; нативный путь имеет отдельно подтверждённые границы |
| duckos/kernel/arch/aarch64.rpr | Профиль уровня исключений, гранулы MMU и типов памяти | Гранула принадлежит {4096, 16384}; тип региона и политика кэша принадлежат перечислениям | Архитектурный интерфейс; полноценный квалифицированный ARM64 backend не заявлен |
| duckos/kernel/memory.rpr | Целочисленная интервальная арифметика | Верхняя граница исключительна; отрицательные размеры и переполнение отвергаются | Reaper-алгоритм валидации, не физический allocator |
| duckos/kernel/arena.rpr | Автомат арены и SoA-раскладки | Курсор не выходит за лимит; резервирование выравнивается по 64 байтам; total_bytes не превосходит бюджета | Контракт арен; не касание физической памяти |
| duckos/kernel/vm.rpr | Пространство виртуальных диапазонов и предикат отображения | 4096-byte alignment, допустимый пользовательский диапазон, разрешения из фиксированного множества | Admission и классификация page fault; не таблицы страниц/TLB |
| duckos/kernel/process.rpr | Конечный автомат процессов и отношение порождения | Нельзя пропускать разрешённые стадии; права потомка — подмножество прав родителя | Политика жизненного цикла; не создание адресного пространства |
| duckos/kernel/threads.rpr | Автомат потоков и отношение affinity | Идентификаторы и stack bounds валидны; каждый CPU в affinity лежит в диапазоне числа CPU | Политика; контекстные switch и стек не создаются |
| duckos/kernel/dabi64.rpr | ABI-кортеж системного вызова и отдельный автомат NEW/READY/RUNNING/BLOCKED/ZOMBIE/DEAD | Номер вызова, число аргументов и flags ограничены; состояния переходят только по объявленным рёбрам | Валидация descriptor; не syscall entry/return |
| duckos/kernel/syscall.rpr | Таблица сигнатур syscalls с пределами argc/payload и capability | Запрос допускается лишь для enabled descriptor, running caller, допустимого argc/bytes и разрешения | Политика dispatch; нативный handler и проверка caller identity остаются kernel work |
| duckos/kernel/handles.rpr | Типизированный непрозрачный handle, владелец и множество прав | Закрытый/устаревший или чужой handle не разрешается; нужное право проверяется точно | Решение о lookup; handle table и generation counters принадлежат native backend |
| duckos/kernel/atomic.rpr | Алгебра допустимых memory-order сочетаний | Load/store/failure-order не содержат запрещённых порядков; ширина и выравнивание согласованы | Проверка запроса; CPU/compiler atomic backend выполняет операцию |
| duckos/kernel/flock.rpr | Ранжирование worker по отношению load/capacity | Выбирается доступный worker с достаточной оставшейся ёмкостью; сравнение дробей целочисленное | Политика выбора; нет создания потока/work-stealing |
| duckos/kernel/scheduler.rpr | Лексикографический приоритет задач | Максимальный priority, затем минимальный deadline; при полном равенстве сохраняется первый элемент входа | Детерминировано при фиксированном порядке входа; tie-break permutation-invariant не доказан |
| duckos/kernel/ipc.rpr | Ограниченная FIFO-последовательность | Размер не превышает capacity; полный send не изменяет очередь; receive удаляет первый элемент | Контракт очереди; не shared-memory transport |
| duckos/kernel/zero_copy_bus.rpr | Счётчики байтов, producer/consumer sequence, watermark | occupied ≤ capacity; публикация не превышает свободное место; consume не может списать больше занятого | Учётная модель UDB; не отображает shared pages и не передаёт zero-copy payload |
| duckos/kernel/synchronization.rpr | Автоматы mutex/semaphore/event | Ограничены wait queues, recursion и semaphore count; handoff только очередному ожидающему | Политика состояния; wakeup/atomic exclusion требуют native scheduler |
| duckos/kernel/atomic.rpr | Допустимые пары memory order | Fail-order не release/acq_rel; совместимость зависит от success-order | Контракт проверки; нет доказательства работы SMP backend |

### 2.1. Дополнительные числовые соглашения ядра

- Адреса и размеры должны иметь явно назначенную ширину; нельзя смешивать signed и unsigned интерпретации без преобразования.
- Для интервалов верхняя граница исключительная.
- Для арены используется выравнивание 64 байта; для страниц — 4096 байт. Значения и единицы сохраняются раздельно.
- В x86-64-профиле пользовательская верхняя граница адреса записана как \(2^{47}\); в проверке диапазона учитывается сама граница, а не десятичная длина строки адреса.
- В AArch64 модель гранулы допускает 4 KiB и 16 KiB. Это отдельная архитектурная ветвь, не перенумерация x86-64 страниц.
- Модель атомарного порядка различает relaxed, acquire, release, acq_rel и seq_cst. Их нельзя сортировать по простой числовой «силе» без таблицы совместимости для конкретной операции.

## 3. Драйверы и аппаратные ресурсы

| Источник DAK | Модель | Инварианты и условия | Граница |
|---|---|---|---|
| duckos/drivers/abi.rpr | Дескриптор (id, ABI, bus, requested capabilities) | Точное совпадение ABI, допустимая шина, каждый capability выдан | Проверка описания, не загрузка |
| duckos/drivers/orchestrator.rpr | Устройство (id, bus, resource interval, IRQ, exclusive flag) | Пересечение memory ranges запрещено; конфликтующие эксклюзивные IRQ запрещены | Нет установки/запуска драйвера |
| duckos/drivers/mmio.rpr | Регион MMIO с base/bytes/width/access/endian/capability/mapped | Width ∈ {1,2,4,8}; смещение выровнено и внутри границ; права доступа совместимы | Требуется trusted MMIO adapter |
| duckos/drivers/dma.rpr | Автомат владения DMA-буфером | allocated → mapped → device-owned → cpu-owned → released; освобождение при device-owned запрещено | IOMMU, pinning и cache maintenance не реализованы контрактом |
| duckos/module_abi.py | Типизированные данные о модуле и ABI | Архитектура, версия, экспортируемые интерфейсы и границы проверяются отдельно | Проверка метаданных не означает исполнения модуля |

Конфликт диапазонов должен вычисляться по полуоткрытым интервалам. IRQ-конфликт зависит от флага эксклюзивности, поэтому равные номера IRQ не всегда автоматически означают конфликт.

## 4. Память, файловая система и локальное состояние

| Источник DAK | Модель | Инвариант | Граница |
|---|---|---|---|
| duckos/storage/path.rpr | Последовательность компонентов пути и корневой идентификатор | Компоненты ограничены длиной, пустые и parent-traversal компоненты запрещены; symlink escape контролируется | Проверка пути, не VFS I/O |
| duckos/storage/vfs.rpr | Mount descriptor, операции read/write/snapshot | NTFS write запрещён; операция требует точного capability | Метаданные и policy, не драйвер FS |
| duckos/storage/journal.rpr | Append-only журнал с sequence и prepared/committed | Последовательность начинается с 1 и непрерывна; recovery указывает на последний committed entry | Flush и durable media должны доказываться backend |
| duckos/storage/history.rpr | Разветвлённая история ревизий | Идентификаторы уникальны, родительская ревизия существует, порядок ревизий строго возрастает | Модель истории; не гарантирует физическую персистентность |
| duckos/storage/hypergraph.rpr | Граф версионированных узлов и зависимостей | digest уникален, self-edge отвергается, зависимости должны быть известны | Нужна дополнительная проверка циклов или append-only topological discipline |
| duckos/storage/crdt.rpr | LWW register по Lamport clock/actor/value | При полном строгом порядке ключа merge является максимумом | Текущая text(value) tie-ветка требует проверки инъективности и коммутативности |

### 4.1. Журнал и история не одно и то же

Журнал фиксирует последовательность событий/записей и состояние commit. История содержит связь новой ревизии с родительской и ветвью. Журнал может быть линейным, а история — ветвящейся. Сведение обоих объектов к общей последовательности уничтожило бы отношение происхождения ветвей.

### 4.2. CRDT-критерий

Для доказательства join-свойств должен существовать полный порядок на значениях. Рекомендуемый ключ:

\[
K(r)=(clock(r),actor(r),valueKey(r)).
\]

Операция merge задаётся как максимум по этому ключу. Требуется:
1. valueKey детерминирован и инъективен на семантических значениях;
2. actor имеет стабильную каноническую форму;
3. clock — неотрицательный целый счётчик;
4. конфликтные одинаковые ключи соответствуют равным значениям.

До выполнения этих условий документ не маркирует существующий merge как доказанный join-semilattice.

## 5. Сеть и протоколы

| Источник DAK | Математическая модель | Инварианты | Граница |
|---|---|---|---|
| duckos/network/stack.rpr | Endpoint descriptor, упорядоченный firewall | TCP/UDP и конечные состояния; первое совпавшее firewall-правило определяет результат; default deny | Политика, не полноценный сетевой стек |
| duckos/network/dns.rpr | DNS labels и question tuple | 1..127 labels, каждый label 1..63, сумма wire length ≤254; UDP bound 512..4096 | Валидация DNS вопроса/ответа |
| duckos/network/ipv4.rpr | Массив октетов IPv4 и checksum folding | Октеты 0..255; header length 20..60, кратна 4; total length и checksum согласованы | Парсер/валидатор, не NIC/socket service |
| duckos/network/tcp.rpr | Конечный автомат TCP connection state | Переходы соответствуют перечисленным событиям; sequence window текущего кода не wrap-aware | Требуется native serial arithmetic и transport |
| duckos/network/udp.rpr | UDP datagram descriptor | Размер ≥8; source/destination port не нулевые; length field равен длине сегмента | Валидация/решение доставки, не транспортное исполнение |

### 5.1. DNS

Длина доменного имени — это сумма длин меток и разделительных байтов, а не простое число визуальных символов. Каждый label ограничен 63 байтами; число label не превышает 127; итоговая длина — 254. Тип записи и класс DNS остаются перечислениями, а не числовыми K3-координатами без типа.

### 5.2. IPv4 checksum

Для 16-битных слов заголовка вычисляется one’s-complement сумма с переносом старших разрядов обратно в младшие:

\[
s_{n+1}=(s_n+w_n)\bmod 2^{16}
+\left\lfloor\frac{s_n+w_n}{2^{16}}\right\rfloor.
\]

После обработки заголовка валидная сумма равна \(2^{16}-1\). Должны быть отдельно проверены длина заголовка и заявленная полная длина пакета.

### 5.3. TCP sequence arithmetic

Текущий контракт явно использует невращающийся интервал sequence values. Для настоящего TCP 32-битная serial arithmetic должна отдельно обрабатывать wrap-around и половину кольца. Значит, текущий код является policy/descriptor-check, а не полным корректным TCP sequence engine.

## 6. Службы, время и транзакционные процессы

| Источник DAK | Математическая модель | Инвариант | Граница |
|---|---|---|---|
| duckos/services/init.rpr | Service unit и startup/shutdown decision | Старт только при включённом unit, готовых зависимостях и отсутствии активного/ошибочного состояния; timeout конечен | Политика init; нет native process daemon |
| duckos/services/supervisor.rpr | Счётчик ограниченных повторных запусков | Retry не превышает заданный лимит; clean exit не повторяется | Policy, не supervisor runtime |
| duckos/services/dispatch.rpr | Очередь задач с QoS/deadline/bytes/capability | Уникальный id, bounded workers и payload; выбор max QoS/min deadline | Не worker execution |
| duckos/services/ipc_contract.rpr | Message envelope и mailbox capacity | Размер payload, priority, flags, queue depth и bytes ограничены | Метаданные, не IPC transport |
| duckos/runtime/clock.rpr | Монотонные timestamp/deadline | Переполнение запрещено; elapsed только при now ≥ start | Ожидает monotonic clock adapter |
| duckos/runtime/data.rpr | Типизированные данные runtime | Тип, размер и допустимые значения должны быть сохранены | Сверять по конкретным операциям runtime |
| duckos/runtime/foundation.rpr | Общие скалярные и системные предпосылки | Проверки диапазонов не подменяют проверки потребителя | Системный вспомогательный слой |
| duckos/system/installer.rpr | Preflight и автомат развёртывания | Целевой диск и образ совпадают по архитектуре, доверие и подпись подтверждены; переходы обратимы по указанным ветвям | Привилегированная запись диска отсутствует в policy |
| duckos/system/package_manager.rpr | Манифест и dependency/permission relations | Версия и списки валидны; missing deps и privilege escalation отвергаются | Signature bool не является криптографической верификацией |
| duckos/system/updater.rpr | Версионированное обновление и rollback | Старое рабочее состояние должно быть восстанавливаемым | Проверить конкретный backend и порядок записи |
| duckos/system/recovery.rpr | Recovery decision model | Неуспех переводит в ограниченный recovery path | Политика восстановления, не доказательство успешного repair |
| duckos/system/build.rpr | План воспроизводимой сборки | Входные версии/цели/этапы имеют явные границы | Build plan не равен успешной сборке |
| duckos/system/prefetch.rpr | Выбор заранее загружаемых данных | Объём, окно и приоритет ограничены | Не доказывает выигрыш latency без измерений |
| duckos/system/telemetry.rpr | Монотонная последовательность метрик | seq возрастает; окно ограничено; threshold order корректен | Реальные sensor providers могут отсутствовать |
| duckos/system/utilities.rpr | Типизированные вспомогательные функции | Каждая функция сохраняет единицы и диапазон, заданный контрактом | Отдельная проверка по исходному файлу |
| duckos/system/three_media.rpr | Выбор CPU/accelerator/node-mesh | Пороговый выбор детерминирован при одних и тех же входах | Только план выбора, не аппаратный dispatch |

## 7. Безопасность и BAV

### 7.1. Capability и обязательный контроль доступа

Источники: duckos/security/capabilities.rpr, capability_broker.rpr, mac.rpr, trust.rpr.

Формальная модель:
- множество грантов \(G\);
- требуемое действие \(a\);
- субъект \(p\);
- объект \(o\);
- разрешение истинно только при точном совпадении тройки;
- множество прав потомка является подмножеством родительского;
- deny-default применяется при отсутствии соответствующего правила.

Наличие Reaper-политики не доказывает принудительную проверку при каждом syscall. Нативная граница обязана повторно удостоверить caller, object и operation.

### 7.2. Sandboxing

Источники: duckos/security/desktop_sandbox.rpr, plugin_sandbox.rpr.

Модель admission учитывает manifest, signer, sandbox id, resource quota, network mode, requested capabilities и отдельные признаки проверки каталога/подписи. Admission не должен доверять собственному полю manifest как доказательству корректности подписи: верификация производится отдельным trusted verifier.

Для Wasm component-плагина ограничения включают fuel и memory budget; результат sandbox-eligible — только разрешение для будущего runtime host, а не свидетельство, что изоляция уже запущена.

### 7.3. BAV и контекстная таксономия

Источники: docs/BAV_SECURITY_BUNDLE_V1.md, docs/DEFENSIVE_SECURITY_DOCTRINE.md, security/defense-context.v1.tsv, schemas/bav-security-bundle.v1.schema.json.

BAV имеет отдельные объекты:
1. signed declarative bundle;
2. список правил и их версий;
3. verifier и trust store;
4. scan worker;
5. scan result;
6. reversible quarantine record;
7. evidence/audit report;
8. update/anti-rollback state.

Схема JSON доказывает только структурную валидность. Нельзя из наличия schema вывести наличие scanner, signer verification, quarantine, on-access filter или kernel enforcement.

Контекстные метки и malware verdict образуют разные типы. Матч фразы к таксономии не является техническим свидетельством malware и сам по себе не может блокировать, удалять, помещать в карантин либо отключать полномочие.

## 8. Интерфейс, рабочие пространства и мультимедиа

| Источник DAK | Математическая модель | Инвариант | Граница |
|---|---|---|---|
| duckos/ui/accessibility.rpr | Геометрия окна и accessibility profile | Координаты, размер, scale и bool preferences принадлежат диапазонам | Не создаёт нативный window/accessibility bridge |
| duckos/ui/window_manager.rpr | 12-полевая запись окна, focus/modal/z-order | Размеры ограничены, окно в bounds, системный origin подтверждён отдельно | Policy-only |
| duckos/ui/workspace.rpr | Индексированное конечное множество рабочих областей | Активный индекс лежит в допустимом диапазоне | Не compositor |
| duckos/ui/session.rpr | Автомат desktop session и lock state | starting → active/failed; active → locked/ending; locked → active/ending; ending → ended/failed | Состояния сессии — policy, не session server |
| duckos/ui/desktop.rpr | Состояние desktop shell | Видимость, launcher, dock и окна являются отдельными полями | Не kernel desktop |
| duckos/ui/taskbar.rpr | Упорядоченная модель taskbar entries | Стабильные идентификаторы и порядок | UI policy |
| duckos/ui/notifications.rpr | Notification event/queue and retention | Размер, важность, источник и жизненный цикл ограничены | Не системный notification daemon |
| duckos/ui/command_palette.rpr | Поиск и выбор команд из каталога | Команда должна иметь известный id и право исполнения | Не shell execution |
| duckos/ui/config.rpr | Типизированная конфигурация UI | Значение проверяется против допустимого набора/диапазона | Настройка сама не изменяет kernel |
| duckos/ui/theme.rpr | Семантические design tokens | Token role и значение различаются; system identity сохраняется | Токены не являются рендерером |
| duckos/ui/motion.rpr | Состояние motion/reduced-motion и frame budget | Reduced motion переводит spatial motion в static | Policy |
| duckos/ui/physics.rpr | Дискретная пружинная динамика | \(dt\) ограничен 0.032 s; mass/stiffness/damping допустимы | Нужна отдельная stability proof |
| duckos/ui/canvas.rpr | Приоритет доступных canvas backend | WebGPU → DirectX 12 → Metal → CPU fallback | Только selection, нет draw submission |
| duckos/ui/native_bridge.rpr | Versioned event envelope | sequence строго следующий; event name перечислен; payload size bounded | Аутентификация и транспорт внешние |
| duckos/ui/shell_policy.rpr | Политика оболочки и capability-bound actions | UI-origin не получает привилегии автоматически | Не kernel security |

### 8.1. Состояния UI не являются состояниями ядра

Рабочая область, окно, уведомление и пользовательская сессия — отдельные пространства состояний. Нельзя использовать фокус окна как эквивалент foreground process, видимость окна — как эквивалент выполнения процесса, а наличие shell-кнопки — как доказательство capability enforcement.

### 8.2. Аудио и графика

Модели framebuffer, monitor, audio pipeline, MIDI events, spatial mix и frame budget должны сохранять единицы измерения. Число пикселей, байтов, герц, микросекунд, каналов и битов не складывается между собой без размерностно корректного отображения.

## 9. Игровая подсистема

Источники:
- duckos/gaming/policy.py;
- duckos/gaming/detection.py;
- duckos/gaming/game-performance-rules.v1.json;
- docs/GAMING_POLICY_66.md;
- docs/GAMING_PROCESS_DETECTION.md;
- docs/GAME_LAUNCH_COMPATIBILITY.md;
- docs/GAMING_PERFORMANCE_INTEGRATION.md.

Модель игровой сессии — конечный автомат:

\[
idle\to starting\to active/background\to restoring\to idle.
\]

Переходы должны быть идемпотентными, а результат policy transition — декларативным планом. План не означает, что операционная система изменила CPU affinity, приоритет, power plan, fan curve, GPU clocks, process state, interrupt routing или network queues.

Каталог содержит 66 уникальных идентификаторов в шести доменах: game detection, CPU scheduling, memory, graphics, I/O, power/reliability. Для каждого правила состояние доступности определяется providers и их evidence. Отсутствующий telemetry provider не подменяется выдуманным измерением.

Совпадение имени исполняемого файла — только candidate. Оно не подтверждает foreground window, активность игры или текущую графическую нагрузку. Упоминание XP SP3 в compatibility profile не доказывает нативную совместимость с XP, а внешний Wine runtime остаётся отдельной зависимостью.

## 10. Совместимость PE/ELF и запуск

Источники: duckos/compat/pe.py, runtime.py, prefix.py, game_profile.py, bridge.py; docs/WINDOWS_COMPATIBILITY.md; docs/GAME_LAUNCH_COMPATIBILITY.md.

Разделять три функции:

\[
Parse:Bytes\rightharpoonup HeaderMetadata,
\]

\[
Plan:HeaderMetadata\times Profile\rightharpoonup LaunchPlan,
\]

\[
Execute:LaunchPlan\times Runtime\times Authority\rightharpoonup Process.
\]

Успех Parse не влечёт успех Plan, а Plan не влечёт Execute. Статические imports, секции, subsystem, machine type, префикс и путь DLL — предметы анализа и проверки границ. Без mapping, relocation, import resolution, TLS, SEH/VEH, ABI и kernel process model нельзя говорить о native execution compatibility.

## 11. Образование и предметная математика

Источники: duckos/education/early_math_contract.rpr, duckos/education/early_math_pack.v1.json, docs/EARLY_MATH_FOR_PRESCHOOLERS.md.

Формализовать:
- мощность конечного множества;
- биекцию соответствия один-к-одному;
- сравнение cardinality;
- разложение суммы на части;
- геометрические классы форм;
- отношение включения/положения;
- измерение и сравнение величин;
- конечные повторяющиеся слова и периодические узоры.

Каждое упражнение задаётся тройкой «материал — действие — математическое отношение». Оно не является диагнозом или психометрическим выводом. Наблюдение взрослого и автоматическая оценка ребёнка — разные типы данных и разные права на обработку.

## 12. Схемы, каталоги и отчёты

### 12.1. Каталоги

- Каталог 66 игровых правил сохраняет полный набор идентификаторов и шесть доменов.
- План 1000 программ сохраняет нумерацию и ownership распределения между Pytyliki, Reaper, OPlague и VentuSample; DAK — дополнительный OS-проект, а не новый диапазон номеров.
- Каталог приложений Mora сохраняет app id, категорию, маршрут/запуск и maturity; каталог не равен списку установленных исполняемых файлов.
- Каталог hardware/device classes сохраняет категорию, bus, provenance и evidence.

### 12.2. Report envelope

Общая форма отчёта:

\[
R=(schema,tool,version,commit,inputDigest,platform,result,limitations).
\]

Результат остаётся во владении исходного инструмента; общий envelope добавляет только происхождение и ограничения. SHA-256 digest доказывает byte identity, но не подпись, авторство, правдивость вывода или цепочку хранения. Если версия неизвестна, используется явное unknown, а не догадка.

### 12.3. Unify transfer

Формат ручного переноса ограничивает:
- до 1000 записей вкладок;
- до 100 clips;
- до 12 MiB на clip;
- до 20 MiB на импортируемый JSON package.

Это локальный файл для явно инициируемого пользователем экспорта/импорта. Он не означает live sync, authenticated pairing, E2E encryption, conflict-free replication или background device access.

## 13. Документы DAK, схемы и машинно-читаемые данные

| Источник DAK | Что переносится математически |
|---|---|
| docs/ARCHITECTURE.md | Многоуровневая система, dependency direction, policy/native/userland boundaries |
| docs/FOUNDATION_ARCHITECTURE.md | Граф boot → kernel → process/ABI → userland → services → graphics/devices → packages; trust boundaries |
| docs/CORE_MVP_V1.md | 40 групповых контрактов в десяти подсистемах; чёткие ограничения MVP |
| docs/IMPLEMENTATION_STATUS.md | Фактические статусы и недостающие нативные компоненты |
| docs/REAPER_SYSTEM_PLATFORM.md | Трёхслойное разделение политики, native adapters и userland |
| docs/BACKEND_ENGINEERING_STANDARD.md | Domain/transport/storage boundaries; bounded I/O; idempotency; resource ownership; cancellation |
| docs/DEFENSIVE_SECURITY_DOCTRINE.md | Разделение context classification и malware verdict |
| docs/BAV_SECURITY_BUNDLE_V1.md | Bundle schema, signature, anti-rollback, scan, quarantine, evidence, privacy |
| docs/ERGONOMICS_AND_INTERACTION_STANDARD.md | Геометрия, фокус, ввод, feedback, восстановление, accessibility, privacy constraints |
| docs/MOTION_CONSTITUTION_V2026.md | Motion tokens, reduced-motion override, measured visual state, maturity |
| docs/GAMING_POLICY_66.md | Полная 66-правильная матрица и игровой автомат |
| docs/GAME_LAUNCH_COMPATIBILITY.md | Declarative launch profile, environment allowlist, external runtime boundary |
| docs/WINDOWS_COMPATIBILITY.md | PE parser, prefix metadata, read-only inspection and blockers |
| docs/REPOSITORY_FEDERATION.md | Pinned source graph, independent licenses, ownership and interfaces |
| docs/CONTINUOUS_ECOSYSTEM_INTEGRATION.md | Cross-repository owner/source/contract/test/release workflow |
| docs/SOURCE_TRACEABILITY.md | Происхождение 666-rule source collection и mapping шести доменов по 111 правил |
| docs/PROGRAM_CATALOG_1000.md | Разделение 1000-entry allocation между профильными проектами |
| docs/UNIFY_TRANSFER_FORMAT_V1.md | Bounded manual export/import schema |
| docs/REPORT_ENVELOPE.md | Provenance envelope and limitations semantics |
| docs/DOCUMENTATION_CONTROL.md | maturity vocabulary, traceability and change-control rules |
| docs/NEXUS_SYSTEM_SERVICES_V1.md | Шесть service identities и ответственность проектов |
| docs/IMPLEMENTATION_ROADMAP.md | Зависимый граф внедрения и evidence gates |
| docs/REPOSITORY_EVOLUTION_DIRECTIVES.md | Проектные цели эволюции и допустимые статусы |
| docs/ENGINEERING_EVOLUTION_FRAMEWORK.md | Метрики качества и поэтапное развитие |
| .architecture/system-capabilities.v1.json | Нормализованный реестр capability/status/evidence/limitations |
| engineering-evolution.v1.json | Машинное представление evolution indicators |
| schemas/*.schema.json | Ограничения структурированных записей и версий форматов |
| catalogs/*.json | Конечные индексированные множества предметных элементов |
| federation/*.json | Источники, версии, pins, лицензии, ownership, interface graph |
| manifests/*.json | Компоненты, версии, архитектура, разрешения и provenance |

## 14. Полная карта 101 файлов пространства duckos/

Карта ниже фиксирует все пути пространства duckos/ из просмотренного дерева DAK. Это инвентаризация источников математических моделей, а не утверждение о равной степени зрелости всех реализаций.

| Домен | Источники |
|---|---|
| Корень, CLI, развертывание | duckos/__init__.py; duckos/__main__.py; duckos/cli.py; duckos/deployment.py; duckos/manifest.py; duckos/module_abi.py; duckos/hardware_inventory.py; duckos/image_layout.py |
| Audio | duckos/audio/pipeline.rpr |
| Compatibility | duckos/compat/__init__.py; duckos/compat/bridge.py; duckos/compat/game_profile.py; duckos/compat/pe.py; duckos/compat/prefix.py; duckos/compat/runtime.py |
| Desktop | duckos/desktop/__init__.py; duckos/desktop/native_ui.py; duckos/desktop/reaper.py; duckos/desktop/service.py |
| Drivers | duckos/drivers/abi.rpr; duckos/drivers/dma.rpr; duckos/drivers/mmio.rpr; duckos/drivers/orchestrator.rpr |
| Education | duckos/education/early_math_contract.rpr; duckos/education/early_math_pack.v1.json |
| Gaming | duckos/gaming/__init__.py; duckos/gaming/detection.py; duckos/gaming/game-performance-rules.v1.json; duckos/gaming/policy.py |
| GPU and graphics | duckos/gpu/oplage_bridge.rpr; duckos/graphics/compositor.rpr |
| Input | duckos/input/spatial.rpr |
| Kernel architecture | duckos/kernel/arch/aarch64.rpr; duckos/kernel/arch/x86_64.rpr |
| Kernel memory and execution | duckos/kernel/arena.rpr; duckos/kernel/atomic.rpr; duckos/kernel/boot.rpr; duckos/kernel/dabi64.rpr; duckos/kernel/flock.rpr; duckos/kernel/handles.rpr; duckos/kernel/ipc.rpr; duckos/kernel/memory.rpr; duckos/kernel/process.rpr; duckos/kernel/scheduler.rpr; duckos/kernel/synchronization.rpr; duckos/kernel/syscall.rpr; duckos/kernel/threads.rpr; duckos/kernel/vm.rpr; duckos/kernel/zero_copy_bus.rpr |
| Network | duckos/network/dns.rpr; duckos/network/ipv4.rpr; duckos/network/stack.rpr; duckos/network/tcp.rpr; duckos/network/udp.rpr |
| NEXUS | duckos/nexus/services.rpr |
| Platform | duckos/platform/targets.rpr |
| Runtime | duckos/runtime/clock.rpr; duckos/runtime/data.rpr; duckos/runtime/foundation.rpr |
| Security | duckos/security/capabilities.rpr; duckos/security/capability_broker.rpr; duckos/security/desktop_sandbox.rpr; duckos/security/mac.rpr; duckos/security/plugin_sandbox.rpr; duckos/security/trust.rpr |
| Services | duckos/services/dispatch.rpr; duckos/services/init.rpr; duckos/services/ipc_contract.rpr; duckos/services/supervisor.rpr |
| Storage | duckos/storage/crdt.rpr; duckos/storage/history.rpr; duckos/storage/hypergraph.rpr; duckos/storage/journal.rpr; duckos/storage/path.rpr; duckos/storage/vfs.rpr |
| System | duckos/system/build.rpr; duckos/system/installer.rpr; duckos/system/package_manager.rpr; duckos/system/prefetch.rpr; duckos/system/recovery.rpr; duckos/system/telemetry.rpr; duckos/system/three_media.rpr; duckos/system/updater.rpr; duckos/system/utilities.rpr |
| Terminal | duckos/terminal/__init__.py; duckos/terminal/service.py |
| UI | duckos/ui/accessibility.rpr; duckos/ui/canvas.rpr; duckos/ui/command_palette.rpr; duckos/ui/config.rpr; duckos/ui/desktop.rpr; duckos/ui/motion.rpr; duckos/ui/native_bridge.rpr; duckos/ui/notifications.rpr; duckos/ui/physics.rpr; duckos/ui/session.rpr; duckos/ui/shell_policy.rpr; duckos/ui/taskbar.rpr; duckos/ui/theme.rpr; duckos/ui/window_manager.rpr; duckos/ui/workspace.rpr |

## 15. Карта остальных 239 файлов DAK

Полный построчный перечень всех 340 blob-путей с классификацией математической роли вынесен в [DAK_REPOSITORY_MATHEMATICAL_INVENTORY.md](DAK_REPOSITORY_MATHEMATICAL_INVENTORY.md).

В просмотренном дереве было 340 файлов верхнего уровня репозитория; 101 путь относится к пространству duckos/. Остальные 239 путей распределены по следующим источникам:

- .architecture/ — machine-readable system capability profile and metadata;
- .github/ — CI workflows, issue/PR automation and completeness checks;
- README и локализованные README — публичные обещания и границы проекта;
- docs/ — архитектура, реализация, зрелость, безопасность, UX, совместимость, игровые профили, интеграция, traceability и roadmap;
- boot/, foundation/, kernel/ — boot chain, hardware boundary, low-level runtime artefacts;
- mora/, desktop/, prototype/, portal/, assets/ — desktop models, local UI surfaces, manifests and user-facing representation;
- federation/, manifests/, catalogs/ — source ownership, pinned project graph, app/program registries and adoption metadata;
- schemas/ — JSON contracts, schema versions and boundary validation;
- tests/ и contract tests — finite cases, property checks and runtime evidence;
- tools/, scripts/, package.json, CMakeLists.txt, pyproject.toml, vercel.json — build, packaging, validation and publication machinery;
- third_party/ — imported dependencies whose own licenses and attribution remain separate;
- artifacts/ — retained build/evidence outputs.

Точные пути и объекты перечислены в дереве репозитория; новые математические утверждения обязаны иметь source links на конкретные документы, схемы, контракты и тесты. Категория, не содержащая математического содержания, всё равно остаётся в реестре как provenance/implementation evidence, а не исчезает при переносе.

## 16. Реестр точечных математических ревизий

Следующие изменения рекомендованы как отдельные исследовательские задачи, а не как молчаливая переинтерпретация исходников:

1. **CRDT tie key:** сделать value ordering полным и инъективным; доказать commutativity/associativity/idempotence.
2. **Scheduler ties:** добавить явный стабильный tie-breaker, если нужна инвариантность результата к перестановке входа.
3. **Hypergraph acyclicity:** ограничить accepted dependencies ранее зафиксированными вершинами или ввести полный cycle check.
4. **TCP sequence wrap:** заменить нециклическое сравнение на корректную serial arithmetic для 32-битного пространства.
5. **DMA lifecycle:** доказать ownership handoff, completion, cancellation и release under device failure.
6. **Journal durability:** определить filesystem/block-device flush ordering, atomic sector assumptions and recovery certificates.
7. **Spring stability:** описать области устойчивости по параметрам \(k,c,m,\Delta t\), а не только ограничения входа.
8. **Atomic ordering:** связать contract table с выбранным compiler/ISA mapping и тестами litmus.
9. **MMIO and interrupt safety:** определить права и lifetime region mapping, memory ordering, IRQ context and teardown.
10. **Syscall refinement:** построить refinement proof от DABI64 descriptor до native syscall dispatch and return.
11. **Package signature:** отделить schema flag от actual verification evidence and anti-rollback monotonic state.
12. **Capability enforcement:** показать невозможность обхода проверок через alternate native entry points.
13. **Network correctness:** формально проверить fragment reassembly, checksum, port binding, timeouts, retransmission and bounded buffers.
14. **Telemetry provenance:** ввести unknown/unavailable/stale/valid как разные состояния, не подменяя отсутствующий sensor нулём.
15. **Maturity synchronization:** генерировать capability status только из проверяемой source/test/evidence ссылки, не из текста roadmap.

## 17. Критерий полноты математического переноса

Перенос считается полным по конкретному источнику тогда и только тогда, когда для каждого существенного факта источника выполнено одно из условий:

1. он представлен типизированным математическим объектом, отношением, формулой, конечным автоматом, графом, ограничением или доказательным обязательством;
2. он является provenance, license, visual, build, packaging или human-facing metadata и сохранён в traceability map;
3. он помечен как непроверенный, неполный, неоднозначный или требующий уточнения;
4. он явно исключён из математического ядра с сохранённым обоснованием.

Ни один числовой параметр, диапазон, индекс, ограничение размера, последовательность, state label, версия, номер правила, program id или dependency edge не удаляется из-за того, что он кажется второстепенным. Изменение представления допускается лишь при доказанном сохранении исходного смысла.

---

## Итог

Каталог превращает предметные области DAK в единую типизированную карту математических моделей, но сохраняет границу между формальной политикой, исходной реализацией, проверочным свидетельством и ещё не созданным native runtime. Все перечисленные источники остаются прослеживаемыми к DAK; K3 служит канонической системой числовых координат, а Теория Вьюненко — основным методологическим и доказательным основанием расширения.
