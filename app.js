// first of all we are going to select the 4 buttons by using dom

let gameSeq = [];
let userSeq = [];
let highScore = 0;

let btn1 = document.querySelector(".yellow");
let btn2 = document.querySelector(".red");
let btn3 = document.querySelector(".purple");
let btn4 = document.querySelector(".green");
let btn = [btn1, btn2, btn3, btn4];
let body = document.querySelector("body");
let level;
// selecting our h2 heading
let h2 = document.querySelector("#level-title");
// selecting the h2 heading i.e over
let hide = document.querySelector("#hide");
let started = false;

// adding event listener if any key is being pressed
body.addEventListener("keypress", () => {
    body.classList.remove("flashOver");
    hide.classList.add("over");
    if (started == false) {
        
    
    level = 0;
    started = true;
    console.log("key was pressed");
    // we want when our game starts,user should move up to the level 1
    // technically speaking we want our h2 heading should change to level 1
    // for that we will make a level up function
    // calling level up function
    // we want our game should start one time only
    levelUp();
    // now user have gone to level 1 , we want any random button should flash
    // for that purpose we will make use math.random function
    // for that we will make a flash buttons function for flashing any random button
    flashButton();
    }
});

function levelUp() {
    level++;
    h2.innerText = `Level ${level}`;
    // started = false;
    
}

function flashButton() {
    let i = Math.floor(Math.random() * 4);
    // now we want that game should flash the button for one second only, so for that purpose we will use the settime out function
    btn[i].classList.add("flash");
    setTimeout(() => {
        btn[i].classList.remove("flash");
    }, 500);
    // now we want that the button that the game has flashed,that button should be pushed to array of gameSeq.
    gameSeq.push(btn[i]);
    console.log(gameSeq);
}

// now we will see what button user has pressed,is that button is matching that button that the game has flashed.

// for that we will add event listener of 'clicked' on each button
for(let btns of btn) {
    btns.addEventListener("click", () => {
        console.log(btns);
        // now i want when the user presses the button it should be flashed in green
        btns.classList.add("flash1");
        setTimeout(() => {
            // we want after 5 milli seconds,flash 2 class will be removed,means button pressed by the user will come to it's original array
            btns.classList.remove("flash1");
        }, 500);
        // now the user has pressed the btn/color,now we will push that btn/color to userSeq.btns represent the current button that has been pressed by the user
        userSeq.push(btns);
        // till here you have made the game yourself without taking help,keep this dedication up always. very good!
        console.log(userSeq);
      
        // now the user has pressed the button,now we want to check if the button that has been pressed by the user,is that matching the game sequence or not.
        // for that purpose we will use and call the checkSeq function for checking the gameSeq and userSeq.
        // calling checkSeq function
        checkSeq();
    })
}

function checkSeq() {
    // first of all, we will ensure that user sequence is of the same length as that of the game sequence
    if (userSeq.length != gameSeq.length) {
        return; // user has'nt completed their input yet. stop the function execution
    }
    // check if the entire sequence matches
    let isMatching = true;
    for(let i = 0; i < gameSeq.length; i++) {
        if(gameSeq[i] != userSeq[i]) {
            // if the game sequence and the user sequence matches, then call the levelUp() function as well as flashBtn function
            // i want levelUp() function and flashButton() function will be called after the delay of 1 second
            isMatching = false; // if any sequence does'not match call the gameOver function
            gameOver();
        }
    }
    // if the entire sequence matches, move to the next level.
        if(isMatching) {
            setTimeout(() => {
                levelUp();
                flashButton();
            }, 1000);
            // setTimeout(() => {
            //     flashButton();
            // }, 1000);
            // clear user sequence for the next level
            userSeq = [];
        } else {
            gameOver();
        }
    }
    // making function gameOver()

    function gameOver() {
        if(level > highScore) {
            highScore = level;
        }
        hide.classList.remove("over");
        hide.innerText = `Game Over. Your Score was ${highScore}.`;
        h2.innerText = "Press Any key to start the game";
        // we want when game is over background color become red and after one second delay it comes back to it's original wheat color
        body.classList.add("flashOver");
        // setTimeout(() => {
        //     body.classList.remove("flashOver");
        // }, 1000);
        gameSeq = [];
        userSeq = [];
        level = 0;
        started = false;
    }
    

