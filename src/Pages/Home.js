import styles from "./Home.module.css";
 
import { IoIosMoon, IoIosSunny} from "react-icons/io";
import {AiOutlineSearch} from "react-icons/ai";
import { useEffect, useState } from "react";
 
import axios from "axios";
 
const Home = () => {
  const [mode, setMode] = useState(false);
  const [data, setData] = useState([]);
  const [region, setRegion] = useState("");
 
  useEffect(()=>{
    axios({
      method: 'get',
      url: `https://restcountries.com/v3.1/all`
    })
    .then((res)=>{
      console.log(res);
      setData(res.data);
    })
    .catch((error) =>{
      console.error(error);
    })
 
  }, [])
 
  useEffect(()=>{
    axios({
      method: 'get',
      url : `https://restcountries.com/v3.1/region/${region}`
    })
    .then((res) =>{
      console.log(res);
      setRegion(res.data);
    })
    .catch((error) =>{
      console.error(error);
    })
  }, [])

  console.log(region)
  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.content}>
          <h1 className={styles.title}> Where in the World?</h1>
          <div className={styles.mode}>
            {mode ? (
              <a className={styles.icon} onClick={() => setMode(!mode)}>
                <IoIosSunny />
              </a>
            ) : (
              <a className={styles.icon} onClick={() => setMode(!mode)}>
                <IoIosMoon />
              </a>
            )}
            <button
              onClick={() => setMode(!mode)}
              className={styles.mode_button}
            >
              {mode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        </div>
      </nav>
      <main>
        <section className={styles.search_section}>
          <a className={styles.search_icon}> <AiOutlineSearch/></a>
          <input className={styles.search} type='text' placeholder="Search for a country..." /> 
          <select className={styles.search_select} onChange={(e)=> setRegion(e.target.value)}>
            <option value="all" >Filter by Region</option>
            <option value="africa" >Africa</option>
            <option value="america">America</option>
            <option value="asia">Asia</option>
            <option value="europa">Europa</option>
            <option value="oceania">Oceania</option>
          </select>
        </section>

        <section className={styles.countries_section}>
            {
                data.map((val)=> (
                    <a key={val.id}>
                        <div> 
                            <img className={styles.flag_img} src={val.flags.svg}/>
                        </div>
                        <div>
                            <h2>{val.name.common}</h2>
                            <p>Population: <span>{val.population}</span></p> 
                            <p>Region: <span>{val.region}</span></p> 
                            <p>Capital:  <span>{ val.capital? val.capital: 'Do not Have' }</span></p>

                        </div>
                    </a>
                ))
            }

        </section>
      </main>
      
    </>
  );
};
 
export default Home;