import React from 'react';
import axios from 'axios';
import moment from 'moment';
import "./subject.css";
import Footer from "../../components/footer/Footer";
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useFetch from "../../hooks/useFetch";
import Navbar from '../../components/navbar/Navbar';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { format } from 'date-fns';
import Header from '../../components/header/Header';

const Subject = () => {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const userId = user ? user.id : null;

  const { id } = useParams();
  const navigate = useNavigate();

  const date = format(new Date(localStorage.getItem("searchDate")), 'yyyy-MM-dd');
  const { data, loading, error, reFetch } = useFetch(`/subject/${id}?date=${date}`);
  const [selectedAppointment, setSelectedAppointment] = useState('');
  
  const handleButtonClick = (appointment) => {
    setSelectedAppointment(appointment);
  };

  const formatedDate = moment(localStorage.getItem("searchDate")).format("YYYY-MM-DD");

  const handleBookClick = async () => {
    if (!user){
      navigate("/login");
    }

    const body = {
      date: formatedDate,
      subjectId: id,
      appointment: selectedAppointment,
      userId: userId
    };

    console.log(body);

    try {
      const response = await axios.post('http://localhost:8800/api/book/', body);
      console.log('Booking successful:', response.data);
      alert('Booking successful!');
      window.location.reload(); // Osvežava stranicu
    } catch (error) {
      console.error('Error booking appointment:', error);
    }
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const subject = data && data.subject ? data.subject : null;
  const freeAppointments = data && data.freeAppointments ? data.freeAppointments : [];

  return (
    <div>
      <Navbar />
      <Header />
      <div className="subjectContainer">
        <div className="subjectWrapper">
          {subject ? (
            <>
              <h1 className="subjectTitle">{subject.title}</h1>
              <div className="subjectDetails">
                <div className="subjectDetailsTexts">
                  <h2 className="subjectTitle">{subject.name}</h2>
                  <div className="subjectAddress">
                    <FontAwesomeIcon icon={faLocationDot} />
                    <span>{subject.address}</span>
                  </div>
                  <p className="subjectDesc">{subject.desc}</p>
                </div>
                <div className="subjectImgWrapper">
                  <img src={subject.photos[0]} alt="" className="subjectImg" />
                </div>
              </div>
              <div className="subjectDetails">
                <div className="subjectDetailsTexts">
                  {freeAppointments.length > 0 && <p>Slobodni termini</p>}
                  <div className="buttonRow">
                    {freeAppointments.length > 0 ? (
                      freeAppointments.map((appointment, index) => (
                        <div key={index}>
                          <button className="navButton1"
                            onClick={() => handleButtonClick(appointment)}
                            style={{ backgroundColor: selectedAppointment === appointment ? 'purple' : 'initial' }}
                          >
                            {appointment}
                          </button>
                        </div>
                      ))
                    ) : (
                      <p>Nema slobodnih termina.</p>
                    )}
                    <input type="hidden" value={selectedAppointment} name="appointment" />
                  </div>
                </div>
                <div className="subjectDetailsPrice">
                  <span>Rezervisite svoj termin danas po cjeni:</span>
                  <h2>
                    <b>${subject.price}</b>
                  </h2>
                  <button onClick={handleBookClick}>Rezerviši</button>
                </div>
              </div>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Subject;
