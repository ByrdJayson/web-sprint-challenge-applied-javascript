import axios from 'axios';

const Card = (article) => {
  // TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  //
  // <div class="card">
  //   <div class="headline">{ headline }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ authorPhoto }>
  //     </div>
  //     <span>By { authorName }</span>
  //   </div>
  // </div>
  //
  const {
    headline,
    authorPhoto,
    authorName
  } = article;

  const cardDiv = document.createElement('div');
  const headlineDiv = document.createElement('div');
  const authorDiv = document.createElement('div');
  const imgContainer = document.createElement('div');
  const img = document.createElement('img');
  const authorSpan = document.createElement('span');



  cardDiv.appendChild(headlineDiv);
  cardDiv.appendChild(authorDiv);
  authorDiv.appendChild(imgContainer);
  imgContainer.appendChild(img);
  authorDiv.appendChild(authorSpan);

  cardDiv.classList.add('card');
  headlineDiv.classList.add('headline');
  authorDiv.classList.add('author');
  imgContainer.classList.add('img-container');

  headlineDiv.textContent = headline;
  img.src = authorPhoto;
  authorSpan.textContent = `By ${authorName}`;

  cardDiv.addEventListener('click', function(){
    console.log(headline);
  })

  return cardDiv

}

const cardAppender = (selector) => {
  // TASK 6
  // ---------------------
  // Implement this function that takes a css selector as its only argument.
  // It should obtain articles from this endpoint: `http://localhost:5000/api/articles` (test it in Postman/HTTPie!).
  // However, the articles do not come organized in a single, neat array. Inspect the response closely!
  // Create a card from each and every article object in the response, using the Card component.
  // Append each card to the element in the DOM that matches the selector passed to the function.
  //
  axios.get(`http://localhost:5000/api/articles`)
    .then(res => {

      const {
        articles
      } = res.data;

      const entryPoint = document.querySelector(selector);


       // I know we aren't allowed to ask about the sprints, so I figured
       // I might ask here. Is there a cleaner way to do what I'm doing below?
       // It feels sort of hacky and If I needed each article to contain their
       // category, I think I would be in trouble.

      Object.values(articles).forEach((category) => {
        category.forEach((article) => {
          entryPoint.appendChild(Card(article));
        });

      });

    })
    .catch(err => {
      console.error(err);
    })

}

export {
  Card,
  cardAppender
}
