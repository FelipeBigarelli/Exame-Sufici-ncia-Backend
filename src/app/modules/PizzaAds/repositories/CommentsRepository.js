const Comments = require('../entities/Comments');

class CommentsRepository {
  async create({ content, adId }) {
    const comment = await Comments.create({
      content,
      adId,
    });

    return comment;
  }
}

module.exports = new CommentsRepository();
