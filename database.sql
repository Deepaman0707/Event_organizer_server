CREATE DATABASE Events;

CREATE TABLE users (
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    password VARCHAR(20) NOT NULL,
    followers INT[],
    following INT[],
    email VARCHAR(255) NOT NULL
)

CREATE TABLE event(
    id SERIAL NOT NULL PRIMARY KEY,
    event_name VARCHAR(50) NOT NULL,
    event_description VARCHAR(50),
    creator VARCHAR(50) NOT NULL,
    startDate VARCHAR(50),
    startTime VARCHAR(50),
    endDate VARCHAR(50),
    endTime VARCHAR(50),
    likes INT[],
    attendees INT[],
    category VARCHAR(50),
    fee INT NOT NULL
)