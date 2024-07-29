import express from 'express';
import db from "../db.js";
import bcrypt from 'bcryptjs';
import { createUser, userLogin } from '../controllers/users.js';
import passport from 'passport'
import LocalStrategy from 'passport-local'
import jwt from 'jsonwebtoken'
import CookieStrategy from 'passport-cookie'
import multer from 'multer';

const upload = multer({
    dest: "./uploads"
})

async function verify(username, password, done) {
    let users = await db.manyOrNone('select firstname, username, pass, id from todos1.person where username = $1', [username]);
    if (!users || users.length === 0) {
        return done(null, false, { message: 'Incorrect username or password.' });
    }
    for (let user of users) {
        let userExists = await bcrypt.compare(password, user.pass);
        if (userExists) return done(null, user);
    }
    return done(null, false, { message: 'Incorrect username or password.' })
};
const localStrategy = new LocalStrategy(verify);
passport.use(localStrategy);

function verifyCookie(token, done) {
    const result = jwt.verify(token, 'Super-strong-secret')
    return done(null, result.user)
};
const cookieStrategy = new CookieStrategy(verifyCookie);
passport.use(cookieStrategy);

const router = express.Router();
export default router;

router.post("", async (req, res) => {
    let result = await createUser(req.body);
    res.json(result)
});

router.get("/login", passport.authenticate('local', { session: false }), async (req, res) => {
    const token = jwt.sign({ user: req.user.id }, 'Super-strong-secret')
    res.cookie('token', token).json({ ok: true, id: req.user.id })
});

// router.get("/login", async (req, res) => {
//     res.json(await userLogin(req.query))
// });

router.post("/upload-profile", upload.single("profile"), (req, res) => {
    res.send({
        success: true,
        originalName: req.file.originalname,
        url: `http://localhost:3000/images/${req.file.filename}`
    })
})