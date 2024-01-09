import _ from '../../../../../@lodash';

const AchieveModel = (data) =>
    _.defaults(data || {}, {
        achieveName: '',
        address: '',
        conditions: '',
        deathTime: 0,
        description: '',
        image: '',
        score: 10,
    })

export default AchieveModel;
