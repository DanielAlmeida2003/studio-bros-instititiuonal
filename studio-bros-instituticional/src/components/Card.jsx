import React from 'react';

const ImageCard = ({ image, title, description }) => {
  return (
        <article class="card">
        <img
            class="card__background"
            src={image}
            alt={title}
            width="1920"
            height="2193"
        />
        <div class="card__content | flow">
            <div class="card__content--container | flow">
            <h2 class="card__title"> {title} </h2>
            <p class="card__description">
                description
            </p>
            </div>
            <button class="card__button">Read more</button>
        </div>
        </article>
  );
};

export default ImageCard;
