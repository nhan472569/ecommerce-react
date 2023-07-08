import { AdvancedImage } from '@cloudinary/react';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { forwardRef, useState } from 'react';
import createUrl from '../../common/utils/cloudinary-utils';
import classes from './ImageEdit.module.css';

const ImageEdit = forwardRef(
  ({ alt, id, filename, onChange, size, style, width, height }, ref) => {
    const [imagePreviewUrl, setImagePreviewUrl] = useState('');
    const [selected, setSelected] = useState(false);

    // useEffect(() => {
    //   setImagePreviewUrl(filename);
    //   return () => {
    //     setImagePreviewUrl('');
    //   };
    // }, [filename]);

    const readImage = e => {
      e.preventDefault();

      const reader = new FileReader();
      const file = e.target.files[0];

      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
        setSelected(true);
      };

      reader.readAsDataURL(file);
    };

    return (
      <label
        className={classes.image + ' ' + classes[`image-${size}`]}
        htmlFor={id}
        style={style}
      >
        {selected ? (
          <img src={imagePreviewUrl} alt={alt} />
        ) : (
          <AdvancedImage
            cldImg={createUrl(filename, width, height)}
            alt={alt}
          />
        )}
        <input
          id={id}
          name={id}
          type="file"
          accept="image/*"
          onChange={e => {
            onChange(e);
            readImage(e);
          }}
          ref={ref}
          className={classes['image-input']}
        />
        <FontAwesomeIcon icon={solid('camera')} className={classes.icon} />
      </label>
    );
  }
);

export default ImageEdit;
