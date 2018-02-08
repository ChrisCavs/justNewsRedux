function goTo(key) {

  const gridArray = Array.from(document.querySelectorAll('nav button')).splice(-1,1);
  const currentContentDiv = document.querySelector('.active').classList;
  const targetContentDiv = document.querySelector(`.${key}`).classList;

  if (currentContentDiv[1] == targetContentDiv[1]) return;

  if (gridArray.indexOf(currentContentDiv[1]) < gridArray.indexOf(targetContentDiv[1])) {

    //move the two pieces left
    targetContentDiv.toggle('move-right');
    currentContentDiv.toggle('move-left');
  } else {

    //otherwise move them right
    targetContentDiv.toggle('move-left');
    currentContentDiv.toggle('move-right')
  }
  
  currentContentDiv.remove('active');
  targetContentDiv.add('active');

  document.querySelector('.active-nav').classList.remove('active-nav');
  document.querySelector(`.nav-${key}`).classList.add('active-nav');

}

export {goTo};
