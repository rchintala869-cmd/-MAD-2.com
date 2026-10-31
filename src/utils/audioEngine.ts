// Web Audio API engine for procedural Telugu cinema sounds & Bheems Ceciroleo style rhythmic beats

class AudioEngine {
  private ctx: AudioContext | null = null;
  private isBeatPlaying: boolean = false;
  private beatInterval: number | null = null;
  private currentStep: number = 0;

  private init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play dialogue punch / whistle / laugh effect
  playPunchEffect(type: 'whistle' | 'beat' | 'punch' | 'laugh') {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      if (type === 'whistle') {
        // High energetic stadium whistle sound
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1800, now);
        osc.frequency.exponentialRampToValueAtTime(2600, now + 0.15);
        osc.frequency.exponentialRampToValueAtTime(1900, now + 0.35);

        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.18, now + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.42);
      } else if (type === 'punch') {
        // Heavy cinematic comic kick / punch impact
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.exponentialRampToValueAtTime(35, now + 0.25);

        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.32);
      } else if (type === 'beat') {
        // Double dholak thumping beat
        this.playDholakStroke(now, true);
        this.playDholakStroke(now + 0.12, false);
      } else if (type === 'laugh') {
        // Staccato comic notes
        const notes = [440, 554, 659, 880];
        notes.forEach((freq, i) => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(freq, now + i * 0.08);
          gain.gain.setValueAtTime(0.08, now + i * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.1);

          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now + i * 0.08);
          osc.stop(now + i * 0.08 + 0.12);
        });
      }
    } catch {
      // Audio autoplay policy fallback
    }
  }

  // Procedural Dholak / Teenmaar strike
  private playDholakStroke(time: number, isBass: boolean) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    if (isBass) {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(120, time);
      osc.frequency.exponentialRampToValueAtTime(45, time + 0.18);
      gain.gain.setValueAtTime(0.35, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.2);
    } else {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(380, time);
      osc.frequency.exponentialRampToValueAtTime(140, time + 0.09);
      gain.gain.setValueAtTime(0.2, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.1);
    }

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(time);
    osc.stop(time + 0.22);
  }

  // Toggle procedural Tollywood mass rhythm
  toggleMassRhythm(onStep?: (step: number) => void): boolean {
    this.init();
    if (!this.ctx) return false;

    if (this.isBeatPlaying) {
      this.stopMassRhythm();
      return false;
    }

    this.isBeatPlaying = true;
    this.currentStep = 0;
    const tempoMs = 120; // Fast energetic tempo ~125-130 BPM

    this.beatInterval = window.setInterval(() => {
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const step = this.currentStep % 8;

      // 8-step Tollywood teenmaar/dholak pattern:
      // Steps 0, 4 = Heavy Bass
      // Steps 1, 2, 5, 6 = High snaps / rim
      // Step 7 = Fill
      if (step === 0 || step === 4) {
        this.playDholakStroke(now, true);
      }
      if (step === 1 || step === 2 || step === 5 || step === 6) {
        this.playDholakStroke(now, false);
      }
      if (step === 3) {
        // Melodic accent synth brass stab
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(261.63, now); // C4
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.13);
      }
      if (step === 7) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(329.63, now); // E4
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.13);
      }

      if (onStep) {
        onStep(step);
      }

      this.currentStep++;
    }, tempoMs);

    return true;
  }

  stopMassRhythm() {
    if (this.beatInterval) {
      clearInterval(this.beatInterval);
      this.beatInterval = null;
    }
    this.isBeatPlaying = false;
  }

  isPlaying(): boolean {
    return this.isBeatPlaying;
  }
}

export const audioEngine = new AudioEngine();
