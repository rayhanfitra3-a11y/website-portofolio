/**
 * certificates.js — Certificates Lightbox Viewer
 *
 * To add/edit certificates, update the `certsData` array below.
 * Each entry: { img, title, issuer, year }
 *
 * img   → path relative to site root (e.g. 'images/certificates/1_page-0001.jpg')
 * title → name of the certificate
 * issuer → who issued it
 * year  → string
 */

const certsData = [
    {
        img: 'images/certificates/Muhamad Rayhan Fitra Nugraha_Juara 2_LKTI_Nasional_ITS_2026_page-0001.jpg',
        title: '2nd Place — LKTI National (ITS)',
        issuer: 'Institut Teknologi Sepuluh Nopember',
        year: '2026',
    },
    {
        img: 'images/certificates/1_page-0001.jpg',
        title: '2nd Place — LKTI National (UNAIR)',
        issuer: 'Universitas Airlangga',
        year: '2025',
    },
    {
        img: 'images/certificates/2_page-0001.jpg',
        title: '1st Runner-up — INSKILL Competition',
        issuer: 'Institut Teknologi Sepuluh Nopember',
        year: '2025',
    },
    {
        img: 'images/certificates/3_page-0001.jpg',
        title: 'Peserta — LKTI National (PPNS)',
        issuer: 'Politeknik Perkapalan Negeri Surabaya',
        year: '2025',
    },
    {
        img: 'images/certificates/7.jpg',
        title: 'Peserta — LKTI National (PENS)',
        issuer: 'Politeknik Elektronika Negeri Surabaya',
        year: '2025',
    },
];

// ─── Build Grid ───────────────────────────────────────────────────────────────
const certGrid = document.getElementById('certGrid');

certsData.forEach(function (cert, idx) {
    const card = document.createElement('div');
    card.className = 'cert-card';
    card.setAttribute('data-index', idx);
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', 'View certificate: ' + cert.title);

    card.innerHTML =
        '<div class="cert-thumb-wrap">' +
        '<img class="cert-thumb" src="' + cert.img + '" alt="' + cert.title + '" loading="lazy">' +
        '<div class="cert-thumb-overlay">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
        '<path d="M15 3h6v6"/><path d="M10 14L21 3"/>' +
        '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>' +
        '</svg>' +
        '</div>' +
        '</div>' +
        '<div class="cert-info">' +
        '<p class="cert-title">' + cert.title + '</p>' +
        (cert.issuer ? '<p class="cert-issuer">' + cert.issuer + '</p>' : '') +
        (cert.year ? '<span class="cert-year">' + cert.year + '</span>' : '') +
        '</div>';

    card.addEventListener('click', function () { openLightbox(idx); });
    card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(idx); }
    });

    certGrid.appendChild(card);
});

// ─── Lightbox ─────────────────────────────────────────────────────────────────
const lightbox = document.getElementById('certLightbox');
const lbImg = document.getElementById('certLbImg');
const lbTitle = document.getElementById('certLbTitle');
const lbIssuer = document.getElementById('certLbIssuer');
const lbCounter = document.getElementById('certLbCounter');
const lbClose = document.getElementById('certLbClose');
const lbPrev = document.getElementById('certLbPrev');
const lbNext = document.getElementById('certLbNext');

let currentIdx = 0;

function openLightbox(idx) {
    currentIdx = idx;
    renderLightbox();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function renderLightbox(direction) {
    const cert = certsData[currentIdx];

    // Animate image swap
    if (direction) {
        lbImg.style.opacity = '0';
        lbImg.style.transform = direction === 'next' ? 'translateX(40px)' : 'translateX(-40px)';
        setTimeout(function () {
            lbImg.src = cert.img;
            lbImg.alt = cert.title;
            lbImg.style.transition = 'opacity 0.28s ease, transform 0.28s ease';
            lbImg.style.opacity = '1';
            lbImg.style.transform = 'translateX(0)';
        }, 80);
    } else {
        lbImg.style.transition = '';
        lbImg.style.opacity = '1';
        lbImg.style.transform = 'translateX(0)';
        lbImg.src = cert.img;
        lbImg.alt = cert.title;
    }

    lbTitle.textContent = cert.title;
    lbIssuer.textContent = cert.issuer || '';
    lbCounter.textContent = (currentIdx + 1) + ' / ' + certsData.length;
}

lbClose.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
});

lbPrev.addEventListener('click', function () {
    currentIdx = (currentIdx - 1 + certsData.length) % certsData.length;
    renderLightbox('prev');
});

lbNext.addEventListener('click', function () {
    currentIdx = (currentIdx + 1) % certsData.length;
    renderLightbox('next');
});

document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') { closeLightbox(); }
    if (e.key === 'ArrowLeft') { lbPrev.click(); }
    if (e.key === 'ArrowRight') { lbNext.click(); }
});
