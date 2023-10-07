import Button from '@mui/material/Button';
import classNames from "classnames";
import EnvelopeSvgIcon from "../../../@envelope/core/EnvelopeSvgIcon";

function PurchaseButton({ className }) {
    return (
        <Button
            component="a"
            href="https://1.envato.market/zDGL6"
            target="_blank"
            rel="noreferrer noopener"
            role="button"
            className={classNames('', className)}
            variant="contained"
            color="secondary"
            startIcon={<EnvelopeSvgIcon size={16}>heroicons-outline:shopping-cart</EnvelopeSvgIcon>}
        >
            Purchase Envelope React
        </Button>
    );
}

export default PurchaseButton;
