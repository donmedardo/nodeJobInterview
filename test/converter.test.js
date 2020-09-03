'use strict';

const { expect } = require('@hapi/code');
const Lab = require('@hapi/lab');
const file = require('../lib/file');
const converter = require('../lib/converter');
const { describe, it, before } = exports.lab = Lab.script();
let data = null;
let dataJson = null;

describe('working with the string information', () => {

  before(() => {
    data = file.LoadFromLocal();
  });

  it('should converted from YAML to JSON', () => {
    dataJson = converter.FromYaml2JSON(data);
    expect(dataJson instanceof Array).to.be.an.true();
  });

  it('should return some javascript object inside of an array', () => {
    expect(dataJson[0]).to.be.an.object();
  });
});

describe('working with data structure', () => {
  it('should have a standarized basic structure in object as a first level', () => {
    /*
    basic structure
    [{
      kind: 'expected A',
      spec: [{
        name: 'name',
        description: 'description',
        key: 'key',
        value: 'value',
        allowedEmails: [
          "email1@email1.com",
          "email2@email2.com"
        ]
      }]
    }]
    */
    dataJson.forEach(level1 => {
      expect(level1.kind).not.to.be.undefined()
      expect(level1.spec).not.to.be.undefined()
    })
  });

  it('should have a standarized basic spec structure in each first level object', () => {
    dataJson.forEach(level1 => {
      level1.spec.forEach(level2 => {
        expect(level2.name).not.to.be.undefined()
        expect(level2.description).not.to.be.undefined()
        expect(level2.key).not.to.be.undefined()
        expect(level2.value).not.to.be.undefined()
        expect(level2.allowedEmails).not.to.be.undefined()
      })
    })
  });
});