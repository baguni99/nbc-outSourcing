const jsonServer = require('json-server');
const cors = require('cors');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(cors()); // CORS 미들웨어 적용
server.use(middlewares);
server.use(router);

const PORT = 3001; // JSON Server를 실행할 포트 번호

server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
