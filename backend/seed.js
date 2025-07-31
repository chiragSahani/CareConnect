const db = require("./models");
const { mockDoctors } = require("./data/mockData");

const seedDatabase = async () => {
  try {
    await db.sequelize.sync({ force: true });
    console.log("Database synced!");

    await db.doctors.bulkCreate(mockDoctors);
    console.log("Doctors seeded!");

  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await db.sequelize.close();
  }
};

seedDatabase();
