/**
 * awards.js — Award Detail Modal with Auto-Slide Gallery
 *
 * To add photos for each award, update the `photos` array for each award below.
 * AUTO_SLIDE_INTERVAL controls how fast photos auto-advance (in ms).
 */

const AUTO_SLIDE_INTERVAL = 3000; // 3 seconds per photo

// ─── Award Data ──────────────────────────────────────────────────────────────
const awardsData = {
    its2026: {
        emoji: '🥈',
        title: '2nd Place — National Scientific Paper Competition (LKTI)',
        year: '2026',
        org: 'Department of Instrumentation Engineering, Institut Teknologi Sepuluh Nopember (ITS), Surabaya',
        description:
            'Our team secured 2nd place at the prestigious LKTI competition hosted by the Department of Instrumentation Engineering at ITS Surabaya. We presented TechAgro, an IoT and AI-based smart farming system that enables real-time plant monitoring, automated irrigation, AI-powered disease detection, and targeted botanical pesticide spraying, supported by renewable energy integration',
        details: [
            { icon: '🏆', text: 'Achievement: 2nd Place (Silver Medal)' },
            { icon: '📅', text: 'Year: 2026' },
            { icon: '🏫', text: 'Host: Institut Teknologi Sepuluh Nopember (ITS), Surabaya' },
            { icon: '📄', text: 'Category: National Scientific Paper Competition (LKTI)' },
            { icon: '🔬', text: 'Topic: IoT & Smart Agriculture — TechAgro System' },
            { icon: '👥', text: 'Team: Rayhan Fitra Nugraha & Zaky Adwa Rifqi' },
        ],
        photos: [
            'images/its-2026/WhatsApp Image 2026-03-07 at 20.07.13.jpeg',
            'images/its-2026/WhatsApp Image 2026-03-07 at 20.07.13 (1).jpeg',
            'images/its-2026/WhatsApp Image 2026-03-07 at 20.07.15.jpeg',
            'images/its-2026/WhatsApp Image 2026-03-07 at 20.07.15 (1).jpeg',
            'images/its-2026/WhatsApp Image 2026-03-07 at 20.07.16.jpeg',
            'images/its-2026/WhatsApp Image 2026-03-07 at 20.07.16 (1).jpeg',
            'images/its-2026/WhatsApp Image 2026-03-07 at 20.07.16 (2).jpeg',
            'images/its-2026/WhatsApp Image 2026-03-07 at 20.07.17.jpeg',
            'images/its-2026/WhatsApp Image 2026-03-07 at 20.07.17 (1).jpeg',
        ],
    },

    unair2025: {
        emoji: '🥈',
        title: '2nd Place — National Scientific Paper Competition (LKTI)',
        year: '2025',
        org: 'D4 Instrumentation and Control Engineering Student Association, Faculty of Vocational Studies, Universitas Airlangga, Surabaya',
        description:
            'Achieved 2nd place at the LKTI competition organized by the Instrumentation and Control Engineering Student Association at Universitas Airlangga. The paper focused on EcoFarmX, a smart vertical farming system combining IoT sensors with machine learning for environmental monitoring and crop management.',
        details: [
            { icon: '🏆', text: 'Achievement: 2nd Place (Silver Medal)' },
            { icon: '📅', text: 'Year: 2025' },
            { icon: '🏫', text: 'Host: Universitas Airlangga (UNAIR), Surabaya' },
            { icon: '📄', text: 'Category: National Scientific Paper Competition (LKTI)' },
            { icon: '🔬', text: 'Topic: Smart Vertical Farming — EcoFarmX System' },
            { icon: '👥', text: 'Team: Muhamad Rayhan Fitra Nugraha, Zaky Adwa Rifqi, EKa Zakiya Juni Astutik' },
        ],
        photos: [
            'images/unair-2025/WhatsApp Image 2026-03-07 at 20.14.45.jpeg',
            'images/unair-2025/WhatsApp Image 2026-03-07 at 20.14.46.jpeg',
            'images/unair-2025/WhatsApp Image 2026-03-07 at 20.14.46 (1).jpeg',
            'images/unair-2025/WhatsApp Image 2026-03-07 at 20.14.46 (2).jpeg',
            'images/unair-2025/WhatsApp Image 2026-03-07 at 20.14.47.jpeg',
            'images/unair-2025/WhatsApp Image 2026-03-07 at 20.14.47 (1).jpeg',
            'images/unair-2025/WhatsApp Image 2026-03-07 at 20.14.47 (2).jpeg',
            'images/unair-2025/WhatsApp Image 2026-03-07 at 20.14.48.jpeg',
        ],
    },

    inskill2025: {
        emoji: '⭐',
        title: 'Honorable Mention (1st Runner-up) — INSKILL Competition',
        year: '2025',
        org: 'Department of Instrumentation Engineering, Institut Teknologi Sepuluh Nopember (ITS), Surabaya',
        description:
            'Received an Honorable Mention (1st Runner-up) at the INSKILL Competition hosted by ITS Surabaya. The project showcased an integrated smart agriculture solution leveraging hybrid renewable energy sources combined with IoT monitoring and AI-based analytics for precision farming.',
        details: [
            { icon: '🏆', text: 'Achievement: Honorable Mention — 1st Runner-up' },
            { icon: '📅', text: 'Year: 2024-2025' },
            { icon: '🏫', text: 'Host: Institut Teknologi Sepuluh Nopember (ITS), Surabaya' },
            { icon: '📄', text: 'Category: INSKILL Innovation & Skills Competition' },
            { icon: '🔬', text: 'Topic: Hybrid-Energy Smart Farming with AI & IoT' },
            { icon: '👥', text: 'Team: Muhamad Rayhan Fitra Nugraha & Gading Kurmafalah Sudarno Putra' },
        ],
        photos: [
            'images/its-2025/WhatsApp Image 2026-03-07 at 20.20.03.jpeg',
            'images/its-2025/WhatsApp Image 2026-03-07 at 20.20.04.jpeg',
            'images/its-2025/WhatsApp Image 2026-03-07 at 20.20.04 (1).jpeg',
            'images/its-2025/WhatsApp Image 2026-03-07 at 20.20.06.jpeg',
            'images/its-2025/WhatsApp Image 2026-03-07 at 20.20.42.jpeg',
            'images/its-2025/WhatsApp Image 2026-03-07 at 20.20.42 (1).jpeg',
            'images/its-2025/WhatsApp Image 2026-03-07 at 20.20.43.jpeg',
        ],
    },
};

