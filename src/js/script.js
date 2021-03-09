{
  'use strict';

  const select = {
    templateOf: {
      bookCart: '#template-book'
    },
    containerOf: {
      booksList: '.books-list'
    },
    imageOf: {
      bookImage: '.book__image'
    }
  };

  const templates = {
    booksList: Handlebars.compile(document.querySelector(select.templateOf.bookCart).innerHTML),
  };

  const classNames = {
    favoriteBook: 'favorite'
  }

  function getElements() {
    const thisBooksList = this;

    thisBooksList.data = dataSource.books;
    thisBooksList.favoriteBooks = [];
    thisBooksList.bookContainer = document.querySelector(select.containerOf.booksList);
  }

  function render() {
    const thisBooksList = this;

    for (const book of thisBooksList.data) {
      const generatedHTML = templates.booksList(book);
      thisBooksList.element = utils.createDOMFromHTML(generatedHTML);
      const bookContainer = document.querySelector(select.containerOf.booksList);
      bookContainer.appendChild(thisBooksList.element);
    }
  }

  function initActions() {
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
  }

  getElements();
  render();
  initActions();
}
