const quizData = [
    {
      question: "Two point charges +4q and +q are placed 30 cm apart. At what point on the line joining them the electric field is zero?",
      answers: ["20 cm from the charge 4q", "15 cm from the charge q", "7.5 cm from the charge q", "5 cm from the charge q"],
      correctAnswer: 0,
    },
    {
        question: "An object is weightless when it is:",
        answers: ["In motion", "Being accelerated", "In freefall", "Stationary"],
        correctAnswer: 2,
    },
    {
        question: "What determines the maximum height of an object following a parabolic trajectory?",
        answers: ["Initial speed", "Angle of launch", "Mass of the object", "Both a and b"],
        correctAnswer: 3,
    },
    {
        question: "Shear velocity is a concept most relevant to which field?",
        answers: ["Aerodynamics", "Thermodynamics", "Electromagnetism", "Quantem mechanics"],
        correctAnswer: 0,
    },
    {
        question: "What does the Continuity Equation describe?",
        answers: ["A mass entering a system","A mass leaving a system","Fluid flow rate","Mass conservation"],
        correctAnswer: 3,
    }
  ];
  
let currentQuestion = 0;
let score = 0;
let timer;
  
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const timerEl = document.getElementById("timer");
const nextBtn = document.getElementById("next-btn");
  
function displayQuestion()
{
    startTimer();
    nextBtn.disabled = true;
    const questionblock = quizData[currentQuestion];
    questionEl.textContent = questionblock.question;
  
    answersEl.innerHTML = "";
    questionblock.answers.forEach((answer, index) => {
      const button = document.createElement("button");
      button.textContent = answer;
      button.addEventListener("click", () => checkAnswer(index));
      answersEl.appendChild(button);
    });
    if (currentQuestion===quizData.length-1) {
        nextBtn.textContent = "Submit Quiz"
        
    }
    
}
  
function checkAnswer(selectedIdx) {
    const question = quizData[currentQuestion];
    const correctAnswer = question.correctAnswer;
  
    let feedbackClass;
    if (selectedIdx === correctAnswer) {
      feedbackClass = "correct";
      score++;
    } else {
      feedbackClass = "wrong";
    }
    answersEl.childNodes.forEach((button, index) => {
        if (selectedIdx === index) {
          button.style.backgroundColor = feedbackClass === "correct" ? "lightgreen" : "red";
        }
        button.disabled = true;
    });  
   
    nextBtn.disabled = false;
    nextBtn.style.display = "block";
}
  
function nextQuestion() {
    currentQuestion++;
  
    // Check if all questions answered
    if (currentQuestion === quizData.length) {
      showResults();

    } else {
      displayQuestion();
    }
  }
  nextBtn.addEventListener("click", nextQuestion); // Attach click event to button

  function showResults() {
    questionEl.textContent = `Your score is: ${score}/${currentQuestion}`
    answersEl.innerHTML=""
    nextBtn.style.display = "none";
    timerEl.innerHTML=""
  }

  function startTimer() {
    let timeLeft = 20; // Adjust for desired timer duration (seconds)
    timerEl.textContent = `Time Left: ${timeLeft}`;
    clearInterval(timer);
    timer = setInterval(() => {
      timeLeft--;
      timerEl.textContent = `Time Left: ${timeLeft}`;
      if (timeLeft < 0) {
        timerEl.textContent =`Time Out`;
        clearInterval(timer);
        answersEl.childNodes.forEach((button) => {
            button.disabled=true;
        })
        nextBtn.disabled = false
      }
    }, 1000);

    answersEl.addEventListener("click",()=>{
        clearInterval(timer)
    })

    }
  
  // Initial question display
  displayQuestion();