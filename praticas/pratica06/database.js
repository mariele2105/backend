import { MongoClient } from "mongodb";

// c) String de conexão completa com os parâmetros recomendados
const url = "mongodb+srv://marielefernandesmfmf:Mariele2105@mariele2105.0skxnlv.mongodb.net/?retryWrites=true&w=majority&appName=mariele2105";

// d) Instância do cliente
const client = new MongoClient(url);

// e) Função para conectar e retornar o banco "agenda"
async function conectarDb() {
  await client.connect();
  console.log("Conectado ao MongoDB Atlas!");
  return client.db("agenda"); // <-- este é o nome do banco que será criado
}

export { conectarDb };

