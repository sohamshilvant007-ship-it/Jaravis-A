function parseCommand(input) {
  const text = String(input || "").trim();

  if (!text) {
    return {
      command: "",
      type: "empty",
      confidence: 0
    };
  }

  const lower = text.toLowerCase();

  let type = "general";

  if (/research|search|find information|investigate/.test(lower)) {
    type = "research";
  } else if (/code|coding|program|javascript|html|python/.test(lower)) {
    type = "code";
  } else if (/browser|website|open site|web/.test(lower)) {
    type = "browser";
  } else if (/report|summary|summarize/.test(lower)) {
    type = "report";
  } else if (/task|todo|remind|schedule/.test(lower)) {
    type = "task";
  }

  return {
    command: text,
    type,
    confidence: 0.8,
    timestamp: new Date().toISOString()
  };
}

module.exports = {
  parseCommand
};
