const db = require("../models");
const Record = db.records;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.customer_name || !req.body.age || !req.body.phone || !req.body.location) {
    res.status(400).send({
      message: "Missing required fields!"
    });
    return;
  }

  const record = {
    customer_name: req.body.customer_name,
    age: req.body.age,
    phone: req.body.phone,
    location: req.body.location,
    created_at: req.body.created_at || new Date()
  };

  Record.create(record)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Record."
      });
    });
};

exports.findAll = (req, res) => {
  const customer_name = req.query.customer_name;
  var condition = customer_name ? { customer_name: { [Op.iLike]: `%${customer_name}%` } } : null;

  Record.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving records."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Record.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Record with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Record with id=" + id
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Record.update(req.body, {
    where: { sno: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Record was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Record with id=${id}. Maybe Record was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Record with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Record.destroy({
    where: { sno: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Record was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Record with id=${id}. Maybe Record was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Record with id=" + id
      });
    });
};

exports.deleteAll = (req, res) => {
  Record.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Records were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all records."
      });
    });
};
