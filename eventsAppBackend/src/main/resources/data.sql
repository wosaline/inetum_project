INSERT INTO `user` (username, email, password_hash, first_name, last_name, role)
VALUES
('john_doe', 'john@example.com', 'hash1', 'John', 'Doe', 'USER'),
('jane_smith', 'jane@example.com', 'hash2', 'Jane', 'Smith', 'ADMIN'),
('michael_brown', 'michael@example.com', 'hash3', 'Michael', 'Brown', 'USER'),
('emily_davis', 'emily@example.com', 'hash4', 'Emily', 'Davis', 'USER'),
('william_jones', 'william@example.com', 'hash5', 'William', 'Jones', 'USER');

INSERT INTO `event` (description, `date`, `time`, logo, capacity, is_private, created_by, title, location)
VALUES
('Annual Company Meeting', '2024-09-15', '10:00:00', 'logo1.png', 100, FALSE, 2, 'Company Meeting 2024', 'Main Conference Room'),
('Tech Conference', '2024-10-20', '09:00:00', 'logo2.png', 200, TRUE, 2, 'Tech Innovators Conference', 'Tech Park Auditorium'),
('Project Kickoff', '2024-08-25', '14:00:00', NULL, 50, TRUE, 1, 'New Project Kickoff', 'Meeting Room 1'),
('Networking Event', '2024-11-05', '18:00:00', 'logo3.png', 150, FALSE, 3, 'Tech Networking Night', 'Downtown Cafe'),
('Workshop on AI', '2024-12-10', '10:30:00', 'logo4.png', 80, TRUE, 4, 'AI in Modern Business', 'Innovation Lab');

INSERT INTO participant (user_id, event_id, responded_at, status)
VALUES
(1, 1, '2024-09-10 12:00:00', 'ACCEPTED'),
(2, 1, NULL, 'INVITED'),
(3, 2, '2024-10-01 09:30:00', 'DECLINED'),
(4, 3, NULL, 'INVITED'),
(5, 4, '2024-11-01 14:00:00', 'ACCEPTED'),
(1, 4, '2024-11-02 09:00:00', 'ACCEPTED');

INSERT INTO notification (user_id, event_id, message, type)
VALUES
(1, 1, 'You are invited to the Annual Company Meeting', 'INVITATION'),
(2, 1, 'Reminder: Annual Company Meeting on 2024-09-15', 'REMINDER'),
(3, 2, 'You are invited to the Tech Conference', 'INVITATION'),
(4, 3, 'Project Kickoff meeting has been scheduled', 'UPDATE'),
(5, 4, 'You are invited to the Networking Event', 'INVITATION');

INSERT INTO comment (user_id, event_id, content, rating)
VALUES
(1, 1, 'Great event, very informative!', 5),
(3, 2, 'Looking forward to this event.', 4),
(4, 3, 'Excited to start this new project.', 5),
(5, 4, 'The networking event was fantastic!', 5),
(2, 5, 'The AI workshop was very insightful.', 4);
