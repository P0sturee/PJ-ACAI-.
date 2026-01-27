function alterarQtd(btn, delta) {
  const produto = btn.closest('.produto');
  const qtdSpan = produto.querySelector('.qtd');
  let qtd = parseInt(qtdSpan.innerText);

  qtd = Math.max(0, qtd + delta);
  qtdSpan.innerText = qtd;

  const unidadesDiv = produto.querySelector('.unidades');
  unidadesDiv.innerHTML = '';

  const tipo = produto.dataset.tipo;

  const ingredientesBatido = [
    'Leite em pó',
    'Creme de avelã',
    'Leite condensado',
    'Calda de morango'
  ];

  const ingredientesPote = [
    'Leite em pó',
    'Chocoball',
    'Confetes',
    'Creme de avelã',
    'Leite condensado',
    'Calda de morango'
  ];

  const listaIngredientes = tipo === 'batido'
    ? ingredientesBatido
    : ingredientesPote;

  for (let i = 1; i <= qtd; i++) {
    const unidade = document.createElement('div');
    unidade.className = 'unidade';
    unidade.innerHTML = `<strong>🥣 Unidade ${i}</strong>`;

    listaIngredientes.forEach(item => {
      const opcao = document.createElement('label');
      opcao.className = 'opcao';
      opcao.innerHTML = `<input type="checkbox" value="${item}"> ${item}`;
      unidade.appendChild(opcao);
    });

    if (produto.dataset.talher) {
      const talher = document.createElement('label');
      talher.className = 'opcao';
      talher.innerHTML = `<input type="checkbox" value="Talher"> Acompanhar talher`;
      unidade.appendChild(talher);
    }

    unidadesDiv.appendChild(unidade);
  }
}

function finalizarPedido() {
  const endereco = document.getElementById('endereco').value;
  let msg = '🍧 *Pedido PJ AÇAÍ* 🍧%0A%0A';

  document.querySelectorAll('.produto').forEach(produto => {
    const qtd = parseInt(produto.querySelector('.qtd').innerText);
    if (qtd > 0) {
      msg += `📦 *${produto.dataset.nome}* x${qtd}%0A`;

      const unidades = produto.querySelectorAll('.unidade');
      unidades.forEach((unidade, index) => {
        const extras = [];
        unidade.querySelectorAll('input[type="checkbox"]:checked').forEach(cb => {
          extras.push(cb.value);
        });

        if (extras.length > 0) {
          msg += `   ➕ Unidade ${index + 1}: ${extras.join(', ')}%0A`;
        }
      });

      msg += '%0A';
    }
  });

  msg += `📍 *Endereço:* ${endereco}%0A`;
  msg += `💳 *Pagamento:* PIX`;

  window.open(
    `https://wa.me/5541995647320?text=${msg}`,
    '_blank'
  );
}