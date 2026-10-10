let number1, number2, answer;
let score = 0;
let question = 1;
let time = 30;
let gameOver = false;

let correctSound = new Audio("correct.mp3");
let wrongSound = new Audio("wrong.mp3");
let warningSound = new Audio("warning.mp3");
let finishSound = new Audio("finish.mp3");

function newQuestion() {

    number1 = Math.floor(Math.random() * 20) + 1;
    number2 = Math.floor(Math.random() * 20) + 1;

    let signs = ["+", "-", "*", "/"];
    let sign = signs[Math.floor(Math.random() * signs.length)];

    if (sign == "-" && number2 > number1) {
        let temp = number1;
        number1 = number2;
        number2 = temp;
    }

    if (sign == "/") {
        answer = Math.floor(Math.random() * 10) + 1;
        number2 = Math.floor(Math.random() * 10) + 1;
        number1 = answer * number2;
    }

    if (sign == "+") answer = number1 + number2;
    if (sign == "-") answer = number1 - number2;
    if (sign == "*") answer = number1 * number2;
    if (sign == "/") answer = number1 / number2;

    document.getElementById("problem").innerHTML =
        number1 + " " + sign + " " + number2 + " = ?";
}

document.getElementById("answer").onkeydown = function(event) {

    if (event.key == "Enter" && !gameOver) {

        let playerAnswer = Number(this.value);

        if (playerAnswer == answer) {

            score++;
            correctSound.play();

            document.getElementById("score").innerHTML = score;
            document.getElementById("message").innerHTML = "🟢 CORRECT!";

            question++;

            if (question <= 20) {

                document.getElementById("question").innerHTML =
                    question + " / 20";

                this.value = "";
                newQuestion();

            } else {

                finishGame();
            }

        } else {

            wrongSound.play();

            document.getElementById("message").innerHTML =
                "🔴 WRONG! TRY AGAIN!";

            this.value = "";
        }
    }
};

function finishGame() {

    if (gameOver) return;

    gameOver = true;

    clearInterval(timer);

    warningSound.pause();
    warningSound.currentTime = 0;

    finishSound.play();

    document.getElementById("time").innerHTML = "0";

    document.getElementById("problem").innerHTML =
        "🏆 GAME COMPLETE!";

    document.getElementById("message").innerHTML =
        "Final Score: " + score + " / 20";

    document.getElementById("answer").disabled = true;

    let username = localStorage.getItem("username");

    if (username == null || username == "") {
        username = "Player";
    }

    let scores = JSON.parse(localStorage.getItem("mathScores") || "[]");

    scores.push({
        username: username,
        score: score
    });

    localStorage.setItem("mathScores", JSON.stringify(scores));
}

let timer = setInterval(function() {

    if (time > 0) {

        time--;

        document.getElementById("time").innerHTML = time;

        if (time > 0 && time <= 10) {
            warningSound.currentTime = 0;
            warningSound.play();
        }
    }

    if (time == 0) {
        finishGame();
    }

}, 1000);

newQuestion();