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
const featuresContainer = document.querySelector('.features-container') as HTMLElement;
const dots = document.querySelectorAll('.dot');

let currentIndex = 0;

function updateSlider(index: number) {
    // Move o container para a posição correta
    featuresContainer.style.transform = `translateX(-${index * 100}%)`;

    // Atualiza os dots
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');

    currentIndex = index;
}

// Adiciona evento de clique nos dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        updateSlider(index);
    });
});
