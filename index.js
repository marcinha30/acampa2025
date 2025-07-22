document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-pergunta");
  const feedback = document.getElementById("feedback");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const texto = document.getElementById("pergunta").value.trim();
    const genero = document.querySelector('input[name="genero"]:checked')?.value || "Não informado";

    if (!texto) {
      feedback.textContent = "Por favor, escreva uma pergunta.";
      return;
    }

    const dados = {
      texto: texto,
      genero: genero,
      data: new Date().toISOString()
    };

    try {
      const resposta = await fetch("https://script.google.com/macros/s/AKfycbyNaw-cgiqGa8GIkrYHy7ADPm2r8aDHysaKO06mbGRqofj1ZxF3-YravUDI4uYBOopa-A/exec", {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
      });

      feedback.textContent = "Pergunta enviada com sucesso!";
      form.reset();
    } catch (error) {
      console.error("Erro ao enviar:", error);
      feedback.textContent = "Erro ao enviar pergunta. Tente novamente.";
    }
  });
});
