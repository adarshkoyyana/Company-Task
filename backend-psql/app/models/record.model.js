module.exports = (sequelize, Sequelize) => {
    const Record = sequelize.define("record", {
      sno: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      customer_name: {
        type: Sequelize.STRING
      },
      age: {
        type: Sequelize.INTEGER
      },
      phone: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      },
      created_at: {
        type: Sequelize.DATE
      }
    });
  
    return Record;
  };
  