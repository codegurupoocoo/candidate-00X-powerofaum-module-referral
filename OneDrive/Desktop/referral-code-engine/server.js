const express = require("express");
const app = express();
const generate = require("./api/generate");
const redeem = require("./api/redeem");
const metrics = require("./api/metrics");

app.use(express.json());

app.post("/api/generate-referral-code", generate);
app.post("/api/redeem-referral-code", redeem);
app.get("/api/referral-metrics", metrics);

module.exports = app; // Required for Vercel to run the app

// Optional (for local testing)
if (require.main === module) {
  app.listen(3000, () => console.log("Server running on port 3000"));
}
