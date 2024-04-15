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
    try {
      const { id } = request.params;
      const { id: user_id } = request.user;
      const image = request.file;

      // console.log(image, 'IMAGE CONTROLLER');

      const checkUserIsAdOwner = await PizzaAdsRepository.findById(id);

      if (!checkUserIsAdOwner) {
        return response.status(400).json({ error: 'Ad not found' });
      }

      if (checkUserIsAdOwner.userId.toString() !== user_id) {
        return response.status(401).json({ error: 'Ad is not related to this user' });
      }

      const ad = await PizzaAdsRepository.uploadImage({
        id,
        image: image.filename,
      });

      // console.log(ad);
      return response.json(ad);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  async filterPizzas(request, response) {
    const { ingredients, maxPrice } = request.body;

    if (!ingredients || !maxPrice) {
      return response.status(400).json({ error: 'Fields cannot be empty' });
    }

    const filteredPizzas = await PizzaAdsRepository
      .findFilteredPizzasByIngredients(ingredients, maxPrice);

    return response.json(filteredPizzas);
  }
}

module.exports = PizzaAdsController;
