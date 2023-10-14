const {mockApi} = require("../data");
const _ = require("lodash");
const EnvelopeUtils = require("../utils");
const router = require('koa-router')();


/**
 * usermanage
 */
let userDB  = mockApi.components.examples.contacts.value;
const tagsDB = mockApi.components.examples.contacts_tags.value;

router.get('/usermanage/users', async ctx => {
    const data = userDB.map((item) => {
        return {
            ...item,
            emails: item.emails[0].email,
            phoneNumbers: item.phoneNumbers[0].phoneNumber,
            createTime: new Date().getTime(),
        }
    })

    // console.log(data)

    ctx.response.body = data;
})

router.get('/usermanage/user/:id', async ctx => {

    // console.log('koa get search order')

    const {id} = ctx.params;
    const data = userDB.map((item) => {
        return {
            ...item,
            emails: item?.emails[0]?.email,
            phoneNumbers: item?.phoneNumbers[0]?.phoneNumber,
            createTime: new Date().getTime(),
        }
    })

    const user = _.find(data, { id });

    if (user)
        ctx.response.body = user;
    else
        ctx.response.body = 'Requested task do not exist.';
})

router.post('/usermanage/user', async ctx => {
    const user = ctx.request.body;
    const newUser = { id: EnvelopeUtils.generateGUID(), ...user };

    userDB.push(newUser);
    ctx.response.body = newUser;
})

router.put('/usermanage/user/:id', async ctx => {
    const {id} = ctx.params;
    const user = ctx.request.body;

    // 修改数据库
    _.assign(_.find(userDB, { id }), user);
    // 返回更新后的数据
    let json = _.find(userDB, { id });
    json = {
        ...json,
        emails: json.emails[0].email,
        phoneNumbers: json.phoneNumbers[0].phoneNumber,
        createTime: new Date().getTime(),
    }
    ctx.response.body = json;

})

router.delete('/usermanage/user/:id', async ctx => {
    const {id} = ctx.params;
    const data = userDB.map((item) => {
        return {
            ...item,
            emails: item.emails[0].email,
            phoneNumbers: item.phoneNumbers[0].phoneNumber,
            createTime: new Date().getTime(),
        }
    })
    _.remove(data, { id });
    ctx.response.body = id;
})

router.get('/usermanage/tags', async ctx => {
    // console.log(tagsDB)
    ctx.response.body = tagsDB;
})


module.exports = router;