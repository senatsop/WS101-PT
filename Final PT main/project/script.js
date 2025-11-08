// Interactive features for project pages
document.addEventListener('DOMContentLoaded', () => {
    // Update copyright year
    const yearElements = document.querySelectorAll('[id^="year"]');
    yearElements.forEach(el => el.textContent = new Date().getFullYear());

    // Create modal for image lightbox
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <button class="modal-close">&times;</button>
        <img src="" alt="Project image">
    `;
    document.body.appendChild(modal);

    // Image lightbox functionality
    const projectImages = document.querySelectorAll('.project-media img');
    const modalImg = modal.querySelector('img');
    const closeBtn = modal.querySelector('.modal-close');

    projectImages.forEach(img => {
        // Add loading animation
        img.addEventListener('load', () => {
            img.style.opacity = 1;
        });

        // Open modal on click
        img.addEventListener('click', () => {
            modalImg.src = img.src;
            modalImg.alt = img.alt;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });

    // Close modal functions
    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add hover effect for tools list
    const toolItems = document.querySelectorAll('ul li');
    toolItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.color = 'var(--text)';
            item.style.transform = 'translateX(5px)';
        });
        item.addEventListener('mouseleave', () => {
            item.style.color = 'var(--muted)';
            item.style.transform = 'none';
        });
    });
});
