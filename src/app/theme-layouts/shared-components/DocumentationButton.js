import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';
import EnvelopeSvgIcon from "../../../@envelope/core/EnvelopeSvgIcon";

function DocumentationButton({className}) {
    return (
        <Button
            component={Link}
            to='/documentation'
            role={"button"}
            className={className}
            variant={"contained"}
            color={"primary"}
            startIcon={<EnvelopeSvgIcon size={16}>heroicons-outline:book-open</EnvelopeSvgIcon>}
        >
            Documentation
        </Button>
    )
}

export default DocumentationButton;