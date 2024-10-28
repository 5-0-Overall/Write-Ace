CREATE TABLE IF NOT EXISTS tag (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,  -- Thêm UNIQUE constraint cho cột name
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO tag (name) VALUES 
    ('IELTS Writing Task 1'),
    ('Bar Chart'),
    ('Line Graph'),
    ('Table'),
    ('Pie Chart'),
    ('Process Diagram'),
    ('Map'),
    ('Multiple Graphs'),
    ('IELTS Writing Task 2'),
    ('Opinion'),
    ('Advantages and Disadvantages'),
    ('Problem and Solution'),
    ('Discussion'),
    ('Two-part Questions')
ON CONFLICT (name) DO NOTHING; -- Đảm bảo không bị trùng tag
