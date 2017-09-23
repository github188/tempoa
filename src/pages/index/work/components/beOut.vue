//外出
<template>
  <div>
    <el-form class="form" label-width="130px" label-position="right" v-for="(item, index) in details.list" :key="index">
      <el-button class="small-tag" size="small">外出{{index+1}}</el-button>
      <el-form-item label="开始时间：">
        <span> {{new Date(item.startTime).toString()}} </span>
      </el-form-item>
      <el-form-item label="结束时间：">
        <span> {{new Date(item.endTime).toString()}} </span>
      </el-form-item>
      <el-form-item label="外出时长：">
        <span> {{item.timeLength}}天 </span>
      </el-form-item>
      <el-form-item label="外出地点：">
        <span> {{item.address}}天 </span>
      </el-form-item>
      <el-form-item label="外出事由：">
        <span v-html="item.reason"></span>
      </el-form-item>
      <hr>
    </el-form>
    <p class="remark">注：该外出单无需审批，已同步到个人考勤记录。</p>
  </div>
</template>
<style scoped>
  .form{
    position: relative;
  }
  .small-tag{
    position: absolute;
    right: 0;
    top: 10px;
  }
  .remark{
    position: absolute;
    bottom: 30px;
  }
</style>

<script>
export default {
  name: 'outOff',
  props: ['details'],
};
</script>
