const { db } = require('../firebase/firebase');
const refFriends = db.ref('friends');
const refUsers = db.ref('users');

exports.getFriends = async(userId) => {
  const userRequests = await refFriends
    .orderByChild('senderId')
    .equalTo(userId)
    .get();
  const friendRequests = await refFriends
    .orderByChild('receiverId')
    .equalTo(userId)
    .get();
  const allRequests = {
    ...userRequests.val(),
    ...friendRequests.val(),
  };
  const friends = [];
  for (const requestKey in allRequests) {
    const request = allRequests[requestKey];
    if (request.status === 'confirm') {
      const friendId = request.senderId === userId ? request.receiverId : request.senderId;
      const friend = await refUsers
        .child(friendId)
        .get();
      friends.push(friend);
    }
  }
  return friends;
};
