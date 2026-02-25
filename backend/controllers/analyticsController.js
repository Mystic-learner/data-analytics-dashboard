const Sales = require("../models/Sales");

exports.getAnalytics = async (req, res) => {
  try {
    const { startDate, endDate, category, status } = req.query;

    let filter = {};

    if (startDate && endDate) {
      filter.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    if (category) filter.category = category;
    if (status) filter.status = status;

    const data = await Sales.find(filter);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};