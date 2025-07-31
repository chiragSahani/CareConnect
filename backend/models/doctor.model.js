module.exports = (sequelize, Sequelize) => {
  const Doctor = sequelize.define("doctor", {
    name: {
      type: Sequelize.STRING
    },
    specialization: {
      type: Sequelize.STRING
    },
    experience: {
      type: Sequelize.INTEGER
    },
    rating: {
      type: Sequelize.FLOAT
    },
    reviewCount: {
      type: Sequelize.INTEGER
    },
    image: {
      type: Sequelize.STRING
    },
    credentials: {
      type: Sequelize.JSON
    },
    bio: {
      type: Sequelize.TEXT
    },
    languages: {
      type: Sequelize.JSON
    },
    consultationFee: {
      type: Sequelize.INTEGER
    },
    availability: {
      type: Sequelize.JSON
    },
    reviews: {
      type: Sequelize.JSON
    }
  });

  return Doctor;
};
