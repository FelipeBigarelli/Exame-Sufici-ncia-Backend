const Comments = require('../entities/Comments');
const PizzaAds = require('../entities/PizzaAds');

const AppError = require('../../../../shared/errors/AppError');

class CommentsRepository {
  async addComment(adId, content) {
    const ad = await PizzaAds.findByPk(adId);

    if (!ad) {
      throw new AppError('Ad not found', 404);
    }

    const comment = await Comments.create({ content });

    await ad.addComment(comment);

    return comment;
  }

  // async likeAd(adId, userId) {
  //   const ad = await PizzaAds.findByPk(adId);

  //   if (!ad) {
  //     throw new AppError('Ad not found', 404);
  //   }

  //   await ad.addUser(userId);
  // }
}

module.exports = new CommentsRepository();
