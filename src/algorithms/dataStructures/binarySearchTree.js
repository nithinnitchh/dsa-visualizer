// Step generator for Binary Search Tree (BST) Data Structure and Traversals

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.id = `node-${value}-${Math.random().toString(36).substr(2, 5)}`;
  }
}

export class BSTModel {
  constructor(initialValues = [50, 30, 70, 20, 40, 60, 80]) {
    this.root = null;
    for (const val of initialValues) {
      this.root = this._insertDirect(this.root, val);
    }
  }

  _cloneTree(node) {
    if (!node) return null;
    const cloned = new Node(node.value);
    cloned.id = node.id;
    cloned.left = this._cloneTree(node.left);
    cloned.right = this._cloneTree(node.right);
    return cloned;
  }

  _insertDirect(node, value) {
    if (!node) return new Node(value);
    if (value < node.value) {
      node.left = this._insertDirect(node.left, value);
    } else if (value > node.value) {
      node.right = this._insertDirect(node.right, value);
    }
    return node;
  }

  insert(value) {
    const steps = [];
    const treeSnap = this._cloneTree(this.root);

    if (!this.root) {
      this.root = new Node(value);
      steps.push({
        type: 'insert_root',
        tree: this._cloneTree(this.root),
        activeNodeId: this.root.id,
        traversalSequence: [],
        description: `Tree was empty. Inserted ${value} as the Root node.`,
      });
      return { steps, success: true };
    }

    let curr = this.root;
    let parent = null;

    while (curr) {
      parent = curr;
      steps.push({
        type: 'compare',
        tree: this._cloneTree(this.root),
        activeNodeId: curr.id,
        traversalSequence: [],
        description: `Comparing insert value ${value} with current node ${curr.value}.`,
      });

      if (value === curr.value) {
        steps.push({
          type: 'duplicate',
          tree: this._cloneTree(this.root),
          activeNodeId: curr.id,
          traversalSequence: [],
          description: `Value ${value} already exists in the BST. Duplicate ignored.`,
        });
        return { steps, success: false };
      } else if (value < curr.value) {
        steps.push({
          type: 'go_left',
          tree: this._cloneTree(this.root),
          activeNodeId: curr.id,
          traversalSequence: [],
          description: `${value} < ${curr.value}: Moving down to the LEFT child.`,
        });
        curr = curr.left;
      } else {
        steps.push({
          type: 'go_right',
          tree: this._cloneTree(this.root),
          activeNodeId: curr.id,
          traversalSequence: [],
          description: `${value} > ${curr.value}: Moving down to the RIGHT child.`,
        });
        curr = curr.right;
      }
    }

    const newNode = new Node(value);
    if (value < parent.value) {
      parent.left = newNode;
    } else {
      parent.right = newNode;
    }

    steps.push({
      type: 'inserted',
      tree: this._cloneTree(this.root),
      activeNodeId: newNode.id,
      traversalSequence: [],
      description: `Inserted ${value} as the ${value < parent.value ? 'left' : 'right'} child of ${parent.value}.`,
    });

    return { steps, success: true };
  }

  search(value) {
    const steps = [];
    let curr = this.root;

    if (!curr) {
      steps.push({
        type: 'empty',
        tree: null,
        activeNodeId: null,
        traversalSequence: [],
        description: 'Tree is empty.',
      });
      return { steps, found: false };
    }

    while (curr) {
      steps.push({
        type: 'compare',
        tree: this._cloneTree(this.root),
        activeNodeId: curr.id,
        traversalSequence: [],
        description: `Comparing target ${value} with Node(${curr.value}).`,
      });

      if (curr.value === value) {
        steps.push({
          type: 'found',
          tree: this._cloneTree(this.root),
          activeNodeId: curr.id,
          traversalSequence: [],
          description: `Target value ${value} found in BST!`,
        });
        return { steps, found: true };
      } else if (value < curr.value) {
        steps.push({
          type: 'go_left',
          tree: this._cloneTree(this.root),
          activeNodeId: curr.id,
          traversalSequence: [],
          description: `${value} < ${curr.value}: Searching left subtree.`,
        });
        curr = curr.left;
      } else {
        steps.push({
          type: 'go_right',
          tree: this._cloneTree(this.root),
          activeNodeId: curr.id,
          traversalSequence: [],
          description: `${value} > ${curr.value}: Searching right subtree.`,
        });
        curr = curr.right;
      }
    }

    steps.push({
      type: 'not_found',
      tree: this._cloneTree(this.root),
      activeNodeId: null,
      traversalSequence: [],
      description: `Reached null leaf. Value ${value} is not in the BST.`,
    });

    return { steps, found: false };
  }

