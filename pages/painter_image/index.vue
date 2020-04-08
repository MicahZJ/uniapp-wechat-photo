<template lang="pug">
  div#mine-wrapper
    div.preview-box(v-if="previewFlag")
      span.title ↘下面是生成好的图片↙
      span.title ↘点击保存就行了↙
      painter(:customStyle="getCustomStyle" @imgOK="onImgOK" :palette="getTemplate" :dirty="true")
      div.button-box(v-if="createCanvas")
        button.button-cancel(@click="save(false)") 取消
        button.button-confirm(@click="save(true)") 保存
    div.painter-box
      img.background-css(:src="userImage" mode="widthFix")
      img.icon-css(:src="demoIcon"
                   mode="widthFix"
                   @longpress="clickLong"
                   @click="clickOne"
                   @touchstart="touchStart"
                   @touchmove="touchMove",
                   @touchcancel="touchCancel"
                   @touchend="touchEnd"
                   :style="{transform: translateXY}")
    button.button-preview(@click="showPreview()") 预览
    div.icon-box
      image.icon-css(v-for="(item, index) in iconArr"
                     :key="index"
                     :src="item" @click="chooseIcon(item)")
</template>

<script src="./control.js"></script>

<style lang="stylus" src="./style.styl"></style>
