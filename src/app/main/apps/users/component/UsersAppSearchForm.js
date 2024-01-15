import {Box, Paper} from "@mui/material";
import CustomizedSearchInput from "./CustomizedSearchInput";


function UsersAppSearchForm(props) {



    return (
        <Box className='my-24 mx-24'>
            <div className='flex'>

                <CustomizedSearchInput />

            </div>
        </Box>
    )
}


export default UsersAppSearchForm;
