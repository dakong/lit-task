export const insertItemInList = (list = [], position = -1, newItem = {}) =>
  position !== -1
    ? [
        ...list.slice(0, position),
        newItem,
        ...list.slice(position, list.length),
      ]
    : list;

export const removeItemInList = (
  list = [],
  condition: (item: any) => boolean
) => list.filter(condition);

export const updateObject = (oldObject = {}, newValues = {}) => ({
  ...oldObject,
  newValues,
});

export const updateItemInList = (
  list = [],
  condition: (item: any) => boolean,
  updateItemCallback: (item: any) => any
) =>
  list.map((item: any) => {
    if (condition(item)) {
      return updateItemCallback(item);
    }
    return item;
  });
