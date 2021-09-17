const router = require('express').Router();

const {
  models: { Log },
  Types: { ObjectId }
} = require('mongoose');


router.get('/', async (req, res, next) => {
  try {
    res.json(await Log.find())
  } catch (e) {
    next(e)
  }
});

module.exports = router;
