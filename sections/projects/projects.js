/**
 * PROJECTS JS — Filter, Modal, Project Image Loading
 * ----------------------------------------------------
 * Logika untuk project filter, modal popup, dan gambar project.
 */

// ============ PROJECT FILTER ============
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
            if (filter === 'all') {
                card.classList.remove('hidden');
            } else {
                const category = card.getAttribute('data-category');
                if (category === filter) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            }
        });
    });
});

// ============ PROJECT MODAL ============
const modal = document.getElementById('projectModal');
const modalClose = document.querySelector('.modal-close');
const viewDetailBtns = document.querySelectorAll('.btn-view-detail');

viewDetailBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const projectId = btn.getAttribute('data-project');
        const project = projectData[projectId];

        if (project) {
            // Modal: tampilkan gambar dari images.js atau emoji
            const modalImg = document.getElementById('modalProjectImg');
            const modalIcon = document.getElementById('modalProjectIcon');
            if (typeof IMAGES !== 'undefined' && IMAGES.projects && IMAGES.projects[projectId]) {
                modalImg.src = IMAGES.projects[projectId];
                modalImg.alt = project.title;
                modalImg.style.display = 'block';
                modalIcon.style.display = 'none';
            } else {
                modalImg.style.display = 'none';
                modalImg.src = '';
                modalIcon.textContent = project.icon;
                modalIcon.style.display = 'block';
            }

            document.getElementById('modalProjectTitle').textContent = project.title;
            document.getElementById('modalProjectDescription').textContent = project.description;

            const techStackContainer = document.getElementById('modalTechStack');
            techStackContainer.innerHTML = '';
            project.techStack.forEach(tech => {
                const span = document.createElement('span');
                span.textContent = tech;
                techStackContainer.appendChild(span);
            });

            const featuresList = document.getElementById('modalFeatures');
            featuresList.innerHTML = '';
            project.features.forEach(feature => {
                const li = document.createElement('li');
                li.textContent = feature;
                featuresList.appendChild(li);
            });



            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

// Close modal
modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// ============ PROJECT IMAGES (dari images.js) ============
function applyProjectImages() {
    if (typeof IMAGES === 'undefined' || !IMAGES.projects) return;
    document.querySelectorAll('.project-image[data-project]').forEach(el => {
        const projectId = el.getAttribute('data-project');
        const img = el.querySelector('.project-img');
        const placeholder = el.querySelector('.project-placeholder');
        const src = IMAGES.projects[projectId];
        if (img && placeholder) {
            if (src) {
                img.src = src;
                img.alt = projectData[projectId] ? projectData[projectId].title : '';
                img.style.display = 'block';
                placeholder.style.display = 'none';
            } else {
                img.style.display = 'none';
                placeholder.style.display = 'block';
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', applyProjectImages);
