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

//form validation
  const contactForm = document.getElementById("contact-form");
  const submitbtn = document.getElementById("submit-btn");
  const formStatus = document.getElementById("form-status");
  //email where the user input is stored
  const adminEmail = "wesleyndlovu143@gmail.com";

contactForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  //run the browser based validation checks
  if(!contactForm.checkVisibility()) {
    contactForm.reportValidity();
    return;
  }
  //more validation checks
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  const namePattern = /^[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ '\-]*$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!namePattern.test(name)) {
    alert("Please enter a valid name (only letters, spaces, apostrophes, and hyphens are allowed).");
    return;
  }
  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }
  if (message.length < 10) {
    alert("Message must be at least 10 characters long.");
    return;
  }
  //prevents repeated clicks while sending
  submitbtn.disabled = true;
  submitbtn.value = "Sending...";
  formStatus.textContent = "Submitting your message...";

  try {
    //send form data yo formsubmits AJAX endpoint
    const response = await fetch("https://formsubmit.co/ajax/" + adminEmail, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: name,
        email: email,
        message: message
      })
    }
    );
  const result = await response.json();
    //check if the submission was successful
    if (response.ok && (result.success || result.success === "true") ) {
      alert("Your information has been sent successfully");
      formStatus.textContent = "Your information has been sent successfully.";
      contactForm.reset();
    } else {
      throw new Error(result.message || "Form submission failed.");
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    formStatus.textContent = "There was an error submitting your message. Please try again later.";
    alert("Message could not be confirmed, try again");
  } finally {
    submitbtn.disabled = false;
    submitbtn.value = "Submit";
  }
});

/**********************dateandtime script**********************/
function updateDateTime() {
  const now = new Date();
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };
  document.getElementById('datetime').textContent = now.toLocaleDateString('en-US', options);
}
updateDateTime();
setInterval(updateDateTime, 1000); // Update every second
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

