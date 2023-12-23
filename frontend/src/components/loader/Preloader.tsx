import s from './Preloader.module.css';

const Preloader = () => {
  return <div className={s.loaderWrapper}>
    <div className={s.customLoader}></div>
  </div>
};

export default Preloader;
