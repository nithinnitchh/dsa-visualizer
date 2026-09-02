// Step generator for Stack Data Structure

export class StackModel {
  constructor(initialItems = [15, 28, 42]) {
    this.items = [...initialItems];
    this.maxSize = 8;
  }

  push(value) {
    const steps = [];
    if (this.items.length >= this.maxSize) {
      steps.push({
        type: 'overflow',
        items: [...this.items],
        topIndex: this.items.length - 1,
        highlightIndex: null,
        description: `Stack Overflow Error! Cannot push ${value}. Maximum capacity (${this.maxSize}) reached.`,
      });
      return { steps, success: false };
    }

    steps.push({
      type: 'prepare_push',
      items: [...this.items],
      topIndex: this.items.length - 1,
      highlightIndex: null,
      description: `Preparing to push element ${value} onto the top of the stack.`,
    });

    this.items.push(value);
    const newTop = this.items.length - 1;

    steps.push({
      type: 'pushed',
      items: [...this.items],
      topIndex: newTop,
      highlightIndex: newTop,
      description: `Pushed ${value} onto Stack at Top index ${newTop}. Size is now ${this.items.length}.`,
    });

    return { steps, success: true };
  }

  pop() {
    const steps = [];
    if (this.items.length === 0) {
      steps.push({
        type: 'underflow',
        items: [],
        topIndex: -1,
        highlightIndex: null,
        description: 'Stack Underflow Error! Cannot pop from an empty stack.',
      });
      return { steps, success: false, poppedValue: null };
    }

    const currTop = this.items.length - 1;
    const poppedValue = this.items[currTop];

    steps.push({
      type: 'prepare_pop',
      items: [...this.items],
      topIndex: currTop,
      highlightIndex: currTop,
      description: `Accessing top element ${poppedValue} at index ${currTop} for removal.`,
    });

    this.items.pop();
    const newTop = this.items.length - 1;

    steps.push({
      type: 'popped',
      items: [...this.items],
      topIndex: newTop,
      highlightIndex: null,
      description: `Popped ${poppedValue} from the stack. Top pointer updated to index ${newTop}.`,
    });

    return { steps, success: true, poppedValue };
  }

  peek() {
    const steps = [];
    if (this.items.length === 0) {
      steps.push({
        type: 'empty',
        items: [],
        topIndex: -1,
        highlightIndex: null,
        description: 'Stack is empty. Peek returned null.',
      });
      return { steps, value: null };
    }

    const topIdx = this.items.length - 1;
    const value = this.items[topIdx];

    steps.push({
      type: 'peek',
      items: [...this.items],
      topIndex: topIdx,
      highlightIndex: topIdx,
      description: `Top element is ${value} at index ${topIdx}. (No modification to stack)`,
    });

    return { steps, value };
  }

  clear() {
    this.items = [];
    return [{
      type: 'clear',
      items: [],
      topIndex: -1,
      highlightIndex: null,
      description: 'Stack cleared. Capacity reset.',
    }];
  }
}
