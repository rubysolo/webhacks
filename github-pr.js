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
  var targetBranchEl = find(".commit-ref");

  if (targetBranchEl) {
    var targetBranch = targetBranchEl.textContent;

    if (noSquashBranches.includes(targetBranch)) {
      // no squashing here, folks.

      // set the selection to "merge"
      // this should match the normal merge button or the auto-merge button
      var selectMerge = find(".select-menu-merge-method button[value=merge]")
      if (selectMerge) {
        selectMerge.click()

        // nuke the "squash" button off the face of the planet
        find(".select-menu-merge-method button[value=squash]").remove()
      } else {
        // probably checks are still running, so the UI to select the merge type is disabled.
        // this is a potential pitfall, because GitHub will enable the UI once checks are complete,
        // and it will probably default to the "squash" method, if that's the repo default.
        //
        // to safeguard against this, we overwrite the whole merge button section with a message
        // asking the user to refresh after a bit.
        var mergeMessage = find(".merge-message")
        if (mergeMessage) {
          mergeMessage.innerHTML = "Button removed for your protection.  Please refresh when checks are complete."
          mergeMessage.style.color = "red"
        }
      }
    }
  }
};

// Give GitHub JS a chance to do its thing.  Don't click too fast!
setTimeout(noSquashies, 1500);
