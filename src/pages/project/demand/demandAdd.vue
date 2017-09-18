// 新建需求
<template>
  <div>
    <el-dialog title="新建需求" :visible.sync="modal" size="small" class="demand-add">
      <el-form ref="demandAddForm" :model="form" :rules="rules" label-width="110px" label-position="right">
        <el-form-item label="项目名称：" prop="project">
           <el-select v-model="project" disabled  placeholder="请选择" class="w-100">
            <el-option
              v-for="item in projectList"
              :key="item.value"
              :label="item.proName"
              :value="item.id+'|'+item.proName+'|'+item.proCode">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="需求接收人：" prop="receivePersonName">
          <!-- <el-input v-model="form.receivePersonName"></el-input> -->
          <v-person ref="person" @change="getPerson" class="w-100"></v-person>
        </el-form-item>
        <el-form-item label="是否紧急：">
          <el-switch on-text="" off-text="" v-model="form.reqEmergency"></el-switch>
        </el-form-item>
        <el-form-item label="需求标题：" prop="reqtitle">
          <el-input v-model="form.reqtitle"></el-input>
        </el-form-item>
        <el-form-item label="需求详情：" prop="reqDetail">
          <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 10}" v-model="form.reqDetail"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" :disabled="disable" v-if="disable">
          <i class="el-icon-loading"></i>
        </el-button>
        <el-button type="success" :disabled="disable" @click="submit" v-else>确 定</el-button>
        <el-button type="info" @click="modal = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<style>
.demand-add .el-dialog {
  width: 700px;
}
</style>

<script>
export default {
  name: 'demandAdd',
  data() {
    return {
      modal: false,
      projectList: [], // 项目列表
      project: '',  //选中的项目
      form: {
        proInfo: '',  //项目名称
        proId: '',  //项目id
        proCode: '',  //项目编号
        receivePersonName: '', //需求接收人名称
        receivePersonId: '',  //需求接收人id
        reqEmergency: '',  //是否紧急
        reqtitle: '',   //需求标题
        reqDetail: ''   //需求详情
      },
      rules: {
        proInfo: {
          required: true,
          message: '项目名称不能为空!'
        },
        receivePersonName: {
          required: true,
          message: '需求接收人不能为空!'
        },
        reqtitle: {
          required: true,
          message: '需求标题不能为空!'
        },
        reqDetail: {
          required: true,
          message: '需求详情不能为空!'
        }
      }
    };
  },
  created () {
      this.getProjectList();
  },
  methods: {
    openModal(row) {
      this.modal = true;

      this.project = row.id+'|'+row.proName+'|'+row.proCode;
      console.log(this.project);
    },
    getProjectList(){
      this.ajax({
        url: '/pmo/project/list',
        success(data, $this){
          if(data.code == 'success'){
            $this.projectList = data.content;
          }
        }
      });
    },
    getPerson(obj){
      this.form.receivePersonName = obj.name;
      this.form.receivePersonId = obj.value;
    },
    submit(){
      this.$refs.demandAddForm.validate((valid)=>{
        if(valid){
          this.disable = true;
          let list = this.project.split('|');
          let { receivePersonId, receivePersonName, reqDetail, reqEmergency, reqtitle } = this.form;
          const params = {
            // addPerson: Utils.getValue('u'),
            proId: list[0],
            // proCode: list[2],
            receivePersonId: receivePersonId,
            receivePersonName: receivePersonName,
            reqDetail: reqDetail,
            reqTitle: reqtitle,
            reqEmergency: reqEmergency?'1':'2'
          };

          this.ajax({
            url: '/pmo/require/add_submit',
            data: params,
            type: 'post',
            success(data, $this){
              if(data.code == 'success'){
                $this.successTips();
                $this.resetForm('demandAddForm');
                $this.modal = false;
              }else{
                $this.errorTips();
              }
            }
          });
        }
      });
    }
  }
};
</script>
