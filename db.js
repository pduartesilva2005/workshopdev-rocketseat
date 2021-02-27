const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./ws.db');

db.serialize(function() {
  // Criar a Tabela
  db.run(`CREATE TABLE IF NOT EXISTS ideas(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    image TEXT,
    title TEXT,
    category TEXT,
    description TEXT,
    link TEXT
  );`);

  // Inserir dado da tabela
  // const query = `INSERT INTO ideas(
  //   image,
  //   title,
  //   category,
  //   description,
  //   link
  // ) VALUES (?,?,?,?,?);`;

  // const values = [
  //   "https://image.flaticon.com/icons/svg/2729/2729005.svg",
  //   "Exercícios",
  //   "Saúde",
  //   "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit assumenda vel fuga omnis maiores quibusdam.",
  //   "https://rocketseat.com.br"
  // ];

  // db.run(query, values, function(err) {
  //   if (err) return console.log(err);

  //   console.log(this);
  // });

  // Consultar os dados da tabela
  // db.all('SELECT * FROM ideas', function(err, rows) {
  //   if (err) return console.log(err);

  //   console.log(rows);
  // })

  // Deletar um dado da tabela
});

module.exports = db;