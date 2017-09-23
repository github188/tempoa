//出差
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
      <el-form-item label="起点：">
        <span> {{details.startAddress}}天 </span>
      </el-form-item>
      <el-form-item label="终点：">
        <span> {{details.endAddress}}天 </span>
      </el-form-item>
      <el-form-item label="出差理由：">
        <span v-html="details.remark"></span>
      </el-form-item>

      <template v-if="details.isNeedplane == 1">
        <el-form-item label="机票服务：">
          <span>需要</span>
        </el-form-item>
        <el-form-item label="机票描述：">
          <span>{{ details.planeRemark }}</span>
        </el-form-item>
      </template>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'outOff',
  props: ['details'],
};
</script>
