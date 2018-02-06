import {urlCreator} from './urlCreator';
import {renderArticle} from './renderArticle';

function fetchData (source) {

  fetch(urlCreator('everything',`sources=${source}`)).then(item => item.json()).then(json => {
    Array.from(json.articles).forEach(renderArticle);
  });
}

export {fetchData};