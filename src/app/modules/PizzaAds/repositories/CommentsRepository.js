const Comments = require('../entities/Comments');

class CommentsRepository {
  async create({ content, adId }) {
    const comment = await Comments.create({
      content,
      adId,
    });

    return comment;
  }

  async findAll(adId) {
    const comments = await Comments.findAll({
      attributes: ['content'],
      where: { adId },
    });

    return comments;
  }
}

module.exports = new CommentsRepository();
