// Console Welcome Message
console.log(
    '%cWelcome to my portfolio! 🎮\nTry these shortcuts:\nM - Matrix Effect\nT - Terminal\nE - Color Effects\nH - Help\nTry "resume" in terminal',
    'color: #00f3ff; font-size: 16px; font-weight: bold;'
);

document.addEventListener('DOMContentLoaded', () => {
    // Scroll Arrow Functionality
    document.querySelector('.scroll-arrow').addEventListener('click', () => {
        document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
    });

    // Initialize Matrix Rain
    const canvas = document.getElementById('matrixRain');
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix Rain Characters
    const chars = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789';
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#00ff00'; // Brighter green
        ctx.font = `${fontSize}px monospace`;
        ctx.shadowBlur = 8; // Add glow effect
        ctx.shadowColor = '#00ff00';

        for (let i = 0; i < drops.length; i++) {
            const char = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(char, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    // Terminal State
    let isTerminalActive = false;

    // Terminal Elements
    const terminal = document.querySelector('.terminal');
    const terminalInput = terminal.querySelector('.terminal-input');
    const terminalOutput = document.getElementById('terminal-output');
    const terminalClose = terminal.querySelector('.terminal-close');

    // Resume Functions
    function triggerResumeDownload() {
        document.getElementById('resumeDownload').click();
    }

    function viewResume() {
        window.open('assets/Jawad_Ali_Resume.pdf', '_blank');
    }

    // Terminal Commands
    const commands = {
        help: () => `Available commands:
- about: Display information about me
- skills: List my technical skills
- projects: View my projects
- contact: Get my contact information
- experience: Show my work experience
- matrix: Toggle matrix rain effect
- clear: Clear terminal
- hack: Start hacking simulation
- resume: View or download my resume
- exit: Close terminal`,
        
        about: () => `Jawad Ali
Software Engineering Student at Iowa State University
Expected Graduation: May 2027
Focus: Building innovative solutions and embedded systems`,
        
        skills: () => `Technical Skills:
- Java
- C Programming
- Git
- Algorithms
- React.js
- HTML/CSS
- JavaScript`,
        
        projects: () => `Projects:
1. Weather Application (React, API Integration)
2. Snake Game (Java)
3. Maze Navigation (C, DS4 Controller)
4. Bowling Game (Java, OOP)`,
        
        experience: () => `Experience:
1. Software Engineering Peer Mentor - Iowa State University (Aug 2024 - Present)
2. Embedded Software Developer - Solar Power Club (Nov 2024 - Present)
3. Science Bound Host - Science Bound (Aug 2023 - Present)
4. Camp Educator - Science Center of Iowa (May 2023 - Present)`,
        
        contact: () => `Contact Information:
Email: jfrenzii50@gmail.com
GitHub: https://github.com/Boorenzii
LinkedIn: https://www.linkedin.com/in/jawadhali/`,
        
        resume: () => `Resume options:
1. Type 'resume view' to open resume in new tab
2. Type 'resume download' to download PDF
`,
        
        'resume view': () => {
            viewResume();
            return 'Opening resume in new tab...';
        },
        
        'resume download': () => {
            triggerResumeDownload();
            return 'Downloading resume...';
        },
        
        clear: () => {
            terminalOutput.innerHTML = '';
            return '';
        },
        
        exit: () => {
            toggleTerminal(false);
            return '';
        },
        
        matrix: () => {
            toggleMatrix();
            return 'Matrix rain effect toggled.';
        },
        
        hack: () => {
            startHackingAnimation();
            return 'Initiating hack sequence...';
        }
    };

    function startHackingAnimation() {
        const chars = '01';
        let output = '';
        const iterations = 20;
        let i = 0;

        const interval = setInterval(() => {
            output += Array(50).fill(0).map(() => 
                chars[Math.floor(Math.random() * chars.length)]
            ).join('') + '\n';
            
            terminalOutput.innerHTML = `<div style="color: #0F0">${output}</div>`;
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
            
            i++;
            if (i >= iterations) {
                clearInterval(interval);
                terminalOutput.innerHTML += '<div style="color: #0F0">Hack complete! Access granted.</div>';
            }
        }, 100);
    }

    function toggleTerminal(show = null) {
        isTerminalActive = show !== null ? show : !isTerminalActive;
        terminal.style.display = isTerminalActive ? 'block' : 'none';
        if (isTerminalActive) {
            setTimeout(() => {
                terminalInput.focus();
                terminalInput.value = '';
            }, 50);
        }
    }

    // Matrix Toggle
    let matrixActive = false;
    let matrixInterval;

    function toggleMatrix() {
        matrixActive = !matrixActive;
        if (matrixActive) {
            canvas.style.display = 'block';
            matrixInterval = setInterval(drawMatrix, 33);
        } else {
            canvas.style.display = 'none';
            clearInterval(matrixInterval);
        }
    }

    // Terminal Event Listeners
    terminalInput.addEventListener('keydown', (e) => {
        e.stopPropagation(); // Prevent keyboard shortcuts while typing
        
        if (e.key === 'Enter') {
            const command = terminalInput.value.trim().toLowerCase();
            const output = document.createElement('div');
            output.innerHTML = `<span class="terminal-prompt">guest@portfolio:~$</span> ${command}`;
            
            if (commands[command]) {
                output.innerHTML += `<br>${commands[command]()}`;
            } else if (command) {
                output.innerHTML += '<br>Command not found. Type "help" for available commands.';
            }
            
            terminalOutput.appendChild(output);
            terminalInput.value = '';
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
        }
    });

    terminalClose.addEventListener('click', () => {
        toggleTerminal(false);
    });

    // Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
        // Don't trigger shortcuts if typing in terminal
        if (e.target.tagName.toLowerCase() === 'input') {
            return;
        }

        // Matrix Effect (M)
        if (e.key.toLowerCase() === 'm') {
            toggleMatrix();
        }
        // Terminal Toggle (T)
        if (e.key.toLowerCase() === 't') {
            e.preventDefault();
            toggleTerminal();
        }
        // Effects (E)
        if (e.key.toLowerCase() === 'e') {
            const name = document.querySelector('.glitch-name');
            name.style.animation = 'glitch 0.3s infinite';
            setTimeout(() => {
                name.style.animation = 'nameColorCycle 10s infinite';
            }, 2000);
        }
        // Help (H)
        if (e.key.toLowerCase() === 'h') {
            document.querySelector('.shortcut-guide').style.display = 
                document.querySelector('.shortcut-guide').style.display === 'none' ? 'block' : 'none';
        }
        // ESC to close overlays
        if (e.key === 'Escape') {
            toggleTerminal(false);
            document.querySelector('.shortcut-guide').style.display = 'none';
        }
    });

    // Initialize
    canvas.style.display = 'none';
    terminal.style.display = 'none';
});