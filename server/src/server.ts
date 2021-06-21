import express, { json } from 'express';

const app = express();

app.use(express.json());

// GET: Buscar ou listar uma informação
// POST: Criar alguma nova informação
// PUT: Atualizar uma informação existente
// DELETE: Deletar uma informação existente

app.get('/', (request, response) => {
  return response.json({ message: 'Hellow World'});
});

app.listen(3333);