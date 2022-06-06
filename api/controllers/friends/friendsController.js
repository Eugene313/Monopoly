const friendsService = require('../../services/friendsService');

exports.getFriends = async(req, res, next) => {
  try {
    const result = await friendsService.getFriends(req.params.userId);
    res.send(result);
  } catch (err) {
    next(err);
  }
};
