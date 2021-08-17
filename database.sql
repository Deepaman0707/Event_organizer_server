CREATE DATABASE Events;

CREATE table users (
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    password VARCHAR(20) NOT NULL,
    department VARCHAR(50),
    followers int[],
    following int []
)

CREATE table event(
    id SERIAL NOT NULL PRIMARY KEY,
    event_name VARCHAR(50) NOT NULL,
    creator VARCHAR(50) NOT NULL,
    startDate date NOT NULL,
    endDate date NOT NULL,
    likes int[],
    attendees int [],
    category VARCHAR(50)
)