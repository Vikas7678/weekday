import { useEffect, useState } from "react";
import "./card.css";

const Card = (props) => {
  return (
    <>
      <div className="cardContainer">
        {Object.keys(props.data).map((key) => (
          <div className="card" key={key}>
            <div className="companyLogo">
              <img src={props.data[key].logoUrl} alt="Logo" />
              <div className="jobRole">
                <p className="companyName">{props.data[key].companyName}</p>
                <p className="role">{props.data[key].jobRole}</p>
                <p className="location">{props.data[key].location}</p>
              </div>
            </div>
            <div className="description">
              <h4>Job Description:</h4>
              <p>{props.data[key].jobDetailsFromCompany.substring(0, 800)}...</p>
            </div>
            <div className="showMoreButton">
              <button className="showMore">Show More</button>
            </div>
            <div className="experience">
              <h4>Minimum Experience</h4>
              <p>{props.data[key].minExp} Years</p>
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
