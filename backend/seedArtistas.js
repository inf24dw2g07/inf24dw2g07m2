const db = require('./models');

async function seed() {
  try {
    // Sincroniza o banco (cria tabela se não existir)
    await db.sequelize.sync();

    // Dados para inserir
    const artistas = [
      {
        nome: 'Coldplay',
        genero: 'Rock Alternativo',
        imagemURL: 'https://link-da-imagem-coldplay.jpg',
        bio: 'Banda britânica formada em 1996.'
      },
      {
        nome: 'Adele',
        genero: 'Pop, Soul',
        imagemURL: 'https://link-da-imagem-adele.jpg',
        bio: 'Cantora e compositora inglesa premiada.'
      },
      {
        nome: 'Daft Punk',
        genero: 'Electro, House',
        imagemURL: 'https://link-da-imagem-daftpunk.jpg',
        bio: 'Duo francês de música eletrônica.'
      }
    ];

    // Insere ou atualiza artistas
    for (const artista of artistas) {
      await db.Artista.upsert(artista);
    }

    console.log('Seed de artistas concluído com sucesso!');
    process.exit(0); // Fecha o processo
  } catch (error) {
    console.error('Erro no seed:', error);
    process.exit(1);
  }
}

seed();
