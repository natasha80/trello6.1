/* eslint-disable linebreak-style */
/* eslint-disable func-names */
/* eslint-disable linebreak-style */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable camelcase */
/* eslint-disable quote-props */
/* eslint-disable comma-dangle */
/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable prefer-const */
/* eslint-disable semi */
/* eslint-disable dot-notation */
/* eslint-disable linebreak-style */

import Form from './addForm';
import Card from './Card';
import DnD from './DnD';

const addForm = new Form();
const addCard = document.querySelectorAll('.add-card-container');

const allCardsArr = [];

function makeNewCard(title, list) {
  const newCard = new Card(title);
  allCardsArr.push(newCard);
  allCardsArr.forEach((item, index) => {
    item.id = index;
  });
  newCard.createNewCard(newCard, list, allCardsArr);
}

addCard.forEach((item) => {
  item.addEventListener('click', () => {
    const parent = item.closest('.list-container');
    const list = parent.querySelector('.list');

    const form = addForm.createForm();
    parent.appendChild(form);
    addForm.closeForm(form, item, parent);

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      makeNewCard(addForm.addCardTitle(form), list);

      addForm.afterSubmit(form, item, parent);

      const allLists = document.querySelectorAll('.list');
      const allCards = document.querySelectorAll('.list-item');

      DnD(allCards, allLists);
    });
  });
});

window.onbeforeunload = function () {
  const data = [];
  let cards = document.querySelectorAll('.list-item:not(.elementary)');
  let lists = document.querySelectorAll('.list')
  cards.forEach((card) => {
    let list_index;
    for (list_index = 0; list_index < lists.length; list_index++) {
      if (card.parentElement === lists.item(list_index)) {
        break;
      }
    }
    let element = {
      'title': card.firstChild.textContent,
      'list_index': list_index
    };
    data.push(element);
  });

  localStorage.setItem('data', JSON.stringify(data));
}

window.addEventListener('DOMContentLoaded', () => {
  let data = null;
  try {
    data = JSON.parse(localStorage.getItem('data'));
  } catch (error) {
    alert(error);
    console.log(error);
    return;
  }
  let lists = document.querySelectorAll('.list');
  data.forEach((card) => {
    makeNewCard(card['title'], lists[card['list_index']])
  });

  const allLists = document.querySelectorAll('.list');
  const allCards = document.querySelectorAll('.list-item');

  DnD(allCards, allLists);
});
