import { Query } from './index';

const all = async () => Query('SELECT * FROM chirps');
const one = async(id) => Query('SELECT * FROM chirps WHERE id = ?', [id]);
const post= (userid, content, location) => Query("insert into chirps(userid, content, location) values(?,?,?,)" [userid.content, location])
const del = (id) => Query("delete from chirps where id = ?", [id]);
const update = (id, content) => Query('update chirps set content = ? where chirps.id = ?', [content, id]);

export default {
    all,
    one,
    post,
    del,
    update
}