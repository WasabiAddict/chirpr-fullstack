// import * as mysql from 'mysql';

// import Blogs from './blogs';

// export const Conneciton = mysql.createConnection({
//     host: 'localhost',
//     port: 3306,
//     user: 'blog',
//     password: 'blahblah',
//     database: 'blog'
// });

// export const Query = (query: string, values: Array<string | number>) => {
//     return new Promise<Array<any>>((resolve, reject) => {
//         Conneciton.query(query, values, (err, results) => {
//             if(err) return reject(err);
//             return resolve(results);
//         });
//     });
// };

// export default {
//     Blogs
// }

const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    password: 'blahblah',
    user: 'chirp',
    database: 'chirpr',
    host:'localhost',
    port: '3000'
});

let chirprdb = {};

chirprdb.all = () => {
    return new Promise((resolve, reject) => {

        pool.query(`SELECT * FROM chirps`, (err, results) => {
            if(err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

chirprdb.one = id => {
    return new Promise((resolve, reject) => {

        pool.query(`SELECT * FROM chirps WHERE id = ?`, [id], (err, results) => {
            if(err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};


module.exports = chirprdb;