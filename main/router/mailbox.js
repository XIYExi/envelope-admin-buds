const {mockApi} = require("../data");
const _ = require("lodash");
const router = require('koa-router')();


/**
 * mailbox
 */
const mailsDB = mockApi.components.examples.mailbox_mails.value;
const mailsDb_labelsDB = mockApi.components.examples.mailbox_labels.value;
const filtersDB = mockApi.components.examples.mailbox_filters.value;
const foldersDB = mockApi.components.examples.mailbox_folders.value;


router.get('/mailbox/mails/filters/:filterSlug/:mailId', async ctx => {
    const {filterSlug, mailId} = ctx.params;

    const response = _.find(mailsDB, {id: mailId});
    if (!response)
        ctx.response.body = 'Requested mail do not exist.';
    else ctx.response.body = response;
})

router.get('/mailbox/mails/filters/:filterSlug', async ctx => {
    const {filterSlug} = ctx.params;

    const response = _.filter(mailsDB, {[filterSlug]: true});

    ctx.response.body = response;
})

router.get('/mailbox/mails/labels/:labelSlug/:mailId', async ctx => {
    const {filterSlug, mailId} = ctx.params;

    const response = _.find(mailsDB, {id: mailId})
    if(!response)
        ctx.response.body = 'Requested mail do not exist.';
    else ctx.response.body = response;
})

router.get('/mailbox/mails/labels/:labelSlug', async ctx => {
    const {labelSlug} = ctx.params;
    // 通过 标签值slug 查出标签id
    const labelId = _.find(mailsDb_labelsDB, {slug: labelSlug}).id;
    // 通过 去mails数据库中查询含有 此类标签id 的所有数据并返回
    const response = _.filter(mailsDB, item => item.labels.includes(labelId));
    ctx.response.body = response;
})


router.get('/mailbox/mails/:folderSlug/:mailId', async ctx => {
    const { folderSlug, mailId } = ctx.params;
    const response = _.find(mailsDB, { id: mailId });
    if (!response) {
        ctx.response.body = 'Requested mail do not exist.';
    }
    else ctx.response.body = response;
})

router.get('/mailbox/mails/:folderSlug', async ctx => {
    // console.log('是否请求接口')
    const {folderSlug} = ctx.params;
    const folderId = _.find(foldersDB, { slug: folderSlug }).id;

    const response = _.filter(mailsDB, { folder: folderId });
    ctx.response.body = response;
})

router.get('/mailbox/mails', async ctx => {
    ctx.response.body = mailsDB;
})

router.get('/mailbox/folders', async ctx => {
    ctx.response.body = foldersDB;
})

router.get('/mailbox/filters', async ctx => {
    ctx.response.body = filtersDB;
})

router.get('/mailbox/labels', async ctx => {
    ctx.response.body = mailsDb_labelsDB;
})

router.post('/mailbox/actions', async ctx => {
    const {type, value, ids} = ctx.request.body;

    if (type === 'labels') {
        _.assign(
            mailsDB,
            mailsDB.map((_mail) =>
                ids.includes(_mail.id)
                    ? {
                        ..._mail,
                        labels: value,
                    }
                    : _mail
            )
        );
        ctx.response.body = true;
    }
    else if (type === 'label') {
        _.assign(
            mailsDB,
            mailsDB.map((_mail) =>
                ids.includes(_mail.id)
                    ? {
                        ..._mail,
                        labels: _mail.labels.includes(value) ? _mail.labels : [..._mail.labels, value],
                    }
                    : _mail
            )
        );
        ctx.response.body = true;
    }
    else if (type === 'folder') {
        _.assign(
            mailsDB,
            mailsDB.map((_mail) =>
                ids.includes(_mail.id)
                    ? {
                        ..._mail,
                        folder: value,
                    }
                    : _mail
            )
        );
        ctx.response.body = true;
    }
    else if (type === 'starred') {
        _.assign(
            mailsDB,
            mailsDB.map((_mail) =>
                ids.includes(_mail.id)
                    ? {
                        ..._mail,
                        starred: value,
                    }
                    : _mail
            )
        );
        ctx.response.body = true;
    }
    else if (type === 'important') {
        _.assign(
            mailsDB,
            mailsDB.map((_mail) =>
                ids.includes(_mail.id)
                    ? {
                        ..._mail,
                        important: value,
                    }
                    : _mail
            )
        );
        ctx.response.body = true;
    }
    else if (type === 'unread') {
        _.assign(
            mailsDB,
            mailsDB.map((_mail) =>
                ids.includes(_mail.id)
                    ? {
                        ..._mail,
                        unread: value,
                    }
                    : _mail
            )
        );
        ctx.response.body = true;
    }
    else
        ctx.response.body = false;

})


module.exports = router;