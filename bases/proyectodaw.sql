-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 01, 2019 at 09:25 PM
-- Server version: 10.3.16-MariaDB
-- PHP Version: 7.3.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;



CREATE USER 'adproyecto'@'localhost' IDENTIFIED BY 'adproyecto';
GRANT ALL PRIVILEGES ON proyectodaw.* TO 'adproyecto'@'localhost';
--
-- Database: `proyectodaw`
--

-- --------------------------------------------------------

--
-- Table structure for table `mensajeproductos`
--

CREATE TABLE `mensajeproductos` (
  `idMU` int(11) NOT NULL,
  `contenido` varchar(25) DEFAULT NULL,
  `producto` int(11) DEFAULT NULL,
  `cliente` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `mensaje_usuario`
--

CREATE TABLE `mensaje_usuario` (
  `idMensaje` int(11) NOT NULL,
  `contenido` varchar(25) DEFAULT NULL,
  `vendedor` int(11) DEFAULT NULL,
  `cliente` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `productos`
--

CREATE TABLE `productos` (
  `idProduc` int(11) NOT NULL,
  `nombre` varchar(15) DEFAULT NULL,
  `precio` decimal(5,2) DEFAULT NULL,
  `color` varchar(10) DEFAULT NULL,
  `tamano` varchar(10) DEFAULT NULL,
  `beneficio` varchar(20) DEFAULT NULL,
  `vendedor` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `productos`
--

INSERT INTO `productos` (`idProduc`, `nombre`, `precio`, `color`, `tamano`, `beneficio`, `vendedor`) VALUES
(1, 'Producto 1 ', '120.00', 'rojp', '1.86x2.98 ', 'Salud y Belleza', 102),
(3, 'Actualizado', '5.00', 'morado', '5x5 ', 'decoracion hogar', 101);

-- --------------------------------------------------------

--
-- Table structure for table `tienda`
--

CREATE TABLE `tienda` (
  `idLocal` int(11) NOT NULL,
  `nombre` varchar(15) DEFAULT NULL,
  `telefono` varchar(10) DEFAULT NULL,
  `direccion` varchar(20) DEFAULT NULL,
  `vendedor` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `idUser` int(11) NOT NULL,
  `nombre` varchar(10) DEFAULT NULL,
  `apellido` varchar(10) DEFAULT NULL,
  `mail` varchar(25) DEFAULT NULL,
  `telefono` varchar(10) DEFAULT NULL,
  `direccion` varchar(20) DEFAULT NULL,
  `esVendedor` tinyint(1) DEFAULT NULL,
  `esCliente` tinyint(1) DEFAULT NULL,
  `esAdministrador` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`idUser`, `nombre`, `apellido`, `mail`, `telefono`, `direccion`, `esVendedor`, `esCliente`, `esAdministrador`) VALUES
(100, 'Eduardo', 'Tigse', 'prueba1', '0967730514', 'Cdla Abel Gilbert', 0, 1, 0),
(101, 'Luis', 'Lara', 'Luis@prueba.com', '0235124815', 'Cdla Abel Gilbert', 1, 0, 0),
(102, 'Ana', 'Herrera', 'prueba3', '0332144814', 'Cdla Abel Gilbert', 0, 0, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `mensajeproductos`
--
ALTER TABLE `mensajeproductos`
  ADD PRIMARY KEY (`idMU`),
  ADD KEY `vendedor` (`producto`),
  ADD KEY `producto` (`cliente`);

--
-- Indexes for table `mensaje_usuario`
--
ALTER TABLE `mensaje_usuario`
  ADD PRIMARY KEY (`idMensaje`),
  ADD KEY `vendedor` (`vendedor`),
  ADD KEY `cliente` (`cliente`);

--
-- Indexes for table `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`idProduc`),
  ADD KEY `vendedor` (`vendedor`);

--
-- Indexes for table `tienda`
--
ALTER TABLE `tienda`
  ADD PRIMARY KEY (`idLocal`),
  ADD KEY `vendedor` (`vendedor`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idUser`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `mensajeproductos`
--
ALTER TABLE `mensajeproductos`
  MODIFY `idMU` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `mensaje_usuario`
--
ALTER TABLE `mensaje_usuario`
  MODIFY `idMensaje` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `productos`
--
ALTER TABLE `productos`
  MODIFY `idProduc` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tienda`
--
ALTER TABLE `tienda`
  MODIFY `idLocal` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `mensajeproductos`
--
ALTER TABLE `mensajeproductos`
  ADD CONSTRAINT `mensajeproductos_ibfk_1` FOREIGN KEY (`producto`) REFERENCES `usuarios` (`idUser`),
  ADD CONSTRAINT `mensajeproductos_ibfk_2` FOREIGN KEY (`cliente`) REFERENCES `productos` (`idProduc`);

--
-- Constraints for table `mensaje_usuario`
--
ALTER TABLE `mensaje_usuario`
  ADD CONSTRAINT `mensaje_usuario_ibfk_1` FOREIGN KEY (`vendedor`) REFERENCES `usuarios` (`idUser`),
  ADD CONSTRAINT `mensaje_usuario_ibfk_2` FOREIGN KEY (`cliente`) REFERENCES `usuarios` (`idUser`);

--
-- Constraints for table `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`vendedor`) REFERENCES `usuarios` (`idUser`);

--
-- Constraints for table `tienda`
--
ALTER TABLE `tienda`
  ADD CONSTRAINT `tienda_ibfk_1` FOREIGN KEY (`vendedor`) REFERENCES `usuarios` (`idUser`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
