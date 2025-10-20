class SoundManager {
  private audioContext: AudioContext | null = null;
  private enabled: boolean = true;

  constructor() {
    // Initialize AudioContext lazily on first user interaction
    if (typeof window !== 'undefined') {
      this.initAudioContext();
    }
  }

  private initAudioContext() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  private playBeep(frequency: number, duration: number, volume: number = 0.3) {
    if (!this.enabled) return;
    
    this.initAudioContext();
    if (!this.audioContext) return;

    try {
      // Create oscillator for the beep sound
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      // Configure the sound
      oscillator.frequency.value = frequency;
      oscillator.type = 'sine';

      // Envelope for smooth sound
      const now = this.audioContext.currentTime;
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(volume, now + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + duration);

      // Play the sound
      oscillator.start(now);
      oscillator.stop(now + duration);
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  }

  playTick() {
    // Quick, high-pitched tick sound
    this.playBeep(1200, 0.03, 0.15);
  }

  playWin() {
    if (!this.enabled) return;

    // Play a celebratory ascending sequence
    setTimeout(() => this.playBeep(523, 0.15, 0.3), 0);    // C5
    setTimeout(() => this.playBeep(659, 0.15, 0.3), 100);  // E5
    setTimeout(() => this.playBeep(784, 0.25, 0.35), 200); // G5
  }

  playApplause() {
    if (!this.enabled) return;
    
    this.initAudioContext();
    if (!this.audioContext) return;

    try {
      const now = this.audioContext.currentTime;
      const duration = 2;
      
      // Create applause sound using white noise bursts
      for (let i = 0; i < 50; i++) {
        const bufferSize = this.audioContext.sampleRate * 0.1;
        const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
        const data = buffer.getChannelData(0);
        
        // Generate white noise
        for (let j = 0; j < bufferSize; j++) {
          data[j] = Math.random() * 2 - 1;
        }
        
        const noise = this.audioContext.createBufferSource();
        const filter = this.audioContext.createBiquadFilter();
        const gain = this.audioContext.createGain();
        
        noise.buffer = buffer;
        filter.type = 'bandpass';
        filter.frequency.value = 1000 + Math.random() * 2000;
        
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.audioContext.destination);
        
        const startTime = now + (Math.random() * duration);
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.05, startTime + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.1);
        
        noise.start(startTime);
        noise.stop(startTime + 0.1);
      }
    } catch (error) {
      console.error('Error playing applause:', error);
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
