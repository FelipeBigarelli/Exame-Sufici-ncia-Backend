const path = require('path');
const fs = require('fs');
const { Sequelize } = require('sequelize');

const AppError = require('../../../../shared/errors/AppError');

const PizzaAds = require('../entities/PizzaAds');

const uploadConfig = require('../../../config/upload');

class PizzaAdsRepository {
  async show() {
    const ads = await PizzaAds.findAll({
      attributes: ['name', 'price', 'description', [Sequelize.literal('CONVERT(image USING utf8)'), 'image']],
    });

    return ads;
  }

  async findById(id) {
    const ad = await PizzaAds.findOne({ where: { id } });

    return ad;
  }

  async create({
    name,
    description,
    ingredients,
    price,
    image,
    likes,
    userId,
  }) {
    const lowercaseIngredients = ingredients.map((ingredient) => ingredient.toLowerCase());

    const ad = await PizzaAds.create({
      name,
      description,
      ingredients: lowercaseIngredients,
      price,
      image,
      likes,
      userId,
    });

    return ad;
  }

  async updateAd(id, {
    name,
    description,
    ingredients,
    price,
    image,
    likes,
  }) {
    const ad = await PizzaAds.findOne({ where: { id } });

    if (!ad) {
      throw new AppError('Ad not found', 404);
    }

    const lowercaseIngredients = ingredients.map((ingredient) => ingredient.toLowerCase());

    await ad.update({
      name,
      description,
      ingredients: lowercaseIngredients,
      price,
      image,
      likes,
    });

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
    let whereFilter = {};

    if (ingredients && maxPrice) {
      whereFilter = {
        [Sequelize.Op.and]: [
          Sequelize.fn('JSON_CONTAINS', Sequelize.col('ingredients'), JSON.stringify(ingredients)),
          { price: { [Sequelize.Op.lte]: maxPrice } },
        ],
      };
    } else if (ingredients) {
      whereFilter = Sequelize.literal(`JSON_CONTAINS(ingredients, '${JSON.stringify(ingredients)}')`);
    } else if (maxPrice) {
      whereFilter = {
        price: { [Sequelize.Op.lte]: maxPrice },
      };
    } else {
      return [];
    }

    const filteredPizzas = await PizzaAds.findAll({
      attributes: ['name', 'price', 'description', [Sequelize.literal('CONVERT(image USING utf8)'), 'image']],
      where: whereFilter,
    });

    return filteredPizzas;
  }

  async likeAd(id) {
    const ad = await PizzaAds.findOne({ where: { id } });

    if (!ad) {
      throw new AppError('Ad not found', 404);
    }

    ad.likes += 1;

    await ad.save();

    return ad;
  }

  async removeLikeAd(id) {
    const ad = await PizzaAds.findOne({ where: { id } });

    if (!ad) {
      throw new AppError('Ad not found', 404);
    }

    if (ad.likes === 0) {
      throw new AppError('Ad does not have any like', 400);
    }

    ad.likes -= 1;

    await ad.save();

    return ad;
  }
}

module.exports = new PizzaAdsRepository();
