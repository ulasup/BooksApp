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

  function getElements() {
    const thisBooksList = this;

    thisBooksList.data = dataSource.books;
    thisBooksList.favoriteBooks = [];
    thisBooksList.bookContainer = document.querySelector(select.containerOf.booksList);
    thisBooksList.filters = [];
    thisBooksList.formFilter = document.querySelector(select.containerOf.form);
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

  function filterBooks() {
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

      filterBooks();
    });
  }

  getElements();
  render();
  initActions();
}
