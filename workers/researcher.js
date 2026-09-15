// JARVIS Researcher Agent
// File: workers/researcher.js

class Researcher {
  constructor(options = {}) {
    this.name = "JARVIS Researcher";
    this.version = "1.0.0";
    this.options = options;
  }

  cleanQuery(query) {
    return String(query || "")
      .trim()
      .replace(/\s+/g, " ");
  }

  async run(query, options = {}) {
    const cleanQuery = this.cleanQuery(query);

    if (!cleanQuery) {
      return {
        success: false,
        error: "Research query is empty."
      };
    }

    /*
      This agent intentionally does not pretend to have
      internet access by itself.

      server.js can connect this agent to a real search
      provider later.
    */

    return {
      success: true,
      agent: "researcher",
      query: cleanQuery,
      status: "ready",
      message: `Research request prepared for: ${cleanQuery}`,
      sources: [],
      timestamp: new Date().toISOString(),
      options
    };
  }

  formatResults(results = []) {
    if (!Array.isArray(results)) {
      return [];
    }

    return results.map((item, index) => ({
      id: index + 1,
      title: item.title || "Untitled",
      url: item.url || "",
      snippet: item.snippet || item.description || ""
    }));
  }
}

module.exports = Researcher;
