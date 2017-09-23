//加班
<template>
  <div>
    <el-form label-width="100px" label-position="right">
      <el-form-item label="申请人：">
        <span> {{details.salesmanName}} </span>
      </el-form-item>

      <el-form-item label="开始时间：">
        <span> {{new Date(details.startTime).toString()}} </span>
      </el-form-item>
      <el-form-item label="结束时间：">
        <span> {{new Date(details.endTime).toString()}} </span>
      </el-form-item>
      <el-form-item label="时长：">
        <span> {{details.timeLength}}天 </span>
      </el-form-item>
      <el-form-item label="加班理由：">
        <span v-html="details.reason"></span>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'overTime',
  props: ['details'],
};
</script>
