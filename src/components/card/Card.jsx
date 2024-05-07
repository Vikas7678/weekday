import { useEffect, useState } from "react";
import "./card.css";

const Card = () => {

    // Hook for storing data received from server after applying filter to neglect null values
  const [apidata, setApiData] = useState("");

//   function to fetch data from server
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://api.weekday.technology/adhoc/getSampleJdJSON",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            limit: 15,
            offset: 0,
          }),
        }
      );

      const data = await response.json();

      // Filter out entries where any property is null
      const filteredData = data.jdList.filter(
        (item) => !Object.values(item).includes(null)
      );

      setApiData(filteredData);
    } catch (e) {
      console.log("Error on Fetching data", e);
    }
  };

//   calling above function using useEffect hook to run side effects.
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>

    {/* whole card container */}
      <div className="cardContainer">
        {Object.keys(apidata).map((key) => (
          <div className="card" key={apidata[key].jdUid}>

            {/* company logo company name job role and location */}
            <div className="companyLogo">
              <img src={apidata[key].logoUrl} alt="Logo" />
              <div className="jobRole">
                <p className="companyName">{apidata[key].companyName}</p>
                <p className="role">{apidata[key].jobRole}</p>
                <p className="location">{apidata[key].location}</p>
              </div>
            </div>

            {/* Job Description */}
            <div className="description">
              <h4>Job Description:</h4>
              <p>{apidata[key].jobDetailsFromCompany.substring(0, 800)}...</p>
            </div>

            {/* Show more button */}
            <div className="showMoreButton">
              <button className="showMore">Show More</button>
            </div>
            <div className="experience">
              <h4>Minimum Experience</h4>
              <p>{apidata[key].minExp} Years</p>

              {/* Apply button */}
              <button className="apply">
                <p className="applyfontweight">Easy Apply</p>
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Card;
