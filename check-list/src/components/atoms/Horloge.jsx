import React, { useState } from "react";
import "./_horloge.scss";
export default function Horloge() {
    //Horloge avec seconde
    // const time = new Date().toLocaleTimeString();
    // const [currentTime, setCurrentTime] = useState(time);
    // const updateTime = () => {
    //     const time = new Date().toLocaleTimeString();
    //     setCurrentTime(time);
    // }
    // setInterval(updateTime, 1000);

    //Horloge sans seconde
    let time1 = new Date();
    let time2 = time1.toLocaleTimeString().replace(/(.*)\D\d+/, '$1');
    const [currentTime, setCurrentTime] = useState(time2);
    const updateTime = () => {
            const time2 = time1.toLocaleTimeString().replace(/(.*)\D\d+/, '$1');
            setCurrentTime(time2);
        }
        setInterval(updateTime, 1000);





    // Date
    const today = new Date();
    // const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    let fullDate = today.toLocaleDateString(undefined, options);


    return (
        <>  
            <div className="horlogeContainer">
                <p className="horlogeContainer_horloge">{currentTime}</p>
                <p className="horlogeContainer_date">{fullDate}</p>
            </div>
            
        </>
    )
}