const Koa = require('koa');
const app = new Koa()
const Router = require('koa-router');
const router = new Router();
const bodyParser = require('koa-bodyparser');
const requireDirectory = require('require-directory');

/**
 * ================================
 *     插件注册和koa启动
 * ================================
 */
app.use(bodyParser());
app.use(router.routes());


function initRouter(app){
    const apiDirectory =`${process.cwd()}\\router`;
    console.log(apiDirectory)
    const modules =requireDirectory(module, apiDirectory, {
        visit:whenLoadModule
    })
    function whenLoadModule(obj) {
        if (obj instanceof Router) {
            // 路由黑名单
            const blackList = [];
            const prefix = obj.opts.prefix;
            if (!blackList.includes(prefix)) {
                app.use(obj.routes());
            }
        }
    }
}

initRouter(app);


const port = 4000;
app.listen(port, () => {
    console.log(`koa test server listen on port: ${port}`);
})

