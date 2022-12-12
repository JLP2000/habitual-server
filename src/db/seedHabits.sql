DROP TABLE IF EXISTS habits;
DROP TABLE IF EXISTS habitdates;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS user_session;

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
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);

CREATE TABLE habitdates(
    habitdate_id INT GENERATED ALWAYS AS IDENTITY,
    habit_id int NOT NULL,
    date DATE DEFAULT NOW(),
    complete BOOLEAN,
    on_time BOOLEAN,
    PRIMARY KEY(habitdate_id),
    FOREIGN KEY(habit_id) REFERENCES habits(habit_id)
);

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    user_password VARCHAR(100) NOT NULL
);

CREATE TABLE user_session(
    session_id INT GENERATED ALWAYS AS IDENTITY,
    session_token CHAR(20) NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (session_id),
    FOREIGN KEY (user_id) REFERENCES account(user_id)
)

INSERT INTO habits (name, start_date, interval_in_days, end_date, note, colour)
VALUES
("Test Habit", 2000-12-12, 365, 0, 2022-12-12, "Testing a habit", "Blue")
