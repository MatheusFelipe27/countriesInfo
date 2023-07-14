import styles from "./Home.module.scss";
import { AiOutlineSearch } from "react-icons/ai";
import { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom"

import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    axios({
      method: "get",
      url: `https://restcountries.com/v3.1/all`,
    })
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


  const changeData = (e) => {
    if (e.target.value === "all") {
      axios({
        method: "get",
        url: `https://restcountries.com/v3.1/all`,
      })
        .then((res) => {
          console.log(res);
          setData(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      axios({
        method: "get",
        url: `https://restcountries.com/v3.1/region/${e.target.value}`,
      })
        .then((res) => {
          console.log(res);
          setData(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const goToInfo = (val) =>{
    navigate(`info/${val}`)
  }

  return (
    <>
      <main>
        <section className={styles.search_section}>
          <a className={styles.search_icon}>
            <AiOutlineSearch />
          </a>
          <input
            className={styles.search}
            type="text"
            placeholder="Search for a country..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className={styles.search_select}
            onChange={(e) => {
              changeData(e);
            }}
          >
            <option key={"all"} value="all">
              Filter by Region
            </option>
            <option key={"africa"} value="africa">
              Africa
            </option>
            <option key={"ame"} value="ame">
              America
            </option>
            <option key={"asia"} value="asia">
              Asia
            </option>
            <option key={"europe"} value="europe">
              Europa
            </option>
            <option key={"oceania"} value="oceania">
              Oceania
            </option>
          </select>
        </section>

        <section className={styles.countries_section}>
          {data
            .filter((val) => {
              if (search === "") return val;
              else {
                if (
                  val.name.common.toLowerCase().includes(search.toLowerCase())
                ) {
                  return val;
                }
              }
            })
            .map((val) => (
              <a key={val.cca2} onClick={()=>goToInfo(val.cca2)}>
                <div>
                  <img className={styles.flag_img} src={val.flags.svg} />
                </div>
                <div>
                  <h2>{val.name.common}</h2>
                  <p>
                    Population: <span>{val.population}</span>
                  </p>
                  <p>
                    Region: <span>{val.region}</span>
                  </p>
                  <p>
                    Capital:
                    <span>{val.capital ? val.capital : "Do not Have"}</span>
                  </p>
                </div>
              </a>
            ))}
        </section>
      </main>
    </>
  );
};

export default Home;
