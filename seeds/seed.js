const sequelize = require('../config/connection');
const { User } = require('../models');

const userData = require('./userData.json');
const projectData = require('./postData.json');
const commentData = require("./commentData.json");
const Post = require('../models/Post');
const Comments = require(`../models/Comments`)

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const project of projectData) {
    await Post.create({
      ...project,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  };
  for (const comment of commentData) {
    await Comments.create({
      ...comment,
    });
  }

  process.exit(0);
};

seedDatabase();
