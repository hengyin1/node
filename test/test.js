const axios = require("axios");
const formdata = {
    scene: 'writing',
    question: 'You:小红书风格smile冲牙器广告',
    appid: 'wx2702272d38dcc8a2',
    openid: 'o2SYJ5ToYMyr24OdenuT9xlVQIIQ',
    is_vip: false
}
axios.post('https://www.ptydd.top/chatgpt/asking', formdata, {
    timeout: 120000,
    headers: {
        "Content-Type": "application/json"
    }
})
.then((response) => {
    console.log('response', response);
    // res.send({ success: true, data: response.data });
})
.catch((error) => {
    console.log('errpr', error);
    // res.status(500).send({ success: false, msg: error });
});