botao = document.getElementById("botao"); // Seleciona o elemento com ID "botao" e armazena na variável

botao.onmouseover = function() { // Define uma função que executa quando o mouse passa sobre o botão
    botao.style.left = Math.random() * (window.innerWidth - botao.offsetWidth) + "px"; // Move o botão para uma posição horizontal aleatória
    botao.style.top = Math.random() * (window.innerHeight - botao.offsetHeight) + "px"; // Move o botão para uma posição vertical aleatória
};

botao.onfocus = function() { // Define uma função que executa quando o botão ganha foco
    botao.blur(); // Remove o foco do botão imediatamente
};4