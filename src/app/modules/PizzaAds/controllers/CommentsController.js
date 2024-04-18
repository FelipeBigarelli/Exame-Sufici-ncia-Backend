const CommentsRepository = require('../repositories/CommentsRepository');
const PizzaAdsRepository = require('../repositories/PizzaAdsRepository');

class CommentsController {
  async store(request, response) {
    const { id } = request.params;
    const { content } = request.body;

    const ad = await PizzaAdsRepository.findById(id);

    if (!ad) {
      return response.status(404).json({ error: 'Ad not found' });
    }

    const comment = await CommentsRepository.create({
      content,
      adId: ad.id,
    });

    return response.status(201).json(comment);
  }

  async show(request, response) {
    try {
      const { id } = request.params;

      const comment = await CommentsRepository.findAll(id);

      if (!comment) {
        return response.status(404).json('Ad does not have any content');
      }

      return response.json(comment);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

module.exports = CommentsController;
