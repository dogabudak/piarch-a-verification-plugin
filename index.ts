import * as nano from 'nanomsg'
import {StatsD} from 'hot-shots'
const nanoReq = nano.socket('req');

const client = new StatsD({
    port: 8020,
});
// TODO pick it up from config ?

// TODO this shouldnt use nanomsg anymore
nanoReq.connect('tcp://127.0.0.1:5608');
export const checkToken = async (token) => {
    return new Promise((resolve, reject)=>{
        nanoReq.send('jwt ' + token);
        nanoReq.on('data',  (buf) => {
            if (buf.toString() === 'true') {
                client.increment('verification.success');
                resolve(true)
            } else {
                client.increment('verification.fail');
                reject({})
            }
        });
    })
}
