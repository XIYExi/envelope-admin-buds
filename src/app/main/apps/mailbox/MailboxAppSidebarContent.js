import {useSelector} from "react-redux";
import {selectFolders} from "./store/foldersSlice";
import {selectLabels} from "./store/labelsSlice";
import {selectFilters} from "./store/filtersSlice";
import {useTranslation} from "react-i18next";
import {Typography} from "@mui/material";
import {motion} from 'framer-motion';
import MailCompose from "./MailCompose";
import EnvelopeNavigation from "../../../../@envelope/core/EnvelopeNavigation";


function MailboxAppSidebarContent(props) {
    const folders = useSelector(selectFolders);
    const labels = useSelector(selectLabels);
    const filters = useSelector(selectFilters);

    const { t } = useTranslation('mailboxApp');

    return (
        <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 0.4 } }}
            className="flex-auto border-l-1"
        >
            <div className="mb-24 mt-40 mx-24">
                <Typography
                    component={motion.span}
                    initial={{ x: -20 }}
                    animate={{ x: 0, transition: { delay: 0.2 } }}
                    delay={300}
                    className="text-4xl font-extrabold tracking-tight leading-none"
                >
                    Mailbox
                </Typography>

                <MailCompose className="mt-32" />
            </div>

            <div className="mb-24">
                <Typography className="px-28 py-10 uppercase text-12 font-600" color="secondary.main">
                    {t('FOLDERS')}
                </Typography>

                <EnvelopeNavigation
                    navigation={folders.map((item) => ({
                        ...item,
                        type: 'item',
                        url: `/apps/mailbox/${item.slug}`,
                    }))}
                />
            </div>

            <div className="mb-24">
                <Typography className="px-28 py-10 uppercase text-12 font-600" color="secondary.main">
                    {t('FILTERS')}
                </Typography>

                <EnvelopeNavigation
                    navigation={filters.map((item) => ({
                        ...item,
                        type: 'item',
                        url: `/apps/mailbox/filter/${item.slug}`,
                    }))}
                />
            </div>

            <div className="mb-24">
                <Typography className="px-28 py-10 uppercase text-12 font-600" color="secondary.main">
                    {t('LABELS')}
                </Typography>

                <EnvelopeNavigation
                    navigation={labels.map((item) => ({
                        ...item,
                        type: 'item',
                        url: `/apps/mailbox/label/${item.slug}`,
                        icon: 'heroicons-outline:tag',
                        sx: {
                            '& > .fuse-list-item-icon': {
                                color: `${item.color}!important`,
                                opacity: 0.6,
                            },
                        },
                    }))}
                />
            </div>
        </motion.div>
    );
}

export default MailboxAppSidebarContent;
