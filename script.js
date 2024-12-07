let currentIndex = 0;
const itemsPerPage = calculateItemsPerPage();
const container = document.querySelector('.container');
const isMobile = window.innerWidth <= 768;
displayArticles();
document.getElementById('next-article').addEventListener('click', () => {
  currentIndex += itemsPerPage;
  if (currentIndex >= articlesData.length) {
    currentIndex = 0;
  }
  displayArticles();
});

function calculateItemsPerPage() {
  const width = window.innerWidth;
  if (width > 1200) return 3;
  if (width > 768) return 2;
  return articlesData.length;
}

function displayArticles() {
  container.innerHTML = '';

  const start = currentIndex;
  const end = currentIndex + itemsPerPage;
  const currentItems = articlesData.slice(start, end);
  
  currentItems.forEach(doc => {
    const div = document.createElement('div');
    div.classList.add('news-item');

    div.innerHTML = `
      <img src="${doc.image}" alt="${doc.title}" class="news-image">
      <h3 class="news-title">${doc.title}</h3>
      <p class="news-description">${doc.description}</p>
      <button class="news-readmore">Read more</button>
    `;
    container.appendChild(div);
    if (window.innerWidth <= 768) {
      document.getElementById('next-article').style.display = 'none';
      container.style.flexDirection = 'column';
    } else {
      document.getElementById('next-article').style.display = 'block';
      container.style.flexDirection = 'row';
    }
    div.querySelector('.news-readmore').addEventListener('click', () => {
      loadFullArticle(doc.content, doc.js, div,isMobile);
    });
  });
}
function loadFullArticle(contentUrl, jsFile, parentElement, isMobile) {
  if (isMobile) {
    const originalContent = parentElement.innerHTML;

    const fullArticleContainer = document.createElement('div');
    fullArticleContainer.classList.add('full-article');

    const iframe = document.createElement('iframe');
    iframe.src = contentUrl;
    iframe.style.border = 'none';
    iframe.style.width = '100vh';
    iframe.style.height = '400px';

    fullArticleContainer.appendChild(iframe);
    parentElement.innerHTML = '';
    parentElement.appendChild(fullArticleContainer);

    const script = document.createElement('script');
    script.src = jsFile;
    document.body.appendChild(script);
    return;
  }

  const mainContainer = document.querySelector('main.main-container');
  if (!mainContainer) {
    console.error('404 content');
    return;
  }

  const fullArticleContainer = document.createElement('div');
  fullArticleContainer.classList.add('full-article');
  fullArticleContainer.style.width = '100%';
  fullArticleContainer.style.margin = '0 auto';
  fullArticleContainer.style.padding = '20px';
  fullArticleContainer.style.boxSizing = 'border-box';
  fullArticleContainer.style.backgroundColor = '#fff';
  fullArticleContainer.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';

  const iframe = document.createElement('iframe');
  iframe.src = contentUrl;
  iframe.style.border = 'none';
  iframe.style.width = '100%';
  iframe.style.height = 'auto';
  iframe.style.display = 'block';

  iframe.onload = () => {
    try {
      const iframeDocument = iframe.contentWindow.document;
      const contentHeight = iframeDocument.body.scrollHeight;
      iframe.style.height = `${contentHeight}px`;
    } catch (error) {
      console.warn('iframeの高さを動的に設定できませんでした:', error);
    }
  };

  fullArticleContainer.appendChild(iframe);

  const style = document.createElement('style');
  style.innerHTML = `
    .full-article iframe {
      background-color: #fff;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
    }
  `;
  fullArticleContainer.appendChild(style);

  mainContainer.insertAdjacentElement('afterend', fullArticleContainer);

  const script = document.createElement('script');
  script.src = jsFile;
  document.body.appendChild(script);
}

window.addEventListener('resize', () => {
  itemsPerPage = calculateItemsPerPage();
  displayArticles();
});
