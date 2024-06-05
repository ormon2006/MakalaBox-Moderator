import "./Loading.scss";

const LoadingAnimation = () => {
  return (
    <section className="Loading__section">
      <div id="loading-animation" className="heading large-text">
        <div className="text-wrapper">
          <p>M</p>
          <p>a</p>
          <p>k</p>
          <p>a</p>
          <p>l</p>
          <p>a</p>
          <p>B</p>
          <p>o</p>
          <p>x</p>
        </div>
        <div className="loader-line"></div>
      </div>
    </section>
  );
};

export default LoadingAnimation;
