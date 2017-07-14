/*jslint esversion:6*/



/**
 * Find one element with a property text that matches {searching}
 * Warning! Not reusable
 * @param {[{text:string}]} ary - the array to search in
 * @param {string} searching - the string to search for
 * @returns {boolean} Return true if one match was found
 */
function findOneInAry(ary, searching){
    let foundMatch = false;
    ary.forEach((element)=>{
        if(foundMatch) return;
        if(element.text === searching ){
            foundMatch = true;
            return;
        }
    });
    if(foundMatch) return true;
    return false;
}


/**
 * Function description.
 * @param {Answer} answer - current answer that userInput should be matched against
 * @param {string} userInput - input from the user
 * @returns {{boolean, Answer}} returnedObject.foundMatch is true when userInput was correct. returnedObject.Answer is the new answer with the correct answer removed.
 */
function checkAnswer(answer, userInput){
    let foundMatch = false;
    let newAnswer = {};
        newAnswer.synonyms = answer.synonyms.filter((synonym) =>{
        if(foundMatch) return true;
        let localFoundMatch = findOneInAry(synonym.alternatives,  userInput);
        // synonym.alternatives.forEach((alternative,index)=>{
        //     if(foundMatch) return;
        //     if(alternative.text === userInput ){
        //         foundMatch = true;
        //         return;
        //     }
        // });
        if(localFoundMatch){
            foundMatch = true;
            return false;
        }
        return true;
    });
    return {foundMatch, newAnswer};
}

export default checkAnswer;
