const express = require('express');
const router = express.Router();
const tencentcloud = require("tencentcloud-sdk-nodejs");
const BdaClient = tencentcloud.bda.v20200324.Client;

const clientConfig = {
  credential: {
    secretId: "",
    secretKey: "",
  },
  region: "ap-guangzhou",
  profile: {
    httpProfile: {
      endpoint: "bda.tencentcloudapi.com",
    },
  },
};

/* GET users listing. */
router.get('/', function(req, res, next) {
  // Depends on tencentcloud-sdk-nodejs version 4.0.3 or higher
  const client = new BdaClient(clientConfig);
  const params = {
      "SegmentationOptions": {
          "LeftEyebrow": true,
          "RightEyebrow": true,
          "LeftEye": true,
          "RightEye": true,
          "Nose": true,
          "UpperLip": true,
          "LowerLip": true,
          "Mouth": true,
          "Face": true
      },
      "Url": "https://youtupics.maiyizhi.cn/temp_upload_16051048543.jpeg"
  };
  client.SegmentCustomizedPortraitPic(params).then(
    (data) => {
      console.log(data);
      res.send(data);
    },
    (err) => {
      console.error("error", err);
      res.send(err);
    }
  );
});

module.exports = router;
