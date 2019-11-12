const Sequelize = require('sequelize');

const { STRING } = Sequelize;

const db = new Sequelize('postgres://localhost:5432/acmenouns', {
  logging: false
});

const Person = db.define('person', {
  name: {
    type: STRING,
    allowNull: false,
    unique: true,
    allEmpty: false
  }
});
const Place = db.define('place', {
  name: {
    type: STRING,
    allowNull: false,
    unique: true,
    allEmpty: false
  }
});
const Thing = db.define('things', {
  name: {
    type: STRING,
    allowNull: false,
    unique: true,
    allEmpty: false
  }
});

Person.belongsTo(Place);
Place.hasMany(Person);

Thing.belongsTo(Person);
Person.hasMany(Thing);

const seed = async () => {
  const nyc = await Place.create({
    name: 'NYC'
  });

  const john = await Person.create({
    name: 'John',
    placeId: nyc.id
  });

  const cat = await Thing.create({
    name: 'Cat',
    personId: john.id
  });
};

const syncAndSeed = () => {
  return db.sync({ force: true })
    .then(() => seed())
    .catch(e => console.error(e))
};

module.exports = {
  Person,
  Place,
  Thing,
  syncAndSeed
};
