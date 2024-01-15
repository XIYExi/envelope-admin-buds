import _ from '../../../../../@lodash';
import {v4 as uuid} from 'uuid';

const ContactModel = (data) =>
    _.defaults(data || {}, {
        sysId: uuid(),
        username: '',
        password: '123123',
        trueName: '',
        major: '',
        studentId: 0,
        idCard: '',
        nickName: 'Default',
        description: '...',
        phone: '',
        email: '',
        address: '',
        birthday: '',
        sex: ''
    });

export default ContactModel;
