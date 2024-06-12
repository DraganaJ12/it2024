import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import CourseList from "../../components/courseList/CourseList";
import "./home.css";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header/>
      <div className="homeContainer">
        <div className="aboutUs">
          <div className="aboutUsContent">

         <h1>Dobrodošli u LearnNow</h1>
         Otkrivanje svijeta znanja i mogućnosti sa LearnNow!
         Naša platforma nudi širok spektar kurseva dizajniranih da vam pomognu da usavršite vaše obrazovne i profesionalne ciljeve. Bilo da želite da unaprijedite svoje veštine, istražite novi hobi ili napredujete u karijeri, imamo pravi kurs za vas.
            <h1>Počni danas!</h1>
            Pridružite se hiljadama učenika koji su transformisali svoje živote sa LearnNow. Prijavite se danas i napravite prvi korak ka svetlijoj budućnosti.
          </div>
          <div className="aboutUsImage"><img src="/3974104.jpg"></img></div>
        </div>
        <h1 className="homeTitle">Najbolji kursevi</h1>
        <CourseList/>
      </div>
      <Footer/>
    </div>
  );
};

export default Home;