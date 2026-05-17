package db

func Migrate() error {
	queries := []string{
		`CREATE TABLE IF NOT EXISTS contact_submissions (
			id         BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
			name       VARCHAR(255) NOT NULL,
			email      VARCHAR(255) NOT NULL,
			phone      VARCHAR(50)  NOT NULL,
			message    TEXT         NOT NULL,
			created_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP
		) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,
		`CREATE TABLE IF NOT EXISTS idea_submissions (
			id           BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
			name         VARCHAR(255) NOT NULL,
			email        VARCHAR(255) NOT NULL,
			idea_details TEXT         NOT NULL,
			created_at   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP
		) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,
	}
	for _, q := range queries {
		if _, err := DB.Exec(q); err != nil {
			return err
		}
	}
	return nil
}
