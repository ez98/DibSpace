CREATE TABLE `building` (
  `building_tag` varchar(10) NOT NULL,
  `building_name` varchar(45) NOT NULL,
  `address` varchar(45) NOT NULL,
  `open_time` time NOT NULL,
  `close_time` time NOT NULL,
  `capacity` int NOT NULL,
  PRIMARY KEY (`building_tag`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `reservation` (
  `reservation_id` int NOT NULL,
  `student_id` int NOT NULL,
  `study_space_id` int NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  PRIMARY KEY (`reservation_id`),
  KEY `study_space_id_idx` (`study_space_id`),
  KEY `student_id_idx` (`student_id`),
  CONSTRAINT `student_id` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`),
  CONSTRAINT `study_space_id` FOREIGN KEY (`study_space_id`) REFERENCES `study_space` (`study_space_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `student` (
  `student_id` int NOT NULL,
  `email` varchar(45) NOT NULL,
  `student_name` varchar(45) NOT NULL,
  PRIMARY KEY (`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `room` (
  `room_id` int NOT NULL,
  `building_tag` varchar(45) NOT NULL,
  `availability` varchar(45) NOT NULL,
  PRIMARY KEY (`room_id`),
  KEY `building_tag_idx` (`building_tag`),
  CONSTRAINT `building_tag` FOREIGN KEY (`building_tag`) REFERENCES `building` (`building_tag`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `study_space` (
  `study_space_id` int NOT NULL,
  `room_id` int NOT NULL,
  `qr_code` varchar(45) NOT NULL,
  `seats` int NOT NULL,
  `table` varchar(3) NOT NULL,
  `status` varchar(45) NOT NULL,
  PRIMARY KEY (`study_space_id`),
  KEY `room_id_idx` (`room_id`),
  CONSTRAINT `room_id` FOREIGN KEY (`room_id`) REFERENCES `room` (`room_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
