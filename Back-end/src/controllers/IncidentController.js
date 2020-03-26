const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query;

        //QUANTIDADE DE REGISTROS EXISTENTES NA TABEKA "INCIDENTS".
        const [count] = await connection('incidents').count();

        //BUSCANDO TODOS OS REGISTROS DA TABELA 'INCIDENTS'.
        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id') //BUSCANDO OS DADOS DA ONG RELACIONADA COM ESTE ID.
            .limit(5) //LIMITANDO PARA TRAZER 5 CASOS.
            .offset((page - 1) * 5) //TRAZENDO OS CASOS DE 5 EM 5. 
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]);

        //PEGANDO A RESPOSTA DO TOTAL DE REGISTROS DE CASOS EXISTENTES.
        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },

    async create(request, response) {
        const { title, description, value } = request.body;
        //PEGANDO O ID DA ONG QUE ESTÁ CADASTRANDO O CASO, ATRAVS DO USO DO CABEÇALHO PARA DETERMINAR O CONTEXTO DA REQUISIÇÃO.
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });

        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        //BUSCANDO O ID DA ONG ATRAVÉS DO ID DO CASO.
        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        //SE O ID DA ONG NÃO FOR O MESMO ID DA ONG DE CRIAÇÃO DO CASO, ELA NÃO PODE EXCLUIR.
        if (incident.ong_id !== ong_id) {
            return response.status(401).json({ error: 'Operation not permitted.' });
        }

        await connection('incidents').where('id', id).delete();

        //RETORNO DE SUCESSO SEM CONTEÚDO.
        return response.status(204).send();

    }
}