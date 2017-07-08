var isInit = false;
var callback;
var answerType = "none";

function initializePage() {
    if(!isInit){
    var container = document.getElementsByClassName("container")[0];
    var descriptionContainer = document.createElement("div");
    descriptionContainer.className = "description-container";
    var correctionBox = document.createElement("div");
    correctionBox.className = "correction-container";
    var inputContainer = document.createElement("div");
    inputContainer.className = "input-container";
    container.appendChild(descriptionContainer);
    container.appendChild(inputContainer);
    container.appendChild(correctionBox);
    }
}
function setCallback(Callback) {
    callback = Callback;
}
function setDescriptions(descriptions) { // descriptions is an array of description objects containing a string and a image url
    var container = document.getElementsByClassName("description-container")[0];
    while(container.lastChild) { // remove all the current children
        container.removeChild(container.lastChild);
    }
    for(var i = 0; i < descriptions.length; i++) {
        var box = document.createElement("div");
        box.className = "description-box";
        if(descriptions[i].text != "") {
            var text = document.createElement("div");
            text.className = "description-text";
            var textNode = document.createTextNode(descriptions[i].text);
            text.appendChild(textNode);
            box.appendChild(text);
        }
        if(descriptions[i].url != "") {
            var image = document.createElement("div");
            image.className = "description-image"
            image.style.backgroundImage = "url(" + descriptions[i].url + ")"
            box.appendChild(image);
        }
        container.appendChild(box);
    }
}
function setInputboxes(numberOfBoxes) {
    answerType = "word";
    var container = document.getElementsByClassName("input-container")[0];
    while(container.lastChild) { // remove all the current children
        container.removeChild(container.lastChild);
    }
    var flexContainer = document.createElement("div");
    flexContainer.className = "input-flex-container";
    for(var i = 0; i < numberOfBoxes; i++) {
        var wrapper = document.createElement("div");
        wrapper.className = "input-box";
        var input = document.createElement("input");
        input.className = "the-input";
        input.addEventListener("keypress", function(event) { handleInputKeypress(event); });
        input.addEventListener("input", function(event) { handleInput(event); });
        input.addEventListener("focus", function(event) { addFocus(event.target.parentElement); });
        input.addEventListener("blur", function(event) { removeFocus(event.target.parentElement); });
        input.tabIndex = "1";
        wrapper.appendChild(input);
        flexContainer.appendChild(wrapper);
    }
    var submit = document.createElement("div");
    submit.className = "submit-button";
    submit.tabIndex = "1";
    submit.addEventListener("click", function() { handleSubmit(); });
    submit.addEventListener("focus", function(event) { addFocus(event.target); });
    submit.addEventListener("blur", function(event) { removeFocus(event.target); });
    submit.addEventListener("keypress", function(event) { handleSubmitKeypress(event); });
    submitText = document.createTextNode("Click here or press enter to submit");
    submit.appendChild(submitText);
    container.appendChild(flexContainer);
    container.appendChild(submit);
}
function setChoices(choices) {
    answerType = "choice";
    var container = document.getElementsByClassName("input-container")[0];
    while(container.lastChild) { // remove all the current children
        container.removeChild(container.lastChild);
    }
    var flexContainer = document.createElement("div");
    flexContainer.className = "input-flex-container";
    for(var i = 0; i < choices.length; i++) {
        var box = document.createElement("div");
        box.className = "choice-box";
        var checkbox = document.createElement("input");
        checkbox.className = "checkbox-input";
        checkbox.type = "checkbox";
        checkbox.tabIndex = "-1";
        box.tabIndex = "1";
        box.appendChild(checkbox);
        box.addEventListener("focus", function(event) { addFocus(event.target) });
        box.addEventListener("blur", function(event) { removeFocus(event.target) });
        box.addEventListener("click", function(event) { toggleChoiceState(event); });
        box.addEventListener("keypress", function(event) { handleChoiceKeypress(event); });
        if(choices[i].text != "") {
            var text = document.createElement("div");
            text.className = "choice-text";
            var textNode = document.createTextNode(choices[i].text);
            text.appendChild(textNode);
            box.appendChild(text);
        }
        if(choices[i].url != "") {
            var image = document.createElement("div");
            image.className = "choice-image"
            image.style.backgroundImage = "url(" + choices[i].url + ")"
            box.appendChild(image);
        }
        flexContainer.appendChild(box);
    }

    var submit = document.createElement("div");
    submit.className = "submit-button";
    submit.tabIndex = "1";
    submit.addEventListener("click", function() { handleSubmit(); });
    submit.addEventListener("keypress", function(event) { handleSubmitKeypress(event); })
    submit.addEventListener("focus", function(event) { addFocus(event.target); });
    submit.addEventListener("blur", function(event) { removeFocus(event.target); });
    submitText = document.createTextNode("Click here or press enter to submit");
    submit.appendChild(submitText);
    container.appendChild(flexContainer);
    container.appendChild(submit);
}
function setCorrectionString(correctionMessage) {
    var container = document.getElementsByClassName("correction-container")[0];
    while(container.lastChild) { // remove all the current children
        container.removeChild(container.lastChild);
    }
    if(correctionMessage != "") {
        var box = document.createElement("div");
        var text = document.createElement("div");
        text.className = "error-text";
        var textNode = document.createTextNode(correctionMessage);
        text.appendChild(textNode);
        box.appendChild(text);
        container.appendChild(box);
    }
}
function handleSubmitKeypress(event) {
    if(event.keyCode == 13) {
        handleSubmit();
    }
}
function handleSubmit() {
    if(answerType == "word") {
        handleWordSubmit();
    }
    if(answerType == "choice") {
        handleChoiceSubmit();
    }
    if(answerType == "none") {
        console.log("something weired happened")
    }
}
function handleInputKeypress(event) {
   if(event.keyCode == 13) {
        var element = event.target.parentElement;
        var wrappers = document.getElementsByClassName("input-flex-container")[0].children;
        var nextIndex = 0;
        while(wrappers[nextIndex] != element) {
            nextIndex++;
        }
        nextIndex++;
        while(nextIndex < wrappers.length && wrappers[nextIndex].classList.contains("correct-answer")) {
            nextIndex++;
        }
        if(nextIndex == wrappers.length) { // we are on the last element
            handleSubmit();
        } else {
            wrappers[nextIndex].lastChild.focus();
        }
    }
}
function handleChoiceKeypress(event) {
    if(event.keyCode == "13") {
        var element = event.target;
        var wrappers = document.getElementsByClassName("input-flex-container")[0].children;
        var nextIndex = 0;
        while(wrappers[nextIndex] != element) {
            nextIndex++;
        }
        nextIndex++;
        while(nextIndex < wrappers.length && wrappers[nextIndex].classList.contains("correct-answer")) {
            nextIndex++;
        }
        if(nextIndex == wrappers.length) { // we are on the last element
            handleSubmit();
        } else {
            wrappers[nextIndex].focus();
        }
    }
    if(event.keyCode == "32") {
        toggleChoiceState(event);
    }
}
function addFocus(element) {
    element.classList.add("focus-answer");
}
function removeFocus(element) {
    element.classList.remove("focus-answer");
}
function toggleChoiceState(event) {
    if(event.target.firstChild.checked) {
        event.target.firstChild.checked = false;
        event.target.classList.remove("marked-choice");
    } else {
        event.target.firstChild.checked = true;
        event.target.classList.add("marked-choice");
    }
}
function handleInput(event) {
    event.target.parentElement.classList.remove("incorrect-answer");
    event.target.parentElement.classList.remove("correct-answer");
    event.target.tabIndex = "1";
}
function handleChoiceSubmit() {
    var elements = document.getElementsByClassName("input-flex-container")[0].children;
    var answers = [];
    for(var i = 0; i < elements.length; i++) {
        answers.push(elements[i].firstChild.checked);
    }
    callback(answers);
}
function handleWordSubmit() {
    var elements = document.getElementsByClassName("input-flex-container")[0].children;
    var answers = [];
    for(var i = 0; i < elements.length; i++) {
        answers.push(elements[i].lastChild.value);
    }
    callback(answers);
}

function markAnswers(correctArray) {
    var elements = document.getElementsByClassName("input-flex-container")[0].children;
    if(elements.length != correctArray.length) {
        return console.log("Incorrect array length sent to markAnswers");
    }
    for(var i = 0; i < correctArray.length; i++) {
        if(correctArray[i]) {
            elements[i].classList.remove("incorrect-answer");
            elements[i].classList.add("correct-answer");
            elements[i].lastChild.tabIndex = "-1";
        } else {
            elements[i].classList.remove("correct-answer");
            elements[i].classList.add("incorrect-answer");
        }
    }
}
function focusFirstIncorrectInput() {
    if(answerType == "word") {
        document.getElementsByClassName("incorrect-answer")[0].lastChild.focus();
    }
    if(answerType == "choice") {
        document.getElementsByClassName("incorrect-answer")[0].focus();
    }
}
