'use strict'
{

const sysmember =[
    {"image":"./images/otakesan.webp","nickname":"おたけ"},
    {"image":"./images/riri-san.webp","nickname":"リリー"},
    {"image":"./images/mossan.webp","nickname":"もっさん"},
    {"image":"./images/shimopi-san.webp","nickname":"しもぴー"},
    {"image":"./images/oga00385.jpg","nickname":"ななみん"},
    {"image":"./images/makottyan.webp","nickname":"まこっちゃん"},
    {"image":"./images/utti-san.webp","nickname":"うっちー"},
    {"image":"./images/akuisan.webp","nickname":"だいちゃん"},
    {"image":"./images/yoshiokasan.webp","nickname":"吉岡さん"},
    {"image":"./images/nagayansan.webp","nickname":"ながやん"},
    {"image":"./images/oga00331.webp","nickname":"みっぴー"},
];



const gamecontrol = document.getElementById('gamecontrol'); // 開始ボタン
const image = document.getElementById('icon'); // ロゴ画像
const name_answer = document.getElementsByName('name-option'); //名前回答
const face_answer = document.getElementsByName('face-option'); //顔回答

// スタートボタンをクリックしたらアイコンが動き出す
gamecontrol.addEventListener('click', () => {
    if(gamecontrol.textContent === 'START'){
        image.animate(
            // 途中の状態を表す配列
            [
                { transform: 'translateX(0)'}, // 開始時の状態（左端）
                { transform: 'translateX(1500px)' } // 終了時の状態（左端から200pxの位置）
            ], 
            // タイミングに関する設定
            {
                fill: 'forwards', // 再生後、最後の状態を保持
                duration: 60000, // 再生時間（1000ミリ秒）
            },
        );
        gamecontrol.textContent='OK';
    }
    else if(gamecontrol.textContent === 'OK'){
        if(nickname === question-name){
            
        }
    }
});

let nickname;
name_answer.addEventListener('click',()=>{
    nickname=name_answer.context; 
});


//初期化
function formInit() {
    document.getElementById("question-name").style.display = "";
    document.getElementById("question-face").style.display = "none";
}

//ニックネームが選択されたときの処理
const name=document.getElementById("name");
name.addEventListener('click',()=>{
    console.log("click");
    document.getElementById("question-name").style.display = "";
        document.getElementById("question-face").style.display = "none";
});

//顔ボタンが選択されたときの処理
const face=document.getElementById("face");
face.addEventListener('click',()=>{
    console.log("click");
    document.getElementById("question-face").style.display = "";
        document.getElementById("question-name").style.display = "none";
});

window.addEventListener('load', formInit());

// ----------------------------------------------------------------------------------

/* ============================================================
    要素一覧
============================================================ */

const dialog = document.getElementById("dialog");
const questionResult = document.getElementById("questionResult");
const nextButton = document.getElementById("nextButton");

/* ============================================================
    処理
============================================================ */

nextButton.addEventListener("click", clickNextButton);

/* ============================================================
    イベント関連の関数一覧
============================================================ */

function clickOptionButton(event) {
  // すべての選択肢のボタンを無効化する
  for (let i = 0; i < optionButtons.length; i++) {
    optionButtons[i].disabled = true;
  }

  // 選択肢のテキストを取得する
  const optionText = event.target.innerText;
  // 正解のテキストを取得する
  const correctText = questions[questionIndex].correct;

  // 正解かどうかを判定する
  if (optionText === correctText) {
    correctCount++;
    questionResult.innerText = "⭕️";
  } else {
    questionResult.innerText = "✖️";
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
    // クイズの結果画面に結果を設定する
    setResult();
    // ダイアログを閉じる
    dialog.close();
    // スタート画面を非表示にする
    startPage.classList.add("hidden");
    // クイズの問題画面を非表示する
    questionPage.classList.add("hidden");
    // クイズの結果画面を表示する
    resultPage.classList.remove("hidden");
  } else {
    questionIndex++;
    // クイズの問題画面に問題を設定する
    setQuestion();
    // すべての選択肢のボタンを有効化する
    for (let i = 0; i < optionButtons.length; i++) {
      optionButtons[i].removeAttribute("disabled");
    }
    // ダイアログを閉じる
    dialog.close();
  }
}

}