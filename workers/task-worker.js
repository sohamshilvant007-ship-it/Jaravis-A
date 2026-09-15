class TaskWorker {
  constructor() {
    this.name = "JARVIS Task Worker";
  }

  async run(task) {
    const command = String(task || "").trim();

    if (!command) {
      return {
        success: false,
        error: "Task is empty."
      };
    }

    return {
      success: true,
      worker: this.name,
      task: command,
      status: "processed",
      timestamp: new Date().toISOString()
    };
  }
}

module.exports = TaskWorker;
