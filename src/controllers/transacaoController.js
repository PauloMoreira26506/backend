const transactions = require('../model/transacao');

exports.getTransactions = (req, res) => {
  res.json(transactions);
};
