let currentGallery = [];
let currentIndex = 0;

// Get modal elements
const modal = document.getElementById('photoModal');
const modalImg = document.getElementById('modalImage');
const captionText = document.getElementById('caption');
const closeBtn = document.querySelector('.close');
const prevBtn = document.querySelector('.modal-nav.prev');
const nextBtn = document.querySelector('.modal-nav.next');

// Get all gallery items
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        const gallery = this.closest('.gallery-grid');
        const galleryName = gallery.getAttribute('data-gallery');
        currentIndex = parseInt(this.getAttribute('data-index'));
        
        // Get all images in this gallery
        currentGallery = Array.from(gallery.querySelectorAll('.gallery-item img'));
        
        openModal(currentIndex);
    });
});

function openModal(index) {
    modal.style.display = 'flex';
    showImage(index);
}

function showImage(index) {
    currentIndex = index;
    const img = currentGallery[currentIndex];
    modalImg.src = img.src;
    captionText.textContent = img.alt;
}

// Close modal
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Navigate to previous image
prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
    showImage(currentIndex);
});

// Navigate to next image
nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % currentGallery.length;
    showImage(currentIndex);
});

// Close modal when clicking outside the image
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (modal.style.display === 'flex') {
        if (e.key === 'ArrowLeft') {
            prevBtn.click();
        } else if (e.key === 'ArrowRight') {
            nextBtn.click();
        } else if (e.key === 'Escape') {
            modal.style.display = 'none';
        }
    }
});
