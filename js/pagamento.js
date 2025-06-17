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

    // Capturando os dados do resumo
    const origem = document.querySelector('#resumo p:nth-child(1)').innerText.split(': ')[1];
    const destino = document.querySelector('#resumo p:nth-child(2)').innerText.split(': ')[1];
    const data = document.querySelector('#resumo p:nth-child(3)').innerText.split(': ')[1];
    const preco = document.querySelector('#resumo p:nth-child(6)').innerText.split(': ')[1];
    const formaPagamento = document.getElementById('formaPagamento').value;

    // Criando o objeto da venda
    const venda = {
      id: Date.now().toString(),
      origem: origem,
      destino: destino,
      data: data,
      preco: preco,
      formaPagamento: formaPagamento,
      status: 'confirmado'
    };

    // Salvando no localStorage
    const vendas = JSON.parse(localStorage.getItem('vendas')) || [];
    vendas.push(venda);
    localStorage.setItem('vendas', JSON.stringify(vendas));

    console.log("Venda salva com sucesso:", venda);

    // Redireciona
    window.location.href = 'minhas-viagens.html';
  });

} else {
  console.error("Formulário com classe 'pagamento-form' não encontrado.");
}
