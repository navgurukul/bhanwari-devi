// This can still cause collisions if the namespace can contain --
const getKeyName = (namespace, key) => namespace + "--" + key;

const saveObjectState = (namespace, key, data) => {
  const lsKey = getKeyName(namespace, key);
  localStorage.setItem(lsKey, JSON.stringify(data));
};

const getObjectState = (namespace, key) => {
  const lsKey = getKeyName(namespace, key);
  return JSON.parse(localStorage.getItem(lsKey));
};

const setItemInState = (namespace, key, itemKey, value) => {
  const data = getObjectState(namespace, key);
  if (data[itemKey] !== value) {
    // don't set again if same value
    data[itemKey] = value;
    saveObjectState(namespace, key, data);
  }
};

module.exports = { saveObjectState, getObjectState, setItemInState };
