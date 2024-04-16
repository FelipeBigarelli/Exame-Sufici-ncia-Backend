const CommentsRepository = require('../repositories/CommentsRepository');

class CommentsController {
  async createComment(request, response) {
    const { adId } = request.params;
    const { content } = request.body;

    try {
      const comment = await CommentsRepository.addComment(adId, content);

      return response.status(201).json(comment);
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  }
}

module.exports = CommentsController;
