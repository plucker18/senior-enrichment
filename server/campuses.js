'use strict';

const api = require('express').Router();
const { Campuses, Students } = require('../db/models');

/* --------------- GET METHODS ---------------*/

api.get('/', (req, res, next) => {
  Campuses.findAll({
    include: [{
      model: Students,
    }]
  })
  .then(campuses => res.json(campuses))
  .catch(next);
});

api.get('/:campusId', (req, res, next) => {
  const campusId = req.params.campusId;
  Campuses.findOne({
    where: {
      id: campusId
    },
    include: [
      {model: Students}
    ]
  })
  .then(campus => res.json(campus))
  .catch(next);
});

/* --------------- POST METHODS ---------------*/

api.post('/', (req, res, next) => {
  Campuses.create(req.body)
    .then(campus => res.json(campus))
    .catch(next);
});

/* --------------- PUT METHODS ---------------*/

api.put('/:campusId', (req, res, next) => {
  Campuses.findById(req.params.campusId)
    .then(campus => campus.update(req.body))
    .then(updatedCampus => {
      res.json(updatedCampus);
    });
});

/* --------------- DELETE METHODS ---------------*/

api.delete('/:campusId', (req, res, next) => {
  Campuses.findById(req.params.campusId)
    .then(campus => campus.destroy())
    .then(() => {
      res.status(204).send('Campus Deleted');
    })
    .catch(next);
});

module.exports = api;
