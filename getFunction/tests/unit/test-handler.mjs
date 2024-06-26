'use strict';

import { getFunction } from '../../app.mjs';
import { expect } from 'chai';
var event, context;

describe('Tests index', function () {
    it('verifies successful response', async () => {
        const result = await getFunction(event, context);

        expect(result).to.be.an('object');
        expect(result.statusCode).to.equal(200);
        expect(result.body).to.be.a('string');

        let response = JSON.parse(result.body);

        expect(response).to.be.an('object');
        expect(response.visitors).to.be.a('number'); // Ensure visitors is a number
    });
});

