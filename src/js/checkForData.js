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

    //add to gridArray
    gridArray.push(key);

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
    gridArray.push(key);

    //generate content-grid
    const newGrid = document.createElement('div');
    newGrid.classList.add('content-grid', key);
    document.querySelector('body').appendChild(newGrid);

    //create content divs for each source
    console.log(sourceObject[key]);
    sourceObject[key].forEach(source => {
      const contentDiv = document.createElement('div');
      contentDiv.classList.add('content', source);
      const contentDivH1 = document.createElement('h1');
      const contentDivH1Text = document.createTextNode(document.querySelector(`.modal-content .${source}`).innerHTML)
      contentDivH1.appendChild(contentDivH1Text);
      contentDiv.appendChild(contentDivH1);
      document.querySelector(`.${key}`).appendChild(contentDiv);

      //fetch data for each source
      fetchData(source);
    });

    //add edit and remove buttons
    const buttonDiv = document.createElement('div');
    const editViewButton = document.createElement('button');
    const editViewText = document.createTextNode('Edit View');
    const removeViewButton = document.createElement('button');
    const removeViewText = document.createTextNode('Remove View');

    editViewButton.appendChild(editViewText);
    editViewButton.classList.add('edit-view');
    removeViewButton.appendChild(removeViewText);
    removeViewButton.classList.add('remove-view');

    buttonDiv.classList.add('edit-remove-container');
    buttonDiv.appendChild(editViewButton);
    buttonDiv.appendChild(removeViewButton);

    document.querySelector(`.${key}`).appendChild(buttonDiv);

    //add eventlistener on edit and remove buttons
    document.querySelector(`.${key} .edit-view`).addEventListener('click', function () {
      revealModal(key);
    });
    document.querySelector(`.${key} .remove-view`).addEventListener('click', function () {
      delete sourceObject[key];
      let DATA = JSON.stringify(sourceObject);
      window.localStorage.setItem('Data', DATA);
      checkForData();
    })
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
