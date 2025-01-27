{

function choosedRadio(){
    //どのラジオボタンがチェックされているか
    check_name = document.
}
const select = document.getElementsByClassName('which'); 
select.addEventListener('click',() =>{
    const selected = document.querySelector('which').choosed.value;
    if(selected.value='name'){
        // 要素を取得
        let element = document.getElementsByClassName('question-face');
        // display: noneを設定
        element.style.display = 'none';
    }
    else{
        // 要素を取得
        let element = document.getElementsByClassName('question-name');
        // display: noneを設定
        element.style.display = 'none';
    }
});

const selected = document.querySelector('which').choosed.value;
if(selected.value='name'){
    // 要素を取得
    let element = document.getElementsByClassName('question-face');
    // display: noneを設定
    element.style.display = 'none';
}
else{
    // 要素を取得
    let element = document.getElementsByClassName('question-name');
    // display: noneを設定
    element.style.display = 'none';
};





const start = document.getElementById('gamecontrol'); // 開始ボタン
const image = document.getElementById('icon'); // ロゴ画像

// スタートボタンをクリックしたら
start.addEventListener('click', () => {
    if(start.textContent === 'START'){
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
    }
});

}
