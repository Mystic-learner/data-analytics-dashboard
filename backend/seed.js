const mongoose = require("mongoose");
require("dotenv").config();

const Sales = require("./models/Sales");

const seedData = [
  {
    product: "Laptop",
    category: "Electronics",
    amount: 1200,
    date: new Date("2025-01-10"),
    status: "Completed",
  },
  {
    product: "Phone",
    category: "Electronics",
    amount: 800,
    date: new Date("2025-02-05"),
    status: "Pending",
  },
  {
    product: "Shirt",
    category: "Clothing",
    amount: 60,
    date: new Date("2025-02-15"),
    status: "Completed",
  },
  {
    product: "Shoes",
    category: "Clothing",
    amount: 150,
    date: new Date("2025-03-01"),
    status: "Completed",
  },
  {
    product: "Headphones",
    category: "Electronics",
    amount: 200,
    date: new Date("2025-03-10"),
    status: "Pending",
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Sales.deleteMany();
    await Sales.insertMany(seedData);

    console.log("✅ Data Seeded Successfully");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();