document.addEventListener('DOMContentLoaded', function() {
    // All your existing code...

    // ===== Lightbox Modal Functionality =====
    const modal = document.getElementById("imageModal");
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
        modal.classList.add("show");
        modalImg.src = img.src;
        captionText.innerHTML = item.querySelector(".portfolio-overlay h3").textContent + 
                              " - " + 
                              item.querySelector(".portfolio-overlay p").textContent;
        document.body.style.overflow = "hidden";
        currentImageIndex = index;
    }

    // Open modal when clicking on a portfolio image
    portfolioItems.forEach((item, index) => {
        const img = item.querySelector("img");
        img.style.cursor = "pointer"; // Add pointer cursor to indicate clickability
        
        img.addEventListener("click", (e) => {
            e.preventDefault();
            openModal(index);
        });
        
        // Also make the overlay clickable
        const overlay = item.querySelector(".portfolio-overlay");
        if (overlay) {
            overlay.style.cursor = "pointer";
            overlay.addEventListener("click", (e) => {
                e.preventDefault();
                openModal(index);
            });
        }
    });

    // Close modal
    function closeModal() {
        modal.classList.remove("show");
        document.body.style.overflow = "auto";
    }

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
        if (modal.classList.contains("show")) {
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
        captionText.innerHTML = item.querySelector(".portfolio-overlay h3").textContent + 
                              " - " + 
                              item.querySelector(".portfolio-overlay p").textContent;
    }
});
