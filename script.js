let timeLeft = 40 * 60; // 40 minutes in seconds
let timer;
let startbtn = document.querySelector('.startbtn')
let lastpage = document.querySelector('.lastpage')
let finishpage = document.querySelector('.finishpage')
let finishbtn = document.querySelector('.finishbtn');
let hints = document.querySelector('.hints');
// console.log(hints);

let counter = false;

let arrayofHints = ['king of fruits', 'inventor of zero', 'uno is which kind of game'];
let skipBtn = document.querySelector('.skipbtn')
let prevbtn = document.querySelector('.prevbtn')



startbtn.addEventListener('click',() => {
counter = true;
    setTimeout(() => {
        startbtn.textContent = "Game Started";
    }, 100);

    setTimeout(() => {
        startbtn.style.opacity = 0;
    }, 500);
})
function updateDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    document.querySelector(".timer").textContent =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function startTimer() {
    if (!timer) {
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateDisplay();
            } else {
                clearInterval(timer);
                // alert("Time's up!");
                lastpage.style.zIndex = 1;
            }
        }, 1000);
    }
}

finishbtn.addEventListener('click',() => {
    alert("are you sure ?")
    finishpage.style.zIndex = '1';

})

updateDisplay();


// skipBtn.addEventListener('click',() => {
//     if(counter === true){
//         hints.innerHTML ='';
//         arrayofHints.forEach((elem) => {
//             hints.innerHTML = `<p> ${elem}</p>`
//         })
//     }else{
//         alert('start the game first');
//     }
// })

//check
// skipBtn.addEventListener('click', () => {
//     if (counter === true) {
//         hints.innerHTML = ''; // Clear previous hints
//         arrayofHints.forEach((elem) => {
//             hints.innerHTML += `<p>${elem}</p>`; // Append each hint
//         });
//     } else {
//         alert('start the game first');
//     }
// });
// let hintIndex = 0; // Track the current hint index

// skipBtn.addEventListener('click', () => {
//     if (counter === true) {
//         hints.innerHTML = arrayofHints[hintIndex]; // Show current hint
//         hintIndex = (hintIndex + 1) % arrayofHints.length; // Move to next hint cyclically
//     } else {
//         alert('start the game first');
//     }
// });

let hintIndex = 0; // Track the current hint index

skipBtn.addEventListener('click', () => {
    if (counter === true) {
        if (hintIndex < arrayofHints.length) {
            hints.innerHTML = arrayofHints[hintIndex]; // Show current hint
            hintIndex++; // Move to the next hint
        } else {
            alert('No more hints left!'); // Stop when all hints are shown
        }
    } else {
        alert('Start the game first');
    }
});

