let level = 1;
let score = 0;
let lives = 3;

let items = ["🐯","⭐","🍎","🔥","🐶","⚽","🚀","🍕"];

function startGame() {

    let board = document.getElementById("gameBoard");
    let area = document.getElementById("objects");

    board.innerHTML = "";
    area.innerHTML = "";

    let amount = level + 2;

    for (let i = 0; i < amount; i++) {

        let slot = document.createElement("article");
        slot.className = "memorySlot";
        slot.dataset.place = i;

        let object = document.createElement("button");
        object.className = "memoryObject";
        object.innerHTML = items[i];
        object.draggable = true;
        object.dataset.correct = i;

        object.ondragstart = function(e) {
            e.dataTransfer.setData("id", i);
        };

        slot.appendChild(object);
        board.appendChild(slot);
    }

    setTimeout(function() {

        let objects = Array.from(
            board.querySelectorAll(".memoryObject")
        );

        objects.sort(function() {
            return Math.random() - 0.5;
        });

        objects.forEach(function(object) {
            area.appendChild(object);
        });

        document.getElementById("message").innerHTML =
            "🎯 Drag each object to its correct place!";

    }, 3000);
}

document.getElementById("gameBoard").ondragover = function(e) {
    e.preventDefault();
};

document.getElementById("gameBoard").ondrop = function(e) {

    e.preventDefault();

    let id = e.dataTransfer.getData("id");
    let object = document.querySelector(
        '[data-correct="' + id + '"]'
    );

    let slot = e.target.closest(".memorySlot");

    if (!slot) return;

    if (slot.dataset.place == id) {

        slot.appendChild(object);
        object.draggable = false;

        score += 10;
        document.getElementById("score").innerHTML = score;

        document.getElementById("message").innerHTML =
            "✅ Correct!";

        if (document.querySelectorAll(
            ".memorySlot .memoryObject"
        ).length == level + 2) {

            level++;

            document.getElementById("level").innerHTML = level;

            document.getElementById("message").innerHTML =
                "🎉 Level Complete!";

            setTimeout(startGame, 1500);
        }

    } else {

        lives--;

        document.getElementById("lives").innerHTML = lives;

        document.getElementById("message").innerHTML =
            "❌ Wrong place!";

        if (lives == 0) {
            document.getElementById("message").innerHTML =
                "🏆 GAME OVER! Score: " + score;
        }
    }
};

startGame();



