const wpmDisplay = document.querySelector("#wpm-display");
const accuracyDisplay = document.querySelector("#accuracy-display");
const timerDisplay = document.querySelector('#timer-display');

const difficultyButtons = document.querySelectorAll('.difficulty-btn');
const modeButton = document.querySelectorAll('.mode-btn');

const restartButton = document.querySelector('#restart-btn');

const passageDisplay = document.querySelector('#passage-display');


const samplePassage = 'The quick brown fox jumps over the lazy dog.';

for (let i = 0; i < samplePassage.length; i++) {
    const testSpan = document.createElement('span');

    testSpan.textContent = samplePassage[i];

    passageDisplay.appendChild(testSpan);
}


let currentIndex = 0;

const letterSpans = passageDisplay.querySelectorAll('span');

document.addEventListener('keydown', function(event) {
    const expectedChar = samplePassage[currentIndex];
    console.log("expected:", expectedChar, "typed:", event.key);

});


