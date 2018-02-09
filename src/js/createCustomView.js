import {checkForData} from './checkForData';
import {goTo} from './goTo';

function createCustomView () {

  //if view does not have a name, give an alert
  if(document.querySelector('.viewName').value == '') {
    alert('Please give your view a name');
    return;
  }

  //if view name contains a space, give an alert
  if(Array.from(document.querySelector('.viewName').value.split('')).includes(' ')) {
    alert('View names cannot contain spaces');
    return;
  }

  //if view does not contain at least one source, alert
  if(document.querySelectorAll('.selected').length < 1) {
    alert('View must contain at least one source');
    return;
  }

  //assign sources data to a sourceArray with a sourceName
  let sourceName = document.querySelector('.viewName').value;
  let sourceArray = [];
  console.log(`sourceName: ${sourceName}`);


  Array.from(document.querySelectorAll('.selected')).forEach(item => {
    sourceArray.push(item.classList[1]);
  });

  console.log(`sourceArray: ${sourceArray}`);

  //hide the modal
  document.querySelector('.modal').style.display = 'none';

  //add sourceObject to localStorage
  let sourceObject = JSON.parse(window.localStorage.getItem('Data'));
  if (sourceObject == null) {
    sourceObject = {};
  }
  sourceObject[sourceName] = sourceArray;
  let DATA = JSON.stringify(sourceObject);
  window.localStorage.setItem('Data', DATA);

  //run checkforData to write new divs
  checkForData()
  goTo(sourceName);
}

export {createCustomView};
