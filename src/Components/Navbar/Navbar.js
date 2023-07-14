import React from "react";
import { IoIosMoon, IoIosSunny } from "react-icons/io";
import { useState } from "react";
import styles from"../../Components/Navbar/Navbar.module.scss";
;

const Navbar =() =>{
    const [mode, setMode] = useState(false);
    return(
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
    )
}

export default Navbar;