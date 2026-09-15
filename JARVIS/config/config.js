const config = {
  appName: "JARVIS",
  version: "1.0.0",
  port: Number(process.env.PORT) || 3000,

  features: {
    research: true,
    browser: true,
    reports: true,
    voice: true,
    chat: true
  }
};

module.exports = config;
