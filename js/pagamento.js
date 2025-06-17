console.log("pagamento.js carregado");


document.getElementById('formaPagamento').addEventListener('change', function() {
  const pixDiv = document.getElementById('pix-qrcode');
  if (this.value === 'pix') {
    pixDiv.style.display = 'block';
  } else {
    pixDiv.style.display = 'none';
  }
});


document.getElementById('formaPagamento').dispatchEvent(new Event('change'));

const pagamentoForm = document.querySelector('.pagamento-form');

if (pagamentoForm) {
  pagamentoForm.addEventListener('submit', function(event) {
    event.preventDefault();

    console.log("Formulário de pagamento submetido. Processando...");

    if (pagamentoForm.checkValidity()) {
      
      const origem = document.getElementById('origem').value;
      const destino = document.getElementById('destino').value;
      const data = document.getElementById('data').value;
      const preco = document.getElementById('preco').value;
      const formaPagamento = document.getElementById('formaPagamento').value;

      
      const venda = {
        id: Date.now().toString(), // Gera um ID único
        origem,
        destino,
        data,
        preco,
        formaPagamento,
        status: 'Confirmado'
      };

      
      const vendas = JSON.parse(localStorage.getItem('vendas')) || [];

      // 🔥 Adiciona a nova venda
      vendas.push(venda);

      
      localStorage.setItem('vendas', JSON.stringify(vendas));

      console.log("Venda salva com sucesso!", venda);

      
      window.location.href = 'minhas-viagens.html';

    } else {
      console.log("Formulário inválido. Preencha todos os campos.");
    }
  });

} else {
  console.error("Formulário com classe 'pagamento-form' não encontrado.");
}
