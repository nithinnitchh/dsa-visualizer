// Step generator for Hash Table and Hash Function visualizer

export class HashTableChainingModel {
  constructor(size = 7) {
    this.size = size;
    // Buckets: array of arrays of { key, value, id }
    this.buckets = Array.from({ length: size }, () => []);
  }

  hash(key) {
    if (typeof key === 'number') {
      return ((key % this.size) + this.size) % this.size;
    }
    let hashVal = 0;
    const str = String(key);
    for (let i = 0; i < str.length; i++) {
      hashVal = (hashVal * 31 + str.charCodeAt(i)) % this.size;
    }
    return hashVal;
  }

  insert(key, value) {
    const steps = [];
    const hashIndex = this.hash(key);

    steps.push({
      type: 'hash_calc',
      hashIndex,
      activeKey: key,
      buckets: JSON.parse(JSON.stringify(this.buckets)),
      description: `Calculating hash for key "${key}": hash("${key}") = ${key} % ${this.size} = Index ${hashIndex}.`,
    });

    const bucket = this.buckets[hashIndex];
    const existingIndex = bucket.findIndex(item => item.key === key);

    if (existingIndex !== -1) {
      // Update existing
      bucket[existingIndex].value = value;
      steps.push({
        type: 'update',
        hashIndex,
        activeKey: key,
        buckets: JSON.parse(JSON.stringify(this.buckets)),
        description: `Key "${key}" found in bucket ${hashIndex}. Updated value to "${value}".`,
      });
    } else {
      // Check collision
      const isCollision = bucket.length > 0;
      bucket.push({ id: `item-${Date.now()}-${Math.random()}`, key, value });

      steps.push({
        type: isCollision ? 'collision_chain' : 'insert',
        hashIndex,
        activeKey: key,
        buckets: JSON.parse(JSON.stringify(this.buckets)),
        description: isCollision
          ? `Collision detected at index ${hashIndex}! Appended ("${key}": "${value}") to chain. (Separate Chaining)`
          : `Inserted ("${key}": "${value}") cleanly into bucket index ${hashIndex}.`,
      });
    }

    return { steps, success: true };
  }

  search(key) {
    const steps = [];
    const hashIndex = this.hash(key);

    steps.push({
      type: 'hash_calc',
      hashIndex,
      activeKey: key,
      buckets: JSON.parse(JSON.stringify(this.buckets)),
      description: `Searching for key "${key}": Hash index = ${hashIndex}. Accessing bucket ${hashIndex} in O(1) time.`,
    });

    const bucket = this.buckets[hashIndex];
    const foundItem = bucket.find(item => item.key === key);

    if (foundItem) {
      steps.push({
        type: 'found',
        hashIndex,
        activeKey: key,
        buckets: JSON.parse(JSON.stringify(this.buckets)),
        description: `Key "${key}" found in bucket ${hashIndex} with value "${foundItem.value}"!`,
      });
      return { steps, found: true, value: foundItem.value };
    } else {
      steps.push({
        type: 'not_found',
        hashIndex,
        activeKey: key,
        buckets: JSON.parse(JSON.stringify(this.buckets)),
        description: `Key "${key}" is not present in bucket ${hashIndex}.`,
      });
      return { steps, found: false, value: null };
    }
  }

  deleteKey(key) {
    const steps = [];
    const hashIndex = this.hash(key);

    steps.push({
      type: 'hash_calc',
      hashIndex,
      activeKey: key,
      buckets: JSON.parse(JSON.stringify(this.buckets)),
      description: `Target for deletion: key "${key}" maps to bucket index ${hashIndex}.`,
    });

    const bucket = this.buckets[hashIndex];
    const itemIndex = bucket.findIndex(item => item.key === key);

    if (itemIndex !== -1) {
      bucket.splice(itemIndex, 1);
      steps.push({
        type: 'deleted',
        hashIndex,
        activeKey: key,
        buckets: JSON.parse(JSON.stringify(this.buckets)),
        description: `Removed key "${key}" from bucket ${hashIndex}. Chain updated.`,
      });
      return { steps, success: true };
    } else {
      steps.push({
        type: 'not_found',
        hashIndex,
        activeKey: key,
        buckets: JSON.parse(JSON.stringify(this.buckets)),
        description: `Key "${key}" was not found in bucket ${hashIndex}. Nothing deleted.`,
      });
      return { steps, success: false };
    }
  }

  clear() {
    this.buckets = Array.from({ length: this.size }, () => []);
    return [{
      type: 'clear',
      hashIndex: null,
      activeKey: null,
      buckets: JSON.parse(JSON.stringify(this.buckets)),
      description: 'Hash Table cleared. All buckets reset.',
    }];
  }
}
