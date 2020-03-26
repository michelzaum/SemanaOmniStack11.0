const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        //BUSCANDO TODOS OS REGISTROS DA TABELA 'ONGS'.
        const ongs = await connection('ongs').select('*')

        return response.json(ongs);
    },

    async create(request, response) {
        const { name, email, whatsapp, city, uf } = request.body;

        //GERANDO O ID COM 4 BYTES DE CARACTERES ALEATÓRIOS.
        const id = crypto.randomBytes(4).toString('HEX');

        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        })

        return response.json({ id });
    }
}