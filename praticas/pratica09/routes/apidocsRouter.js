const express = require('express');
const YAML = require('yaml');
const fs = require('fs');
const swaggerui = require('swagger-ui-express');

//carrega o arquivo swagger.yaml
const file = fs.readFileSync("./swagger.yaml", "utf8");

//valida o formato YAML
const swaggerDoc = YAML.parse(file);

//cria middleware de rota
const router = express.Router()

//carrega a aplicaçao do swagger UI
router.use("/", swaggerui.serve);


//renderiza a documentacao
router.get("/", swaggerui.setup(swaggerDoc));

module.exports = router;