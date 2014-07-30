/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50158
 Source Host           : localhost
 Source Database       : todo

 Target Server Type    : MySQL
 Target Server Version : 50158
 File Encoding         : utf-8

 Date: 04/20/2012 00:34:26 AM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `todo`
-- ----------------------------
DROP TABLE IF EXISTS `todo`;
CREATE TABLE `todo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(300) DEFAULT NULL,
  `finished` int(11) DEFAULT '0',
  `post_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `todo`
-- ----------------------------
BEGIN;
INSERT INTO `todo` VALUES ('10', '我的第一个todo list', '1', '2012-02-06 15:54:20'), ('13', '新的程序，新的概念，新的情况。', '0', '2012-02-06 15:55:17'), ('15', '分页吗？', '0', '2012-02-08 17:57:56'), ('17', 'test', '1', '2012-03-15 21:45:28'), ('18', '你要修改todo内容吗？？？', '0', '2012-04-19 23:58:30'), ('20', '今天有雷阵雨。。。', '0', '2012-04-20 00:09:13'), ('23', '注意在<%if xxx==\"1\" %> 必须是双引号，注意，注意！', '0', '2012-04-20 00:22:09');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
