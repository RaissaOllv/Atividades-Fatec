document.addEventListener('DOMContentLoaded', () => {
    const galinha = document.getElementById('galinha');
    const somExplosao = document.getElementById('somExplosao');
    const somGalinha = document.getElementById('somGalinha');
    let explodiu = false;

    // Função para fazer a tela tremer
    function shakeScreen() {
        document.body.classList.add('shake');
        setTimeout(() => {
            document.body.classList.remove('shake');
        }, 500);
    }

    // Posicionar galinha inicialmente
    function posicionarGalinha() {
        // Adicionar margem de 20px das bordas
        const maxX = Math.max(0, window.innerWidth - 190);
        const maxY = Math.max(0, window.innerHeight - 190);
        
        // Garantir que a posição seja pelo menos 20px da borda
        const posX = Math.min(Math.max(20, Math.random() * maxX), maxX);
        const posY = Math.min(Math.max(20, Math.random() * maxY), maxY);
        
        galinha.style.left = `${posX}px`;
        galinha.style.top = `${posY}px`;
    }

    // Mover galinha a cada 0.8 segundos
    function iniciarMovimento() {
        posicionarGalinha();
        setInterval(() => {
            if (!explodiu) {
                posicionarGalinha();
            }
        }, 800); // 0.8 segundos
    }

    // Criar efeito de explosão com penas
    function criarPena(x, y) {
        const pena = document.createElement('div');
        pena.className = 'pena';
        pena.textContent = '🪶';
        pena.style.left = `${x}px`;
        pena.style.top = `${y}px`;
        
        // Direção mais aleatória para cada pena
        const angulo = Math.random() * Math.PI * 2;
        const distancia = 50 + Math.random() * 300; // Distância mais variada
        const destinoX = Math.cos(angulo) * distancia;
        const destinoY = Math.sin(angulo) * distancia + 200; // Adiciona um pouco de gravidade
        
        pena.style.setProperty('--x', `${destinoX}px`);
        pena.style.setProperty('--y', `${destinoY}px`);
        
        document.body.appendChild(pena);
        setTimeout(() => pena.remove(), 3000); // Aumentado para 3 segundos para combinar com a animação
    }

    // Criar uma explosão de muitas penas
    function criarExplosao(x, y) {
        // Primeira onda de penas (explosão)
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                criarPena(x, y);
            }, i * 30);
        }

        // Segunda onda de penas (chuva)
        setTimeout(() => {
            for (let i = 0; i < 30; i++) {
                setTimeout(() => {
                    const offsetX = Math.random() * window.innerWidth;
                    criarPena(offsetX, -50); // Começa no topo da tela
                }, i * 100);
            }
        }, 500);
    }

    // Explodir galinha ao clicar
    galinha.addEventListener('click', () => {
        if (!explodiu) {
            explodiu = true;
            
            // Tocar sons
            somExplosao.currentTime = 0;
            somExplosao.volume = 0.5;
            somExplosao.play().catch(e => console.log('Erro ao tocar explosão:', e));
            
            setTimeout(() => {
                somGalinha.currentTime = 0;
                somGalinha.volume = 0.7;
                somGalinha.play().catch(e => console.log('Erro ao tocar galinha:', e));
            }, 100);

            // Criar explosão de penas
            const rect = galinha.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            // Fazer a tela tremer
            shakeScreen();

            criarExplosao(centerX, centerY);

            // Esconder galinha
            galinha.style.display = 'none';

            // Mostrar mensagem
            setTimeout(() => {
                alert("VIROU NUGGETS! 🐔💥");
            }, 1000);
        }
    });

    // Iniciar jogo
    iniciarMovimento();
});
