> **Cascade Edition 1.0.0 — Scientific documentation standard.** Claims retain their explicitly stated epistemic status.

# Каталоги математических моделей VentuSample

**Теория:** Вьюненко K3 · **Источник:** Ivan-VHS/VentuSample · **Снимок:** 2026-11-28
**Статус:** точный каталог идентификаторов, семейств, вычислительных моделей и значений по умолчанию из исходного реестра; каталог не является доказательством физической корректности метафор.

## 1. Quantum Audio Engine: 133 DSP-идентификатора

В исходном реестре имеется ровно 133 записи QP. Пять семейств распределены по диапазонам 23, 23, 23, 23 и 41. Записи используют 21 тип общей DSP-модели; поле variant и четыре значения по умолчанию задают индивидуальную конфигурацию. Следовательно, 133 — мощность реестра вариантов, а не число независимых базовых алгоритмов.

Порядок столбцов параметров: **A** = Amount, **T** = Tone, **R** = Rate, **M** = Mix. Все значения нормированы в [0,1]. Числа ниже взяты из массива kPlugins исходного файла; идентификаторы и регистр сохранены.

| № | Стабильный ID | Имя | Семейство | DSP-модель | variant | A / T / R / M | Назначение модели |
|---:|---|---|---|---|---:|---|---|
| 001 | quark-confiner | QUARK-CONFINER | I · Кварки и адроны | StereoField | 0 | .72 / .28 / .18 / .82 | Locks the low-frequency image to mono while retaining stereo detail above the crossover. |
| 002 | gluon-glue | GLUON-GLUE | I · Кварки и адроны | Dynamics | 0 | .68 / .52 / .22 / .78 | Linked-bus compressor that makes separate layers move as one controlled cluster. |
| 003 | color-charge-eq | COLOR-CHARGE EQ | I · Кварки и адроны | Equalizer | 0 | .48 / .55 / .2 / .86 | Three-band low, mid and high balance with a neutral summed reference. |
| 004 | up-down-harmonizer | UP-DOWN HARMONIZER | I · Кварки и адроны | Modulator | 0 | .36 / .72 / .41 / .52 | Micro-pitch movement using a short, modulated dual-head delay approximation. |
| 005 | strange-quark | STRANGE-QUARK | I · Кварки и адроны | Saturation | 0 | .62 / .78 / .24 / .71 | Nonlinear phase-coloured saturation that emphasizes upper partials. |
| 006 | charm-exciter | CHARM-EXCITER | I · Кварки и адроны | Exciter | 0 | .37 / .82 / .25 / .68 | Adds controlled upper-harmonic definition with a restrained high-pass residual. |
| 007 | top-quark-mass | TOP-QUARK MASS | I · Кварки и адроны | Transient | 0 | .74 / .3 / .18 / .82 | Adds impact weight by increasing attack contrast and low-body perception. |
| 008 | bottom-quark-decay | BOTTOM-QUARK DECAY | I · Кварки и адроны | Delay | 0 | .47 / .52 / .3 / .38 | Tempo-independent multi-tap decay with controlled feedback. |
| 009 | hadron-collider | HADRON-COLLIDER | I · Кварки и адроны | Morph | 0 | .72 / .62 / .4 / .66 | Combines nonlinear collision, phase contrast and transient emphasis. |
| 010 | baryon-trio | BARYON-TRIO | I · Кварки и адроны | Spectrum | 0 | .54 / .58 / .18 / .76 | Three-band saturation with linked gain and crossover protection. |
| 011 | meson-bridge | MESON-BRIDGE | I · Кварки и адроны | Resonator | 0 | .43 / .34 / .46 / .39 | Short resonant echo that couples rhythmic attacks and low-frequency body. |
| 012 | asymptotic-free | ASYMPTOTIC-FREE | I · Кварки и адроны | Dynamics | 1 | .58 / .48 / .2 / .9 | Keeps low-level material open and progressively restrains large peaks. |
| 013 | pentaquark-chord | PENTAQUARK-CHORD | I · Кварки и адроны | Vocoder | 0 | .44 / .61 / .32 / .56 | Adds a five-part harmonic colour from the signal envelope and selected formant bands. |
| 014 | jet-fragmentation | JET-FRAGMENTATION | I · Кварки и адроны | Granular | 0 | .72 / .24 / .62 / .64 | Turns sharp attacks into deterministic short grain fragments. |
| 015 | sea-quark-noise | SEA-QUARK NOISE | I · Кварки и адроны | Noise | 0 | .24 / .68 / .36 / .28 | Adds low-level, envelope-following stochastic texture in pauses and tails. |
| 016 | valence-core | VALENCE-CORE | I · Кварки и адроны | Spectrum | 1 | .55 / .42 / .2 / .8 | Highlights three dominant spectral regions and suppresses surrounding clutter. |
| 017 | string-tension | STRING-TENSION | I · Кварки и адроны | StereoField | 1 | .56 / .67 / .24 / .78 | Links stereo width to harmonic drive so wider material becomes denser, not louder. |
| 018 | bag-model-limiter | BAG-MODEL LIMITER | I · Кварки и адроны | Dynamics | 2 | .74 / .55 / .15 / .93 | Soft containment stage that rounds peaks without hard digital clipping. |
| 019 | flavor-oscillator | FLAVOR-OSCILLATOR | I · Кварки и адроны | Morph | 1 | .48 / .62 / .3 / .66 | Slowly changes filter and saturation colour using a cyclic modulation path. |
| 020 | hyperon-sub | HYPERON-SUB | I · Кварки и адроны | SubGenerator | 0 | .72 / .22 / .16 / .72 | Adds a short, phase-stable sub-octave foundation from the incoming low-frequency envelope. |
| 021 | pion-punch | PION-PUNCH | I · Кварки и адроны | Transient | 1 | .78 / .38 / .15 / .82 | Fast attack emphasis with a bounded transient envelope. |
| 022 | glueball-reverb | GLUEBALL-REVERB | I · Кварки и адроны | Reverb | 0 | .51 / .77 / .32 / .44 | Dense reflective reverb with short, metallic feedback paths. |
| 023 | lattice-quantizer | LATTICE-QUANTIZER | I · Кварки и адроны | Quantizer | 0 | .45 / .32 / .5 / .8 | Quantizes amplitude and local sample timing to a controllable lattice. |
| 024 | superposition-synth | SUPERPOSITION-SYNTH | II · Квантовая механика | Synth | 0 | .52 / .7 / .25 / .58 | Blends several harmonic states into one evolving oscillator texture. |
| 025 | schrodinger-gate | SCHRÖDINGER-GATE | II · Квантовая механика | Gate | 0 | .58 / .42 / .2 / .76 | Probabilistic envelope gate with a deterministic threshold trigger. |
| 026 | entanglement-stereo | ENTANGLEMENT-STEREO | II · Квантовая механика | StereoField | 2 | .62 / .48 / .38 / .78 | Couples left and right movement through a linked mid-side modulation law. |
| 027 | wavefunction-collapse | WAVEFUNCTION-COLLAPSE | II · Квантовая механика | Transient | 2 | .72 / .26 / .18 / .86 | Compresses a diffuse envelope into a sharp, transient-focused shape. |
| 028 | heisenberg-blur | HEISENBERG-BLUR | II · Квантовая механика | Modulator | 1 | .51 / .56 / .62 / .65 | Trades fine timing definition for modulated pitch and phase movement. |
| 029 | tunneling-filter | TUNNELING-FILTER | II · Квантовая механика | Equalizer | 1 | .48 / .2 / .2 / .82 | Lets a controlled amount of energy pass a steep spectral boundary. |
| 030 | qubit-sequencer | QUBIT-SEQUENCER | II · Квантовая механика | Granular | 1 | .57 / .45 / .7 / .72 | Creates a stepped, state-driven sample pattern with repeatable probability. |
| 031 | decoherence-dissolve | DECOHERENCE-DISSOLVE | II · Квантовая механика | Reverb | 1 | .54 / .73 / .36 / .58 | Gradually de-correlates transients into a diffuse reflective tail. |
| 032 | eigenstate-resonator | EIGENSTATE-RESONATOR | II · Квантовая механика | Resonator | 1 | .58 / .68 / .22 / .7 | Emphasizes stable resonant bands with a tuned feedback comb. |
| 033 | planck-crusher | PLANCK-CRUSHER | II · Квантовая механика | Quantizer | 1 | .68 / .25 / .68 / .78 | Reduces amplitude resolution and sample update rate for microscopic texture. |
| 034 | probability-cloud-delay | PROBABILITY-CLOUD DELAY | II · Квантовая механика | Delay | 1 | .42 / .52 / .44 / .5 | Adds repeat timing offsets inside a bounded deterministic timing cloud. |
| 035 | bell-state-panner | BELL-STATE PANNER | II · Квантовая механика | StereoField | 3 | .66 / .57 / .44 / .78 | Creates a four-state stereo trajectory while protecting the central image. |
| 036 | quantum-zeno-freeze | QUANTUM-ZENO FREEZE | II · Квантовая механика | Granular | 2 | .65 / .35 / .6 / .72 | Captures short slices and sustains them with a controllable observation rate. |
| 037 | spin-up-spin-down | SPIN-UP / SPIN-DOWN | II · Квантовая механика | StereoField | 4 | .54 / .48 / .48 / .76 | Rotates stereo phase clockwise or counter-clockwise at a tempo-like rate. |
| 038 | pauli-exclusion-eq | PAULI-EXCLUSION EQ | II · Квантовая механика | Spectrum | 2 | .6 / .65 / .25 / .83 | Makes complementary spectral slots for a less congested two-layer balance. |
| 039 | feynman-path-reverb | FEYNMAN-PATH REVERB | II · Квантовая механика | Reverb | 2 | .58 / .68 / .34 / .48 | Accumulates multiple short reflection paths into a dense but bounded tail. |
| 040 | zero-point-saturator | ZERO-POINT SATURATOR | II · Квантовая механика | Saturation | 1 | .34 / .74 / .22 / .62 | Raises low-level harmonic detail through a restrained nonlinear floor. |
| 041 | wave-particle-morpher | WAVE-PARTICLE MORPHER | II · Квантовая механика | Morph | 2 | .56 / .55 / .4 / .68 | Morphs between smooth modulation and stepped granular pulses. |
| 042 | teleport-send | TELEPORT-SEND | II · Квантовая механика | Delay | 2 | .28 / .6 / .32 / .58 | A phase-aware short routing delay for transferring a signal between offline stages. |
| 043 | hamiltonian-mod | HAMILTONIAN-MOD | II · Квантовая механика | Dynamics | 3 | .52 / .48 / .35 / .74 | Uses signal energy to drive a smooth amplitude and filter movement. |
| 044 | bloch-sphere-chorus | BLOCH-SPHERE CHORUS | II · Квантовая механика | Modulator | 2 | .45 / .62 / .5 / .62 | A multi-voice chorus with bounded phase paths and shared stereo motion. |
| 045 | observer-effect | OBSERVER-EFFECT | II · Квантовая механика | Morph | 3 | .48 / .72 / .34 / .64 | Adds repeatable motion and nonlinear colour; it never depends on the desktop cursor or window focus. |
| 046 | multiverse-bounce | MULTIVERSE-BOUNCE | II · Квантовая механика | Dynamics | 4 | .55 / .56 / .3 / .68 | Creates four parallel gain and tone branches for a controllable parallel blend. |
| 047 | orbital-harmonics | ORBITAL-HARMONICS (s, p, d, f) | III · Атомы и орбитали | Exciter | 5 | .55 / .66 / .28 / .68 | Shapes harmonic density and stereo motion using four orbital-style modes. |
| 048 | isotope-detune | ISOTOPE-DETUNE | III · Атомы и орбитали | Modulator | 3 | .35 / .62 / .3 / .55 | Adds small, bounded detuning offsets with stable modulation depth. |
| 049 | half-life-decay | HALF-LIFE DECAY | III · Атомы и орбитали | Dynamics | 5 | .52 / .44 / .26 / .72 | Applies a measured exponential decay to the signal envelope and high-frequency detail. |
| 050 | fission-splitter | FISSION-SPLITTER | III · Атомы и орбитали | Spectrum | 3 | .62 / .4 / .22 / .74 | Splits the spectrum into two complementary bands and emphasizes the split transient. |
| 051 | fusion-compressor | FUSION-COMPRESSOR | III · Атомы и орбитали | Dynamics | 6 | .62 / .5 / .18 / .82 | Links envelope compression and soft saturation for a dense combined signal. |
| 052 | valence-ring | VALENCE-RING | III · Атомы и орбитали | Saturation | 2 | .48 / .58 / .23 / .74 | Pairs saturation amount with stereo width in one macro-style control. |
| 053 | spectral-lines-balmer | SPECTRAL-LINES (BALMER) | III · Атомы и орбитали | Spectrum | 4 | .5 / .78 / .2 / .82 | Emphasizes selected narrow spectral regions using a multi-band tone model. |
| 054 | ionization-drive | IONIZATION-DRIVE | III · Атомы и орбитали | Saturation | 3 | .72 / .76 / .24 / .78 | A staged nonlinear drive that increases upper harmonic density with intensity. |
| 055 | covalent-sidechain | COVALENT-SIDECHAIN | III · Атомы и орбитали | Dynamics | 7 | .54 / .52 / .25 / .78 | An envelope-linked sidechain-style processor for complementary layer control. |
| 056 | nuclear-force-sub | NUCLEAR-FORCE SUB | III · Атомы и орбитали | SubGenerator | 1 | .7 / .18 / .12 / .74 | Reinforces a narrow 30–60 Hz foundation without widening the low end. |
| 057 | photon-emission | PHOTON-EMISSION | III · Атомы и орбитали | Exciter | 1 | .44 / .86 / .4 / .68 | Adds short, high-frequency harmonic flashes around detected transients. |
| 058 | brownian-drift | BROWNIAN-DRIFT | III · Атомы и орбитали | Modulator | 4 | .38 / .55 / .52 / .62 | Adds deterministic pseudo-random micro-motion to pitch, filter and stereo position. |
| 059 | crystal-lattice-reverb | CRYSTAL-LATTICE REVERB | III · Атомы и орбитали | Reverb | 3 | .52 / .78 / .38 / .52 | Uses short, slightly inharmonic reflection lines for a crystalline spatial tail. |
| 060 | laser-coherence | LASER-COHERENCE | III · Атомы и орбитали | StereoField | 5 | .62 / .25 / .2 / .84 | Improves low-band phase consistency and narrows unstable stereo differences. |
| 061 | plasma-state | PLASMA-STATE | III · Атомы и орбитали | Saturation | 4 | .68 / .82 / .44 / .7 | Combines bright asymmetric drive with a slowly moving spectral edge. |
| 062 | neutron-star-density | NEUTRON-STAR DENSITY | III · Атомы и орбитали | Dynamics | 8 | .78 / .55 / .14 / .9 | A high-density compressor and soft peak shaper for heavy program material. |
| 063 | alpha-particle-punch | ALPHA-PARTICLE PUNCH | III · Атомы и орбитали | Transient | 3 | .74 / .34 / .16 / .82 | Adds a hard, short attack while keeping the body under envelope control. |
| 064 | beta-decay-shifter | BETA-DECAY SHIFTER | III · Атомы и орбитали | Morph | 4 | .5 / .72 / .32 / .68 | Morphs a muted tone toward a brighter harmonic profile with a short upper transient. |
| 065 | gamma-burst-transient | GAMMA-BURST TRANSIENT | III · Атомы и орбитали | Transient | 4 | .66 / .88 / .16 / .78 | Creates a focused, high-frequency attack flash with strict output bounds. |
| 066 | boson-condensate | BOSON-CONDENSATE | III · Атомы и орбитали | Modulator | 5 | .42 / .28 / .12 / .8 | Reduces detune and phase spread for a stable unison-like image. |
| 067 | fermion-stack | FERMION-STACK | III · Атомы и орбитали | Synth | 1 | .52 / .68 / .3 / .62 | Stacks several harmonic layers with deterministic frequency and phase separation. |
| 068 | magnetic-moment-pan | MAGNETIC-MOMENT PAN | III · Атомы и орбитали | StereoField | 6 | .58 / .56 / .34 / .8 | Moves the stereo image along a smooth precessing pan orbit. |
| 069 | auger-cascade | AUGER-CASCADE | III · Атомы и орбитали | Exciter | 2 | .58 / .7 / .36 / .7 | Generates a controlled cascade of harmonics from the incoming envelope. |
| 070 | interference-slit | INTERFERENCE-SLIT | IV · Поля и волны | Resonator | 2 | .58 / .7 / .42 / .66 | Creates moving comb-filter interference from a pair of short phase paths. |
| 071 | doppler-horizon | DOPPLER-HORIZON | IV · Поля и волны | Modulator | 6 | .54 / .62 / .55 / .68 | Simulates a moving source using controlled pitch and stereo modulation. |
| 072 | time-dilation-stretch | TIME-DILATION STRETCH | IV · Поля и волны | Time | 0 | .48 / .55 / .34 / .66 | Uses bounded variable-rate granular reads to create time and pitch movement. |
| 073 | event-horizon-limiter | EVENT-HORIZON LIMITER | IV · Поля и волны | Dynamics | 9 | .8 / .54 / .16 / .94 | A fast soft-knee ceiling with an optional restrained harmonic halo. |
| 074 | hawking-radiation | HAWKING-RADIATION | IV · Поля и волны | Noise | 1 | .19 / .82 / .44 / .3 | Adds a tiny filtered noise tail around low-level decays. |
| 075 | gravitational-wave | GRAVITATIONAL-WAVE | IV · Поля и волны | StereoField | 7 | .52 / .56 / .12 / .8 | Modulates mid-side width in a slow quadrature movement. |
| 076 | cherenkov-glow | CHERENKOV-GLOW | IV · Поля и волны | Exciter | 3 | .5 / .88 / .25 / .65 | Adds a bright upper-harmonic glow when attacks cross a level threshold. |
| 077 | faraday-rotator | FARADAY-ROTATOR | IV · Поля и волны | StereoField | 8 | .56 / .62 / .35 / .78 | Rotates the stereo image with low-frequency energy as its control signal. |
| 078 | standing-wave-room | STANDING-WAVE ROOM | IV · Поля и волны | Resonator | 3 | .52 / .42 / .18 / .6 | Adds tuned comb resonances that emulate a small virtual resonator. |
| 079 | soliton-pulse | SOLITON-PULSE | IV · Поля и волны | Transient | 5 | .46 / .34 / .18 / .78 | Strengthens the transient contour while preserving the central pulse envelope. |
| 080 | phase-velocity-eq | PHASE-VELOCITY EQ | IV · Поля и волны | Spectrum | 5 | .44 / .62 / .18 / .8 | Shapes low, middle and high bands with separate phase-colour emphasis. |
| 081 | casimir-gap | CASIMIR-GAP | IV · Поля и волны | Resonator | 4 | .4 / .24 / .2 / .66 | Uses a narrow tuned resonator with a short low-frequency boundary. |
| 082 | magneto-strictive | MAGNETO-STRICTIVE | IV · Поля и волны | Saturation | 5 | .56 / .45 / .22 / .72 | Adds transformer-like hysteresis using asymmetric saturation and recovery. |
| 083 | waveguide-tube | WAVEGUIDE-TUBE | IV · Поля и волны | Resonator | 5 | .5 / .58 / .32 / .68 | Uses variable comb reflection geometry to emulate a resonant waveguide. |
| 084 | diffraction-grating | DIFFRACTION-GRATING | IV · Поля и волны | Spectrum | 6 | .5 / .75 / .25 / .78 | Redistributes spectral emphasis into a set of narrow, bright bands. |
| 085 | wormhole-delay | WORMHOLE-DELAY | IV · Поля и волны | Delay | 3 | .48 / .44 / .54 / .48 | Uses a pre-echo and short reverse-grain cue to suggest a time-fold effect. |
| 086 | tachyon-transient | TACHYON-TRANSIENT | IV · Поля и волны | Transient | 6 | .58 / .62 / .18 / .72 | Creates a short pre-attack cue from a look-ahead envelope copy in offline processing. |
| 087 | vacuum-polarization | VACUUM-POLARIZATION | IV · Поля и волны | Noise | 2 | .18 / .5 / .38 / .28 | Adds subtle nonlinear interaction to quiet passages and signal gaps. |
| 088 | holographic-principle | HOLOGRAPHIC-PRINCIPLE | IV · Поля и волны | Morph | 5 | .52 / .62 / .3 / .7 | Combines mid-side projection and three-band balancing into a compact spatial image. |
| 089 | dark-matter-sub | DARK-MATTER SUB | IV · Поля и волны | SubGenerator | 2 | .58 / .18 / .12 / .72 | Adds a restrained low-frequency anchor from the incoming bass envelope. |
| 090 | dark-energy-expander | DARK-ENERGY EXPANDER | IV · Поля и волны | StereoField | 9 | .48 / .56 / .22 / .72 | Expands stereo width smoothly as the signal decays. |
| 091 | plasmon-surface | PLASMON-SURFACE | IV · Поля и волны | Exciter | 4 | .4 / .7 / .2 / .72 | Adds near-field upper-mid harmonics for a closer, more articulated sound. |
| 092 | lorentz-contraction | LORENTZ-CONTRACTION | IV · Поля и волны | Time | 1 | .46 / .52 / .4 / .7 | Applies short, bounded variable-rate contraction to transient-rich material. |
| 093 | atom-drum | ATOM-DRUM | V · Экспериментальные инструменты | Synth | 2 | .58 / .32 / .25 / .7 | Adds a compact percussive oscillator and transient layer to the incoming signal. |
| 094 | quark-bass | QUARK-BASS | V · Экспериментальные инструменты | SubGenerator | 3 | .72 / .2 / .18 / .74 | A three-part low-frequency oscillator with bounded phase separation. |
| 095 | quantum-pad | QUANTUM-PAD | V · Экспериментальные инструменты | Synth | 3 | .42 / .76 / .16 / .46 | Adds a slowly evolving multi-part harmonic bed from the input envelope. |
| 096 | schrodinger-arp | SCHRÖDINGER-ARP | V · Экспериментальные инструменты | Granular | 3 | .5 / .54 / .7 / .68 | Creates probabilistic, repeatable note-like grain steps from the source signal. |
| 097 | antimatter-inverter | ANTIMATTER-INVERTER | V · Экспериментальные инструменты | StereoField | 10 | .62 / .48 / .2 / .86 | Uses phase inversion and mid-side cancellation to reduce correlated conflicts. |
| 098 | annihilation-distortion | ANNIHILATION-DISTORTION | V · Экспериментальные инструменты | Saturation | 6 | .72 / .78 / .25 / .76 | A collision-driven asymmetric distortion for energetic harmonic bursts. |
| 099 | chronon-slicer | CHRONON-SLICER | V · Экспериментальные инструменты | Granular | 4 | .66 / .36 / .72 / .78 | Cuts signal into repeatable short time cells with optional reverse ordering. |
| 100 | spin-network-reverb | SPIN-NETWORK REVERB | V · Экспериментальные инструменты | Reverb | 4 | .54 / .64 / .42 / .5 | A network of short feedback reflections with an irregular spatial pattern. |
| 101 | coherence-meter | COHERENCE-METER | V · Экспериментальные инструменты | Analyzer | 0 | .5 / .5 / .5 / .0 | Measures peak, RMS, crest and stereo correlation without changing the audio. |
| 102 | wave-packet-generator | WAVE-PACKET GENERATOR | V · Экспериментальные инструменты | Synth | 4 | .5 / .68 / .42 / .62 | Adds a Gaussian-windowed oscillator packet shaped by the incoming envelope. |
| 103 | superfluid-delay | SUPERFLUID-DELAY | V · Экспериментальные инструменты | Delay | 4 | .44 / .72 / .46 / .44 | Creates clear feedback repeats with minimal high-frequency damping. |
| 104 | superconductor-bus | SUPERCONDUCTOR-BUS | V · Экспериментальные инструменты | Dynamics | 10 | .46 / .4 / .16 / .82 | A fast linked-channel compressor that preserves attack contrast. |
| 105 | josephson-junction | JOSEPHSON-JUNCTION | V · Экспериментальные инструменты | Quantizer | 2 | .54 / .72 / .58 / .76 | Adds a nonlinear sample-and-hold distortion with high-rate modulation. |
| 106 | copenhagen-mixer | COPENHAGEN-MIXER | V · Экспериментальные инструменты | Dynamics | 11 | .38 / .5 / .24 / .78 | Balances the signal with a tone-dependent energy reference; no cursor tracking is used. |
| 107 | many-worlds-comp | MANY-WORLDS COMP | V · Экспериментальные инструменты | Dynamics | 12 | .6 / .54 / .2 / .78 | Blends multiple parallel compression strengths into one controlled result. |
| 108 | planck-length-gate | PLANCK-LENGTH GATE | V · Экспериментальные инструменты | Gate | 1 | .54 / .26 / .18 / .8 | Uses a fast, smoothed envelope gate with sample-accurate offline control. |
| 109 | neutrino-pass | NEUTRINO-PASS | V · Экспериментальные инструменты | Equalizer | 2 | .42 / .76 / .18 / .84 | Emphasizes a selected pass band with a gentle minimum-phase tone model. |
| 110 | chamber-tracker | CHAMBER-TRACKER | V · Экспериментальные инструменты | Analyzer | 1 | .5 / .5 / .5 / .0 | Analyzes envelope peaks and converts them into a repeatable event-density report. |
| 111 | crystal-quark | CRYSTAL-QUARK | V · Экспериментальные инструменты | Granular | 5 | .58 / .72 / .62 / .68 | Applies deterministic grain symmetry and harmonic scattering. |
| 112 | quantum-dot-vocoder | QUANTUM-DOT VOCODER | V · Экспериментальные инструменты | Vocoder | 1 | .58 / .66 / .32 / .66 | A three-band envelope vocoder with discrete formant-like carrier components. |
| 113 | teleport-preset | TELEPORT-PRESET | V · Экспериментальные инструменты | Morph | 6 | .5 / .62 / .34 / .7 | Morphs between dry, saturated and spatial states using one continuous macro value. |
| 114 | eigen-vocal | EIGEN-VOCAL | V · Экспериментальные инструменты | Vocoder | 2 | .52 / .62 / .26 / .7 | Separates low body, mid formants and high articulation with an envelope-guided model. |
| 115 | magnetar-limiter | MAGNETAR-LIMITER | V · Экспериментальные инструменты | Dynamics | 13 | .78 / .7 / .12 / .92 | A dense peak limiter with magnetic-style asymmetric soft saturation. |
| 116 | quark-gluon-plasma | QUARK-GLUON PLASMA | V · Экспериментальные инструменты | Saturation | 7 | .76 / .82 / .38 / .8 | High-density nonlinear drive with controlled cross-band harmonic mixing. |
| 117 | phase-entangler | PHASE-ENTANGLER | V · Экспериментальные инструменты | StereoField | 11 | .7 / .44 / .2 / .84 | Aligns stereo movement and reduces unstable inter-channel phase differences. |
| 118 | sub-atomic-transient | SUB-ATOMIC TRANSIENT | V · Экспериментальные инструменты | Transient | 7 | .62 / .36 / .18 / .82 | Shapes attack into click, impulse and body zones with independent envelope emphasis. |
| 119 | zero-latency-oracle | ZERO-LATENCY ORACLE | V · Экспериментальные инструменты | Dynamics | 14 | .68 / .62 / .12 / .92 | An offline look-ahead soft peak shaper; it does not claim zero live-processing latency. |
| 120 | hybrid-boson | HYBRID-BOSON | V · Экспериментальные инструменты | Morph | 7 | .54 / .62 / .24 / .78 | Combines moderate compression, saturation and spatial control in one field. |
| 121 | quantum-walk-lfo | QUANTUM-WALK LFO | V · Экспериментальные инструменты | Modulator | 7 | .4 / .58 / .56 / .62 | Uses deterministic random-walk modulation with bounded drift and repeatability. |
| 122 | spectral-tunnel | SPECTRAL-TUNNEL | V · Экспериментальные инструменты | Spectrum | 7 | .52 / .68 / .2 / .82 | Reduces low-mid masking while restoring upper-band definition. |
| 123 | atom-clock-sync | ATOM-CLOCK SYNC | V · Экспериментальные инструменты | Time | 2 | .32 / .4 / .6 / .74 | Applies deterministic micro-timing and phase correction to short events. |
| 124 | fractal-orbital | FRACTAL-ORBITAL | V · Экспериментальные инструменты | Modulator | 8 | .52 / .58 / .68 / .66 | A nested chorus/flanger motion with bounded multi-rate modulation. |
| 125 | relativity-pan | RELATIVITY-PAN | V · Экспериментальные инструменты | StereoField | 12 | .46 / .62 / .32 / .8 | Pan movement includes a short interaural timing offset for spatial depth. |
| 126 | string-landscape | STRING-LANDSCAPE | V · Экспериментальные инструменты | Morph | 8 | .5 / .74 / .4 / .66 | A macro-controlled texture morph across harmonics, modulation and stereo. |
| 127 | quantum-noise-gate | QUANTUM-NOISE GATE | V · Экспериментальные инструменты | Gate | 2 | .6 / .48 / .3 / .82 | Envelope and noise-floor gate with a soft release and hysteresis-like hold. |
| 128 | nucleon-punch | NUCLEON-PUNCH | V · Экспериментальные инструменты | SubGenerator | 4 | .64 / .32 / .16 / .78 | Reinforces bass and lower-mid body with a linked mono low-frequency envelope. |
| 129 | photon-delay | PHOTON-DELAY | V · Экспериментальные инструменты | Delay | 5 | .42 / .86 / .42 / .5 | A clear short delay with a filtered feedback loop and stereo reflection offset. |
| 130 | wave-collapse-comp | WAVE-COLLAPSE COMP | V · Экспериментальные инструменты | Dynamics | 15 | .72 / .52 / .12 / .92 | Fast envelope compression with a soft-knee peak clamp. |
| 131 | entropy-reverser | ENTROPY-REVERSER | V · Экспериментальные инструменты | Granular | 6 | .56 / .48 / .62 / .68 | Uses deterministic reverse-grain windows to pull scattered tails toward the transient. |
| 132 | singularity-bass | SINGULARITY-BASS | V · Экспериментальные инструменты | SubGenerator | 5 | .82 / .16 / .12 / .82 | Builds a focused mono sub layer with strict low-frequency stability. |
| 133 | omega-field | OMEGA-FIELD | V · Экспериментальные инструменты | Morph | 9 | .5 / .58 / .22 / .78 | A final macro processor combining tone, dynamics, phase and spatial balance. |

