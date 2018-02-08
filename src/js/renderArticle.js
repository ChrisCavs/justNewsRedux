function renderArticle(article, key) {

  //make sure the article has a title and description
  if (article.description == null || article.title == null || article.urlToImage == null) return;

  const destinationDiv = document.querySelector(`.${key}`);
  destinationDiv.innerHTML += `
    <a class='article-grid' href='${article.url}' target='_blank'>
      <div class='article-image'><img src=${article.urlToImage}></div>
      <div class='article-content'>
        <p class='article-title'>${article.title.length > 70 ? article.title.slice(0,69) + '...' : article.title}</p>
        <p class='article-body'>${article.description.length > 140 ? article.description.slice(0,139) + '...' : article.description}</p>
        <p class='article-time'>${article.publishedAt.slice(5,10) + ' at ' + article.publishedAt.slice(11,16) + ' - ' + article.source.name}</p>
      </div>
    </a>
  `;
}

export {renderArticle};
