CREATE TABLE players (
  player_id INT AUTO_INCREMENT,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  uniform_number INT NOT NULL,
  bats VARCHAR(1) NOT NULL,
  throws VARCHAR(1) NOT NULL,
  team VARCHAR(100),
  PRIMARY KEY (player_id)
);