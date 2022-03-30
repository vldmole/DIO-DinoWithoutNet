const gameBackground = document.querySelector('.game-background');

//-------------------------------------------------------------------------
function create(cssClass)
{
   const element = document.createElement('div');
   element.classList.add(cssClass);
   gameBackground.appendChild(element);
   return element;
}

//-------------------------------------------------------------------------
const GameElementFactory = {
   create,
}
export default GameElementFactory;
