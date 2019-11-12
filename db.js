const Sequelize = require("sequelize");
const pg = require("pg");
const connection = new Sequelize("postgres://localhost:5432/acmenouns");
const { STRING } = Sequelize;

const Person = connection.define("person", {
  name: {
    type: STRING,
    allowNull: false,
    unique: true,
    allEmpty: false
  }
});
const Place = connection.define("place", {
  name: {
    type: STRING,
    allowNull: false,
    unique: true,
    allEmpty: false
  }
});
const Things = connection.define("things", {
  name: {
    type: STRING,
    allowNull: false,
    unique: true,
    allEmpty: false
  }
});

Person.hasMany(Things);
Things.belongsTo(Person);
Person.belongsTo(Place);
Place.hasMany(Person);

const findPersons = () => {
  Person.findAll();
};

const findThings = () => {
  Things.findAll();
};

const findPlaces = () => {
  Place.findAll();
};

const seed = async () => {
  const john = await Person.create({
    name: "John"
  });
  const nyc = await Place.create({
    name: "NYC"
  });
  const cat = await Things.create({
    name: "Cat"
  });
};

const syncAndSeed = (force = true) => {
  connection
    .sync()
    .then(() => {
      seed();
    })
    .then(res => res);
};

module.exports = {
  syncAndSeed,
  findPersons,
  findThings,
  findPlaces
};
