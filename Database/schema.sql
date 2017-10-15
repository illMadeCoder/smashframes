/*
Frames.Characters
--Character Primary Key
--Moves FOREIGN KEY

Frames.Moves
--ID PRIMARY KEY
--Character
--Directions
--Type
--Grounded
--Moving


*/

CREATE TABLE Frames.Characters (
  Character Text PRIMARY KEY,
  Jab1 Int FOREIGN KEY REFERENCES Frames.Moves(ID),
  Jab2 Int FOREIGN KEY REFERENCES Frames.Moves(ID),
  Jab3 Int FOREIGN KEY REFERENCES Frames.Moves(ID),
  JabSpam Int FOREIGN KEY REFERENCES Frames.Moves(ID),
  F-Tilt Int FOREIGN KEY REFERENCES Frames.Moves(ID)
);

CREATE TABLE Frames.Moves (
  ID Int Primary Key AUTO_INCREMENT,
  Character Text FOREIGN KEY REFERENCES Frames.Characters(Character)
  Direction Int FOREIGN KEY REFERENCES Frames.Directions(ID),
  Type Int FOREIGN KEY REFERENCES Frames.Types(ID),
  Grounded Int FOREIGN KEY REFERENCES Frames.Grounded(ID),
  Moving Int FOREIGN KEY REFERENCES Frames.Moving(ID)
);

CREATE TABLE Frames.Types (
  ID Int PRIMARY KEY,
  Type varchar(20)
);

INSERT INTO Frames.Types (ID, Type)
  VALUES
  (1, "Jab"),
  (2, "Tilt"),
  (3, "Smash"),
  (4, "Ground Special"),
  (5, "Aerial"),
  (6, "Air Special"),
  (7, "Grab"),
  (8, "Running Grab"),
  (9, "Jump"),
  (10, "Roll"),
  (11, "Dash Attack"),
  (12, "Ground Dodge"),
  (13, "Air Dodge"),
  (13, "Run"),
  (14, "Taunt"),
  (15, "Misc");

  CREATE TABLE Frames.Directions (
    ID Int PRIMARY KEY,
    Direction varchar(20)
  );

INSERT INTO Frames.Direction (ID, Direction)
  VALUES
  (1, "Neutral"),
  (2, "Up"),
  (3, "Down"),
  (4, "Back"),
  (5, "Forward");

CREATE TABLE Frames.Grounded (
  ID Int PRIMARY KEY,
  Grounded varchar(20)
);

INSERT INTO Frames.Grounded
  VALUES
  (1, "Grounded"),
  (2, "Aerial");

CREATE TABLE Frames.Moving (
  ID Int PRIMARY KEY,
  Moving varchar(20)
);

INSERT INTO Frames.Moving
  VALUES
  (1, "Moving"),
  (2, "Standing"),
  (3, "Either");
