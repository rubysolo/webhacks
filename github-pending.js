/*

Generate a compare URL for the latest release vs the default branch

*/

function buildCompareLink() {
  var latestLabel = document.querySelector("[title='Label: Latest']");

  if (latestLabel) {
     var latestTag = latestLabel.closest('a').href.split("/").pop();
     var defaultBranch = document.querySelector(".js-branch-select-menu [data-menu-button]").innerHTML;
     var baseUrl = window.location.href;
     var compareUrl = baseUrl + "/compare/" + latestTag + "..." + defaultBranch;

     var res = document.evaluate("//*[contains(text(), 'Releases')]", document);
     var node = res.iterateNext();
     var cell = node.closest('.BorderGrid-cell');

     var link = document.createElement('a');
     link.href = compareUrl;
     link.innerHTML = "+ Queued for release";
     cell.appendChild(link);
  }
};

buildCompareLink();
