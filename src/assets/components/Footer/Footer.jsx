import { Link } from "react-router-dom";
import "./Footer.scss";
const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="Menu__glav">
            <div className="Footer__logo">
              <h3>MakalaBox</h3>
            </div>
            <div className="Menu__flex">
              <Link to="/moderator-page" className="Menu__profile">
                Мой профиль
              </Link>

              <a href=""></a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
