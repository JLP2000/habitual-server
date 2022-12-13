TRUNCATE habitdates, habits, users RESTART IDENTITY;

INSERT INTO habitdates (habit_id, date, complete, on_time)
VALUES
(
    1,
    '2022-1-1',
    TRUE,
    FALSE
),
(
    1,
    '2022-1-2',
    FALSE,
    TRUE
),
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
