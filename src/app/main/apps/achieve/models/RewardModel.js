import _ from '../../../../../@lodash';

const RewardModel = (data) =>
    _.defaults(data || {}, {
        rewardName: '',
        score: 100,
        reward: ''
    })


export default RewardModel;
