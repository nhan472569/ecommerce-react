import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { forwardRef, useEffect, useState } from 'react';
import classes from './ImageEdit.module.css';

const ImageEdit = forwardRef(({ image, alt, id, path, onChange }, ref) => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');

  useEffect(() => {
    setImagePreviewUrl(path + image);
    return () => {
      setImagePreviewUrl('');
    };
  }, [path, image]);

  const readImage = e => {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      setImagePreviewUrl(reader.result);
    };

    reader.readAsDataURL(file);
  };

  return (
    <label className={classes.image} htmlFor={id}>
      <img src={imagePreviewUrl} alt={alt} />
      <input
        id={id}
        name={id}
        type="file"
        accept="image"
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
});

export default ImageEdit;
