-- Create the task table if it does not exist
CREATE TABLE IF NOT EXISTS task (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

-- Create the problem table if it does not exist
CREATE TABLE IF NOT EXISTS problem (
    id SERIAL PRIMARY KEY,
    task_id INT REFERENCES task(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the problem_tag linking table if it does not exist
CREATE TABLE IF NOT EXISTS problem_tag (
    problem_id INT REFERENCES problem(id) ON DELETE CASCADE,
    tag_id INT REFERENCES tag(id) ON DELETE CASCADE,
    PRIMARY KEY (problem_id, tag_id)
);

-- Seed data into the task table
INSERT INTO task (name) VALUES
    ('IELTS Writing Task 1'),
    ('IELTS Writing Task 2');

-- Seed data into the problem table
INSERT INTO problem (task_id, title, description, image, created_at, updated_at) VALUES
    (1, 'Bar Chart', 'Describe the bar chart showing the data on country population.', 'https://fastly.picsum.photos/id/0/5000/3333.jpg?hmac=_j6ghY5fCfSD6tvtcV74zXivkJSPIfR9B8w34XeQmvU', NOW(), NOW()),
    (1, 'Line Graph', 'Explain the trends shown in the line graph on employment rate.', 'https://fastly.picsum.photos/id/1/5000/3333.jpg?hmac=Asv2DU3rA_5D1xSe22xZK47WEAN0wjWeFOhzd13ujW4', NOW(), NOW()),
    (1, 'Table', 'Summarize the information in the table on GDP growth.', 'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ', NOW(), NOW()),
    (1, 'Pie Chart', 'Analyze the pie chart on student preferences.', 'https://fastly.picsum.photos/id/3/5000/3333.jpg?hmac=GDjZ2uNWE3V59PkdDaOzTOuV3tPWWxJSf4fNcxu4S2g', NOW(), NOW()),
    (1, 'Process Diagram', 'Explain the steps in the recycling process shown.', 'https://fastly.picsum.photos/id/5/5000/3334.jpg?hmac=R_jZuyT1jbcfBlpKFxAb0Q3lof9oJ0kREaxsYV3MgCc', NOW(), NOW()),
    (1, 'Map', 'Describe the differences in the town map over two decades.', 'https://fastly.picsum.photos/id/9/5000/3269.jpg?hmac=cZKbaLeduq7rNB8X-bigYO8bvPIWtT-mh8GRXtU3vPc', NOW(), NOW()),
    (1, 'Multiple Graphs', 'Summarize the trends shown in the bar and line charts.', 'https://fastly.picsum.photos/id/7/4728/3168.jpg?hmac=c5B5tfYFM9blHHMhuu4UKmhnbZoJqrzNOP9xjkV4w3o', NOW(), NOW()),
    (2, 'Opinion', 'Discuss whether it is better to study abroad or in your own country.', NULL, NOW(), NOW()),
    (2, 'Advantages and Disadvantages', 'Explain the advantages and disadvantages of working from home.', NULL, NOW(), NOW()),
    (2, 'Problem and Solution', 'Address the issue of pollution in urban areas.', NULL, NOW(), NOW()),
    (2, 'Discussion', 'Discuss both views on whether children should use technology early.', NULL, NOW(), NOW()),
    (2, 'Two-part Questions', 'Answer the questions about technology in education.', NULL, NOW(), NOW());

-- Link problems with tags in the problem_tag table
INSERT INTO problem_tag (problem_id, tag_id) VALUES
    (1, 1), -- IELTS Writing Task 1: Bar Chart
    (1, 2),
    (2, 1), -- IELTS Writing Task 1: Line Graph
    (2, 3),
    (3, 1), -- IELTS Writing Task 1: Table
    (3, 4),
    (4, 1), -- IELTS Writing Task 1: Pie Chart
    (4, 5),
    (5, 1), -- IELTS Writing Task 1: Process Diagram
    (5, 6),
    (6, 1), -- IELTS Writing Task 1: Map
    (6, 7),
    (7, 1), -- IELTS Writing Task 1: Multiple Graphs
    (8, 9), -- IELTS Writing Task 2: Opinion
    (8, 10),
    (9, 9), -- IELTS Writing Task 2: Advantages and Disadvantages
    (9, 11),
    (10, 9), -- IELTS Writing Task 2: Problem and Solution
    (10, 12),
    (11, 9), -- IELTS Writing Task 2: Discussion
    (11, 13),
    (12, 9), -- IELTS Writing Task 2: Two-part Questions
    (12, 14);