// ─── Gallery State ────────────────────────────────────────────────────────────
let galleryPhotos = [];
let galleryIndex = 0;
let autoSlideTimer = null;

// ─── DOM Refs ─────────────────────────────────────────────────────────────────
const overlay = document.getElementById('awardModalOverlay');
const closeBtn = document.getElementById('awardModalCloseBtn');
const emojiEl = document.getElementById('awardModalEmoji');
const titleEl = document.getElementById('awardModalTitle');
const yearEl = document.getElementById('awardModalYear');
const orgEl = document.getElementById('awardModalOrg');
const descEl = document.getElementById('awardModalDescription');
const detailsEl = document.getElementById('awardModalDetails');
const galleryImg = document.getElementById('awardGalleryImg');
const galleryHolder = document.getElementById('awardGalleryPlaceholder');
const prevBtn = document.getElementById('awardGalleryPrev');
const nextBtn = document.getElementById('awardGalleryNext');
const dotsEl = document.getElementById('awardGalleryDots');

// ─── Auto-slide helpers ───────────────────────────────────────────────────────
function startAutoSlide() {
    stopAutoSlide();
    if (galleryPhotos.length <= 1) return;
    autoSlideTimer = setInterval(function () {
        galleryIndex = (galleryIndex + 1) % galleryPhotos.length;
        renderGallery('next');
    }, AUTO_SLIDE_INTERVAL);
}

function stopAutoSlide() {
    if (autoSlideTimer) {
        clearInterval(autoSlideTimer);
        autoSlideTimer = null;
    }
}

