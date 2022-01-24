let board = {
  //object that gets the inputs from the form in the page
  length,
  width,
  // howLong,-+-+-+-+-+-+--+-+-+-+-+-+--+-+-+-+-+-+--+-+-+-+-+-+--+-+-+-+-+-+--+-+-+-+-+-+--+-+-+-+-+-+--+-+-+-+-+-+-
  gameMat: [],
  didntWon:0,
};
let playerTurn = true;
//boolean that represents the turn (true == blue || false == red)

function matBuilder(gameMat) {
  //builds a mat similar to the board while the first cell = board.gameMat[0][0]
  for (let i = 0; i < board.length; i++) {
    let col = [];
    for (let j = 0; j < board.width; j++) {
      col.push(0);
    }
    gameMat.push(col);
  }
}

form.addEventListener("submit", (e) => {
  //delete the form and calls boardBuilder func
  e.preventDefault();
  board.length = parseInt(document.getElementById("length").value, 10);
  board.width = parseInt(document.getElementById("width").value, 10);
  // board.howLong = parseInt(document.getElementById("howLong").value, 10);-+-+-+-+-+-+--+-+-+-+-+-+--+-+-+-+-+-+-
  let form = document.querySelector("form");
  form = document.getElementById("form");
  form.remove();
  matBuilder(board.gameMat);
  boardBuilder();
});

function boardBuilder() {
  //bulides the board by the arguments of board object
  document.getElementById("newGame").style.display = "inline-flex";
  let cell = document.getElementById("cell0");
  cell.id = "cell" + board.length * board.width;
  cell.setAttribute("onclick", `turn(cell${board.length * board.width})`);
  cell.style.display = "inline-flex";
  document.body.appendChild(cell);
  for (i = 0; i < board.length * board.width - 1; i++) {
    if ((i % board.width) - 1 == 0 && i != 0) {
      document.getElementById("cell" + i).before(document.createElement("br"));
    }
    let clone = cell.cloneNode(true);
    clone.id = "cell" + (i + 1);
    document.body.appendChild(clone);
    cell.before(clone);
    document
      .getElementById("cell" + (1 + i))
      .setAttribute("onclick", `turn(cell${i + 1})`);
  }
}

function turn(clickedCell) {
  //onClick function - whenever the cell gets clicked the func will "drop" a blue or red to the right spot
  let cell = cellToNumber(clickedCell.id);
  cell = refactorCell(cell);
  let currentCell = numberToCell(cell);
  while (isFilled(currentCell) == false) {
    cell = refactorCell(cell);
    filler(cell);
    let ifWon = winnigCondition();
    isDraw(ifWon);
  }
    if (playerTurn == true) playerTurn = false;
    else playerTurn = true;
}

function filler(cell) {
  //gets a number of the cell and fills it by the boolean playerTurn
  let currentCell = numberToCell(cell);
  if (playerTurn == true) {
    currentCell.style.backgroundColor = "blue";
    board.gameMat[elemntToMatConvertor(currentCell)[0]][
      elemntToMatConvertor(currentCell)[1]
    ] = 1;
  } else {
    currentCell.style.backgroundColor = "red";
    board.gameMat[elemntToMatConvertor(currentCell)[0]][
      elemntToMatConvertor(currentCell)[1]
    ] = 2;
  }
}

function elemntToMatConvertor(cell) {
  //this func gets cell element and returns an array that represent his to his cell inside the mat
  //(placeInArray[row][col][board.gameMat[col][row]])
  let placeInCol = cellToNumber(cell.id);
  let placeInLine = 0;
  let placeInMat = [];
  if (placeInCol <= board.width) {
    placeInMat.push(0);
    placeInMat.push(placeInCol - 1);
    placeInMat.push(board.gameMat[0][placeInCol - 1]);
    return placeInMat;
  } else {
    while (placeInCol > board.width) {
      placeInCol -= board.width;
      placeInLine++;
    }
    placeInMat.push(placeInLine);
    placeInMat.push(placeInCol - 1);
    placeInMat.push(board.gameMat[placeInLine][placeInCol - 1]);
    return placeInMat;
  }
}

function isFilled(cell) {
  //gets element and returns true if the cell on mat is red || blue, false if empty
  if (elemntToMatConvertor(cell)[2] == 0) {
    return false;
  } else return true;
}

function numberToCell(cell) {
  //gets a number and returns his cell elemet
  return document.getElementById("cell" + cell);
}

function cellToNumber(cell) {
  //gets a cell elemet id reurn his number
  if (cell.length == 5) {
    return parseFloat(cell[4]);
  } else if (cell.length == 6) {
    return parseFloat(cell[4]) * 10 + parseFloat(cell[5]);
  } else return 100;
}

