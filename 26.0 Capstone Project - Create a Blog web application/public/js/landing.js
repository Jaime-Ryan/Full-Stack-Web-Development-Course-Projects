document.addEventListener('DOMContentLoaded', () => {
    console.log('Landing page script loaded'); // Debug log
    const overlay = document.getElementById('gridOverlay');
    const letters = document.querySelectorAll('.letter');
    const gridBackground = document.querySelector('.grid-background');
    const lightToggle = document.getElementById('lightToggle');
    const html = document.documentElement;

    // Light Animation Elements
    const lightBulb = document.querySelector('.light-bulb');
    const lightGlow = document.querySelector('.light-glow');
    const beamCenter = document.querySelector('.beam-center');
    const beamGlow = document.querySelector('.beam-glow');
    const hero = document.querySelector('.hero');

    // Function to create random flicker effect
    const flicker = (target, baseOpacity, intensity = 1) => {
        const flickerTimeline = gsap.timeline({
            repeat: 2,
            yoyo: true,
            onComplete: () => gsap.to(target, {
                opacity: baseOpacity,
                duration: 0.2
            })
        });

        for (let i = 0; i < 4; i++) {
            flickerTimeline.to(target, {
                opacity: baseOpacity * (0.3 + Math.random() * 0.7) * intensity,
                duration: 0.1
            });
        }

        return flickerTimeline;
    };

    // Create light animation timeline
    const createLightAnimation = (on) => {
        const tl = gsap.timeline({
            defaults: { duration: 0.5, ease: "power2.inOut" }
        });

        if (on) {
            // Turn on animation
            tl.to(lightBulb, {
                opacity: 0.3,
                filter: "brightness(0.3)",
                duration: 0.8
            })
            .add(flicker(lightBulb, 0.5))
            .to([beamCenter, beamGlow], {
                scaleY: 1,
                opacity: (i) => i === 0 ? 0.4 : 0.3,
                duration: 1.5,
                ease: "power1.inOut",
                stagger: 0.1
            }, "-=0.3")
            .add(flicker(lightBulb, 0.8, 1.2))
            .add(flicker(beamCenter, 0.4, 1.5), "-=0.5")
            .add(flicker(beamGlow, 0.3, 1.5), "-=0.5")
            .to(lightBulb, {
                opacity: 1,
                filter: "brightness(1.2)",
                duration: 0.8
            })
            .to(beamCenter, {
                opacity: 0.8,
                duration: 0.8
            }, "-=0.8")
            .to(beamGlow, {
                opacity: 0.6,
                duration: 0.8
            }, "-=0.8")
            .to(lightGlow, {
                opacity: 1,
                duration: 0.5
            }, "-=0.4");
        } else {
            // Turn off animation
            tl.to([lightGlow, beamCenter, beamGlow], {
                opacity: 0,
                duration: 0.3,
                stagger: 0.1
            })
            .to([beamCenter, beamGlow], {
                scaleY: 0,
                duration: 0.5,
                ease: "power2.in"
            }, "-=0.2")
            .to(lightBulb, {
                opacity: 0.1,
                filter: "brightness(0.1)",
                duration: 0.3
            }, "-=0.3");
        }

        return tl;
    };

    // Initialize in dark mode with light on
    gsap.set([lightBulb, lightGlow, beamCenter, beamGlow], {
        opacity: 1,
        scaleY: 1
    });

    // Start with light on in dark mode
    hero.classList.add('light-on');
    createLightAnimation(true);

    // Handle light switch toggle
    lightToggle.addEventListener('change', () => {
        const isLightMode = lightToggle.checked;
        
        // Toggle dark mode class
        html.classList.toggle('dark-mode', !isLightMode);
        
        // Run animation
        if (!isLightMode) {
            // Switching to dark mode - turn light on
            hero.classList.add('light-on');
            createLightAnimation(true);
        } else {
            // Switching to light mode - turn light off
            hero.classList.remove('light-on');
            createLightAnimation(false);
        }
    });

    // Function to generate random pastel color
    function getRandomPastelColor() {
        const hue = Math.floor(Math.random() * 360);
        return `hsla(${hue}, 100%, 70%, 0.3)`;
    }

    // Function to generate random vibrant color
    function getRandomVibrantColor() {
        const hues = [
            [345, 100, 50], // Red
            [200, 100, 50], // Blue
            [160, 100, 50], // Green
            [280, 100, 50], // Purple
            [40, 100, 50],  // Orange
            [300, 100, 50], // Pink
            [60, 100, 50]   // Yellow
        ];
        const [h, s, l] = hues[Math.floor(Math.random() * hues.length)];
        return `hsla(${h}, ${s}%, ${l}%, 0.3)`;
    }

    // Keep track of the last cell to avoid duplicates
    let lastCell = null;
    
    document.addEventListener('mousemove', (e) => {
        // Calculate the current cell position
        const x = Math.floor(e.clientX / 40) * 40;
        const y = Math.floor(e.clientY / 40) * 40;
        
        // Skip if we're still in the same cell
        if (lastCell && lastCell.x === x && lastCell.y === y) return;
        lastCell = { x, y };
        
        // Create a single cell at the current position
        let cell = document.createElement('div');
        cell.className = 'grid-cell';
        cell.style.left = `${x}px`;
        cell.style.top = `${y}px`;
        
        // Apply a random color
        const color = Math.random() > 0.5 ? 
            getRandomPastelColor() : 
            getRandomVibrantColor();
        cell.style.backgroundColor = color;
        
        // Add to grid background
        gridBackground.appendChild(cell);
        
        // Remove cell after animation
        setTimeout(() => {
            cell.style.opacity = '0';
            setTimeout(() => cell.remove(), 300);
        }, 1000);
    });

    function createGrid() {
        console.log('Creating grid'); // Debug log
        const cols = Math.ceil(window.innerWidth / 40);
        const rows = Math.ceil(window.innerHeight / 40);
        const totalCells = cols * rows;

        console.log(`Creating ${totalCells} cells (${cols}x${rows})`); // Debug log

        // Create all cells at once
        const cellsHTML = Array(totalCells).fill('<div class="grid-cell"></div>').join('');
        gridBackground.innerHTML = cellsHTML;
    }

    // Create initial grid
    createGrid();

    // Recreate grid on resize
    window.addEventListener('resize', () => {
        requestAnimationFrame(createGrid);
    });

    // Handle grid cell hover effects
    let timeout;
    gridBackground.addEventListener('mousemove', (e) => {
        const cell = e.target;
        if (cell.classList.contains('grid-cell')) {
            cell.classList.add('active');
            
            // Remove active class after animation
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                cell.classList.remove('active');
            }, 800);
        }
    });
    
    // Add mouse movement effect
    document.addEventListener('mousemove', (e) => {
        letters.forEach(letter => {
            const rect = letter.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const deltaX = (e.clientX - centerX) / 20;
            const deltaY = (e.clientY - centerY) / 20;
            
            letter.style.transform = `translateZ(20px) 
                rotateX(${-deltaY}deg) 
                rotateY(${deltaX}deg)`;
        });
    });

    // Reset transform on mouse leave
    document.addEventListener('mouseleave', () => {
        letters.forEach(letter => {
            letter.style.transform = 'translateZ(0) rotateX(0) rotateY(0)';
        });
    });

    // Add click effect
    letters.forEach(letter => {
        letter.addEventListener('click', () => {
            letter.style.color = getRandomColor();
            
            // Reset color after animation
            setTimeout(() => {
                letter.style.color = '';
            }, 1000);
        });
    });

    // Rotating Titles Functionality
    function initRotatingTitles() {
        console.log('Initializing rotating titles...'); // Debug log
        const titles = document.querySelectorAll('.title');
        console.log('Found titles:', titles); // Debug log to check if elements are found
        
        let currentIndex = 0;
        
        // Show the first title
        if (titles.length > 0) {
            console.log('Activating first title'); // Debug log
            titles[0].classList.add('active');
        } else {
            console.error('No title elements found!'); // Error log if no titles found
        }
        
        // Rotate titles every 3 seconds
        setInterval(() => {
            console.log('Rotating to next title'); // Debug log
            // Remove active class from current title
            titles[currentIndex].classList.remove('active');
            
            // Move to next title (loop back to 0 if at the end)
            currentIndex = (currentIndex + 1) % titles.length;
            
            // Add active class to new title
            titles[currentIndex].classList.add('active');
        }, 3000);
    }
    
    // Initialize rotating titles
    initRotatingTitles();
});

// Generate random pastel color
function getRandomColor() {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 80%, 80%)`;
}
