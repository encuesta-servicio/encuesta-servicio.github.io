const questions = [
    {
        question: "¿Es la primera vez que nos visita?",
        answers: [
            { text: "Si", correct: false},
            { text: "No", correct: false}
        ]
    },
    {
        question: "¿Que tan satisfecho esta con servicio brindado esta noche?",
        answers: [
            { text: "Muy satisfecho", correct: false},
            { text: "Satisfecho", correct: false},
            { text: "Puede mejorar", correct: false},
            { text: "Insatisfecho", correct: false}
        ]
    },
    {
        question: "¿Cual es la probabilidad de que vuelva a visitarnos?",
        answers: [
            { text: "Muy probable", correct: false},
            { text: "Probable", correct: false},
            { text: "Poco probable", correct: false},
            { text: "Nada probable", correct: false}
        ]
    },
    {
        question: "¿Disfruto la convivencia con su acompañante?",
        answers: [
            { text: "Si", correct: false},
            { text: "No", correct: false},
        ]
    },
    {
        question: "¿Cual es la probabilidad de que hable sobre su experiencia con sus conocidos?",
        answers: [
            { text: "Recomendaré este lugar", correct: false},
            { text: "Probablemente", correct: false},
            { text: "Poco probable", correct: false},
            { text: "Nada probable", correct: false}
        ]
    },
    {
        question: "Finalmente... Ana Ximena Rochin Espinoza <br><br> ¿Puedo ser tu novio?",
        answers: [
            { text: "Sip ❤️", correct: false},
            { text: "Nop 💔", correct: true},
        ]
    },
];

const questionElement = document.getElementById("question"); 
const answerButtons = document.getElementById("answer-buttons"); 
const nextButton = document.getElementById("next-btn"); 

let currentQuestionIndex = 0;
let desicion = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    desicion = 0;
    nextButton.innerHTML = "Next";
    showQuestion(); 
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    
    
    if(isCorrect){
        selectedBtn.classList.add("incorrect");
        desicion++;
    }else{
        selectedBtn.classList.add("correct");
    }

    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "false"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    if(desicion > 0){
        questionElement.innerHTML = "Ah bueno, tu pagas la cuenta";
        answerButtons.innerHTML = "<br><br><br>"
        nextButton.innerHTML = "Adios";
        nextButton.style.display = "block";
    }else{
        questionElement.innerHTML = "Me gustas muchito :3";
        answerButtons.innerHTML = "<br> <img src = 'mename.JPG' width='520' class='center'> <br>";
        nextButton.innerHTML = "FIN";
        nextButton.style.display = "block";
    }
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", () =>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz(); 