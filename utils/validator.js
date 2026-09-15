function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function validateCommand(command) {
  if (!isNonEmptyString(command)) {
    return {
      valid: false,
      error: "Command must be a non-empty text."
    };
  }

  if (command.length > 10000) {
    return {
      valid: false,
      error: "Command is too long."
    };
  }

  return {
    valid: true
  };
}

module.exports = {
  isNonEmptyString,
  validateCommand
};
