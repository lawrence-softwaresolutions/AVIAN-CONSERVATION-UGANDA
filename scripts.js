const kitCards = document.querySelectorAll('.kit-card');
const kitInput = document.getElementById('kitType');

kitCards.forEach(card => {
    card.addEventListener('click', () => {
        kitCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        kitInput.value = card.dataset.value;
    });
});

document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();

    if (!kitInput.value) {
        alert("Please select a kit type");
        return;
    }

    const form = this;
    const formData = new FormData(form);

    fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
    }).then(() => {
        document.getElementById('formContainer').style.display = 'none';
        document.getElementById('successMessage').style.display = 'block';
    }).catch(() => {
        alert('Submission failed. Please try again.');
    });
});

function resetForm() {
    document.getElementById('formContainer').style.display = 'block';
    document.getElementById('successMessage').style.display = 'none';
    document.getElementById('registrationForm').reset();
    kitCards.forEach(c => c.classList.remove('selected'));
    kitInput.value = '';
}
