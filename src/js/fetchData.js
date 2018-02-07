import {urlCreator} from './urlCreator';
import {renderArticle} from './renderArticle';

function fetchData (source, limit) {

  fetch(urlCreator('everything',`sources=${source}`)).then(item => item.json()).then(json => {
    let count = 0;
    if (count < limit) {
      Array.from(json.articles).forEach(article => {
        count++;
        renderArticle(article);
      });
    };
  });
}

export {fetchData};
