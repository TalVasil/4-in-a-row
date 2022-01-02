let board = {
  length,
  width,
  howLong,
};
let playerTurn = true;
let numberOfPlays = 0;

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
  let currrentCellElement = document.getElementById(clickedCell.id);
  let cellNumber = cellToNumber(currrentCellElement);
  let numberOFCell = numberToCell(cellNumber);
  let usedCell = isFilled(clickedCell);
  let tempPlays = numberOfPlays;
  if(usedCell == true){currrentCellElement.onclick = null;}
  while(numberOfPlays==tempPlays){
    if(isFilled(document.getElementById('cell'+(cellNumber%board.length)))==flase){
      if (playerTurn == true) {
        currrentCellElement.style.backgroundColor = "blue";
        playerTurn = false;
      } else {
        currrentCellElement.style.backgroundColor = "red";
        playerTurn = true;
      }
      tempPlays++;
    }
    else if(isFilled(document.getElementById('cell'+((cellNumber%board.length)+board.length)))==flase){

    }
  }
  numberOfPlays++;
  if (playerTurn == true) {
    currrentCellElement.style.backgroundColor = "blue";
    playerTurn = false;
  } else {
    currrentCellElement.style.backgroundColor = "red";
    playerTurn = true;
  }
  return false;
}

function getUpperCell(cell){//returns the one above cell
  if ((cellToNumber(cell)+board.length)>(board.length*board.width)) return -1;
  return document.getElementById('cell'+(cellToNumber(cell)+board.length));
}

function isFilled(cell){//returns true if the cell is red || blue, false if empty
  let cellElement=document.getElementById(cell.id);
  if(cellElement.style.backgroundColor == "red" || cellElement.style.backgroundColor == "blue"){
    return true;
  }else return false;
}

function numberToCell(cell){//calls from a number to a specific cell
  return(document.getElementById('cell'+ cell));
} 

function cellToNumber(cell){//calls from a cell to a specific number
  return parseFloat(cell.id[4]);
}

function boardBuilder() {//bulides the board by the arguments of board (length * width = amount of cells)
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
