# burger
eat-a-burger
# :hamburger: Eat Da Burger!


### Overview
A Node, Express, Handlebars, and MySQL burger app that lets users input the names of burgers they'd like to eat... and then devour them!
Please check out the deployed app on Heroku [here](https://frozen-everglades-97117.herokuapp.com/)!


### Functionality
Using express, mysql,body-parser, and express-handlebars, This app has basic CRUD functions...
  1. READs all entries from the MySQL database and display them to the DOM using Handlebars.
  2. UPDATE a selected burger by clicking "Eat It", which...
    * hits an `api/burgers/:id` The API changes its "devoured" state from 'false' to 'true' in the MySQL database
    * the burger is now in the devoured column (via Handlebars)
  3. CREATE a new burger using the "Create Your Own Burger" form.  Click the 'Create It' button.  The burger is added with an 'eat it' button and is ready to be eaten (via Handlebars).
