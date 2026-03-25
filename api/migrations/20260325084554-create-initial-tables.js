'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        // Users
        await queryInterface.createTable('user', {
            id_user: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
            username: { type: Sequelize.STRING(50), allowNull: false, unique: true },
            email: { type: Sequelize.STRING(50), allowNull: false, unique: true },
            password: { type: Sequelize.STRING(200), allowNull: false },
            is_active: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
            created_at: { type: Sequelize.DATE, allowNull: false },
            updated_at: { type: Sequelize.DATE, allowNull: false },
        });

        // Roles
        await queryInterface.createTable('role', {
            id_role: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
            name: { type: Sequelize.STRING(50), allowNull: false, unique: true },
            created_at: { type: Sequelize.DATE, allowNull: false },
            updated_at: { type: Sequelize.DATE, allowNull: false },
        });

        // UserRoles
        await queryInterface.createTable('user_role', {
            id_user: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'user', key: 'id_user' },
                onDelete: 'CASCADE',
            },
            id_role: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'role', key: 'id_role' },
                onDelete: 'CASCADE',
            },
            created_at: { type: Sequelize.DATE, allowNull: false },
            updated_at: { type: Sequelize.DATE, allowNull: false },
        });

        // Books
        await queryInterface.createTable('book', {
            id_book: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
            title: { type: Sequelize.STRING, allowNull: false, unique: true },
            slug: { type: Sequelize.STRING, allowNull: false, unique: true },
            author: { type: Sequelize.STRING, allowNull: false },
            summary: { type: Sequelize.TEXT, allowNull: false },
            excerpt: { type: Sequelize.TEXT, allowNull: false },
            published_at: { type: Sequelize.DATE, allowNull: false },
            publisher: { type: Sequelize.TEXT, allowNull: true },
            genre: { type: Sequelize.TEXT, allowNull: false },
            cover_url: { type: Sequelize.STRING, allowNull: false },
            is_active: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
            created_at: { type: Sequelize.DATE, allowNull: false },
            updated_at: { type: Sequelize.DATE, allowNull: false },
        });

        // Chronicles
        await queryInterface.createTable('chronicle', {
            id_chronicle: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
            title: { type: Sequelize.STRING, allowNull: false, unique: true },
            slug: { type: Sequelize.STRING, allowNull: false, unique: true },
            quote: { type: Sequelize.TEXT, allowNull: false },
            summary: { type: Sequelize.TEXT, allowNull: false },
            content: { type: Sequelize.TEXT, allowNull: false },
            cover_url: { type: Sequelize.STRING, allowNull: false },
            published_at: { type: Sequelize.DATE, allowNull: false },
            is_active: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
            created_at: { type: Sequelize.DATE, allowNull: false },
            updated_at: { type: Sequelize.DATE, allowNull: false },
        });

        // Comments
        await queryInterface.createTable('comment', {
            id_comment: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
            content: { type: Sequelize.TEXT, allowNull: false },
            is_visible: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
            user_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'user', key: 'id_user' }, onDelete: 'CASCADE' },
            chronicle_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'chronicle', key: 'id_chronicle' }, onDelete: 'CASCADE' },
            created_at: { type: Sequelize.DATE, allowNull: false },
            updated_at: { type: Sequelize.DATE, allowNull: false },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('comment');
        await queryInterface.dropTable('chronicle');
        await queryInterface.dropTable('book');
        await queryInterface.dropTable('user_role');
        await queryInterface.dropTable('role');
        await queryInterface.dropTable('user');
    }
};