// Reset timer whenever user interacts (so it doesn't fight the user)
function resetAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
}

// ─── Open Modal ───────────────────────────────────────────────────────────────
function openAwardModal(awardKey) {
    const data = awardsData[awardKey];
    if (!data) return;

    emojiEl.textContent = data.emoji;
    titleEl.textContent = data.title;
    yearEl.textContent = data.year;
    orgEl.textContent = data.org;
    descEl.textContent = data.description;

    detailsEl.innerHTML = '';
    (data.details || []).forEach(function (item) {
        const li = document.createElement('li');
        li.innerHTML = '<span class="detail-icon">' + item.icon + '</span><span>' + item.text + '</span>';
        detailsEl.appendChild(li);
    });

    galleryPhotos = data.photos || [];
    galleryIndex = 0;
    renderGallery();
    startAutoSlide();

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// ─── Gallery Render ───────────────────────────────────────────────────────────
function renderGallery(direction) {
    dotsEl.innerHTML = '';

    if (galleryPhotos.length === 0) {
        galleryImg.style.display = 'none';
        galleryHolder.style.display = 'flex';
        prevBtn.classList.add('hidden');
        nextBtn.classList.add('hidden');
        return;
    }

    galleryImg.style.display = 'block';
    galleryHolder.style.display = 'none';

    // Directional slide animation
    if (direction) {
        galleryImg.classList.remove('slide-in-left', 'slide-in-right');
        void galleryImg.offsetWidth; // force reflow to restart animation
        galleryImg.classList.add(direction === 'next' ? 'slide-in-left' : 'slide-in-right');
    }

    galleryImg.src = galleryPhotos[galleryIndex];
    galleryImg.alt = 'Award photo ' + (galleryIndex + 1);

    prevBtn.classList.toggle('hidden', galleryPhotos.length <= 1);
    nextBtn.classList.toggle('hidden', galleryPhotos.length <= 1);

    // Dots
    galleryPhotos.forEach(function (_, i) {
        const dot = document.createElement('button');
        dot.className = 'award-dot' + (i === galleryIndex ? ' active' : '');
        dot.setAttribute('aria-label', 'Go to photo ' + (i + 1));
        dot.addEventListener('click', function () {
            var dir = i > galleryIndex ? 'next' : 'prev';
            galleryIndex = i;
            renderGallery(dir);
            resetAutoSlide();
        });
        dotsEl.appendChild(dot);
    });
}

// ─── Gallery Navigation ───────────────────────────────────────────────────────
prevBtn.addEventListener('click', function () {
    if (galleryPhotos.length === 0) return;
    galleryIndex = (galleryIndex - 1 + galleryPhotos.length) % galleryPhotos.length;
    renderGallery('prev');
    resetAutoSlide();
});

nextBtn.addEventListener('click', function () {
    if (galleryPhotos.length === 0) return;
    galleryIndex = (galleryIndex + 1) % galleryPhotos.length;
    renderGallery('next');
    resetAutoSlide();
});

// ─── Close Modal ──────────────────────────────────────────────────────────────
function closeAwardModal() {
    stopAutoSlide();
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

closeBtn.addEventListener('click', closeAwardModal);

overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeAwardModal();
});

document.addEventListener('keydown', function (e) {
    if (!overlay.classList.contains('active')) return;
    if (e.key === 'Escape') {
        closeAwardModal();
    } else if (e.key === 'ArrowLeft') {
        galleryIndex = (galleryIndex - 1 + galleryPhotos.length) % galleryPhotos.length;
        renderGallery('prev');
        resetAutoSlide();
    } else if (e.key === 'ArrowRight') {
        galleryIndex = (galleryIndex + 1) % galleryPhotos.length;
        renderGallery('next');
        resetAutoSlide();
    }
});

// ─── Attach Buttons ───────────────────────────────────────────────────────────
document.querySelectorAll('.award-detail-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
        openAwardModal(this.getAttribute('data-award'));
    });
});
