const fs = require('fs');
const path = require('path');
const internal = {}
exports = module.exports = internal;
const converter = require('./converter');

internal.LoadFromLocal = function () {
  const absoultePaht = path.resolve(__dirname, '../')
  const data = fs.readFileSync(`${absoultePaht}/data/grupo1/datos.yaml`, 'utf8');
  const data2 = fs.readFileSync(`${absoultePaht}/data/grupo2/datos.yaml`, 'utf8');

  const dataJSON = converter.FromYaml2JSON(data)
  const dataJSON2 = converter.FromYaml2JSON(data2)
  return dataJSON.concat(dataJSON2) ;
}