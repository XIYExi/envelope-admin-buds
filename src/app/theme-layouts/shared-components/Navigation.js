import EnvelopeNavigation
import classNames from "classnames";
import {memo, useMemo} from "react";
import {useSelector, useDispatch} from "react-redux";
import {selectNavigation} from "../../store/envelope/navigationSlice";
import {useThemeMediaQuery} from "../../../@envelope/hook";
import {navbarCloseMobile} from "../../store/envelope/navbarSlice";


function Navigation(props) {
    const navigation = useSelector(selectNavigation)
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))
    const dispatch = useDispatch();

    return useMemo(() => {
        function handleItemClick(item) {
            if(isMobile)
                dispatch(navbarCloseMobile())
        }

        return(
            <EnvelopeNavigation>

            </EnvelopeNavigation>
        )

    }, [])
}