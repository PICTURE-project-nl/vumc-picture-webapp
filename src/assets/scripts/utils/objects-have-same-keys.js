// Compare if 2 objects have the same keys

export const objectsHaveSameKeys = (objectA, objectB) => {
  let aKeys = Object.keys(objectA).sort()
  let bKeys = Object.keys(objectB).sort()
  return JSON.stringify(aKeys) === JSON.stringify(bKeys)
}
