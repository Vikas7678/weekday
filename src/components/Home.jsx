import Card from "./card/Card";
import Search from "./search/Search";

const Home = () => {
  console.log(window.innerHeight);
  return (
    <>
      <div className="homeContainer">
        <Search />
        <Card />
      </div>
    </>
  );
};

export default Home;
