
/* Dependencies */
var mongoose = require('mongoose'), 
    Listing = require('../models/listings.server.model.js');

/* Creates a listing */
exports.create = function(req, res) {

  /* Instantiates a Listing */
  var listing = new Listing(req.body);

  if(req.results) {
    listing.coordinates = {
      latitude: req.results.lat, 
      longitude: req.results.lng
    };
  }
  /* saves the listing */
  listing.save(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(listing);
    }
  });
};

/* shows the current listing */
exports.read = function(req, res) {
  /* send back the listing as json from the request */
  res.json(req.listing);
};

/* Update a listing */
exports.update = function(req, res) {
  var listing = req.listing;

  listing.code = req.body.code;
  listing.name = req.body.name;
  listing.address = req.body.address;

  if(listing.address && req.results) {
    listing.coordinates = {
      latitude: req.results.lat,
      longitude: req.results.lng
    };
  }
  /* saves the article */
  listing.save(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(listing);
    }
  });
};

/* Delete a listing */
exports.delete = function(req, res) {
  var listing = req.listing;

  /* removes the article */
  listing.remove(function(err) {
    if (err) throw err;

    res.statusCode(200).end();
  });
};

/* retreives all the directory listings in alphabetical order by code */
exports.list = function(req, res) {
  Listing.find({}, function(err, listings) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(listings);
    }
  });
};

/* 
  find a listing by its ID, then pass it to the next request handler. 

  Find the listing using a mongoose query, 
    bind it to the request object as the property 'listing', 
      then finally call next
 */
exports.listingByID = function(req, res, next, id) {
  Listing.findById(id).exec(function(err, listing) {
    if(err) {
      res.status(400).send(err);
    } else {
      req.listing = listing;
      next();
    }
  });
};
