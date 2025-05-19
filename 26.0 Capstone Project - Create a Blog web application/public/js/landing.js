document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('gridOverlay');
    const letters = document.querySelectorAll('.letter');

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
        const gridBackground = document.querySelector('.grid-background');
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
});

// Generate random pastel color
function getRandomColor() {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 80%, 80%)`;
}
