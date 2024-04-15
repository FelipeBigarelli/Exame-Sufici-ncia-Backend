const path = require('path');
const fs = require('fs');
const { Sequelize } = require('sequelize');

const PizzaAds = require('../entities/PizzaAds');

const uploadConfig = require('../../../config/upload');

class PizzaAdsRepository {
  async create({
    name,
    description,
    ingredients,
    price,
    image,
    userId,
  }) {
    const lowercaseIngredients = ingredients.map((ingredient) => ingredient.toLowerCase());

    const ad = await PizzaAds.create({
      name,
      description,
      ingredients: lowercaseIngredients,
      price,
      image,
      userId,
    });

    return ad;
  }

  async findById(id) {
    const ad = await PizzaAds.findOne({ where: { id } });

    return ad;
  }

  async uploadImage({ id, image }) {
    const ad = await PizzaAds.findOne({ where: { id } });

    if (ad.image) {
      const imageFilePath = path.join(uploadConfig.directory, String(ad.image));
      const imageFileExists = await fs.promises.stat(imageFilePath);

      if (imageFileExists) {
        await fs.promises.unlink(imageFilePath);
      }
    }

    ad.image = image;

    await ad.save();

    return ad;
  }

  async findFilteredPizzasByIngredients(ingredients, maxPrice) {
    const filteredPizzas = await PizzaAds.findAll({
      attributes: ['name', 'price'],
      where: {
        [Sequelize.Op.and]: [
          Sequelize.fn('JSON_CONTAINS', Sequelize.col('ingredients'), JSON.stringify(ingredients)),
          { price: { [Sequelize.Op.lte]: maxPrice } },
        ],
      },
    });

    return filteredPizzas;
  }
}

module.exports = new PizzaAdsRepository();
