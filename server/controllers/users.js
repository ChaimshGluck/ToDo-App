import db from "../db.js";
import bcrypt from 'bcryptjs';

export async function createUser(body, image) {
    let passhash = await bcrypt.hash(body.pass, 10);
    const result = await db.one('insert into todos1.person (username, email, pass, firstname, lastname, profile_img) values (${username}, ${email}, ${pass}, ${firstName}, ${lastName}, ${profile_img}) returning *', {
        firstName: body.firstName,
        lastName: body.lastName,
        username: body.username,
        email: body.email,
        pass: passhash,
        profile_img: image
    })
    return {
        username: result.name,
        email: result.email,
        pass: result.pass,
        id: result.id,
        profileImg: result.profile_img
    }
};

export async function userLogin(query) {
    let users = await db.manyOrNone('select firstname, username, pass, id, profile_img from todos1.person where username = $1', [query.username]);
    if (!users) return { ok: false };
    for (let user of users) {
        let userExists = await bcrypt.compare(query.pass, user.pass);
        if (userExists) return { ok: true, id: user.id, status: user.status, profileImg: user.profile_img };
    }
    return { ok: false };
};

// export async function userLogin(query) {
//     try {
//     let users = await db.manyOrNone('select username, pass, id from todos1.person where username = $1', [query.username]);
//     if (!users[0]) throw new Error('No such user exists');
//     for (let user of users) {
//         let userExists = await bcrypt.compare(query.pass, user.pass);
//         if (userExists) return { ok: true, id: user.id, pass : user.pass };
//     }
//     throw new Error('invalid password');
// } catch(e) {
//     console.error(e.message);
//     return { ok: false };
// }} ;

export async function getUserId(username, pass) {
    let users = await db.manyOrNone('select username, pass, id from todos1.person where username = $1', [username]);
    if (!users[0]) throw new Error('Invalid password');
    for (let user of users) {
        let userExists = await bcrypt.compare(pass, user.pass);
        if (userExists) return { id: user.id };
    }
    throw new Error('Invalid password');
};