import {useDispatch, useSelector} from "react-redux";
import EnvelopeShortcuts from "../../../@envelope/core/EnvelopeShortcuts";
import {selectFlatNavigation} from "../../store/envelope/navigationSlice";
import {selectUserShortcuts, updateUserShortcuts} from "../../store/userSlice";

function NavigationShortcuts(props) {
    const { variant, className } = props;
    const dispatch = useDispatch();
    const shortcuts = useSelector(selectUserShortcuts) || [];
    const navigation = useSelector(selectFlatNavigation);

    function handleShortcutsChange(newShortcuts) {
        dispatch(updateUserShortcuts(newShortcuts));
    }

    return (
        <EnvelopeShortcuts
            className={className}
            variant={variant}
            navigation={navigation}
            shortcuts={shortcuts}
            onChange={handleShortcutsChange}
        />
    );
}

export default NavigationShortcuts;