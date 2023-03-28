<template>
  <view class="c-uploade" @tap="onTapUpload">
    <slot>
      <view class="content" :class="{'bgc-white': imgSrc}">
        <image v-if="imgSrc||imgUrl" :src="imgSrc||imgUrl" class="image" mode="aspectFit" />
        <view v-else class="placehold" :class="{'uploader-border': border}">
          <c-icon v-if="uploading" class="loading" name="loading" size="75" color="#666"></c-icon>
          <c-icon v-else :name="iconName" :size="iconSize" color="#666"></c-icon>
        </view>
      </view>
    </slot>
  </view>
</template>

<script>
import QrcodeDecoder from 'qrcode-decoder'
import Crypto from '../../utils/oss/crypto1/crypto/crypto.js'
import '../../utils/oss/crypto1/hmac/hmac.js'
import '../../utils/oss/crypto1/sha1/sha1.js'
import {Base64} from '../../utils/oss/base64.js'

import uploadImage from '../../utils/ossutil/uploadFile.js'




export default {
  data() {
    return {
      uploader: null,
      uploading: false,
      imgSrc: "",
      buffer: null
    };
  },
  props: {
    url: {
      type: String
    },
    imgUrl: {
      type: String
    },
    count: {
      type: Number,
      default: 1
    },
    iconName: {
      type: String,
      default: ""
    },
    iconSize: {
      type: String,
      default: "54"
    },
    border: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    getSetting() {
      uni.getSetting({
        success: res => {
          let authStatus = res.authSetting["scope.album"];
          if (!authStatus) {
            uni.showModal({
              title: "授权失败啊",
              content:
                "Hello uni-app需要从您的相册获取图片，请在设置界面打开相关权限",
              success: res => {
                if (res.confirm) {
                  uni.openSetting();
                }
              }
            });
          }
        }
      });
    },

    //选择图片
    chooseImage() {
      return new Promise((resolve, reject) => {
        uni.chooseImage({
          count: this.count,
          success: chooseImageRes => {
            let file = chooseImageRes.tempFiles[0]; //文件对象
            console.log('file对象：',file)

            resolve(file)
          },
          fail: err => {
            this.getSetting();
            reject(err);
          }
        });
      });
    },

    // 上传到oss
    async uploadFile(file) {
      console.log('文件路径：',file.path)
      // oss 配置
      const data = await this.api.wallet.oss()

      var uploadFileSize = 1024*1024*100;  // 上传文件的大小限制100m
      var policyText = {
          "expiration": "2022-01-01T12:00:00.000Z", //设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了
          "conditions": [
              ["content-length-range", 0, uploadFileSize] // 设置上传文件的大小限制 
          ]
      };
      var policyBase64 = Base64.encode(JSON.stringify(policyText));
      var message = policyBase64;
      var bytes = Crypto.HMAC(Crypto.SHA1, message, data.AccessKeySecret, { asBytes: true }) ;
      var signature = Crypto.util.bytesToBase64(bytes);

      // uni.uploadFile({
      //   url: 'http://otc-mex.oss-cn-hangzhou.aliyuncs.com', //仅为示例，非真实的接口地址
      //   filePath: file.path,
      //   fileType: 'image',
      //   name: 'file',
      //   formData: {
      //     'key': "${filename}",
      //     'policy': policyBase64,
      //     'OSSAccessKeyId': data.AccessKeyId, 
      //     'success_action_status': '200', //让服务端返回200,不然，默认会返回204
      //     'signature': signature,
      //   },
      //   success: (res) => {
      //     console.log(res.data);
      //     return res.data
      //   }
      // })

      // uploadImage(file.path, 'images/',
      //   result => {
      //     return result
      //   },
      //   err => {
      //     console.log(err);
      //   }
      // )

    //#ifdef APP-PLUS
      if(!file) {  
          plus.nativeUI.alert("没有添加上传文件！");  
          return;  
      }  
      console.log("开始上传：")  
      var testName = ''
      var wt = plus.nativeUI.showWaiting();  
      var task = plus.uploader.createUpload('http://otc-mex.oss-cn-hangzhou.aliyuncs.com', {  
              method: "POST"  
          },  
          function(t, status) { //上传完成  
              console.log("t" + JSON.stringify(t));  
              if(status == 200) {  
                  console.log("上传成功：" + t.responseText);  
                  //至此上传成功，上传后的图片完整地址为server+testName  
                  var uploaderFileObj = {  
                      "server":'http://otc-mex.oss-cn-hangzhou.aliyuncs.com',  
                      "path":testName  
                  };  
                  plus.storage.setItem("uploader", JSON.stringify(uploaderFileObj));  
                  var w = plus.webview.create("uploader_ret.html", "uploader_ret.html", {  
                      scrollIndicator: 'none',  
                      scalable: false  
                  });  
                  w.addEventListener("loaded", function() {  
                      wt.close();  
                      w.show("slide-in-right", 300);  
                  }, false);  
              } else {  
                  console.log("上传失败：" + status);  
                  wt.close();  
              }  
          }  
      );  
      var suffix1 = '.jpg';  //文件后缀  例如   .jpg  
      var keyname = new Date().getTime() + suffix1;  

      testName = keyname;  
      console.log("keyname" + keyname);  
      //按照之前说明的参数类型，按顺序添加参数  
      task.addData("key", keyname);  
      task.addData("policy", policyBase64);  
      task.addData("OSSAccessKeyId", data.AccessKeyId);  
      task.addData("success_action_status", "200");  
      task.addData("signature", signature);  
      task.addFile(file.path, {  
          key: "file",  
          name: "file",  
          mime: "image/jpeg"  
      });  
      task.start();  
    // #endif
    },

    // 点击上传
    async onTapUpload() {
      if (this.uploading) return; // 判断是否上传中
      try {
        const file = await this.chooseImage(); // 选择图片
        
        this.imgSrc = file.path; // 预览图片

        this.uploading = true; // 设置为上传中
        const res = await this.uploadFile(file); // 开始上传
        console.log('oss图片地址：',res);//oss图片地址

      } catch (err) {
        console.log(err);
      }
      this.uploading = false // 取消上传中
    }
  },
};
</script>
<style lang='scss' scoped>
.c-uploade {
  display: inline-flex;
  .content {
    width: 308rpx;
    height: 195rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;

    .placehold {
      @extend .flex-center;
      width: 100%;
      height: 100%;

      &:active {
        border: 3rpx dashed map-get($colors, "primary");
      }

      .loading {
        animation: rotate 2s infinite linear;
      }
    }

    .uploader-border {
      border: 3rpx dashed #666666;
    }

    .image {
      width: 100%;
      height: 100%;
    }

    @keyframes rotate {
      from {
        transform: rotate(0);
      }
      to {
        transform: rotate(360deg);
      }
    }
  }
}
</style>