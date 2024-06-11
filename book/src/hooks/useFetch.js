import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url, date = null) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async() => {
            setLoading(true);
            try {
                const res = await axios.get("http://localhost:8800/api" + url, {
                    params: {
                        date: date // Ključ 'date' u objektu 'params' postaje 'date' query parametar u URL-u
                    }
                });
                setData(res.data);
            } catch (err) {
                setError(err);
            }
            setLoading(false);
        };
        fetchData();
    }, [url]);

    const reFetch = async() => {
        setLoading(true);
        try {
            const res = await axios.get(url);
            setData(res.data);
        } catch (err) {
            setError(err);
        }
        setLoading(false);
    };

    return { data, loading, error, reFetch };
};

export default useFetch;