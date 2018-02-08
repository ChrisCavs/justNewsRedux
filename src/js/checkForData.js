import {goTo} from './goTo';
import {revealModal} from './revealModal';
import {fetchData} from './fetchData';

const checkForData = () => {

  //detele all content-grids
  let contentGrids = document.querySelectorAll('.content-grid');
  if (contentGrids.length > 0) {
    Array.from(contentGrids).forEach(grid => grid.parentNode.removeChild(grid));
  }

  //delete nav items
  let navItems = document.querySelectorAll('nav button');
  if (navItems.length > 0) {
    Array.from(navItems).forEach(item => item.parentNode.removeChild(item));
  }

  //empty the gridArray
  let gridArray = [];

  //if there's no data, reveal intro page, then return
  if (window.localStorage.getItem('Data') == null || window.localStorage.getItem('Data') == '{}') {
    document.querySelector('.intro-screen').style.display = 'flex';
    document.querySelector('.create-custom').addEventListener('click', function () {
      revealModal('');
    });
    return;
  };

  //otherwise, hide intro page
  document.querySelector('.intro-screen').style.display = 'none';

  //populate sourceObject with data
  let sourceObject = JSON.parse(window.localStorage.getItem('Data'));

  //get keys, then write divs
  Object.keys(sourceObject).forEach(key => {

    //add to nav
    const nav = document.querySelector('nav');
    const viewButton = document.createElement('button');
    const viewButtonText = document.createTextNode(key);
    viewButton.appendChild(viewButtonText);
    viewButton.classList.add(`nav-${key}`);

    viewButton.addEventListener('click', function() {
      goTo(key, gridArray);
    });

    nav.appendChild(viewButton);

    //generate content-grid
    const newGrid = document.createElement('div');
    newGrid.classList.add('content-grid', key);
    document.querySelector('body').appendChild(newGrid);

    //fetch data for each source
    fetchData(sourceObject[key], key);

    //add edit and remove buttons
    const targetGrid = document.querySelector(`.${key}`);
    console.log(targetGrid);
    targetGrid.innerHTML += `
      <div class='edit-remove-container'>
        <button class='edit-view'>Edit View</button>
        <button class='remove-view'>Remove View</button>
      </div>`;

    //add eventlistener on edit and remove buttons
    targetGrid.querySelector('.edit-view').addEventListener('click', () => {
      revealModal(key);
    });
    targetGrid.querySelector(`.remove-view`).addEventListener('click', () => {
      delete sourceObject[key];
      let DATA = JSON.stringify(sourceObject);
      window.localStorage.setItem('Data', DATA);
      checkForData();
    });
  });

  //hide all but the first view
  const navButtons = document.querySelector('nav').getElementsByTagName('button');
  navButtons[0].classList.add('active-nav');

  Array.from(navButtons).forEach(nav => {

    const associatedDiv = document.querySelector(`.${nav.classList[0].slice(4)}`);

    if (navButtons[0] == nav) {
      associatedDiv.classList.add('active');
    } else {
      associatedDiv.classList.add('move-right');
    }
  });

  //add + button to nav
  const newViewButton = document.createElement('button');
  const newViewButtonText = document.createTextNode('+');
  newViewButton.appendChild(newViewButtonText);
  newViewButton.addEventListener('click', function() {
    revealModal('');
  });
  document.querySelector('nav').appendChild(newViewButton);
}

export {checkForData};
