// Este arquivo pode ficar vazio, pois o HTML já possui o JS inline.
// Se quiser, pode adicionar um log:
console.log("pagamento.js carregado");

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