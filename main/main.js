const Koa = require('koa');
const app = new Koa()

const Router = require('koa-router');
const router = new Router();

const bodyParser = require('koa-bodyparser');
app.use(bodyParser());

const Base64 = require('crypto-js/enc-base64');
const HmacSHA256 = require('crypto-js/hmac-sha256');
const Utf8 = require('crypto-js/enc-utf8');
const jwtDecode = require('jwt-decode');
const _ = require('lodash');
const EnvelopeUtils = require('./utils');

const {mockApi} = require('./data');
let usersApi = mockApi.components.examples.auth_users.value;



// 登录
router.post('/auth/sign-in',async (ctx) => {
    // console.log(ctx.request.body);
    /**
     * { data: { email: 'admin@fusetheme.com', password: 'admin' } }
     */
    const {email, password} = ctx.request.body.data;

    // 相当于在数据库里面根据传过来的email查了一个user
    const user = _.cloneDeep(usersApi.find((_user) => _user.data.email === email));

    const error = [];

    // console.log(user)

    // email不存在所以查不到user，直接返回报错
    if (!user) {
        console.log('Check your email address');
        error.push({
            type: 'email',
            message: 'Check your email address',
        });
    }

    // 密码不正确
    if (user && user.password !== password) {
        console.log('Check your password');
        error.push({
            type: 'password',
            message: 'Check your password',
        });
    }

    // 正确则返回
    if (error.length === 0) {
        delete user.password;

        const access_token = generateJWTToken({ id: user.uuid });

        const response = {
            user,
            access_token,
        };

        ctx.response.body =  [200, response];
    }
    else{
        ctx.response.body =  [200, { error }];
    }
})

/**
 * dashboard analytics
 */
router.get('/dashboards/analytics/widgets', async ctx => {
    const widgets = mockApi.components.examples.analytics_dashboard_widgets.value;
    console.log(widgets)
    ctx.response.body = widgets;
})


/**
 * apps calendar
 */
const eventsDB = mockApi.components.examples.calendar_events.value;
const labelsDB = mockApi.components.examples.calendar_labels.value;
const tagsDB = mockApi.components.examples.contacts_tags.value;

router.get('/calendar/labels', async ctx => {
    ctx.response.body = labelsDB;
})

router.post('/calendar/labels', async ctx => {

    const data = ctx.request.body;
    // console.log(data)

    const newLabel = {
        id: EnvelopeUtils.generateGUID(),
        ...data
    };
    labelsDB.push(newLabel);

    ctx.response.body = newLabel;
})

router.put('/calendar/labels/:id', async ctx => {
    const {id} = ctx.params; // 获得路径参数
    const data = ctx.request.body;
    // console.log(id, data)

    _.assign(_.find(labelsDB, { id: id }), data);

    ctx.response.body = _.find(labelsDB, { id: id });

})

router.get('/calendar/labels/:id', async ctx=>{
    const {id} = ctx.params; // 获得路径参数
    const response = _.find(labelsDB, { label: id });

    ctx.response.body = response ? response : 'Requested label do not exist.';
})

router.delete('/calendar/labels/:id', async ctx => {
    const {id} = ctx.params;
    _.remove(labelsDB, { id });
    _.remove(eventsDB, { extendedProps: { label: id } });
    ctx.response.body = id;
})

router.get('/calendar/events', async ctx => {
    ctx.response.body = eventsDB;
})

router.post('/calendar/events', async ctx => {
    const data = ctx.request.body;
    const newEvent = { id: EnvelopeUtils.generateGUID(), ...data };
    eventsDB.push(newEvent);
    ctx.response.body = newEvent;
})

router.put('/calendar/events/:id',async ctx => {
    const {id} = ctx.params;
    const data = ctx.response.body;
    _.assign(_.find(eventsDB, { id }), data);
    ctx.response.body = _.find(eventsDB, { id });
})

router.put('/calendar/events/:id', async ctx => {
    const {id} = ctx.params;
    const data = ctx.request.body;
    _.assign(_.find(eventsDB, { id }), data);

    ctx.response.body = _.find(eventsDB, { id });
})

router.get('/calendar/events/:id', async ctx => {
    const {id} = ctx.params;
    const response = _.find(eventsDB, { event: id });
    ctx.response.body = response ? response : 'Requested event do not exist.';
})

router.delete('/calendar/events/:id', async ctx => {
    const {id} = ctx.params;
    _.remove(eventsDB, { id });
    ctx.response.body = id;
})


/**
 * usermanage
 */
let userDB  = mockApi.components.examples.contacts.value;

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


/**
 * ================================
 *     插件注册和koa启动
 * ================================
 */

app.use(router.routes());

const port = 4000;
app.listen(port, () => {
    console.log(`koa test server listen on port: ${port}`);
})


/**
 * TOOL
 * @type {string}
 */

const jwtSecret = 'some-secret-code-goes-here';

function base64url(source) {
    // Encode in classical base64
    let encodedSource = Base64.stringify(source);

    // Remove padding equal characters
    encodedSource = encodedSource.replace(/=+$/, '');

    // Replace characters according to base64url specifications
    encodedSource = encodedSource.replace(/\+/g, '-');
    encodedSource = encodedSource.replace(/\//g, '_');

    // Return the base64 encoded string
    return encodedSource;
}

function generateJWTToken(tokenPayload) {
    // Define token header
    const header = {
        alg: 'HS256',
        typ: 'JWT',
    };

    // Calculate the issued at and expiration dates
    const date = new Date();
    const iat = Math.floor(date.getTime() / 1000);
    const exp = Math.floor(date.setDate(date.getDate() + 7) / 1000);

    // Define token payload
    const payload = {
        iat,
        iss: 'Fuse',
        exp,
        ...tokenPayload,
    };

    // Stringify and encode the header
    const stringifiedHeader = Utf8.parse(JSON.stringify(header));
    const encodedHeader = base64url(stringifiedHeader);

    // Stringify and encode the payload
    const stringifiedPayload = Utf8.parse(JSON.stringify(payload));
    const encodedPayload = base64url(stringifiedPayload);

    // Sign the encoded header and mock-api
    let signature = `${encodedHeader}.${encodedPayload}`;
    signature = HmacSHA256(signature, jwtSecret);
    signature = base64url(signature);

    // Build and return the token
    return `${encodedHeader}.${encodedPayload}.${signature}`;
}

function verifyJWTToken(token) {
    // Split the token into parts
    const parts = token.split('.');
    const header = parts[0];
    const payload = parts[1];
    const signature = parts[2];

    // Re-sign and encode the header and payload using the secret
    const signatureCheck = base64url(HmacSHA256(`${header}.${payload}`, jwtSecret));

    // Verify that the resulting signature is valid
    return signature === signatureCheck;
}