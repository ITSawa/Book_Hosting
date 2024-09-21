import React, { useEffect, useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

function SearchPanel() {
    const { searchTerm } = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!searchTerm) {
            navigate('/');
        }
    }, [searchTerm, navigate]);

    const [serchResults, setSearchResults] = useState([]);

    useEffect(() => {
        console.log(searchTerm);
    }, [searchTerm]);

    return (
        searchTerm && <div className="searched-data center">
            {
                serchResults.length ? serchResults : <h2>No results found</h2>
            }
        </div>
    )
}

export default React.memo(SearchPanel);