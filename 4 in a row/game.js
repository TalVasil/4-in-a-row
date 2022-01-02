let board = {
  length,
  width,
  howLong,
};
let playerTurn = true;


form.addEventListener("submit", (e) => { //delete the form and calls boardBuilder func
  e.preventDefault();
  board.length = parseInt(document.getElementById("length").value, 10);
  board.width = parseInt(document.getElementById("width").value, 10);
  board.howLong = parseInt(document.getElementById("howLong").value, 10);
  let form = document.querySelector("form");
  form = document.getElementById("form");
  form.remove();
  boardBuilder();
});

function turn(clickedCell) {//make a turn (any time a click is clicked the function make the lowest blue or red dependes on the players turn boolean)
  let currrentCell = document.getElementById(clickedCell.id);
  let currrentCellColor = currrentCell.style.backgroundColor;
  let cellNumber = cellToNumber(currrentCell);
  let numberCell = numberToCell(cellNumber);
  if(currrentCellColor == "blue" || currrentCellColor == "red"){currrentCell.onclick = null;}
  // while(currrentCellColor != "blue" || currrentCellColor != "red"){
  //   if(numberToCell(cellNumber % board.length).style.backgroundColor != "blue" || 
  //     numberToCell(cellNumber % board.length).style.backgroundColor != "red"){
  //     if (playerTurn == true) {
  //       numberToCell(cellNumber % board.length).style.backgroundColor = "blue";
  //       playerTurn = false;
  //     } else {
  //       numberToCell(cellNumber % board.length).style.backgroundColor = "red";
  //       playerTurn = true;
  //     }
  //   }
  // }
  if (playerTurn == true) {
    currrentCell.style.backgroundColor = "blue";
    playerTurn = false;
  } else {
    currrentCell.style.backgroundColor = "red";
    playerTurn = true;
  }
  return false;
}

function numberToCell(cell){//calls from a number to a specific cell
  return(document.getElementById('cell'+ cell));
} 

function cellToNumber(cell){//calls from a cell to a specific number
  return parseFloat(cell.id[4]);
}

function boardBuilder() {//bulides the board by the arguments of board (length and width)
  document.getElementById("newGame").style.display = "inline-flex";
  let cell = document.getElementById('cell0');
  cell.id='cell'+ (board.length * board.width);
  cell.setAttribute("onclick", `turn(cell${(board.length * board.width)})`);
  cell.style.display = "inline-flex";
  document.body.appendChild(cell);
  for (i = 0; i < (board.length * board.width)-1; i++) {
    if(i%board.length-1==0 && i!=0){
      document.getElementById('cell'+ i).after(document.createElement('br'));
    }
    let clone = cell.cloneNode(true);
    clone.id = 'cell' + (i+1);
    document.body.appendChild(clone);
    cell.after(clone);
    document.getElementById('cell' + (1+i)).setAttribute("onclick", `turn(cell${i+1})`);
  }

}


function theme(){//change from light normal theme to dark theme
  if(document.getElementById("body").style.backgroundColor == "rgb(255, 255, 255)"){
    document.getElementById("body").style.backgroundColor = "rgb(0, 0, 0)";
    document.getElementById("body").style.borderColor = "rgb(255, 255, 255)";
    document.getElementById("body").style.color = "rgb(255, 255, 255)";  
    document.getElementById("h1").style.backgroundColor = "rgb(255, 255, 255)";
    document.getElementById("h1").style.color = "rgb(0, 0, 0)";
  }else{
    document.getElementById("body").style.backgroundColor = "rgb(255, 255, 255)";
    document.getElementById("body").style.borderColor = "rgb(0, 0, 0)";
    document.getElementById("body").style.color = "rgb(0, 0, 0)";  
    document.getElementById("h1").style.backgroundColor = "rgb(0, 0, 0)";
    document.getElementById("h1").style.color = "rgb(255, 255, 255)";
  }
}
function playAgain(){//makes the play again button
document.createElement(button[onclick="window.location.reload()"]);
document.body.appendChild();
}
