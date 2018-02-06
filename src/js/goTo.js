function goTo(key) {

  const currentContentDiv = document.querySelector('.active').classList;
  const targetContentDiv = document.querySelector(`.${key}`).classList;

  if (currentContentDiv[1] == targetContentDiv[1]) return;

  if (gridArray.indexOf(currentContentDiv[1]) < gridArray.indexOf(targetContentDiv[1])) {

    //move the two pieces left
    if (currentContentDiv.contains('move-right')) {
      currentContentDiv.toggle('move-right');
      currentContentDiv.toggle('active');
    } else {
      currentContentDiv.toggle('move-left');
      currentContentDiv.toggle('active');
    }
    if (targetContentDiv.contains('move-right')) {
      targetContentDiv.toggle('move-right');
      targetContentDiv.toggle('active');
    } else {
      targetContentDiv.toggle('move-left');
      targetContentDiv.toggle('active');
    }

  } else {

    //otherwise move them right
    if (currentContentDiv.contains('move-left')) {
      currentContentDiv.toggle('move-left');
      currentContentDiv.toggle('active');
    } else {
      currentContentDiv.toggle('move-right');
      currentContentDiv.toggle('active');
    }
    if (targetContentDiv.contains('move-left')) {
      targetContentDiv.toggle('move-left');
      targetContentDiv.toggle('active');
    } else {
      targetContentDiv.toggle('move-right');
      targetContentDiv.toggle('active');
    }
  }

  document.querySelector('.active-nav').classList.remove('active-nav');
  document.querySelector(`.nav-${key}`).classList.add('active-nav');

}
