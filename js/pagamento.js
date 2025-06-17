console.log("pagamento.js carregado");

// Seleciona corretamente o elemento select da forma de pagamento pelo ID
document.getElementById('formaPagamento').addEventListener('change', function() {
  const pixDiv = document.getElementById('pix-qrcode');
  if (this.value === 'pix') {
    pixDiv.style.display = 'block';
  } else {
    pixDiv.style.display = 'none';
  }
});

// Dispara ao carregar para garantir o estado inicial
document.getElementById('formaPagamento').dispatchEvent(new Event('change'));

// Adiciona um event listener para o formulário usando o seletor de classe
const pagamentoForm = document.querySelector('.pagamento-form'); // Seletor corrigido para a classe do formulário

// Verifica se o formulário foi encontrado antes de adicionar o event listener
if (pagamentoForm) {
  pagamentoForm.addEventListener('submit', function(event) {
    // Previne o comportamento padrão de submissão do formulário (recarregar a página)
    event.preventDefault();

    // Aqui você adicionaria a lógica real de processamento do pagamento (enviar dados para o servidor, etc.)
    // Como este é um exemplo front-end, vamos apenas simular o sucesso e redirecionar.

    console.log("Formulário de pagamento submetido. Redirecionando...");

    // Verifica a validade do formulário antes de redirecionar (boa prática)
    if (pagamentoForm.checkValidity()) {
      // Redireciona para a página de minhas-viagens.html
      window.location.href = 'minhas-viagens.html';
    } else {
      console.log("Formulário inválido. Por favor, preencha todos os campos obrigatórios.");
      // Você pode adicionar código aqui para mostrar uma mensagem de erro para o usuário
    }
  });
} else {
  console.error("Formulário com classe 'pagamento-form' não encontrado.");
}
