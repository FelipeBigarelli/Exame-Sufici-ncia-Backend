const PizzaAdsRepository = require('../repositories/PizzaAdsRepository');

class PizzaAdsController {
  async store(request, response) {
    const { id } = request.user;
    const {
      name,
      description,
      ingredients,
      price,
    } = request.body;

    const ad = PizzaAdsRepository.create({
      name,
      description,
      ingredients,
      price,
      userId: id,
    });

    response.json(ad);
  }
}

module.exports = PizzaAdsController;
