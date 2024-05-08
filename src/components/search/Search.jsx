import Select from "react-select";
import "./search.css";
import { useEffect, useMemo, useState } from "react";
import Card from "../card/Card";

const Search = () => {
  const [data, setApiData] = useState([]);
  const [experiences, setExperiences] = useState("");
  const [remotes, setRemotes] = useState([]);
  const [basePays, setBasePays] = useState("");
  const [roles, setRoles] = useState([]);
  const [company, setCompany] = useState("");
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [preLength, setPrevLength] = useState(0);
  const [limit, setLimit] = useState(10);

    /**
     * Handles the infinite scroll behavior by incrementing the offset state when the user scrolls to the bottom of the page.
     *
     * @return {void} This function does not return anything.
     */
  const infiniteScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop+10 >= document.documentElement.scrollHeight) {

            setOffset(prev => prev+1)
        }
    }


  /**
   * Filters the data based on the user's search criteria.
   *
   * @return {array} The filtered data.
  */
  const filteredData = useMemo(() => {
    return data.filter(item => {
      return (
        (!experiences || item.minExp == experiences) && // Pass if experiences is empty or matches
        (!remotes.length || remotes.includes(item.location)) && // Pass if remotes array is empty or location matches
        (!basePays || (item.minJdSalary >= Number(basePays) && item.minJdSalary < Number(basePays)+10)) && // Pass if basePays is empty or matches
        (!roles.length || roles.some(role => item.jobRole && item.jobRole.includes(role))) && // Pass if roles array is empty or any role matches
        (!company || item.companyName.toLowerCase().startsWith(company)) // Pass if company is empty or matches
      );
    });
  }, [data, experiences, remotes, basePays, roles, company]);

      /**
     * Fetches data from the specified API endpoint and updates the state with the fetched data.
     *
     * @return {Promise<void>} - A promise that resolves when the data is fetched and the state is updated.
     */
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://api.weekday.technology/adhoc/getSampleJdJSON",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            limit: limit,
            offset: offset,
          }),
        }
      );

      const data = await response.json();

      // Filter out entries where any property is null
      const filteredData = data.jdList.filter(
        (item) => !Object.values(item).includes(null)
      );

      setApiData((prevData) => [...prevData, ...filteredData]);
    } catch (e) {
      console.log("Error on Fetching data", e);
    }
  };


 // Adding scroll event and remove on unmount
useEffect(() => {
    window.addEventListener("scroll", infiniteScroll);
    return () => window.removeEventListener('scroll', infiniteScroll);

  }, []);

//   fetching the data if offset changes
  useEffect(() => {
    fetchData();
  }, [offset]);


//   reducing loading time by increasing page size if filtered data length is same as previous length
//  if filtered data length is less than 300 then set loading to false and set limit to 10 (default)
  useEffect(() => {
    if(preLength > 300){
        setLoading(false)
        setLimit(10)
      
    }
    else if((preLength === filteredData.length && preLength !== 0) || filteredData.length ===0){

        setLimit(prev => prev+10)
        setOffset(prev => prev+1)

    }
    else{
        setPrevLength(filteredData.length)
        setLoading(false)
    }

},[filteredData]);

  const experienceOptions = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
    { value: "6", label: "6" },
    { value: "7", label: "7" },
    { value: "8", label: "8" },
    { value: "9", label: "9" },
    { value: "10", label: "10" },
  ];

  const remote = [
    { value: "Remote", label: "remote" },
    { value: "Hybird", label: "hybrid" },
    { value: "In-Office", label: "In-Office" },
    { value: "Bangalore", label: "bangalore" },
    { value: "Karnataka", label: "karnataka" },
    { value: "Mumbai", label: "mumbai" },
    { value: "Delhi", label: "delhi" },
    { value: "Hyderabad", label: "hyderabad" },
    { value: "Gurugram", label: "gurugram" },
    { value: "Noida", label: "noida" },
    { value: "Greater Noida", label: "greater noida" },
    { value: "Pune", label: "pune" },
    { value: "Chennai", label: "chennai" },
    { value: "Kolkata", label: "kolkata" },
  ];

  const basePay = [
    { value: "0", label: "0L" },
    { value: "10", label: "10L" },
    { value: "20", label: "20L" },
    { value: "30", label: "30L" },
    { value: "40", label: "40L" },
    { value: "50", label: "50L" },
    { value: "60", label: "60L" },
    { value: "70", label: "70L" },
  ];

  const techRoles = [
    { value: "android", label: "Android" },
    { value: "frontend", label: "Frontend" },
    { value: "ios", label: "IOS" },
    { value: "tech lead", label: "Tech Lead" },
    { value: "javascript", label: "JavaScript" },
    { value: "backend", label: "Backend" },
    { value: "java", label: "Java" },
  ];

  return (
    <>
      <div className="searchContainer">

        {/* Experience select */}
        <Select
          options={experienceOptions}
          placeholder="Experience"
          onChange={(e) => setExperiences(e.label)}
        />

        {/* remote hybrid inoffice select */}
        <Select
          options={remote}
          isMulti
          name="colors"
          placeholder="Remote"
          onChange={(e) => setRemotes(e.map((e) => e.label))}
        />

        {/* min base pay select */}
        <Select
          options={basePay}
          placeholder="Minimum Base Pay Salary"
          onChange={(e) => setBasePays(e.value)}
        />

        {/* tech role select */}
        <Select
          options={techRoles}
          isMulti
          name="colors"
          placeholder="Tech Role"
          onChange={(e) => setRoles(e.map((e) => e.value))}
        />

        {/* company name search box */}
        <input
          type="text"
          className="company"
          placeholder="Company Name"
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>
      {loading ? (
        <div className="loading-overlay">
        <p className="loader">Loading...</p>
      </div>
      ):null}

      {/* card container */}
      <Card data={filteredData } />
    </>
  );
};

export default Search;
