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
}

module.exports = CommentsController;
