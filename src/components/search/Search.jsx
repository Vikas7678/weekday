import Select from "react-select";
import "./search.css";

const Search = () => {
  const experienceOptions = [
    {value:'1', label:'1'},
    {value:'2', label:'2'},
    {value:'3', label:'3'},
    {value:'4', label:'4'},
    {value:'5', label:'5'},
    {value:'6', label:'6'},
    {value:'7', label:'7'},
    {value:'8', label:'8'},
    {value:'9', label:'9'},
    {value:'10', label:'10'},

  ]

  const remote = [
    {value:'Remote', label:'Remote'},
    {value:'Hybird', label:'Hybrid'},
    {value:'In-Office', label:'In-Office'},

  ]

  const techStack =[
    {value:'Python', label:'Python'},
    {value:'JavaScript', label:'JavaScript'},
    {value:'Java', label:'Java'},
    {value:'GoLang', label:'GoLang'},
    {value:'C++', label:'C++'},
    {value:'Ruby/Rails', label:'Ruby/Rails'},
    {value:'Kotmin', label:'Django'},
    {value:'C#', label:'C#'},
    {value:'GraphQL', label:'GraphQL'},
    {value:'TypeScript', label:'TypeScript'},

  ]

  const basePay = [
    {value:'0L', label:'0L'},
    {value:'10L', label:'10L'},
    {value:'20L', label:'20L'},
    {value:'30L', label:'30L'},
    {value:'40L', label:'40L'},
    {value:'50L', label:'50L'},
    {value:'60L', label:'60L'},
    {value:'70L', label:'70L'},
  ]

  const location = [
    { value: 'Bangalore', label: 'Bangalore' },
    { value: 'Karnataka', label: 'Karnataka' },
    { value: 'Mumbai', label: 'Mumbai' },
    { value: 'Delhi', label: 'Delhi' },
    { value: 'Hyderabad', label: 'Hyderabad' },
    { value: 'Gurugram', label: 'Gurugram' },
    { value: 'Noida', label: 'Noida' },
    { value: 'Greater Noida', label: 'Greater Noida' },
    { value: 'Pune', label: 'Pune' },
    { value: 'Chennai', label: 'Chennai' },
    { value: 'Kolkata', label: 'Kolkata' }
  ];

  const techRoles = [
    { value: 'MEAN Stack Developer', label: 'MEAN Stack Developer' },
    { value: 'MERN Stack Developer', label: 'MERN Stack Developer' },
    { value: 'Python Developer', label: 'Python Developer' },
    { value: 'Flutter Developer', label: 'Flutter Developer' },
    { value: 'Full Stack Developer', label: 'Full Stack Developer' },
    { value: 'JavaScript Developer', label: 'JavaScript Developer' },
    { value: 'Data Scientist', label: 'Data Scientist' },
    { value: 'Machine Learning Engineer', label: 'Machine Learning Engineer' },
    { value: 'Java Developer', label: 'Java Developer' },
    { value: 'Front-end Developer', label: 'Front-end Developer' }
  ];

  return (
    <>
      <div className="searchContainer">
        <Select options={experienceOptions} placeholder="Experience"/>
        <Select options={remote} isMulti name="colors" placeholder="Remote"/>
        <Select options={techStack} isMulti name="colors" placeholder="Tech Stack"/>
        <Select options={basePay} placeholder="Minimum Base Pay Salary" />
        <Select options={location} placeholder="Location"/>
        <Select options={techRoles} isMulti name="colors" placeholder="Tech Role"/>
        <input type="text" className="company" placeholder="Company Name"/>
      </div>
    </>
  );
};

export default Search;
