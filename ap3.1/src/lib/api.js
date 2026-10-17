const axios = require('axios');

const api = axios.create({ baseURL: process.env.API_URL ?? 'http://localhost:3000/api' });

function mensagensDeErro(error) {
  const { status, data } = error.response ?? {};

  if (status !== 400 && status !== 409) {
    throw error;
  }

  return data.erros ?? [data.mensagem];
}

module.exports = { api, mensagensDeErro };
