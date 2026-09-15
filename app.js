/* =========================================================
   JARVIS — AI JOB AGENT
   File: app.js
   Core frontend controller
   No API key required
   ========================================================= */

"use strict";

const JARVIS = {
  version: "1.0.0",
  status: "ready",
  currentTask: null,
  history: [],

  agents: {
    browser: "Browser Agent",
    form: "Form Agent",
    research: "Research Agent",
    document: "Document Agent",
    download: "Download Agent",
    computer: "Computer Agent",
    phone: "Phone Agent",
    device: "Device Bridge",
    task: "Task Agent",
    reminder: "Reminder Agent",
    memory: "Memory Agent",
    recovery: "Recovery Agent"
  }
};


/* =========================================================
   DOM HELPERS
   ========================================================= */

function $(
