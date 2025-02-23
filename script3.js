let timeLeft = localStorage.getItem("timeLeft") 
  ? parseInt(localStorage.getItem("timeLeft")) 
  : 40 * 60;
let timer = null; // Store timer reference
let isTimerRunning = localStorage.getItem("isTimerRunning") === "true";
let counter = false;
let hintIndex = 0;
let hints = document.querySelector(".hints");
let pdfLink = document.querySelector(".pdfLink");
// console.log(pdfLink);

let startbtn = document.querySelector(".startbtn");
let nextBtn = document.querySelector(".nextbtn");
let prevbtn = document.querySelector(".prevbtn");

let arrayofHints = [
  "The capital of France.",
  "The color of the sky.",
  "What goes up but never comes down?",
  'The last three letter of the word "alphabet".',
  "It is an odd number. Take away a letter and it becomes even. What number it it? (in words)",
  "Which month has 28 days? (in words)",
];

let arrayofpdfLinks = [
  "https://drive.google.com/file/d/12RyVmw2HVZ0DwCo8P2wL_FarKXisuIeP/view?usp=drive_link",
  "https://drive.google.com/file/d/1F0QmRg0-d3Kl_-LMrcN0ID3vvXYDzLsP/view?usp=drive_link",
  "https://drive.google.com/file/d/1rSOIe5UVY4Jk30DGScJoRElSHloSA1nA/view?usp=drive_link",
  "https://drive.google.com/file/d/1v1HQc6IiN9BwXDGnj5aCGss9ZZicb9Ij/view?usp=drive_link",
  "https://drive.google.com/file/d/1f5vjd0zLc9Nr7o-6Ypzb6MzjD_rZLL3A/view?usp=drive_link",
  "https://drive.google.com/file/d/1RdvB2S0AIjqX4w-kXlaNwvse7QbqEAvR/view?usp=drive_link",
];



startbtn.addEventListener("click", () => {

  setTimeout(() => {
    document.querySelector('.startbtn').innerHTML ="Game started"
  }, 100);

  document.querySelector(".hints").style.opacity = 1;
  document.querySelector(".pdfbox").style.opacity = 1;
  counter = true;
  pdfLink.target = "_blank";
  pdfLink.href = arrayofpdfLinks[hintIndex];
  
  if (!isTimerRunning) { 
    startTimer(); // Resume timer only when user clicks
  }

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
  document.querySelector(".timer").textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

if (isTimerRunning) {
  isTimerRunning = false; // Ensure it stays paused until the user starts
  localStorage.setItem("isTimerRunning", "false");
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


if (isTimerRunning) {
  startTimer();
}

document.querySelector('.nextsegmentbtn').addEventListener('click',()=>{
  alert("Are you sure ?");
})

nextBtn.addEventListener("click", () => {
  if (counter === true) {
    if (hintIndex < arrayofHints.length - 1) {
      hintIndex++; // Move to next hint
      hints.innerHTML = arrayofHints[hintIndex];

      // Update the PDF link based on the current hint index
      pdfLink.href = arrayofpdfLinks[hintIndex]; 
      pdfLink.target = "_blank"; // Ensure it opens in a new tab
    } else {
      alert("No more hints left!");
    }
  } else {
    alert("Start the game first");
  }
});

prevbtn.addEventListener("click", () => {
  if (counter === true) {
    if (hintIndex > 0) {
      hintIndex--; // Move to previous hint
      hints.innerHTML = arrayofHints[hintIndex];

      // Update the PDF link based on current hintIndex
      pdfLink.href = arrayofpdfLinks[hintIndex];
      pdfLink.target = "_blank"; // Ensure it opens in a new tab
    } else {
      alert("No previous hints left!");
    }
  } else {
    alert("Start the game first");
  }
});

document.querySelector(".submitbtn").addEventListener("click", (event) => {
  event.preventDefault(); // Prevent form submission refresh if inside a form
  let inputvalue = document.querySelector(".searcharea").value.trim();
  document.querySelector(".searcharea").value = "";
  if (inputvalue) {
    console.log(inputvalue);
  }else{
    alert("write something first");
  }
});
updateDisplay();
clearInterval(timer); // Pause timer
    localStorage.setItem("isTimerRunning", "false");