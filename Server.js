"use strict";

/*
=========================================================
 JARVIS — AI JOB AGENT
 File: server.js
 Secure local server / automation bridge
=========================================================

 IMPORTANT:
 - No API key
 - No passwords stored
 - No secret data in frontend
 - Sensitive actions require confirmation
 - Browser/OS automation will be connected through
   dedicated modules later
=========================================================
*/

const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const PORT = process.env.PORT || 8787;
const HOST = "127.0.0.1";

const ROOT = __dirname;
const INDEX_FILE = path.join(ROOT, "index.html");

const serverId = crypto.randomBytes(8).toString("hex");

const sessions = new Map();

const security = {
  localOnly: true,
  apiKeysRequired: false,
  confirmationRequired: true,
  allowRemoteControl: false
};


/* =====================================================
   HELPERS
===================================================== */

function json(res, status, data) {

  const body = JSON.stringify(data);

  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(body),
   
