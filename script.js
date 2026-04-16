document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('.links a');
    
    links.forEach(link => {
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
        particle.style.background = 'rgba(255, 255, 255, 0.8)';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1';
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.top = window.innerHeight + 'px';
        particle.style.boxShadow = '0 0 6px rgba(255, 255, 255, 0.5)';
        
        document.body.appendChild(particle);
        
        const duration = Math.random() * 2000 + 1000;
        const horizontalMovement = (Math.random() - 0.5) * 150;
        
        particle.animate([
            { 
                transform: 'translateY(0) translateX(0) scale(1)', 
                opacity: 0 
            },
            { 
                transform: 'translateY(-100px) translateX(' + (horizontalMovement * 0.3) + 'px) scale(1.2)', 
                opacity: 1,
                offset: 0.1
            },
            { 
                transform: 'translateY(-' + (window.innerHeight + 100) + 'px) translateX(' + horizontalMovement + 'px) scale(0.8)', 
                opacity: 0 
            }
        ], {
            duration: duration,
            easing: 'linear'
        }).onfinish = () => particle.remove();
    }

    setInterval(createParticle, 100);
    
    for (let i = 0; i < 20; i++) {
        setTimeout(createParticle, i * 50);
    }

    const style = document.createElement('style');
    style.textContent = `
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
        }
    `;
    document.head.appendChild(style);
});

console.log('%c  hi, what are you doing here ', 'background: #000000; color: #ffffff; font-size: 16px; padding: 10px; border-radius: 5px;');
