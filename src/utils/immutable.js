export const insertItemInList = (list = [], position = -1, newItem = {}) =>
  position !== -1
    ? [
        ...list.slice(0, position),
        newItem,
        ...list.slice(position, list.length),
      ]
    : list;

export const removeItemInList = (list = [], condition = (item) => true) =>
  list.filter(condition);

export const updateObject = (oldObject = {}, newValues = {}) => ({
  ...oldObject,
  newValues,
});

export const updateItemInList = (
  list = [],
  key,
  value,
  updateItemCallback = (item) => item
) =>
  list.map((item) => {
    if (!item.hasOwnProperty(key) || item[key] !== value) {
      return item;
    }
    return updateItemCallback(item);
  });
