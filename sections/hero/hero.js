/**
 * HERO SECTION — Rotating Text Animation
 * ----------------------------------------
 * Animasi mengetik yang berganti otomatis antara profesi.
 * Edit array PROFESSIONS di bawah untuk mengganti teks.
 */

const PROFESSIONS = [
    'IoT Developer.',
    'Web Dev.',
    'IT Support'
];

/**
 * Inisialisasi efek rotating text (typing + deleting).
 * Dipanggil saat DOMContentLoaded.
 */
function initRotatingText() {
    const el = document.getElementById('rotatingText');
    if (!el) return;

    let professionIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    // Kecepatan ketik (ms)
    const TYPING_SPEED = 100;
    const DELETING_SPEED = 30;
    const PAUSE_AFTER_TYPE = 2500;  // jeda setelah selesai mengetik
    const PAUSE_AFTER_DELETE = 1000; // jeda sebelum mengetik teks baru

    function tick() {
        const currentText = PROFESSIONS[professionIndex];

        if (!isDeleting) {
            // Mengetik karakter
            charIndex++;
            el.textContent = currentText.substring(0, charIndex);

            if (charIndex === currentText.length) {
                // Selesai mengetik — jeda lalu mulai hapus
                isDeleting = true;
                setTimeout(tick, PAUSE_AFTER_TYPE);
                return;
            }
            setTimeout(tick, TYPING_SPEED);
        } else {
            // Menghapus karakter
            charIndex--;
            el.textContent = currentText.substring(0, charIndex);

            if (charIndex === 0) {
                // Selesai menghapus — pindah ke profesi berikutnya
                isDeleting = false;
                professionIndex = (professionIndex + 1) % PROFESSIONS.length;
                setTimeout(tick, PAUSE_AFTER_DELETE);
                return;
            }
            setTimeout(tick, DELETING_SPEED);
        }
    }

    // Mulai dengan teks kosong, lalu ketik
    el.textContent = '';
    setTimeout(tick, 800); // delay awal sebelum mulai mengetik
}

// Jalankan saat DOM siap
document.addEventListener('DOMContentLoaded', initRotatingText);
