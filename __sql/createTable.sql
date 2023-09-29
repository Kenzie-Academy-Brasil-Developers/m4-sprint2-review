CREATE TABLE IF NOT EXISTS books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    bio TEXT NOT NULL,
    category VARCHAR(20),
    createdat DATE NOT NULL,
    updatedat DATE NOT NULL
);

INSERT INTO books (title, bio, category, createdat, updatedat) VALUES ('Título de exemplo', 'Bio de exemplo', 'Categoria', '2023-09-29', '2023-09-29');
