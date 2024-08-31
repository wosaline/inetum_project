-- Use the events_db database
USE events_db;

-- Insert users
INSERT INTO user (username, email, password_hash, first_name, last_name, role)
VALUES
('johndoe', 'johndoe@example.com', 'hashedpassword1', 'John', 'Doe', 'USER'),
('janedoe', 'janedoe@example.com', 'hashedpassword2', 'Jane', 'Doe', 'USER'),
('adminuser', 'admin@example.com', 'hashedpassword3', 'Admin', 'User', 'ADMIN');

-- Insert events
INSERT INTO event (description, date, time, logo, capacity, is_private, created_by, title, location)
VALUES
('Company annual meeting', '2024-09-15', '09:00:00', 'https://example.com/dance_logo.png', 100, FALSE, 3, 'Annual Meeting', 'Company HQ'),
('Birthday party', '2024-10-22', '19:00:00', 'https://example.com/birthday_logo.png', 50, TRUE, 1, 'John\'s Birthday', 'John\'s House'),
('Tech Conference', '2024-11-05', '10:00:00', 'https://example.com/tech_logo.png', 500, FALSE, 2, 'Tech Conference 2024', 'Convention Center'),
('Music Festival', '2024-09-25', '14:00:00', 'https://example.com/music_logo.png', 3000, FALSE, 1, 'Summer Music Festival', 'City Park'),
('Art Exhibition', '2024-10-01', '10:00:00', 'https://example.com/country_logo.png', 200, FALSE, 3, 'Modern Art Exhibition', 'Art Gallery'),
('Workshop on AI', '2024-10-15', '09:30:00', 'https://example.com/ai_workshop_logo.png', 100, FALSE, 2, 'AI Workshop', 'Tech Hub'),
('Startup Pitch', '2024-09-20', '11:00:00', 'https://example.com/logo.png', 150, TRUE, 1, 'Startup Pitch Event', 'Innovation Center'),
('Book Launch', '2024-11-10', '18:00:00', 'https://example.com/book_launch_logo.png', 80, TRUE, 3, 'New Book Launch', 'Library Hall'),
('Charity Run', '2024-11-15', '07:00:00', 'https://example.com/vacation_logo.png', 500, FALSE, 2, 'Annual Charity Run', 'City Square'),
('Gastronomy Fair', '2024-10-28', '12:00:00', 'https://example.com/gastronomy_logo.png', 1000, FALSE, 1, 'International Gastronomy Fair', 'Expo Center');

-- Insert participants (creators are automatically accepted)
INSERT INTO participant (user_id, event_id, invited_at, responded_at, status)
VALUES
(3, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'ACCEPTED'), -- Admin user created the Annual Meeting event
(1, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'ACCEPTED'), -- John Doe created the Birthday party
(2, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'ACCEPTED'), -- Jane Doe created the Tech Conference
(1, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'ACCEPTED'), -- John Doe created the Music Festival
(3, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'ACCEPTED'), -- Admin user created the Art Exhibition
(2, 6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'ACCEPTED'), -- Jane Doe created the AI Workshop
(1, 7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'ACCEPTED'), -- John Doe created the Startup Pitch
(3, 8, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'ACCEPTED'), -- Admin user created the Book Launch
(2, 9, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'ACCEPTED'), -- Jane Doe created the Charity Run
(1, 10, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'ACCEPTED'); -- John Doe created the Gastronomy Fair

-- Insert other participants
INSERT INTO participant (user_id, event_id, status)
VALUES
(2, 1, 'INVITED'), -- Jane Doe invited to Annual Meeting
(1, 3, 'INVITED'), -- John Doe invited to Tech Conference
(3, 4, 'INVITED'), -- Admin user invited to Music Festival
(2, 5, 'INVITED'), -- Jane Doe invited to Art Exhibition
(1, 6, 'INVITED'), -- John Doe invited to AI Workshop
(3, 7, 'INVITED'), -- Admin user invited to Startup Pitch
(2, 8, 'INVITED'), -- Jane Doe invited to Book Launch
(1, 9, 'INVITED'), -- John Doe invited to Charity Run
(3, 10, 'INVITED'); -- Admin user invited to Gastronomy Fair

-- Insert notifications
INSERT INTO notification (user_id, event_id, message, type)
VALUES
(2, 1, 'You are invited to the Annual Meeting', 'INVITATION'),
(1, 2, 'You are invited to John\'s Birthday', 'INVITATION'),
(2, 3, 'You are invited to the Tech Conference', 'INVITATION'),
(3, 4, 'You are invited to the Summer Music Festival', 'INVITATION'),
(2, 5, 'You are invited to the Modern Art Exhibition', 'INVITATION'),
(1, 6, 'You are invited to the AI Workshop', 'INVITATION'),
(3, 7, 'You are invited to the Startup Pitch Event', 'INVITATION'),
(2, 8, 'You are invited to the New Book Launch', 'INVITATION'),
(1, 9, 'You are invited to the Annual Charity Run', 'INVITATION'),
(3, 10, 'You are invited to the International Gastronomy Fair', 'INVITATION');

-- Insert comments
INSERT INTO comment (user_id, event_id, content, rating)
VALUES
(3, 1, 'Looking forward to this meeting!', 5),
(1, 2, 'Can\'t wait for the party!', 4),
(2, 3, 'Excited about the conference', 5),
(3, 4, 'The music lineup looks amazing!', 5),
(1, 5, 'Can\'t wait to see the art displays.', 4),
(2, 6, 'Great opportunity to learn about AI.', 5),
(3, 7, 'Excited to see the pitches!', 4),
(1, 8, 'Looking forward to the book launch.', 5),
(2, 9, 'Great cause, happy to participate!', 5),
(3, 10, 'Delicious food awaits!', 4);
