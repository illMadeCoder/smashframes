Title 
Smashframes.com 

Description 
A Super Smash Brothers Melee frame data archive, analytics, and viewer website.

Goals
1. Maintain an archive of Melee frame data.
2. Provide a client view of Melee frame data.
3. Provide an api to get the formatted data.
4. Provide a form for client contributions to the website.
5. Provide a means to perform analytics upon the archive.
6. Provide a view of said analytics.

Means
1. Archive data with a DB, extract from google spreadsheet api - MongoDB, Tabletop, Mongoose
2. Provide a view via a web app based infrastructure as the websites homepage - Javascript, Bootstrap, AngularJS, Node, Express, Nginx, ejs
3. Provide api to data via express routing and RESTFUL protocol - Express, REST
4. Provide a form for client contributions via data binding - AngularJS, Express
5. Perform data science via R programming, using r-script to pass data between Node and R - R, r-script
6. Provide a view of said analytics - MISSING

Technologies
1. MongoDB - Database
2. Tabletop - Extracts data from google spreadsheet
3. Javascript - Web App Programming Language
4. Bootstrap - CSS Styling
5. Angularjs - Databinding, dynamic html manipulation
6. Express - Routing
7. Nodejs - Back end application
8. Nginx - Server
9. REST - Web routing and api protocol 
10. R - Data science programming
11. r-script - Interface between back end and R
12. Mongoose - Enforce a schema and manage MongoDB.
13. EJS - An html generation template that will form views based on data.

Architecture
--Folder Structure
MEAN data structure - https://github.com/meanjs/mean

--Back End
1. Nginx Server - A local server who proxies http to the back end nodejs app.
2. Smashframes Database - A local MongoDB instance.
3. import_data.js - Data is located in a Google Spreadsheet which is extracted using a Nodejs package, 
Tabletop, and is then formated to schema and imported uniquely into a local server's MongoDB instance
labeled Smashframes.
4. app.js - The web app entry point.
5. server_routes.js - http routing configuration.

--Front End
1. index.ejs - Website homepage, provides frame data view.
2. contribute.ejs - Contribution page, provides a form for user input.
3. analytics.ejs - Perform R analysis on data.
  