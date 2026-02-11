
const Item = require("./modal/listing.modal")
const FAKE_ENTRY_RECORDS = 100000

const seedData = async () => {
  const bulk = [];

  for (i = 0; i < FAKE_ENTRY_RECORDS; i++) {
    bulk.push({
      name: `Item ${i + 1}`,
      price: Math.floor(Math.random() * 1000),
      status: i % 2 === 0 ? "active" : "inactive",
    });
  }

  await Item.insertMany(bulk);
};

seedData();

module.exports = seedData;
