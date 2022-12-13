DROP TABLE IF EXISTS user_session;
DROP TABLE IF EXISTS habitdates;
DROP TABLE IF EXISTS habits;
DROP TABLE IF EXISTS users;


CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    user_password VARCHAR(100) NOT NULL
);

CREATE TABLE user_session(
    session_id INT GENERATED ALWAYS AS IDENTITY,
    session_token CHAR(20) NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (session_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE habits(
    habit_id SERIAL PRIMARY KEY,
    
    name varchar(100) NOT NULL,
    start_date DATE,
    interval_in_days integer,
    interval_in_months integer,
    end_date DATE,
    note varchar(500) NOT NULL,
    colour varchar(100) NOT NULL,
    user_id int NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE habitdates(
    habitdate_id INT GENERATED ALWAYS AS IDENTITY,
    habit_id int NOT NULL,
    date DATE,
    complete BOOLEAN DEFAULT FALSE,
    on_time BOOLEAN DEFAULT FALSE,
    PRIMARY KEY(habitdate_id),
    FOREIGN KEY(habit_id) REFERENCES habits(habit_id)
);

INSERT INTO user_session (session_token, user_id) 
VALUES
(
    '2cd442cd442cd442cd44',
    1
)

INSERT INTO habitdates (habit_id, date, complete, on_time)
VALUES
(
    2,
    '2022-3-4',
    TRUE,
    FALSE
),
(
    3,
    '2022-5-1',
    TRUE,
    FALSE
);

INSERT INTO habits (name, start_date, interval_in_days, interval_in_months, end_date, note, colour, user_id)
VALUES
(
    'Test Habit 1',
    '2022-1-1',
    2,
    0,
    '2022-1-10',
    'Testing a Habit 1',
    'Blue',
    1
),
(
    'Test Habit 2',
    '2022-3-4',
    0,
    1,
    '2022-4-10',
    'Testing a Habit 2',
    'Purple',
    2
),
(
    'Test Habit 3',
    '2022-5-1',
    2,
    0,
    '2022-6-10',
    'Testing a Habit 3',
    'Red',
    1
);

INSERT INTO users (username, user_password) 
VALUES 
('Tester', 'password'),
('Tester2', 'password');
