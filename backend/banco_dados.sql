-- Tabela Usuário
CREATE TABLE Usuario (
    Id SERIAL PRIMARY KEY,
    Nome VARCHAR(50) NOT NULL,
    Telefone VARCHAR(15),
    Email VARCHAR(50) NOT NULL UNIQUE,
    Senha VARCHAR(16) NOT NULL,
    CEP VARCHAR(8),
    Endereco VARCHAR(50),
    Numero VARCHAR(10),
    Complemento VARCHAR(50),
    Bairro VARCHAR(50),
    Cidade VARCHAR(50),
    Estado VARCHAR(25),
    Imagem BYTEA
);

-- Tabela Pets
CREATE TABLE Pets (
    Id SERIAL PRIMARY KEY,
    Id_Usuario INT NOT NULL,
    Nome VARCHAR(50),
    Contato VARCHAR(15),
    Descricao VARCHAR(240),
    CEP VARCHAR(8),
    Endereco VARCHAR(50),
    Numero VARCHAR(10),
    Complemento VARCHAR(50),
    Bairro VARCHAR(50),
    Cidade VARCHAR(50),
    Estado VARCHAR(25),
    Situacao VARCHAR(15),
    Tipo VARCHAR(10),
    Porte VARCHAR(10),
    Raca VARCHAR(50),
    Castrado VARCHAR(10),
    Vacinado VARCHAR(10),
    Imagem BYTEA,
    FOREIGN KEY (Id_Usuario) REFERENCES Usuario(Id) ON DELETE CASCADE
);
