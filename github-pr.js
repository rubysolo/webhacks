/*

Don't allow "Squash and Merge" on PRs to master

*/

function find(selector) {
  return findAll(selector)[0];
}

function findAll(selector) {
  return document.querySelectorAll(selector);
}

var noSquashBranches = ["main", "master"];

function noSquashies() {
  // are we on a no-squash branch?

  // There are 4 commit-ref elements on a PR page in the "`someone` wants to merge X commits into `target` from
  // `source`" section. (One is just under the PR title, the other is a sticky header that shows up if you scroll
  // down the page). The target happens to be the first one, so we can just find this selector and go.
  var targetBranch = find(".commit-ref").textContent;

  if (noSquashBranches.includes(targetBranch)) {
    // no squashing here, folks.

    // set the selection to "merge"
    find(".select-menu-merge-method button[value=merge]").click()

    // nuke the "squash" button off the face of the planet
    find(".select-menu-merge-method button[value=squash]").remove()
  }
};

noSquashies();
