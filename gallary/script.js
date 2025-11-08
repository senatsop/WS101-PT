// Gallery interactivity
document.addEventListener('DOMContentLoaded', () => {
    // Update copyright year
    const yearElement = document.getElementById('year8');
    if (yearElement) yearElement.textContent = new Date().getFullYear();

    // Gallery filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter items
            const filter = btn.dataset.filter;
            galleryItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => item.style.opacity = '1', 10);
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => item.style.display = 'none', 300);
                }
            });
        });
    });

    // Lightbox functionality
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = lightbox.querySelector('img');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');
    
    let currentIndex = 0;
    const visibleItems = () => Array.from(galleryItems).filter(item => 
        item.style.display !== 'none'
    );

    const updateLightboxContent = (item) => {
        const img = item.querySelector('img');
        const title = item.querySelector('h3');
        const desc = item.querySelector('p');
        
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxCaption.querySelector('h3').textContent = title.textContent;
        lightboxCaption.querySelector('p').textContent = desc.textContent;
    };

    const showLightbox = (index) => {
        const items = visibleItems();
        currentIndex = index;
        updateLightboxContent(items[currentIndex]);
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const hideLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    };

    // Open lightbox on image click
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => showLightbox(index));
    });

    // Navigation
    prevBtn.addEventListener('click', () => {
        const items = visibleItems();
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        updateLightboxContent(items[currentIndex]);
    });

    nextBtn.addEventListener('click', () => {
        const items = visibleItems();
        currentIndex = (currentIndex + 1) % items.length;
        updateLightboxContent(items[currentIndex]);
    });

    // Close lightbox
    closeBtn.addEventListener('click', hideLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) hideLightbox();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        const items = visibleItems();
        switch(e.key) {
            case 'ArrowLeft':
                currentIndex = (currentIndex - 1 + items.length) % items.length;
                updateLightboxContent(items[currentIndex]);
                break;
            case 'ArrowRight':
                currentIndex = (currentIndex + 1) % items.length;
                updateLightboxContent(items[currentIndex]);
                break;
            case 'Escape':
                hideLightbox();
                break;
        }
    });

    // Lazy loading images with fade-in
    const observerOptions = {
        root: null,
        rootMargin: '50px',
        threshold: 0.1
    };

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '1';
                imageObserver.unobserve(img);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.gallery-item img').forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        imageObserver.observe(img);
    });
});
