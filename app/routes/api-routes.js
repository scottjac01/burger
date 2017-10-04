// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
var Book = require("../models/book.js");


// Routes
// =============================================================
module.exports = function(app) {

  app.get("/api/books", function(req, res) {
    // Use the query param to figure out what kind of search to do

    if (req.query.title) {
      // Find by title
      // /api/books?title=Great%20Expectations
      return getBookByTitle(req.query.title, res);

    } else if (req.query.genre) {
      // Find by genre
      // /api/books?genre=fiction
      return getBookByGenre(req.query.genre, res);

    } else if (req.query.author) {
      // Find by author
      // /api/books?author=Charles%20Dickons
      return getBookByAuthor(req.query.author, res);

    } else if (req.query.length) {
      // Valid values for length are "long" and "short"
      if (req.query.length == "long") {
        // /api/books?length=long
        return getLongBooks(res);
      } else if (req.query.length == "short") {
        // /api/books?length=short
        return getShortBooks(res);
      }

    } else {
      // Return all books
      // /api/books
      return getAllBooks(res);
    }
  });

  // Get a specific book
  function getBookByTitle(title, res) {
    Book.findAll({
      where: {
        title: title
      }
    }).then(function(results) {
      res.json(results);
    });
  };

  // Get all books
  function getAllBooks(res) {
    Book.findAll({}).then(function(results) {
      res.json(results);
    });
  }

  // Get all books of a specific genre
  function getBookByGenre(genre, res) {
    Book.findAll({
      where: {
        genre: genre
      }
    }).then(function(results) {
      res.json(results);
    });
  };

  // Get all books from a specific author
  function getBookByAuthor(author, res) {
    Book.findAll({
      where: {
        author: author
      }
    }).then(function(results) {
      res.json(results);
    });
  };

  // Get all "long" books (books 300 pages or more)
  function getLongBooks(res) {
    Book.findAll({
      where: {
        pages: {
          $gte: 300
        }
      },
      order: [["pages", "DESC"]]
    }).then(function(results) {
      res.json(results);
    });
  };

  // Get all "short" books (books 150 pages or less)
  function getShortBooks(res) {
    Book.findAll({
      where: {
        pages: {
          $lte: 150
        }
      },
      order: [["pages", "ASC"]]
    }).then(function(results) {
      res.json(results);
    });
  };

  // Add a book
  app.post("/api/books", function(req, res) {
    console.log("Book Data:");
    console.log(req.body);
    Book.create({
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      pages: req.body.pages
    }).then(function(results) {
      res.json(results);
    });
  });

  // Delete a book
  app.delete("/api/books/:book", function(req, res) {
    Book.destroy({
      where: {
        id: req.params.book
      }
    }).then(
      function(numDeleted) {
        if (numDeleted == 0) {
          // If no rows were changed, then the ID must not exist, so 404
          return res.status(404).end();
        } else {
          res.status(200).end();
        }
      }
    );
  });
};
