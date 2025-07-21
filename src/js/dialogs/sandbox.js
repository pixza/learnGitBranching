const { Branch } = require("../git");

exports.dialog = {
  'en_US': [{
    type: 'ModalAlert',
    options: {
      markdowns: [
        '## Welcome to Learn Git Branching',
        '',
        'Interested in learning Git? Well you\'ve come to the right place! ',
        '"Learn Git Branching" is the most visual and interactive way to learn Git ',
        'on the web; you\'ll be challenged with exciting levels, given step-by-step ',
        'demonstrations of powerful features, and maybe even have a bit of fun along the way.',
        '',
        'After this dialog you\'ll see the variety of levels we have to offer. If you\'re a ',
        'beginner, just go ahead and start with the first. If you already know some Git basics, ',
        'try some of our later more challenging levels.',
        '',
        'You can see all the commands available with `show commands` at the terminal.',
        '',
        'PS: Want to go straight to a sandbox next time?',
        'Try out ',
        '[this special link](https://pcottle.github.io/learnGitBranching/?NODEMO)',
        '',
        'PPS: GitHub has started naming the default branch `main` instead of `master` ',
        'to migrate away from biased terminology [(more details available here)](https://github.com/github/renaming). ',
        'In accordance with this industry-wide movement, we have also updated "Learn Git Branching" to ',
        'use `main` instead of `master` in our lessons. This rename should be fairly consistent by ',
        'now but if you notice any errors, feel free to submit a PR (or open an issue).'
      ]
    }
  }],
};
