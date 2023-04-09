// const axios = require("axios");
const formdata = {
    scene: 'writing',
    question: 'You:小红书风格smile冲牙器广告',
    appid: 'wx2702272d38dcc8a2',
    openid: 'o2SYJ5ToYMyr24OdenuT9xlVQIIQ',
    is_vip: false
}
// axios.post('https://www.ptydd.top/chatgpt/asking', JSON.stringify(formdata), {
//     timeout: 120000,
//     headers: {
//         "Content-Type": "application/json"
//     }
// })
// .then((response) => {
//     console.log('response', response);
//     // res.send({ success: true, data: response.data });
// })
// .catch((error) => {
//     console.log('errpr', error);
//     // res.status(500).send({ success: false, msg: error });
// });

import fetch from 'node-fetch';
// const fetch = require("node-fetch");

async function chat() {
    const response = await fetch('https://www.ptydd.top/chatgpt/asking', {
        method: 'post',
        body: JSON.stringify(formdata),
        headers: {'Content-Type': 'application/json'}
    });
    const data = await response.json();
    
    console.log(data);
}

chat()