  deleteValue(value) {
    const steps = [];
    if (!this.root) {
      steps.push({
        type: 'empty',
        tree: null,
        activeNodeId: null,
        traversalSequence: [],
        description: 'Cannot delete from an empty tree.',
      });
      return { steps, success: false };
    }

    const deleteNode = (node, val) => {
      if (!node) return null;

      steps.push({
        type: 'compare',
        tree: this._cloneTree(this.root),
        activeNodeId: node.id,
        traversalSequence: [],
        description: `Comparing ${val} with Node(${node.value}) for deletion.`,
      });

      if (val < node.value) {
        node.left = deleteNode(node.left, val);
        return node;
      } else if (val > node.value) {
        node.right = deleteNode(node.right, val);
        return node;
      } else {
        // Node found
        // Case 1: Leaf node
        if (!node.left && !node.right) {
          steps.push({
            type: 'deleted',
            tree: this._cloneTree(this.root),
            activeNodeId: node.id,
            traversalSequence: [],
            description: `Deleted leaf node ${val}.`,
          });
          return null;
        }
        // Case 2: One child
        if (!node.left) {
          steps.push({
            type: 'deleted',
            tree: this._cloneTree(this.root),
            activeNodeId: node.id,
            traversalSequence: [],
            description: `Replaced ${val} with its right child ${node.right.value}.`,
          });
          return node.right;
        }
        if (!node.right) {
          steps.push({
            type: 'deleted',
            tree: this._cloneTree(this.root),
            activeNodeId: node.id,
            traversalSequence: [],
            description: `Replaced ${val} with its left child ${node.left.value}.`,
          });
          return node.left;
        }

        // Case 3: Two children (inorder successor)
        let successor = node.right;
        while (successor.left) successor = successor.left;

        steps.push({
          type: 'successor',
          tree: this._cloneTree(this.root),
          activeNodeId: successor.id,
          traversalSequence: [],
          description: `Node ${val} has two children. Finding inorder successor: ${successor.value}.`,
        });

        node.value = successor.value;
        node.right = deleteNode(node.right, successor.value);
        return node;
      }
    };

    this.root = deleteNode(this.root, value);

    steps.push({
      type: 'finish',
      tree: this._cloneTree(this.root),
      activeNodeId: null,
      traversalSequence: [],
      description: `BST deletion of ${value} completed.`,
    });

    return { steps, success: true };
  }

  // Traversals
  traverse(type = 'inorder') {
    const steps = [];
    const sequence = [];
    const treeSnap = this._cloneTree(this.root);

    if (!this.root) return steps;

    if (type === 'inorder') {
      const inorder = (node) => {
        if (!node) return;
        inorder(node.left);
        sequence.push(node.value);
        steps.push({
          type: 'visit',
          tree: treeSnap,
          activeNodeId: node.id,
          traversalSequence: [...sequence],
          description: `Inorder: Visited Node(${node.value}) [Left -> Root -> Right].`,
        });
        inorder(node.right);
      };
      inorder(this.root);
    } else if (type === 'preorder') {
      const preorder = (node) => {
        if (!node) return;
        sequence.push(node.value);
        steps.push({
          type: 'visit',
          tree: treeSnap,
          activeNodeId: node.id,
          traversalSequence: [...sequence],
          description: `Preorder: Visited Node(${node.value}) [Root -> Left -> Right].`,
        });
        preorder(node.left);
        preorder(node.right);
      };
      preorder(this.root);
    } else if (type === 'postorder') {
      const postorder = (node) => {
        if (!node) return;
        postorder(node.left);
        postorder(node.right);
        sequence.push(node.value);
        steps.push({
          type: 'visit',
          tree: treeSnap,
          activeNodeId: node.id,
          traversalSequence: [...sequence],
          description: `Postorder: Visited Node(${node.value}) [Left -> Right -> Root].`,
        });
      };
      postorder(this.root);
    } else if (type === 'levelOrder') {
      const queue = [this.root];
      while (queue.length > 0) {
        const curr = queue.shift();
        sequence.push(curr.value);
        steps.push({
          type: 'visit',
          tree: treeSnap,
          activeNodeId: curr.id,
          traversalSequence: [...sequence],
          description: `Level Order: Visited Node(${curr.value}) from Queue.`,
        });
        if (curr.left) queue.push(curr.left);
        if (curr.right) queue.push(curr.right);
      }
    }

    steps.push({
      type: 'finish',
      tree: treeSnap,
      activeNodeId: null,
      traversalSequence: [...sequence],
      description: `${type.toUpperCase()} traversal complete! Order: [${sequence.join(', ')}].`,
    });

    return steps;
  }

  clear() {
    this.root = null;
    return [{
      type: 'clear',
      tree: null,
      activeNodeId: null,
      traversalSequence: [],
      description: 'BST cleared.',
    }];
  }
}
