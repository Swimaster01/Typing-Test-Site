// Element reference grabbing

const wpmDisplay = document.querySelector('#wpm-display');

const accuracyDisplay = document.querySelector('#accuracy-display');

const timerDisplay = document.querySelector('#timer-display');

const difficultyButton = document.querySelectorAll('.difficulty-btn');

const modeButton = document.querySelectorAll('.mode-btn');

const passageDisplay = document.querySelector('#passage-display');

const restartButton = document.querySelector('#restart-btn');


const samplePassage = 'It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.We had everything before us, we had nothing before us, we were all going direct to Heaven, we were all going direct the other way.In short, the period was so far like the present period, that some of its noisiest authorities insisted on its being received, for good or for evil, in the superlative degree of comparison only';



for (let i = 0; i < samplePassage.length; i++) {
    const testSpan = document.createElement('span');
    testSpan.textContent = samplePassage[i];
    passageDisplay.appendChild(testSpan);
}

let currentIndex = 0;

let correctCount = 0;
let wrongCount = 0;

document.addEventListener('keydown', function(event) {
    const key = event.key;

    const ignoredKeys = [
        'Shift',
        'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12',
        'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight',
        'Escape', 'Tab', 'CapsLock', 'ScrollLock', 'Pause',
        'Insert', 'Home', 'PageUp', 'PageDown', 'End', 'Delete',
        'NumLock', 'PrintScreen'
    ]

    if (ignoredKeys.includes(key)) {
        return;
    }

    if (key === 'Backspace') {
        if (currentIndex > 0) {
            currentIndex --;
            const charSpans = passageDisplay.querySelectorAll('span');
            charSpans[currentIndex].className = '';
        }
        return;
    }

    const charSpans = passageDisplay.querySelectorAll('span');

    if (currentIndex >= charSpans.length) return;

    const expectedChar = charSpans[currentIndex].textContent;

    if (key === expectedChar) {
        charSpans[currentIndex].className = 'correct';
        correctCount = correctCount + 1;

    } else {
        charSpans[currentIndex].className = 'incorrect';
        wrongCount = wrongCount + 1;
    }
    currentIndex++;

    updateAccuracy();
});

function updateAccuracy() {
    const totalTyped = correctCount + wrongCount;

    if (totalTyped === 0) {
        accuracyDisplay.textContent = '100%';
        return;
    }
    const  accuracy = (correctCount / totalTyped) * 100;

    accuracyDisplay.textContent = Math.round(accuracy) + '%';
}