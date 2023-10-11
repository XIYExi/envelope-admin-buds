import {Typography, Button} from "@mui/material";
import EnvelopeSvgIcon from "../../../../@envelope/core/EnvelopeSvgIcon";
import {useTranslation} from "react-i18next";


function AnalyticsDashboardAppHeader(props) {

    const {t} = useTranslation('analyticsDashboardApp');

    return (
        <div className='flex w-full container'>
            <div className='flex flex-col sm:flex-row flex-auto sm:items-center min-w-0 p-24 md:p-32 pb-0 md:pb-0'>
                <div className='flex flex-col flex-auto'>
                    <Typography className="text-3xl font-semibold tracking-tight leading-8">
                        {t('TITLE')}
                    </Typography>
                    <Typography className="font-medium tracking-tight" color="text.secondary">
                        {t('DESC')}
                    </Typography>
                </div>
            </div>
            <div className="flex items-center mt-24 sm:mt-0 sm:mx-8 space-x-12">
                <Button
                    className="whitespace-nowrap"
                    startIcon={<EnvelopeSvgIcon size={20}>heroicons-solid:cog</EnvelopeSvgIcon>}
                >
                    {t('SETTINGS')}
                </Button>
                <Button
                    className="whitespace-nowrap"
                    variant="contained"
                    color="secondary"
                    startIcon={<EnvelopeSvgIcon size={20}>heroicons-solid:save</EnvelopeSvgIcon>}
                >
                    {t('EXPORT')}
                </Button>
            </div>
        </div>
    )

}

export default AnalyticsDashboardAppHeader;