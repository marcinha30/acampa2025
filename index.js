function salvarPergunta() {
  const input = document.getElementById("pergunta");
  const texto = input.value.trim();

  if (!texto) {
    alert("Digite uma pergunta.");
    return;
  }

  const perguntas = JSON.parse(localStorage.getItem("perguntas") || "[]");

  perguntas.push({
    texto,
    data: new Date().toISOString()
  });

  localStorage.setItem("perguntas", JSON.stringify(perguntas));

  input.value = "";
  document.getElementById("feedback").textContent = "✅ Sua pergunta foi enviada!";
}
function limparPerguntas() {
  if (confirm("Tem certeza que deseja apagar todas as perguntas?")) {
    localStorage.removeItem("perguntas");
    document.getElementById("lista").innerHTML = "<li>Nenhuma pergunta registrada.</li>";
    alert("Perguntas apagadas com sucesso.");
  }
}
