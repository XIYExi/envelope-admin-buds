import {AppBar, Toolbar} from "@mui/material";
import {ThemeProvider} from "@mui/material/styles";
import {memo} from 'react';
import {useSelector} from "react-redux";
import classNames from "classnames";
import {selectFooterTheme} from "../../../store/envelope/settingsSlice";


function FooterLayout1(props) {
    const footerTheme = useSelector(selectFooterTheme);

    return(
        <ThemeProvider theme={footerTheme}>
            <AppBar
                id='envelope-footer'
                className={classNames('relative z-20 shadow-md', props.className)}
                color='default'
                sx={{
                    backgroundColor: (theme) => theme.palette.mode === 'light'
                        ? footerTheme.palette.background.paper
                        : footerTheme.palette.background.default,
                }}
            >
                <Toolbar className="min-h-48 md:min-h-64 px-8 sm:px-12 py-0 flex items-center overflow-x-auto">
                    Footer
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    )
}

export default memo(FooterLayout1);