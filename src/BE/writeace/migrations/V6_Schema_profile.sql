CREATE TABLE profile (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    avatar TEXT,
    description TEXT NOT NULL,
    is_gmail BOOLEAN NOT NULL DEFAULT FALSE
);
