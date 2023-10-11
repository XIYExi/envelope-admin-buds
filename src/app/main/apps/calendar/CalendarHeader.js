import {
    IconButton,
    Tooltip,
    Typography,
} from "@mui/material";
import EnvelopeSvgIcon from "../../../../@envelope/core/EnvelopeSvgIcon";
import {selectMainTheme} from "../../../store/envelope/settingsSlice";
import {motion} from 'framer-motion';
import {useSelector, useDispatch} from "react-redux";
import {openNewEventDialog} from "./store/eventsSlice";
import CalendarViewMenu from "./CalendarViewMenu";



function CalendarHeader(props) {

    const {calendarRef, currentDate, onToggleLeftSidebar} = props;

    const mainTheme = useSelector(selectMainTheme);
    const calendarApi = () => calendarRef.current?.getApi();
    const dispatch = useDispatch();


    return(
        <div className='flex flex-col md:flex-row w-full p-12 justify-between z-10 container'>
            <div className='flex flex-col sm:flex-col items-center'>
                <div className='flex items-center'>
                    <IconButton
                        onClick={(ev) => onToggleLeftSidebar()}
                        aria-label="open left sidebar"
                        size='small'
                    >
                        <EnvelopeSvgIcon>heroicons-outline:menu</EnvelopeSvgIcon>
                    </IconButton>

                    <Typography className="text-2xl font-semibold tracking-tight whitespace-nowrap mx-16">
                        {currentDate?.view.title}
                    </Typography>
                </div>

                <div className='flex items-center'>

                    <Tooltip title='Previous'>
                        <IconButton aria-label='Previous' onClick={() => calendarApi().prev()}>
                            <EnvelopeSvgIcon size={20}>
                                {mainTheme.direction === 'ltr'
                                    ? 'heroicons-solid:chevron-left'
                                    : 'heroicons-solid:chevron-right'}
                            </EnvelopeSvgIcon>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='Next'>
                        <IconButton aria-label='Next' onClick={() => calendarApi().next()}>
                            <EnvelopeSvgIcon size={20}>
                                {mainTheme.direction === 'ltr'
                                    ? 'heroicons-solid:chevron-right'
                                    : 'heroicons-solid:chevron-left'}
                            </EnvelopeSvgIcon>
                        </IconButton>
                    </Tooltip>

                    <Tooltip title={"Today"}>
                        <div>
                            <motion.div
                                initial={{scale: 0}}
                                animate={{
                                    scale: 1,
                                    transition: {delay: .3}
                                }}
                            >
                                <IconButton
                                    aria-label='today'
                                    onClick={() => calendarApi().today()}
                                    size='large'
                                >
                                    <EnvelopeSvgIcon>heroicons-outline:calendar</EnvelopeSvgIcon>
                                </IconButton>
                            </motion.div>
                        </div>
                    </Tooltip>
                </div>
            </div>

            <motion.div
                className="flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.3 } }}
            >
                <IconButton
                    className="mx-8"
                    aria-label="add"
                    onClick={(ev) =>
                        dispatch(
                            openNewEventDialog({
                                jsEvent: ev,
                                start: new Date(),
                                end: new Date(),
                            })
                        )
                    }
                >
                    <EnvelopeSvgIcon>heroicons-outline:plus-circle</EnvelopeSvgIcon>
                </IconButton>


                <CalendarViewMenu currentDate={currentDate} clandarApi={calendarApi} />
            </motion.div>
        </div>
    )
}

export default CalendarHeader;
