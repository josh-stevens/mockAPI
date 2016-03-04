var randomizer = function(key, value) {
  if (key !== "status" && typeof value === "number" || value === "0") {
    return Math.floor(Math.random() * 10000);
  } else return value;
};

module.exports = function(exampleResponse) {
  return function() {
    return JSON.parse(JSON.stringify(exampleResponse, randomizer));
  };
};
