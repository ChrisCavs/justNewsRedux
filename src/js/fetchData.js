function fetchData (source) {

  fetch(urlCreator('top-headlines',`sources=${source}`)).then(item => item.json()).then(json => {
    Array.from(json.articles).forEach(renderArticle);
  });
}
