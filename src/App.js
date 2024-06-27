const express = require("express");
const app = express();

// Configurar CORS - Permite o acesso à API
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://frontend-gamma-beryl.vercel.app');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Importar as rotas

const produtosRouters = require('./routes/rotaProduto.js');
const categoriasRouters = require('./routes/rotaCategoria.js');
const utilizadorRouters = require('./routes/rotaUtilizador.js');
const chaveRouters = require('./routes/rotaChave.js');

// Configurações

app.set("port", process.env.PORT || 3001);

// Middlewares

app.use(express.json());
const middleware = require('./middleware');

// Rotas

app.use("/produtos", produtosRouters);
app.use("/categorias", categoriasRouters);
app.use("/utilizadores", utilizadorRouters);
app.use('/chaves', chaveRouters);

app.listen(app.get("port"), () => {
  console.log("Start server on port " + app.get("port"));
});
