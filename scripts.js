// Kit selection
const kitCards = document.querySelectorAll('.kit-card');
const kitInput = document.getElementById('kitType');

kitCards.forEach(card => {
    card.addEventListener('click', () => {
        kitCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        kitInput.value = card.dataset.value;
    });
});

// Form submission
document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!kitInput.value) {
        alert("Please select a kit type");
        return;
    }
    
    const formData = {
        name: document.getElementById('fullName').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        kit: kitInput.value,
        notes: document.getElementById('notes').value,
        timestamp: new Date().toISOString()
    };
    
    console.log("Registration Submitted:", formData);
    
    // Show success
    document.getElementById('formContainer').style.display = 'none';
    document.getElementById('successMessage').style.display = 'block';
});

function resetForm() {
    document.getElementById('formContainer').style.display = 'block';
    document.getElementById('successMessage').style.display = 'none';
    document.getElementById('registrationForm').reset();
    kitCards.forEach(c => c.classList.remove('selected'));
    kitInput.value = '';
}