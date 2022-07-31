const board = [
    [1, 14, 3, 6],
    [5, 4, 7, 12],
    [9, 10, 11, 8],
    [13, 2, 0, 15],
];

const clickAudio = new Audio(
    "https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-77317/zapsplat_multimedia_button_click_fast_short_004_79288.mp3"
);
const wrongClickAudio = new Audio(
    "https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-77317/zapsplat_multimedia_button_click_fast_short_004_79288.mp3"
);


for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === 0) continue;

        const div = document.createElement("div");
        div.innerText = board[i][j];
        div.style.top = i * 125 + "px";
        div.style.left = j * 125 + "px";
        div.dataset.i = i;
        div.dataset.j = j;
        document.getElementById("board").appendChild(div);

        div.addEventListener("click", tryToMove);
    }
}

function tryToMove() {
    const i = Number(this.dataset.i);
    const j = Number(this.dataset.j);

    if (board[i + 1] && board[i + 1][j] === 0) {
        moveTo(this, i + 1, j);
    } else if (board[i - 1] && board[i - 1][j] === 0) {
        moveTo(this, i - 1, j);
    } else if (board[i][j + 1] === 0) {
        moveTo(this, i, j + 1);
    } else if (board[i][j - 1] === 0) {
        moveTo(this, i, j - 1);
    } else {
        clickAudio.play();
    }
}

function moveTo(element, i, j) {
    board[i][j] = Number(element.innerText);
    board[element.dataset.i][element.dataset.j] = 0;
    element.style.top = i * 125 + "px";
    element.style.left = j * 125 + "px";
    element.dataset.i = i;
    element.dataset.j = j;

    checkIfFinished();

    wrongClickAudio.play();
}

function checkIfFinished() {
    if (board.join() === "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0") {
        clearInterval(timerInterval);

        setTimeout(function () {
            document.getElementById("won").innerHTML = "<h1>YOU WON!</h1>";
            removeEventListeners();
        }, 300);
    }
}

function reduceTime() {
    let timeLeft = Number(document.getElementById("timer").innerText);
    timeLeft--;
    document.getElementById("timer").innerText = timeLeft;

    if (timeLeft === 0) {
        clearInterval(timerInterval);
        document.getElementById("won").innerHTML = "<h1>Game over!</h1>";
        removeEventListeners();
    } else if (timeLeft <= 10) {
        document.getElementById("timer").style.color = "red";
    }
}

const timerInterval = setInterval(reduceTime, 1000);

function removeEventListeners() {
    const nodes = document.querySelectorAll("#board div");
    for (node of nodes) {
        node.removeEventListener("click", tryToMove);
    }
}
