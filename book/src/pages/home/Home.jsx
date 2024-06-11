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

         <h1>Welcome to LearnNow</h1>
            Discover a world of knowledge and opportunities with LearnNow! 
            Our platform offers a wide range of courses designed to help you achieve your educational 
            and professional goals. Whether you're looking to enhance your skills, explore a new hobby, 
            or advance your career,
            we have the right course for you.
            <h1>Get Started TodayBest courses</h1>
            Join the thousands of learners who have transformed their lives with LearnNow. Sign up today and take the first step towards a brighter future.

          </div>
          <div className="aboutUsImage"><img src="/3974104.jpg"></img></div>
        </div>
        <h1 className="homeTitle">Best courses</h1>
        <CourseList/>
      </div>
      <Footer/>
    </div>
  );
};

export default Home;