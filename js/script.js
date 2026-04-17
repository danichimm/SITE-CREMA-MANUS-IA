// Smooth scrolling para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animação fade-in ao scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observar elementos para animação
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.section-title, .feature-item, .store-card, .event-item, .review-card, .contact-card');
    elementsToAnimate.forEach(el => observer.observe(el));
});

// Efeito parallax sutil no hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-section');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Preloader simples
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Otimização de performance para scroll
let ticking = false;

function updateScrollEffects() {
    // Efeitos de scroll aqui
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
    }
});

// Lazy loading para imagens
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========================================
// RASTREAMENTO DE EVENTOS - CREMA DI LATTE
// ========================================
// Este código rastreia os cliques nos botões "Como Chegar"
// e envia os dados para o Google Analytics 4

// Rastrear cliques no botão "Como Chegar"
document.addEventListener('DOMContentLoaded', function() {
    // Selecionar todos os botões "Como Chegar"
    const storeButtons = document.querySelectorAll('.store-button');
    
    storeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Pegar o nome da loja (está no elemento irmão .store-title)
            const storeCard = this.closest('.store-card');
            const storeName = storeCard ? storeCard.querySelector('.store-title').textContent : 'Loja Desconhecida';
            
            // Enviar evento para o Google Analytics 4
            gtag('event', 'clique_como_chegar', {
                'event_category': 'engajamento',
                'event_label': storeName,
                'value': 1
            });
            
            // Log no console (para você testar)
            console.log('✅ Evento rastreado: Clique em Como Chegar - ' + storeName);
        });
    });
    
    // Rastrear cliques nos botões de contato (WhatsApp, Instagram, TikTok)
    const contactButtons = document.querySelectorAll('.contact-button, .events-button, .whatsapp-float a');
    
    contactButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Pegar o texto do botão para identificar qual foi clicado
            const buttonText = this.textContent.trim();
            let eventLabel = 'Contato Desconhecido';
            
            if (buttonText.includes('WhatsApp') || buttonText.includes('Chamar')) {
                eventLabel = 'WhatsApp';
            } else if (buttonText.includes('Instagram')) {
                eventLabel = 'Instagram';
            } else if (buttonText.includes('TikTok')) {
                eventLabel = 'TikTok';
            } else if (buttonText.includes('evento')) {
                eventLabel = 'Levar para Evento';
            }
            
            // Enviar evento para o Google Analytics 4
            gtag('event', 'clique_contato', {
                'event_category': 'engajamento',
                'event_label': eventLabel,
                'value': 1
            });
            
            // Log no console
            console.log('✅ Evento rastreado: Clique em ' + eventLabel);
        });
    });
    
    // Rastrear cliques no botão "Nossas Lojas" (hero section)
    const heroButton = document.querySelector('.hero-button');
    if (heroButton) {
        heroButton.addEventListener('click', function(e) {
            gtag('event', 'clique_nossas_lojas', {
                'event_category': 'navegacao',
                'event_label': 'Hero Section',
                'value': 1
            });
            
            console.log('✅ Evento rastreado: Clique em Nossas Lojas');
        });
    }
});

// ========================================
// RASTREAMENTO DE SCROLL
// ========================================
// Rastrear quando o usuário chega na seção de lojas

let scrollEventFired = false;

window.addEventListener('scroll', function() {
    if (!scrollEventFired) {
        const lojasSection = document.getElementById('lojas');
        if (lojasSection) {
            const rect = lojasSection.getBoundingClientRect();
            // Se a seção de lojas entrou na viewport
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                gtag('event', 'visualizacao_lojas', {
                    'event_category': 'engajamento',
                    'event_label': 'Seção Nossas Lojas',
                    'value': 1
                });
                
                console.log('✅ Evento rastreado: Visualização da Seção Nossas Lojas');
                scrollEventFired = true; // Dispara apenas uma vez
            }
        }
    }
});
