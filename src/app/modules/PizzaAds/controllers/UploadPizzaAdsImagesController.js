const UploadPizzaAdsImagesRepository = require('../repositories/UploadPizzaAdsImagesRepository');

class UploadPizzaAdsImagesController {
  async store(request, response) {
    const { user_id } = request.user;
    const { pizzaAdId } = request.params;
    const images = request.files;

    if (!images) {
      return response.status(400).json({ error: 'Files missing' });
    }

    const fileNames = images.map((file) => file.filename);

    const uploadPizzaAdsImagesRepository = await UploadPizzaAdsImagesRepository.execute({
      user_id,
      pizzaAdId,
      images_name: fileNames,
    });

    console.log(uploadPizzaAdsImagesRepository);

    return response.status(204).send();
  }
}

module.exports = UploadPizzaAdsImagesController;
