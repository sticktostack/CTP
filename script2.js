let timeLeft = localStorage.getItem("timeLeft") || 40 * 60;
let timer = null; // Store timer reference
let startbtn = document.querySelector(".startbtn");
let counter = false;
let isTimerRunning = localStorage.getItem("isTimerRunning") === 'true';
// let imageIndex = 0;
let imageIndex = 0;
let nextbtn = document.querySelector(".nextbtn");
let prevbtn = document.querySelector(".prevbtn");
let imagebox = document.querySelector(".imagebox"); // Ensure this is an <img> element
let image = document.querySelector('.image')
let arrayofImages = ["1.png", "2.png", "3.png", "4.png"];
// let counter = true; // Define counter, assuming it's part of game logic

nextbtn.addEventListener("click", () => {
    if (counter === true) {
        if (imageIndex < arrayofImages.length - 1) {
            imageIndex = (imageIndex + 1) % arrayofImages.length; // Corrected image cycling
            image.src = arrayofImages[imageIndex]; // Set the image source correctly
        } else {
            alert("No more images left!");
        }
    } else {
        alert("Start the game first");
    }
});

prevbtn.addEventListener("click", () => {
    if (counter === true) {
        if (imageIndex > 0) {
            imageIndex--; // Decrement the index if it's above 0
            image.src = arrayofImages[imageIndex]; // Update the image
        } else {
            alert("This is the first image!"); // Optionally alert the user
        }
    } else {
        alert("Start the game first");
    }
});


startbtn.addEventListener("click", () => {
  counter = true;
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
  document.querySelector(".timer").textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
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
  let inputvalue = document.querySelector(".searcharea").value.trim();
  document.querySelector(".searcharea").value = "";
  if (inputvalue) {
    console.log(inputvalue);
  }else{
    alert("write something first");
  }
});

updateDisplay();
document.querySelector('.nextsegmentbtn').addEventListener('click',() => {
    alert("Are you sure ?");
})

clearInterval(timer); // Pause timer
    localStorage.setItem("isTimerRunning", "false"); // Store paused state