const path = require('path');
const fs = require('fs');

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
    const ad = await PizzaAds.create({
      name,
      description,
      ingredients,
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

  async uploadImage({ ad_id, image }) {
    const ad = await PizzaAds.findOne({ where: { ad_id } });

    if (ad.image) {
      const imageFilePath = path.join(uploadConfig.directory, ad.image);
      const imageFileExists = await fs.promises.stat(imageFilePath);

      if (imageFileExists) {
        await fs.promises.unlink(imageFilePath);
      }
    }

    ad.image = image;

    await PizzaAds.save(ad);

    return ad;
  }
}

module.exports = new PizzaAdsRepository();
