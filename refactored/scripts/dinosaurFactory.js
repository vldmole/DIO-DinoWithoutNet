import GameElementFactory from "./GameElementFactory.js";

//-------------------------------------------------------------------------
function create(velocityUp, velocityDown)
{
   const dinosaur = GameElementFactory.create("dinosaur");
   const SPACEBAR_kEY_CODE = 32;

   let dinosaurJumping = false;

   //----------------------------------------------------
   function handleKeyDown(event)
   {
      if (dinosaurJumping)
         return;

      if (event.keyCode === SPACEBAR_kEY_CODE)
         dinosaurJump();
   }
   document.addEventListener('keydown', handleKeyDown);

   //-----------------------------------------------------
   function dinosaurJump()
   {
      const UP = 0;
      const DOWN = 1;
      let direction = UP;
      let dinosaurPosition = 0 + velocityUp;

      dinosaur.style.bottom = dinosaurPosition + "px";
      dinosaurJumping = true;

      let jumpInterval = setInterval(() =>
      {
         if (dinosaurPosition > 250)
            direction = DOWN;

         dinosaurPosition += (direction === UP) ? velocityUp : -velocityDown;

         if (dinosaurPosition < 0)
         {
            dinosaurPosition = 0;
            dinosaurJumping = false;
            clearInterval(jumpInterval);
         }

         dinosaur.style.bottom = dinosaurPosition + "px";
      }, 1);
   }

   //----------------------------------------------------
   return dinosaur;
}

//-------------------------------------------------------------------------
const DinosaurFactory = {
   create,
}
export default DinosaurFactory;
//-------------------------------------------------------------------------