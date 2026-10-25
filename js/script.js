/* lightbox function from W3School */
// Open the Modal container element
function openModal() {
  document.getElementById("myModal").style.display = "block";
}

// Close the Modal window viewport overlay interface
function closeModal() {
  document.getElementById("myModal").style.display = "none";
}

// Default initial state tracker value
var slideIndex = 1;
showSlides(slideIndex);

// Jump index positions relatively forwards or backwards
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Open active content node explicitly from index values
function currentSlide(n) {
  showSlides(slideIndex = n);
}

// Process presentation layout visibility conditions dynamically
function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  var captionText = document.getElementById("caption");
  
  // Boundary overflow wrap conditions check loop calculations
  if (n > slides.length) { slideIndex = 1; }
  if (n < 1) { slideIndex = slides.length; }
  
  // Hide all slide targets sequentially prior to active rendering updates
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  
  // Strip tracking class names strings systematically on loops
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  
  // Safely display specific target nodes if elements exist inside DOM trees
  if (slides[slideIndex - 1]) {
    slides[slideIndex - 1].style.display = "block";
  }
  
  // Synchronise attributes and extract alt metadata text properties cleanly
  if (dots[slideIndex - 1]) {
    dots[slideIndex - 1].className += " active";
    captionText.innerHTML = dots[slideIndex - 1].alt;
  }
}



(function () {
    const form = document.getElementById('contact-form');
    const statusEl = document.getElementById('form-status');
    const btn = document.getElementById('submit-btn');

    /* ---------- Fill hidden visitor info ---------- */
    document.getElementById('visitor-time').value = new Date().toString();

    /* ---------- Validation ---------- */
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    function setError(id, msg) {
        const errEl = document.getElementById(id + '-error');
        if (errEl) errEl.textContent = msg;
    }

    function validate() {
        let ok = true;
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const message = form.message.value.trim();
        

        setError('name', ''); setError('email', ''); setError('message', '');

        if (name.length < 2) { setError('name', 'Please enter your name (at least 2 characters).'); ok = false; }
        else if (!/^[\p{L}\s'.-]+$/u.test(name)) { setError('name', 'Name contains invalid characters.'); ok = false; }

        if (!email) { setError('email', 'Please enter your email address.'); ok = false; }
        else if (!emailPattern.test(email)) { setError('email', 'Please enter a valid email address.'); ok = false; }

        if (message.length < 10) { setError('message', 'Message must be at least 10 characters.'); ok = false; }

        return ok;
    }

    /* ---------- Submit to Web3Forms ---------- */
    form.addEventListener('submit', async function (e) {
        e.preventDefault();
        statusEl.textContent = '';
        statusEl.style.color = '';

        if (!validate()) return;

        btn.disabled = true;
        btn.value = 'Sending...';

    });
})();


