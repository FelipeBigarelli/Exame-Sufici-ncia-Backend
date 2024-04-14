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

    const ad = await PizzaAdsRepository.create({
      name,
      description,
      ingredients,
      price,
      userId: id,
    });

    response.json(ad);
  }

  async updateImage(request, response) {
    const { id: ad_id } = request.params;
    const { id: user_id } = request.user;
    const { image } = request.file;

    const checkUser = await PizzaAdsRepository.findById(ad_id);

    if (checkUser.userId !== user_id) {
      response.status(401).json({ error: 'Ad is not related to this user' });
    }

    const ad = await PizzaAdsRepository.uploadImage(ad_id, image);

    return response.json(ad);
  }
}

module.exports = PizzaAdsController;
