let totalSeconds = 0;
let stopwatchId;
let inputSequence = ""; // To track the user's input sequence
const targetSequence = "Axolotl";  // The first target sequence
const targeTSequence = "Well meet again"; // The second target sequence

const startBtn = document.querySelector('#startstopwatch');
const stopBtn = document.querySelector('#stopstopwatch');
const resetBtn = document.querySelector('#reset');
const output = document.querySelector('#stopwatch');
const inputHour = document.querySelector('#input_hour');
const inputMinute = document.querySelector('#input_minute');
const inputSecond = document.querySelector('#input_second');

// Audio elements for starting, ending, and special sounds
const startSound = new Audio('./start.mp3'); // Replace with your start sound file
const endSound = new Audio('./stop.mp3');     // Replace with your end sound file
const specialSound = new Audio('./special.mp3'); // Replace with your special sound file
const songlSound = new Audio('./song.mp3'); // Replace with your special sound file

// Update the displayed time in HH:MM:SS format
function updateDisplay() {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    output.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Function to play sound
function playSound(audio) {
    audio.currentTime = 0; // Reset playback time
    audio.play().catch(error => {
        console.error('Error occurred while trying to play the audio:', error);
    });
}

// Listen for key presses
document.addEventListener('keypress', (event) => {
    inputSequence += event.key; // Append the pressed key to the input sequence
    console.log(`Current input sequence: ${inputSequence}`); // Log current sequence

    // Check if the input sequence matches the first target sequence
    if (inputSequence === targetSequence) {
        playSound(specialSound); // Play the special sound for "Axolotl"
        console.log("Played special sound for 'Axolotl'"); // Log sound play
        inputSequence = ""; // Reset the sequence after playing the sound
    } 
    // Check if the input sequence matches the second target sequence
    else if (inputSequence === targeTSequence) {
        playSound(songlSound); // Play the song sound for "We’ll Meet Again"
        console.log("Played special sound for 'We’ll Meet Again'"); // Log sound play
        inputSequence = ""; // Reset the sequence after playing the sound
    } 
    // Reset inputSequence if it doesn't match either target
    else if (!targetSequence.startsWith(inputSequence) && !targeTSequence.startsWith(inputSequence)) {
        console.log("Input sequence broken, resetting."); // Log reset
        inputSequence = ""; // Reset if both sequences are broken
    }
});

startBtn.addEventListener('click', () => {
    const hours = parseInt(inputHour.value) || 0;
    const minutes = parseInt(inputMinute.value) || 0;
    const seconds = parseInt(inputSecond.value) || 0;

    totalSeconds = hours * 3600 + minutes * 60 + seconds;

    // Check if totalSeconds is less than or equal to 0
    if (totalSeconds <= 0) {
        alert("Hi, Mr Idiot."); // Show alert if the input is invalid
        return; // Exit the function early if time is invalid
    }

    // Play the start sound
    playSound(startSound);

    startBtn.disabled = true; // Disable the start button
    stopBtn.disabled = false; // Enable the stop button

    // Start the countdown
    stopwatchId = setInterval(() => {
        updateDisplay();
        if (totalSeconds > 0) {
            totalSeconds--;
        } else {
            clearInterval(stopwatchId);
            startBtn.disabled = false; // Enable the start button again
            stopBtn.disabled = true; // Disable the stop button

            // Play the end sound
            playSound(endSound);
        }
    }, 1000);
});

stopBtn.addEventListener('click', () => {
    clearInterval(stopwatchId);
    startBtn.disabled = false; // Enable the start button
    stopBtn.disabled = true; // Disable the stop button
});

resetBtn.addEventListener('click', () => {
    clearInterval(stopwatchId);
    totalSeconds = 0;
    updateDisplay(); // Reset the display
    inputHour.value = ''; // Reset hour input
    inputMinute.value = ''; // Reset minute input
    inputSecond.value = ''; // Reset second input
    startBtn.disabled = false; // Enable the start button
    stopBtn.disabled = true; // Disable the stop button
});
