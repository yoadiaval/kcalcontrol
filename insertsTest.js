//USUARIO

INSERT INTO `usuarios` (`id`, `nombre`, `apellidos`, `edad`, `sexo`, `objetivo`, `nivel_actividad`, `obj_calorias`, `obj_proteinas`, `obj_grasas`, `obj_carbohidratos`, `created_at`, `updated_at`) VALUES
('1', 'Juan', 'Pérez García', 30, 'masculino', 'perder peso', 'moderado', 2200.00, 150.00, 70.00, 250.00, '2025-04-10 07:20:58', '2025-04-10 07:20:58');




//ALIMENTOS

INSERT INTO `alimentos` ( `uid`, `descripcion`, `base`, `calorias`, `proteinas`, `grasas`, `carbohidratos`, `ref_ext`, `created_at`, `updated_at`) VALUES
( 'IboddUwA1mcbJBTyJbRL2ELd0r62', 'calabaza', 100, 165.00, 31.00, 3.60, 0.00, 'REF001', '2025-04-10 07:22:14', '2025-04-10 15:02:38'),
( 'IboddUwA1mcbJBTyJbRL2ELd0r62', 'Pechuga de pollo', 100, 165.00, 31.00, 3.60, 0.00, 'REF002', '2025-04-10 07:22:14', '2025-04-10 07:22:14'),
( 'IboddUwA1mcbJBTyJbRL2ELd0r62', 'Arroz blanco cocido', 100, 130.00, 2.70, 0.30, 28.00, 'REF003', '2025-04-10 07:22:14', '2025-04-10 07:22:14'),
( 'IboddUwA1mcbJBTyJbRL2ELd0r62', 'Aguacate', 100, 160.00, 2.00, 15.00, 9.00, 'REF004', '2025-04-10 07:22:14', '2025-04-10 07:22:14'),
( 'IboddUwA1mcbJBTyJbRL2ELd0r62', 'Huevo entero', 100, 143.00, 13.00, 10.00, 1.10, 'REF005', '2025-04-10 07:22:14', '2025-04-10 07:22:14'),
( 'IboddUwA1mcbJBTyJbRL2ELd0r62', 'Manzana', 100, 52.00, 0.30, 0.20, 14.00, 'REF006', '2025-04-10 07:22:14', '2025-04-10 07:22:14'),
( 'IboddUwA1mcbJBTyJbRL2ELd0r62', 'Salmón', 100, 208.00, 20.00, 13.00, 0.00, 'REF007', '2025-04-10 07:22:14', '2025-04-10 07:22:14'),
( 'IboddUwA1mcbJBTyJbRL2ELd0r62', 'Lentejas cocidas', 100, 116.00, 9.00, 0.40, 20.00, 'REF008', '2025-04-10 07:22:14', '2025-04-10 07:22:14'),
( 'IboddUwA1mcbJBTyJbRL2ELd0r62', 'Pan integral', 100, 247.00, 13.00, 4.20, 41.00, 'REF009', '2025-04-10 07:22:14', '2025-04-10 07:22:14'),
( 'IboddUwA1mcbJBTyJbRL2ELd0r62', 'Plátano', 100, 89.00, 1.10, 0.30, 23.00, 'REF010', '2025-04-10 07:22:14', '2025-04-10 07:22:14'),
( 'IboddUwA1mcbJBTyJbRL2ELd0r62', 'Yogur natural', 100, 61.00, 3.50, 3.30, 4.70, 'REF011', '2025-04-10 07:22:14', '2025-04-10 07:22:14'),
( 'IboddUwA1mcbJBTyJbRL2ELd0r62', 'Queso fresco', 100, 98.00, 11.00, 5.00, 1.50, 'REF012', '2025-04-10 07:22:14', '2025-04-10 07:22:14'),
( 'IboddUwA1mcbJBTyJbRL2ELd0r62', 'Brócoli cocido', 100, 55.00, 3.70, 0.60, 11.00, 'REF013', '2025-04-10 07:22:14', '2025-04-10 07:22:14'),
( 'IboddUwA1mcbJBTyJbRL2ELd0r62', 'Papa cocida', 100, 87.00, 1.90, 0.10, 20.00, 'REF014', '2025-04-10 07:22:14', '2025-04-10 07:22:14'),
( 'IboddUwA1mcbJBTyJbRL2ELd0r62', 'Atún en agua', 100, 116.00, 26.00, 1.00, 0.00, 'REF015', '2025-04-10 07:22:14', '2025-04-10 07:22:14');


//TIPOS DE COMIDA


INSERT INTO `tipos_comida` (`id`, `descripcion`, `created_at`, `updated_at`) VALUES
(1, 'desayuno', NULL, NULL),
(2, 'almuerzo', NULL, NULL),
(3, 'cena', NULL, NULL),
(4, 'snack', NULL, NULL);


//REGISTROS DE COMIDA
INSERT INTO `registros_comidas` (`uid`, `fecha`, `tipo_comida_id`, `alimento_id`, `cantidad`, `created_at`, `updated_at`) VALUES
('1', '2025-04-10', 1, '1', 150.00, NULL, NULL),
('1', '2025-04-10', 1, '2', 200.00, NULL, NULL);