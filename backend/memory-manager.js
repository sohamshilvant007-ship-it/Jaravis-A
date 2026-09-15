class MemoryManager {
  constructor() {
    this.memory = [];
    this.maxItems = 100;
  }

  add(role, content) {
    if (!content) return null;

    const item = {
      role: role || "user",
      content: String(content),
      timestamp: new Date().toISOString()
    };

    this.memory.push(item);

    if (this.memory.length > this.maxItems) {
      this.memory.shift();
    }

    return item;
  }

  getAll() {
    return [...this.memory];
  }

  recent(count = 10) {
    return this.memory.slice(-count);
  }

  clear() {
    this.memory = [];
  }
}

module.exports = MemoryManager;
