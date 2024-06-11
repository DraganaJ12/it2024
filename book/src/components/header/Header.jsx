import {
  faCalendarDays,
  faSearch,

} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import { DateRange, DateRangePicker } from 'react-date-range';
import { useContext, useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";

const Header = ({ type }) => {
  const { state, dispatch } = useContext(SearchContext);
  const navigate = useNavigate();
  const [openDate, setOpenDate] = useState(false);

  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { name: state.name, date: state.date, options: state.options } });
    navigate("/subjects", { state: { name: state.name, date: state.date, options: state.options } });
  };
  

  return (
    <div className="header">
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
      
        {type !== "list" && (
          <>
            <p className="headerDesc">
            </p>
            <div className="headerSearch">
      <div className="headerSearchItem">
        <FontAwesomeIcon icon={faSearch} className="headerIcon" />
        <input
          type="text"
          placeholder="Type subject"
          className="headerSearchInput"
          value={state.name}
          onChange={(e) => dispatch({ type: "NEW_SEARCH", payload: { ...state, name: e.target.value } })}
        />
      </div>
      <div className="headerSearchItem">
        <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
        <span
          onClick={() => setOpenDate(!openDate)}
          className="headerSearchText"
        >
          {format(state.date, "MM/dd/yyyy")}
        </span>
        {openDate && (
          <DateRange
            editableDateInputs={true}
            onChange={(item) => dispatch({ type: "NEW_SEARCH", payload: { ...state, date: item.selection.startDate } })}
            moveRangeOnFirstSelection={false}
            ranges={[{ startDate: state.date, endDate: state.date, key: "selection" }]}
            className="date"
            minDate={new Date()}
            rangeColors={["#3d91ff"]}
          />
        )}
      </div>
      <div className="headerSearchItem">
        <button className="headerBtn" onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;