### 1.1. Общие 21 модели

| Модель | Математический класс |
|---|---|
| StereoField | преобразование M/S, ширины и фазо-панорамного поля |
| Dynamics | огибающая, компрессия, gate и ограничение пиков |
| Equalizer | рекуррентное разложение на полосы и взвешенное суммирование |
| Saturation | нелинейная амплитудная функция |
| Exciter | высокочастотный остаток с envelope/transient gate |
| Modulator | периодически управляемая задержка/фаза |
| Delay | конечная линия задержки с обратной связью и taps |
| Reverb | сеть из четырёх feedback-линий отражения |
| Gate | сглаженная огибающая и пороговая функция усиления |
| Transient | разность быстрой и медленной огибающих |
| Granular | конечные временные окна, детерминированный сдвиг и реверс |
| Resonator | feedback comb / настроенный резонатор |
| Quantizer | конечная амплитудная решётка и sample-hold |
| SubGenerator | низкочастотный осциллятор под envelope detector |
| Noise | PRNG-шум, окрашивание и envelope-модуляция |
| Spectrum | три полосы и их раздельные gain-функции |
| Time | переменное соответствие индексов чтения и записи |
| Vocoder | трёхполосная огибающая и синусоидальные несущие |
| Synth | управляемые входной огибающей осцилляторные слои |
| Analyzer | отображение сигнала в статистический отчёт без изменения |
| Morph | гибрид нелинейной обработки, яркости и envelope-dynamics |

