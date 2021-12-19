let board = {
  length,
  width,
  howLong, 
}

//  if(window.Worker){window.alert("Hi, welcome!")}

form.addEventListener("submit", (e) => {
    e.preventDefault()
    board.length = parseInt((document.getElementById("length").value), 10);
    board.width =  parseInt((document.getElementById("width").value) , 10);
    board.howLong =  parseInt((document.getElementById("howLong").value), 10);
    let form = document.querySelector("form");
    if(board.length!=0){
      form = document.getElementById("form");
      form.remove();
      }
    makeCells();
});

let len = board.length;
let wid = board.width;
let i=0;
let j=0;
function makeCells(){
  
  let cell = document.createElement('div');
  cell.id = 'cell';
  cell.style.backgroundColor = 'red';
  cell.style.height = '75px';
  cell.style.width ='75px';
  cell.style.display = 'inline-flex';
  cell.style.margin = '10px';
  cell.innerText = 1;
  document.body.appendChild(cell);
 
  for(let i=0; i < len ; i++){
    for(let j=0; j < wid ; j++){
      const clone = cell.cloneNode();
      document.body.appendChild(clone);
    }
  }
}

// function boardBuilder(){
//   document.getElementById('afterEffect')+="hi";
// }

// function buildBoard(){
//   for(let i = 0 ; i < board.length;i++){
//     boardBuilder();
//   }
// }

// document.getElementById('afterEffect').innerHTML='hi';


