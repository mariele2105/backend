const supertest = require('supertest');

const app = require('../app');

const request = supertest(app);

let usuarioId = null;
let token = null;

// Suite de testes para "/usuarios"
describe('Recurso /usuarios', () => {

  // Teste POST /usuarios criando usuário válido
  test('POST /usuarios deve criar um usuário e retornar 201', async () => {
    const res = await request
      .post('/usuarios')
      .send({
        email: 'usuario@email.com',
        senha: 'abcd1234'
      })
      .expect('Content-Type', /json/)
      .expect(201);

    // Verificações
    expect(res.body).toHaveProperty('_id');
    expect(res.body).toHaveProperty('email', 'usuario@email.com');

    //Salvar ID
    usuarioId = res.body._id;
  });

  //Teste POST /usuarios sem JSON
  test('POST /usuarios sem JSON deve retornar 422', async () => {
    const res = await request
      .post('/usuarios')
      .send({})
      .expect('Content-Type', /json/)
      .expect(422);

    expect(res.body).toHaveProperty('msg', 'Email e Senha são obrigatórios');
  });

  //Teste POST /usuarios/login com JSON válido
  test('POST /usuarios/login deve autenticar e retornar 200', async () => {
    const res = await request
      .post('/usuarios/login')
      .send({
        usuario: 'usuario@email.com',
        senha: 'abcd1234'
      })
      .expect('Content-Type', /json/)
      .expect(200);

    //Verifica se retornou token e salva
    expect(res.body).toHaveProperty('token');
    token = res.body.token;
  });

  //Teste POST /usuarios/login sem JSON
  test('POST /usuarios/login sem JSON deve retornar 401', async () => {
    const res = await request
      .post('/usuarios/login')
      .send({})
      .expect('Content-Type', /json/)
      .expect(401);

    expect(res.body).toHaveProperty('msg', 'Credenciais inválidas');
  });

  //Teste POST /usuarios/renovar com token válido
  test('POST /usuarios/renovar com token válido deve retornar 200', async () => {
    const res = await request
      .post('/usuarios/renovar')
      .set('authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body).toHaveProperty('token');
  });

  //Teste POST /usuarios/renovar com token inválido
  test('POST /usuarios/renovar com token inválido deve retornar 401', async () => {
    const res = await request
      .post('/usuarios/renovar')
      .set('authorization', 'Bearer 123456789')
      .expect('Content-Type', /json/)
      .expect(401);

    expect(res.body).toHaveProperty('msg', 'Token inválido');
  });

  // Teste DELETE /usuarios/:id com token válido
  test('DELETE /usuarios/:id deve retornar 204', async () => {
    await request
      .delete(`/usuarios/${usuarioId}`)
      .set('authorization', `Bearer ${token}`)
      .expect(204);
  });

});
