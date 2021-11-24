/*
 Navicat Premium Data Transfer

 Source Server         : studyspace
 Source Server Type    : MySQL
 Source Server Version : 50650
 Source Host           : 175.24.185.250:3306
 Source Schema         : studyspace

 Target Server Type    : MySQL
 Target Server Version : 50650
 File Encoding         : 65001

 Date: 16/11/2021 11:37:13
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for StudySpace_building
-- ----------------------------
DROP TABLE IF EXISTS `StudySpace_building`;
CREATE TABLE `StudySpace_building` (
  `building_tag` varchar(45) NOT NULL,
  `building_name` varchar(45) NOT NULL,
  `address` varchar(45) NOT NULL,
  `open_time` time(6) NOT NULL,
  `close_time` time(6) NOT NULL,
  `capacity` int(11) NOT NULL,
  `img_build` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`building_tag`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of StudySpace_building
-- ----------------------------
BEGIN;
INSERT INTO `StudySpace_building` VALUES ('1', 'Galvin Library', 'shanghai', '08:13:34.000000', '20:13:44.000000', 100, 'https://desk-fd.zol-img.com.cn/t_s1920x1080c5/g3/M09/0B/0C/ChMlWF7hnFaIGTjIACvQt5A1ChIAAUofAPDfA8AK9DP225.jpg');
INSERT INTO `StudySpace_building` VALUES ('2', 'MTCC', 'CHICAGO', '08:00:00.000000', '19:00:00.000000', 200, 'https://desk-fd.zol-img.com.cn/t_s1920x1080c5/g3/M06/00/04/ChMlV17q2yKID6J4AA0dfjoxmqAAAU6SQBTmQwADR2W573.jpg');
COMMIT;

-- ----------------------------
-- Table structure for StudySpace_reservation
-- ----------------------------
DROP TABLE IF EXISTS `StudySpace_reservation`;
CREATE TABLE `StudySpace_reservation` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `reservation_id` varchar(45) NOT NULL,
  `start_time` datetime(6) NOT NULL,
  `end_time` datetime(6) NOT NULL,
  `student_id_id` varchar(40) NOT NULL,
  `study_space_id_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `StudySpace_reservati_study_space_id_id_3085b08b_fk_StudySpac` (`study_space_id_id`),
  KEY `StudySpace_reservation_student_id_id_db84bc14_fk` (`student_id_id`),
  CONSTRAINT `StudySpace_reservati_study_space_id_id_3085b08b_fk_StudySpac` FOREIGN KEY (`study_space_id_id`) REFERENCES `StudySpace_studyspace` (`id`),
  CONSTRAINT `StudySpace_reservation_student_id_id_db84bc14_fk` FOREIGN KEY (`student_id_id`) REFERENCES `StudySpace_student` (`student_id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of StudySpace_reservation
-- ----------------------------
BEGIN;
INSERT INTO `StudySpace_reservation` VALUES (26, '20211112215405', '2021-11-12 14:00:00.000000', '2021-11-12 15:00:00.000000', '1', 1);
INSERT INTO `StudySpace_reservation` VALUES (27, '20211113124908', '2021-11-14 04:00:00.000000', '2021-11-14 06:00:00.000000', '1', 1);
INSERT INTO `StudySpace_reservation` VALUES (28, '20211114201731', '2021-11-14 15:30:00.000000', '2021-11-14 17:45:00.000000', '1', 1);
INSERT INTO `StudySpace_reservation` VALUES (29, '20211115105437', '2021-11-15 02:54:00.000000', '2021-11-15 03:54:00.000000', '1', 1);
INSERT INTO `StudySpace_reservation` VALUES (37, '20211115192504', '2021-11-15 11:25:00.000000', '2021-11-15 12:25:00.000000', '1', 1);
INSERT INTO `StudySpace_reservation` VALUES (38, '20211115205111', '2021-11-15 12:51:00.000000', '2021-11-15 13:51:00.000000', '1', 1);
INSERT INTO `StudySpace_reservation` VALUES (39, '20211115230812', '2021-11-15 15:08:00.000000', '2021-11-15 16:08:00.000000', '1', 1);
COMMIT;

-- ----------------------------
-- Table structure for StudySpace_room
-- ----------------------------
DROP TABLE IF EXISTS `StudySpace_room`;
CREATE TABLE `StudySpace_room` (
  `room_id` varchar(10) NOT NULL,
  `availability` varchar(45) NOT NULL,
  `building_tag_id` varchar(45) NOT NULL,
  `noise` varchar(45) DEFAULT NULL,
  `img_room` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`room_id`),
  KEY `StudySpace_room_building_tag_id_5363762e_fk_StudySpac` (`building_tag_id`),
  CONSTRAINT `StudySpace_room_building_tag_id_5363762e_fk_StudySpac` FOREIGN KEY (`building_tag_id`) REFERENCES `StudySpace_building` (`building_tag`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of StudySpace_room
-- ----------------------------
BEGIN;
INSERT INTO `StudySpace_room` VALUES ('1', 'free', '1', 'mid', 'https://photoos.macsc.com/180201/Collection-library/9pk1HmPc3A.jpg');
INSERT INTO `StudySpace_room` VALUES ('2', 'free', '2', 'mid', 'https://desk-fd.zol-img.com.cn/t_s1920x1080c5/g3/M03/00/04/ChMlWF7q2u2IZvJ6ABNi2gF4p2wAAU6RgDBlm4AE2Ly531.jpg');
COMMIT;

-- ----------------------------
-- Table structure for StudySpace_student
-- ----------------------------
DROP TABLE IF EXISTS `StudySpace_student`;
CREATE TABLE `StudySpace_student` (
  `student_id` varchar(40) NOT NULL,
  `email` varchar(50) NOT NULL,
  `student_name` varchar(45) NOT NULL,
  PRIMARY KEY (`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of StudySpace_student
-- ----------------------------
BEGIN;
INSERT INTO `StudySpace_student` VALUES ('1', '3123123@qq.com', 'cscs');
COMMIT;

-- ----------------------------
-- Table structure for StudySpace_studyspace
-- ----------------------------
DROP TABLE IF EXISTS `StudySpace_studyspace`;
CREATE TABLE `StudySpace_studyspace` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `study_space_id` varchar(16) NOT NULL,
  `qr_code` varchar(45) NOT NULL,
  `seats` int(11) NOT NULL,
  `table` varchar(5) NOT NULL,
  `status` varchar(45) NOT NULL,
  `room_id_id` varchar(10) NOT NULL,
  `free_seats` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `StudySpace_studyspac_room_id_id_48bd34b5_fk_StudySpac` (`room_id_id`),
  CONSTRAINT `StudySpace_studyspac_room_id_id_48bd34b5_fk_StudySpac` FOREIGN KEY (`room_id_id`) REFERENCES `StudySpace_room` (`room_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of StudySpace_studyspace
-- ----------------------------
BEGIN;
INSERT INTO `StudySpace_studyspace` VALUES (1, '001', '001', 4, '4', 'mid', '1', 3);
INSERT INTO `StudySpace_studyspace` VALUES (2, '002', '002', 12, '1', 'mid', '2', 12);
COMMIT;

-- ----------------------------
-- Table structure for auth_group
-- ----------------------------
DROP TABLE IF EXISTS `auth_group`;
CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of auth_group
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for auth_group_permissions
-- ----------------------------
DROP TABLE IF EXISTS `auth_group_permissions`;
CREATE TABLE `auth_group_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of auth_group_permissions
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for auth_permission
-- ----------------------------
DROP TABLE IF EXISTS `auth_permission`;
CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of auth_permission
-- ----------------------------
BEGIN;
INSERT INTO `auth_permission` VALUES (1, 'Can add log entry', 1, 'add_logentry');
INSERT INTO `auth_permission` VALUES (2, 'Can change log entry', 1, 'change_logentry');
INSERT INTO `auth_permission` VALUES (3, 'Can delete log entry', 1, 'delete_logentry');
INSERT INTO `auth_permission` VALUES (4, 'Can view log entry', 1, 'view_logentry');
INSERT INTO `auth_permission` VALUES (5, 'Can add permission', 2, 'add_permission');
INSERT INTO `auth_permission` VALUES (6, 'Can change permission', 2, 'change_permission');
INSERT INTO `auth_permission` VALUES (7, 'Can delete permission', 2, 'delete_permission');
INSERT INTO `auth_permission` VALUES (8, 'Can view permission', 2, 'view_permission');
INSERT INTO `auth_permission` VALUES (9, 'Can add group', 3, 'add_group');
INSERT INTO `auth_permission` VALUES (10, 'Can change group', 3, 'change_group');
INSERT INTO `auth_permission` VALUES (11, 'Can delete group', 3, 'delete_group');
INSERT INTO `auth_permission` VALUES (12, 'Can view group', 3, 'view_group');
INSERT INTO `auth_permission` VALUES (13, 'Can add user', 4, 'add_user');
INSERT INTO `auth_permission` VALUES (14, 'Can change user', 4, 'change_user');
INSERT INTO `auth_permission` VALUES (15, 'Can delete user', 4, 'delete_user');
INSERT INTO `auth_permission` VALUES (16, 'Can view user', 4, 'view_user');
INSERT INTO `auth_permission` VALUES (17, 'Can add content type', 5, 'add_contenttype');
INSERT INTO `auth_permission` VALUES (18, 'Can change content type', 5, 'change_contenttype');
INSERT INTO `auth_permission` VALUES (19, 'Can delete content type', 5, 'delete_contenttype');
INSERT INTO `auth_permission` VALUES (20, 'Can view content type', 5, 'view_contenttype');
INSERT INTO `auth_permission` VALUES (21, 'Can add session', 6, 'add_session');
INSERT INTO `auth_permission` VALUES (22, 'Can change session', 6, 'change_session');
INSERT INTO `auth_permission` VALUES (23, 'Can delete session', 6, 'delete_session');
INSERT INTO `auth_permission` VALUES (24, 'Can view session', 6, 'view_session');
INSERT INTO `auth_permission` VALUES (25, 'Can add building', 7, 'add_building');
INSERT INTO `auth_permission` VALUES (26, 'Can change building', 7, 'change_building');
INSERT INTO `auth_permission` VALUES (27, 'Can delete building', 7, 'delete_building');
INSERT INTO `auth_permission` VALUES (28, 'Can view building', 7, 'view_building');
INSERT INTO `auth_permission` VALUES (29, 'Can add room', 8, 'add_room');
INSERT INTO `auth_permission` VALUES (30, 'Can change room', 8, 'change_room');
INSERT INTO `auth_permission` VALUES (31, 'Can delete room', 8, 'delete_room');
INSERT INTO `auth_permission` VALUES (32, 'Can view room', 8, 'view_room');
INSERT INTO `auth_permission` VALUES (33, 'Can add study space', 9, 'add_studyspace');
INSERT INTO `auth_permission` VALUES (34, 'Can change study space', 9, 'change_studyspace');
INSERT INTO `auth_permission` VALUES (35, 'Can delete study space', 9, 'delete_studyspace');
INSERT INTO `auth_permission` VALUES (36, 'Can view study space', 9, 'view_studyspace');
INSERT INTO `auth_permission` VALUES (37, 'Can add student', 10, 'add_student');
INSERT INTO `auth_permission` VALUES (38, 'Can change student', 10, 'change_student');
INSERT INTO `auth_permission` VALUES (39, 'Can delete student', 10, 'delete_student');
INSERT INTO `auth_permission` VALUES (40, 'Can view student', 10, 'view_student');
INSERT INTO `auth_permission` VALUES (41, 'Can add reservation', 11, 'add_reservation');
INSERT INTO `auth_permission` VALUES (42, 'Can change reservation', 11, 'change_reservation');
INSERT INTO `auth_permission` VALUES (43, 'Can delete reservation', 11, 'delete_reservation');
INSERT INTO `auth_permission` VALUES (44, 'Can view reservation', 11, 'view_reservation');
COMMIT;

-- ----------------------------
-- Table structure for auth_user
-- ----------------------------
DROP TABLE IF EXISTS `auth_user`;
CREATE TABLE `auth_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of auth_user
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for auth_user_groups
-- ----------------------------
DROP TABLE IF EXISTS `auth_user_groups`;
CREATE TABLE `auth_user_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of auth_user_groups
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for auth_user_user_permissions
-- ----------------------------
DROP TABLE IF EXISTS `auth_user_user_permissions`;
CREATE TABLE `auth_user_user_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of auth_user_user_permissions
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for django_admin_log
-- ----------------------------
DROP TABLE IF EXISTS `django_admin_log`;
CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of django_admin_log
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for django_content_type
-- ----------------------------
DROP TABLE IF EXISTS `django_content_type`;
CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of django_content_type
-- ----------------------------
BEGIN;
INSERT INTO `django_content_type` VALUES (1, 'admin', 'logentry');
INSERT INTO `django_content_type` VALUES (3, 'auth', 'group');
INSERT INTO `django_content_type` VALUES (2, 'auth', 'permission');
INSERT INTO `django_content_type` VALUES (4, 'auth', 'user');
INSERT INTO `django_content_type` VALUES (5, 'contenttypes', 'contenttype');
INSERT INTO `django_content_type` VALUES (6, 'sessions', 'session');
INSERT INTO `django_content_type` VALUES (7, 'StudySpace', 'building');
INSERT INTO `django_content_type` VALUES (11, 'StudySpace', 'reservation');
INSERT INTO `django_content_type` VALUES (8, 'StudySpace', 'room');
INSERT INTO `django_content_type` VALUES (10, 'StudySpace', 'student');
INSERT INTO `django_content_type` VALUES (9, 'StudySpace', 'studyspace');
COMMIT;

-- ----------------------------
-- Table structure for django_migrations
-- ----------------------------
DROP TABLE IF EXISTS `django_migrations`;
CREATE TABLE `django_migrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of django_migrations
-- ----------------------------
BEGIN;
INSERT INTO `django_migrations` VALUES (1, 'StudySpace', '0001_initial', '2021-11-03 03:36:39.461572');
INSERT INTO `django_migrations` VALUES (2, 'StudySpace', '0002_student', '2021-11-03 03:36:39.692501');
INSERT INTO `django_migrations` VALUES (3, 'StudySpace', '0003_reservation', '2021-11-03 03:36:39.846056');
INSERT INTO `django_migrations` VALUES (4, 'StudySpace', '0004_alter_student_student_id', '2021-11-03 03:36:40.251324');
INSERT INTO `django_migrations` VALUES (5, 'contenttypes', '0001_initial', '2021-11-03 03:36:40.419483');
INSERT INTO `django_migrations` VALUES (6, 'auth', '0001_initial', '2021-11-03 03:36:41.072503');
INSERT INTO `django_migrations` VALUES (7, 'admin', '0001_initial', '2021-11-03 03:36:41.840651');
INSERT INTO `django_migrations` VALUES (8, 'admin', '0002_logentry_remove_auto_add', '2021-11-03 03:36:42.007771');
INSERT INTO `django_migrations` VALUES (9, 'admin', '0003_logentry_add_action_flag_choices', '2021-11-03 03:36:42.044418');
INSERT INTO `django_migrations` VALUES (10, 'contenttypes', '0002_remove_content_type_name', '2021-11-03 03:36:42.216388');
INSERT INTO `django_migrations` VALUES (11, 'auth', '0002_alter_permission_name_max_length', '2021-11-03 03:36:42.309399');
INSERT INTO `django_migrations` VALUES (12, 'auth', '0003_alter_user_email_max_length', '2021-11-03 03:36:42.400494');
INSERT INTO `django_migrations` VALUES (13, 'auth', '0004_alter_user_username_opts', '2021-11-03 03:36:42.435487');
INSERT INTO `django_migrations` VALUES (14, 'auth', '0005_alter_user_last_login_null', '2021-11-03 03:36:42.515393');
INSERT INTO `django_migrations` VALUES (15, 'auth', '0006_require_contenttypes_0002', '2021-11-03 03:36:42.546331');
INSERT INTO `django_migrations` VALUES (16, 'auth', '0007_alter_validators_add_error_messages', '2021-11-03 03:36:42.579241');
INSERT INTO `django_migrations` VALUES (17, 'auth', '0008_alter_user_username_max_length', '2021-11-03 03:36:42.668622');
INSERT INTO `django_migrations` VALUES (18, 'auth', '0009_alter_user_last_name_max_length', '2021-11-03 03:36:42.755395');
INSERT INTO `django_migrations` VALUES (19, 'auth', '0010_alter_group_name_max_length', '2021-11-03 03:36:42.850369');
INSERT INTO `django_migrations` VALUES (20, 'auth', '0011_update_proxy_permissions', '2021-11-03 03:36:42.927347');
INSERT INTO `django_migrations` VALUES (21, 'auth', '0012_alter_user_first_name_max_length', '2021-11-03 03:36:43.022448');
INSERT INTO `django_migrations` VALUES (22, 'sessions', '0001_initial', '2021-11-03 03:36:43.135359');
COMMIT;

-- ----------------------------
-- Table structure for django_session
-- ----------------------------
DROP TABLE IF EXISTS `django_session`;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of django_session
-- ----------------------------
BEGIN;
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
