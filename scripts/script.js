const gameBackground = document.querySelector('.game-background');
const desert = document.createElement('div');
desert.classList.add("background");
gameBackground.appendChild(desert);


const dinosaur = document.querySelector(".dinosaur");

function handleKeyUp(event)
{
   if (this.jumping)
      return;

   if (event.keyCode === 32)
   {
      if (jumping)
         return;

      jumping = true;
      dinosaurJump();
   }
}
document.addEventListener('keyup', handleKeyUp);

let position = 0;
let jumping = false;
function dinosaurJump()
{
   const UP = 0;
   const DOWN = 1;
   const VELOCITY_UP = 2;
   const VELOCITY_DOWN = -1;

   let direction = UP;
   let jumpInterval = setInterval(() =>
   {
      if (position > 250)
         direction = DOWN;

      position += (direction === UP) ? VELOCITY_UP : VELOCITY_DOWN;

      if (position < 0)
      {
         position = 0;
         jumping = false;
         clearInterval(jumpInterval);
      }

      dinosaur.style.bottom = position + "px";

   }, 1);
}

let gameOver = false;
function createCactus()
{
   let cactusLeftPosition = 1000;
   const VELOCITY = 2;

   const gameBackground = document.querySelector('.game-background');
   const cactus = document.createElement('div');
   cactus.classList.add("cactus");
   cactus.style.left = cactusLeftPosition + 'px';
   gameBackground.appendChild(cactus);

   let leftInterval = setInterval(() =>
   {
      cactusLeftPosition -= VELOCITY;
      cactus.style.left = cactusLeftPosition + 'px';

      
      if (cactusLeftPosition < 60 && position < 60)
      {
         document.body.innerHTML = '<h1 class="game-over">Game Over</h1>'
         gameOver = true;
         clearInterval(leftInterval);
         return;
      }
      
      if (cactusLeftPosition < -60)
      {
         gameBackground.removeChild(cactus);
         clearInterval(leftInterval);
         return;
      }


   }, 10);

   if (!gameOver)
   {
      setTimeout(() =>
      {
         if(!gameOver)
            createCactus();
      }, Math.random() * 10000);   
   }   
}

createCactus();