import {List} from "@mui/material";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAchievesById, selectAchieves} from "../store/achievesSlice";
import AchieveListItem from "./AchieveListItem";
import AchieveForm from "./AchieveForm";

function AchieveListApp(props) {

    const dispatch = useDispatch();
    const achieves = useSelector(selectAchieves);

    useEffect(() => {
        dispatch(getAchievesById('1'));
    }, [])

    return (
        <div className="flex flex-col w-full">
            <List className='p-0 w-full'>
                {
                    achieves.map((item, index) => (
                        <AchieveListItem key={index} achieve={item}/>
                    ))
                }
            </List>

            <AchieveForm/>
        </div>
    )
}

export default AchieveListApp;
