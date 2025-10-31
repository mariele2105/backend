const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);

let token = '';

describe('Testes da API de produtos e usuários', () => {

  it('Deve retornar 401 e msg "Não autorizado" em GET /produtos sem token', async () => {
    const response = await request.get('/produtos');
    expect(response.status).toBe(401);
    expect(response.type).toMatch(/json/);
    expect(response.body).toHaveProperty('msg', 'Não autorizado');
  });

  it('Deve retornar 401 e msg "Token inválido" em GET /produtos com token incorreto', async () => {
    const response = await request
      .get('/produtos')
      .set('authorization', '123456789');
    expect(response.status).toBe(401);
    expect(response.type).toMatch(/json/);
    expect(response.body).toHaveProperty('msg', 'Token inválido');
  });

  it('Deve retornar 200 e um token em POST /usuarios/login', async () => {
    const response = await request
      .post('/usuarios/login')
      .send({
        usuario: 'email@exemplo.com',
        senha: 'abcd1234'
      });
    expect(response.status).toBe(200);
    expect(response.type).toMatch(/json/);
    expect(response.body).toHaveProperty('token');
    token = response.body.token; // salva o token para os próximos testes
  });

  it('Deve retornar 200 e lista de produtos em GET /produtos com token válido', async () => {
    const response = await request
      .get('/produtos')
      .set('authorization', token);
    expect(response.status).toBe(200);
    expect(response.type).toMatch(/json/);
  });

  it('Deve retornar 200 e um novo token em POST /usuarios/renovar com token válido', async () => {
    const response = await request
      .post('/usuarios/renovar')
      .set('authorization', token);
    expect(response.status).toBe(200);
    expect(response.type).toMatch(/json/);
    expect(response.body).toHaveProperty('token');
    token = response.body.token; // salva o novo token
  });

  it('Deve retornar 200 e lista de produtos em GET /produtos com novo token', async () => {
    const response = await request
      .get('/produtos')
      .set('authorization', token);
    expect(response.status).toBe(200);
    expect(response.type).toMatch(/json/);
  });
});
