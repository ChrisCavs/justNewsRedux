import {createCustomView} from './createCustomView';

function revealModal (name) {

  if (name == '') {

    //clear out selected items
    Array.from(document.querySelector('.selections').getElementsByTagName('p')).forEach(item => {
      item.parentNode.removeChild(item);
    });

    //empty the viewname
    document.querySelector('.viewName').value = '';
  }

  //reveal it
  document.querySelector('.modal').style.display = 'block';

  let sourceObject = JSON.parse(window.localStorage.getItem('Data'));

  //fill in selected sources based on data
  if (sourceObject !== null && !== {}) {

    const dataToAdd = sourceObject[name];

    //first, clear out selected items
    Array.from(document.querySelector('.selections').getElementsByTagName('p')).forEach(item => {
      item.parentNode.removeChild(item);
    });

    //then write new sources
    dataToAdd.forEach(item => {

      const referenceItem = document.querySelector(`.modal-content .${item}`);

      const newP = document.createElement('p');
      const newText = document.createTextNode(referenceItem.innerHTML);
      newP.appendChild(newText);
      newP.classList.add('selected',referenceItem.classList[1]);
      document.querySelector('.selections').appendChild(newP);

      //add listeners to remove these items
      Array.from(document.querySelectorAll('.selected')).forEach(item => item.addEventListener('click', function () {
        item.parentNode.removeChild(item);
      }));
    });

    //fill in the view name on modal
    document.querySelector('.viewName').value = name;
  }
console.log(sourceObject);
  //add event listeners on buttons
  document.querySelector('.add-selections').addEventListener('click', createCustomView);
  document.querySelector('.cancel').addEventListener('click', function () {
    document.querySelector('.modal').style.display = 'none';
  });

  //add listeners on each source
  Array.from(document.querySelectorAll('.modal-content p')).forEach(item => item.addEventListener('click', addToSelected));

  function addToSelected () {

    //check if it is already selected
    let skip = false;
    if (document.querySelector('.selected') !== null) {
      Array.from(document.querySelectorAll('.selected')).forEach(p => {
        if (p.classList.contains(this.classList[1])) {
          skip = true;
        }
      });
    }
    if (skip) return;

    //create a matching element in the "selections" div
    const newP = document.createElement('p');
    const newText = document.createTextNode(this.innerHTML);
    newP.appendChild(newText);
    newP.classList.add('selected',this.classList[1]);
    document.querySelector('.selections').appendChild(newP);

    //when clicked, selected sources are removed
    Array.from(document.querySelectorAll('.selected')).forEach(item => item.addEventListener('click', function () {
      item.parentNode.removeChild(item);
    }));
  }
}

export {revealModal};
