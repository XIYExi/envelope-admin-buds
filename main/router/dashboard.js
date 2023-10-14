const {mockApi} = require("../data");
const router = require('koa-router')();



/**
 * dashboard analytics
 */
router.get('/dashboards/analytics/widgets', async ctx => {
    const widgets = mockApi.components.examples.analytics_dashboard_widgets.value;
    console.log(widgets)
    ctx.response.body = widgets;
})

module.exports = router;