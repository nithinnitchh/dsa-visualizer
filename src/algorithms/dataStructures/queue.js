// Step generator for Queue Data Structure

export class QueueModel {
  constructor(initialItems = [24, 65, 89]) {
    this.items = [...initialItems];
    this.maxSize = 8;
  }

  enqueue(value) {
    const steps = [];
    if (this.items.length >= this.maxSize) {
      steps.push({
        type: 'overflow',
        items: [...this.items],
        frontIndex: 0,
        rearIndex: this.items.length - 1,
        highlightIndex: null,
        description: `Queue Overflow! Cannot enqueue ${value}. Maximum capacity (${this.maxSize}) reached.`,
      });
      return { steps, success: false };
    }

    steps.push({
      type: 'prepare_enqueue',
      items: [...this.items],
      frontIndex: this.items.length > 0 ? 0 : -1,
      rearIndex: this.items.length > 0 ? this.items.length - 1 : -1,
      highlightIndex: null,
      description: `Preparing to enqueue element ${value} at the rear of the queue.`,
    });

    this.items.push(value);
    const rearIdx = this.items.length - 1;

    steps.push({
      type: 'enqueued',
      items: [...this.items],
      frontIndex: 0,
      rearIndex: rearIdx,
      highlightIndex: rearIdx,
      description: `Enqueued ${value} at Rear index ${rearIdx}. Front index is 0. Size is ${this.items.length}.`,
    });

    return { steps, success: true };
  }

  dequeue() {
    const steps = [];
    if (this.items.length === 0) {
      steps.push({
        type: 'underflow',
        items: [],
        frontIndex: -1,
        rearIndex: -1,
        highlightIndex: null,
        description: 'Queue Underflow! Cannot dequeue from an empty queue.',
      });
      return { steps, success: false, dequeuedValue: null };
    }

    const dequeuedValue = this.items[0];

    steps.push({
      type: 'prepare_dequeue',
      items: [...this.items],
      frontIndex: 0,
      rearIndex: this.items.length - 1,
      highlightIndex: 0,
      description: `Accessing Front element ${dequeuedValue} at index 0 for removal.`,
    });

    this.items.shift();
    const hasItems = this.items.length > 0;

    steps.push({
      type: 'dequeued',
      items: [...this.items],
      frontIndex: hasItems ? 0 : -1,
      rearIndex: hasItems ? this.items.length - 1 : -1,
      highlightIndex: null,
      description: `Dequeued ${dequeuedValue} from Front. Remaining elements shifted left. Size is ${this.items.length}.`,
    });

    return { steps, success: true, dequeuedValue };
  }

  peek() {
    const steps = [];
    if (this.items.length === 0) {
      steps.push({
        type: 'empty',
        items: [],
        frontIndex: -1,
        rearIndex: -1,
        highlightIndex: null,
        description: 'Queue is empty. Peek returned null.',
      });
      return { steps, value: null };
    }

    const value = this.items[0];

    steps.push({
      type: 'peek',
      items: [...this.items],
      frontIndex: 0,
      rearIndex: this.items.length - 1,
      highlightIndex: 0,
      description: `Front element is ${value} at index 0. (Queue unmodified)`,
    });

    return { steps, value };
  }

  clear() {
    this.items = [];
    return [{
      type: 'clear',
      items: [],
      frontIndex: -1,
      rearIndex: -1,
      highlightIndex: null,
      description: 'Queue cleared. All elements removed.',
    }];
  }
}
