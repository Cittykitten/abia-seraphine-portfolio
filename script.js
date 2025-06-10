document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const kebabMenu = document.querySelector('.kebab-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    kebabMenu.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            kebabMenu.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved user preference or use system preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
        document.body.setAttribute('data-theme', 'dark');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        document.body.setAttribute('data-theme', 'light');
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    
    darkModeToggle.addEventListener('click', function() {
        const currentTheme = document.body.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.body.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            this.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            document.body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            this.innerHTML = '<i class="fas fa-sun"></i>';
        }
    });
    
    // Back to Top Button
    const backToTopBtn = document.querySelector('.back-to-top');
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Scroll Reveal Animation
    const sr = ScrollReveal({
        origin: 'top',
        distance: '30px',
        duration: 1000,
        reset: true
    });
    
    sr.reveal('.section-title, .about-content, .portfolio-grid, .services-grid, .contact-content', {
        interval: 200
    });
    
    // Lazy Loading Images
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form Submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Here you would typically send the form data to a server
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }

    document.addEventListener('DOMContentLoaded', function() {
    // ... (keep all your existing code until the lightbox section)

    // ===== Enhanced Lightbox Modal Functionality =====
    const modal = document.getElementById("imageModal");
    if (modal) {
        const modalImg = document.getElementById("modalImage");
        const captionText = document.getElementById("caption");
        const closeBtn = document.querySelector(".close");
        const prevBtn = document.querySelector(".prev");
        const nextBtn = document.querySelector(".next");

        // Get all portfolio items
        const portfolioItems = document.querySelectorAll(".portfolio-item");
        let currentImageIndex = 0;
        const portfolioImages = Array.from(portfolioItems);

        // Function to open modal
        function openModal(index) {
            const item = portfolioImages[index];
            const img = item.querySelector("img");
            modal.style.display = "flex";
            modalImg.src = img.src;
            modalImg.alt = img.alt; // Preserve alt text
            captionText.innerHTML = item.querySelector(".portfolio-overlay h3").textContent + 
                                  " - " + 
                                  item.querySelector(".portfolio-overlay p").textContent;
            document.body.style.overflow = "hidden";
            document.body.style.position = "fixed"; // Prevent scrolling
            currentImageIndex = index;
            
            // Add animation class
            modal.classList.add("show");
        }

        // Close modal
        function closeModal() {
            modal.classList.remove("show");
            setTimeout(() => {
                modal.style.display = "none";
                document.body.style.overflow = "auto";
                document.body.style.position = "static";
            }, 300); // Match this with your CSS transition duration
        }

        // Open modal when clicking on any part of the portfolio item
        portfolioItems.forEach((item, index) => {
            item.style.cursor = "pointer";
            
            item.addEventListener("click", (e) => {
                // Don't open if clicking on a link inside the item
                if (e.target.tagName === 'A') return;
                
                e.preventDefault();
                openModal(index);
            });
        });

        closeBtn.addEventListener("click", closeModal);

        // Close when clicking outside the image
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Navigation between images
        prevBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            currentImageIndex = (currentImageIndex - 1 + portfolioImages.length) % portfolioImages.length;
            updateModalImage();
        });

        nextBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            currentImageIndex = (currentImageIndex + 1) % portfolioImages.length;
            updateModalImage();
        });

        // Keyboard navigation
        document.addEventListener("keydown", (e) => {
            if (modal.style.display === "flex") {
                if (e.key === "ArrowLeft") {
                    currentImageIndex = (currentImageIndex - 1 + portfolioImages.length) % portfolioImages.length;
                    updateModalImage();
                } else if (e.key === "ArrowRight") {
                    currentImageIndex = (currentImageIndex + 1) % portfolioImages.length;
                    updateModalImage();
                } else if (e.key === "Escape") {
                    closeModal();
                }
            }
        });

        function updateModalImage() {
            const item = portfolioImages[currentImageIndex];
            const img = item.querySelector("img");
            modalImg.src = img.src;
            modalImg.alt = img.alt;
            captionText.innerHTML = item.querySelector(".portfolio-overlay h3").textContent + 
                                  " - " + 
                                  item.querySelector(".portfolio-overlay p").textContent;
        }
    }
});
