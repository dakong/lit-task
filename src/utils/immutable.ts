export const insertItemInList = (list = [], position = -1, newItem = {}) =>
  position !== -1
    ? [
        ...list.slice(0, position),
        newItem,
        ...list.slice(position, list.length),
      ]
    : list;

export const removeItemInList = (list = [], condition = () => true) =>
  list.filter(condition);

export const updateObject = (oldObject = {}, newValues = {}) => ({
  ...oldObject,
  newValues,
});

export const updateItemInList = (
  list = [],
  key: string,
  value: any,
  updateItemCallback = (item: any) => item
) =>
  list.map((item: any) => {
    if (!item.hasOwnProperty(key) || item[key] !== value) {
      return item;
    }
    return updateItemCallback(item);
  });
