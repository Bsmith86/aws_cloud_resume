'use strict';

import { putFunction } from '../../app.mjs';
import { expect } from 'chai';
var event, context;

describe('Tests index', function () {
    it('verifies successful response', async () => {
        const result = await putFunction(event, context);

        expect(result).to.be.an('object');
        expect(result.statusCode).to.equal(200);
        expect(result.body).to.be.a('string');

        let response = JSON.parse(result.body);

        expect(response).to.be.an('object');
        expect(response.count).to.be.a('number'); // Ensure count is a number
    });
});
