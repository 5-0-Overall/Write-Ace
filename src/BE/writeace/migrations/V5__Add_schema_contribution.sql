CREATE TABLE contributions (
    id SERIAL PRIMARY KEY, -- Tự động tăng và là khóa chính
    user_id INTEGER NOT NULL, -- Khóa ngoại tham chiếu tới bảng users
    count INTEGER NOT NULL, -- Số lượng
    date TIMESTAMP,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES "user"(id) ON DELETE CASCADE
);
