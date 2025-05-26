(function() {
    // Ensure DOM is ready (though script is loaded after body, good practice)
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeQuizApp);
    } else {
        initializeQuizApp();
    }

    // Quiz Data
    const quizData = [
        {
            question: "What does HTML stand for?",
            options: ["Hyper Trainer Marking Language", "Hyper Text Marketing Language", "Hyper Text Markup Language", "Hyperlink and Text Markup Language"],
            correctAnswer: "Hyper Text Markup Language"
        },
        {
            question: "Which CSS property is used to change the text color of an element?",
            options: ["font-color", "text-color", "color", "font-style"],
            correctAnswer: "color"
        },
        {
            question: "What is the purpose of JavaScript?",
            options: ["To style web pages", "To structure web content", "To add interactivity to web pages", "To manage databases"],
            correctAnswer: "To add interactivity to web pages"
        },
        {
            question: "Which of the following is a JavaScript framework/library?",
            options: ["Laravel", "Django", "React", "Spring"],
            correctAnswer: "React"
        },
        {
            question: "What does 'DOM' stand for?",
            options: ["Document Object Model", "Data Object Model", "Display Object Management", "Digital Ordinance Method"],
            correctAnswer: "Document Object Model"
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    let questionsAnswered = false; // To prevent multiple clicks on options

    // DOM Elements (will be created and assigned)
    let quizAppContainer, titleElement, questionContainer, questionTextElement,
        optionsContainer, feedbackTextElement, navigationContainer,
        nextButton, scoreContainer;

    function initializeQuizApp() {
        createBaseHTMLStructure();
        loadQuestion();
    }

    function createBaseHTMLStructure() {
        quizAppContainer = document.createElement('div');
        quizAppContainer.id = 'quiz-app-container';

        titleElement = document.createElement('h1');
        titleElement.id = 'quiz-title';
        titleElement.textContent = 'Web Dev Training Quiz';
        quizAppContainer.appendChild(titleElement);

        questionContainer = document.createElement('div');
        questionContainer.id = 'question-container';
        quizAppContainer.appendChild(questionContainer);

        questionTextElement = document.createElement('p');
        questionTextElement.id = 'question-text';
        questionContainer.appendChild(questionTextElement);

        optionsContainer = document.createElement('div');
        optionsContainer.id = 'options-container';
        questionContainer.appendChild(optionsContainer);

        feedbackTextElement = document.createElement('p');
        feedbackTextElement.id = 'feedback-text';
        quizAppContainer.appendChild(feedbackTextElement);

        navigationContainer = document.createElement('div');
        navigationContainer.id = 'navigation-container';
        quizAppContainer.appendChild(navigationContainer);

        nextButton = document.createElement('button');
        nextButton.id = 'next-question-btn';
        nextButton.textContent = 'Next Question';
        nextButton.addEventListener('click', handleNextButton);
        nextButton.disabled = true; // Disabled until an answer is selected
        navigationContainer.appendChild(nextButton);

        scoreContainer = document.createElement('div');
        scoreContainer.id = 'score-container';
        scoreContainer.classList.add('hidden'); // Initially hidden
        quizAppContainer.appendChild(scoreContainer);

        document.body.appendChild(quizAppContainer);
    }

    function loadQuestion() {
        questionsAnswered = false;
        feedbackTextElement.textContent = '';
        optionsContainer.innerHTML = ''; // Clear previous options

        if (currentQuestionIndex < quizData.length) {
            const currentQuestion = quizData[currentQuestionIndex];
            questionTextElement.textContent = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

            currentQuestion.options.forEach(option => {
                const button = document.createElement('button');
                button.textContent = option;
                button.classList.add('option-btn');
                button.addEventListener('click', () => selectAnswer(button, option, currentQuestion.correctAnswer));
                optionsContainer.appendChild(button);
            });

            nextButton.disabled = true;
            nextButton.textContent = 'Next Question';
            questionContainer.classList.remove('hidden');
            scoreContainer.classList.add('hidden');

            if (currentQuestionIndex === quizData.length - 1) {
                nextButton.textContent = 'Show Results';
            }

        } else {
            showResults();
        }
    }

    function selectAnswer(buttonEl, selectedOption, correctAnswer) {
        if (questionsAnswered) return; // Prevent re-answering
        questionsAnswered = true;

        const allOptionButtons = optionsContainer.querySelectorAll('.option-btn');
        allOptionButtons.forEach(btn => {
            btn.disabled = true; // Disable all options
            if (btn.textContent === correctAnswer) {
                btn.classList.add('correct');
            }
        });

        if (selectedOption === correctAnswer) {
            score++;
            buttonEl.classList.add('correct'); // Already handled if it's the correct one, but good for clarity
            feedbackTextElement.textContent = 'Correct!';
            feedbackTextElement.style.color = '#28a745';
        } else {
            buttonEl.classList.add('incorrect');
            feedbackTextElement.textContent = `Incorrect. The correct answer was: ${correctAnswer}`;
            feedbackTextElement.style.color = '#dc3545';
        }
        nextButton.disabled = false;
    }

    function handleNextButton() {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            loadQuestion();
        } else if (nextButton.textContent === 'Show Results') {
            showResults();
        } else if (nextButton.textContent === 'Restart Quiz') {
            restartQuiz();
        }
    }

    function showResults() {
        questionContainer.classList.add('hidden');
        feedbackTextElement.textContent = '';
        optionsContainer.innerHTML = ''; // Clear options visually

        scoreContainer.classList.remove('hidden');
        scoreContainer.innerHTML = `<h2>Quiz Complete!</h2>
                                  <p>Your final score is: ${score} out of ${quizData.length}</p>`;

        nextButton.textContent = 'Restart Quiz';
        nextButton.disabled = false;
    }

    function restartQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        questionsAnswered = false;
        scoreContainer.classList.add('hidden');
        questionContainer.classList.remove('hidden');
        feedbackTextElement.textContent = '';
        loadQuestion();
    }

})(); // IIFE to encapsulate the code
