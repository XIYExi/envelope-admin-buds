import {useDispatch, useSelector} from "react-redux";
import {getMails, selectMails, selectSearchText} from "../store/mailsSlice";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useDeepCompareEffect} from "../../../../../@envelope/hook";
import EnvelopeUtils from "../../../../../@envelope/utils";
import EnvelopeSvgIcon from "../../../../../@envelope/core/EnvelopeSvgIcon";
import {List, Typography} from "@mui/material";
import withRouter from "../../../../../@envelope/core/withRouter";
import MailListItem from "./MailListItem";
import {motion} from "framer-motion";

function MailList(props) {
    const dispatch = useDispatch();
    const mails = useSelector(selectMails);
    const searchText = useSelector(selectSearchText);

    const routeParams = useParams();
    const [filteredData, setFilteredData] = useState(null);
    const { t } = useTranslation('mailboxApp');

    useDeepCompareEffect(() => {
        dispatch(getMails(routeParams));
    }, [dispatch, routeParams]);

    useEffect(() => {
        function getFilteredArray() {
            if (searchText.length === 0) {
                return mails;
            }
            return EnvelopeUtils.filterArrayByString(mails, searchText);
        }

        if (mails) {
            setFilteredData(getFilteredArray());
        }
    }, [mails, searchText]);

    if (!filteredData) {
        return null;
    }

    if (filteredData.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.1 } }}
                className="flex flex-col flex-1 items-center justify-center p-24"
            >
                <EnvelopeSvgIcon className="icon-size-128 mb-16" color="disabled" size={24}>
                    heroicons-outline:mail-open
                </EnvelopeSvgIcon>
                <Typography className="mt-16 text-2xl font-semibold tracking-tight" color="text.secondary">
                    {t('NO_MESSAGES')}
                </Typography>
            </motion.div>
        );
    }

    return (
        <List className="p-0 w-full">
            {filteredData.map((mail) => (
                <MailListItem mail={mail} key={mail.id} />
            ))}
        </List>
    );
}

export default withRouter(MailList);
