import {checkForData} from './checkForData';
import {revealModal} from './revealModal';

let fixed = 'no';

function setup() {

  //check localStorage for data.  if there is data, generate the custom views
  checkForData();

  //if there is no data: show intro page, add event listener on create-custom
  document.querySelector('.create-custom').addEventListener('click', function () {
    revealModal('');
  });

  //add event listeners on menu within modal
  if (fixed == 'no') {

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
