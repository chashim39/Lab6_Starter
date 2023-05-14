// RecipeCard.js

class RecipeCard extends HTMLElement {
  // Called once when document.createElement('recipe-card') is called, or
  // the element is written into the DOM directly as <recipe-card>
  // shadowElement;
  // articleElement;
  // articleElement;

  constructor() {
    super(); // Inheret everything from HTMLElement

    // EXPOSE - START (All expose numbers start with A)
    // A1. TODO - Attach the shadow DOM to this Web Component (leave the mode open)
    // A2. TODO - Create an <article> element - This will hold our markup once our data is set
    // A3. TODO - Create a style element - This will hold all of the styles for the Web Component
    // A4. TODO - Insert all of the styles from cardTemplate.html into the <style> element you just made
    // A5. TODO - Append the <style> and <article> elements to the Shadow DOM
    this.shadowElement = this.attachShadow({mode:'open'}); //A1
    this.articleElement = document.createElement('article'); //A2
    this.styleElement = document.createElement('style'); //A3
    this.styleElement.textContent = `
      * {
        font-family: sans-serif;
        margin: 0;
        padding: 0;
      }

      a {
        text-decoration: none;
      }

      a:hover {
        text-decoration: underline;
      }

      article {
        align-items: center;
        border: 1px solid rgb(223, 225, 229);
        border-radius: 8px;
        display: grid;
        grid-template-rows: 118px 56px 14px 18px 15px 36px;
        height: auto;
        row-gap: 5px;
        padding: 0 16px 16px 16px;
        width: 178px;
      }

      div.rating {
        align-items: center;
        column-gap: 5px;
        display: flex;
      }

      div.rating>img {
        height: auto;
        display: inline-block;
        object-fit: scale-down;
        width: 78px;
      }

      article>img {
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        height: 118px;
        object-fit: cover;
        margin-left: -16px;
        width: calc(100% + 32px);
      }

      p.ingredients {
        height: 32px;
        line-height: 16px;
        padding-top: 4px;
        overflow: hidden;
      }

      p.organization {
        color: black !important;
      }

      p.title {
        display: -webkit-box;
        font-size: 16px;
        height: 36px;
        line-height: 18px;
        overflow: hidden;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      p:not(.title),
      span,
      time {
        color: #70757A;
        font-size: 12px;
      }
    `;  //A4
    this.shadowElement.append(this.articleElement); //A5
    this.shadowElement.append(this.styleElement);
  }

  /**
   * Called when the .data property is set on this element.
   *
   * For Example:
   * let recipeCard = document.createElement('recipe-card'); // Calls constructor()
   * recipeCard.data = { foo: 'bar' } // Calls set data({ foo: 'bar' })
   *
   * @param {Object} data - The data to pass into the <recipe-card>, must be of the
   *                        following format:
   *                        {
   *                          "imgSrc": "string",
   *                          "imgAlt": "string",
   *                          "titleLnk": "string",
   *                          "titleTxt": "string",
   *                          "organization": "string",
   *                          "rating": number,
   *                          "numRatings": number,
   *                          "lengthTime": "string",
   *                          "ingredients": "string"
   *                        }
   */
  set data(data) {
    // If nothing was passed in, return
    if (!data) return;

    // A6. TODO - Select the <article> we added to the Shadow DOM in the constructor
    // A7. TODO - Set the contents of the <article> with the <article> template given in
    //           cardTemplate.html and the data passed in (You should only have one <article>,
    //           do not nest an <article> inside another <article>). You should use Template
    //           literals (tempalte strings) and element.innerHTML for this.
    let foodImageElement = document.createElement('img');
    foodImageElement.src = data["imgSrc"];
    foodImageElement.alt = data["imgAlt"];
    this.articleElement.append(foodImageElement);

    let titleElement = document.createElement('p');
    titleElement.className = "title";
    let titleHyperlinkElement = document.createElement('a');
    titleHyperlinkElement.href = data["titleLnk"];
    titleHyperlinkElement.textContent = data["titleTxt"];
    titleElement.append(titleHyperlinkElement);
    this.articleElement.append(titleElement);

    let organizationElement = document.createElement('p');
    organizationElement.className = "organization";
    organizationElement.textContent = data["organization"];
    this.articleElement.append(organizationElement);

    let ratingElement = document.createElement('div');
    ratingElement.className = "rating";
    let starRatingText = document.createElement('span');
    starRatingText.textContent = data["rating"];
    ratingElement.append(starRatingText);
    let ratingImg = document.createElement('img');
    if (data["rating"] == 5) {
      ratingImg.src = "./assets/images/icons/5-star.svg";
      ratingImg.alt = "5 stars";
    }
    else if (data["rating"] == 4) {
      ratingImg.src = "./assets/images/icons/4-star.svg";
      ratingImg.alt = "4 stars";
    }
    else if (data["rating"] == 3) {
      ratingImg.src = "./assets/images/icons/3-star.svg";
      ratingImg.alt = "3 stars";
    }
    else if (data["rating"] == 2) {
      ratingImg.src = "./assets/images/icons/2-star.svg";
      ratingImg.alt = "2 stars";
    }
    else if (data["rating"] == 1) {
      ratingImg.src = "./assets/images/icons/1-star.svg";
      ratingImg.alt = "1 stars";
    }
    else {
      ratingImg.src = "./assets/images/icons/0-star.svg";
      ratingImg.alt = "0 stars";
    }
    ratingElement.append(ratingImg);
    let numberRatingsText = document.createElement('span');
    numberRatingsText.textContent = '(' + data["numRatings"] + ')';
    ratingElement.append(numberRatingsText);
    this.articleElement.append(ratingElement);

    let timeElement = document.createElement('time');
    timeElement.textContent = data["lengthTime"];
    this.articleElement.append(timeElement);

    let ingredientsElement = document.createElement('p');
    ingredientsElement.className = "ingredients";
    ingredientsElement.textContent = data["ingredients"];
    this.articleElement.append(ingredientsElement);

    
  }
}

// A8. TODO - Define the Class as a customElement so that you can create
//           'recipe-card' elements
customElements.define('recipe-card', RecipeCard); //A8
