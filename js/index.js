'use strict'
{

  const sysmember = [
    { "src": "./images/otakesan.webp", "nickname": "おたけ", "value": "otake" },
    { "src": "./images/riri-san.webp", "nickname": "リリー", "value": "riri-" },
    { "src": "./images/mossan.webp", "nickname": "もっさん", "value": "mossan" },
    { "src": "./images/shimopi-san.webp", "nickname": "しもぴー", "value": "shimopi-" },
    { "src": "./images/oga00385.jpg", "nickname": "ななみん", "value": "nanamin" },
    { "src": "./images/makottyan.webp", "nickname": "まこっちゃん", "value": "makottyan" },
    { "src": "./images/utti-san.webp", "nickname": "うっちー", "value": "utti-" },
    { "src": "./images/akuisan.webp", "nickname": "だいちゃん", "value": "daityan" },
    { "src": "./images/yoshiokasan.webp", "nickname": "吉岡さん", "value": "yoshiokasan" },
    { "src": "./images/nagayansan.webp", "nickname": "ながやん", "value": "nagayan" },
    { "src": "./images/oga00331.webp", "nickname": "みっぴー", "value": "mippi-" },
  ];
  //ニックネームを回答するモード
  let nicknameMode = true;
  //顔を回答するモード
  let faceMode = false;
  //表示インデックス
  let randomIndex;
  //問題数を格納 最終問題かの判定を行う
  const questionLength = sysmember.length;
  //何問表示したかをカウント
  let count = 0;
  //結果格納 
  let result;
  //正解数カウント
  let correctCount = 0;
  //正答格納用
  let correctAnswer;
  //正解率
  let accuracyRate; 
  //アニメーション
  let animation;

  const gameControl = document.getElementById('gameControl'); // 開始ボタン
  const image = document.getElementById('icon'); // ロゴ画像
  
  // スタートボタンをクリックしたらアイコンが動き出す
  gameControl.addEventListener('click', () => {
    if (gameControl.textContent === 'START') {
      startAnimation();
      //１回目の抽選
      setQuestion();
      //ボタン表示変更
      gameControl.textContent = 'OK';
      //成績欄を非表示
      document.getElementById('performance').style.display = "none";
      return;
    };
    if (gameControl.textContent === 'OK') {
      let answer = check_answer();
      if(answer === undefined){
        alert("選択してください");
        return;
      };
      result = judge(answer);
      displaydialog(result);
    };
  });

  //アニメーションを開始する関数
  function startAnimation() {
    animation = image.animate(
      // 途中の状態を表す配列
      [
        { transform: 'translateX(0)' }, // 開始時の状態（左端）
        { transform: 'translateX(1500px)' } // 終了時の状態（左端から200pxの位置）
      ],
      // タイミングに関する設定
      {
        fill: 'forwards', // 再生後、最後の状態を保持
        duration: 60000, // 再生時間（1000ミリ秒）
      },
    );
  }

  //アニメーションを停止する関数
  function stopAnimation() {
    if (animation) {
      animation.pause(); //一時停止
    }
  }

  //表示する問題をランダムに抽選する関数
  function getrandomIndex() {
    randomIndex = Math.floor(Math.random() * sysmember.length);
    return sysmember[randomIndex];
  };

  //問題セット関数
  function setQuestion() {
    if (nicknameMode) {
      const questionImage = document.getElementById('question-image');
      questionImage.src = getrandomIndex().src;
    };
    if (faceMode) {
      const questionLabel = document.getElementById('question-label');
      questionLabel.textContent = getrandomIndex().nickname;
    };
    correctAnswer = sysmember[randomIndex].value;
    sysmember.splice(randomIndex, 1);
    count += 1;
  };

  //回答で何が選択されているかチェックする関数
  function check_answer() {
    const nicknameOption = document.getElementsByName("nickname-option");
    const faceOption = document.getElementsByName("face-option");
    if (nicknameMode) {
      for (let i = 0; i < nicknameOption.length; i++) {
        if (nicknameOption[i].checked) {
          return nicknameOption[i].value;
        };
      };
    };
    if (faceMode) {
      for (let i = 0; i < faceOption.length; i++) {
        if (faceOption[i].checked) {
          return faceOption[i].value;
        };
      };
    };
  };
  //回答の正誤判定関数
  function judge(Useranswer) {
    if (correctAnswer === Useranswer) {
      return result = true;
    }
    else {
      return result = false;
    };
  };

  //初期化
  function formInit() {
    document.getElementById("question-nickname").style.display = "";
    document.getElementById("question-face").style.display = "none";
    load(); //ローカルストレージ読込
    displayScores(); //成績表示
  }

  //ニックネームが選択されたときの処理
  const nickname = document.getElementById("nickname");
  nickname.addEventListener('click', () => {
    nicknameMode = true;
    faceMode = false;
    document.getElementById("question-nickname").style.display = "";
    document.getElementById("question-face").style.display = "none";
  });

  //顔ボタンが選択されたときの処理
  const face = document.getElementById("face");
  face.addEventListener('click', () => {
    nicknameMode = false;
    faceMode = true;
    document.getElementById("question-face").style.display = "";
    document.getElementById("question-nickname").style.display = "none";
  });

  //ダイアログ関連
  const dialog = document.getElementById("dialog");
  const resultMessage = document.getElementById("result_message");
  const nextButton = document.getElementById("nextButton");

  nextButton.addEventListener("click", clickNextButton);

  // 最終問題かどうかを判定する
  function isQuestionEnd() {
    return count === questionLength;
  }

  //結果表示処理
  function setResult() {
    // 正解率を計算する
    accuracyRate = Math.floor((correctCount / questionLength) * 100);
    // 正解率を表示する
    resultMessage.innerText = `お疲れ様でした^^ \n あなたの正解数は、\n ${correctCount}問/${questionLength}問`;
    resultMessage.style.fontSize = "24px";
    if(accuracyRate >= 80){
      result_shape.innerText = `おめでとうございます!!`;
    }
    if((accuracyRate < 80) && (accuracyRate >= 60)){
      result_shape.innerText = `まずまずです！`;
    }
    if(accuracyRate < 60){
      result_shape.innerText = `もう少し頑張りましょう。`;
    }
    nextButton.innerText = "閉じる";
    resultMessage.style.color = " #ff7800";
    result_shape.style.fontSize = "24px";
    result_shape.style.color = " #ff7800";
    dialog.showModal();
  }

  function displaydialog(result) {
    // 正解かどうかを判定する
    if (result === true) {
      correctCount++;
      resultMessage.innerText = "正解です!!";
      resultMessage.style.color = "#de2956";
      result_shape.innerText = "⭕️";
    } else {
      resultMessage.innerText = "不正解です!!";
      resultMessage.style.color = "#785dc8";
      result_shape.innerText = "✖️";
    }
    // 最後の問題かどうかを判定する
    if (isQuestionEnd()) {
      nextButton.innerText = "結果を見る";
    } else {
      nextButton.innerText = "次の問題へ";
    }
    // ダイアログを表示する
    dialog.showModal();
  }

  function clickNextButton() {
    if (isQuestionEnd()) {
      //最終問題かつ結果表示までされているとき
      if (nextButton.innerText == "閉じる") {
        dialog.close();
        save();  //ローカルストレージに保存
        location.reload(); //リロード
      }
      else {
        //アニメーションを一時停止
        stopAnimation();
        // クイズの結果画面に結果を設定する
        setResult();
      }
    } else {
      // クイズの問題画面に問題を設定する
      setQuestion();
      dialog.close();
    };
  }

  let resultList = [];

  //ローカルストレージ関連
  // 読込
  function load() {
    let mydata = "";
    if (!localStorage.getItem('mydata')) {
      mydata = "データがありません";
    } else {
      let storageValue = localStorage.getItem('mydata');
      let jsonData = JSON.parse(storageValue);
      resultList = jsonData;
    }
  }

  // 保存
  function save() {
    const nowDate = new Date().toLocaleDateString();
    const nowScore = accuracyRate + "%(" + correctCount + "問/" + questionLength + "問)";
    let mydata = {
      date: nowDate,
      score: nowScore
    };
    resultList.push(mydata);
    //JSON文字列に変換
    mydata = JSON.stringify(resultList);
    localStorage.setItem('mydata', mydata);
  }

  //成績一覧表表示
  function displayScores() {
    const scoreList = document.getElementById('scoreList');
    scoreList.innerHTML = '';//テーブルをクリアする
    resultList.forEach((result) => {
      const row = document.createElement('tr');
      const dateCell = document.createElement('td');
      const scoreCell = document.createElement('td');
      dateCell.textContent = result.date;
      scoreCell.textContent = result.score;
      row.appendChild(dateCell);
      row.appendChild(scoreCell);
      scoreList.appendChild(row);
    });
    //グラフ更新
    uppdateChart();
  }

  //グラフ更新
  function uppdateChart() {
    //2次元の描画コンテキストを取得
    let ctx = document.getElementById("scoreChart").getContext("2d");
    //グラフを作成
    let scoreChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: resultList.map(result => result.date),
        datasets: [{
          label: '正解率',
          data: resultList.map(result => parseInt(result.score)),
          backgroundColor: "#0a5a7a",
          borderColor: "#0a5a7a",
          borderWidth: 5
        }]
      },
      options: {
        scales: {
          y: {
            min: 0,
            max: 100,
            beginAtZero: true
          }
        },
        // 目盛ラベル
        ticks: {
          //目盛ラベルの色
          color: 'blue',
          //目盛ラベルのフォントサイズ
          fontSize: 18,
          //1メモリの大きさ
          stepSize: 5,
          //メモリラベルに背景色を表示するか否か
          showLabelBackdrop: true,
          //メモリラベルの背景色
          backdropColor: '#ddf',
        },
        grid: {
          // 軸線
          borderColor: 'white',
          borderWidth: 2,
          drawBorder: true,
          // 目盛線＆グリッド線
          color: '#080',
          display: true,
          // グリッド線
          borderDash: [3, 3],
          borderDashOffset: 0,
          // 目盛線
          drawTicks: true,
          tickColor: 'red',
          tickLength: 10,
          tickWidth: 2,
          tickBorderDash: [2, 2],
          tickBorderDashOffset: 0,
        },
        maintainAspectRatio: false,
        responsive: false,
      }
    });
  }

  window.addEventListener('load', formInit());

}