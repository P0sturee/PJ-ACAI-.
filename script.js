function alterarQtd(btn, delta) {
  const produto = btn.closest('.produto');
  const qtdSpan = produto.querySelector('.qtd');
  let qtd = parseInt(qtdSpan.innerText);
  qtd = Math.max(0, qtd + delta);
  qtdSpan.innerText = qtd;

  const unidadesDiv = produto.querySelector('.unidades');
  unidadesDiv.innerHTML = '';

  const tipo = produto.dataset.tipo;

  for (let i = 1; i <= qtd; i++) {
    const unidade = document.createElement('div');
    unidade.className = 'unidade';
    unidade.innerHTML = `<strong>Unidade ${i}</strong>`;

    if (tipo === 'fruta') {
      unidade.innerHTML += `
        <p>Escolha 1 fruta:</p>
        <label class="opcao"><input type="radio" name="fruta-${produto.dataset.nome}-${i}"> Morango</label>
        <label class="opcao"><input type="radio" name="fruta-${produto.dataset.nome}-${i}"> Abacaxi</label>
        <label class="opcao"><input type="radio" name="fruta-${produto.dataset.nome}-${i}"> Maracujá</label>
      `;
    }

    const extras = tipo === 'pote'
      ? ['Leite em pó','Creme de avelã','Leite condensado','Calda de morango','Calda de chocolate','Chocoball','Confete']
      : ['Leite em pó','Creme de avelã','Leite condensado','Calda de morango','Calda de chocolate'];

    extras.forEach(e => {
      unidade.innerHTML += `<label class="opcao"><input type="checkbox"> ${e}</label>`;
    });

    unidadesDiv.appendChild(unidade);
  }
}

function finalizarPedido() {
  const endereco = document.getElementById('endereco').value.trim();
  if (!endereco) {
    alert('Informe o endereço para entrega');
    return;
  }

  let msg = 'Pedido PJ AÇAÍ:%0A%0A';

  document.querySelectorAll('.produto').forEach(p => {
    const qtd = p.querySelector('.qtd').innerText;
    if (qtd > 0) msg += `${p.dataset.nome} x${qtd}%0A`;
  });

  msg += `%0AEndereço: ${endereco}%0APagamento: PIX`;

  window.open('https://wa.me/5541995758534?text=' + msg, '_blank');
}