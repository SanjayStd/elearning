const quizzes = {
    html: {
        video: "https://www.youtube.com/embed/UB1O30fR-EE",
        questions: [
            { question: "What does HTML stand for?", options: ["HyperText Markup Language", "HighText Machine Language", "HyperTool Multi Language", "None of the above"], answer: "HyperText Markup Language" },
        { question: "Which HTML tag is used to define an internal style sheet?", options: ["<css>", "<script>", "<style>", "<link>"], answer: "<style>" },
        { question: "Which tag is used to create a hyperlink in HTML?", options: ["<a>", "<link>", "<href>", "<url>"], answer: "<a>" },
        { question: "What is the correct HTML tag for inserting a line break?", options: ["<br>", "<lb>", "<break>", "<newline>"], answer: "<br>" },
        { question: "Which attribute specifies an alternate text for an image?", options: ["title", "alt", "src", "href"], answer: "alt" },
        { question: "Which tag is used to create an ordered list?", options: ["<ol>", "<ul>", "<li>", "<list>"], answer: "<ol>" },
        { question: "How do you create a table in HTML?", options: ["<table>", "<tbl>", "<tabel>", "<tab>"], answer: "<table>" },
        { question: "What is the correct way to comment in HTML?", options: ["// Comment", "/* Comment */", "<!-- Comment -->", "## Comment ##"], answer: "<!-- Comment -->" },
        { question: "Which input type allows users to select multiple options?", options: ["checkbox", "radio", "text", "submit"], answer: "checkbox" },
        { question: "What is the default file extension of an HTML file?", options: [".html", ".htm", "Both A and B", ".txt"], answer: "Both A and B" }
    ],
        
    },
    css: {
        video: "https://www.youtube.com/embed/yfoY53QXEnI",
        description: "This HTML course covers the basics of HTML, including structure, tags, and attributes used to create web pages.",
        questions: [
            { question: "What does CSS stand for?", options: ["Creative Style Sheets", "Cascading Style Sheets", "Colorful Style Sheets", "Computer Style Sheets"], answer: "Cascading Style Sheets" },
        { question: "Which property is used to change text color?", options: ["text-color", "fgcolor", "color", "font-color"], answer: "color" },
        { question: "How do you make a list without bullets?", options: ["list-style-type: none;", "bullet: none;", "text-decoration: none;", "list: none;"], answer: "list-style-type: none;" },
        { question: "How do you apply CSS to a specific element with ID header?", options: [".header {}", "header {}", "#header {}", "*header {}"], answer: "#header {}" },
        { question: "Which property controls the background color of an element?", options: ["color", "bgcolor", "background-color", "bg-color"], answer: "background-color" },
        { question: "How do you center a block element horizontally?", options: ["align: center;", "margin: auto;", "center: true;", "padding: center;"], answer: "margin: auto;" },
        { question: "What is the default position of an element?", options: ["fixed", "absolute", "relative", "static"], answer: "static" },
        { question: "Which property changes the font of an element?", options: ["font-weight", "font-family", "font-style", "text-style"], answer: "font-family" },
        { question: "Which pseudo-class is used to style an element when the mouse hovers over it?", options: [":hover", ":focus", ":active", ":mouse"], answer: ":hover" },
        { question: "How do you apply styles to all <p> elements inside <div>?", options: ["div.p {}", "p div {}", "div > p {}", "div p {}"], answer: "div p {}" } ]
    },
    javascript: {
        video: "https://www.youtube.com/embed/PkZNo7MFNFg",
        questions: [
            { question: "What is JavaScript used for?", options: ["Styling web pages", "Adding interactivity to web pages", "Structuring web pages", "Creating databases"], answer: "Adding interactivity to web pages" },
        { question: "How do you declare a variable in JavaScript?", options: ["var x;", "let x;", "const x;", "All of the above"], answer: "All of the above" },
        { question: "Which symbol is used for comments in JavaScript?", options: ["//", "<!-- -->", "#", "/* */"], answer: ["//", "/* */"] },
        { question: "How do you write 'Hello World' in an alert box?", options: ["msg('Hello World');", "alert('Hello World');", "alertBox('Hello World');", "msgBox('Hello World');"], answer: "alert('Hello World');" },
        { question: "What is the correct syntax for a function in JavaScript?", options: ["function myFunction() {}", "def myFunction():", "myFunction = function() {}", "Both A & C"], answer: "Both A & C" },
        { question: "Which operator is used for strict comparison in JavaScript?", options: ["==", "===", "=", "!="], answer: "===" },
        { question: "How do you find the length of a string?", options: ["str.length()", "length(str)", "str.length", "size(str)"], answer: "str.length" },
        { question: "Which loop executes at least once even if the condition is false?", options: ["for", "while", "do...while", "foreach"], answer: "do...while" },
        { question: "What keyword is used to declare a constant variable?", options: ["var", "let", "const", "constant"], answer: "const" },
        { question: "How do you check if a variable x is undefined?", options: ["typeof x === 'undefined'", "x === undefined", "x == null", "Both A & B"], answer: "Both A & B" }]
    }
};

let currentCourse = "html";
let currentQuestionIndex = 0;
let score = 0;

const quizContainer = document.getElementById("quiz-section");
const practiceButton = document.getElementById("practice-btn");
const videoContainer = document.getElementById("video-section");
const courseTitle = document.getElementById("course-title");



// Load selected course
function loadCourse(course) {
    currentCourse = course;
    currentQuestionIndex = 0;
    score = 0;


    courseTitle.textContent = `Course: ${course.toUpperCase()}`;
    videoContainer.innerHTML = `<iframe src="${quizzes[course].video}" frameborder="0" allowfullscreen></iframe>`;
    
    quizContainer.classList.add("hidden");
    practiceButton.classList.remove("hidden");
}

// Start quiz
function startQuiz() {
    quizContainer.classList.remove("hidden");
    practiceButton.classList.add("hidden");

    displayQuestion();
}

// Display question
function displayQuestion() {
    quizContainer.innerHTML = "";
    const questionData = quizzes[currentCourse].questions[currentQuestionIndex];

    if (!questionData) {
        showFinalScore();
        return;
    }

    const questionElement = document.createElement("p");
    questionElement.textContent = questionData.question;
    quizContainer.appendChild(questionElement);

    questionData.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.addEventListener("click", () => checkAnswer(button, option, questionData.answer));
        quizContainer.appendChild(button);
    });
}

// Check answer and move to next question
function checkAnswer(button, selectedOption, correctAnswer) {
    const allButtons = quizContainer.querySelectorAll("button");
    allButtons.forEach(btn => btn.disabled = true);

    if (selectedOption === correctAnswer || (Array.isArray(correctAnswer) && correctAnswer.includes(selectedOption))) {
        button.classList.add("correct");
        score++;
    } else {
        button.classList.add("wrong");
    }

    setTimeout(() => {
        currentQuestionIndex++;
        displayQuestion();
    }, 1000);
}

// Show final score
function showFinalScore() {
    quizContainer.innerHTML = `<h3>Quiz Completed!</h3><p>Your Score: ${score} / ${quizzes[currentCourse].questions.length}</p>`;
}

// Event listener for "Practice Quiz" button
practiceButton.addEventListener("click", startQuiz);


