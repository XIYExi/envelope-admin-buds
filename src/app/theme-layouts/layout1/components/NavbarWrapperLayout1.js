import { ThemeProvider } from '@mui/material/styles';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import {selectEnvelopeCurrentLayoutConfig, selectNavbarTheme} from "../../../store/envelope/settingsSlice";
import {selectEnvelopeNavbar} from "../../../store/envelope/navbarSlice";
import NavbarStyle1 from './navbar/style-1/NavbarStyle1';
import NavbarStyle2 from './navbar/style-2/NavbarStyle2';
import NavbarStyle3 from './navbar/style-3/NavbarStyle3';
import NavbarToggleFab from '../../shared-components/NavbarToggleFab';

function NavbarWrapperLayout1(props) {
    const config = useSelector(selectEnvelopeCurrentLayoutConfig);
    const navbar = useSelector(selectEnvelopeNavbar);

    const navbarTheme = useSelector(selectNavbarTheme);

    return (
        <>
            <ThemeProvider theme={navbarTheme}>
                <>
                    {config.navbar.style === 'style-1' && <NavbarStyle1 />}
                    {config.navbar.style === 'style-2' && <NavbarStyle2 />}
                    {config.navbar.style === 'style-3' && <NavbarStyle3 />}
                    {config.navbar.style === 'style-3-dense' && <NavbarStyle3 dense />}
                </>
            </ThemeProvider>

            {config.navbar.display && !config.toolbar.display && !navbar.open && <NavbarToggleFab />}
        </>
    );
}

export default memo(NavbarWrapperLayout1);
