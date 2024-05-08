DROP DATABASE IF EXISTS proj23;
CREATE DATABASE proj23;
USE proj23;

CREATE TABLE Branches (
  branch_number int PRIMARY KEY,
  location VARCHAR(50) NOT NULL, 
  Employee_Count INT,
  CHECK (Employee_Count >= 0),
  UNIQUE(location),
  INDEX(branch_number)
);

CREATE TABLE Drinks (
  drink_name VARCHAR(30),
  price INT NOT NULL,
  PRIMARY KEY (drink_name)
);

CREATE TABLE Ingredients (
  ingredients_name VARCHAR(30),
  price INT NOT NULL,
  category VARCHAR(30) NOT NULL,
  PRIMARY KEY (ingredients_name)
);

CREATE TABLE Festival_Decoration (
  decoration_name VARCHAR(30),
  festival VARCHAR(30),
  price INT NOT NULL,
  PRIMARY KEY (decoration_name)
);

CREATE TABLE Supplier (
  phone_number varchar(30),
  shipment_time INT NOT NULL,
  company_name VARCHAR(30) NOT NULL,
  type VARCHAR(30),
  PRIMARY KEY (phone_number),
  UNIQUE(company_name)
);

CREATE TABLE Protection_for_Children (
  material VARCHAR(30) PRIMARY KEY,
  child_friendly BOOLEAN
);

CREATE TABLE Utensils_Information (
  utensils_name VARCHAR(30) PRIMARY KEY,
  material VARCHAR(30) NOT NULL,
  price INT NOT NULL,
  FOREIGN KEY (material) REFERENCES Protection_for_Children(material)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
);

CREATE TABLE Drink_Storage_Condition (
  storage_name VARCHAR(30) PRIMARY KEY,
  volume VARCHAR(10) NOT NULL,
  temperature VARCHAR(10) NOT NULL
);

