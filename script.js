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

    // Batida de frutas → fruta obrigatória
    if (tipo === 'fruta') {
      unidade.innerHTML += `
        <p><strong>Escolha a fruta:</strong></p>
        <label class="opcao"><input type="radio" name="fruta-${produto.dataset.nome}-${i}" value="Morango"> Morango</label>
        <label class="opcao"><input type="radio" name="fruta-${produto.dataset.nome}-${i}" value="Abacaxi"> Abacaxi</label>
        <label class="opcao"><input type="radio" name="fruta-${produto.dataset.nome}-${i}" value="Maracujá"> Maracujá</label>
      `;
    }

    const extras = tipo === 'pote'
      ? ['Leite em pó','Creme de avelã','Leite condensado','Calda de morango','Calda de chocolate','Chocoball','Confete']
      : ['Leite em pó','Creme de avelã','Leite condensado','Calda de morango','Calda de chocolate'];

    unidade.innerHTML += `<p><strong>Adicionais:</strong></p>`;

    extras.forEach(extra => {
      unidade.innerHTML += `
        <label class="opcao">
          <input type="checkbox" value="${extra}"> ${extra}
        </label>
      `;
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

  let mensagem = 'Pedido PJ AÇAÍ 🍧%0A%0A';
  let total = 0;

  document.querySelectorAll('.produto').forEach(produto => {
    const qtd = parseInt(produto.querySelector('.qtd').innerText);
    if (qtd === 0) return;

    const nome = produto.dataset.nome;
    const preco = parseFloat(produto.dataset.preco);
    const tipo = produto.dataset.tipo;

    mensagem += `${nome} (R$${preco})%0A`;

    const unidades = produto.querySelectorAll('.unidade');

    unidades.forEach((unidade, index) => {
      mensagem += `• Unidade ${index + 1}:%0A`;

      // Fruta
      if (tipo === 'fruta') {
        const fruta = unidade.querySelector('input[type="radio"]:checked');
        if (fruta) {
          mensagem += `  - Fruta: ${fruta.value}%0A`;
        }
      }

      // Extras
      const extrasMarcados = unidade.querySelectorAll('input[type="checkbox"]:checked');
      extrasMarcados.forEach(extra => {
        mensagem += `  - ${extra.value}%0A`;
      });
    });

    mensagem += `%0A`;
    total += preco * qtd;
  });

  mensagem += `📍 Endereço:%0A${endereco}%0A%0A`;
  mensagem += `💰 Total: R$${total.toFixed(2)}%0A`;
  mensagem += `🚚 Frete informado após o pedido%0A`;
  mensagem += `💜 Pagamento: PIX`;

  window.open(
    `https://wa.me/5541995758534?text=${mensagem}`,
    '_blank'
  );
}