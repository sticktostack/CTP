let timeLeft = localStorage.getItem("timeLeft") || 40 * 60;
let timer = null; // Store timer reference
let startbtn = document.querySelector(".startbtn");
let lastpage = document.querySelector(".lastpage");
let finishpage = document.querySelector(".finishpage");
let finishbtn = document.querySelector(".finishbtn");
let hints = document.querySelector(".hints");
let counter = false;
let skipBtn = document.querySelector(".skipbtn");
let prevbtn = document.querySelector(".prevbtn");

let hintIndex = 0; // Track the current hint index
let isTimerRunning = localStorage.getItem("isTimerRunning") === "true";

let arrayofHints = [
  'Opposite of "dark"',
  "The shape with three sides",
  'Reverse the word "desserts"',
  "What is always in front of you but can’t be seen?",
  "What’s full of holes but still holds water?",
  "If we skip a day after Tuesday, where do we land?",
];

startbtn.addEventListener("click", () => {
  counter = true;
    hints.style.opacity = 1;
    hints.textContent = arrayofHints[hintIndex];

  setTimeout(() => {
    startbtn.textContent = "Game Started";
  }, 100);

  setTimeout(() => {
    startbtn.style.opacity = 0;
  }, 500);

  if (!isTimerRunning) {
    startTimer(); // Start timer only if it hasn't started yet
  }
});

function updateDisplay() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  document.querySelector(".timer").textContent = `${String(minutes).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(2, "0")}`;
}

function startTimer() {
  if (!timer) {
    isTimerRunning = true;
    localStorage.setItem("isTimerRunning", "true");
    
    timer = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        localStorage.setItem("timeLeft", timeLeft);
        updateDisplay();
      } else {
        clearInterval(timer);
        localStorage.setItem("isTimerRunning", "false");
        lastpage.style.zIndex = 1;
      }
    }, 1000);
  }
}

window.addEventListener("beforeunload", () => {
  clearInterval(timer);
  localStorage.setItem("isTimerRunning", "false");
});

// Prevent timer reset on answer submission
document.querySelector(".submitbtn").addEventListener("click", (event) => {
  event.preventDefault(); // Prevent form submission refresh if inside a form
  let inputvalue = document.querySelector(".inputbox").value.trim();
  document.querySelector(".inputbox").value = "";
  if (inputvalue) {
    console.log(inputvalue);
  }
});

finishbtn.addEventListener("click", () => {
  alert("Are you sure?");
  // finishpage.style.zIndex = '1';
});

skipBtn.addEventListener("click", () => {
  if (counter === true) {
    if (hintIndex < arrayofHints.length) {
      hints.innerHTML = arrayofHints[hintIndex]; // Show current hint
      hintIndex++; // Move to the next hint
    } else {
      alert("No more hints left!");
    }
  } else {
    alert("Start the game first");
  }
});

function showPreviousHint() {
  if (counter === true) {
    if (hintIndex > 1) {
      hintIndex--; // Move back to the previous hint
      hints.innerHTML = arrayofHints[hintIndex - 1]; // Show the previous hint
    } else {
      alert("No previous hints available!"); // Stop at the first hint
    }
  } else {
    alert("Start the game first");
  }
}

prevbtn.addEventListener("click", showPreviousHint);

updateDisplay();