### 1.2. Что означает поле variant

variant выбирает конфигурацию ветви общей модели. Оно может менять закон gain, полярность, количество taps, направление granular-чтения, частоту/фазу или сочетание алгоритмов. Значение variant имеет смысл только совместно со стабильным ID, моделью и версией исходного алгоритма. Оно не должно интерпретироваться как самостоятельный коэффициент K3 или как физический параметр частицы.

## 2. Atomic-Quantum: отдельный каталог из 133 идентификаторов

Это **другая** совокупность из 133 элементов. Она описывает реестр исследовательских функций симуляции состояний, корреляций, измерений, шумовых каналов, решёток и telemetry. Нельзя отождествлять её с 133 DSP-модулями из раздела 1.

| № | Диапазон | Семейство |
|---:|---:|---|
| 001–022 | 22 | State: базовые состояния, амплитуды, повороты и уровни |
| 023–044 | 22 | Entanglement: Bell/GHZ/W, корреляции и связанные состояния |
| 045–066 | 22 | Measurement: измерения, считывание и feedback |
| 067–088 | 22 | Noise / ECC: шумовые каналы и элементы коррекции ошибок |
| 089–110 | 22 | Atomic dynamics: решётки, потенциалы и перенос |
| 111–133 | 23 | Algorithms / telemetry: алгоритмические схемы и метрики |

