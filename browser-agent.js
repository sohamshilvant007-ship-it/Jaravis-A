"use strict";

/*
=========================================================
 JARVIS — BROWSER AGENT
 File: backend/browser/browser-agent.js
=========================================================

 Safe browser-agent foundation.

 This module:
 - Validates browser tasks
 - Creates safe browser plans
 - Allows only normal navigation/search actions
 - Does NOT bypass CAPTCHA, MFA or security controls
 - Does NOT handle passwords, OTPs or payment PINs
 - Does NOT execute arbitrary shell commands
 - Real browser automation can be connected later
=========================================================
*/

const ALLOWED_PROTOCOLS = new Set([
  "http:",
  "https:"
]);

const BLOCKED_COMMANDS = [
  "password",
  "otp",
  "one time password",
  "pin",
  "upi pin",
  "credit card",
  "debit card",
  "cvv",
  "captcha",
  "bypass captcha",
  "bypass security",
  "disable security",
  "steal",
  "hack"
];


/* =====================================================
   BASIC HELPERS
===================================================== */

function cleanText(value) {

  if (typeof value !== "string") {
    return "";
  }

  return value
    .trim()
    .replace(/\s+/g, " ");

}


function containsBlockedContent(command) {

  const text =
    cleanText(command).toLowerCase();

  return BLOCKED_COMMANDS.some(
    item => text.includes(item)
  );

}


/* =====================================================
   URL SECURITY
===================================================== */

function validateUrl(input) {

  if (
    typeof input !== "string" ||
    !input.trim()
  ) {

    return {
      valid: false,
      reason: "URL is required."
    };

  }

  let url;

  try {

    url =
      new URL(input.trim());

  } catch {

    return {
      valid: false,
      reason: "Invalid URL."
    };

  }

  if (
    !ALLOWED_PROTOCOLS.has(
      url.protocol
    )
  ) {

    return {
      valid: false,
      reason:
        "Only HTTP and HTTPS websites are allowed."
    };

  }

  return {
    valid: true,
    url: url.href
  };

}


/* =====================================================
   SEARCH URL
===================================================== */

function createSearchUrl(query) {

  const clean =
    cleanText(query);

  if (!clean) {

    return {
      valid: false,
      reason: "Search query is empty."
    };

  }

  if (clean.length > 500) {

    return {
      valid: false,
      reason: "Search query is too long."
    };

  }

  const encoded =
    encodeURIComponent(clean);

  return {
    valid: true,
    url:
      `https://www.google.com/search?q=${encoded}`
  };

}


/* =====================================================
   COMMAND CLASSIFICATION
===================================================== */

function classify(command) {

  const text =
    cleanText(command).toLowerCase();

  if (!text) {
    return "unknown";
  }

  if (
    text.startsWith("search ") ||
    text.includes("search for ")
  ) {

    return "search";

  }

  if (
    text.startsWith("open ") ||
    text.includes("open website") ||
    text.includes("open site")
  ) {

    return "navigate";

  }

  if (
    text.includes("go to ") ||
    text.includes("visit ")
  ) {

    return "navigate";

  }

  return "research";

}


/* =====================================================
   EXTRACT SEARCH QUERY
===================================================== */

function extractSearchQuery(command) {

  const text =
    cleanText(command);

  const patterns = [
    /^search\s+(.+)$/i,
    /^search\s+for\s+(.+)$/i,
    /^find\s+(.+)$/i,
    /^look\s+up\s+(.+)$/i
  ];

  for (const pattern of patterns) {

    const match =
      text.match(pattern);

    if (match && match[1]) {

      return cleanText(
        match[1]
      );

    }

  }

  return "";
}


/* =====================================================
   EXTRACT URL
===================================================== */

function extractUrl(command) {

  const match =
    cleanText(command)
      .match(
        /(https?:\/\/[^\s]+)/i
      );

  if (!match) {
    return "";
  }

  return match[1];

}


/* =====================================================
   CREATE BROWSER PLAN
===================================================== */

function createBrowserPlan(command) {

  const cleanCommand =
    cleanText(command);

  if (!cleanCommand) {

    return {
      success: false,
      error: "Browser command is empty."
    };

  }


  /*
  Security check
  */

  if (
    containsBlockedContent(
      cleanCommand
    )
  ) {

    return {
      success: false,
      blocked: true,
      error:
        "This browser action requires protected information or attempts to bypass security."
    };

  }


  const type =
    classify(cleanCommand);


  /*
  SEARCH
  */

  if (type === "search") {

    const query =
      extractSearchQuery(
        cleanCommand
      );

    const result =
      createSearchUrl(query);

    if (!result.valid) {

      return {
        success: false,
        error: result.reason
      };

    }

    return {

      success: true,

      plan: {

        type: "browser",

        action: "search",

        query,

        url: result.url,

        requiresConfirmation: false,

        status: "ready"

      }

    };

  }


  /*
 
