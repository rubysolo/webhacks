/*

Default releases to main branch

*/

function find(selector) {
  return findAll(selector)[0];
}

function findAll(selector) {
  return document.querySelectorAll(selector);
}

var defaultReleaseBranches = ["main", "master"];

function setBranch() {
  // click on the SelectMenu-item that contains the first found value from defaultReleaseBranches
  findAll(".SelectMenu-item [data-menu-button-text]").forEach(function(n) {
    if (defaultReleaseBranches.includes(n.textContent)) {
      n.click();
      return;
    }
  })
};

setBranch();
