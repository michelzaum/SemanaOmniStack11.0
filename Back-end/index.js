const express = require('express');

const app = express();

app.get('/', (request, response) => {
    return response.json({ 
        evento: 'Semana OmniStack 11.0',
        aluno: 'Michel de Oliveira'
     });
});

app.listen(3333);
