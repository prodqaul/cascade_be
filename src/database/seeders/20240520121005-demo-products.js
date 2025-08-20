"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "Products",
      [
        {
          id: "33333333-3333-3333-3333-333333333333",
          title: "Nice clothes",
          description: "The bread was moldy.",
          status: "New",
          images: [
            "https://res.cloudinary.com/dkdzqcq5y/image/upload/v1755628629/cloudinary:/797374383719442/khoh8gmjk7upo7kmmnoc.jpg",
            "https://res.cloudinary.com/dkdzqcq5y/image/upload/v1755628631/cloudinary:/797374383719442/nglcsna4xrrqe5ylcyrc.jpg",
            "https://res.cloudinary.com/dkdzqcq5y/image/upload/v1755628633/cloudinary:/797374383719442/vplqgohbjuqoci8wmwzw.jpg",
          ],
          categoryId: "22222222-2222-2222-2222-222222222222",
          userId: "7121d946-7265-45a1-9ce3-3da1789e657e",
          isAvailable: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Products", null, {});
  },
};
