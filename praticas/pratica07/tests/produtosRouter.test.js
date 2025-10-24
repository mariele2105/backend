const supertest = require("supertest");
const app = require("../app");

const request = supertest(app);

let produtoId;

describe("Testes do recurso /produtos", () => {
  test("POST /produtos deve criar um produto", async () => {
    const response = await request
      .post("/produtos")
      .send({ nome: "Laranja", preco: 10.0 })
      .expect("Content-Type", /json/)
      .expect(201);

    expect(response.body).toHaveProperty("_id");
    expect(response.body).toHaveProperty("nome", "Laranja");
    expect(response.body).toHaveProperty("preco", 10.0);

    produtoId = response.body._id;
  });

  test("POST /produtos sem JSON deve retornar 422", async () => {
    const response = await request
      .post("/produtos")
      .expect("Content-Type", /json/)
      .expect(422);

    expect(response.body).toHaveProperty(
      "msg",
      "Nome e preço do produto são obrigatórios"
    );
  });

  test("GET /produtos deve retornar array de produtos", async () => {
    const response = await request
      .get("/produtos")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  test("GET /produtos/:id deve retornar produto", async () => {
    const response = await request
      .get(`/produtos/${produtoId}`)
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).toHaveProperty("_id", produtoId);
    expect(response.body).toHaveProperty("nome", "Laranja");
    expect(response.body).toHaveProperty("preco", 10.0);
  });

  test("GET /produtos/0 deve retornar 400", async () => {
    const response = await request
      .get("/produtos/0")
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toHaveProperty("msg", "Parâmetro inválido");
  });

  test("GET /produtos/000000000000000000000000 deve retornar 404", async () => {
    const response = await request
      .get("/produtos/000000000000000000000000")
      .expect("Content-Type", /json/)
      .expect(404);

    expect(response.body).toHaveProperty("msg", "Produto não encontrado");
  });

  test("PUT /produtos/:id deve atualizar produto", async () => {
    const response = await request
      .put(`/produtos/${produtoId}`)
      .send({ nome: "Laranja Pera", preco: 18.0 })
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).toHaveProperty("_id", produtoId);
    expect(response.body).toHaveProperty("nome", "Laranja Pera");
    expect(response.body).toHaveProperty("preco", 18.0);
  });

  test("PUT /produtos/:id sem JSON deve retornar 422", async () => {
    const response = await request
      .put(`/produtos/${produtoId}`)
      .expect("Content-Type", /json/)
      .expect(422);

    expect(response.body).toHaveProperty(
      "msg",
      "Nome e preço do produto são obrigatórios"
    );
  });

  test("PUT /produtos/0 deve retornar 400 e mensagem de parâmetro inválido", async () => {
    const response = await request
      .put("/produtos/0")
      .send({ nome: "Teste", preco: 10.0 })
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toHaveProperty("msg", "Parâmetro inválido");
  });

  test("PUT /produtos/000000000000000000000000 deve retornar 404", async () => {
    const response = await request
      .put("/produtos/000000000000000000000000")
      .send({ nome: "Laranja Bahia", preco: 20.0 })
      .expect("Content-Type", /json/)
      .expect(404);

    expect(response.body).toHaveProperty("msg", "Produto não encontrado");
  });

  test("DELETE /produtos/:id deve retornar 204", async () => {
    await request.delete(`/produtos/${produtoId}`).expect(204);
  });

  test("DELETE /produtos/0 deve retornar 400", async () => {
    const response = await request
      .delete("/produtos/0")
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toHaveProperty("msg", "Parâmetro inválido");
  });

  test("DELETE /produtos/000000000000000000000000 deve retornar 404", async () => {
    const response = await request
      .delete("/produtos/000000000000000000000000")
      .expect("Content-Type", /json/)
      .expect(404);

    expect(response.body).toHaveProperty("msg", "Produto não encontrado");
  });
});
