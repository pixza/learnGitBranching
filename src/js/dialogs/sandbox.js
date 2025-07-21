const { Branch } = require("../git");

exports.dialog = {
  'en_US': [{
    type: 'ModalAlert',
    options: {
      markdowns: [
        '## CSIT mini challenge #1',
        '',
        'This is a fork of the original "Learn Git Branching" project, ',
        'a customized version for the CSIT mini challenge.',
        '',
        'After this dialog you\'ll see level selection modal, with only 1 level available.',
        '',
        'That is your task for this challenge.',
        '',
        'Read through the objective and tips carefully, and try to solve the level.',
        '',
        'If you can solve it, you shall obtain the flag for the challenge.',
      ]
    }
  }],
};
