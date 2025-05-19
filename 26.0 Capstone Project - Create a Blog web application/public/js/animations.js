document.addEventListener('DOMContentLoaded', () => {
    class FireworkEffect {
        constructor(letterElement) {
            this.letter = letterElement;
            this.originalText = letterElement.textContent;
            this.isAnimating = false;
            this.particles = [];
            this.setupEventListeners();
        }

        setupEventListeners() {
            this.letter.addEventListener('mouseenter', () => this.explode());
        }

        createParticle(x, y, angle, distance, size, color) {
            const particle = document.createElement('span');
            particle.className = 'letter particle';
            particle.textContent = this.originalText;
            particle.style.position = 'fixed';
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            particle.style.fontSize = `${size}px`;
            particle.style.color = color;
            particle.style.pointerEvents = 'none';
            particle.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            particle.style.zIndex = '1000';
            particle.style.willChange = 'transform, opacity';
            particle.style.opacity = '1';
            
            document.body.appendChild(particle);
            this.particles.push(particle);
            
            // Calculate final position with more dramatic spread
            const radians = (angle * Math.PI) / 180;
            const curve = 1.2;
            const spread = 2.5;
            
            const finalX = x + Math.cos(radians) * distance * spread;
            const finalY = y + Math.sin(radians) * distance * 0.7 - 100 * curve;
            
            // Animate particle
            requestAnimationFrame(() => {
                particle.style.transform = `
                    translate(${finalX - x}px, ${finalY - y}px) 
                    rotate(${angle + 360}deg) 
                    scale(${0.3 + Math.random() * 0.4})`;
                particle.style.opacity = '0';
            });
            
            // Remove particle after animation
            setTimeout(() => {
                if (particle && particle.parentNode) {
                    particle.remove();
                    this.particles = this.particles.filter(p => p !== particle);
                }
            }, 1000);
            
            return particle;
        }


        explode() {
            if (this.isAnimating) return;
            this.isAnimating = true;
            
            const rect = this.letter.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const numParticles = 20;
            const particleSize = 30 + Math.random() * 20;
            
            // Hide the original letter during animation
            this.letter.style.visibility = 'hidden';
            
            // Create explosion effect
            for (let i = 0; i < numParticles; i++) {
                const angle = (i / numParticles) * Math.PI * 2;
                const distance = 80 + Math.random() * 120;
                const delay = Math.random() * 100;
                
                const colors = [
                    '#FF5252', '#FF4081', '#E040FB', '#7C4DFF',
                    '#536DFE', '#448AFF', '#40C4FF', '#18FFFF',
                    '#64FFDA', '#69F0AE', '#B2FF59', '#EEFF41',
                    '#FFFF00', '#FFD740', '#FFAB40', '#FF6E40'
                ];
                const color = colors[Math.floor(Math.random() * colors.length)];
                
                setTimeout(() => {
                    if (this.isAnimating) { // Only create if still animating
                        this.createParticle(
                            centerX,
                            centerY,
                            (angle * 180) / Math.PI,
                            distance,
                            particleSize,
                            color
                        );
                    }
                }, delay);
            }
            
            // Reset after animation
            setTimeout(() => {
                this.letter.style.visibility = 'visible';
                this.isAnimating = false;
            }, 1000);
        }
    }

    // Initialize the effect on all letters
    const letters = document.querySelectorAll('.floating-letters .letter');
    letters.forEach(letter => {
        new FireworkEffect(letter);
    });
    
    // Grid background effect
    const gridOverlay = document.getElementById('gridOverlay');
    if (gridOverlay) {
        document.addEventListener('mousemove', (e) => {
            const x = Math.floor(e.clientX / 40) * 40;
            const y = Math.floor(e.clientY / 40) * 40;
            gridOverlay.style.transform = `translate(${x}px, ${y}px)`;
            gridOverlay.style.opacity = '0.3';
        });
        
        document.addEventListener('mouseleave', () => {
            gridOverlay.style.opacity = '0';
        });
    }
});
