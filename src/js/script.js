{
  'use strict';

  const select = {
    templateOf: {
      bookCart: '#template-book'
    },
    containerOf: {
      booksList: '.books-list',
      form: '.filters'
    },
    imageOf: {
      bookImage: '.book__image'
    }
  };

  const templates = {
    booksList: Handlebars.compile(document.querySelector(select.templateOf.bookCart).innerHTML),
  };

  const classNames = {
    favoriteBook: 'favorite',
    hidden: 'hidden'
  };

  class BookList {
    constructor() {
      const thisBooksList = this;

      thisBooksList.data = dataSource.books;
      thisBooksList.favoriteBooks = [];
      thisBooksList.filters = [];

      thisBooksList.render();
      thisBooksList.getElements();
      thisBooksList.initActions();
    }

    getElements() {
      const thisBooksList = this;

      thisBooksList.bookContainer = document.querySelector(select.containerOf.booksList);
      thisBooksList.formFilter = document.querySelector(select.containerOf.form);
    }

    render() {
      const thisBooksList = this;

      for (const book of thisBooksList.data) {
        const rating = book.rating;
        book.ratingBgc = thisBooksList.determineRatingBgc(rating);
        book.ratingWidth = rating * 10;

        const generatedHTML = templates.booksList(book);
        thisBooksList.element = utils.createDOMFromHTML(generatedHTML);
        const bookContainer = document.querySelector(select.containerOf.booksList);
        bookContainer.appendChild(thisBooksList.element);
      }
    }

    filterBooks() {
      const thisBooksList = this;

      for (const book of dataSource.books){
        let shouldBeHidden = false;

        for(const filter of thisBooksList.filters){
          if (!book.details[filter]) {
            shouldBeHidden = true;
            break;
          }
        }

        if (shouldBeHidden == true){
          const bookImage = document.querySelector('.book__image[data-id="' + book.id + '"]');
          bookImage.classList.add(classNames.hidden);
        } else {
          const bookImage = document.querySelector('.book__image[data-id="' + book.id + '"]');
          bookImage.classList.remove(classNames.hidden);
        }
      }
    }

    initActions() {
      const thisBooksList = this;

      thisBooksList.bookContainer.addEventListener('dblclick', function(event){
        event.preventDefault();

        const clickedElement = event.target.offsetParent;

        if(!clickedElement.classList.contains(select.imageOf.bookImage)) {
          const bookId = clickedElement.getAttribute('data-id');

          if(!clickedElement.classList.contains(classNames.favoriteBook)){
            thisBooksList.favoriteBooks.push(bookId);
            clickedElement.classList.add(classNames.favoriteBook);
          }
          else {
            thisBooksList.favoriteBooks.splice(thisBooksList.favoriteBooks.indexOf(bookId), 1);
            clickedElement.classList.remove(classNames.favoriteBook);
          }
        }
      });

      thisBooksList.formFilter.addEventListener('change', function (event) {
        event.preventDefault();

        const clickedElement = event.target;

        if (clickedElement.type === 'checkbox') {
          if (clickedElement.checked) {
            thisBooksList.filters.push(clickedElement.value);
          } else {
            const idOfFilter = thisBooksList.filters.indexOf(clickedElement.value);
            thisBooksList.filters.splice(idOfFilter, 1);
          }
        }

        thisBooksList.filterBooks();
      });
    }

    determineRatingBgc(rating){
      let background = '';

      if(rating <= 6) {
        background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      } else if(rating > 6 && rating <= 8) {
        background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      } else if(rating > 8 && rating <= 9) {
        background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      } else if (rating > 9) {
        background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      }
      return background;
    }

  }

  const app = {
    init: function(){
      new BookList();
    }
  };

  app.init();
}
