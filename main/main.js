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

const {mockApi} = require('./data');
let usersApi = mockApi.components.examples.auth_users.value;



router.post('/auth/sign-in',async (ctx) => {
    // console.log(ctx.request.body);
    /**
     * { data: { email: 'admin@fusetheme.com', password: 'admin' } }
     */
    const {email, password} = ctx.request.body.data;


    const user = _.cloneDeep(usersApi.find((_user) => _user.data.email === email));

    const error = [];

    console.log(user)

    if (!user) {
        console.log('Check your email address');
        error.push({
            type: 'email',
            message: 'Check your email address',
        });
    }

    if (user && user.password !== password) {
        console.log('Check your password');
        error.push({
            type: 'password',
            message: 'Check your password',
        });
    }

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