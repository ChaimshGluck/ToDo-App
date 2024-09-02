import express from 'express';
const router = express.Router();
export default router;
import { createTask, createTaskOrm, getUsersTasks, getUsersTasksOrm, markTaskDone, markTaskDoneOrm, deleteTask, deleteTaskOrm } from '../controllers/tasks.js';
import passport from 'passport';
import { getUserId } from '../controllers/users.js';
import multer from 'multer';

const upload = multer({
    dest: "uploads/"
})

router.use(passport.authenticate('cookie', { session: false }))

// router.post("", upload.single('taskImage'), async (req, res) => {
//     const image = req.file ? req.file.path : null;
//     res.json(await createTask(req.body.title, req.body.userid, image))
// });

router.post("", upload.single('taskImage'), async (req, res) => {
    const image = req.file ? req.file.path : null;
    res.json(await createTask(req.body.title, req.body.userid, image))
});

router.get("", passport.authenticate('cookie', { session: false }), async (req, res) => {
    res.json(await getUsersTasks(req.user))
});

// router.get("", async (req, res) => {
//     res.json(await getUsersTasksOrm(req.query.userId))
// });

// router.patch("/:id", async (req, res) => {
//     res.json(await markTaskDone(req.params.id))
// });

router.patch("/:id", async (req, res) => {
    res.json(await markTaskDoneOrm(req.params.id))
});

// router.delete("/:id", async (req, res) => {
//     // const user = await getUserId(req.query.username, req.query.pass)
//     // res.json(await deleteTask(req.params.id, user.id))
//     res.json(await deleteTask(req.params.id, req.query.userid))
// });

router.delete("/:id", async (req, res) => {
    res.json(await deleteTaskOrm(req.params.id, req.query.userid))
});