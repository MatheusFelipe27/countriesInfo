import React, { useEffect, useState } from "react";
import styles from "./Info.module.scss";
import { useNavigate } from "react-router-dom";
import {HiArrowSmLeft} from "react-icons/hi"
import axios from "axios";

const Info =()=>{
    const url = window.location.href.slice(27)
    const [data, setData] = useState()
    const navigate = useNavigate()

    useEffect(()=>{
        axios({
            method: 'GET',
            url: `https://restcountries.com/v3.1/alpha/${url}`
        }).then((res)=>{
            setData(res.data)
        }).then((err)=>{
            console.error(err)
        })
    },[])

    console.log(data)

    const back=()=>{
        navigate("/")
    }

    return (
        <>
            <button className={styles.back_button} onClick={back}> 
                <HiArrowSmLeft size={'16px'}/> 
                <span>Back</span>
            </button>
            <div className={styles.info}>
                <div className={styles.flag}>
                    {data!== undefined?
                        <img  src={data.flag.svg }/>
                        :
                        <span>Waiting</span>
                    }
                </div>
                <div className={styles.txt}></div>
            </div>
        </>
    )
}


export default Info