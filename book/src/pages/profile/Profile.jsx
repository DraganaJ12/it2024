import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import "./profile.css";
import { format } from 'date-fns';


const Profile = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    console.log(storedUser)
    const userId = storedUser?.id;

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:8800/api/book?userId=${userId}`
                );
                setData(response.data);
            } catch (err) {
                setError(err);
            }
            setLoading(false);
        };

        fetchData();
    }, [userId]);

    console.log(data)

    return (
        <div>
            <Navbar />
            <Header />
            <div className="profileContainer">
                {loading ? (
                    "loading"
                ) : error ? (
                    <p>Error: {error.message}</p>
                ) : (
                    <>
                        {data.map((item) => (
                            <div className="searchItem" key={item.id}>
                                <div className="siDesc">
                                    <h1 className="siTitle">{item.Subject.title}</h1>
                                    <span className="siFeatures">{item.Subject.name}</span>
                                    <span className="siFeatures">{format(new Date(item.date), 'dd.MM.yyyy')}-{item.appointment}</span>
                                </div>
                                <div className="siDetails">
                                    <div className="siDetailTexts">
                                        <span className="siPrice">${item.Subject.price}</span>
                                        <span className="siTaxOp">Includes taxes and fees</span>
                                        <Link to={`/subjects/${item.Subject.id}`}>
                                            <button className="siCheckButton">See availability</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Profile;
