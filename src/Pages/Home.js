import styles from "./Home.module.css";

import { IoIosMoon, IoIosSunny } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";
import { useEffect, useState } from "react";

import axios from "axios";

const Home = () => {
  const [mode, setMode] = useState(false);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

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
              <a key={val.id}>
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
