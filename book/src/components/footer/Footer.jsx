import "./footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="fLists">
        <ul className="fList">
          <li className="fListItem">LearnNow Business</li>
          <li className="fListItem">Teach on LearnNow</li>
          <li className="fListItem">Get the app</li>
          <li className="fListItem">About us</li>
          <li className="fListItem">Contact us</li>
        </ul>
        <ul className="fList">
          <li className="fListItem">Careers </li>
          <li className="fListItem">Blog </li>
          <li className="fListItem">Help and Support </li>
          <li className="fListItem">Affiliate</li>
          <li className="fListItem">Investors</li>
        </ul>
        <ul className="fList">
          <li className="fListItem">Terms</li>
          <li className="fListItem">Privacy policy</li>
          <li className="fListItem">Cookie settings</li>
          <li className="fListItem">Sitemap </li>
          <li className="fListItem">Accessibility statement</li>
        </ul>  
      </div>
      <div className="fText">Copyright © 2024 LearnNow</div>
    </div>
  );
};

export default Footer;