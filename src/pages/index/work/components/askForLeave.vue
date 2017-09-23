//请假
<template>
  <div>
    <el-form label-width="100px" label-position="right">
      <el-form-item label="请假人：">
        <span> {{details.salesmanName}} </span>
      </el-form-item>
      <el-form-item label="请假类型：">
        <span> {{affairsName}} </span>
      </el-form-item>
      <el-form-item label="开始时间：">
        <span> {{new Date(details.startTime).toString()}} </span>
      </el-form-item>
      <el-form-item label="结束时间：">
        <span> {{new Date(details.endTime).toString()}} </span>
      </el-form-item>
      <el-form-item label="工作代理人：" v-if="details.agentName">
        <span> {{details.agentName}} </span>
      </el-form-item>
      <el-form-item label="时长：">
        <span> {{details.timeLength}}天 </span>
      </el-form-item>
      <el-form-item label="请假理由：">
        <span v-html="details.reason"></span>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'contract',
  props: ['details'],
  data(){
    return {
      affairsName: ''
    };
  },
  updated(){
    this.getAffairsType();
  },
  methods: {
    getAffairsType(){
      this.ajax({
        url: '/ctm/setting/param/list',
        data: {
          code : 'cwa_leave_type'
        },
        success(data, $this){
          if(data.code == 'success'){
            const { content } = data;
            for(let i = 0; i < content.length; i++){
              if(content[i].value == $this.details.type){
                $this.affairsName = content[i].name;
              }
            }
          }
        }
      });
    }
  }
};
</script>
