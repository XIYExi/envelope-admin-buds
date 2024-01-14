import React,{useEffect, useState} from "react";
import axios from "axios";
import AchieveRankItem from "./AchieveRankItem";
import {motion} from 'framer-motion';
import {List} from "@mui/material";


function AchieveRankApp(props) {

    const [ranks, setRanks] = useState([]);

    const fetchRanksData = async () => {
        // TODO get collegeId from userSlice
        const collegeId= '1';
        const response = await axios.get(`/back/achieve/rankList?collegeId=${collegeId}`);
        const res = await response.data.data.response; // {data: Array}
        console.log('ranks', res);
        setRanks(res.rank);
    }

    useEffect(() => {
       fetchRanksData();
    }, [])


    return (
        <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 0.4 } }}
            className="flex flex-col w-full"
        >
            <List className='p-0 w-full'>
                {
                    ranks.map((item, index) => (
                        <React.Fragment key={index}>
                            <AchieveRankItem rank={item}/>
                        </React.Fragment>

                    ))
                }
            </List>

        </motion.div>
    )
}

export default AchieveRankApp;
