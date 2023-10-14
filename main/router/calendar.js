const {mockApi} = require("../data");
const EnvelopeUtils = require("../utils");
const _ = require("lodash");
const router = require('koa-router')();



/**
 * apps calendar
 */
const eventsDB = mockApi.components.examples.calendar_events.value;
const labelsDB = mockApi.components.examples.calendar_labels.value;


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

module.exports = router;