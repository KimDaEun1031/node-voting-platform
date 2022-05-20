exports.resultToVote = (vote, isSameUser) => {
  const result = [];

  if (vote.voteCompleted || (isSameUser && !vote.voteCompleted)) {
    let hash = {};

    for (const option of vote.voteOptionList) {
      hash[option.voteContent] = option.voterList.length;
    }

    const maxKey = Object.keys(hash).reduce((acc, cur) => {
      return hash[acc] > hash[cur] ? acc : cur;
    });

    result.push(maxKey, hash[maxKey]);
  }

  return result;
};

exports.checkExpirationTime = (date) => {
  const expirationTime = new Date(date).getTime();
  const currentTime = new Date().getTime();

  if (expirationTime >= currentTime) {
    return true;
  }

  return false;
};

exports.validationDate = (date) => {
  const expirationTime = new Date(date).getTime();
  const currentTime = new Date().getTime();

  if (expirationTime <= currentTime) {
    return false;
  }

  return true;
};
