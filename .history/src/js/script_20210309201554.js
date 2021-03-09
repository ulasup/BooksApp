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

  function render() {
    const thisBooksList = this;
    thisBooksList.data = dataSource.books;

    for (const book of thisBooksList.data) {
      const generatedHTML = templates.booksList(book);
      console.log('generatedHTML: ', generatedHTML);
      thisBooksList.element = utils.createDOMFromHTML(generatedHTML);
      const bookContainer = document.querySelector(select.containerOf.booksList);
      bookContainer.appendChild(thisBooksList.element);
    }
  }

  render();
}
