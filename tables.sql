CREATE DATABASE reddit;

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  name VARCHAR(100),
  password VARCHAR(100),
  created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE subreddits (
  ID SERIAL PRIMARY KEY,
  user_id INT,
  name VARCHAR(50),
  created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(ID)
);

CREATE TABLE posts (
  ID SERIAL PRIMARY KEY,
  user_id INT,
  subreddit_id INT,
  title VARCHAR(100),
  text VARCHAR,
  created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(ID),
  FOREIGN KEY (subreddit_id) REFERENCES subreddits(ID)
);

CREATE TABLE comments (
  ID SERIAL PRIMARY KEY,
  user_id INT,
  post_id INT,
  text VARCHAR,
  comment_id INT DEFAULT NULL,
  created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(ID),
  FOREIGN KEY (post_id) REFERENCES posts(ID),
  FOREIGN KEY (comment_id) REFERENCES comments(ID)
);

CREATE TABLE post_votes (
  id SERIAL PRIMARY KEY,
  user_id INT,
  post_id INT,
  vote INT,
  created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(ID),
  FOREIGN KEY (post_id) REFERENCES posts(ID),
  CHECK (vote IN (-1, 0, 1))
);

