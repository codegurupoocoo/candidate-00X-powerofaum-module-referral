const fs = require("fs");
const path = require("path");

module.exports = (req, res) => {
  const { referrerId } = req.query;
  if (!referrerId) return res.status(400).json({ success: false, message: "Missing referrerId" });

  const referrals = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/referrals.json")));
  const totalReferrals = referrals
    .filter(r => r.referrerId === referrerId)
    .reduce((acc, r) => acc + r.uses, 0);

  const revenueGeneratedCents = totalReferrals * 30000; // $300 per referral
  const commissionEarnedCents = totalReferrals * 6000;  // $60 per referral

  res.json({
    totalReferrals,
    revenueGeneratedCents,
    commissionEarnedCents
  });
};
