// 지정한 변수명과 속성명이 일치할 때 아래 코드 사용(중복되는 속성이 많을 때 사용하면 코드 간결) 
// const { body, createElement } = document; // 최신문법
// const body = document.body; 
// -> (document = 객체 / body = 속성 -> document라는 객체 안에 body라는 속성이 들어있음)
// const createElement = document.createElement;

const $table = document.createElement("table"); // <table> 생성
const $result = document.createElement("div");
const rows = []; // 큰 배열
let turn = "O"; // 플레이어 클릭값

// rows =
// [
//   [td, td*, td], (0)
//   [td, td, td], (1)
//   [td, td, td], (2)
// ]
// td*의 ri=0, ci=1

// 몇번째줄, 몇번째칸인지 찾는 함수
const checkWinner = (target) => { // target = 클릭된 td
  const rowIndex = target.parentNode.rowIndex; 
  // rowIndex는 td의 부모인 tr에서 꺼내올 수 있음
  const cellIndex = target.cellIndex; 
  // cellIndex는 td 태그가 이미 가지고 있는 속성
  // 기본 속성으로 변수를 저장해주면 아래처럼 반복문을 돌려 몇번째칸, 몇번째줄인지 알아내지 않아도 됨
  // rows.forEach((row, ri) => { // row = [td, td, td], ri = 0 (1, 2)
  //   // console.log(row, ri);
  //   row.forEach((cell, ci) => { // cell = <td></td><td>O</td><td></td>, ci = 0 (1, 2)
  //     // console.log(cell, ci);
  //     if(cell === target){
  //       rowIndex = ri; // 그 줄의 index를 rowIndex에 저장
  //       cellIndex = ci; // 그 칸의 index를 cellIndex에 저장
  //     }
  //   });
  // });
  // 세 칸 다 채워졌나
  let hasWinner = false; // 검사할 때는 항상 false로 지정(승자가 있을 때 true로 변경)
  // 가로줄 검사
  if( // 클릭한 모든 줄을 검사해서 turn이 모두 같으면
    rows[rowIndex][0].innerText === turn && // 첫번째줄 turn이 모두 같으면
    rows[rowIndex][1].innerText === turn && // 두번째줄
    rows[rowIndex][2].innerText === turn // 세번째줄
  ){
   hasWinner = true;
  }
  // 세로줄 검사
  if(
    rows[0][cellIndex].innerText === turn && // 첫번째칸 turn이 모두 같으면 
    rows[1][cellIndex].innerText === turn &&
    rows[2][cellIndex].innerText === turn
  ){
    hasWinner = true;
  }
  // 대각선 검사
  if(
    rows[0][0].innerText === turn &&
    rows[1][1].innerText === turn &&
    rows[2][2].innerText === turn
  ){
    hasWinner = true;
  }
  if(
    rows[0][2].innerText === turn &&
    rows[1][1].innerText === turn &&
    rows[2][0].innerText === turn
  ){
    hasWinner = true;
  }
  return hasWinner; // 승자가 있으면 true, 없으면 false
};

const checkWinnerAndDraw = (target) => {
  const hasWinner = checkWinner(target);
  // 승자가 있을 때
  if(hasWinner){
    // hasWinner가 true일 때 실행되는 코드
    $result.innerText = `${turn}님의 승리!`;
    $table.removeEventListener("click", playGame); // 승리 후 더 이상 클릭 안 되게
    return; // 게임종료
  }  // else 생략
  // 무승부일 때
  const draw = rows.flat().every((cell) => cell.innerText); // 셀의 모든 칸이 차 있으면
  // flat() = 2차원 배열을 1차원으로 변환
  // every = '모두 다 해당'되면 true, 아니라면 false
  // some = '하나라도 해당'되면 true, 아니라면 false
  // rows.forEach((row) => {
  //   row.forEach((cell) => {
  //     if(!cell.innerText){ // 비어있는 칸이 있다면
  //       draw= false;
  //     }
  //   });
  // });
  if(draw){
    $result.innerText = `무승부!`;
    return; // 게임종료
  }
  // 삼항연산자로 if문 줄이기
  // turn = turn === "O" ? "X" : "O";
  // 턴 넘기기
  if(turn === "O"){
    turn = "X";
  } else if(turn === "X"){
    turn = "O";
  }
};

let clickable = true; // setTimeout 함수의 버그 방지를 위해
const playGame = (e) => {
  // e.stopPropagation(); 이벤트 버블링 막기
  if(!clickable) return; // 클릭 못하는 경우 return으로 함수종료
  if(e.target.innerText) return; // 클릭한 곳에 이미 값이 있으면 return으로 함수종료
  e.target.innerText = turn;
  checkWinnerAndDraw(e.target); // 승리, 무승부 가리는 함수
  // 컴퓨터의 턴일 때
  if(turn === "X"){
    clickable = false;
    setTimeout(() => {
      const emptyCells = rows.flat().filter((v) => !v.innerText);
      const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      randomCell.innerText = "X";
      checkWinnerAndDraw(e.target);
      clickable = true; // 컴퓨터의 턴이 다 끝나면 다시 클릭할 수 있게
    }, 1000);
  }
};

// 이차원 배열은 반복문 안에 반복문이 많이 등장
// 변수로 i를 사용했으면 다음 변수는 j로 써줌
for(let i = 0; i < 3; i++){ // <tr> 태그 3번 생성 후 <table> 태그 안에 넣기
  const $tr = document.createElement("tr");
  const cells = []; // 작은 배열 3개
  $table.append($tr);
  for(let j = 0; j < 3; j++){ // <td> 태그 3번 생성 후 <tr> 태그 안에 넣기
    const $td = document.createElement("td");
    $tr.append($td);
    cells.push($td); // 작은 배열 안에 $td 3개 넣기, [td, td, td] 이걸 총 3줄로
  }
  rows.push(cells); // 큰 배열 안에 작은 배열 push
}
$table.addEventListener("click", playGame);
document.body.append($table);
document.body.append($result);

// 구조분해할당
// const obj = { 
//   a: 1, 
//   b: 2
// };

// const { a, b } = obj;
// const a = obj.a;
// // const { a } = obj;
// const b = obj.b;
// // const { b } = obj;

// const obj = {
//   a: "hello",
//   b: {
//     c: "hi",
//     d: { e: "wow" },
//   },
// };

// // a, c, e 속성을 구조분해 할당 문법으로 변수에 할당
// const { a, b: { c, d: { e } } } = obj;
// const a = obj.a;
// const c = obj.b.c;
// const e = obj.b.d.e;
