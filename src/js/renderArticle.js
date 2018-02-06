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
