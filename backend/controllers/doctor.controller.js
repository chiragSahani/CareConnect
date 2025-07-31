const db = require("../models");
const Doctor = db.doctors;
const Op = db.Sequelize.Op;

// Retrieve all Doctors from the database.
exports.findAll = (req, res) => {
  Doctor.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving doctors."
      });
    });
};

// Find a single Doctor with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Doctor.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Doctor with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Doctor with id=" + id
      });
    });
};
