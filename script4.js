let skipbtn = document.querySelector(".skipbtn");
let prevbtn = document.querySelector(".prevbtn");
let searchbox = document.querySelector("searcharea");
let hints = document.querySelector(".hints");
let words = document.querySelector(".words");
let startbtn = document.querySelector('.startbtn')
let currentIndex = 0; // To keep track of the current word/hint index
let counter = false;

let timeLeft = localStorage.getItem("timeLeft") 
  ? parseInt(localStorage.getItem("timeLeft")) 
  : 40 * 60;

let timer = null;
// let isTimerRunning = localStorage.getItem("isTimerRunning") === "true";
isTimerRunning = false;

let arrayofWords = [
    // "elmbio", 
    "edrfin", 
    // "dguetb", 
    "tvelra"];
    
let arrayofHints = [
//   "You probably check in every minute.",
  "Not family by blood, but by choice.",
//   "Spending wisely, Saving smartly.",
  "What you do when you pack your bags and go.",
];



function updateDisplay() {
    words.textContent = arrayofWords[currentIndex];
    hints.textContent = arrayofHints[currentIndex];
}

function updateDisplayforTime() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  document.querySelector(".timer").textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}
updateDisplayforTime()

startbtn.addEventListener("click", () => {

    setTimeout(() => {
        document.querySelector('.startbtn').innerHTML = "Game Started";
    }, 100);

    hints.style.opacity = 1;
    words.style.opacity = 1;
    currentIndex = 0; 
    counter = true;

    setTimeout(() => {
        document.querySelector('.startbtn').style.opacity = 0
    }, 500);

    updateDisplay();

    if (!isTimerRunning) {
      isTimerRunning = true; 
        localStorage.setItem("isTimerRunning", "true");
        startTimer();
        // startTimer();
    }
});


skipbtn.addEventListener("click", (e) => {
    e.preventDefault()

    if(counter === true){
        if(currentIndex < arrayofHints.length - 1){
            currentIndex++;
            updateDisplay()
        }else{
            alert("no more hints left")
        }
        updateDisplay();
    }else{
        alert("start the game first")
    }
    
});


prevbtn.addEventListener("click", (e) => {
    e.preventDefault()
    if(counter === true){
        if(currentIndex > 0){
            currentIndex--;
            updateDisplay()
        }else{
            alert("no more hints left")
        }
        updateDisplay();
    }else{
        alert("start the game first")
    }
    
});



function startTimer() {
  if (!timer) {
      timer = setInterval(() => {
          if (timeLeft > 0) {
              timeLeft--;
              localStorage.setItem("timeLeft", timeLeft);
              updateDisplayforTime(); // Ensure the timer display updates properly
          } else {
              clearInterval(timer);
              localStorage.setItem("isTimerRunning", "false");
              timer = null;
          }
      }, 1000);
  }
}
  // Resume timer immediately on page load

  updateDisplayforTime();
// console.log(2%4);

// currentIndex = (currentIndex + 1) % arrayofWords.length; // Loop to start if end is reached
// currentIndex = (currentIndex - 1 + arrayofWords.length) % arrayofWords.length; // Loop to end if at the beginning
