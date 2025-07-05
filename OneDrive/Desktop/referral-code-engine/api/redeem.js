const fs = require("fs");
const path = require("path");

module.exports = (req, res) => {
  const { code, newUserId } = req.body;
  if (!code || !newUserId) return res.status(400).json({ success: false, message: "Missing fields" });

  const referralPath = path.join(__dirname, "../data/referrals.json");
  const referrals = JSON.parse(fs.readFileSync(referralPath));
  const referral = referrals.find(r => r.code === code);

  if (!referral) return res.status(404).json({ success: false, message: "Code not found" });

  referral.uses += 1;
  fs.writeFileSync(referralPath, JSON.stringify(referrals, null, 2));

  const userReferralPath = path.join(__dirname, "../data/userReferrals.json");
  const userReferrals = JSON.parse(fs.readFileSync(userReferralPath));
  userReferrals.push({ newUserId, referrerCode: code });
  fs.writeFileSync(userReferralPath, JSON.stringify(userReferrals, null, 2));

  res.json({ success: true, message: "Referral applied!" });
};
