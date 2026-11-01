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
(function() {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('status');
  const btn = document.getElementById('submitBtn');

  //stops the script if form is not found
  if(!form || !statusE1 || !btn) return;

  //records users submission dateAndTime
  function updateVisitorTime() {
    document.getElementById('visitorTime').value = new Date().toString();
  }

  updateVisitorTime();

  //checks if email vaild
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  //displays error message if email is not valid
  function setError(id, msg) {
    const eerEl = document.getElementById(id+ '-error');
    if(eerEl) {
      eerEl.textContent = msg;
    }
  }

  //validates users infor
  function validate() {
    let ok = true;
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    //clear previous error messages
    setError('name', '');
    setError('email', '');
    setError('message', '');

    //checls users name
    if(name.length < 2) {
      setError('name', 'Name must be at least 2 characters long.');
      ok = false;
    }
    else if(!/^[a-zA-Z\s]+$/.test(name)) {
      setError('name contains invalid characters.');
      ok = false;
    }

    //checks users email
    if(!email) {
      setError('email', 'Email is required.');
      ok = false;
    }
    else if(!emailPattern.test(email)) {
      setError('email', 'Please enter a valid email address.');
      ok = false;
    }

    //checks users message
    if(message.length < 10) {
      setError('message', 'Message must be at least 10 characters long.');
      ok = false;
    }
    return ok;
  }

  /--------------- web3forms submission ----------------/
  //validates form and submits if valid
  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    status.textContent = '';

    //stops submission if form is not valid
    if(!validate()) return;

    //prevents repeated submissions
    btn.disabled = true;
    btn.value = 'Sending...';
    status.textContent = 'Sending...';

    try {
            // Collects all form fields, including hidden information.
            updateVisitorTime();
            const formData = new FormData(form);

            // Sends the information to the Web3Forms endpoint.
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData
            });

            const result = await response.json();
            //checks if web3forms submission was successful
            if(response.ok && result.success) {
              alert('Form submitted successfully');
              statusEl.textContent = 'Form submitted successfully';

              //clear form fields after successful submission
              form.reset();
              updateVisitorTime();
            } else {
              throw new Error(result.message || 'Form submission failed');
            } 
          } catch (error) {
            //displays error message if submission fails
            console.error('Error submitting form:', error);
            statusEl.textContent = 'Error submitting form: ' + error.message;
            alert('Error submitting form: ' + error.message);
          } finally {
            //restore submit button state
            btn.disabled = false;
            btn.value = 'Submit';
          }
        });
      })();
