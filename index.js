document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-pergunta");
  const feedback = document.getElementById("feedback");
  const perguntaInput = document.getElementById("pergunta");

  // ✅ Desativa o textarea assim que a página carrega
  perguntaInput.disabled = true;

  // ✅ Ativa o textarea quando o usuário escolhe o gênero
  const generoRadios = document.querySelectorAll('input[name="genero"]');
  generoRadios.forEach(radio => {
    radio.addEventListener("change", () => {
      perguntaInput.disabled = false;
      perguntaInput.focus();
    });
  });

  // ✅ Envio da pergunta
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const texto = perguntaInput.value.trim();
    const generoSelecionado = document.querySelector('input[name="genero"]:checked');

    if (!generoSelecionado) {
      feedback.textContent = "Por favor, selecione se é menino ou menina.";
      return;
    }

    if (!texto) {
      feedback.textContent = "Por favor, escreva uma pergunta.";
      return;
    }

    const dados = {
      texto: texto,
      sexo: generoSelecionado.value,
      data: new Date().toISOString()
    };

    try {
      await fetch("https://script.google.com/macros/s/AKfycbyNaw-cgiqGa8GIkrYHy7ADPm2r8aDHysaKO06mbGRqofj1ZxF3-YravUDI4uYBOopa-A/exec", {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
      });

      feedback.textContent = "Pergunta enviada com sucesso!";
      form.reset();
      perguntaInput.disabled = true; // Bloqueia de novo após envio
    } catch (error) {
      console.error("Erro ao enviar:", error);
      feedback.textContent = "Erro ao enviar pergunta. Tente novamente.";
    }
  });
});
