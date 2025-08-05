document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const progressBar = document.getElementById('progressBar');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const presentationContainer = document.getElementById('presentationContainer');

    let currentSlide = 0;

    function updateSlide() {
        slides.forEach((slide, index) => {
            if (index === currentSlide) {
                slide.classList.add('active');
                slide.classList.remove('prev');
            } else if (index < currentSlide) {
                slide.classList.remove('active');
                slide.classList.add('prev');
            } else {
                slide.classList.remove('active');
                slide.classList.remove('prev');
            }
        });

        // Update progress bar
        const progress = (currentSlide / (slides.length - 1)) * 100;
        progressBar.style.width = `${progress}%`;
    }

    function nextSlide() {
        if (currentSlide < slides.length - 1) {
            currentSlide++;
            updateSlide();
        }
    }

    function prevSlide() {
        if (currentSlide > 0) {
            currentSlide--;
            updateSlide();
        }
    }

    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            presentationContainer.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable fullscreen: ${err.message}`);
            });
            fullscreenBtn.textContent = '❐ Exit Fullscreen';
        } else {
            document.exitFullscreen();
            fullscreenBtn.textContent = '⛶ Fullscreen';
        }
    }

    // Button events
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    fullscreenBtn.addEventListener('click', toggleFullscreen);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'f') toggleFullscreen();
        if (e.key === 'Escape' && document.fullscreenElement) {
            document.exitFullscreen();
            fullscreenBtn.textContent = '⛶ Fullscreen';
        }
    });

    // Fullscreen change event
    document.addEventListener('fullscreenchange', () => {
        if (!document.fullscreenElement) {
            fullscreenBtn.textContent = '⛶ Fullscreen';
        }
    });

    // Initialize
    updateSlide();

    // Auto-enter fullscreen (will only work with user interaction)
    document.addEventListener('click', function initialFullscreen() {
        toggleFullscreen();
        document.removeEventListener('click', initialFullscreen);
    }, { once: true });
});