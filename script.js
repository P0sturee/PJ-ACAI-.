function alterarQtd(btn, valor) {
  const span = btn.parentElement.querySelector("span");
  let qtd = parseInt(span.innerText);
  qtd = Math.max(0, qtd + valor);
  span.innerText = qtd;
}

function finalizarPedido() {
  let msg = "🍧 *Pedido PJ AÇAÍ* 🍧\n\n";
  let total = 0;

  document.querySelectorAll(".produto").forEach(p => {
    const qtd = parseInt(p.querySelector(".quantidade span").innerText);
    if (qtd > 0) {
      const nome = p.dataset.nome;
      const preco = parseFloat(p.dataset.preco);
      total += preco * qtd;

      msg += `• ${nome} x${qtd}\n`;

      const fruta = p.querySelector(".fruta");
      if (fruta && fruta.value) msg += `  🍓 Fruta: ${fruta.value}\n`;

      const extras = [...p.querySelectorAll("input:checked")].map(e => e.value);
      if (extras.length) msg += `  ➕ Extras: ${extras.join(", ")}\n`;

      msg += "\n";
    }
  });

  const endereco = document.getElementById("endereco").value;
  msg += `📍 Endereço: ${endereco || "Não informado"}\n\n`;
  msg += `💜 Pagamento: PIX\n`;
  msg += `🚚 Frete calculado após o pedido\n\n`;
  msg += `💰 Total: R$ ${total.toFixed(2)}`;

  const numero = "554195758534";
  window.open(`https://wa.me/${numero}?text=${encodeURIComponent(msg)}`);
}