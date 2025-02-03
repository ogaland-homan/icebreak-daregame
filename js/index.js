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
  let name_mode = true;
  //顔を回答するモード
  let face_mode = false;
  //表示インデックス
  let RandomIndex;
  //問題数を格納 最終問題かの判定を行う
  const question_length = sysmember.length;
  //何問表示したかをカウント
  let count = 0;
  //結果格納 
  let result;
  let correctCount = 0;

  //正答格納用変数
  let CorrectAnswer;
  const gamecontrol = document.getElementById('gamecontrol'); // 開始ボタン
  const image = document.getElementById('icon'); // ロゴ画像

  let accuracyRate; //正解率
  let animation; //アニメーション

  // スタートボタンをクリックしたらアイコンが動き出す
  gamecontrol.addEventListener('click', () => {
    if (gamecontrol.textContent === 'START') {
      startAnimation();
      //１回目の抽選
      setQuestion();
      //ボタン表示変更
      gamecontrol.textContent = 'OK';
      //成績欄を非表示
      document.getElementById('performance').style.display = "none";
    }
    else if (gamecontrol.textContent === 'OK') {
      let answer = check_answer();
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
  function getRandomIndex() {
    RandomIndex = Math.floor(Math.random() * sysmember.length);
    return sysmember[RandomIndex];
  };
  //問題セット関数
  function setQuestion() {
    if (name_mode) {
      const question_image = document.getElementById('question-image');
      question_image.src = getRandomIndex().src;
    }
    else if (face_mode) {
      const question_label = document.getElementById('question-label');
      question_label.textContent = getRandomIndex().nickname;
    };
    CorrectAnswer = sysmember[RandomIndex].value;
    sysmember.splice(RandomIndex, 1);
    count += 1;
  };
  //回答で何が選択されているかチェックする関数
  function check_answer() {
    const name_option = document.getElementsByName("name-option");
    const face_option = document.getElementsByName("face-option");
    console.log(name_option);
    console.log(face_option);
    if (name_mode) {
      for (let i = 0; i < name_option.length; i++) {
        if (name_option[i].checked) {
          return name_option[i].value;
        };
      };
    };
    if (face_mode) {
      for (let i = 0; i < face_option.length; i++) {
        if (face_option[i].checked) {
          return face_option[i].value;
        };
      };
    };
  };
  //回答の正誤判定関数
  function judge(Useranswer) {
    if (CorrectAnswer === Useranswer) {
      return result = true;
    }
    else {
      return result = false;
    };
  };


  //初期化
  function formInit() {
    document.getElementById("question-name").style.display = "";
    document.getElementById("question-face").style.display = "none";
    load(); //ローカルストレージ読込
    displayScores(); //成績表示
  }

  //ニックネームが選択されたときの処理
  const name = document.getElementById("name");
  name.addEventListener('click', () => {
    name_mode = true;
    face_mode = false;
    document.getElementById("question-name").style.display = "";
    document.getElementById("question-face").style.display = "none";
  });

  //顔ボタンが選択されたときの処理
  const face = document.getElementById("face");
  face.addEventListener('click', () => {
    name_mode = false;
    face_mode = true;
    document.getElementById("question-face").style.display = "";
    document.getElementById("question-name").style.display = "none";
  });

  // ----------------------------------------------------------------------------------

  /* ============================================================
      要素一覧
  ============================================================ */

  const dialog = document.getElementById("dialog");
  const questionResult = document.getElementById("questionResult");
  const result_message = document.getElementById("result_message");
  const nextButton = document.getElementById("nextButton");

  /* ============================================================
      処理
  ============================================================ */

  nextButton.addEventListener("click", clickNextButton);

  /* ============================================================
      イベント関連の関数一覧
  ============================================================ */
  // 問題が最後まで行ったかどうかを判定する
  function isQuestionEnd() {
    return count === question_length;
  }

  //結果表示処理
  function setResult() {
    // 正解率を計算する
    accuracyRate = Math.floor((correctCount / question_length) * 100);
    // 正解率を表示する
    result_message.innerText = "お疲れ様でした^^";
    result_message.style.fontSize = "28px";
    marubatu.innerText = `あなたの正解数は、\n ${correctCount}/${question_length}\n おめでとうございます！`;
    nextButton.innerText = "閉じる";
    result_message.style.color = " #0a5a7a";
    marubatu.style.fontSize = "28px";
    marubatu.style.color = " #0a5a7a";


    dialog.showModal();
  }

  function displaydialog(result) {
    // 正解かどうかを判定する
    if (result === true) {
      correctCount++;
      result_message.innerText = "正解です！！！";
      result_message.style.color = "#de2956";
      marubatu.innerText = "⭕️";
    } else {
      result_message.innerText = "不正解です！！！";
      result_message.style.color = "#785dc8";
      marubatu.innerText = "✖️";
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
  //ローカルストレージ-------------------------------------------------------------------
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
    const nowscore = accuracyRate + "%(" + correctCount + "問/" + question_length + "問)";
    let mydata = {
      date: nowDate,
      score: nowscore
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