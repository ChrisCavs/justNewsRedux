let sourceObject = {}; //object of sourceArrays (1 for each custom view)

let gridArray = [];

let fixed = 'no';

document.addEventListener('DOMContentLoaded', setup);

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

  const dataToAdd = sourceObject[name];

  //fill in selected sources based on data
  if (dataToAdd !== undefined) {

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

function createCustomView () {

  //if view does not have a name, give an alert
  if(document.querySelector('.viewName').value == '') {
    alert('Please give your view a name');
    return;
  }

  //if view name contains a space, give an alert
  if(document.querySelector('.viewName').value.split('').includes(' ')) {
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

  Array.from(document.querySelectorAll('.selected')).forEach(item => {
    sourceArray.push(item.classList[1]);
  });

  //hide the modal
  document.querySelector('.modal').style.display = 'none';

  //add sourceObject to localStorage
  sourceObject[sourceName] = sourceArray;
  let DATA = JSON.stringify(sourceObject);
  window.localStorage.setItem('Data', DATA);

  //run checkforData to write new divs
  checkForData()
  goTo(sourceName);
}

function checkForData () {

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
  gridArray = [];

  //if there's no data, reveal intro page, then return
  if (window.localStorage.getItem('Data') == null || window.localStorage.getItem('Data') == '{}') {
    document.querySelector('.intro-screen').style.display = 'flex';
    return;
  };

  //otherwise, hide intro page
  document.querySelector('.intro-screen').style.display = 'none';

  //populate sourceObject with data
  sourceObject = JSON.parse(window.localStorage.getItem('Data'));

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
      goTo(key);
    });

    nav.appendChild(viewButton);
    gridArray.push(key);

    //generate content-grid
    const newGrid = document.createElement('div');
    newGrid.classList.add('content-grid', key);
    document.querySelector('body').appendChild(newGrid);

    //create content divs for each source
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
      setup();
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

function urlCreator (type, source) {
  const part1 = `https://newsapi.org/v2/${type}?`; //top-headlines, everything
  const part2 =  source; //q=bitcoin, sources=bbc-news, country=us
  const part3 = '&apiKey=f1e5704e50ab42bf909e1a1598498713'; //api key
  return (part1 + part2 + part3);
}

function fetchData (source) {

  fetch(urlCreator('top-headlines',`sources=${source}`)).then(item => item.json()).then(json => {
    Array.from(json.articles).forEach(renderArticle);
  });
}

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

function renderArticle(article) {

  //make sure the article has a title and description
  if (article.description == null || article.title == null) return;

  let articleDiv = document.createElement('a');
  let articleTitle = document.createElement('p');
  let articleBody = document.createElement('p');
  let articleTime = document.createElement('p');

  articleDiv.classList.add('article-grid');
  articleTitle.classList.add('article-title');
  articleBody.classList.add('article-body');
  articleTime.classList.add('article-time');

  let articleTitleText = document.createTextNode(article.title);
  let articleBodyText = document.createTextNode(article.description);
  let timeText = article.publishedAt.slice(5,10) + ' at ' + article.publishedAt.slice(11,16) + ' - ' + article.source.name;
  let articleTimeText = document.createTextNode(timeText);
  articleDiv.href = `${article.url}`;
  articleDiv.target = '_blank';

  articleTitle.appendChild(articleTitleText);
  articleBody.appendChild(articleBodyText);
  articleTime.appendChild(articleTimeText);

  articleDiv.appendChild(articleTitle);
  articleDiv.appendChild(articleBody);
  articleDiv.appendChild(articleTime);

  document.querySelector(`.content-grid .${article.source.id}`).appendChild(articleDiv);
}
