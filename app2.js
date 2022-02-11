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

const playGame = (e) => {
  if(e.target.innerText){ // 칸 안에 입력값이 있으면 return으로 함수 종료
    return;
  } else {
    e.target.innerText = turn;
    checkWinner(e.target); // 승부 판단하는 함수
    if(turn === "O"){
      turn = "X";
    } else if(turn === "X"){
      turn = "O";
    }
  }
};

// 3x3 테이블 만드는 코드
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
