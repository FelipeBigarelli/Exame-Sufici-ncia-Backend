const PizzaAdsRepository = require('../repositories/PizzaAdsRepository');

class PizzaAdsController {
  async show(request, response) {
    try {
      const ads = await PizzaAdsRepository.show();

      if (!ads) {
        return response.status(404).json({ error: 'Does not have any ads at the moment' });
      }

      return response.status(200).json(ads);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

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

    return response.status(201).json(ad);
  }

  async updateAd(request, response) {
    try {
      const { id: user_id } = request.user;
      const { id } = request.params;
      const {
        name,
        description,
        ingredients,
        price,
      } = request.body;

      const adExists = await PizzaAdsRepository.findById(id);

      if (!adExists) {
        return response.status(404).json('Ad not found');
      }

      if (String(adExists.userId) !== user_id) {
        return response.status(400).json('Ad is not associated with this user');
      }

      const updatedAd = await PizzaAdsRepository.updateAd(id, {
        name,
        description,
        ingredients,
        price,
      });

      return response.json(updatedAd);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  async updateImage(request, response) {
    try {
      const { id } = request.params;
      const { id: user_id } = request.user;
      const image = request.file;

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

      return response.json(ad);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  async filterPizzas(request, response) {
    const { ingredients, maxPrice } = request.query;

    if (!ingredients && !maxPrice) {
      return response.status(400).json({ error: 'Both fields cannot be empty' });
    }

    let filteredPizzas;

    if (ingredients && maxPrice) {
      filteredPizzas = await PizzaAdsRepository.findFilteredPizzasByIngredients(
        ingredients,
        maxPrice,
      );
    } else if (ingredients) {
      filteredPizzas = await PizzaAdsRepository.findFilteredPizzasByIngredients(
        ingredients,
        null,
      );
    } else if (maxPrice) {
      filteredPizzas = await PizzaAdsRepository.findFilteredPizzasByIngredients(
        null,
        maxPrice,
      );
    }

    return response.json(filteredPizzas);
  }

  async likeAd(request, response) {
    try {
      const { id } = request.params;

      const ad = await PizzaAdsRepository.findById(id);

      if (!ad) {
        return response.status(400).json({ error: 'Ad not found' });
      }

      await PizzaAdsRepository.likeAd(ad.id);

      return response.sendStatus(200);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  async removeLikeAd(request, response) {
    try {
      const { id } = request.params;

      const ad = await PizzaAdsRepository.findById(id);

      if (!ad) {
        return response.status(400).json({ error: 'Ad not found' });
      }

      await PizzaAdsRepository.removeLikeAd(ad.id);

      return response.sendStatus(200);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

module.exports = PizzaAdsController;
