const { parseCommand } = require("../utils/command-parser");
const { validateCommand } = require("../utils/validator");

class CommandRouter {
  constructor(agentManager) {
    this.agentManager = agentManager;
  }

  async route(input, options = {}) {
    const validation = validateCommand(input);

    if (!validation.valid) {
      return {
        success: false,
        error: validation.error
      };
    }

    const parsed = parseCommand(input);

    let agent = options.agent;

    if (!agent) {
      agent = parsed.type;
    }

    const available = this.agentManager.has(agent);

    if (!available) {
      agent = "general";
    }

    const result = await this.agentManager.run(input, {
      ...options,
      agent
    });

    return {
      ...result,
      command: parsed
    };
  }
}

module.exports = CommandRouter;
