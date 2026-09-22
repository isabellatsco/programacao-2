const http = require('http');
const fs = require('fs');

const home = fs.readFileSync('home.html');
const quem_somos = fs.readFileSync('quem_somos.html');
const fale_conosco = fs.readFileSync('fale_conosco.html');
const not_found_404 = fs.readFileSync('not_found_404.html');

function getHome(req, res) {
  res.end(home);
}

function getQuemSomos(req, res) {
  res.end(quem_somos);
}

function getFaleConosco(req, res) {
  res.end(fale_conosco);
}

function notFound(req, res) {
  res.writeHead(404);
  res.end(not_found_404);
}

const routes = {
  '/': getHome,
  '/quem_somos': getQuemSomos,
  '/fale_conosco': getFaleConosco,
};

const server = http.createServer((req, res) => {
  console.log('IP: ' + req.socket.remoteAddress);
  console.log(req.url);
  const handler = routes[req.url] || notFound;
  handler(req, res);
});

server.listen(3000, () => {
  console.log('Servidor iniciado!');
});