/*jslint node: true*/
/*jslint esversion: 6*/
'use strict';

/*
 * @param pInput input from the user
 *
 * @return the index of the synonym that matched pInput, -1 if otherwise
 *
 * Check if pInput is matching any of the synonyms
 */
function checkMatch(pInput, answer) {
    for (let x = 0; x < answer.synonyms.length; x++) {
        for(let y = 0; y < answer.synonyms[x].alternatives.length; y++){
            if ( pInput == answer.synonyms[x].alternatives[y].text){
                return x;
            }
        }
    }
    return -1;
}
function checkMatchBoolean(pInput, answer) {
    if ( checkMatch(pInput, answer) > -1 ) {
        return true;
    }
    return false;
}

module.exports = {checkMatchBoolean, checkMatch};
