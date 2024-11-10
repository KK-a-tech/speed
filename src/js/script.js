window.onload = () => {
  const max = 12;
  const numbers = [];
  let count = 1;
  let timerInterval;
  let timeElapsed = 0;
  let gameStarted = false;

  const startButton = document.getElementById("startButton");
  const resetButton = document.getElementById("resetButton");
  const screen = document.getElementById("screen");
  const timerDisplay = document.getElementById("timer");
  const messageDisplay = document.getElementById("messageDisplay");

  startButton.addEventListener("click", startGame);
  resetButton.addEventListener("click", resetGame);

  for (let i = 1; i <= max; i++) {
    numbers.push(i);
  }

  function shuffleArray() {
    for (let i = 0; i < 30; i++) {
      const j = Math.random() * max | 0;
      const k = Math.random() * max | 0;
      if (j === k) continue;
      let temp = numbers[j];
      numbers[j] = numbers[k];
      numbers[k] = temp;
    }
  }

  function startGame() {
    if (gameStarted) return;
    gameStarted = true;

    startButton.style.display = "none";
    resetButton.style.display = "none";

    timeElapsed = 0;
    timerDisplay.innerText = `タイム: ${timeElapsed.toFixed(2)}秒`;
    timerInterval = setInterval(updateTimer, 10);

    shuffleArray();

    for (let i = 0; i < max; i++) {
      const elm = document.createElement('div');
      elm.className = "card";
      elm.id = numbers[i];

      elm.addEventListener('click', function () {
        if (count !== parseInt(this.id)) return;
        count++;
        this.style.backgroundColor = "gray";
        if (count === max + 1) {
          clearInterval(timerInterval);
          displayGameEndMessage(`ゲーム終了！ 経過時間: ${timeElapsed.toFixed(2)}秒`);

          count = 1;
          resetButton.style.display = "inline-block";
        }
      });

      const p = document.createElement('p');
      p.innerText = numbers[i];
      elm.appendChild(p);

      screen.appendChild(elm);
    }
  }

  function updateTimer() {
    timeElapsed += 0.01;
    timerDisplay.innerText = `タイム: ${timeElapsed.toFixed(2)}秒`;
  }

  function resetGame() {
    screen.innerHTML = '';

    count = 1;
    gameStarted = false;
    timeElapsed = 0;
    timerDisplay.innerText = `タイム: 0.00秒`;

    startButton.style.display = "inline-block";
    resetButton.style.display = "none";
    messageDisplay.innerText = "";
    messageDisplay.style.visibility = "hidden";
  }

  function displayGameEndMessage(message) {
    messageDisplay.innerText = message;
    messageDisplay.style.visibility = "visible";
  }
};