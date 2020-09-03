'use strict';

const { expect } = require('@hapi/code');
const Lab = require('@hapi/lab');
const file = require('../lib/file');

const { describe, it, before } = exports.lab = Lab.script();
let data = null;
let dataJson = null;

describe('working with local files', () => {
  it('should return a string when a local YAML file is loaded', () => {
    const data = file.LoadFromLocal();
    expect(data).to.be.a.string();
  });
});