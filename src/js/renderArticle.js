function renderArticle(article) {

  //make sure the article has a title and description
  if (article.description == null || article.title == null) return;

  const destinationDiv = document.querySelector(`.content-grid .${article.source.id}`);
  destinationDiv.innerHTML += `
    <a class='article-grid' href='${article.url}' target='_blank'>
      <p class='article-title'>${article.title}</p>
      <p class='article-body'>${article.description}</p>
      <p class='article-time'>${article.publishedAt.slice(5,10) + ' at ' + article.publishedAt.slice(11,16) + ' - ' + article.source.name}</p>
    </a>
  `;
}

export {renderArticle};