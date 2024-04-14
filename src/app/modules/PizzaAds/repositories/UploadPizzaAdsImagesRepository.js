const PizzaAdsImages = require('../entities/PizzaAdsImages');

class UploadPizzaAdsImagesRepository {
  async execute({ user_id, pizzaAdId, images_name }) {
    images_name.map(async (image) => {
      await PizzaAdsImages.create(user_id, pizzaAdId, image);
    });
  }
}

module.exports = new UploadPizzaAdsImagesRepository();
