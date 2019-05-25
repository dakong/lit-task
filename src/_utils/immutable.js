export const insertItemInList = () => {};

export const removeItemInList = (list = [], condition = () => true) => list.filter(condition);

export const updateObject = (oldObject = {}, newValues = {}) => ({ ...oldObject, newValues });

export const updateItemInList = (list = [], key, value, updateItemCallback = (item) => item) => (
  list.map(item => {
    if (!item.hasOwnProperty(key) || item[key] !== value)
      return item;
    return updateItemCallback(item);
  })
);

