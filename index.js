var enter = document.getElementById('answer_button')

var aIn = document.getElementById('answer_input')

var popup = document.getElementById('popHold')

var input = document.getElementById('User_Input')

var submit = document.getElementById('submit')

var container = document.getElementById('container')

async function addQA(question, answer){
    return await firebase.database().ref('QA/' + question).set(answer)
}

async function getAnswerFromDatabase(question){
    return await firebase.database().ref('QA/' + question).once('value')
}

function drawMessages(){
    getAnswerFromDatabase(input.value.toLowerCase()).then(snapshot => {
        var answer = snapshot.val()
        if(answer === undefined || answer === null){
            unknownAnswer()
        }else {
            container.innerHTML += "<div class='Chatbot_Answer'>" + answer + "</div>"
        }
    });
}

function addMessage(){
    container.innerHTML += "<div class='User_Reply'>" + input.value + "</div>"

    drawMessages()
}

function getAnswer(){
    var ask = aIn.value

    addQA(input.value.toLowerCase(), ask);

    if(ask !== null){
        container.innerHTML += "<div class='Chatbot_Answer'>Added to Database</div>"
        container.innerHTML += "<div class='Chatbot_Answer'>" + ask + "</div>"
    }

    popup.style.top = '-37%'
}


function unknownAnswer(){
    popup.style.top = '0%'
    aIn.value = ""
}

submit.addEventListener("click", addMessage);

enter.addEventListener("click", getAnswer);
