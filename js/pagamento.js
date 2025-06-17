console.log("pagamento.js carregado");

document.querySelector('#formaPagamento').addEventListener('change', function () {
  const pixDiv = document.getElementById('pix-qrcode');
  if (this.value === 'pix') {
    pixDiv.style.display = 'block';
  } else {
    pixDiv.style.display = 'none';
  }
});

// Dispara ao carregar para garantir o estado inicial
document.querySelector('#formaPagamento').dispatchEvent(new Event('change'));

document.querySelector('#paymentForm').addEventListener('submit', function (event) {
  event.preventDefault();
  if (this.checkValidity()) {
    window.location.href = 'minhas-viagens.html';
  }
});