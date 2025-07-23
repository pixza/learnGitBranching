// Each level is part of a "sequence;" levels within
// a sequence proceed in the order listed here
exports.levelSequences = {
  challenge: [
    require('./challenge/gitrebuild').level,
  ]
};

// there are also cute names and such for sequences
var sequenceInfo = exports.sequenceInfo = {
  challenge: {
    displayName: {
      'en_US': 'CSIT Mini Challenge'
    },
    about: {
      'en_US': 'A git rebuild challenge, testing your skills at rebasing, merging, and cherry-picking'
    }
  },
};

exports.getTabForSequence = function(sequenceName) {
  var info = sequenceInfo[sequenceName];
  return (info.tab) ?
    info.tab :
    'main';
};
