class SearchService {
  constructor() {
    this.name = "JARVIS Search Service";
  }

  async search(query) {
    const text = String(query || "").trim();

    if (!text) {
      return {
        success: false,
        error: "Search query is empty."
      };
    }

    return {
      success: true,
      query: text,
      status: "ready",
      results: []
    };
  }
}

module.exports = SearchService;
