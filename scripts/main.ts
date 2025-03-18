// Ativa o menu de navegação ao clicar no botão de alternância (menu-toggle)
document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menu-toggle") as HTMLButtonElement;
    const navLinks = document.querySelector(".nav-links") as HTMLUListElement;
    const navIcons = document.querySelector(".nav-icons") as HTMLLIElement;

    if (!menuToggle || !navLinks || !navIcons) {
        console.error("Erro: Elementos de menu não encontrados no DOM.");
        return;
    }

    // Alterna a classe 'open' no botão e 'active' no menu de navegação
    menuToggle.addEventListener("click", () => {
        const isOpen = menuToggle.classList.toggle("open");
        navLinks.classList.toggle("active", isOpen);
        navIcons.style.display = isOpen ? "flex" : "none";
    });
});

// Script para manipular o botão de oferta na seção Hero
document.addEventListener("DOMContentLoaded", () => {
    const offerButton = document.getElementById("offer-button");
    const offerText = document.getElementById("offer-text");

    if (offerButton && offerText) {
        // Esconde o botão e exibe o texto da oferta ao clicar no botão
        offerButton.addEventListener("click", () => {
            offerButton.classList.add("hidden");
            offerText.classList.add("show");
        });

        // Exibe o botão novamente e esconde o texto da oferta ao clicar no texto
        offerText.addEventListener("click", () => {
            offerText.classList.remove("show");
            offerButton.classList.remove("hidden");
        });
    }
});

// Navegação pelos slides na seção de Features (recursos)
document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".features-container") as HTMLElement;
    const slides = document.querySelectorAll(".feature-slide");
    const dots = document.querySelectorAll(".dot") as NodeListOf<HTMLElement>;
    let currentIndex = 0;

    // Função para verificar se está em modo mobile
    const isMobile = () => window.innerWidth < 768;

    // Define quantos slides devem ser exibidos por vez
    const getSlidesPerView = () => isMobile() ? 1 : 3;

    // Obtém a quantidade total de slides com base no modo de exibição
    const getTotalSlides = () => isMobile() 
        ? Math.ceil(document.querySelectorAll('.feature-card').length / getSlidesPerView()) 
        : slides.length;

    // Atualiza a posição do slide na tela
    const updateSlidePosition = () => {
        const totalSlides = getTotalSlides();
        currentIndex = Math.max(0, Math.min(currentIndex, totalSlides - 1));
        const movePercentage = isMobile() ? (window.innerWidth < 1124 ? 200 : 300) / totalSlides : 100 / totalSlides;
        container.style.transform = `translateX(${-currentIndex * movePercentage}%)`;
        updateDots(totalSlides);
    };

    // Atualiza os dots de navegação
    const updateDots = (totalSlides: number) => {
        dots.forEach((dot, index) => {
            dot.classList.toggle("active", index === currentIndex);
            dot.style.display = index < totalSlides ? "inline-block" : "none";
        });
    };

    // Adiciona evento de clique nos dots para alterar os slides
    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            currentIndex = index;
            updateSlidePosition();
        });
    });

    // Ajusta a posição ao redimensionar a tela
    window.addEventListener("resize", updateSlidePosition);

    // Inicializa a posição correta do slider
    updateSlidePosition();
});

