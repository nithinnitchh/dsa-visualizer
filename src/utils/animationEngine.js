// Playback animation engine for deterministic step-by-step DSA visualizers

export class PlaybackEngine {
  constructor({
    steps = [],
    delay = 200,
    onStep = () => {},
    onFinish = () => {},
    onStateChange = () => {},
  } = {}) {
    this.steps = steps;
    this.delay = delay;
    this.currentIndex = 0;
    this.isPlaying = false;
    this.timerId = null;
    this.onStep = onStep;
    this.onFinish = onFinish;
    this.onStateChange = onStateChange;
  }

  setSteps(newSteps) {
    this.pause();
    this.steps = newSteps;
    this.currentIndex = 0;
    this.notifyStep();
    this.notifyState();
  }

  setDelay(newDelay) {
    this.delay = newDelay;
    if (this.isPlaying) {
      this.pause();
      this.play();
    }
  }

  play() {
    if (this.isPlaying) return;
    if (this.currentIndex >= this.steps.length - 1) {
      // If at end, start from beginning
      this.currentIndex = 0;
      this.notifyStep();
    }

    this.isPlaying = true;
    this.notifyState();
    this.scheduleNext();
  }

  scheduleNext() {
    if (!this.isPlaying) return;

    this.timerId = setTimeout(() => {
      if (!this.isPlaying) return;

      if (this.currentIndex < this.steps.length - 1) {
        this.currentIndex++;
        this.notifyStep();
        this.scheduleNext();
      } else {
        this.isPlaying = false;
        this.notifyState();
        this.onFinish();
      }
    }, this.delay);
  }

  pause() {
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
    this.isPlaying = false;
    this.notifyState();
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  stepForward() {
    this.pause();
    if (this.currentIndex < this.steps.length - 1) {
      this.currentIndex++;
      this.notifyStep();
    }
  }

  stepBackward() {
    this.pause();
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.notifyStep();
    }
  }

  jumpTo(index) {
    this.pause();
    if (index >= 0 && index < this.steps.length) {
      this.currentIndex = index;
      this.notifyStep();
    }
  }

  reset() {
    this.pause();
    this.currentIndex = 0;
    this.notifyStep();
    this.notifyState();
  }

  getCurrentStep() {
    if (this.steps.length === 0) return null;
    return this.steps[this.currentIndex] || null;
  }

  getProgress() {
    if (this.steps.length === 0) return 0;
    return (this.currentIndex / (this.steps.length - 1)) * 100;
  }

  notifyStep() {
    const currentStep = this.getCurrentStep();
    this.onStep(this.currentIndex, currentStep, this.currentIndex === this.steps.length - 1);
  }

  notifyState() {
    this.onStateChange({
      isPlaying: this.isPlaying,
      currentIndex: this.currentIndex,
      totalSteps: this.steps.length,
      progress: this.getProgress(),
    });
  }

  destroy() {
    this.pause();
  }
}
