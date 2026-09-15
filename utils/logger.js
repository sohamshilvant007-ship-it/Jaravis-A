function timestamp() {
  return new Date().toISOString();
}

function info(message, data = null) {
  console.log(`[${timestamp()}] [INFO] ${message}`, data || "");
}

function error(message, err = null) {
  console.error(`[${timestamp()}] [ERROR] ${message}`, err || "");
}

function warn(message) {
  console.warn(`[${timestamp()}] [WARN] ${message}`);
}

module.exports = {
  info,
  error,
  warn
};
