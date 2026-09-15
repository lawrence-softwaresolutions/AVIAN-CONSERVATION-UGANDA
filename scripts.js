const KIT_PRICE = 35000;
document.addEventListener('DOMContentLoaded', function(){
  const fileInput = document.getElementById('proofOfPayment');
  fileInput.addEventListener('change', function(){
    if(this.files[0] && this.files[0].size > 10*1024*1024){
      alert("File too big. Max 10MB"); this.value="";
    }
  });
});

function selectKit(el){
  document.querySelectorAll('.kit-card:not(.sponsor)').forEach(c=>c.classList.remove('active','selected'));
  el.classList.add('active','selected');
  document.getElementById('kitType').value = el.querySelector('strong').innerText + " - " + el.querySelector('p').innerText;
  // If no sponsorship, update total
  if(!document.getElementById('sponsorshipAmount').value || document.getElementById('sponsorshipAmount').value=="0"){
    document.getElementById('totalAmountDisplay').innerHTML = `Total: UGX ${KIT_PRICE.toLocaleString()}`;
  }
}

function selectSponsorship(el){
  document.querySelectorAll('.kit-card.sponsor').forEach(c=>c.classList.remove('active','selected'));
  el.classList.add('active','selected');
  const amount = el.getAttribute('data-value');
  const name = el.querySelector('strong').innerText;
  const priceText = el.querySelector('p').innerText;
  document.getElementById('sponsorshipType').value = `${name} - ${priceText}`;
  document.getElementById('sponsorshipAmount').value = amount;
  document.getElementById('selectedSponsorshipText').innerText = `✅ Selected: ${name} - ${priceText}`;
  document.getElementById('totalAmountDisplay').innerHTML = `Total: UGX ${parseInt(amount).toLocaleString()} <small style="opacity:0.8">(${name})</small>`;
  const refField = document.getElementById('paymentRef');
  const runnerName = document.getElementById('fullName')?.value || 'Runner';
  if(refField) refField.placeholder = `Run4Birds-${runnerName.substring(0,6).toUpperCase()}-UGX${amount}`;
}

function clearSponsorship(){
  document.querySelectorAll('.kit-card.sponsor').forEach(c=>c.classList.remove('active','selected'));
  document.getElementById('sponsorshipType').value = '';
  document.getElementById('sponsorshipAmount').value = '0';
  document.getElementById('selectedSponsorshipText').innerText = 'No Sponsorship - Just Runner Kit (UGX 35,000)';
  document.getElementById('totalAmountDisplay').innerHTML = `Total: UGX ${KIT_PRICE.toLocaleString()} <small>Runner Only</small>`;
}

function resetForm(){
  document.getElementById('registrationForm').reset();
  document.querySelectorAll('.kit-card').forEach(c=>c.classList.remove('active','selected'));
  document.getElementById('formContainer').style.display='block';
  document.getElementById('successMessage').style.display='none';
  window.scrollTo(0,0);
}