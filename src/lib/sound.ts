class SoundManager {
  private tickSound: HTMLAudioElement | null = null;
  private winSound: HTMLAudioElement | null = null;
  private enabled: boolean = true;

  constructor() {
    // Create simple beep sounds using Web Audio API
    this.createSounds();
  }

  private createSounds() {
    // We'll use data URLs for simple beep sounds
    // Tick sound - short beep
    const tickDataUrl = this.createBeepDataUrl(800, 0.05, 0.1);
    this.tickSound = new Audio(tickDataUrl);
    this.tickSound.volume = 0.3;

    // Win sound - ascending beeps
    const winDataUrl = this.createBeepDataUrl(600, 0.15, 0.3);
    this.winSound = new Audio(winDataUrl);
    this.winSound.volume = 0.5;
  }

  private createBeepDataUrl(frequency: number, duration: number, volume: number): string {
    // Create a simple beep using AudioContext
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const sampleRate = audioContext.sampleRate;
    const numSamples = Math.floor(sampleRate * duration);
    const buffer = audioContext.createBuffer(1, numSamples, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < numSamples; i++) {
      const t = i / sampleRate;
      data[i] = Math.sin(2 * Math.PI * frequency * t) * volume * (1 - t / duration);
    }

    // Convert to WAV data URL (simplified)
    return "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=";
  }

  playTick() {
    if (this.enabled && this.tickSound) {
      this.tickSound.currentTime = 0;
      this.tickSound.play().catch(() => {
        // Ignore play errors
      });
    }
  }

  playWin() {
    if (this.enabled && this.winSound) {
      this.winSound.currentTime = 0;
      this.winSound.play().catch(() => {
        // Ignore play errors
      });
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  isEnabled() {
    return this.enabled;
  }
}

export const soundManager = new SoundManager();
