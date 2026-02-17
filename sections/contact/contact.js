/**
 * CONTACT JS — EmailJS Integration
 * -----------------------------------
 * Mengirim pesan form ke email melalui EmailJS.
 *
 * ⚠️  LANGKAH SETUP EmailJS:
 *  1. Daftar di https://www.emailjs.com  (gratis 200 email/bulan)
 *  2. Buat Email Service  → catat SERVICE ID
 *  3. Buat Email Template  → catat TEMPLATE ID
 *     - Di template gunakan variabel:
 *         {{from_name}}   → nama pengirim
 *         {{from_email}}  → email pengirim
 *         {{message}}     → isi pesan
 *  4. Salin Public Key dari Account → General
 *  5. Ganti 3 nilai di bawah ini:
 */

// =============================================
// ⬇️  ISI DENGAN DATA EMAILJS KAMU  ⬇️
// =============================================
const EMAILJS_PUBLIC_KEY = 'vnZGsVen5hE_jd7mi';    // Ganti dengan Public Key kamu
const EMAILJS_SERVICE_ID = 'service_xn7b06l';    // Ganti dengan Service ID kamu
const EMAILJS_TEMPLATE_ID = 'template_4tif64a';   // Ganti dengan Template ID kamu
// =============================================

// Cooldown: 1 hari (24 jam dalam milidetik)
const COOLDOWN_MS = 24 * 60 * 60 * 1000;
const COOLDOWN_KEY = 'contact_last_sent';

// Inisialisasi EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

// Elemen DOM
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formStatus = document.getElementById('formStatus');

/**
 * Cek apakah cooldown masih aktif
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

    // Hitung sisa waktu
    const sisaMs = COOLDOWN_MS - elapsed;
    const jam = Math.floor(sisaMs / (1000 * 60 * 60));
    const menit = Math.floor((sisaMs % (1000 * 60 * 60)) / (1000 * 60));
    return { active: true, remaining: `${jam} jam ${menit} menit` };
}

/**
 * Tampilkan / sembunyikan note cooldown di bawah form
 */
function updateCooldownUI() {
    const { active, remaining } = checkCooldown();

    // Buat atau ambil elemen note cooldown
    let note = document.getElementById('cooldownNote');
    if (!note) {
        note = document.createElement('div');
        note.id = 'cooldownNote';
        note.className = 'form-status cooldown';
        contactForm.parentNode.insertBefore(note, contactForm.nextSibling);
    }

    if (active) {
        note.innerHTML = `⏳ Kamu sudah mengirim pesan. Silakan kirim lagi dalam <strong>${remaining}</strong>.`;
        note.style.display = 'block';
        submitBtn.disabled = true;
        submitBtn.textContent = 'Tunggu Cooldown';
    } else {
        note.style.display = 'none';
        submitBtn.disabled = false;
        submitBtn.textContent = 'Kirim Pesan';
    }
}

/**
 * Tampilkan pesan status di bawah form
 * @param {'success'|'error'} type
 * @param {string} message
 */
function showStatus(type, message) {
    formStatus.textContent = message;
    formStatus.className = 'form-status ' + type;
    formStatus.style.display = 'block';

    // Auto-hide setelah 6 detik
    setTimeout(() => {
        formStatus.style.opacity = '0';
        setTimeout(() => {
            formStatus.style.display = 'none';
            formStatus.style.opacity = '1';
        }, 400);
    }, 6000);
}

// Cek cooldown saat halaman dimuat
updateCooldownUI();

// Update cooldown setiap 1 menit agar sisa waktu tetap akurat
setInterval(updateCooldownUI, 60 * 1000);

// Handle form submit
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Cek cooldown sebelum kirim
    const { active, remaining } = checkCooldown();
    if (active) {
        showStatus('error', `⏳ Harap tunggu ${remaining} sebelum mengirim pesan lagi.`);
        return;
    }

    // Disable tombol & tunjukkan loading
    submitBtn.disabled = true;
    submitBtn.textContent = 'Mengirim...';

    emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, contactForm)
        .then(() => {
            // Simpan waktu kirim ke localStorage
            localStorage.setItem(COOLDOWN_KEY, Date.now().toString());

            showStatus('success', '✅ Pesan berhasil dikirim! Terima kasih, saya akan segera merespons.');
            contactForm.reset();

            // Update UI cooldown
            updateCooldownUI();
        })
        .catch((error) => {
            console.error('EmailJS Error:', error);
            showStatus('error', '❌ Gagal mengirim pesan. Silakan coba lagi atau hubungi langsung via email.');
            submitBtn.disabled = false;
            submitBtn.textContent = 'Kirim Pesan';
        });
});
