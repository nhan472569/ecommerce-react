const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const AppError = require('./appError');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
const deleteImage = async filename => {
  cloudinary.uploader.destroy(process.env.CLOUD_FOLDER + '/' + filename, {
    resource_type: 'image',
  });
};

exports.deleteImage = deleteImage;

exports.upload = (buffer, filename) => {
  return new Promise((resolve, reject) => {
    let cld_upload_stream = cloudinary.uploader.upload_stream(
      {
        folder: 'bookstore',
        format: 'jpeg',
        public_id: filename,
      },
      function (error) {
        if (error) return new AppError('upload failed', 500);
        resolve();
      }
    );

    streamifier.createReadStream(buffer).pipe(cld_upload_stream);
  });
};
