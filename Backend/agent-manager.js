// JARVIS - Agent Manager
// File: backend/agent-manager.js

class AgentManager {
  constructor() {
    this.agents = new Map();

    this.registerDefaultAgents();
  }

  registerDefaultAgents() {
    this.register("general", {
      name: "General Assistant",
      description: "Handles normal JARVIS commands.",
      handler: async (input) => {
        return {
          type: "general",
          message: `JARVIS received: ${input}`
        };
      }
    });

    this.register("researcher", {
      name: "Research Agent",
      description: "Handles research-related tasks.",
      handler: async (input) => {
        return {
          type: "research",
          message: `Research task received: ${input}`
        };
      }
    });

    this.register("browser", {
      name: "Browser Agent",
      description: "Handles browser-related tasks.",
      handler: async (input) => {
        return {
          type: "browser",
          message: `Browser task received: ${input}`
        };
      }
    });
  }

  register(id, agent) {
    if (!id || !agent) {
      throw new Error("Agent ID and agent configuration are required.");
    }

    this.agents.set(id, agent);
  }

  remove(id) {
    return this.agents.delete(id);
  }

  has(id) {
    return this.agents.has(id);
  }

  list() {
    return Array.from(this.agents.entries()).map(([id, agent]) => ({
      id,
      name: agent.name,
      description: agent.description
    }));
  }

  chooseAgent(input) {
    const text = String(input || "").toLowerCase();

    if (
      text.includes("search") ||
      text.includes("research") ||
      text.includes("find information")
    ) {
      return "researcher";
    }

    if (
      text.includes("browser") ||
      text.includes("website") ||
      text.includes("open site")
    ) {
      return "browser";
    }

    return "general";
  }

  async run(input, options = {}) {
    const text = String(input || "").trim();

    if (!text) {
      return {
        success: false,
        error: "No command was provided."
      };
    }

    const agentId = options.agent || this.chooseAgent(text);
    const agent = this.agents.get(agentId);

    if (!agent) {
      return {
        success: false,
        error: `Agent "${agentId}" was not found.`
      };
    }

    try {
      const result = await agent.handler(text, options);

      return {
        success: true,
        agent: agentId,
        result
      };
    } catch (error) {
      return {
        success: false,
        agent: agentId,
        error: error.message || "Agent execution failed."
      };
    }
  }
}

module.exports = AgentManager;
