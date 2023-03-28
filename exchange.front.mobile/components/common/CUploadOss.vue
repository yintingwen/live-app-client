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
import QrcodeDecoder from 'qrcode-decoder';

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
    
    // 文件路径转二进制类文件对象
    h5_url_to_blob(url) {
      return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.responseType = "blob";
        xhr.onload = function(e) {
          if (this.status == 200) {
            var Blob = this.response;
            // console.log(myBlob)
            resolve(Blob);
            // myBlob现在是对象URL指向的blob。
          }
        };
        xhr.send();
      });
    },
    
    //#ifdef APP-PLUS
    // app端获取file对象
    getFile(path){
      return new Promise((resolve, reject) => {
        plus.io.resolveLocalFileSystemURL(path,
          entry => {
            entry.file(file => {
              let File = {}

              file.lastModified = new Date().getTime()
              console.log('blob对象：')
              file.name = 'fileName'
              console.log('APP端文件对象：',file)
              // console.log('APP端文件对象：',File)
              resolve(file)
            },err => {
            })
          },
          e => {
            reject(e);
        })
      })
    },
    // #endif

    // 上传到oss
    async uploadFile(file) {
      console.log('文件路径：',file.path)
      // oss 配置
      const data = await this.api.wallet.oss()

      let OSS = require("ali-oss")

      let client = new OSS({
        region: data.regionId,
        endpoint: data.endpoint,
        accessKeyId: data.AccessKeyId,
        accessKeySecret: data.AccessKeySecret,
        stsToken: data.SecurityToken,
        bucket: data.bucket
      })

      console.log(file.name)
      let fileName = file.path.split(".").shift()
      //随机文件名
      let randomName = new Date().getTime() + "." + fileName;

      // 文件对象
      // #ifdef H5
      // let fileObj = await this.h5_url_to_blob(file.path)
      // console.log('blob对象：',fileObj)
      // #endif

      //#ifdef APP-PLUS
      let fileObj = await this.getFile(file.path)
      // #endif

      // 开始上传
      try {
        console.log("begin send to oss")
        const results = await client.put(randomName, file, {
          progress: function*(percentage, cpt) {}
        })
        if(results.res.requestUrls[0]){
          console.log("file upload success")
          //上传成功返回oss图片地址
          return results.res.requestUrls[0]
        }
      } catch (e) {
        console.log(e.message)
      }
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

        // 解析二维码
        let qr = new QrcodeDecoder()
        const data = await qr.decodeFromImage(file.path).then((res) => {
				//打印结果为 解析后的 二维码地址
          console.log('二维码地址：',res.data)
          return res.data || ''
        })

        this.$emit("success", {
          ossUrl: res,
          qrcodeUrl: data
        }) // 上传完成触发事件
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