"use strict";

const express = require("express");
const cors = require("cors");
const PORT = 8080;
const HOST = "0.0.0.0";
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
  }
);

const User = sequelize.define(
  "user",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    zip: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dob: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    timestamps: false,
  }
);

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.get("/users", async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const pageSize = 25;
  try {
    const users = await User.findAll({
      offset: (page - 1) * pageSize,
      limit: pageSize,
    });

    res.json({
      totalUsers: users.length,
      page: page,
      pageSize: pageSize,
      users: users,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve users" });
  }
});

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});
