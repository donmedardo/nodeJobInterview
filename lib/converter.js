const { json } = require("express");

const yaml = require('js-yaml');
const internal = {}
exports = module.exports = internal;

internal.FromYaml2JSON = function (data) {
  const result = JSON.parse(JSON.stringify(yaml.load(data), null, 2));
  return result;
}