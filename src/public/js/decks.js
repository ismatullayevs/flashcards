const buttons = document.getElementsByClassName('edit');

for (let button of buttons) {
    button.addEventListener('click', (e) => {
        const deckId = button.dataset.id;
        const name = button.dataset.name;
        const modal = document.getElementById('editDeck');
        const form = modal.querySelector('form');
        form.action = `/decks/${deckId}/edit`;
        const nameInput = modal.querySelector('input[name="name"]');
        nameInput.value = name;
    });
}