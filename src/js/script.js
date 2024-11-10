window.onload = () => {
  const max = 12; // 1から12までのカード
  const numbers = [];
  let count = 1; // クリックされた順番をカウント（1からスタート）
  let timerInterval; // タイマーのインターバルID
  let timeElapsed = 0; // 経過時間
  let gameStarted = false; // ゲームが開始されたかどうか

  // スタートボタンのイベントリスナー
  const startButton = document.getElementById("startButton");
  const screen = document.getElementById("screen");
  const timerDisplay = document.getElementById("timer");

  startButton.addEventListener("click", startGame);

  // 1からmax(12)までの数字を配列に格納
  for (let i = 1; i <= max; i++) {
    numbers.push(i);
  }

  // 配列をシャッフル
  function shuffleArray() {
    for (let i = 0; i < 30; i++) {
      const j = Math.random() * max | 0; // 0から11までのインデックスをランダムに選択
      const k = Math.random() * max | 0; // 同じく0から11の範囲
      if (j === k) continue; // j と k が同じ場合は交換しない
      let temp = numbers[j];
      numbers[j] = numbers[k];
      numbers[k] = temp;
    }
  }

  // ゲーム開始処理
  function startGame() {
    if (gameStarted) return; // ゲームがすでに開始されていれば何もしない
    gameStarted = true;

    // スタートボタンを非表示にする
    startButton.style.display = "none";

    // タイマー開始
    timeElapsed = 0;
    timerDisplay.innerText = `タイム: ${timeElapsed}秒`;
    timerInterval = setInterval(updateTimer, 1000); // 1秒ごとに更新

    shuffleArray(); // 配列をシャッフル

    // シャッフルされた数字を使ってカードを生成
    for (let i = 0; i < max; i++) {
      const elm = document.createElement('div');
      elm.className = "card";
      elm.id = numbers[i]; // id をシャッフルした数字に設定

      // カードがクリックされたときの処理
      elm.addEventListener('click', function () {
        if (count !== parseInt(this.id)) return; // count と一致しないときは無視
        count++;
        this.style.backgroundColor = "black"; // カードの背景色を黒に
        if (count === max + 1) { // すべてのカードがクリックされたら
          clearInterval(timerInterval); // タイマーを停止
          alert(`ゲーム終了！ 経過時間: ${timeElapsed}秒`);
          count = 1; // ゲームが終了したらカウントリセット
          startButton.style.display = "inline-block"; // スタートボタンを再表示
        }
      });

      // 数字をカードに追加
      const p = document.createElement('p');
      p.innerText = numbers[i];
      elm.appendChild(p);

      // カードを画面に追加
      screen.appendChild(elm);
    }
  }

  // タイマーを更新する関数
  function updateTimer() {
    timeElapsed++;
    timerDisplay.innerText = `タイム: ${timeElapsed}秒`;
  }
};