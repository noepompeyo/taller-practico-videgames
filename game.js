const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

window.addEventListener('load', startGame);

function startGame () {
    game.fillRect(0,50,100,100);
    // game.clearRect(50,50,50,100);
   game.font = '30px Verdana';
    game.fillStyle = 'purple'; 
    game.textAlign = 'start'; 
    game.fillText('platzi', 50, 50)
}