const express = require('express');

const userRouter = require('../../app/modules/Users/routes/user.routes');
const adminRouter = require('../../app/modules/Users/routes/admin.routes');
const sessionRouter = require('../../app/modules/Users/routes/sessions.routes');
const modelsRouter = require('../../app/models.routes');

const router = express();

router.use(sessionRouter);
router.use(adminRouter);
router.use(userRouter);
router.use(modelsRouter);

module.exports = router;