### 2.1. Стабильные идентификаторы

Порядок и написание соответствуют массиву kFunctionIds в src/atomic_quantum.cpp. Индекс в этом перечне — ordinal каталога, а не номер кубита, не позиция коэффициента K3 и не доказательство наличия отдельной исполняемой реализации для каждой записи.
- 001 · atom_superpose_basis_01
- 002 · qubit_phase_rotate_02
- 003 · atom_ground_reset_03
- 004 · state_amplitude_normalize_04
- 005 · atom_rabi_pulse_05
- 006 · qubit_bloch_project_06
- 007 · atom_stark_shift_07
- 008 · state_coherent_blend_08
- 009 · atom_zeeman_split_09
- 010 · qubit_hadamard_twin_10
- 011 · atom_metastable_hold_11
- 012 · state_polar_encode_12
- 013 · atom_hyperfin_lock_13
- 014 · qubit_zx_twist_14
- 015 · atom_optical_trap_15
- 016 · state_phase_flip_mask_16
- 017 · atom_level_detune_17
- 018 · qubit_iswap_core_18
- 019 · atom_recoil_damp_19
- 020 · state_vacuum_seed_20
- 021 · atom_quadrupole_tilt_21
- 022 · qubit_sqrt_not_22
- 023 · entangle_bell_pair_23
- 024 · entangle_ghz_ring_24
- 025 · entangle_w_chain_25
- 026 · correlate_swap_gate_26
- 027 · entangle_cluster_grid_27
- 028 · correlate_concurrence_28
- 029 · entangle_singlet_lock_29
- 030 · entangle_triplet_mix_30
- 031 · correlate_bell_witness_31
- 032 · entangle_dicke_slice_32
- 033 · correlate_mutual_info_33
- 034 · entangle_star_hub_34
- 035 · correlate_negativity_35
- 036 · entangle_spin_squeeze_36
- 037 · correlate_discord_flux_37
- 038 · entangle_ladder_weave_38
- 039 · correlate_purity_check_39
- 040 · entangle_cat_super_40
- 041 · correlate_schmidt_rank_41
- 042 · entangle_braid_step_42
- 043 · correlate_trace_dist_43
- 044 · entangle_mesh_sync_44
- 045 · measure_projective_z_45
- 046 · measure_weak_probe_46
- 047 · measure_povm_frame_47
- 048 · feedback_phase_steer_48
- 049 · measure_parity_check_49
- 050 · measure_homodyne_quad_50
- 051 · feedback_error_synd_51
- 052 · measure_tomo_slice_52
- 053 · measure_bell_project_53
- 054 · feedback_gain_adapt_54
- 055 · measure_arrival_tick_55
- 056 · measure_double_click_56
- 057 · feedback_reset_gate_57
- 058 · measure_ramsey_fringe_58
- 059 · measure_fidelity_ref_59
- 060 · feedback_drift_trim_60
- 061 · measure_count_bucket_61
- 062 · measure_threshold_hit_62
- 063 · feedback_cooldown_hold_63
- 064 · measure_joint_moment_64
- 065 · measure_null_result_65
- 066 · feedback_loop_clamp_66
- 067 · noise_depolarize_ch_67
- 068 · noise_dephase_markov_68
- 069 · noise_amplitude_damp_69
- 070 · ecc_bitflip_code_70
- 071 · ecc_phaseflip_code_71
- 072 · ecc_surface_plaquette_72
- 073 · ecc_vertex_star_73
- 074 · noise_thermal_bath_74
- 075 · ecc_decoder_mwpm_75
- 076 · noise_crosstalk_leak_76
- 077 · ecc_logical_x_77
- 078 · ecc_logical_z_78
- 079 · noise_burst_spike_79
- 080 · ecc_flag_qubit_80
- 081 · noise_1f_flicker_81
- 082 · ecc_lattice_surgery_82
- 083 · noise_loss_erase_83
- 084 · ecc_magic_distill_84
- 085 · noise_non_markov_back_85
- 086 · ecc_steane_block_86
- 087 · noise_gate_overrot_87
- 088 · ecc_syndrome_history_88
- 089 · lattice_hop_tunnel_89
- 090 · lattice_hubbard_onsite_90
- 091 · atom_cool_sideband_91
- 092 · transport_shuttle_move_92
- 093 · lattice_peierls_flux_93
- 094 · atom_recoil_kick_94
- 095 · lattice_mott_gap_95
- 096 · transport_junction_split_96
- 097 · lattice_superfluid_phase_97
- 098 · atom_dark_state_98
- 099 · lattice_disorder_ramp_99
- 100 · transport_merge_wells_100
- 101 · lattice_rydberg_block_101
- 102 · atom_raman_transfer_102
- 103 · lattice_boundary_wrap_103
- 104 · transport_adiabatic_ramp_104
- 105 · lattice_dimer_pair_105
- 106 · atom_doppler_shift_106
- 107 · lattice_spin_exchange_107
- 108 · transport_trap_handoff_108
- 109 · lattice_anyon_braid_109
- 110 · atom_sisyphus_step_110
- 111 · algo_qaoa_cost_111
- 112 · algo_qaoa_mixer_112
- 113 · algo_vqe_ansatz_113
- 114 · algo_qpe_phase_114
- 115 · algo_grover_oracle_115
- 116 · algo_grover_diffuser_116
- 117 · algo_hhl_invert_117
- 118 · algo_walk_coin_118
- 119 · algo_walk_shift_119
- 120 · telem_coherence_time_120
- 121 · telem_gate_error_121
- 122 · telem_readout_conf_122
- 123 · telem_temp_jitter_123
- 124 · telem_entangle_depth_124
- 125 · telem_flux_balance_125
- 126 · algo_anneal_schedule_126
- 127 · algo_fourier_qft_127
- 128 · algo_amplitude_est_128
- 129 · telem_spectral_gap_129
- 130 · telem_drift_rate_130
- 131 · algo_teleport_link_131
- 132 · telem_packet_loss_132
- 133 · telem_system_health_133

