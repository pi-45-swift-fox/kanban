'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const data = []
    const category = ['backlog', 'todo', 'doing', 'done']

    for (let i=1; i<30; i++) {
      data.push({
      title: `test ${i}`, 
      category: category[Math.floor(Math.random() * 4)], 
      createdAt: new Date(),
      updatedAt: new Date()
    })
    }

   await queryInterface.bulkInsert('Tasks', data)
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('People', null, {})
  }
};
