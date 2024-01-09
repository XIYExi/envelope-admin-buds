const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function(app) {
    app.use(createProxyMiddleware('/api',
        {
            target: "http://localhost:4000",
            changeOrigin:true,
            pathRewrite: {
                "^/api": "/"
            },
            "secure":true 	//如果访问的是https类的链接，就需要设置为true
        }));

    app.use(createProxyMiddleware('/back',
        {
            target: "http://localhost:9081",
            changeOrigin:true,
            pathRewrite: {
                "^/back": "/buds"
            },
            "secure":true 	//如果访问的是https类的链接，就需要设置为true
        }))
}
