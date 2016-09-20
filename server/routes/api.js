'use strict';

var _ = require('underscore');
var PEOPLES = require('./data/persons').peoples;


exports.listAll = function (req, res) {
  console.log('List all PEOPLES');
  return res.status(200).json(PEOPLES);
};


exports.get = function (req, res) {
  var id = getId(req);
  console.log('Get person : id=' + id);

  var person = _.findWhere(PEOPLES, {id: id});

  if (!person) {
    return res.status(404).json({error: 'La personne avec l\'id "' + id + '" n\'existe pas.'});
  }

  return res.status(200).json(person);
};


exports.update = function (req, res) {
  var id = getId(req);
  console.log('Update person : id=' + id);

  var person = req.body;

  var index = _.findIndex(PEOPLES, function (p) {
    return p.id === id;
  });

  if (index === -1) {
    return res.status(404).json({error: 'La personne avec l\'id "' + id + '" n\'existe pas.'});
  }

  _.assign(PEOPLES[index], person);

  return res.status(200).json(PEOPLES[index]);
};


function getParam(req, param) {
  return req.params[param];
}

function getId(req) {
  var param = getParam(req, 'id');
  return param;
}
