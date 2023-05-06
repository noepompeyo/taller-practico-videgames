const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");


let canvasSize;
let elementsSize;
const playerPosition = {
  x: undefined,
  y: undefined
};
const giftPosition = {
  x: undefined,
  y: undefined
};
let enemyPositions = [];

window.addEventListener("load", setCanvasSize);
window.addEventListener("resize", setCanvasSize);

function setCanvasSize() {
  if (window.innerHeight < window.innerWidth) {
    canvasSize = window.innerWidth * 0.7;
  } else {
    canvasSize = window.innerHeight * 0.7;
  }

  canvas.setAttribute("width", canvasSize);
  canvas.setAttribute("height", canvasSize);

  elementsSize = canvasSize / 10;

  startGame();
}

function startGame() {
  console.log({ canvasSize, elementsSize });
  game.font = elementsSize + "px Verdana";
  game.textAlign = "end";
  
  const map = maps[0]
  const mapRows = map.trim().split('\n');
  const mapRowCol = mapRows.map(row => row.trim().split(''));

  enemyPositions = [];
  game.clearRect(0,0,canvasSize, canvasSize)

  mapRowCol.forEach((row, rowI) => {
    row.forEach((col, colI) => {
      const emoji = (emojis[col]);
      const posX = elementsSize * (colI + 1);
      const posY = elementsSize * (rowI +1) ;
      
      if (col == 'O') {
        if(!playerPosition.x && !playerPosition.y) {
        playerPosition.x = posX;
        playerPosition.y = posY
        console.log(playerPosition);
        }
      } else if (col == 'I') {
        giftPosition.x = posX 
        giftPosition.y = posY 
      } else if ( col == 'X') {
        enemyPositions.push({
          x: posY,
          y: posX
        })
      }


      game.fillText(emoji,posX, posY);

      // console.log({ row, rowI,col, colI});
    })
  });
  movePLayer();
  // for (let row = 1; row <= 10; row++) {
  //   for (let col = 0; col <= 10; col++) {
      
  //       game.fillText(emojis[mapRowCol[row - 1][col - 1]], elementsSize * col, elementsSize * row);
        
  //   }
  // }
}
function movePLayer() {
  const giftColitionX = playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3);
  const giftColitionY = playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3);
  const giftColition = giftColitionX && giftColitionY;

  if ( giftColition) {
    console.log('subiste de nivel');
  }
  const enemyColition = enemyPositions.find(enemy => {
    const enemyColitionX = enemy.x.toFixed(3) == playerPosition.x.toFixed(3);
    const enemyColitionY = enemy.y.toFixed(3) == playerPosition.y.toFixed(3);
    return enemyColitionX && enemyColitionY;
  });
  if (enemyColition) {
    console.log('Chocaste contra un enemigo');
  }
  game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}

window.addEventListener('keydown',moveByKeys)
const btnUp = document.querySelector('.up')
const btnLeft = document.querySelector('.left')
const btnRigth = document.querySelector('.rigth')
const btnDown = document.querySelector('.down')

btnUp.addEventListener('click', moveUp)
btnLeft.addEventListener('click', moveLeft)
btnRigth.addEventListener('click', moveRigth)
btnDown.addEventListener('click', moveDown)

function moveByKeys(event) {
  if( event.key === 'ArrowUp')  moveUp();
   else if ( event.key === 'ArrowLeft')  moveLeft();  
  else if ( event.key === 'ArrowRight')  moveRigth();  
  else if ( event.key === 'ArrowDown')  moveDown();  
}

function moveUp () {
  if((playerPosition.y - elementsSize) < (elementsSize - 25)) {
    console.log('OUT');
  } else{
  playerPosition.y -= elementsSize;
  startGame();
  }
}
function moveLeft () {
  if((playerPosition.x - elementsSize) < (elementsSize -25)) {
    console.log('OUT');
  } else{
  playerPosition.x -= elementsSize;
  startGame();
  }
}
function moveRigth () {
  if((playerPosition.x + elementsSize) > canvasSize ) {
    console.log('OUT');
  } else {
  console.log('mover hacia deracha');
  playerPosition.x += elementsSize;
  startGame();
  }
}
function moveDown () {
  if((playerPosition.y + elementsSize) > canvasSize ) {
    console.log('OUT');
  } else {
  console.log('mover hacia abajo');
  playerPosition.y += elementsSize;
  startGame();
  }
}