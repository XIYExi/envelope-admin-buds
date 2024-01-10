import {useDispatch, useSelector} from "react-redux";
import {getRewardsById, selectRewards} from "../store/rewardSlice";
import {useEffect} from "react";
import {motion} from "framer-motion";
import {List} from "@mui/material";
import AchieveRewardItem from "./AchieveRewardItem";
import RewardForm from "./RewardForm";


function AchieveRewardApp(props) {

    const dispatch = useDispatch();
    const rewards = useSelector(selectRewards);

    useEffect(() => {
        dispatch(getRewardsById("1"));
    }, []);


    return(
        <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 0.4 } }}
            className="flex flex-col w-full"
        >
            <List className='p-0 w-full'>
                {
                    rewards.map((item, index) => (
                        <AchieveRewardItem key={index} reward={item}/>
                    ))
                }
            </List>

            <RewardForm />
        </motion.div>
    );
}

export default AchieveRewardApp;
