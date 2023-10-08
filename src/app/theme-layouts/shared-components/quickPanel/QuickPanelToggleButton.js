import IconButton from '@mui/material/IconButton';
import { useDispatch } from 'react-redux';
import EnvelopeSvgIcon from "../../../../@envelope/core/EnvelopeSvgIcon";
import { toggleQuickPanel } from './store/stateSlice';

function QuickPanelToggleButton(props) {
    const dispatch = useDispatch();

    return (
        <IconButton className="w-40 h-40" onClick={(ev) => dispatch(toggleQuickPanel())} size="large">
            {props.children}
        </IconButton>
    );
}

QuickPanelToggleButton.defaultProps = {
    children: <EnvelopeSvgIcon>heroicons-outline:bookmark</EnvelopeSvgIcon>,
};

export default QuickPanelToggleButton;
