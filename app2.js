const $table = document.createElement("table");
const $result = document.createElement("div");
const rows = []; // [td, td, td] 배열 3줄을 담는 큰 배열
let turn = "O";

// 가로, 세로, 대각선의 turn이 모두 같을 때 승리
const checkWinner = (target) => { // target = td
  const rowIndex = target.parentNode.rowIndex; // tr의 index(0, 1, 2줄)
  const cellIndex = target.cellIndex; // td의 index(0, 1, 2칸)
let hasWinner = false; // 승자가 있으면 hasWinner = true;
  if( // 가로줄 turn 일치 검사
    rows[rowIndex][0].innerText === turn &&
    rows[rowIndex][1].innerText === turn &&
    rows[rowIndex][2].innerText === turn
    ){
      hasWinner = true;
    }
  if( // 세로줄 turn 일치 검사
    rows[0][cellIndex].innerText === turn &&
    rows[1][cellIndex].innerText === turn &&
    rows[2][cellIndex].innerText === turn
  ){
    hasWinner = true;
  }
  if( // 대각선 turn 일치 검사
    rows[0][0].innerText === turn &&
    rows[1][1].innerText === turn &&
    rows[2][2].innerText === turn
  ){
    hasWinner = true;
  }if( // 반대 대각선 turn 일치 검사
    rows[0][2].innerText === turn &&
    rows[1][1].innerText === turn &&
    rows[2][0].innerText === turn
  ){
    hasWinner = true;
  }
  return hasWinner; // 승자가 있으면 return true, 없으면 return false
};

// 승리, 무승부를 가리는 함수
const checkWinnerAndDraw = (target) => {
  const hasWinner = checkWinner(target); // true, false 값 반환
  if(hasWinner){ // 승자가 있으면
    $result.innerText = `🎉 ${turn}님의 승리! 🎉`;
    $table.removeEventListener("click", playGame);
    return;
  } 
  // 무승부이면(칸이 모두 다 차있는 경우)
  const draw = rows.flat().every((cell) => cell.innerText);
  // every 메서드 = 모든 조건이 true면 true 반환
  // 모든 칸에 innerText가 있을 때 true를 반환
  if(draw){
    $result.innerText = `무승부!`;
    return;
  }
  // 턴 넘기기
  if(turn === "O"){
    turn = "X";
  } else if(turn === "X"){
    turn = "O";
  }
};

let clickable = true; // 컴퓨터 턴일 때 클릭을 막기 위해
const playGame = (e) => {
  if(!clickable) return; // 클릭 못하는 경우 아래 코드 종료
  if(e.target.innerText){ // 칸 안에 입력값이 있으면 함수 종료
    return;
  } else {
    e.target.innerText = turn;
    checkWinnerAndDraw(e.target);
    if(turn === "X"){ // 컴퓨터의 턴일 경우
      clickable = false;
      setTimeout(() => { // 1초 뒤에 빈칸 중 랜덤으로 하나를 골라 X를 표시
        const emptyCells = rows.flat().filter((value) => !value.innerText);
        // innerText가 없는 칸을 추려서 emptyCells에 저장
        const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        randomCell.innerText = "X";
        checkWinnerAndDraw(e.target);
        clickable = true;
      }, 1000);
    }
  }
};

// 3x3 테이블 만드는 코드 (이차원 배열 - 배열 안에 배열)
for(let i = 0; i < 3; i++){
  const $tr = document.createElement("tr");
  const cells = []; // [td, td, td] 1줄
  $table.append($tr);
  for(let j = 0; j < 3; j++){
    const $td = document.createElement("td");
    $tr.append($td);
    cells.push($td);
  }
  rows.push(cells);
}

$table.addEventListener("click", playGame);
document.body.appendChild($table);
document.body.appendChild($result);
