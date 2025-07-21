exports.level = {
  "goalTreeString": "{\"branches\":{\"main\":{\"target\":\"C9'\",\"id\":\"main\",\"remoteTrackingBranchID\":\"o/main\"},\"dev1\":{\"target\":\"C3'\",\"id\":\"dev1\",\"remoteTrackingBranchID\":\"o/dev1\"},\"dev2\":{\"target\":\"C6'\",\"id\":\"dev2\",\"remoteTrackingBranchID\":\"o/dev2\"},\"badcommit\":{\"target\":\"C8\",\"id\":\"badcommit\",\"remoteTrackingBranchID\":\"o/badcommit\"},\"o/main\":{\"target\":\"C9'\",\"id\":\"o/main\",\"remoteTrackingBranchID\":null},\"o/dev1\":{\"target\":\"C3\",\"id\":\"o/dev1\",\"remoteTrackingBranchID\":null},\"o/dev2\":{\"target\":\"C6\",\"id\":\"o/dev2\",\"remoteTrackingBranchID\":null},\"o/badcommit\":{\"target\":\"C8\",\"id\":\"o/badcommit\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C2\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C1\"],\"id\":\"C4\"},\"C5\":{\"parents\":[\"C4\"],\"id\":\"C5\"},\"C6\":{\"parents\":[\"C5\"],\"id\":\"C6\"},\"C7\":{\"parents\":[\"C1\"],\"id\":\"C7\"},\"C8\":{\"parents\":[\"C7\"],\"id\":\"C8\"},\"C9\":{\"parents\":[\"C8\"],\"id\":\"C9\"},\"C4'\":{\"parents\":[\"C7\"],\"id\":\"C4'\"},\"C5'\":{\"parents\":[\"C4'\"],\"id\":\"C5'\"},\"C6'\":{\"parents\":[\"C5'\"],\"id\":\"C6'\"},\"C2'\":{\"parents\":[\"C6'\"],\"id\":\"C2'\"},\"C3'\":{\"parents\":[\"C2'\"],\"id\":\"C3'\"},\"C9'\":{\"parents\":[\"C3'\"],\"id\":\"C9'\"}},\"tags\":{},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"main\":{\"target\":\"C9'\",\"id\":\"main\",\"remoteTrackingBranchID\":null},\"dev1\":{\"target\":\"C3\",\"id\":\"dev1\",\"remoteTrackingBranchID\":null},\"dev2\":{\"target\":\"C6\",\"id\":\"dev2\",\"remoteTrackingBranchID\":null},\"badcommit\":{\"target\":\"C8\",\"id\":\"badcommit\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C2\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C1\"],\"id\":\"C4\"},\"C5\":{\"parents\":[\"C4\"],\"id\":\"C5\"},\"C6\":{\"parents\":[\"C5\"],\"id\":\"C6\"},\"C7\":{\"parents\":[\"C1\"],\"id\":\"C7\"},\"C8\":{\"parents\":[\"C7\"],\"id\":\"C8\"},\"C9\":{\"parents\":[\"C8\"],\"id\":\"C9\"}},\"tags\":{},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"}}}",
  "solutionCommand": "git reset c7;git rebase main dev2;git rebase dev2 dev1;git checkout main;git merge dev1;git cherry-pick c9;git push --force",
  "startTree": "{\"branches\":{\"main\":{\"target\":\"C9\",\"id\":\"main\",\"remoteTrackingBranchID\":\"o/main\"},\"dev1\":{\"target\":\"C3\",\"id\":\"dev1\",\"remoteTrackingBranchID\":\"o/dev1\"},\"dev2\":{\"target\":\"C6\",\"id\":\"dev2\",\"remoteTrackingBranchID\":\"o/dev2\"},\"badcommit\":{\"target\":\"C8\",\"id\":\"badcommit\",\"remoteTrackingBranchID\":\"o/badcommit\"},\"o/main\":{\"target\":\"C9\",\"id\":\"o/main\",\"remoteTrackingBranchID\":null},\"o/dev1\":{\"target\":\"C3\",\"id\":\"o/dev1\",\"remoteTrackingBranchID\":null},\"o/dev2\":{\"target\":\"C6\",\"id\":\"o/dev2\",\"remoteTrackingBranchID\":null},\"o/badcommit\":{\"target\":\"C8\",\"id\":\"o/badcommit\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C2\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C1\"],\"id\":\"C4\"},\"C5\":{\"parents\":[\"C4\"],\"id\":\"C5\"},\"C6\":{\"parents\":[\"C5\"],\"id\":\"C6\"},\"C7\":{\"parents\":[\"C1\"],\"id\":\"C7\"},\"C8\":{\"parents\":[\"C7\"],\"id\":\"C8\"},\"C9\":{\"parents\":[\"C8\"],\"id\":\"C9\"}},\"tags\":{},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"},\"originTree\":{\"branches\":{\"main\":{\"target\":\"C9\",\"id\":\"main\",\"remoteTrackingBranchID\":null},\"dev1\":{\"target\":\"C3\",\"id\":\"dev1\",\"remoteTrackingBranchID\":null},\"dev2\":{\"target\":\"C6\",\"id\":\"dev2\",\"remoteTrackingBranchID\":null},\"badcommit\":{\"target\":\"C8\",\"id\":\"badcommit\",\"remoteTrackingBranchID\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C2\"],\"id\":\"C3\"},\"C4\":{\"parents\":[\"C1\"],\"id\":\"C4\"},\"C5\":{\"parents\":[\"C4\"],\"id\":\"C5\"},\"C6\":{\"parents\":[\"C5\"],\"id\":\"C6\"},\"C7\":{\"parents\":[\"C1\"],\"id\":\"C7\"},\"C8\":{\"parents\":[\"C7\"],\"id\":\"C8\"},\"C9\":{\"parents\":[\"C8\"],\"id\":\"C9\"}},\"tags\":{},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"}}}",
  "name": {
    "en_US": "CSIT Challenge"
  },
  "hint": {
    "en_US": "you need to use 'git push --force' to override the history of the main branch that is already on remote"
  },
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "# CSIT Mini Challenge #1",
              "",
              "You have some development branches (firework & fountain) alongside your main branch, with a few bad commits in your main branch.",
              "",
              "The remote repository has already committed a mistake onto the main branch followed by a *correct* commit.",
              "",
              "### Orientation",
              "The left tree nodes are your 'working' tree, i.e. your local git",
              "",
              "The right tree nodes are your 'remote' git, i.e. GitHub/GitLab ",
              "",
              "",
              "## Objective",
              "Your goal is to merge/rebase the various `dev` branches with `main`, while removing the mistake `c8` commit from main remote branch, but also keep the correct commit `c9` after the aforementioned mistake.",
              "",
              "Make sure you finally push the changes to remote to reflect the correct git history.",
              "",
              "The expected order of commits in `main` are as follows.",
              "* `c0 > c1 > c7 > c4 > c5 > c6 > c2 > c3 > c9`",
              "* `c0 > c1 > c7` (main branch's base commits)",
              "* `c4 > c5 > c6` (dev2 branch's commits)",
              "* `c2 > c3` (dev 1 branch's commits)",
              "* `c9` (main branch's correct commits after mistake `c8`)",
              "",
              "## Tips",
              "use `objective` to bring up this dialog again",
              "",
              "use `show goal` to visualize what the end state should be, `hide goal` to get it out of your way",
              "",
              "use `reset` to bring you back to the starting point if you need it, use `undo` to remove your last action",
              "",
              "use `git help` to show what commands you can use",
              "",
              "All the best!",
              ""
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "## git rebase",
              "When you want to keep a particular order of commits above another branch, you use git rebase.",
              "",
              "Now i'm on branchB (annotated by astericks)",
              "Watch what happens when I execute rebase on branchA",
              "",
              ""
            ],
            "afterMarkdowns": [
              "## Rebase Complete",
              "Notice now that i've rebased commits of 'branchB' branch onto (after) 'branchA' with this command.",
              "",
              "## Rebase command param order matters!",
              "You can also achieve the same outcome when rebasing from branchA's perspective using `git checkout branchA` & `git rebase branchA branchB`",
              "",
              ""
            ],
            "command": "git rebase branchA",
            "beforeCommand": "git checkout -b branchA;git commit;git commit;git checkout main;git checkout -b branchB;git commit;git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "## git reset",
              "when you need to jump backwards on a particular branch to a previous commit",
              "",
              "Additionally, there is a 'soft' & 'hard' resets where the changes between current and the chosen reset point may return to unstaged changes depending on your reset option.",
              "",
              "But for this exercise, there is only 'hard' reset",
              "",
              "",
              ""
            ],
            "afterMarkdowns": [
              "## returning to a previous commit",
              "this means that you have jumped to an earlier point in your branch, but you still have access to the later commits, i.e. using `cherry-pick` to retrieve specific commits only",
              "",
              "",
              ""
            ],
            "command": "git reset c1",
            "beforeCommand": "git commit; git commit; git commit;"
          }
        }
      ]
    }
  }
}