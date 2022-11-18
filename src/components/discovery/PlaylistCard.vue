<script setup>

const {name, picUrl,creator} = defineProps(
    {
      name: {
        type: String,
        required: true
      },
      picUrl: {
        type: String,
        required: true
      },
      creator: {
        type: String,
        required: true
      }
    }
)

</script>

<template>
  <div class="playlist">
    <div class="img-wrap">
      <el-image lazy :src="picUrl" class="img"/>
<!--      <p class="desc">{{tags}}</p>-->
    </div>
    <div>
      <el-link type="default" class="playlist-content">
        <p class="playlist-name">{{ name }}</p>
      </el-link>
        <p>by {{creator}}</p>
    </div>
  </div>
</template>


<style scoped>
.img {
  width: 240px;
  height: 240px;
}

.playlist {
  cursor: pointer;
}

.playlist-name {
  font-size: 16px;
  font-weight: 700;
  margin-top: 5px;
}
.img-wrap{
  position: relative;
}
.desc{
  position: absolute;
  bottom: 10px;
  /*background-color: #2c2c2c;*/
  /*color: #fff;*/
}
</style>
