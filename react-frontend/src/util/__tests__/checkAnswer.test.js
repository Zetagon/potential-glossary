/*jslint esversion:6*/
'use strict';
import checkAnswer from '../checkAnswer';

function boilerplate(userInput, expected){
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
    let {foundMatch, newAnswer} = checkAnswer(answer, userInput);
    console.log(foundMatch);
    console.log(newAnswer.toString());
    expect(foundMatch).toEqual(expected);
    return newAnswer;
}

test('if correct input returns true', function(){
    boilerplate('hej', true);
});

test('if incorrect input returns false', function(){
    boilerplate('fel svar', false);
});

test('if correct input removes synonym from answer', function(){
    let newAnswer = boilerplate('hej', true);
    let result = checkAnswer(newAnswer,'hej').foundMatch;
    expect(result).toEqual(false);
});


