document.addEventListener('DOMContentLoaded', function() {

    // ================== 1. KIT + SPONSORSHIP CARD SELECTION ==================
    const allCards = document.querySelectorAll('.kit-options.kit-card');
    const kitInput = document.getElementById('kitType');
    const sponsorInput = document.getElementById('sponsorshipType');

    allCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove active from all cards first
            allCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');

            // If it's the Event Kit
             if(this.id === 'kit35'){
                kitInput.value = this.dataset.value;
                sponsorInput.value = ""; // clear sponsorship so only 1 is selected
            } 
            // If it's a sponsorship
            else {
                sponsorInput.value = this.dataset.value;
                kitInput.value = ""; // clear kit so only 1 is selected
            }
        });
    });

    // ================== 2. FILE UPLOAD PREVIEW ==================
    const fileInput = document.getElementById('proofOfPayment');
    fileInput.addEventListener('change', function(){
        if(this.files.length > 0){
            const file = this.files[0];
            if(file.size > 10 * 1024 * 1024){ // 10MB limit
                alert("File is too big. Max 10MB allowed.");
                this.value = ""; // reset
            }
        }
    });

    // ================== 3. FORM SUBMIT + SUCCESS MESSAGE ==================
    const form = document.getElementById('registrationForm');
    const formContainer = document.getElementById('formContainer');
    const successMessage = document.getElementById('successMessage');

    form.addEventListener('submit', function(e) {
        // Check if kit or sponsorship was selected
        if(!kitInput.value &&!sponsorInput.value){
            e.preventDefault();
            alert("Please choose either a Kit or a Sponsorship Package");
            return;
        }

        // Let Netlify handle submit. We just show success after 500ms
        setTimeout(() => {
            formContainer.style.display = 'none';
            successMessage.style.display = 'block';
            window.scrollTo(0,0);
        }, 500);
    });

    window.resetForm = function() {
        form.reset();
        allCards.forEach(c => c.classList.remove('active'));
        formContainer.style.display = 'block';
        successMessage.style.display = 'none';
    }
});
const KIT_PRICE = 35000;

function selectSponsorship(el){
  // Remove active from all sponsorship cards
  document.querySelectorAll('#sponsorSunbird, #sponsorShoebill, #sponsorCrested').forEach(c=>{
    c.classList.remove('active');
  });
  // For your custom IDs if you use 2M/5M/10M version, use:
  // document.querySelectorAll('.kit-options .kit-card').forEach(c=>{ if(c.id.includes('sponsor')) c.classList.remove('active'); });

  el.classList.add('active');
  
  const amount = el.getAttribute('data-value');
  const name = el.querySelector('strong').innerText;
  const priceText = el.querySelector('p').innerText;

  document.getElementById('sponsorshipType').value = `${name} - ${priceText}`;
  document.getElementById('sponsorshipAmount').value = amount;
  document.getElementById('selectedSponsorshipText').innerText = `✅ Selected: ${name} - ${priceText}`;
  
  // Show and update total (Kit + Sponsorship)
  const total =  parseInt(amount);
  const totalDiv = document.getElementById('totalAmountDisplay');
  totalDiv.style.display = 'block';
  totalDiv.innerHTML = `Total: UGX ${total.toLocaleString()} <small style="opacity:0.8;">( Sponsorship ${parseInt(amount).toLocaleString()})</small>`;

  // Auto-fill payment ref
  const refField = document.getElementById('paymentRef');
  const runnerName = document.getElementById('fullName')?.value || 'Runner';
  if(refField && !refField.dataset.manual){
    refField.value = `Run4Birds-${runnerName.substring(0,6).toUpperCase()}-UGX${total}`;
  }
}

function clearSponsorship(){
  document.querySelectorAll('#sponsorSunbird, #sponsorShoebill, #sponsorCrested').forEach(c=>c.classList.remove('active'));
  document.getElementById('sponsorshipType').value = '';
  document.getElementById('sponsorshipAmount').value = '0';
  document.getElementById('selectedSponsorshipText').innerText = 'No Sponsorship Selected - Just Runner Kit (UGX 35,000)';
  const totalDiv = document.getElementById('totalAmountDisplay');
  totalDiv.style.display = 'block';
  totalDiv.innerHTML = `Total: UGX ${KIT_PRICE.toLocaleString()} <small style="opacity:0.8;">Runner Only</small>`;
}

// For your main Kit selection - keep this if not already there
function selectKit(el){
  document.querySelectorAll('.kit-options .kit-card').forEach(c=>{
    if(!c.id.includes('sponsor')) c.classList.remove('active');
  });
  el.classList.add('active');
  document.getElementById('kitType').value = el.innerText.trim();
}