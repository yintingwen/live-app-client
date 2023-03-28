<template>
  <view class="c-uploade" @tap="onTapUpload">
    <slot>
      <view class="content" :class="{'bgc-white': imgSrc || imgUrl}">
        <image v-if="imgSrc || imgUrl" :src="imgSrc || imgUrl" class="image" mode="aspectFit" />
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
      imgSrc: ''
    }
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
      default: ''
    },
    iconSize: {
      type: String,
      default: '54'
    },
    border: {
      type: Boolean,
      default: false
    },
    qrcode: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    getSetting() {
      uni.getSetting({
        success: res => {
          let authStatus = res.authSetting['scope.album']
          if (!authStatus) {
            uni.showModal({
              title: '授权失败',
              content:
                'Hello uni-app需要从您的相册获取图片，请在设置界面打开相关权限',
              success: res => {
                if (res.confirm) {
                  uni.openSetting()
                }
              }
            })
          }
        }
      })
    },
    chooseImage() {
      return new Promise((resolve, reject) => {
        uni.chooseImage({
          count: this.count,
          success: chooseImageRes => {
            const fileSrc = chooseImageRes.tempFilePaths[0]
            console.log('文件路径:',fileSrc);
            resolve(fileSrc)
          },
          fail: err => {
            this.getSetting()
            reject(err)
          }  
        })
      })
    },
    uploadFile(filePath) {
      return new Promise((resolve, reject) => {
        this.uploader = uni.uploadFile({
          url: this.url, //仅为示例，非真实的接口地址
          filePath,
          name: 'file',
          formData: {
            Authorization: uni.getStorageSync('token') || ''
          },
          success: uploadFileRes => {
            resolve(JSON.parse(uploadFileRes.data).message)
            console.log('上传成功后返回图片地址:',JSON.parse(uploadFileRes.data).message);
          },
          fail: err => {
            reject(err)
          }
        })
        this.$emit('beforeUpload', this.uploader)
      })
    },
    decode(filePath){
      return new Promise(( resolve, reject ) => {
        // #ifdef H5
        let qr = new QrcodeDecoder()
        qr.decodeFromImage(filePath).then((res) => {
          console.log('解码后的数据：',res.data)
          resolve(res.data || '')
        })
        // #endif

        // #ifdef APP-PLUS
        plus.barcode.scan( filePath, function(type,result) {
          console.log("解码后的数据:("+type+")"+result);
          resolve(result || '')
        }, function(e){
          console.log("Scan failed: "+JSON.stringify(e));
        } );
        // #endif
      })
    },
    async onTapUpload() {
      if (this.uploading) return // 判断是否上传中
      try {
        const filePath = await this.chooseImage() // 选择图片
        
        this.uploading = true // 设置为上传中
        const res = await this.uploadFile(filePath) // 开始上传
        this.imgSrc = filePath
        
        if(this.qrcode){
          const data = await this.decode(filePath) //解析二维码
          
          this.$emit("success", {
            imgUrl: res,
            qrcodeUrl: data
          }) // 上传完成触发事件
        }else{
          this.$emit('success', res) // 上传完成触发事件
        }
      } catch(err) {
        console.log(err);
      }
      this.uploading = false // 取消上传中
    }
  }
}
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
        border: 3rpx dashed map-get($colors, 'primary');
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