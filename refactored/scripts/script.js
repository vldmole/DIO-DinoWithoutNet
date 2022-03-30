import DinosaurFactory from "./dinosaurFactory.js";
import GameElementFactory from "./GameElementFactory.js";


const CACTUS_VELOCITY = 2;
const DINOSSAUR_VELOCITY_UP = 2;
const DINOSSAUR_VELOCITY_DOWN = 1;

const dinosaur = DinosaurFactory.create(DINOSSAUR_VELOCITY_UP, DINOSSAUR_VELOCITY_DOWN);
const gameBackground = document.querySelector('.game-background');
const desertBackground = GameElementFactory.create("background");


let gameOver = false;
let cactusArray = [];

//-------------------------------------------------------------------------
function showGameOverMessage()
{
   document.body.innerHTML = '<h1 class="game-over">Game Over</h1>';
}

//-------------------------------------------------------------------------
function createCactus()
{
   if (gameOver)
      return;
   
   const cactus = GameElementFactory.create("cactus");
   cactus.style.left = window.screen.width + 'px'; 
   gameBackground.appendChild(cactus);
   cactusArray.push(cactus);
   
   let timeOut = setTimeout(() =>
   {
      createCactus();
      clearTimeout(timeOut);
   }, Math.random() * 10000);
}

//-------------------------------------------------------------------------
function moveAllCactus()
{
   for (let cactus of cactusArray)
   {
      const bRect = cactus.getBoundingClientRect()
      cactus.style.left = ( bRect.left - CACTUS_VELOCITY ) + 'px';
   }   
}

//-------------------------------------------------------------------------
function removeAllInvisibleCactus()
{
   cactusArray = cactusArray.filter(value => value.getBoundingClientRect().right > 0);
}

//-------------------------------------------------------------------------
function intersection(boundingRectA, boundingRectB)
{
   if (boundingRectA.bottom < boundingRectB.top)
      return false;
   
   if (boundingRectB.bottom < boundingRectA.top)
      return false;

   if (boundingRectA.right < boundingRectB.left)
      return false;
   
   if (boundingRectB.right < boundingRectA.left)
      return false;

   return true;
}

//-------------------------------------------------------------------------
function handleColisionsWithDinosaur()
{ 
   const dinosaurBoundingRect = dinosaur.getBoundingClientRect();
   
   const oldLength = cactusArray.length;

   cactusArray = cactusArray.filter(cactus =>
      !intersection(dinosaurBoundingRect, cactus.getBoundingClientRect()));

   gameOver = oldLength > cactusArray.length;
}

//-------------------------------------------------------------------------
function gameGo()
{
   createCactus();

   let cicleInterval = setInterval(() =>
   {
      moveAllCactus();
      
      handleColisionsWithDinosaur();
         
      removeAllInvisibleCactus();

      if (gameOver)
      {
         showGameOverMessage();
         clearInterval(cicleInterval);
      }  
   }, 10);
}
//-------------------------------------------------------------------------
gameGo();
//-------------------------------------------------------------------------