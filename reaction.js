let score = 0;
let time = 20;
let gameOver = false;
let animalVisible = false;

let animals = ["🐯", "🐶", "🐱", "🦁", "🐸", "🐵", "🐼", "🐨"];

let correctSound = new Audio("correct.mp3");
let warningSound = new Audio("warning.mp3");
let finishSound = new Audio("finish.mp3");

function showAnimal() {

    if (gameOver) return;

    let animal = animals[Math.floor(Math.random() * animals.length)];

    document.getElementById("target").innerHTML = animal;

    animalVisible = true;

    let hideTime = Math.floor(Math.random() * 700) + 300;

    setTimeout(function() {

        if (!gameOver) {

            document.getElementById("target").innerHTML = "❓";

            animalVisible = false;

            let nextTime = Math.floor(Math.random() * 1000) + 300;

            setTimeout(showAnimal, nextTime);
        }

    }, hideTime);
}

document.addEventListener("keydown", function(event) {

    if (event.key == "Enter" && !gameOver) {

        if (animalVisible) {

            score++;

            document.getElementById("reactionScore").innerHTML = score;

            document.getElementById("reactionMessage").innerHTML =
                "⚡ CAUGHT!";

            correctSound.currentTime = 0;
            correctSound.play();

            animalVisible = false;

            document.getElementById("target").innerHTML = "❓";

            if (score >= 30) {
                endGame();
            }

        } else {

            document.getElementById("reactionMessage").innerHTML =
                "❌ Too early!";
        }
    }
});

let timer = setInterval(function() {

    if (time > 0) {

        time--;

        document.getElementById("reactionTime").innerHTML = time;

        if (time > 0 && time <= 5) {

            warningSound.currentTime = 0;
            warningSound.play();
        }
    }

    if (time == 0) {
        endGame();
    }

}, 1000);

function endGame() {

    if (gameOver) return;

    gameOver = true;

    clearInterval(timer);

    warningSound.pause();
    warningSound.currentTime = 0;

    finishSound.play();

    document.getElementById("target").innerHTML = "🏆";

    document.getElementById("reactionTime").innerHTML = "0";

    document.getElementById("reactionMessage").innerHTML =
        "GAME OVER! Score: " + score + " / 30";
}

showAnimal();