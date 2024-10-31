-- Enum để lưu trữ các trạng thái trong STATUS
CREATE TYPE status_enum AS ENUM ('PENDING', 'REVIEWED', 'APPROVED', 'REJECTED');

-- Tạo bảng submission
CREATE TABLE IF NOT EXISTS submission (
    id SERIAL PRIMARY KEY,
    problem_id INT REFERENCES problem(id) ON DELETE CASCADE,
    user_id INT REFERENCES "user"(id) ON DELETE CASCADE,
    ai_review TEXT,
    teacher_review TEXT,
    essay TEXT NOT NULL,
    status status_enum DEFAULT 'PENDING',
    scoreTA INT DEFAULT 0,
    scoreCC INT DEFAULT 0,
    scoreLR INT DEFAULT 0,
    scoreGRA INT DEFAULT 0,
    scoreOVR INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
