const model = require('../../models/authModel');

exports.signIn = async(req, res, next) => {
  try {
    const result = await model.signIn();
    res.send(result);
  } catch (err) {
    next(err);
  }
};
exports.signUp = async(req, res, next) => {
  try {
    const result = await model.signUp();
    res.send(result);
  } catch (err) {
    next(err);
  }
};
exports.signOut = async(req, res, next) => {
  try {
    const result = await model.signOut();
    res.send(result);
  } catch (err) {
    next(err);
  }
};
exports.user = async(req, res, next) => {
  try {
    const result = await model.user();
    res.send(result);
  } catch (err) {
    next(err);
  }
};