CREATE TABLE Drink_Storage_Belonging (
  branch_number INT,
  storage_name VARCHAR(30),
  storage_manager VARCHAR(30),
PRIMARY KEY(branch_number, storage_name),
FOREIGN KEY (branch_number)
REFERENCES Branches(branch_number)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
FOREIGN KEY (storage_name)
REFERENCES Drink_Storage_Condition(storage_name)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE Ingredients_Storage_Condition (
  storage_name VARCHAR(30) PRIMARY KEY,
  volume VARCHAR(10) NOT NULL,
  temperature VARCHAR(10) NOT NULL
);

CREATE TABLE Ingredients_Storage_Belonging (
  branch_number INT,
  storage_name VARCHAR(30),
  storage_manager VARCHAR(30),
 PRIMARY KEY(branch_number, storage_name),
  FOREIGN KEY (branch_number) 
REFERENCES Branches(branch_number)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
FOREIGN KEY (storage_name)
REFERENCES Ingredients_Storage_Condition(storage_name)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE Utensils_Storage_Condition (
  storage_name VARCHAR(30) PRIMARY KEY,
  volume VARCHAR(10) NOT NULL,
  temperature VARCHAR(10) NOT NULL
);

CREATE TABLE Utensils_Storage_Belonging (
  branch_number INT,
  storage_name VARCHAR(30),
  storage_manager VARCHAR(30),
  PRIMARY KEY(branch_number, storage_name),
  FOREIGN KEY (branch_number) 
  REFERENCES Branches(branch_number)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
FOREIGN KEY (storage_name)
REFERENCES Utensils_Storage_Condition(storage_name)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE Festival_Decoration_Storage_Condition (
  storage_name VARCHAR(30) PRIMARY KEY,
  volume VARCHAR(10) NOT NULL,
  temperature VARCHAR(10) NOT NULL
);

CREATE TABLE Festival_Decoration_Storage_Belonging (
  branch_number INT,
  storage_name VARCHAR(30),
  storage_manager VARCHAR(30),
 PRIMARY KEY(branch_number, storage_name),
  FOREIGN KEY (branch_number) 
REFERENCES Branches(branch_number)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    FOREIGN KEY (storage_name)
REFERENCES Festival_Decoration_Storage_Condition(storage_name)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE Drink_store (
  storage_name VARCHAR(30),
  branch_number INT,
  drink_name VARCHAR(30),
  quantity INT NOT NULL,
  PRIMARY KEY(branch_number, storage_name, drink_name),
  FOREIGN KEY (branch_number) REFERENCES Branches (branch_number)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
FOREIGN KEY (storage_name) REFERENCES Drink_Storage_Condition(storage_name)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (drink_name) REFERENCES Drinks(drink_name)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE Ingredient_store (
  storage_name VARCHAR(30),
  branch_number INT,
  ingredients_name VARCHAR(30),
  quantity INT NOT NULL,
  expired_date DATE NOT NULL,
  PRIMARY KEY(branch_number, storage_name, ingredients_name),
FOREIGN KEY (branch_number) REFERENCES Branches (branch_number)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
FOREIGN KEY (storage_name) REFERENCES Ingredients_Storage_Condition(storage_name)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (ingredients_name) REFERENCES Ingredients(ingredients_name)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE Utensils_store (
  storage_name VARCHAR(30),
  branch_number INT,
  Utensils_name VARCHAR(30),
  PRIMARY KEY(branch_number, storage_name, utensils_name),
  FOREIGN KEY (branch_number) REFERENCES Branches (branch_number)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
FOREIGN KEY (storage_name) REFERENCES Utensils_Storage_Condition(storage_name)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (utensils_name)
	REFERENCES Utensils_Information(utensils_name)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE Festival_Decoration_store (
  storage_name VARCHAR(30),
  branch_number INT,
  festival_decoration_name VARCHAR(30),
  PRIMARY KEY(branch_number, storage_name, festival_decoration_name),
  FOREIGN KEY (branch_number) REFERENCES Branches (branch_number)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
FOREIGN KEY (storage_name) REFERENCES Festival_Decoration_Storage_Condition(storage_name)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (festival_decoration_name) REFERENCES Festival_Decoration(decoration_name)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE Drinks_Provide (
  drink_name VARCHAR(30),
  Phone_number varchar(30),
  PRIMARY KEY(drink_name,Phone_number),
  FOREIGN KEY (drink_name) REFERENCES Drinks(drink_name)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (Phone_number) REFERENCES Supplier(phone_number)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE Ingredients_Provide (
  ingredients_name VARCHAR(30),
  Phone_number varchar(30),
  PRIMARY KEY(ingredients_name, Phone_number),
  FOREIGN KEY (ingredients_name) REFERENCES Ingredients(ingredients_name)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (Phone_number) REFERENCES Supplier(phone_number)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE Dish_Items (
  item_name VARCHAR(30),
  category VARCHAR(30) NOT NULL,
  price INT NOT NULL,
  PRIMARY KEY (item_name)
);

CREATE TABLE Process (
  ingredients_name VARCHAR(30),
  item_name VARCHAR(30),
  PRIMARY KEY(ingredients_name,item_name),
  FOREIGN KEY (ingredients_name) REFERENCES Ingredients(ingredients_name)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (item_name) REFERENCES Dish_Items(item_name)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE Has_Sales (
  branch_number INT,
  sales_item_name VARCHAR(30),
  date DATE,
  amount INT,
  profit INT,
  PRIMARY KEY(branch_number, sales_item_name, date),
  INDEX(branch_number),
  FOREIGN KEY (branch_number) REFERENCES Branches(branch_number)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

INSERT INTO Branches(branch_number, location, Employee_Count)
VALUES 
    (8204, '1194 Saint-Catherine St W, Montreal, Quebec', 45),
    (3252, '3204 W Broadway, Vancouver, BC', 43),
    (3243, '5890 No. 3 Rd Room 200, Richmond, BC', 46),
    (1332, '5328 Hwy 7, Markham, ON', 40),
    (1294, '237 Yonge St, Toronto, ON', 39),
    (1124, '1571 Sandhurst Cir #106F, Scarborough, ON', 48);

INSERT INTO Drink_Storage_Condition (storage_name, volume, temperature)
VALUES
('large drink fridge', '30L', '3C'),
('medium drink fridge', '25L', '3C'),
('small drink fridge', '15L', '3C'),
('large drink cabinet', '20L', 'room'),
('small drink cabinet', '10L', 'room'); 

INSERT INTO Drink_Storage_Belonging (branch_number, storage_name, storage_manager)
VALUES
(8204, 'large drink fridge', 'Kevin.L'),
(8204, 'medium drink fridge', 'Leo.Z'),
(3243, 'medium drink fridge','Dora.Z'),
(1332, 'small drink cabinet', 'Nott.F'),
(1294, 'small drink cabinet', 'Oscar.M'),
(1124, 'small drink cabinet', 'Collin.T');

INSERT INTO Ingredients_Storage_Condition (storage_name, volume, temperature)
VALUES
('pre-made food fridge', '45L', '-12C'),
('spice rack', '3L', 'room'),
('vegetable fridge', '40L', '3C'),
('sauce cupboard', '5L', '3C'),
('protein freezer', '80L', '-12C'),
('seafood cooler', '50L', '-12C');

INSERT INTO Ingredients_Storage_Belonging(branch_number, storage_name, storage_manager)
VALUES
(8204, 'pre-made food fridge', 'Mark.D'),
(8204, 'spice rack', 'Erica.P'),
(3243, 'vegetable fridge', 'Angle.S'),
(1332, 'vegetable fridge', 'John.S'),
(1294, 'vegetable fridge', 'Rachel.Y'),
(1124, 'vegetable fridge', 'Daniel.A'),
(1294, 'protein freezer', 'Daniel.L'),
(1332, 'protein freezer', 'Anna.C');


INSERT INTO Utensils_Storage_Condition (storage_name, volume, temperature)
VALUES
('small plate cabinet', '10L', 'room'),
('large plate cabinet', '20L', 'room'),
('tableware cabinet', '5L', 'room'),
('pot and wok cabinet', '10L', 'room'),
('cleaning tools storage', '50L', 'room');

INSERT INTO Utensils_Storage_Belonging (branch_number, storage_name, storage_manager)
VALUES
(8204, 'small plate cabinet', 'Lucas.L'),
(3252, 'large plate cabinet', 'Michael.L'),
(3243 , 'tableware cabinet', 'Jerry.F'),
(1332, 'pot and wok cabinet', 'Sophia.S'),
(1294, 'cleaning tools storage', 'Amber.D');


INSERT INTO Festival_Decoration_Storage_Condition  (storage_name, volume, temperature)
VALUES
('midautumn decoration', '5L', 'room'),
('new year decoration', '5L', 'room'),
('christmas decoration', '5L', 'room'),
('lunar new year decoration', '5L', 'room'),
('valentines day decoration', '5L','room');

INSERT INTO  Festival_Decoration_Storage_Belonging (branch_number, storage_name, storage_manager)
VALUES
(8204, 'christmas decoration', 'Tim.H'),
(3243, 'valentines day decoration','Morton.W'),
(1332, 'valentines day decoration', 'Steven.S'),
(1294, 'valentines day decoration', 'Bill.N'),
(1124, 'valentines day decoration', 'Nick.R' );

INSERT INTO Drinks(drink_name, price)
VALUES 
    ('bubble tea', 5),
    ('iced lemon tea', 4),
    ('mango smoothie', 6),
    ('green tea latte', 5),
    ('watermelon juice', 4);
    
INSERT INTO Ingredients (ingredients_name, price, category)
VALUES
    ('chili powder', 8, 'vegetarian/halal'),
    ('carrots', 3,'vegetarian/halal'),
    ('soy sauce', 7, 'vegetarian/halal'),
    ('beef slices', 40, 'halal'),
    ('shrimp', 12, 'vegetarian/halal'),
	('eggs', 6, 'vegetarian/halal'),
    ('rice', 10,'vegetarian/halal');
    
INSERT INTO Protection_for_Children  (material, child_friendly)
VALUES
('stainless steel', 1),
('plastic', 0),
('bamboo', 1),
('glass', 0),
('ceramic', 0),
('plastic and fibre', 0);

INSERT INTO Utensils_Information (utensils_name, material, price)
VALUES
('large white plates', 'ceramic', 7 ),
('small dishes', 'ceramic', 3),
('forks', 'stainless steel', 1),
('hotpot', 'stainless steel', 12),
('mop', 'plastic and fibre', 5);

INSERT INTO Festival_Decoration(decoration_name, festival, price)
VALUES 
    ('Colorful Lanterns', 'mid-autumn', 20),
    ('Tinsel Garland', 'Christmas', 15),
    ('Paper Snowflakes', 'Christmas', 10),
    ('Party Streamers', 'valentines day', 12),
    ('Festive Banners', 'lunar new year', 18);
    
    
INSERT INTO Drink_store(storage_name, branch_number, drink_name, quantity)
VALUES 
    ('large drink fridge', 3243, 'bubble tea', 100),
    ('medium drink fridge', 3243, 'iced lemon tea', 80),
    ('small drink fridge', 3243, 'mango smoothie', 120),
    ('large drink cabinet', 3243, 'green tea latte', 90),
    ('small drink cabinet', 3252, 'watermelon juice', 110),
    ('small drink cabinet', 1124, 'watermelon juice', 30),
    ('small drink cabinet', 1294, 'watermelon juice', 30),
    ('small drink cabinet', 1332, 'watermelon juice', 30),
	('medium drink fridge', 3243, 'green tea latte', 80),
    ('large drink fridge', 8204, 'bubble tea', 100),
    ('medium drink fridge', 8204, 'iced lemon tea', 80);
    
    
    
    
    
    
INSERT INTO Ingredient_store(storage_name, branch_number, ingredients_name,quantity, expired_date)
VALUES 
    ('spice rack', 3243, 'Chili Powder', 10, '2025-10-10'),
    ('vegetable fridge', 3243, 'Carrots',4, '2024-03-02'),
    ('sauce cupboard', 3252, 'Soy Sauce',13, '2024-05-01'),
    ('protein freezer', 3252, 'Beef Slices',40, '2024-02-29'),
    ('seafood cooler', 3252, 'Shrimp',15, '2024-03-15'),
	('protein freezer', 3243, 'eggs',93, '2024-04-01'),
    ('vegetable fridge', 3243,'rice',30,  '2024-12-03');

INSERT INTO Utensils_store(storage_name, branch_number, Utensils_name)
VALUES 
('large plate cabinet', 3252, 'large white plates'),
('small plate cabinet', 3252, 'small dishes'),
('tableware cabinet', 3243, 'forks'),
('pot and wok cabinet', 3243, 'hotpot'),
('cleaning tools storage', 3252, 'mop');

INSERT INTO Festival_Decoration_store(storage_name, branch_number, festival_decoration_name)
VALUES 
    ('midautumn decoration', 3252, 'Colorful Lanterns'),
    ('christmas decoration', 3252, 'Tinsel Garland'),
    ('christmas decoration', 3243, 'Paper Snowflakes'),
    ('valentines day decoration', 3243, 'Party Streamers'),
    ('lunar new year decoration', 3243, 'Festive Banners');

INSERT INTO Supplier(phone_number, shipment_time, company_name, type)
VALUES 
    (1234567890, 3, 'ABC Suppliers', 'Food and Beverages'),
    (9876543210, 2, 'XYZ Distributors', 'Decorations'),
    (5551112222, 5, 'PQR Imports', 'Utensils'),
    (6043660789, 4, 'LMN Supplies', 'Ingredients'),
    (4443332222, 3, 'RST Exports', 'Festival Items'),
    (7785387823, 3, 'The Original Farm Goods', 'Ingredients'),
    (7782267908, 3, 'Simons Fresh Juice', 'Food and Beverages');

INSERT INTO Drinks_Provide (drink_name, phone_number)
VALUES 
    ('Bubble Tea', 1234567890),
    ('Iced Lemon Tea', 1234567890),
    ('Mango Smoothie', 1234567890),
    ('Green Tea Latte', 1234567890),
    ('Watermelon Juice', 7782267908);


INSERT INTO Ingredients_Provide (ingredients_name, phone_number)
VALUES
('Chili Powder', 6043660789),
('Soy Sauce', 6043660789),
('Beef Slices', 6043660789),
('Shrimp', 6043660789),
('Carrots', 7785387823),
('eggs', 7785387823),
('rice', 7785387823);


INSERT INTO Dish_items (item_name, category, price)
VALUES ('sour spicy soup', 'cooked', 6),
	('sorted veggies', 'raw', 8),
	('egg fried rice', 'cooked', 5),
	('fatty beef', 'cooked', 11),
	('smashed shrimp', 'cooked', 11);
    
INSERT INTO Process (ingredients_name, item_name)
VALUES 
    ('chili powder', 'sour spicy soup'),
    ('carrots', 'sorted veggies'),
    ('soy sauce', 'egg fried rice'),
    ('beef slices', 'fatty beef'),
    ('shrimp', 'smashed shrimp'),
	('eggs', 'egg fried rice'),
    ('rice', 'egg fried rice'),
    ('carrots', 'egg fried rice'),
    ('eggs', 'sour spicy soup'),
    ('carrots', 'sour spicy soup');

INSERT INTO Has_Sales (branch_number, sales_item_name, date, amount, profit)
VALUES
  (8204, 'sour spicy soup', '2024-2-28', 80, 400),
  (3252, 'sorted veggies', '2024-2-28', 277, 1385),
  (3243, 'egg fried rice', '2024-2-28', 86, 172),
  (1332, 'fatty beef', '2024-2-28', 240, 1200),
  (1294, 'smashed shrimp', '2024-2-28', 280, 840),
  (1294, 'fatty beef', '2024-4-11', 2, 8),
  (1332, 'fatty beef', '2024-4-28', 200, 800),
  (1332, 'smashed shrimp', '2024-2-18', 80, 320),
  (1332, 'smahed shrimp', '2024-4-17', 12, 50),
  (1332, 'smahed shrimp', '2024-4-10', 200, 800),
  (3243, 'sour spicy soup', '2024-3-28', 100, 400),
  (8204, 'sorted veggies', '2024-2-28', 80, 400);


