# Versus code client

Para rodar local:

### Requisitos:
```
node: no mínimo v10.6.0 (https://nodejs.org/pt-br/download/)
npm: no mínimo v6.1.0 (https://nodejs.org/pt-br/download/)
chrome (para executar os testes): no mínimo v79 (https://www.whatismybrowser.com/detect/what-version-of-chrome-do-i-have)
```

### Para instalar
```
npm i
```

### Para executar
```
npm run serve
```

Estará rodando em `http://localhost:8080/`

### Para executar os testes
```
npm run test:e2e
```

Para rodar pelo Docker:

### Requisitos:
```
docker: no mínimo v18.09 (https://docs.docker.com/)
docker compose: no mínimo v1.21 (https://docs.docker.com/compose/install/)
```

### Para executar
```
docker-compose build && docker-compose up
```

Estará rodando em `http://localhost:8080/`
