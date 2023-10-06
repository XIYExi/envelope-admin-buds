import EnvelopeNavigation from "../../../@envelope/core/EnvelopeNavigation";
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
            <EnvelopeNavigation
                className={classNames('navigation', props.className)}
                navigation={navigation}
                layout={props.layout}
                dense={props.dense}
                active={props.active}
                onItemClick={handleItemClick}
            />
        )

    }, [dispatch, isMobile, navigation, props.active, props.className, props.dense, props.layout]);
}

Navigation.defaultProps = {
    layout: 'vertical'
}

export default memo(Navigation);
