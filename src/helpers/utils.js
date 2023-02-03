/**
 * Get sample data in array
 * @param {*} items 
 * @returns 
 */
exports.sample = (items) => {
  return items[Math.floor(Math.random()*items.length)];
}