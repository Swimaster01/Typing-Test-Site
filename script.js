// Get HTML elements
const wpmDisplay = document.querySelector("#wpm-display");
const accuracyDisplay = document.querySelector("#accuracy-display");
const timerDisplay = document.querySelector("#timer-display");
const difficultyButtons = document.querySelectorAll(".difficulty-btn");
const modeButtons = document.querySelectorAll(".mode-btn");
const passageDisplay = document.querySelector("#passage-display");
const restartButton = document.querySelector("#restart-btn");

// Test passage
const samplePassage =
    "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair. We had everything before us, we had nothing before us, we were all going direct to Heaven, we were all going direct the other way. In short, the period was so far like the present period, that some of its noisiest authorities insisted on its being received, for good or for evil, in the superlative degree of comparison only";

const passages = {
    easy: "The quick brown fox jumps over the lazy dog.",
    medium: samplePassage,
    hard: "In a village of La Mancha, the name of which I have no desire to call to mind, there lived not long since one of those gentlemen that keep a lance in the lance-rack, an old buckler, a lean hack, and a greyhound for coursing."
};

// Display passage
function renderPassage(text) {
    passageDisplay.innerHTML = ""; // Clear previous passage
    currentIndex = 0;
    correctCount = 0;
    wrongCount = 0;

    for (let i = 0; i < text.length; i++) {
        const letter = document.createElement("span");

        letter.textContent = text[i];
        passageDisplay.appendChild(letter);
   }
}



// Test variables
let currentIndex = 0;
let correctCount = 0;
let wrongCount = 0;

let timeLeft = 60; // seconds
let timerInterval;
let testStarted = false;

function startTimer() {
    timerInterval = setInterval(function () {
        timeLeft--;

        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;

        timerDisplay.textContent =
            `${minutes}:${seconds.toString().padStart(2, "0")}`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
        }
    }, 1000);
}

// Keys that should not affect the test
const ignoredKeys = [
    "Shift",
    "F1", "F2", "F3", "F4", "F5", "F6",
    "F7", "F8", "F9", "F10", "F11", "F12",
    "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight",
    "Escape", "Tab", "CapsLock", "ScrollLock",
    "Pause", "Insert", "Home", "PageUp", "PageDown",
    "End", "Delete", "NumLock", "PrintScreen"
];

// Listen for keyboard input
document.addEventListener("keydown", function (event) {
    const key = event.key;
    const charSpans = passageDisplay.querySelectorAll("span");

    // Ignore special keys
    if (ignoredKeys.includes(key)) {
        return;
    }

    if (!testStarted) {
        testStarted = true;
        startTimer();
    }

    // Handle Backspace
    if (key === "Backspace") {
        if (currentIndex > 0) {
            currentIndex--;
            charSpans[currentIndex].className = "";
        }

        return;
    }

    // Stop when passage is finished
    if (currentIndex >= charSpans.length) {
        return;
    }

    // Get the character the user is supposed to type
    const expectedChar = charSpans[currentIndex].textContent;

    // Check whether the typed character is correct
    if (key === expectedChar) {
        charSpans[currentIndex].className = "correct";
        correctCount++;
    } else {
        charSpans[currentIndex].className = "incorrect";
        wrongCount++;
    }

    // Move to the next character
    currentIndex++;

    updateScore();
});

// Update accuracy and WPM
function updateScore() {
    const totalTyped = correctCount + wrongCount;

    if (totalTyped === 0) {
        accuracyDisplay.textContent = "100%";
    } else {
        const accuracy = (correctCount / totalTyped) * 100;
        accuracyDisplay.textContent = Math.round(accuracy) + "%";
    }

    const wpm = Math.round(correctCount / 5);
    wpmDisplay.textContent = wpm;
}


// Make the difficulty buttons functional
difficultyButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const difficulty = button.dataset.difficulty;
        renderPassage(passages[difficulty]);
    });
});


