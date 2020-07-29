const loadAddButtonComponent = function () {
  import("./components/add-button");
};

const loadItemComponent = function () {
  import("./components/item");
};

const loadListComponent = function () {
  import("./components/list");
};

const componentLoader = {
  addButton: loadAddButtonComponent,
  item: loadItemComponent,
  list: loadListComponent,
};

export default {
  componentLoader,
};
