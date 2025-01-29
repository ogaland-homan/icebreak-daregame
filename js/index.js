'use strict'
{

const sysmember =[
    {"src":"./images/otakesan.webp","nickname":"おたけ","value":"otake"},
    {"src":"./images/riri-san.webp","nickname":"リリー","value":"riri-"},
    {"src":"./images/mossan.webp","nickname":"もっさん","value":"mossan"},
    {"src":"./images/shimopi-san.webp","nickname":"しもぴー","value":"shimopi-"},
    {"src":"./images/oga00385.jpg","nickname":"ななみん","value":"nanamin"},
    {"src":"./images/makottyan.webp","nickname":"まこっちゃん","value":"makottyan"},
    {"src":"./images/utti-san.webp","nickname":"うっちー","value":"utti-"},
    {"src":"./images/akuisan.webp","nickname":"だいちゃん","value":"daityan"},
    {"src":"./images/yoshiokasan.webp","nickname":"吉岡さん","value":"yoshiokasan"},
    {"src":"./images/nagayansan.webp","nickname":"ながやん","value":"nagayan"},
    {"src":"./images/oga00331.webp","nickname":"みっぴー","value":"mippi-"},
];
//ニックネームを回答するモード
let name_mode = true;
//顔を回答するモード
let face_mode = false;
//表示インデックス
let RandomIndex;
//問題数を格納 最終問題かの判定を行う
const question_length=sysmember.length;
//何問表示したかをカウント
let count=0;
//結果格納 
let result;
let correctCount;

//ニックネーム回答用格納変数
let nickname;
//正答格納用変数
let CorrectAnswer;
const gamecontrol = document.getElementById('gamecontrol'); // 開始ボタン
const image = document.getElementById('icon'); // ロゴ画像

const name_answer = document.getEle
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
        //１回目の抽選
        setQuestion();
        gamecontrol.textContent='OK';
    }
    else if(gamecontrol.textContent === 'OK'){
      console.log("OKボタンクリック");
      let answer=check_answer();
      result = judge(answer);
      console.log(result);
      displaydialog(result);
    };
});



//表示する問題をランダムに抽選する関数
function getRandomIndex(){
  RandomIndex=Math.floor(Math.random() * sysmember.length);
  return sysmember[RandomIndex];
};
//問題セット関数
function setQuestion(){
  if(name_mode){
    const question_image= document.getElementById('question-image');
    question_image.src=getRandomIndex().src;
  }
  else if(face_mode){
    console.log("顔回答モードです");
    const question_label= document.getElementById('question-label');
    question_label.textContent=getRandomIndex().nickname;
  };
  CorrectAnswer =sysmember[RandomIndex].value;
  console.log(CorrectAnswer);
  sysmember.splice(RandomIndex,1);
  count +=1;
  console.log(`現在：${count}問目です`);
  console.log(sysmember);
};
//回答で何が選択されているかチェックする関数
function check_answer(){
  console.log("関数に入ってきた");
  const name_option=document.getElementsByName("name-option");
  console.log(name_option);
  for(let i=0;i<name_option.length;i++){
    if(name_option[i].checked){
      return name_option[i].value;
    };
  };
};
//回答の正誤判定関数
function judge(Useranswer){
  console.log(CorrectAnswer);
  console.log(Useranswer);
  if(CorrectAnswer === Useranswer){
    console.log("正解です");
    return result=true;
  }
  else{
    console.log("不正解です");
    return result=false;
  };
};


//初期化
function formInit() {
    document.getElementById("question-name").style.display = "";
    document.getElementById("question-face").style.display = "none";
}

//ニックネームが選択されたときの処理
const name=document.getElementById("name");
name.addEventListener('click',()=>{
    //後でコンソール削除する
    console.log("click");
    name_mode = true;
    face_mode = false;
    document.getElementById("question-name").style.display = "";
    document.getElementById("question-face").style.display = "none";
});

//顔ボタンが選択されたときの処理
const face=document.getElementById("face");
face.addEventListener('click',()=>{
    console.log("click");
    name_mode = false;
    console.log(name_mode);
    face_mode = true;
    console.log(face_mode);
    document.getElementById("question-face").style.display = "";
        document.getElementById("question-name").style.display = "none";
});

// ----------------------------------------------------------------------------------

/* ============================================================
    要素一覧
============================================================ */

const dialog = document.getElementById("dialog");
const questionResult = document.getElementById("questionResult");
const result_japanese = document.getElementById("result_japanese");
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
  return count + 1 === question_length;
}

//結果表示処理
function setResult() {
  // 正解率を計算する
  const accuracyRate = Math.floor((correctCount / questionResult) * 100);
  // 正解率を表示する
  resultMessage.innerText = ` お疲れ様でした^^  
                              あなたの正解数は、 ${correctCount}/${question_length} 
                              おめでとうございます！`;
}

function displaydialog(result) {
  // すべての選択肢のボタンを無効化する
  // for (let i = 0; i < optionButtons.length; i++) {
  //   optionButtons[i].disabled = true;
  // }

  // // 選択肢のテキストを取得する
  // const optionText = event.target.innerText;
  // // 正解のテキストを取得する
  // const correctText = questions[questionIndex].correct;
  console.log("aaa");
  // 正解かどうかを判定する
  if (result === true) {
    correctCount++;
    console.log("ダイアログ表示");
    result_japanese.innerText ="正解です！！！";
    marubatu.innerText = "⭕️";
  } else {
    result_japanese.innerText ="不正解です！！！";
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
    // クイズの結果画面に結果を設定する
    setResult();
    // ダイアログを閉じる
    dialog.close();

    // クイズの結果画面を表示する
    resultPage.classList.remove("hidden");
  } else {
    // クイズの問題画面に問題を設定する
    setQuestion();

    // answer=check_answer();
    // judge(answer);
    
    // すべての選択肢のボタンを有効化する
    for (let i = 0; i < optionButtons.length; i++) {
      optionButtons[i].removeAttribute("disabled");
    }
    // ダイアログを閉じる
    dialog.close();
  }
}


window.addEventListener('change', formInit());


}