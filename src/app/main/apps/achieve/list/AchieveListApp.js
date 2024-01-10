import {List} from "@mui/material";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAchievesById, selectAchieves} from "../store/achievesSlice";
import AchieveListItem from "./AchieveListItem";
import AchieveForm from "./AchieveForm";
import {motion} from "framer-motion";


function AchieveListApp(props) {

    const dispatch = useDispatch();
    const achieves = useSelector(selectAchieves);

    useEffect(() => {
        dispatch(getAchievesById('1'));
    }, []);

    return (
        <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 0.4 } }}
            className="flex flex-col w-full">
            <List className='p-0 w-full'>
                {
                    achieves.map((item, index) => (
                        <AchieveListItem key={index} achieve={item}/>
                    ))
                }
            </List>

            <AchieveForm/>
        </motion.div>
    );
}

export default AchieveListApp;
