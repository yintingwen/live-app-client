const env = require('./config.js'); //配置文件，在这文件里配置你的OSS keyId和KeySecret,timeout:87600;

const base64 = require('./base64.js');//Base64,hmac,sha1,crypto相关算法
require('./hmac.js');
require('./sha1.js');
const Crypto = require('./crypto.js');

/*
 *上传文件到阿里云oss
 *@param - filePath :图片的本地资源路径
 *@param - dir:表示要传到哪个目录下
 *@param - successc:成功回调
 *@param - failc:失败回调
 */ 
const uploadFile = function (filePath, dir, successc, failc) {
  if (!filePath || filePath.length < 9) {
    uni.showModal({
      title: '图片错误',
      content: '请重试',
      showCancel: false,
    })
    return;
  }
  
  //图片名字 可以自行定义，     这里是采用当前的时间戳 + 150内的随机数来给图片命名的
  const aliyunFileKey = dir + new Date().getTime() + Math.floor(Math.random() * 150) + '.png';
  
  const aliyunServerURL = env.uploadImageUrl;//OSS地址，需要https
  const accessid = env.OSSAccessKeyId;
  const policyBase64 = getPolicyBase64();
  const signature = getSignature(policyBase64);//获取签名
 
  uni.uploadFile({
    url: aliyunServerURL,//开发者服务器 url
    filePath: filePath,//要上传文件资源的路径
    name: 'file',//必须填file
    formData: {
      'key': aliyunFileKey,
      'policy': policyBase64,
      'OSSAccessKeyId': accessid,
      'signature': signature,
      'success_action_status': '200',
      'stsToken': 'CAIS6wF1q6Ft5B2yfSjIr5b/DfTljr5C1becanfT1VkMe71NgbzPpDz2IH9EdHhgAO4WsfUzm2pY7/walq50V5QAQEHUNSqnAUult1HPWZHInuDox55m4cTXNAr+Ihr/29CoEIedZdjBe/CrRknZnytou9XTfimjWFrXWv/gy+QQDLItUxK/cCBNCfpPOwJms7V6D3bKMuu3OROY6Qi5TmgQ41Ms1joguf7vnpzMt0OO12eXkLFF+97DRbG/dNRpMZtFVNO44fd7bKKp0lQLtEgapfcv0vwbqGuY5IHEWQFLjhebNevJ4mrRnLim+U1QGoABRPHr67uURAoPrW7NRDvuXtOnr4rgQLN7l1Ld6Lmyzdd7uhYbj0NniwDKDuFXsCSOeIozFyYHy3B1sdvxtr/djpLJZ8lIpA+YBQH4Bv25eB3FTaqWgmiREvoYC3G11vgR1G34YIf464VTA7Q8lWHi4ctyoGoJhXbyM77mGPYUvVM=',
    },
    success: function (res) {
			console.log(res);
      if (res.statusCode != 200) {
        failc(new Error('上传错误:' + JSON.stringify(res)))
        return;
      }
       successc(aliyunServerURL+aliyunFileKey);
    },
    fail: function (err) {
      err.wxaddinfo = aliyunServerURL;
      failc(err);
    },
  })
}

const getPolicyBase64 = function () {
  let date = new Date();
  date.setHours(date.getHours() + env.timeout);
  let srcT = date.toISOString();
  const policyText = {
    "expiration": srcT, //设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了 
    "conditions": [
      ["content-length-range", 0, 5 * 1024 * 1024] // 设置上传文件的大小限制,5mb
    ]
  };

  const policyBase64 = base64.encode(JSON.stringify(policyText));
	console.log(policyBase64);
  return policyBase64;
}

const getSignature = function (policyBase64) {
  const accesskey = env.AccessKeySecret;

  const bytes = Crypto.HMAC(Crypto.SHA1, policyBase64, accesskey, {
    asBytes: true
  });
  const signature = Crypto.util.bytesToBase64(bytes);
console.log(signature);
  return signature;
}

module.exports = uploadFile;