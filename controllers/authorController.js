const Author = require('../models/author');
const Book = require("../models/book");

const async = require("async");

// display list of all authors
exports.author_list = function(req, res, next) {
    Author.find()
        .sort([['family_name', 'ascending']])
        .exec(function (err, list_authors) {
            if (err) {
                return next(err);
            }
            // render to author_list api to view author_list.pug
            res.render('author_list', {title : 'Author List', author_list: list_authors});
        })
};

// display detail page for a specific author
exports.author_detail = (req, res) => {
    async.parallel(
        {
          author(callback) {
            Author.findById(req.params.id).exec(callback);
          },
          authors_books(callback) {
            Book.find({ author: req.params.id }, "title summary").exec(callback);
          },
        },
        (err, results) => {
            if (err) {
            // Error in API usage.
            return next(err);
            }
            if (results.author == null) {
            // No results.
                const err = new Error("Author not found");
                err.status = 404;
                return next(err);
            }
            // Successful, so render.
            res.render("author_detail", {
                title: "Author Detail",
                author: results.author,
                author_books: results.authors_books,
            });
        }
    );
};

// display author create form on GET method
exports.author_create_get = (req, res) => {
    res.send('Not implemented: Author delete GET');
};

// Handle Author create on POST.
exports.author_create_post = (req, res) => {
    res.send('NOT IMPLEMENTED: Author create POST');
};
  
// Display Author delete form on GET.
exports.author_delete_get = (req, res) => {
    res.send('NOT IMPLEMENTED: Author delete GET');
};
  
// Handle Author delete on POST.
exports.author_delete_post = (req, res) => {
    res.send('NOT IMPLEMENTED: Author delete POST');
};
  
// Display Author update form on GET.
exports.author_update_get = (req, res) => {
    res.send('NOT IMPLEMENTED: Author update GET');
};
  
// Handle Author update on POST.
exports.author_update_post = (req, res) => {
    res.send('NOT IMPLEMENTED: Author update POST');
};
