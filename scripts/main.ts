document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menu-toggle") as HTMLButtonElement | null;
    const navLinks = document.querySelector(".nav-links") as HTMLUListElement | null;
    const navIcons = document.querySelector(".nav-icons") as HTMLLIElement | null;

    if (!menuToggle || !navLinks || !navIcons) {
        console.error("Erro: Elementos de menu não encontrados no DOM.");
        return;
    }

    menuToggle.addEventListener("click", () => {
        const isOpen = menuToggle.classList.toggle("open");
        navLinks.classList.toggle("active", isOpen);

        // Garante que os ícones só aparecem quando o menu estiver aberto
        navIcons.style.display = isOpen ? "flex" : "none";
    });
});

// Scrip for offer button
document.addEventListener("DOMContentLoaded", () => {
    const offerButton = document.getElementById("offer-button");
    const offerText = document.getElementById("offer-text");

    if (offerButton && offerText) {
        offerButton.addEventListener("click", () => {
            offerButton.classList.add("hidden");
            offerText.classList.add("show");
        });

        offerText.addEventListener("click", () => {
            offerText.classList.remove("show");
            offerButton.classList.remove("hidden");
        });
    }
});

// Scrip for products button in collection
const container = document.querySelector(".collections-products") as HTMLElement;
const prevBtn = document.getElementById("prevBtn") as HTMLButtonElement;
const nextBtn = document.getElementById("nextBtn") as HTMLButtonElement;
const card = document.querySelector(".collection-card") as HTMLElement;

if (container && prevBtn && nextBtn && card) {
    const cardWidth = card.offsetWidth + 16; // Largura do card + gap

    prevBtn.addEventListener("click", () => {
        container.scrollBy({ left: -cardWidth, behavior: "smooth" });
    });

    nextBtn.addEventListener("click", () => {
        container.scrollBy({ left: cardWidth, behavior: "smooth" });
    });
}

// Navigation Buttons section Products
document.addEventListener("DOMContentLoaded", () => {
    const productContainer = document.querySelector(".spring-products") as HTMLElement;
    const prevButton = document.querySelector(".spring-nav.prev") as HTMLButtonElement;
    const nextButton = document.querySelector(".spring-nav.next") as HTMLButtonElement;

    // Amount of pixels to scroll
    const scrollAmount = 300;

    // Function to scroll to the left
    prevButton.addEventListener("click", () => {
        productContainer.scrollBy({
            left: -scrollAmount,
            behavior: "smooth" // Faz a rolagem ser suave
        });
    });

    // Function to scroll to the right
    nextButton.addEventListener("click", () => {
        productContainer.scrollBy({
            left: scrollAmount,
            behavior: "smooth"
        });
    });
});

// Dots Features Section navigation
document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".features-container") as HTMLElement;
    const slides = document.querySelectorAll(".feature-slide");
    const cards = document.querySelectorAll(".feature-card");
    const dots = document.querySelectorAll(".dot") as NodeListOf<HTMLElement>;
    let currentIndex = 0;

    
    

    function isMobile(): boolean {
        return window.innerWidth < 768;
    }

    function getSlidesPerView(): number {
        return isMobile() ? 1 : 3;
    }

    function getTotalSlides(): number {
        return isMobile() 
            ? Math.ceil(document.querySelectorAll('.feature-card').length / getSlidesPerView()) 
            : document.querySelectorAll('.feature-slide').length;
    }
    

    function identifySlides() {
        console.log(`Tamanho da tela: ${window.innerWidth}px`);
        console.log(`Slides por exibição: ${getSlidesPerView()}`);
        console.log(`Total de slides necessários: ${getTotalSlides()}`);
    }

    function updateSlidePosition() {
        const totalSlides = getTotalSlides();
        currentIndex = Math.max(0, Math.min(currentIndex, totalSlides - 1));
        
        let movePercentage;
        if (isMobile()) {
            let containerWidth = window.innerWidth < 1124 ? 200 : 300;
            movePercentage = containerWidth / totalSlides;
        } else {
            movePercentage = 100 / totalSlides;
        }
        
        let offset = -(currentIndex * movePercentage);
        container.style.transform = `translateX(${offset}%)`;

        updateDots(totalSlides);
    }

    function updateDots(totalSlides: number) {
        dots.forEach((dot, index) => {
            dot.classList.toggle("active", index === currentIndex);
            dot.style.display = index < totalSlides ? "inline-block" : "none";
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            currentIndex = index;
            updateSlidePosition();
        });
    });

    window.addEventListener("resize", () => {
        identifySlides();
        updateSlidePosition();
    });

    identifySlides();
    updateSlidePosition();
});


document.addEventListener("DOMContentLoaded", function () {
    let cards = document.querySelectorAll(".spring-card");
    
    cards.forEach(card => card.classList.remove("last-card"));

    if (cards.length % 3 === 1) { 
        cards[cards.length - 1].classList.add("last-card");
    }
});



