import {checkForData} from './checkForData';
import {revealModal} from './revealModal';

function setup() {

  //check localStorage for data.  if there is data, generate the custom views
  checkForData();

  //add event listeners on menu within modal
  document.querySelector('.edit-view').addEventListener('click', () => {

    const currentViewContent = document.querySelector('.active');
    const currentViewKey = document.querySelector('.active').classList[1];

    revealModal(currentViewKey);
  });

  document.querySelector('.remove-view').addEventListener('click', () => {

    let sourceObject = JSON.parse(window.localStorage.getItem('Data'));
    const currentViewKey = document.querySelector('.active').classList[1];

    delete sourceObject[currentViewKey];
    let DATA = JSON.stringify(sourceObject);
    window.localStorage.setItem('Data', DATA);

    checkForData();
  })

  //add listeners on accordians
  Array.from(document.querySelectorAll('.accordian')).forEach(item => item.addEventListener('click', function () {

    const thisPanel = this.nextElementSibling;
    const allPanels = Array.from(document.querySelectorAll('.panel'));

    //remove panel-active class from all panels
    allPanels.forEach(panel => panel.classList.contains('panel-active') ? panel.classList.remove('panel-active') : null);

    //add panel-active class on click
    thisPanel.classList.add('panel-active');
  }));
}

document.addEventListener('DOMContentLoaded', setup);
