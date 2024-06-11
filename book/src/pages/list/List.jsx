import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

import { useLocation } from "react-router-dom";
import { useState,useContext,useEffect } from "react";
import SearchItem from "../../components/searchItem/SearchItem";
import { SearchContext } from "../../context/SearchContext";
import useFetch from "../../hooks/useFetch";

const List = () => {
  const location = useLocation();
  const { state } = useContext(SearchContext);
  const searchState = location.state || state; 

  const name = searchState.name || state.name;

  useEffect(() => {
    console.log("Search State:", searchState);
  }, [searchState]);
  
  const { data, loading, error, reFetch } = useFetch(`/subject?name=${name}`);
  
  useEffect(() => {
    reFetch();
  }, [name]); 

  useEffect(() => {
    if (!location.state) {
      console.log("Nema stanja iz navigacije, koristi se kontekst");
    }
  }, [location.state, state]);

  return (
    <div>
      <Navbar />
      <Header/>
      
      <div className="listContainer">
        <div className="listWrapper">
        
          <div className="listResult">
            {loading ? (
              "loading"
            ) : (
              <>
                {data.map((item) => (
                  <SearchItem item={item} key={item.id} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default List;