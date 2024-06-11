import { Link } from "react-router-dom";
import "./searchItem.css";

const SearchItem = ({ item }) => {
  return (
    <div className="searchItem">
      <img src={item.photos[0]} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{item.title}</h1>
        <span className="siSubtitle">
        {item.name}        
        </span>
        <span className="siFeatures">
        {item.desc.length > 300 ? `${item.desc.substring(0, 200)}...` : item.desc}
        </span>
      </div>
      <div className="siDetails">
        {item.rating && <div className="siRating">
          <span>Excellent</span>
          <button>{item.rating}</button>
        </div>}
        <div className="siDetailTexts">
          <span className="siPrice">${item.price}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <Link to={`/subjects/${item.id}`}>
          <button className="siCheckButton">See availability</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;