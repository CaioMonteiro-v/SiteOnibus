document.addEventListener('DOMContentLoaded', () => {
  const vendas = JSON.parse(localStorage.getItem('vendas')) || [];
  const tbody = document.querySelector('.tabela-vendas tbody');

  tbody.innerHTML = '';
  let totalValor = 0;

  if (vendas.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="8" style="text-align:center; padding:20px;">
          Você ainda não realizou nenhuma compra.
        </td>
      </tr>`;
  } else {
    vendas.forEach((v, idx) => {
      const cancelado = v.status === 'cancelado';
      const valorLinha = cancelado ? 0 : v.preco;
      totalValor += valorLinha;

      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${v.id || idx + 1}</td>
        <td>${v.cliente || '—'}</td>
        <td>${v.origem}</td>
        <td>${v.destino}</td>
        <td>${v.data}</td>
        <td>
          <span class="status ${cancelado ? 'cancelado' : 'confirmado'}">
            ${cancelado ? 'Cancelado' : 'Confirmado'}
          </span>
        </td>
        <td>
          <button class="btn-acao" data-index="${idx}" title="Detalhes">
            <i class="fas fa-eye"></i>
          </button>
        </td>
        <td>
          ${cancelado ? '-' : `<button class="btn-cancelar" data-index="${idx}">Cancelar</button>`}
        </td>
      `;
      tbody.appendChild(row);
    });
  }

  // Atualiza os cartões de resumo
  document.getElementById('total-arrecadado').textContent = `R$ ${totalValor.toFixed(2)}`;
  document.getElementById('total-passagens').textContent = vendas.length;
  document.getElementById('media-venda').textContent =
    vendas.length ? `R$ ${(totalValor / vendas.length).toFixed(2)}` : 'R$ 0,00';

  // Ação de detalhes
  document.querySelectorAll('.btn-acao').forEach(btn =>
    btn.addEventListener('click', e => {
      const venda = vendas[+e.currentTarget.dataset.index];
      alert(
        `Detalhes da Venda:\n` +
        `Origem: ${venda.origem}\n` +
        `Destino: ${venda.destino}\n` +
        `Data: ${venda.data} - ${venda.horario}\n` +
        `Empresa: ${venda.empresa}\n` +
        `Assento: ${venda.assento}\n` +
        `Valor: R$ ${venda.preco.toFixed(2)}\n` +
        `Status: ${venda.status || 'Confirmado'}`
      );
    })
  );

  // Ação de cancelamento
  document.querySelectorAll('.btn-cancelar').forEach(btn =>
    btn.addEventListener('click', e => {
      const index = +e.currentTarget.dataset.index;
      const confirmacao = confirm("Deseja realmente cancelar esta passagem?");
      if (confirmacao) {
        vendas[index].status = 'cancelado';
        localStorage.setItem('vendas', JSON.stringify(vendas));
        alert("Passagem cancelada com sucesso.");
        location.reload();
      }
    })
  );
});