### 2.2. Реально определённая модель состояния

В реализации состояния задаются комплексным вектором размера 2^q при 1≤q≤10:

\[
|\psi\rangle=\sum_{j=0}^{2^q-1}\alpha_j|j\rangle,\qquad
\sum_j|\alpha_j|^2=1.
\]

Нормировка, унитарные операции H/Pauli/CNOT/SWAP, вероятности, измерение с переданным sample u∈[0,1), dephase, amplitude damping и fidelity имеют собственные алгоритмы в atomic_quantum.cpp. Каталог 133 имён шире этого набора функций: имя в реестре нельзя считать доказательством полной реализации физической модели, пока не указаны соответствующий обработчик и тест.


## 3. Девятнадцать встроенных инструментальных плагинов

Эти 19 плагинов — не аудиофильтры и не элементы 133 DSP-каталога. Это служебные операции приложения, представленные типизированными descriptor и зарегистрированными handler. Их математическая формализация относится к workflow-графам, проверке данных, метрикам, оценкам ресурсов и конечным контрактам исполнения.

| ID | Имя | Домен | Операция и формальный объект |
|---|---|---|---|
| operandu | Operandu | Data & logic | Снимок типизированных параметров генератора и результат validation |
| dropaul | Dropaul | Actions & workflows | Упорядоченный dry-run граф этапов export: validate → preflight → render → measure → write → manifest |
| zdoro | Zdoro | Integrity & diagnostics | Read-only проверка существования workspace/output и валидности параметров |
| pyemont | Pyemont | Development | Ограниченная инвентаризация файлов и типов исходников |
| dilly | Dilly | Interface & experience | Проверка зарегистрированных UI-панелей и требований представления |
| baplap | Baplap | Data infrastructure | Индекс WAV-файлов, количество и суммарный размер в байтах |
| sretuo | Sretuo | Quality engineering | Инвентаризация тестов и план проверки |
| kali | Kali | Security | Ограниченное read-only сканирование security hygiene |
| zalam | Zalam | Connectivity | Проверка manifest v1/v2 и экспортного контракта |
| liur | Liur | Runtime resources | Оценка объёма аудиобуфера и предельных ресурсов |
| keel-koh | Keel Koh | Knowledge | Инвентаризация Markdown-документации |
| vorof | Vorof | Reverse engineering | Статическая карта файлов и модулей исходного дерева |
| vprof | Vprof | Profiling & metrics | Оценка размера исходного кода и количества branch-keyword; не runtime profiling |
| profe | Profe | Engineering standards | Проверка диапазонов параметров и typed settings |
| prossee | Prossee | Project planning | План последовательности release/export-этапов |
| vprossee | Vprossee | Verification & validation | Матрица требований и свидетельств готовности |
| professiya | Professiya | Learning | Последовательность обучающих шагов для contributor |
| profevo | Profevo | Evolution | Проверка совместимости версий manifest и миграции |
| stochastic-router | Stochastic Router | Audio processing | Seeded effect-route preview, ограниченные ветви, wet/feedback/peak guards |

