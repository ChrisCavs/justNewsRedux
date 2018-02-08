import {checkForData} from './checkForData';
import {revealModal} from './revealModal';

let fixed = 'no';

function setup() {

  //check localStorage for data.  if there is data, generate the custom views
  checkForData();

  //add event listeners on menu within modal
  if (fixed == 'no') {

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

    Array.from(document.querySelectorAll('.accordian')).forEach(item => item.addEventListener('click', function () {

      //*****fix this so that it just toggles a class.  make sure that all the other panels are closed as well
      const panel = this.nextElementSibling;

      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
        panel.style.overflow = 'hidden';
      } else {
        panel.style.maxHeight = panel.scrollHeight + 'px';
        panel.style.overflow = 'scroll';
      }
    }));
    fixed = 'yes';
  }
}

document.addEventListener('DOMContentLoaded', setup);
