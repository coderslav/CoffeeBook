const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable() => "categories", deps: []
 * createTable() => "users", deps: []
 * createTable() => "posts", deps: [users]
 * createTable() => "post_comments", deps: [posts, users]
 * createTable() => "user_votes", deps: [posts, users]
 * createTable() => "user_categories", deps: [categories, users]
 * createTable() => "category_posts", deps: [categories, posts]
 * createTable() => "user_friends", deps: [users]
 *
 */

const info = {
  revision: 1,
  name: "initMigration",
  created: "2022-02-08T16:37:00.919Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "createTable",
    params: [
      "categories",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: { type: Sequelize.STRING, field: "name", allowNull: false },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "users",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          field: "email",
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.STRING,
          field: "password",
          allowNull: false,
        },
        firstName: {
          type: Sequelize.STRING,
          field: "firstName",
          allowNull: false,
        },
        lastName: {
          type: Sequelize.STRING,
          field: "lastName",
          allowNull: false,
        },
        isAdmin: {
          type: Sequelize.BOOLEAN,
          field: "isAdmin",
          defaultValue: false,
        },
        profilePicturePath: {
          type: Sequelize.STRING,
          field: "profilePicturePath",
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "posts",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        title: { type: Sequelize.STRING, field: "title", allowNull: false },
        mediaLink: { type: Sequelize.STRING, field: "mediaLink" },
        content: { type: Sequelize.TEXT, field: "content", allowNull: false },
        voteAvg: { type: Sequelize.FLOAT, field: "voteAvg", defaultValue: 0 },
        abuseReport: {
          type: Sequelize.INTEGER,
          field: "abuseReport",
          defaultValue: 0,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        userId: {
          type: Sequelize.INTEGER,
          field: "userId",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "users", key: "id" },
          name: "userId",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "post_comments",
      {
        comment: { type: Sequelize.TEXT, field: "comment" },
        hasAbuse: {
          type: Sequelize.BOOLEAN,
          field: "hasAbuse",
          defaultValue: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        postId: {
          type: Sequelize.INTEGER,
          field: "postId",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "posts", key: "id" },
          primaryKey: true,
        },
        UserId: {
          type: Sequelize.INTEGER,
          field: "UserId",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "users", key: "id" },
          primaryKey: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "user_votes",
      {
        vote: { type: Sequelize.INTEGER, field: "vote", defaultValue: 0 },
        favorited: {
          type: Sequelize.BOOLEAN,
          field: "favorited",
          defaultValue: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        postId: {
          type: Sequelize.INTEGER,
          field: "postId",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "posts", key: "id" },
          primaryKey: true,
        },
        UserId: {
          type: Sequelize.INTEGER,
          field: "UserId",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "users", key: "id" },
          primaryKey: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "user_categories",
      {
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        categoryId: {
          type: Sequelize.INTEGER,
          field: "categoryId",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "categories", key: "id" },
          primaryKey: true,
        },
        UserId: {
          type: Sequelize.INTEGER,
          field: "UserId",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "users", key: "id" },
          primaryKey: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "category_posts",
      {
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        categoryId: {
          type: Sequelize.INTEGER,
          field: "categoryId",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "categories", key: "id" },
          primaryKey: true,
        },
        postId: {
          type: Sequelize.INTEGER,
          field: "postId",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "posts", key: "id" },
          primaryKey: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "user_friends",
      {
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        UserId: {
          type: Sequelize.INTEGER,
          field: "UserId",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "users", key: "id" },
          primaryKey: true,
        },
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "dropTable",
    params: ["categories", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["posts", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["post_comments", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["users", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["user_votes", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["user_categories", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["category_posts", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["user_friends", { transaction }],
  },
];

const pos = 0;
const useTransaction = true;

const execute = (queryInterface, sequelize, _commands) => {
  let index = pos;
  const run = (transaction) => {
    const commands = _commands(transaction);
    return new Promise((resolve, reject) => {
      const next = () => {
        if (index < commands.length) {
          const command = commands[index];
          console.log(`[#${index}] execute: ${command.fn}`);
          index++;
          queryInterface[command.fn](...command.params).then(next, reject);
        } else resolve();
      };
      next();
    });
  };
  if (useTransaction) return queryInterface.sequelize.transaction(run);
  return run(null);
};

module.exports = {
  pos,
  useTransaction,
  up: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, migrationCommands),
  down: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, rollbackCommands),
  info,
};
