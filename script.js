document.addEventListener('DOMContentLoaded', function() {
    const aboutTexts = [
        "I'm so fucking tired"
    ];
    
    let lastText = '';
    
    function getRandomText() {
        let newText;
        do {
            newText = aboutTexts[Math.floor(Math.random() * aboutTexts.length)];
        } while (newText === lastText);
        
        lastText = newText;
        return newText;
    }
    
    const aboutElement = document.querySelector('.hero-content p');
    const randomText = getRandomText();
    
    aboutElement.style.opacity = '0';
    setTimeout(() => {
        aboutElement.textContent = randomText;
        aboutElement.style.opacity = '1';
    }, 300);
    const linksContainer = document.querySelector('.links');
    const links = Array.from(linksContainer.querySelectorAll('a'));
    
    const linkData = links.map(link => {
        const href = link.getAttribute('href');
        const text = link.textContent.trim();
        
        let platform = '';
        let username = '';
        
        if (href.includes('discord.com')) platform = 'Discord';
        else if (href.includes('github.com')) platform = 'GitHub';
        else if (href.includes('gitlab.com')) platform = 'GitLab';
        else if (href.includes('pinterest.com')) platform = 'Pinterest';
        else if (href.includes('t.me')) platform = 'Telegram';
        else if (href.includes('tiktok.com')) platform = 'TikTok';
        else if (href.includes('twitter.com')) platform = 'Twitter';
        
        const match = text.match(/\/(.+)/);
        username = match ? match[1].trim() : text;
        
        return { element: link, platform, username, href };
    });
    
    linkData.sort((a, b) => {
        const platformCompare = a.platform.localeCompare(b.platform);
        if (platformCompare !== 0) return platformCompare;
        return a.username.localeCompare(b.username);
    });
    
    linksContainer.innerHTML = '';
    linkData.forEach(data => {
        linksContainer.appendChild(data.element);
    });
    const linkElements = document.querySelectorAll('.links a');
    
    linkElements.forEach(link => {
        link.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    function createParticle() {
        const particle = document.createElement('div');
        const size = Math.random() * 3 + 1;
        particle.style.position = 'fixed';
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        const colors = [
            'rgba(255, 255, 255, 0.9)',
            'rgba(255, 248, 220, 0.8)',
            'rgba(173, 216, 230, 0.8)',
            'rgba(255, 182, 193, 0.7)',
            'rgba(221, 160, 221, 0.7)',
            'rgba(152, 251, 152, 0.6)'
        ];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.background = randomColor;
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1';
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.top = window.innerHeight + 'px';
        
        particle.classList.add('star');
        
        const glowColor = randomColor.replace(/[\d.]+\)/, '0.6)');
        particle.style.boxShadow = `0 0 ${size * 3}px ${glowColor}, 0 0 ${size * 6}px ${glowColor.replace('0.6', '0.3)')}`;
        
        document.body.appendChild(particle);
        
        const duration = Math.random() * 3000 + 1500;
        const horizontalMovement = (Math.random() - 0.5) * 200;
        
        particle.animate([
            { 
                transform: 'translateY(0) translateX(0) scale(0.5) rotate(0deg)', 
                opacity: 0 
            },
            { 
                transform: 'translateY(-50px) translateX(' + (horizontalMovement * 0.2) + 'px) scale(1.2) rotate(45deg)', 
                opacity: 1,
                offset: 0.1
            },
            { 
                transform: 'translateY(-' + (window.innerHeight + 150) + 'px) translateX(' + horizontalMovement + 'px) scale(1) rotate(90deg)', 
                opacity: 0.6,
                offset: 0.8
            },
            { 
                transform: 'translateY(-' + (window.innerHeight + 200) + 'px) translateX(' + horizontalMovement + 'px) scale(0.5) rotate(180deg)', 
                opacity: 0 
            }
        ], {
            duration: duration,
            easing: 'linear'
        }).onfinish = () => particle.remove();
    }

    setInterval(createParticle, 36);
    
    for (let i = 0; i < 70; i++) {
        setTimeout(createParticle, i * 21);
    }

    const style = document.createElement('style');
    style.textContent = `
        .star {
            clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        body {
            overflow-x: hidden;
            background: #141220;
        }
    `;
    document.head.appendChild(style);
});

console.log('%c  hi, what are you doing here ', 'background: #000000; color: #ffffff; font-size: 16px; padding: 10px; border-radius: 5px;');