// Navegação pelos depoimentos na seção Testimonials
document.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector(".testimonial-container") as HTMLElement;
    const dotsContainer = document.getElementById("testimonial-dots") as HTMLElement;
    let slides = document.querySelectorAll(".testimonial-slide");
    let dots: HTMLSpanElement[] = [];
    let index = 0;

    const isMobile = () => window.innerWidth < 768;
    const getSlidesPerView = () => isMobile() ? 1 : 2;

    // Atualiza a classe ativa dos dots
    const updateDots = () => {
        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === index);
        });
    };

    // Atualiza a posição do slider ao navegar
    const updateSlider = () => {
        const slideWidth = slides[0] ? (slides[0] as HTMLElement).offsetWidth : 0;
        const translateX = -(index * slideWidth);
        slider.style.transform = `translateX(${translateX}px)`;
    };

    // Muda o slide ao clicar nos dots
    const goToSlide = (newIndex: number) => {
        if (newIndex >= 0 && newIndex < dots.length) {
            index = newIndex;
            updateSlider();
            updateDots();
        }
    };

    // Inicializa o slider e configura os dots
    const setupSlider = () => {
        slides = document.querySelectorAll(".testimonial-slide");
        dotsContainer.innerHTML = "";
        const slidesPerView = getSlidesPerView();
        const dotsCount = isMobile() ? 6 : 2;
        dots = [];

        for (let i = 0; i < dotsCount; i++) {
            const dot = document.createElement("span");
            dot.classList.add("testimonial-dot");
            if (i === 0) dot.classList.add("active");
            dotsContainer.appendChild(dot);
            dots.push(dot);
            dot.addEventListener("click", () => goToSlide(i));
        }

        slides.forEach(slide => (slide as HTMLElement).style.flex = `0 0 ${100 / slidesPerView}%`);
        updateSlider();
        updateDots();
    };

    window.addEventListener("resize", setupSlider);
    setupSlider();
});

// Adiciona funcionalidade de expandir categorias no rodapé (mobile)
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".footer-category h3").forEach((category) => {
        category.addEventListener("click", () => {
            const parent = category.parentElement;
            if (parent) {
                parent.classList.toggle("active");
            }
        });
    });
});


// Validação do formulário da newsletter e armazenamento de e-mails no LocalStorage
const form = document.querySelector(".newsletter-form") as HTMLFormElement;
const emailInput = document.querySelector("#newsletter-email") as HTMLInputElement;
const popUp = document.querySelector("#pop-up") as HTMLElement;
const popUpMessage = document.querySelector("#pop-up-message") as HTMLElement;
const closeBtn = document.querySelector(".close-btn") as HTMLElement;

// Verifica se o e-mail tem um formato válido
const isValidEmail = (email: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Obtém os e-mails cadastrados no LocalStorage
const getSubscribedEmails = (): string[] => {
    const storedEmails = localStorage.getItem("subscribedEmails");
    return storedEmails ? JSON.parse(storedEmails) : [];
};

// Salva um novo e-mail no LocalStorage
const saveEmail = (email: string) => {
    const emails = getSubscribedEmails();
    emails.push(email);
    localStorage.setItem("subscribedEmails", JSON.stringify(emails));
};

// Exibe uma mensagem no pop-up
const showPopUp = (message: string, isSuccess: boolean) => {
    popUpMessage.textContent = message;
    popUpMessage.className = isSuccess ? "success" : "error";
    popUp.style.display = "flex";
};

// Evento de envio do formulário
form.addEventListener("submit", (event) => {
    event.preventDefault(); 

    const email = emailInput.value.trim();
    const subscribedEmails = getSubscribedEmails(); // Obtém os e-mails já cadastrados

    if (!email) {
        showPopUp("Errore: Inserisci la tua email!", false);
    } else if (!isValidEmail(email)) {
        showPopUp("Errore: Inserisci un'e-mail valida!", false);
    } else if (subscribedEmails.includes(email)) {
        showPopUp("Errore: Questo indirizzo email è già iscritto!", false);
    } else {
        saveEmail(email); // Salva o novo e-mail na lista
        showPopUp("Successo! Sei stato iscritto alla newsletter.", true);
        emailInput.value = ""; // Limpa o campo de e-mail
    }
});

// Fecha o pop-up ao clicar fora dele ou no botão de fechar
closeBtn.addEventListener("click", () => popUp.style.display = "none");
window.addEventListener("click", (event) => {
    if (event.target === popUp) popUp.style.display = "none";
});
