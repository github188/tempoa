<!-- 新增项目 -->
<template>
  <div>
    <el-dialog :title="title" :visible.sync="modal" size="small" class="add-project">
      <el-form ref="projectForm" :model="form" :rules="rules" label-width="110px" label-position="right">
        <el-form-item label="项目名称：" prop="proName">
          <el-input v-model="form.proName"></el-input>
        </el-form-item>

        <el-form-item label="营销中心：" class="inline-block"prop="marktName">
          <v-market ref="market" @change="getMarket" style="width:180px"></v-market>
        </el-form-item>

        <el-form-item label="立项日期：" class="inline-block" style="margin-left: 62px;" prop="proDate">
          <el-date-picker type="date" :editable="false" v-model="form.proDate" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="所属区域：" prop="provinceId" id="provinceLabel">
          <v-area ref="area" @change="getArea"></v-area>
        </el-form-item>

        <el-form-item label="项目背景：" prop="proContents">
          <el-input :autosize="{ minRows: 2, maxRows: 6}" type="textarea" v-model="form.proContents"></el-input>
        </el-form-item>

        <hr>
        <el-form-item label="市场负责人：" class="inline-block" prop="personMarketName">
          <v-person @change="getMarketName" style="width: 218px;"></v-person>
        </el-form-item>

        <el-form-item label="项目经理：" class="inline-block" prop="personManageName">
          <v-person @change="getManageName" style="width: 217px;"></v-person>
        </el-form-item>

        <el-form-item label="项目成员：" prop="personMemberName">
          <v-person @change="getMemberName" :multiple="true" class="w-100"></v-person>
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
.add-project .el-dialog {
  width: 700px;
}

.add-project .item-right {
  margin-right: 30px;
}

#provinceLabel .select-area {
  width: 180px;
  margin-right: 0;
}
</style>

<script>
export default {
  name: 'addProject',
  data() {
    return {
      modal: false,
      form: {
        proName: '',   //项目名称
        marktName: '',   //营销中心名称
        marktId: '',   //营销中心名称
        province: '',  //省名字
        provinceId: '',  //省id
        city: '',  //市名称
        cityId: '',  //市ID
        area: '',  //区名称
        areaId: '',  //区ID
        proDate: '',  //立项日期
        proContents: '', //项目背景
        personManageName: '',  //项目经理名称
        personMarketName: '',  //市场负责人名称
        personMemberName: '',  //项目成员名称
        pmoPersonMemberList: [],
        pmoPersonList: [
          {  //项目经理
            personCategory: 1,
            personId: '',
            personName: ''
          },
         {  //市场负责人
            personCategory: 2,
            personId: '',
            personName: ''
          }
        ]  //管理信息
      },
      rules: {
        proName: {
          required: true,
          message: '项目名称不能为空!'
        },
        proDate: {
          required: true,
          message: '日期不能为空!'
        },
        proContents: {
          required: true,
          message: '项目背景不能为空!'
        },
        marktName: {
          required: true,
          message: '营销中心不能为空!'
        },
        provinceId: {
          required: true,
          message: '所属区域不能为空!'
        },
        personManageName: {
          required: true,
          message: '项目经理不能为空!'
        },
        personMarketName: {
          required: true,
          message: '市场负责人不能为空!'
        },
        personMemberName: {
          required: true,
          message: '项目成员不能为空!'
        }
      },
    };
  },
  methods: {
    openModal() {
      this.modal = true;
      this.resetForm('projectForm');
    },
    getMarket(obj) {
      this.form.marktId = obj.value;
      this.form.marktName = obj.name;
    },
    getArea(obj) {
      const { province, city, area } = obj;
      this.form.provinceId = province.value;
      this.form.cityId = city.value;
      this.form.areaId = area.value;
      this.form.province = province.name;
      this.form.city = city.name;
      this.form.area = area.name;
    },
    getManageName(obj){  //获取项目经理
      this.form.personManageName = obj.name;
      this.form.pmoPersonList[0].personName = obj.name;
      this.form.pmoPersonList[0].personId = obj.value;
    },
    getMarketName(obj){  //获取市场负责人
      this.form.personMarketName = obj.name;
      this.form.pmoPersonList[1].personName = obj.name;
      this.form.pmoPersonList[1].personId = obj.value;
    },
    getMemberName(obj){  //获取项目成员
      let length = obj.length;
      this.form.pmoPersonMemberList = [];
      if(length > 0){
        this.form.personMemberName = obj[0].name;
        for(var i = 0; i < length; i++){
          this.form.pmoPersonMemberList.push({
             personCategory: 3,
             personId: obj[i].value,
             personName: obj[i].name
          });
        }
      }else{
        this.form.personMemberName = [{name:''}];
      }
    },
    submit(){
      this.$refs.projectForm.validate((valid)=>{
        if(valid){
           this.disable = true;
          let { provinceId, province, cityId, city, areaId, area, marktName, marktId, proDate, proName, proContents } = this.form;
          let params = {
              pmoProject : {
                proName: proName,
                area: area,
                areaId: areaId,
                city: city,
                cityId: cityId,
                province: province,
                provinceId: provinceId,
                marktId: marktId,
                marktName: marktName,
                proContents: proContents,
                proDate: new Date(proDate).toDay()
              },
            pmoPersonList: this.form.pmoPersonList.concat(this.form.pmoPersonMemberList)
          };
          this.ajax({
            url: 'pmo/project',
            type: 'post',
            data: params,
            success(data, $this){
              if(data.code == 'success'){
                $this.successTips();
                $this.modal = false;
                $this.$emit('getList');
              }else{
                 $this.errorTips(data.message);
              }
            }
          });
        }
      });
    }
  },
  props: ['title']
};
</script>
