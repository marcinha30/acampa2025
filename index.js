const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const SENHA = 'acampateens2025';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const FILE = 'perguntas.json';
if (!fs.existsSync(FILE)) fs.writeFileSync(FILE, '[]');

app.post('/api/pergunta', (req, res) => {
  const perguntas = JSON.parse(fs.readFileSync(FILE));
  perguntas.push({ texto: req.body.pergunta, data: new Date().toISOString() });
  fs.writeFileSync(FILE, JSON.stringify(perguntas, null, 2));
  res.redirect('/?enviado=1');
});

app.get('/admin', (req, res) => {
  if (req.query.senha !== SENHA) return res.redirect('/admin.html?erro=1');
  const perguntas = JSON.parse(fs.readFileSync(FILE));
  let html = '<h2>Perguntas Recebidas</h2><ul>';
  perguntas.forEach(p => {
    html += `<li><strong>${new Date(p.data).toLocaleString()}</strong>: ${p.texto}</li>`;
  });
  html += '</ul><a href="/admin.html">Voltar</a>';
  res.send(html);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
