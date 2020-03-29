const crypto = require('crypto');

module.exports = function generateUniqueId() {
    //GERANDO O ID COM 4 BYTES DE CARACTERES ALEATÓRIOS.
    return crypto.randomBytes(4).toString('HEX');
}