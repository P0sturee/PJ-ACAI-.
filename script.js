function alterarQtd(id, valor) {
  const span = document.getElementById(id + "-qtd");
  let qtd = parseInt(span.innerText);
  qtd = Math.max(0, qtd + valor);
  span.innerText = qtd;
  calcularTotal();
}

function calcularTotal() {
  let total = 0;
  document.querySelectorAll(".produto").forEach(p => {
    const id = p.dataset.id;
    const preco = parseFloat(p.dataset.preco);
    const qtd = parseInt(document.getElementById(id + "-qtd").innerText);
    total += preco * qtd;
  });
  document.getElementById("total").innerText = total.toFixed(2);
}

function finalizarPedido() {
  const endereco = document.getElementById("endereco").value.trim();
  if (!endereco) {
    alert("Informe o endereço de entrega");
    return;
  }

  let msg = "🍧 *Pedido PJ AÇAÍ* 🍧\n\n";
  let temPedido = false;

  document.querySelectorAll(".produto").forEach(p => {
    const id = p.dataset.id;
    const nome = p.dataset.nome;
    const qtd = parseInt(document.getElementById(id + "-qtd").innerText);
    if (qtd === 0) return;

    if (p.dataset.fruta === "true") {
      const fruta = p.querySelector("input[type=radio]:checked");
      if (!fruta) {
        alert("Escolha a fruta da batida");
        throw "erro";
      }
      msg += `🍹 *${nome}* x${qtd}\n🍓 Fruta: ${fruta.value}\n`;
    } else {
      msg += `🍧 *${nome}* x${qtd}\n`;
    }

    p.querySelectorAll("input[type=checkbox]:checked").forEach(i => {
      msg += `➕ ${i.value}\n`;
    });

    msg += "\n";
    temPedido = true;
  });

  if (!temPedido) {
    alert("Adicione pelo menos um item");
    return;
  }

  msg += `📍 *Endereço:*\n${endereco}\n\n💰 *Total:* R$ ${document.getElementById("total").innerText}\n🚚 Frete calculado à parte\n💜 *Pagamento:* PIX`;

  window.open(
    "https://wa.me/554195758534?text=" + encodeURIComponent(msg),
    "_blank"
  );
}