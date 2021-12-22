const router = require('express').Router();
let Receipt = require('../models/receipt.model');

router.route('/').get((req, res) => {
  Receipt.find()
    .then(receipts => res.json(receipts))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const receiptname = req.body.receiptname;
  const link = req.body.link;
  const like = req.body.like;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newReceipt = new Receipt({
    username,
    receiptname,
    link,
    like,
    duration,
    date,
  });

  newReceipt.save()
  .then(() => res.json('Receipt added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Receipt.findById(req.params.id)
    .then(receipt => res.json(receipt))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Receipt.findByIdAndDelete(req.params.id)
    .then(() => res.json('Receipt deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Receipt.findById(req.params.id)
    .then(receipt => {
      receipt.username = req.body.username;
      receipt.receiptname = req.body.receiptname;
      receipt.link = req.body.link;
      receipt.like = req.body.like;

      receipt.duration = Number(req.body.duration);
      receipt.date = Date.parse(req.body.date);

      receipt.save()
        .then(() => res.json('receipt updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;