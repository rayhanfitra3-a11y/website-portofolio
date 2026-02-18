/**
 * CONTACT JS — EmailJS Integration
 * -----------------------------------
 * Sends contact form messages via EmailJS.
 *
 * ⚠️  EmailJS SETUP STEPS:
 *  1. Register at https://www.emailjs.com  (free 200 emails/month)
 *  2. Create an Email Service  → note the SERVICE ID
 *  3. Create an Email Template  → note the TEMPLATE ID
 *     - In the template, use these variables:
 *         {{from_name}}   → sender's name
 *         {{from_email}}  → sender's email
 *         {{message}}     → message content
 *  4. Copy the Public Key from Account → General
 *  5. Replace the 3 values below:
 */

// =============================================
// ⬇️  FILL IN YOUR EMAILJS DATA  ⬇️
// =============================================
const EMAILJS_PUBLIC_KEY = 'vnZGsVen5hE_jd7mi';    // Replace with your Public Key
const EMAILJS_SERVICE_ID = 'service_xn7b06l';    // Replace with your Service ID
const EMAILJS_TEMPLATE_ID = 'template_4tif64a';   // Replace with your Template ID
// =============================================

// Cooldown: 1 day (24 hours in milliseconds)
const COOLDOWN_MS = 24 * 60 * 60 * 1000;
const COOLDOWN_KEY = 'contact_last_sent';

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

// DOM Elements
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formStatus = document.getElementById('formStatus');

/**
 * Check if cooldown is still active
 * @returns {{ active: boolean, remaining: string }}
 */
function checkCooldown() {
    const lastSent = localStorage.getItem(COOLDOWN_KEY);
    if (!lastSent) return { active: false, remaining: '' };

    const elapsed = Date.now() - parseInt(lastSent, 10);
    if (elapsed >= COOLDOWN_MS) {
        localStorage.removeItem(COOLDOWN_KEY);
        return { active: false, remaining: '' };
    }

    // Calculate remaining time
    const sisaMs = COOLDOWN_MS - elapsed;
    const hours = Math.floor(sisaMs / (1000 * 60 * 60));
    const minutes = Math.floor((sisaMs % (1000 * 60 * 60)) / (1000 * 60));
    return { active: true, remaining: `${hours} hours ${minutes} minutes` };
}

/**
 * Show / hide cooldown note below the form
 */
function updateCooldownUI() {
    const { active, remaining } = checkCooldown();

    // Create or get cooldown note element
    let note = document.getElementById('cooldownNote');
    if (!note) {
        note = document.createElement('div');
        note.id = 'cooldownNote';
        note.className = 'form-status cooldown';
        contactForm.parentNode.insertBefore(note, contactForm.nextSibling);
    }

    if (active) {
        note.innerHTML = `⏳ You have already sent a message. Please try again in <strong>${remaining}</strong>.`;
        note.style.display = 'block';
        submitBtn.disabled = true;
        submitBtn.textContent = 'Please Wait';
    } else {
        note.style.display = 'none';
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
    }
}

/**
 * Display status message below the form
 * @param {'success'|'error'} type
 * @param {string} message
 */
function showStatus(type, message) {
    formStatus.textContent = message;
    formStatus.className = 'form-status ' + type;
    formStatus.style.display = 'block';

    // Auto-hide after 6 seconds
    setTimeout(() => {
        formStatus.style.opacity = '0';
        setTimeout(() => {
            formStatus.style.display = 'none';
            formStatus.style.opacity = '1';
        }, 400);
    }, 6000);
}

// Check cooldown on page load
updateCooldownUI();

// Update cooldown every 1 minute to keep remaining time accurate
setInterval(updateCooldownUI, 60 * 1000);

// Handle form submit
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Check cooldown before sending
    const { active, remaining } = checkCooldown();
    if (active) {
        showStatus('error', `⏳ Please wait ${remaining} before sending another message.`);
        return;
    }

    // Disable button & show loading
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, contactForm)
        .then(() => {
            // Save send time to localStorage
            localStorage.setItem(COOLDOWN_KEY, Date.now().toString());

            showStatus('success', '✅ Message sent successfully! Thank you, I will respond shortly.');
            contactForm.reset();

            // Update cooldown UI
            updateCooldownUI();
        })
        .catch((error) => {
            console.error('EmailJS Error:', error);
            showStatus('error', '❌ Failed to send message. Please try again or contact me directly via email.');
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        });
});
