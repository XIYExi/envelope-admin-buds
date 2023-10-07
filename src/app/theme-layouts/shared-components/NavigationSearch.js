import { useSelector } from 'react-redux';
import EnvelopeSearch from "../../../@envelope/core/EnvelopeSearch";
import { selectFlatNavigation } from "../../store/envelope/navigationSlice";

function NavigationSearch(props) {
    const { variant, className } = props;
    const navigation = useSelector(selectFlatNavigation);

    return <EnvelopeSearch className={className} variant={variant} navigation={navigation} />;
}

export default NavigationSearch;
