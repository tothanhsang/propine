function filterByProperty(array, prop, value) {
  let filtered = [];
  for (let i = 0; i < array.length; i++) {
    let obj = array[i];
    for (let key in obj) {
      if (typeof (obj[key] == "object")) {
        let item = obj[key];
        if (item[prop] == value) {
          filtered.push(item);
        }
      }
    }
  }
  return filtered;
}

module.exports = { filterByProperty };
