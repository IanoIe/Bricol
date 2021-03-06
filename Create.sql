SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema Bricol
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema Bricol
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `Bricol` DEFAULT CHARACTER SET utf8 ;
USE `Bricol` ;

-- -----------------------------------------------------
-- Table `Bricol`.`Utilizador`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Bricol`.`Utilizador` (
  `idUtilizador` INT NOT NULL AUTO_INCREMENT,
  `Nome` VARCHAR(45) NULL,
  `Username` VARCHAR(45) NULL,
  `Email` VARCHAR(45) NULL,
  `Password` VARCHAR(45) NULL,
  PRIMARY KEY (`idUtilizador`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Bricol`.`Localização`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Bricol`.`Localizacao` (
  `idLocalizacao` INT NOT NULL AUTO_INCREMENT,
  `Coordenadas` POINT NOT NULL,
  PRIMARY KEY (`idLocalizacao`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Bricol`.`Anuncio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Bricol`.`Anuncio` (
  `idAnuncio` INT NOT NULL AUTO_INCREMENT,
  `Titulo` VARCHAR(45) NULL,
  `Descricao` VARCHAR(500) NULL,
  `DatAnuncio` DATETIME(6) NULL,
  `Localizacao_idLocalizacao` INT NOT NULL,
  `Utilizador_idUtilizador` INT NOT NULL,
  PRIMARY KEY (`idAnuncio`, `Localizacao_idLocalizacao`, `Utilizador_idUtilizador`),
  INDEX `fk_Anuncio_Localizacao1_idx` (`Localizacao_idLocalizacao` ASC) VISIBLE,
  INDEX `fk_Anuncio_Utilizador1_idx` (`Utilizador_idUtilizador` ASC) VISIBLE,
  CONSTRAINT `fk_Anuncio_Localizacao1`
    FOREIGN KEY (`Localizacao_idLocalizacao`)
    REFERENCES `Bricol`.`Localizacao` (`idLocalizacao`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Anuncio_Utilizador1`
    FOREIGN KEY (`Utilizador_idUtilizador`)
    REFERENCES `Bricol`.`Utilizador` (`idUtilizador`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Bricol`.`Imagens`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Bricol`.`Imagens` (
  `idImagens` INT NOT NULL AUTO_INCREMENT,
  `Url` VARCHAR(300) NULL,
  `DatImagem` DATETIME(6) NULL,
  `Anuncio_idAnuncio` INT NOT NULL,
  PRIMARY KEY (`idImagens`, `Anuncio_idAnuncio`),
  INDEX `fk_Imagens_Anuncio_idx` (`Anuncio_idAnuncio` ASC) VISIBLE,
  CONSTRAINT `fk_Imagens_Anuncio`
    FOREIGN KEY (`Anuncio_idAnuncio`)
    REFERENCES `Bricol`.`Anuncio` (`idAnuncio`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Bricol`.`Mensagens`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Bricol`.`Mensagens` (
  `idMensagens` INT NOT NULL AUTO_INCREMENT,
  `Mensagem` VARCHAR(500) NULL,
  `dataCriacao` DATETIME NULL,
  `Remetente_idUtilizador` INT NOT NULL,
  `Utilizador_idUtilizador` INT NOT NULL,
  `Anuncio_idAnuncio` INT NOT NULL,
  PRIMARY KEY (`idMensagens`),
  CONSTRAINT `fk_Mensagens_Utilizador1`
    FOREIGN KEY (`Remetente_idUtilizador`)
    REFERENCES `Bricol`.`Utilizador` (`idUtilizador`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Mensagens_Utilizador2`
    FOREIGN KEY (`Utilizador_idUtilizador`)
    REFERENCES `Bricol`.`Utilizador` (`idUtilizador`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Mensagens_Anuncio1`
    FOREIGN KEY (`Anuncio_idAnuncio`)
    REFERENCES `Bricol`.`Anuncio` (`idAnuncio`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
