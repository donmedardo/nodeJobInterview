'use strict';

const { expect } = require('@hapi/code');
const Lab = require('@hapi/lab');
const filter = require('../lib/filter');

const { describe, it } = exports.lab = Lab.script();
let dataJson = null;

describe('data filter test', () => {

  it('should return an specific data structure filtered by the email usuarioA@gmail.com', () => {
    const expected = [
      {
        kind: 'service A',
        spec: [
          {
            name: 'keyServA1',
            description: 'credenciales del servicio A',
            key: 'user',
            value: 'password'
          },
          {
            name: 'keyServA2',
            description: 'credenciales del servicio A',
            key: 'user',
            value: 'password'
          },
          {
            name: 'keyServA3',
            description: 'credenciales del servicio A',
            key: 'user',
            value: 'password'
          }
        ]
      },
      {
        kind: 'service B',
        name: 'keyServ B',
        description: 'credenciales del servicio B',
        key: 'user',
        value: 'password'
      }
    ];

    const actual = filter.ByEmail(dataJson);
    expect(expected).to.equal(actual)
  })
})