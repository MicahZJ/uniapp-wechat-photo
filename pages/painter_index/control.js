import { wxHideLoading, wxLoading, wxNavPush, WXselectDom } from '../../utils/wechat_api'

export default {
  data () {
    return {
      previewFlag: false, // 预览展示
      createCanvas: false, // 图片绘制完成
      playSelf: false, // 去绘制自己的头像
      shareImg: '',
      getTemplate: {}, // 参数
      demo: {
        background: 'png',
        width: '375px',
        height: '375px',
        borderRadius: '10px',
        views: [
          {
            type: 'image',
            url: 'png',
            css: {
              top: '48rpx',
              right: '48rpx',
              width: '192rpx',
              height: '192rpx',
              borderRadius: '10rpx',
              align: 'right'
            }
          },
          {
            type: 'qrcode',
            content: 'https://github.com/Kujiale-Mobile',
            css: {
              left: '70rpx',
              bottom: '30rpx',
              width: '130rpx',
              height: '130rpx'
            }
          },
          {
            type: 'text',
            text: '这是一个标题',
            css: {
              left: '50rpx',
              top: '48rpx',
              fontSize: '40rpx',
              align: 'left'
            }
          }
        ]
      },
      getCustomStyle: '', // 样式
      demoImage: 'https://www.micahzj.com/images/wechat/WechatDemo.png',
      demoIcon: 'https://www.micahzj.com/images/wechat/user_icon.png',
      imageWidth: 0, // 小图片宽
      imageHeight: 0, // 小图片高
      divWidth: 0, // 背景宽
      divHeight: 0, // 背景高
      clientX: 0, // x轴
      clientY: 0, // y轴
      titleArr: [
        {text: '1) 拖动小图片'},
        {text: '2) 确定位置之后，点击预览查看即将保存的头像'},
        {text: '3) 点击保存，获取新的头像！'}
      ]
    }
  },
  watch: {},
  computed: {
    translateXY () {
      return `translate(${this.clientX}px, ${this.clientY}px)`
    }
  },
  methods: {

    /**
     * 获取照片大小
     */
    async getPhotoInfo () {
      let iconImageInfo = await WXselectDom('.icon-css')
      this.imageWidth = iconImageInfo[0].width
      this.imageHeight = iconImageInfo[0].height

      let painterDivInfo = await WXselectDom('.painter-box')
      this.divWidth = painterDivInfo[0].width
      this.divHeight = painterDivInfo[0].height
    },

    /**
     * 图片生成
     * @param e
     */
    onImgOK (e) {
			console.log('eee', e)
      // this.shareImg = e.mp.detail.path
      this.createCanvas = true
      wxHideLoading()
      // this.$emit('sendShareImage', this.shareImg)
      // 两种路径是一样的
      // console.log(e)
    },

    /**
     * 保存图片
     */
    save (flag) {
      if (!flag) {
        this.previewFlag = false
        return
      }

      let that = this
      wxLoading('保存图片中')
      wx.saveImageToPhotosAlbum({
        filePath: this.shareImg,
        success: (res) => {
          wxHideLoading()
          wx.showToast({
            title: '保存成功~',
            icon: 'none'
          })
          that.playSelf = true
        },
        fail: (err) => {
          wxHideLoading()
          // console.log('err', err)
          wx.showToast({
            title: '保存失败T_T,您未授予权限',
            icon: 'none'
          })
          wx.showModal({
            title: '授权提示',
            content: '我想要保存图片相册',
            success: res => {
              if (res.confirm) {
                wx.openSetting({
                  success: res => {
                    if (res.authSetting['scope.writePhotosAlbum']) {
                      that.save(this.shareImg)
                    } else {
                      // preview([path])
                    }
                  }
                })
              } else if (res.cancel) {
                // preview([path])
              }
            }
          })
        }
      })
    },

    clickOne (e) { // 单点
      // console.log('one', e)
    },
    clickLong (e) { // 长按
      // console.log('long', e)
    },

    // touch开始
    touchStart (e) { // 点击开始
      // console.log('start', e)
    },

    // touch移动
    touchMove (e) { // 移动开始
      this.clientX = e.touches[0].clientX - this.imageWidth / 2
      this.clientY = e.touches[0].clientY - this.imageHeight / 2
      // console.log('move', this.clientX, this.clientY)
    },

    // touch被中断（电话，闹钟，推送等）
    touchCancel (e) { // 中断
      // console.log('cancel', e)
      if (this.clientX < 0) {
        this.clientX = 0
      } else if (this.clientX > (this.divWidth - this.imageWidth)) {
        this.clientX = this.divWidth - this.imageWidth
      }

      if (this.clientY < 0) {
        this.clientY = 0
      } else if (this.clientY > this.divHeight - this.imageHeight) {
        this.clientY = this.divHeight - this.imageHeight
      }
    },

    // touch结束
    touchEnd (e) { // 结束
      // console.log('end', e)
      if (this.clientX < 0) {
        this.clientX = 0
      } else if (this.clientX > (this.divWidth - this.imageWidth)) {
        this.clientX = this.divWidth - this.imageWidth
      }

      if (this.clientY < 0) {
        this.clientY = 0
      } else if (this.clientY > this.divHeight - this.imageHeight) {
        this.clientY = this.divHeight - this.imageHeight
      }
    },

    /**
     * 展示预览层
     */
    async showPreview () {
      wxLoading('绘制中')
      this.previewFlag = true
      // let bg = await wxGetImageInfo(this.demoImage)
      // let iconImage = await wxGetImageInfo(this.demoIcon)
      this.createAttributes(this.demoImage, this.demoIcon)
    },

    /**
     *  生成图片参数
     * @param bg 背景
     * @param iconImage 小图片
     */
    createAttributes (bg, iconImage) {
      this.getTemplate = {
        background: bg,
        width: this.divWidth + 'px',
        height: this.divHeight + 'px',
        views: [
          {
            type: 'image',
            url: iconImage,
            css: {
              top: this.clientY + 'px',
              left: this.clientX + 'px',
              width: this.imageWidth + 'px',
              height: this.imageHeight + 'px'
            }
          }
        ]
      }
    },

    /**
     * 获取用户信息后的回调
     * @param e
     */
    userInfoHandler (e) {
      // console.log('获取信息', e)
      let msg = e.target.errMsg
      // console.log('msg', msg)
      if (msg === 'getUserInfo:fail auth deny') {
        wx.showToast({
          title: '没有授予权限是无法对自己的头像操作的哦～',
          icon: 'none'
        })
      } else if (msg === 'getUserInfo:ok') {
        let page = '/pages/painter_image/main'
        wxNavPush(page)
      }
    }
  },
  props: [],
  components: {
  },
  onLoad () {
  },
  onShow () {
    this.getPhotoInfo()
  },
  mounted () {
  },
  onHide () {
    // console.log('hide')
  },
  onUnload () {
    // console.log('unload')
  }
}
