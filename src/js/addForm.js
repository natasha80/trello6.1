/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
/* eslint-disable eol-last */
export default class Form {
  createForm() {
    const form = document.createElement('form');
    form.classList.add('add-card');
    form.innerHTML = ` <textarea name="card-title" class="card-title-field" rows = "5" placeholder="Enter a title for this card..."></textarea>
            <div class="input-container">
                <div class="input-block">
                    <input type="submit" value="Add Card" class="input-add-card">
                    <div class="close-btn">
                    <button class="delete-button">Х</button>
                    </div>
                </div>
                 </div>`;

    return form;
  }

  closeForm(thisForm, addBlock, formParent) {
    const closeBtn = thisForm.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
      thisForm.reset();
      formParent.removeChild(thisForm);
    });
  }

  afterSubmit(thisForm, addBlock, formParent) {
    thisForm.reset();
    formParent.removeChild(thisForm);
  }

  addCardTitle(thisForm) {
    const textarea = thisForm.querySelector('.card-title-field');
    return textarea.value;
  }
}