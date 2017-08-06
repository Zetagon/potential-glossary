/*jslint node: true*/
/*jslint esversion: 6*/
'use strict';


let checkMatch = require('../util/checkAnswer.js').checkMatch;
let assert = require('assert')

describe('checkMatch',  () => {
    it('', ()=> {
        let answer = {
            synonyms: [
                {
                    alternatives: [
                        {text: "hej"},
                        {text: "hejsan"}
                    ]
                },
                {
                    alternatives: [
                        {text: "god kväll"},
                        {text: "god afton"}
                    ]
                }
            ]
        };

        let wrong = 'no';
        let correct = 'hej';

        assert.equal(checkMatch(wrong, answer), -1);
        assert.equal(checkMatch(correct, answer), 0);
    })
})
