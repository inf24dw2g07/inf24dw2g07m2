module.exports = (sequelize, DataTypes) => {
    const Artista = sequelize.define('Artista', {
        nome: { type: DataTypes.STRING, allowNull: false, unique: true },
        genero: DataTypes.STRING,
        imagemURL: DataTypes.STRING,
        bio: DataTypes.TEXT,
    });

    return Artista;
};
