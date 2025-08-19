// Modern Interactive Resume Script
// Author: Macha Praveen
// Enhanced with futuristic interactions and animations

class FuturisticResume {
    constructor() {
        this.currentSection = 'overview';
        this.isAnimating = false;
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupSkillBars();
        this.setupDownloadButton();
        this.setupTypewriterEffect();
        this.setupParallaxScrolling();
        this.setupContactLinks();
        this.showSection('overview');
        this.startMatrixAnimation();
    }

    // Navigation System
    setupNavigation() {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                if (this.isAnimating) return;
                
                const section = e.target.dataset.section;
                if (section && section !== this.currentSection) {
                    this.showSection(section);
                    this.updateNavigation(e.target);
                }
            });
        });
    }

    showSection(sectionName) {
        if (this.isAnimating) return;
        this.isAnimating = true;

        // Hide current section
        const currentSection = document.querySelector('.section.active');
        if (currentSection) {
            currentSection.style.opacity = '0';
            currentSection.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                currentSection.classList.remove('active');
                this.displaySection(sectionName);
            }, 300);
        } else {
            this.displaySection(sectionName);
        }
    }

    displaySection(sectionName) {
        const newSection = document.querySelector(`.section[data-section="${sectionName}"]`);
        if (newSection) {
            newSection.classList.add('active');
            newSection.style.opacity = '0';
            newSection.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                newSection.style.opacity = '1';
                newSection.style.transform = 'translateY(0)';
                this.currentSection = sectionName;
                this.isAnimating = false;
                
                // Trigger section-specific animations
                this.triggerSectionAnimations(sectionName);
            }, 50);
        }
    }

    updateNavigation(activeItem) {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        activeItem.classList.add('active');
    }

    triggerSectionAnimations(sectionName) {
        switch(sectionName) {
            case 'skills':
                this.animateSkillBars();
                break;
            case 'projects':
                this.animateProjectCards();
                break;
            case 'experience':
                this.animateTimeline();
                break;
            case 'overview':
                this.animateOverviewCards();
                break;
        }
    }

    // Skill Bar Animations
    setupSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach(bar => {
            bar.style.width = '0%';
        });
    }

    animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach((bar, index) => {
            setTimeout(() => {
                const targetWidth = bar.dataset.skill || '90%';
                bar.style.width = targetWidth;
            }, index * 100);
        });
    }

    // Project Cards Animation
    animateProjectCards() {
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 150);
        });
    }

    // Timeline Animation
    animateTimeline() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-50px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.8s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 200);
        });
    }

    // Overview Cards Animation
    animateOverviewCards() {
        const overviewCards = document.querySelectorAll('.overview-card');
        overviewCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            }, index * 100);
        });
    }

    // Typewriter Effect
    setupTypewriterEffect() {
        const typewriterElement = document.querySelector('.subtitle');
        if (typewriterElement) {
            const text = typewriterElement.textContent;
            typewriterElement.textContent = '';
            
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    typewriterElement.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                } else {
                    // Add blinking cursor
                    typewriterElement.innerHTML += '<span class="cursor">|</span>';
                }
            };
            
            setTimeout(typeWriter, 1000);
        }
    }

    // Parallax Scrolling Effect
    setupParallaxScrolling() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            document.body.style.transform = `translateY(${rate}px)`;
        });
    }

    // Contact Links Enhancement
    setupContactLinks() {
        const contactItems = document.querySelectorAll('.contact-item');
        contactItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateX(10px) scale(1.05)';
                item.style.color = 'var(--primary-color)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateX(0) scale(1)';
                item.style.color = 'var(--text-secondary)';
            });
        });
    }

    // PDF Download Functionality
    setupDownloadButton() {
        const downloadBtn = document.querySelector('.download-btn');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => {
                this.generatePDF();
            });
        }
    }

    generatePDF() {
        const downloadBtn = document.querySelector('.download-btn');
        const originalText = downloadBtn.innerHTML;
        
        // Show loading state
        downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
        downloadBtn.style.pointerEvents = 'none';
        
        // Show all sections for PDF generation
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            section.style.display = 'block';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        });
        
        // Use browser print function
        setTimeout(() => {
            window.print();
            
            // Restore original state
            sections.forEach(section => {
                if (!section.classList.contains('active')) {
                    section.style.display = 'none';
                }
            });
            
            downloadBtn.innerHTML = originalText;
            downloadBtn.style.pointerEvents = 'auto';
        }, 1000);
    }

    // Matrix-style background animation
    startMatrixAnimation() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.zIndex = '-2';
        canvas.style.opacity = '0.03';
        
        document.body.appendChild(canvas);
        
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        
        const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        const charArray = chars.split('');
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = [];
        
        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }
        
        const draw = () => {
            ctx.fillStyle = 'rgba(10, 10, 15, 0.04)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#00d4ff';
            ctx.font = fontSize + 'px monospace';
            
            for (let i = 0; i < drops.length; i++) {
                const text = charArray[Math.floor(Math.random() * charArray.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };
        
        setInterval(draw, 100);
    }

    // Keyboard navigation
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            const sections = ['overview', 'skills', 'experience', 'projects', 'education'];
            const currentIndex = sections.indexOf(this.currentSection);
            
            switch(e.key) {
                case 'ArrowRight':
                case 'Tab':
                    e.preventDefault();
                    if (currentIndex < sections.length - 1) {
                        this.showSection(sections[currentIndex + 1]);
                        this.updateNavigation(document.querySelector(`[data-section="${sections[currentIndex + 1]}"]`));
                    }
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    if (currentIndex > 0) {
                        this.showSection(sections[currentIndex - 1]);
                        this.updateNavigation(document.querySelector(`[data-section="${sections[currentIndex - 1]}"]`));
                    }
                    break;
                case 'Home':
                    e.preventDefault();
                    this.showSection('overview');
                    this.updateNavigation(document.querySelector('[data-section="overview"]'));
                    break;
                case 'End':
                    e.preventDefault();
                    this.showSection('education');
                    this.updateNavigation(document.querySelector('[data-section="education"]'));
                    break;
                case 'p':
                case 'P':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        this.generatePDF();
                    }
                    break;
            }
        });
    }

    // Easter egg - Konami code
    setupEasterEgg() {
        const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
        let konamiIndex = 0;
        
        document.addEventListener('keydown', (e) => {
            if (e.keyCode === konamiCode[konamiIndex]) {
                konamiIndex++;
                if (konamiIndex === konamiCode.length) {
                    this.activateEasterEgg();
                    konamiIndex = 0;
                }
            } else {
                konamiIndex = 0;
            }
        });
    }

    activateEasterEgg() {
        document.body.style.filter = 'hue-rotate(180deg) invert(1)';
        setTimeout(() => {
            document.body.style.filter = '';
        }, 5000);
        
        console.log('🎉 You found the easter egg! Thanks for exploring my resume!');
    }
}

