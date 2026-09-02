// Step generator for Singly Linked List Data Structure

export class LinkedListModel {
  constructor(initialValues = [10, 20, 30, 40]) {
    this.nodes = initialValues.map((v, i) => ({
      id: `node-${Date.now()}-${i}`,
      value: v,
    }));
    this.maxSize = 8;
  }

  insertBeginning(value) {
    const steps = [];
    if (this.nodes.length >= this.maxSize) {
      steps.push({
        type: 'error',
        nodes: [...this.nodes],
        activeNodeId: null,
        description: `Capacity limit reached (${this.maxSize} nodes). Cannot insert.`,
      });
      return { steps, success: false };
    }

    const newNode = { id: `node-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`, value };

    steps.push({
      type: 'create_node',
      nodes: [...this.nodes],
      activeNodeId: null,
      description: `Created new Node(${value}) with next pointer targeting null.`,
    });

    this.nodes.unshift(newNode);

    steps.push({
      type: 'link_head',
      nodes: [...this.nodes],
      activeNodeId: newNode.id,
      description: `Connected Node(${value})->next to previous head. Head pointer updated to new node.`,
    });

    return { steps, success: true };
  }

  insertEnd(value) {
    const steps = [];
    if (this.nodes.length >= this.maxSize) {
      steps.push({
        type: 'error',
        nodes: [...this.nodes],
        activeNodeId: null,
        description: `Capacity limit reached (${this.maxSize} nodes).`,
      });
      return { steps, success: false };
    }

    const newNode = { id: `node-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`, value };

    if (this.nodes.length === 0) {
      this.nodes.push(newNode);
      steps.push({
        type: 'link_head',
        nodes: [...this.nodes],
        activeNodeId: newNode.id,
        description: `List was empty. Node(${value}) is now the Head.`,
      });
      return { steps, success: true };
    }

    // Traverse to tail
    for (let i = 0; i < this.nodes.length; i++) {
      steps.push({
        type: 'traverse',
        nodes: [...this.nodes],
        activeNodeId: this.nodes[i].id,
        description: `Traversing: Currently at Node(${this.nodes[i].value}) at index ${i}.`,
      });
    }

    this.nodes.push(newNode);

    steps.push({
      type: 'link_tail',
      nodes: [...this.nodes],
      activeNodeId: newNode.id,
      description: `Reached tail. Appended new Node(${value}) to the end of the list.`,
    });

    return { steps, success: true };
  }

  insertAt(index, value) {
    const steps = [];
    if (index < 0 || index > this.nodes.length) {
      steps.push({
        type: 'error',
        nodes: [...this.nodes],
        activeNodeId: null,
        description: `Invalid index ${index}. Valid indices: 0 to ${this.nodes.length}.`,
      });
      return { steps, success: false };
    }

    if (index === 0) return this.insertBeginning(value);
    if (index === this.nodes.length) return this.insertEnd(value);

    const newNode = { id: `node-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`, value };

    for (let i = 0; i < index; i++) {
      steps.push({
        type: 'traverse',
        nodes: [...this.nodes],
        activeNodeId: this.nodes[i].id,
        description: `Traversing to target index ${index}. Currently at index ${i} (${this.nodes[i].value}).`,
      });
    }

    this.nodes.splice(index, 0, newNode);

    steps.push({
      type: 'insert_middle',
      nodes: [...this.nodes],
      activeNodeId: newNode.id,
      description: `Re-linked pointers: Inserted Node(${value}) at position ${index}.`,
    });

    return { steps, success: true };
  }

  deleteValue(value) {
    const steps = [];
    if (this.nodes.length === 0) {
      steps.push({
        type: 'error',
        nodes: [],
        activeNodeId: null,
        description: 'Cannot delete from an empty list.',
      });
      return { steps, success: false };
    }

    let foundIndex = -1;
    for (let i = 0; i < this.nodes.length; i++) {
      steps.push({
        type: 'traverse',
        nodes: [...this.nodes],
        activeNodeId: this.nodes[i].id,
        description: `Searching for value ${value}: Examining Node(${this.nodes[i].value}) at index ${i}.`,
      });

      if (this.nodes[i].value === value) {
        foundIndex = i;
        break;
      }
    }

    if (foundIndex === -1) {
      steps.push({
        type: 'not_found',
        nodes: [...this.nodes],
        activeNodeId: null,
        description: `Value ${value} not found in the list.`,
      });
      return { steps, success: false };
    }

    const removedId = this.nodes[foundIndex].id;
    this.nodes.splice(foundIndex, 1);

    steps.push({
      type: 'deleted',
      nodes: [...this.nodes],
      activeNodeId: null,
      description: `Deleted Node(${value}) at index ${foundIndex}. Adjusted adjacent pointers.`,
    });

    return { steps, success: true };
  }

  search(value) {
    const steps = [];
    for (let i = 0; i < this.nodes.length; i++) {
      steps.push({
        type: 'search_step',
        nodes: [...this.nodes],
        activeNodeId: this.nodes[i].id,
        description: `Checking index ${i}: Is Node(${this.nodes[i].value}) == ${value}?`,
      });

      if (this.nodes[i].value === value) {
        steps.push({
          type: 'search_found',
          nodes: [...this.nodes],
          activeNodeId: this.nodes[i].id,
          description: `Target ${value} found at index ${i}!`,
        });
        return { steps, foundIndex: i };
      }
    }

    steps.push({
      type: 'search_not_found',
      nodes: [...this.nodes],
      activeNodeId: null,
      description: `Reached end of list (null). Value ${value} is not present.`,
    });

    return { steps, foundIndex: -1 };
  }

  clear() {
    this.nodes = [];
    return [{
      type: 'clear',
      nodes: [],
      activeNodeId: null,
      description: 'Linked list cleared.',
    }];
  }
}
