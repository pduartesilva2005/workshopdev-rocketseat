// Uso do express para Criação e Configuração de Servidor
const express = require("express");
const server = express();

const db = require('./db');

server.use(express.static("public"));

// Habilitar o uso do req.body;
server.use(express.urlencoded({
  extended: true
}))

// Configuração do nunjucks
const nunjucks = require("nunjucks");
nunjucks.configure("views", {
  express: server,
  noCache: true
});

// Criação de Rotas - Capturação de Pedidos para receber uma resposta
server.get("/", function(req, res) {
  db.all(`SELECT * FROM ideas`, function(err, rows) {
    if (err) {
      console.log(err);
      return res.json({
        error: 'Error at database app'
      });
    }

    const reversedIdeas = [...rows].reverse();

    let lastIdeas = [];
    for (let idea of reversedIdeas) {
      if (lastIdeas.length < 2) {
        lastIdeas.push(idea);
      }
    }
  
    return res.render("index.html", { ideas: lastIdeas });
  });
});

server.get("/ideas", function(req, res) {
  db.all(`SELECT * FROM ideas`, function(err, rows) {
    if (err) {
      console.log(err);
      return res.json({
        error: 'Error at database app'
      });
    }

    const reservedIdeas = [...rows].reverse();

    return res.render("ideas.html", { ideas: reservedIdeas });
  });
});

server.post('/', function(req, res) {
  const { 
    image,
    title,
    category,
    description,
    link
  } = req.body;

  // Inserir dado da tabela
  const query = `INSERT INTO ideas(
    image,
    title,
    category,
    description,
    link
  ) VALUES (?,?,?,?,?);`;

  const values = [
    image,
    title,
    category,
    description,
    link
  ];

  db.run(query, values, function(err) {
    if (err) {
      console.log(err);
      return res.json({
        error: 'Error at database app'
      });
    }

    return res.redirect('/ideas');
  });
});

// Ligação de Servidor em Porta
server.listen(3333, () => {
  console.log('Server Started at port 3333');
});