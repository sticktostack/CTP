let skipbtn = document.querySelector(".skipbtn");
let prevbtn = document.querySelector(".prevbtn");
let searchbox = document.querySelector("searcharea");
let hints = document.querySelector(".hints");
let words = document.querySelector(".words");
let startbtn = document.querySelector('.startbtn')
let currentIndex = 0; // To keep track of the current word/hint index

let arrayofWords = ["elmbio", "edrfin", "dguetb", "tvelra"];
let arrayofHints = [
  "You probably check in every minute.",
  "Not family by blood, but by choice.",
  "Spending wisely, Saving smartly.",
  "What you do when you pack your bags and go.",
];



function updateDisplay() {
    words.textContent = arrayofWords[currentIndex];
    hints.textContent = arrayofHints[currentIndex];
}


startbtn.addEventListener("click", () => {
    hints.style.opacity = 1;
    words.style.opacity = 1;
    currentIndex = 0; 
    updateDisplay();
});


skipbtn.addEventListener("click", (e) => {
    e.preventDefault()
    if(currentIndex < arrayofHints.length - 1){
        currentIndex++;
        updateDisplay()
    }else{
        alert("no more hints left")
    }
    updateDisplay();
});


prevbtn.addEventListener("click", (e) => {
    e.preventDefault()
    if(currentIndex > 0){
        currentIndex--;
        updateDisplay()
    }else{
        alert("no more hints left")
    }
    updateDisplay();
});

// console.log(2%4);

// currentIndex = (currentIndex + 1) % arrayofWords.length; // Loop to start if end is reached
// currentIndex = (currentIndex - 1 + arrayofWords.length) % arrayofWords.length; // Loop to end if at the beginning
