import Copy from './Copy';
import classes from './Footer.module.css';
import Summary from './Summary';

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <Summary />
      <Copy />
    </footer>
  );
};

export default Footer;
