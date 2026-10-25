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


