const fs = require("fs");
const path = require("path");

module.exports = (req, res) => {
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ success: false, message: "userId is required" });

  const code = "REF" + Math.random().toString(36).substr(2, 5).toUpperCase();
  const newReferral = { code, referrerId: userId, uses: 0 };

  const filePath = path.join(__dirname, "../data/referrals.json");
  const referrals = JSON.parse(fs.readFileSync(filePath));
  referrals.push(newReferral);
  fs.writeFileSync(filePath, JSON.stringify(referrals, null, 2));

  res.json({ success: true, code });
};
