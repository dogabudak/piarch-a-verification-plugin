import * as nano from 'nanomsg'
const nanoReq = nano.socket('req');
// TODO pick it up from config ?
nanoReq.connect('tcp://127.0.0.1:5608');
// TODO write test for this
export const checkToken = async (token) => {
    return new Promise((resolve, reject)=>{
        nanoReq.send('jwt ' + token);
        nanoReq.on('data',  (buf) => {
            if (buf.toString() === 'true') {
                resolve(true)
            } else {
                reject({})
            }
        });
    })
}
