const express = require("express");
const app = express();
const generate = require("./api/generate-referral-code");
const redeem = require("./api/redeem-referral-code");
const metrics = require("./api/referral-metrics");

app.use(express.json());

// Routes
app.post("/api/generate-referral-code", generate);
app.post("/api/redeem-referral-code", redeem);
app.get("/api/referral-metrics", metrics);

// Vercel requires this export
module.exports = app;
