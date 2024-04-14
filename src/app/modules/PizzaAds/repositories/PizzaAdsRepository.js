const PizzaAds = require('../entities/PizzaAds');

class PizzaAdsRepository {
  async create({
    name,
    description,
    ingredients,
    price,
    userId,
  }) {
    const ad = await PizzaAds.create({
      name,
      description,
      ingredients,
      price,
      userId,
    });

    return ad;
  }
}

module.exports = new PizzaAdsRepository();