### 3.1. Контракт служебного плагина

Плагин описывается кортежем
\[
P=(id,name,domain,version,api,operation,capabilities,handler).
\]
Manifest discovery регистрирует metadata и не является загрузчиком произвольного исполняемого кода. Только явно зарегистрированный handler может быть вызван менеджером. Поля enabled, initialized, handlerAttached и lastError — различные состояния и не должны объединяться в один Boolean «плагин доступен».

Точные ограничения выполняемого workflow и plugin lifecycle определены в источниках PLUGINS.md, plugin_manager.hpp/.cpp и builtin_plugins.cpp. Сам факт существования descriptor не доказывает полноту каждой заявленной capability.

## 4. Восемь эффектов Stochastic Router

| ID эффекта | Класс оператора |
|---|---|
| LowPass | сглаживающий фильтр низких частот |
| HighPass | высокочастотный остаток |
| Saturator | нелинейное амплитудное преобразование |
| BitCrusher | квантование амплитуды/временного удержания |
| Delay | задержка с feedback |
| Reverb | сеть отражений |
| RingMod | перемножение сигнала с модулятором |
| StereoWidth | изменение межканального side-компонента |

План маршрута выбирает доступные эффекты по весам без повторного выбора в пуле и распределяет их по Serial, Parallel или Hybrid topology. Выбор детерминируется seed и индексом триггера. Это отдельный маршрутизатор из восьми типов эффектов, а не часть 133 записей Quantum Audio Engine.

