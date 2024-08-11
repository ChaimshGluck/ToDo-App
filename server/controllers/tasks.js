import db from "../db.js";

export async function createTask(title, userid, image) {
    const result = await db.one('insert into todos1.task (title, user_id, image) values (${title}, ${user_id}, ${image}) returning id, title, user_id, image', {
        title: title,
        user_id: userid,
        image: image
    })
    return { id: result.id, title: result.title, userid: result.user_id, image: result.image }
};

export async function getUsersTasks(userid) {
    const result = await db.manyOrNone(`
    select id as task_id, title, status, image
    from todos1.task
    where deleted_at is null and user_id = $1
    order by created_at desc`, [
        userid
    ])
    return result.map(task => ({
        id: task.task_id,
        title: task.title,
        done: task.status !== "active",
        image: task.image
    })
    )
};

export async function markTaskDone(taskid) {
    await db.none("update todos1.task set status = 'done' where id = $1", [taskid]);
    return { ok: true };
}

export async function deleteTask(taskid, userid) {
    await db.any("update todos1.task set deleted_at = now(), status = 'deleted' where id = $1 and user_id = $2", [taskid, userid]);
    return { ok: true };
}