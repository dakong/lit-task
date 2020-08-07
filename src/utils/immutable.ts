export function insertItemInList<T>(list: T[], newItem: T, position = -1) {
  return position !== -1
    ? [
        ...list.slice(0, position),
        newItem,
        ...list.slice(position, list.length),
      ]
    : list;
}

export function removeItemInList<T>(
  list: T[],
  condition: (item: T) => boolean
) {
  return list.filter(condition);
}

export function merge(oldObject = {}, newValues = {}) {
  return {
    ...oldObject,
    newValues,
  };
}

export function updateItemInList<T>(
  list: T[],
  condition: (item: T) => boolean,
  updateItemCallback: (item: T) => T
) {
  return list.map((item: any) =>
    condition(item) ? updateItemCallback(item) : item
  );
}
