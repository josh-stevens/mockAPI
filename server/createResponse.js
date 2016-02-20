var randomizer = function(key, value) {
  if (key !== "status" && typeof value === "number") {
    return Math.floor(Math.random() * 100);
  } else return value;
};

module.exports = function(exampleResponse) {
  return function() {
    return JSON.parse(JSON.stringify(exampleResponse, randomizer));
  };
};
