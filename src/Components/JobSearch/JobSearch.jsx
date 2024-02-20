import React, { useState } from "react";
import Search from "../SearchDiv/Search";
import Jobs from "../JobDiv/Jobs";


const ParentComponent = () => {
    const [searchParams, setSearchParams] = useState({
        clock: "",
        house: "",
        location: "",
        type: null,
        contract: null,
    });

    const handleSearch = (newSearchParams) => {
        setSearchParams(newSearchParams);
    };

    return (
        <div>
            <Search onSearch={handleSearch} />
            <Jobs searchParams={searchParams} />
        </div>
    );
};

export default ParentComponent;
