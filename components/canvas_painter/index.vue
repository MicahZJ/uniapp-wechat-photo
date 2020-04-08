<template lang="pug">
  div#wrapper
    painter(:customStyle="getCustomStyle" @imgOK="onImgOK" :palette="getTemplate" :dirty="true")
</template>

<script src="./control.js"></script>

<style scoped lang="stylus" src="./style.styl"></style>
