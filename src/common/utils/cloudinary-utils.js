import { CloudinaryImage } from '@cloudinary/url-gen';
import { fill } from '@cloudinary/url-gen/actions/resize';
import environment from '../../environment';

export default function createUrl(filename, width = 100, height = 100) {
  return new CloudinaryImage(environment.CLOUD_FOLDER + '/' + filename, {
    cloudName: environment.CLOUD_NAME,
  }).resize(fill().height(height).width(width));
}
