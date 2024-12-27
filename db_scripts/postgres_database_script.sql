create table movies (
	id SERIAL PRIMARY KEY,
	title VARCHAR(255) NOT NULL,
	genre VARCHAR(100) NOT NULL,
	rating NUMERIC(2, 2) CHECK (rating >= 0 AND rating <= 10),
	streaming_link TEXT NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_movies_title ON movies (title);
CREATE INDEX idx_movies_genre ON movies (genre);

INSERT INTO movies (title, genre, rating, streaming_link) 
VALUES 
	('Bahubali', 'fantasy', 9.1, 'www.netflix.com'),
	('Bahubali-2', 'fantasy', 9.56, 'www.netflix.com'),
	('Pushpa-2', 'action', 9.45, 'www.netflix.com'),
	('Pushpa', 'action', 8.25, 'www.netflix.com');