## 5. Реестр генератора

| Область | Значения |
|---|---|
| 14 профилей | BoomBap, EastCoast, HarlemDipTrap, GUnit, ModernTrap, AtlantaTrap, UKDrill, UKGrime, Memphis, JazzRap, Gfunk, BoomTrap, CrippleTrill, BillionaireGoldenEra |
| Цели | FullLoop, Melody, Drums, Bass, OneShotKit |
| Лады/шкалы | NaturalMinor, HarmonicMinor, Dorian, Phrygian, Major, MinorPentatonic |
| Семплерные цветовые профили | Clean, MPC2500, MPC3000XL, MPC5000 |
| Тембры | Keys, Bell, Pluck, Organ, Brass, Strings |

Реестр задаёт конечный набор категориальных параметров. Математический смысл ритмического расписания, частот нот, огибающих, stereo pan, source chops и семенного воспроизведения формализован в [VYUNENKO_AUDIO_MATHEMATICS.md](VYUNENKO_AUDIO_MATHEMATICS.md).

## 6. Граница математического прочтения

Строка каталога содержит несколько семантически разных полей: идентификатор — ключ реестра; отображаемое имя — интерфейсная метка; family — группировка; model — тип вычислительного оператора; variant — ветвь реализации; defaults — начальный набор параметров; description — краткая функциональная аннотация; visual — интерфейсная метафора. Только поля, имеющие формальное определение или связь с обработчиком, участвуют в математическом контракте.

Каталог автоматически сопоставлен с исходным массивом VentuSample. При обновлении источника его нужно пересобрать и проверить счётчики 133/133, диапазоны семейств, уникальность ID и согласованность каждой записи с соответствующей DSP-моделью.
