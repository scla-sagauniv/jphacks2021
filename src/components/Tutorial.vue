<template>
    <div id="overlay">
        <div id="content">
            <p>これがモーダルウィンドウです。</p>
            <button v-on:click="close">close</button>
        </div>
    </div>
</template>

<script>
    export default {
        methods:{
            close(){
                this.$emit('close')
            }
        }
    }
</script>



<style scoped lang="scss">
#content{
  z-index:10;
  width:50%;
  height: 50%;
  padding: 1em;
  background:#fff;
}

#overlay{

  z-index:1;

  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background-color:rgba(0,0,0,0.5);

  display: flex;
  align-items: center;
  justify-content: center;

}
</style>