function refactorCell(cell) {
  //this function gets number of the clicked cell and return the number of next empty cell in the collum
  while (
    cell + board.width <= board.length * board.width ||
    cell + board.width < 0
  ) {
    if (isFilled(numberToCell(cell + board.width)) == false) {
      //under cell not filled
      cell += board.width;
    } else if (isFilled(numberToCell(cell + board.width)) == true) {
      //under cell is filled
      return cell;
    } else if (isFilled(cell) == true) {
      console.log(cell);
      //this cell is filled
      cell -= board.width;
      console.log(cell);
    }
  }
  return cell;
}

function winnigCondition() {
  for (i = board.length - 1; i >= 0; i--) {
    for (j = board.width - 1; j >= 0; j--) {
      if (
        //4 in a collum
        i >= 3 &&
        board.gameMat[i][j] == board.gameMat[i - 1][j] &&
        board.gameMat[i][j] == board.gameMat[i - 2][j] &&
        board.gameMat[i][j] == board.gameMat[i - 3][j]
      ) {
        if (board.gameMat[i][j] == 1) {
          window.alert("blue wins!");
          newGame();
          return true;
        } else if (board.gameMat[i][j] == 2) {
          window.alert("red wins!");
          newGame();
          return true;
        }
      } else if (
        //4 in a line
        j >= 3 &&
        board.gameMat[i][j] == board.gameMat[i][j - 1] &&
        board.gameMat[i][j] == board.gameMat[i][j - 2] &&
        board.gameMat[i][j] == board.gameMat[i][j - 3]
      ) {
        if (board.gameMat[i][j] == 1) {
          window.alert("blue wins!");
          newGame();
          return true;
        } else if (board.gameMat[i][j] == 2) {
          window.alert("red wins!");
          newGame();
          return true;
        }
      } else if (
        //4 in a diagonal
        i >= 3 &&
        j >= 3 &&
        board.gameMat[i][j] == board.gameMat[i - 1][j - 1] &&
        board.gameMat[i][j] == board.gameMat[i - 2][j - 2] &&
        board.gameMat[i][j] == board.gameMat[i - 3][j - 3]
      ) {
        if (board.gameMat[i][j] == 1) {
          window.alert("blue wins!");
          newGame();
          return true;
        } else if (board.gameMat[i][j] == 2) {
          window.alert("red wins!");
          newGame();
          return true;
        }
      } else if (
        //4 in a reversed diagonal
        i >= 3 &&
        j <= board.width - 3 &&
        board.gameMat[i][j] == board.gameMat[i - 1][j + 1] &&
        board.gameMat[i][j] == board.gameMat[i - 2][j + 2] &&
        board.gameMat[i][j] == board.gameMat[i - 3][j + 3]
      ) {
        if (board.gameMat[i][j] == 1) {
          window.alert("blue wins!");
          newGame();
          return true;
        } else if (board.gameMat[i][j] == 2) {
          window.alert("red wins!");
          newGame();
          return true;
        }
      }
    }
  }
  return false;
}

function isDraw(ifWon){
  //checks if there is a draw
  if(ifWon==false){
    board.didntWon++;
  }
  if(board.didntWon==(board.length*board.width)){
    window.alert("Draw - no winner");
    newGame();
  }
} 

function newGame() {
  //ask you by the window if you want to play again if you answer yes open another window with the new game
  let popUp = window.confirm("Play again?");
  if (popUp == true) {
    window.open("4-In-Line-Menu.html");
    setTimeout(window.close(), 250);
  }
}

function theme() {
  //toggle from light normal theme to dark theme
  let background = document.getElementById("body");
  if (
    window.getComputedStyle(background).backgroundColor == "rgb(255, 255, 255)"
  ) {
    document.getElementById("body").style.backgroundColor = "rgb(0, 0, 0)";
    document.getElementById("body").style.borderColor = "rgb(255, 255, 255)";
    document.getElementById("body").style.color = "rgb(255, 255, 255)";
    document.getElementById("h1").style.backgroundColor = "rgb(255, 255, 255)";
    document.getElementById("h1").style.color = "rgb(0, 0, 0)";
  } else {
    document.getElementById("body").style.backgroundColor =
      "rgb(255, 255, 255)";
    document.getElementById("body").style.borderColor = "rgb(0, 0, 0)";
    document.getElementById("body").style.color = "rgb(0, 0, 0)";
    document.getElementById("h1").style.backgroundColor = "rgb(0, 0, 0)";
    document.getElementById("h1").style.color = "rgb(255, 255, 255)";
  }
}
