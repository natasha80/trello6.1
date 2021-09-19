/* eslint-disable linebreak-style */
// eslint-disable-next-line linebreak-style
/* eslint-disable no-param-reassign */
/* eslint-disable linebreak-style */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable eol-last */
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

window.addEventListener('beforeunload', () => {
  const cards = document.querySelectorAll('.list-item');
  const state = {};
  cards.forEach((elem) => {
    state[elem.id] = elem.value;
  });

  localStorage.setItem('data', JSON.stringify(state));
});

window.addEventListener('DOMContentLoader', () => {
  const stateJSON = localStorage.getItem('data');
  let state;
  try {
    state = JSON.parse(stateJSON);
  } catch (error) {
    console.log(error);

    return;
  }

  for (const key in state) {
    document.getElementById(key).value = state[key];
  }
});