import {Icon, Typography} from "@mui/material";
import {motion} from "framer-motion";
import EnvelopeSvgIcon from "../../../../@envelope/core/EnvelopeSvgIcon";


function FormAppHeader(){

    return(
        <div className="flex flex-col justify-center h-full p-24">
            <div className="flex items-center flex-1">
                <Icon
                    component={motion.span}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, transition: { delay: 0.2 } }}
                    className="text-24 md:text-32"
                >
                    <EnvelopeSvgIcon>heroicons-outline:menu</EnvelopeSvgIcon>
                </Icon>
                <Typography
                    component={motion.span}
                    initial={{ x: -20 }}
                    animate={{ x: 0, transition: { delay: 0.2 } }}
                    delay={300}
                    className="text-16 md:text-24 mx-12 font-semibold"
                >
                    Form
                </Typography>
            </div>
        </div>
    )
}


export default FormAppHeader;