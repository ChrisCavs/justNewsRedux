function urlCreator (type, source) {
  const part1 = `https://newsapi.org/v2/${type}?`; //top-headlines, everything
  const part2 =  source; //q=bitcoin, sources=bbc-news, country=us
  const part3 = '&apiKey=f1e5704e50ab42bf909e1a1598498713'; //api key
  return (part1 + part2 + part3);
}
