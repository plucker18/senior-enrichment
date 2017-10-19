'use strict';

const api = require('express').Router();
const { Students, Campuses } = require('../db/models');

/* --------------- GET METHODS ---------------*/

api.get('/', (req, res, next) => {
	Students.findAll({
    include: [{
      model: Campuses,
    }]
  })
	 .then(students => res.json(students))
	 .catch(next);
 });

api.get('/:studentId', (req, res, next) => {
  Students.findOne({
    where: {
      id: req.params.studentId
    },
    include: [
      {model: Campuses, as: 'campus'}
    ]
  })
  .then(student => res.json(student))
  .catch(next);
});

/* --------------- POST METHODS ---------------*/

api.post('/', (req, res, next) => {
  console.log(req.body)
  Students.create(req.body)
    .then(student => res.json(student))
    .catch(next);
});

/* --------------- PUT METHODS ---------------*/

api.put('/:studentId', (req, res, next) => {
  Students.findById(req.params.studentId)
    .then(student => student.update(req.body))
    .then(updatedStudent => res.json(updatedStudent))
    .catch(next);
});

/* --------------- DELETE METHODS ---------------*/

api.delete('/:studentId', (req, res, next) => {
   Students.findById(req.params.studentId)
    .then(student => student.destroy())
    .then(() => {
      res.status(204).send('Student Deleted');
    });
});

 module.exports = api;
