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
    
    // ========================================
    // RASTREAMENTO DE EVENTOS - CREMA DI LATTE
    // PADRÃO OTIMIZADO COM BEACON (MELHOR SOLUÇÃO)
    // ========================================
    
    // Verificar se gtag está disponível
    if (typeof gtag === 'undefined') {
        console.warn('⚠️ Google Analytics (gtag) não está carregado. Rastreamento desativado.');
        return;
    }
    
    // ========================================
    // 1. RASTREAR CLIQUES EM "COMO CHEGAR"
    // ========================================
    const storeButtons = document.querySelectorAll('.store-button');
    
    if (storeButtons.length === 0) {
        console.warn('⚠️ Nenhum botão com classe .store-button encontrado');
    }
    
    storeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const url = this.href;
            const storeCard = this.closest('.store-card');
            const storeName = storeCard
                ? storeCard.querySelector('.store-title')?.textContent?.trim()
                : 'Loja Desconhecida';
            
            // Enviar evento com transport: 'beacon' (MELHOR SOLUÇÃO)
            gtag('event', 'clique_como_chegar', {
                event_category: 'engajamento',
                event_label: storeName,
                value: 1,
                transport: 'beacon'  // ← Envia em background, não bloqueia navegação
            });
            
            console.log('✅ Evento rastreado (beacon): Clique em Como Chegar - ' + storeName);
            
            // Redireciona IMEDIATAMENTE (beacon envia em background)
            window.location.href = url;
        });
    });
    
    // ========================================
    // 2. RASTREAR CLIQUES EM CONTATO (WhatsApp, Instagram, TikTok)
    // ========================================
    const contactButtons = document.querySelectorAll('.contact-button, .events-button, .whatsapp-float a');
    
    contactButtons.forEach(button => {
        button.addEventListener('click', function(e) {
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
            
            gtag('event', 'clique_contato', {
                event_category: 'engajamento',
                event_label: eventLabel,
                value: 1,
                transport: 'beacon'
            });
            
            console.log('✅ Evento rastreado (beacon): Clique em ' + eventLabel);
        });
    });
    
    // ========================================
    // 3. RASTREAR CLIQUES NO BOTÃO "NOSSAS LOJAS" (HERO SECTION)
    // ========================================
    const heroButton = document.querySelector('.hero-button');
    if (heroButton) {
        heroButton.addEventListener('click', function(e) {
            gtag('event', 'clique_nossas_lojas', {
                event_category: 'navegacao',
                event_label: 'Hero Section',
                value: 1,
                transport: 'beacon'
            });
            
            console.log('✅ Evento rastreado (beacon): Clique em Nossas Lojas');
        });
    }
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
// 4. RASTREAMENTO DE SCROLL - VISUALIZAÇÃO DE LOJAS
// ========================================
let scrollEventFired = false;

window.addEventListener('scroll', function() {
    if (!scrollEventFired) {
        const lojasSection = document.getElementById('lojas');
        if (lojasSection) {
            const rect = lojasSection.getBoundingClientRect();
            // Se a seção de lojas entrou na viewport
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                gtag('event', 'visualizacao_lojas', {
                    event_category: 'engajamento',
                    event_label: 'Seção Nossas Lojas',
                    value: 1,
                    transport: 'beacon'
                });
                
                console.log('✅ Evento rastreado (beacon): Visualização da Seção Nossas Lojas');
                scrollEventFired = true; // Dispara apenas uma vez
            }
        }
    }
});
