<template lang="pug">
  div#painter-wrapper
    div.preview-box(v-if="previewFlag")
      span.title ↘下面是生成好的图片↙
      span.title ↘点击保存就行了↙
      painter(:customStyle="getCustomStyle" @imgOK="onImgOK" :palette="getTemplate" :dirty="true")
      div.button-box(v-if="createCanvas")
        button.button-cancel(@click="save(false)") 取消
        button.button-confirm(@click="save(true)") 保存
      button.button-play(v-if="playSelf"
                         open-type="getUserInfo"
                         @getuserinfo="userInfoHandler") 用自己的头像玩玩看
    div.painter-box
      img.background-css(:src="demoImage" mode="widthFix")
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
    div.show-text
      span.text 玩法介绍
      span.subtitle(v-for="(item, index) in titleArr" :key="index") {{item.text}}
</template>

<script src="./control.js"></script>

<style lang="stylus" src="./style.styl"></style>
