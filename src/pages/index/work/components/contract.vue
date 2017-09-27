<template>
  <div>
    <el-form label-width="110px" label-position="right">
      <el-form-item label="合同发起人：">
        <span> {{details.userName}} </span>
      </el-form-item>
      <el-form-item label="合同归属部门：">
        <span> {{reverseDepart(details.depName)}} </span>
      </el-form-item>
      <el-form-item label="关联项目：">
        <span> {{details.projectName || '/'}} </span>
      </el-form-item>
      <el-form-item label="合同类型：">
        <span> {{details.ctmAttrName}} </span>
      </el-form-item>
      <el-form-item label="合同名称：">
        <span> {{details.ctmName}} </span>
      </el-form-item>
      <el-form-item label="合作方名称：">
        <span> {{details.cusName}} </span>
      </el-form-item>
      <el-form-item label="合同金额：">
        <span> {{details.amount && (details.amount).addComma() + ' 元' || '/'}} </span>
      </el-form-item>
      <el-form-item label="合同开始日期：">
        <span> {{new Date(details.startTime).toDay()}} </span>
      </el-form-item>
      <el-form-item label="合同结束日期：">
        <span> {{new Date(details.endTime).toDay()}} </span>
      </el-form-item>
      <el-form-item label="其他说明：">
        <span v-html="details.remark"></span>
      </el-form-item>
      <el-form-item label="合同附件：" v-if="details.file">
        <a style="cursor:pointer" class="block" title="下载附件" @click="downFile(`/ctm/contract/files/download?fileId=${item.id}&name=${item.name}`, item.name)" :key="index" v-for="(item, index) in details.file"><i class="el-icon-document"></i>&nbsp;&nbsp;{{item.name}}</a>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'contract',
  props: ['details'],
};
</script>

