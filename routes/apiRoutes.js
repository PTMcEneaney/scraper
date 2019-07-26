var axios = require("axios");
var cheerio = require("cheerio");
// var request = require("request");
var db = require("../models");

module.exports = function (app) {
    // A GET route for scraping the npr news   website
    app.get("/scrape", function (req, res) {
        // First, we grab the body of the html with axios
        axios.get("https://www.npr.org/sections/news/").then(function (response) {
            // Then, we load that into cheerio and save it to $ for a shorthand selector
            var $ = cheerio.load(response.data);
         
            $("article.item").each(function (i, element) {
                var result = {};

                result.title = $(element)
                .find('.item-info')
                .find('.title')
                .find('a')
                .text();
                result.link = $(element)
                .find('.item-info')
                .find('.title')
                .children()
                .attr("href");
                result.summary = $(element)
                .find('.item-info')
                .find('.teaser')
                .find('a')
                .text();
                result.image = $(element)
                .find('.item-image')
                .find('.imagewrap')
                .find('a')
                .find('img')
                .attr("src");
                result.date = $(element)
                .find('.item-info')
                .find('.teaser')
                .find('a')
                .find('time')
                .attr("datetime");

                db.Article.create(result)
                .then(function(dbArticle) {
                    console.log(dbArticle);

                }).catch(function (err) {
                    // If an error occurred, log it
                    console.log(err);
                });
            });

            // res.json(dbArticle);

            // Send a message to the client
            // res.redirect("/");
            ///////////////////////////////////////////
            res.send("scrape complete");
        });
    });

    // Route for getting all Articles from the db
    app.get("/api/all", function (req, res) {
        // TODO: Finish the route so it grabs all of the articles
    });

    // Route for grabbing a specific Article by id, populate it with it's note
    app.get("/articles/:id", function (req, res) {
        // TODO
        // ====
        // Finish the route so it finds one article using the req.params.id,
        // and run the populate method with "note",
        // then responds with the article with the note included
    });

    // Route for saving/updating an Article's associated Note
    app.post("/articles/:id", function (req, res) {
        // TODO
        // ====
        // save the new note that gets posted to the Notes collection
        // then find an article from the req.params.id
        // and update it's "note" property with the _id of the new note
    });

};