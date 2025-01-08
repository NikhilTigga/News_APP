document.addEventListener('DOMContentLoaded', () => {
  const articlesPerPage = 20;
  let currentPage = 1;
  let articles = [];

  fetch("/api/news")
      .then(response => response.json())
      .then(data => {
        if(data && data.length>0){
            articles = data;
          displayArticles();
          setupPaginationControls();

        }else{
            console.log("No articles found.")
            document.getElementById('news').innerHTML = '<p><img src="../images/pagenotfound.jpg" width="100%" alt="Page not found"></p>';

        }
          
      })
      .catch(error => {
          console.error('Error fetching articles:', error);
      });

  function displayArticles() {
      const articleList = document.getElementById('articles-list');
      if (!articleList) {
          console.error('Error: articles-list element not found.');
          return;
      }
      articleList.innerHTML = ''; // Clear the list before adding new articles

      const startIndex = (currentPage - 1) * articlesPerPage;
      const endIndex = startIndex + articlesPerPage;
      const paginatedArticles = articles.slice(startIndex, endIndex);

      paginatedArticles.forEach(article => {
          const listItem = document.createElement('div');
          listItem.classList.add('col-md-4', 'mb-3'); // Add some margin for better spacing
          listItem.innerHTML = `
              <div class="card" style="width: 18rem;">
                  <img src="${article.urlToImage}" class="card-img-top" alt="...">
                  <div class="card-body">
                      <h5 class="card-title">${article.title}</h5>
                      <p class="card-text">${article.description}</p>
                      <a href="${article.url}" target="_blank" class="btn btn-primary">Read more</a>
                  </div>
              </div>
          `;
          articleList.appendChild(listItem);
      });
  }

  function setupPaginationControls() {
      const paginationControls = document.getElementById('pagination-controls');
      if (!paginationControls) {
          console.error('Error: pagination-controls element not found.');
          return;
      }
      paginationControls.innerHTML = ''; // Clear the pagination controls

      const totalPages = Math.ceil(articles.length / articlesPerPage);

      for (let i = 1; i <= totalPages; i++) {
          const pageItem = document.createElement('li');
          pageItem.classList.add('page-item');
          if (i === currentPage) {
              pageItem.classList.add('active');
          }
          pageItem.innerHTML = `
              <a class="page-link" href="#">${i}</a>
          `;
          pageItem.addEventListener('click', (e) => {
              e.preventDefault();
              currentPage = i;
              displayArticles();
              setupPaginationControls();
          });
          paginationControls.appendChild(pageItem);
      }
  }
});
