<template>
  <div>
    <el-dialog :title="'【' + pmoProject.proName + '】的项目详情'" :visible.sync="modal" size="small" class="detail-project">
      <v-panel title="基本信息">
        <div slot="button">
          <el-button type="info" @click="projectEdit">编 辑</el-button>
        </div>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form label-width="120px" label-position="right">
              <el-form-item label="立项日期：">
                <span> {{pmoProject.proDate}} </span>
              </el-form-item>
              <el-form-item label="项目编号：">
                <span> {{pmoProject.proCode}} </span>
              </el-form-item>
              <el-form-item label="项目经理：">
                <span> {{pmoProject.managePersonName}} </span>
              </el-form-item>

            </el-form>
          </el-col>
          <el-col :span="12">
            <el-form label-width="120px" label-position="right">
              <el-form-item label="营销中心：">
                <span> {{pmoProject.marktName}} </span>
              </el-form-item>
              <el-form-item label="所属区域：">
                <span> {{pmoProject.province}}|{{pmoProject.city}}|{{pmoProject.area}} </span>
              </el-form-item>
              <el-form-item label="市场负责人：">
                <span> {{ pmoProject.marktPersonName}} </span>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="24">
            <el-form label-width="120px" label-position="right">
              <el-form-item label="项目成员：">
                <span v-for="(item,index) in pmoPersonList" :key="index">{{item.personName}}、 </span>
              </el-form-item>
              <el-form-item label="项目背景：">
                <span> {{pmoProject.proContents}} </span>
              </el-form-item>
            </el-form>
          </el-col>

        </el-row>
      </v-panel>
    </el-dialog>
  </div>
</template>
<style>
.detail-project .el-dialog {
  width: 700px;
}

.detail-project .el-dialog__body {
  padding-top: 0;
}
</style>
<script>
export default {
  name: 'ProjectDetail',
  data() {
    return {
      row: {},
      modal: false,
      pmoProject: {}, //项目详情
      pmoPersonList: []  //项目人员
    };
  },
  methods: {
    openModal(row) {
      this.row = row;
      this.modal = true;
      this.ajax({
        url: 'pmo/require/'+ row.id +'/detail',
        success(data, $this) {
          if (data.code == 'success') {
            const content = data.content;
            $this.pmoProject = content.pmoProject;
            $this.pmoPersonList = content.pmoPersonList;
          }
        }
      });
    },
    projectEdit() {
      this.modal = false;
      this.$refs.editProject.openModal(this.row);
    }
  }
};
</script>
