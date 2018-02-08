import {urlCreator} from './urlCreator';
import {renderArticle} from './renderArticle';

function fetchData (sources, key) {

  const sourcesToSentence = sources.join(',');

  fetch(urlCreator('everything',`sources=${sources}`)).then(item => item.json()).then(json => {
    Array.from(json.articles).forEach(article => renderArticle(article, key));
  });
}

export {fetchData};
