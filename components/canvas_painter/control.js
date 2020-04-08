export default {
  data () {
    return {
      shareImg: '', // 图片
      template: {}
    }
  },
  watch: {
    getTemplate: {
      handler (newV, oldV) {
        console.log('23', newV)
        this.template = newV
      },
      deep: true
    }
  },
  props: [
    'getCustomStyle',
    'getTemplate'
  ],
  computed: {},
  methods: {
    /**
     * 图片生成
     * @param e
     */
    onImgOK (e) {
      this.shareImg = e.mp.detail.path
      this.$emit('sendShareImage', this.shareImg)
      // 两种路径是一样的
      console.log(e.mp.detail.path)
      console.log(e.target.path)
    }
  },
  components: {},
  onLoad () {
  },
  onShow () {
	  console.log('onshow')
  },
  onHide () {
  },
  onUnload () {
  }
}