// Utility Functions
function createParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: var(--primary-color);
            border-radius: 50%;
            animation: float ${Math.random() * 10 + 5}s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.5 + 0.1};
        `;
        particleContainer.appendChild(particle);
    }
    
    document.body.appendChild(particleContainer);
}

// Add floating particle animation to CSS
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes float {
        0% {
            transform: translateY(0px) rotate(0deg);
        }
        50% {
            transform: translateY(-20px) rotate(180deg);
        }
        100% {
            transform: translateY(0px) rotate(360deg);
        }
    }
    
    .cursor {
        animation: blink 1s infinite;
    }
    
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
`;
document.head.appendChild(particleStyle);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FuturisticResume();
    createParticles();
    
    // Add loading screen
    const loader = document.createElement('div');
    loader.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--bg-primary);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            transition: opacity 0.5s ease;
        ">
            <div style="
                text-align: center;
                color: var(--primary-color);
                font-size: 1.5rem;
            ">
                <i class="fas fa-rocket" style="font-size: 3rem; margin-bottom: 1rem; animation: pulse 1s infinite;"></i>
                <div>Initializing Futuristic Resume...</div>
            </div>
        </div>
    `;
    document.body.appendChild(loader);
    
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
    }, 2000);
});

// Add smooth scrolling for better UX
document.documentElement.style.scrollBehavior = 'smooth';

// Performance optimization
if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
        console.log('🚀 Futuristic Resume loaded successfully!');
        console.log('⌨️  Keyboard shortcuts:');
        console.log('  Arrow keys: Navigate sections');
        console.log('  Ctrl+P: Generate PDF');
        console.log('  Try the Konami code for a surprise!');
    });
}