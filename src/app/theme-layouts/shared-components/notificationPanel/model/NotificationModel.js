import _ from '@lodash';
import EnvelopeUtils from "../../../../../@envelope/utils";

function NotificationModel(data) {
    data = data || {};

    return _.defaults(data, {
        id: EnvelopeUtils.generateGUID(),
        icon: 'heroicons-solid:star',
        title: '',
        description: '',
        time: new Date().toISOString(),
        read: false,
        variant: 'default',
    });
}

export default NotificationModel;
