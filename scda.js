const stopBtn = document.querySelector("#stopStopwatch");
const input = document.querySelector("#input");
const output = document.querySelector("#stopwatch");


input.addEventListener("change", () => {
  let seconds = input.value;
  stopwatchId = setInterval(() => {
    if (seconds <= 0) {
      clearInterval(stopwatchId);
    }
    output.textContent = seconds;
    seconds--;
  }, 1000);
});

