// 外出
<template>
  <div>
    <el-dialog title=" 外出申请" :visible.sync="modal" size="full" class="full-dialog">
      <el-row>
        <el-col :span="12" class="col-apart" v-for="(item, index) in partForm" :key="index">
          <el-form :ref="'form'+index" :model="item" label-width="100px" label-position="right" style="width: 560px; margin:0 auto;">
            <el-form-item label="开始时间：" :rules="[{required: true, message: '请选择开始日期'}]" prop="startDate" style="display:inline-block; width: 228px;">
              <el-date-picker style="width: 228px;" v-model="item.startDate"  :editable="false" @change="countTime(index)" type="date" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
               <el-form-item prop="startTime" style="width: 228px; display:inline-block">
              <el-time-select style="width: 228px;"  :rules="[{trigger: 'blur', required: true, message: '请选择结束日期'}]"  prop="startTime" v-model="item.startTime" @change="countTime(index)" :editable="false" name="endTime" :picker-options="{
                  start: '09:00',
                  step: '01:00',
                  end: '18:00'
                }" placeholder="选择时间">
              </el-time-select>
            </el-form-item>
            <div></div>
            <el-form-item label="结束时间：" prop="endDate" style="width: 228px; display:inline-block" :rules="[{required: true, message: '请选择结束日期'}]">
              <el-date-picker style="width: 228px;" :picker-options="endDateOpt" :editable="false"  @change="countTime(index)" v-model="item.endDate" type="date" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item prop="endTime" style="width: 228px; display:inline-block">
              <el-time-select style="width: 228px;"  :rules="[{trigger: 'blur', required: true, message: '请选择结束日期'}]"  prop="endTime" v-model="item.endTime" @change="countTime(index)" :editable="false" name="endTime" :picker-options="{
                  start: '09:00',
                  step: '01:00',
                  end: '18:00',
                  minTime: minTime(index)
                }" placeholder="选择时间">
              </el-time-select>
            </el-form-item>
            <el-form-item label="时长(天)：" prop="timeLength" :rules="[{validator: checkTime,trigger: 'blur', required: true, message: '请输入时长!'}]">
              <el-input disabled v-model="item.timeLength"></el-input>
            </el-form-item>
            <el-form-item label="外出地点：" prop="address"  :rules="{trigger: 'blur', required: true, message: '请输入外出地点!'}">
              <el-input v-model="item.address"></el-input>
            </el-form-item>
            <el-form-item label="外出事由：" prop="reason" :rules="[{trigger: 'blur', required: true, message: '请输入外出事由!'}]">
              <el-input v-model="item.reason" type="textarea"></el-input>
            </el-form-item>
          </el-form>
          <i title="删除" v-if="index != 0" @click="deleteAdpart(index)" class="deleteAdpart el-icon-delete"></i>
        </el-col>

        <el-col :span="12" class="col-apart">
          <i title="新增" @click="addAdpart" class="add-apart el-icon-plus"></i>
        </el-col>
      </el-row>

      <span slot="footer" class="dialog-footer">
        <el-button type="success" :disabled="disable" @click="submit" v-if="disable">
          <i class="el-icon-loading"></i>
        </el-button>
        <el-button type="success" :disabled="disable" @click="submit" v-else>确 定</el-button>
        <el-button type="info" @click="modal = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<style scoped>
.error {
  color: #f00;
}

.col-apart {
  height: 340px;
  border-bottom: 1px solid #eee;
  border-left: 1px solid #eee;
  position: relative;
  margin-top: 30px;
}
.add-apart {
  font-size: 40px;
  border: 1px dashed #eee;
  cursor: pointer;
  text-align: center;
  margin: 0 auto;
  display: block;
  width: 150px;
  height: 150px;
  text-align: center;
  line-height: 150px;
  margin-top: 80px;
  color: rgba(72, 87, 106, 0.63);
}
.col-apart:hover .deleteAdpart{
  opacity: 1;
  transition: opacity .5s ease;
}
.deleteAdpart{
    position: absolute;
    bottom: 5px;
    right: 0;
    margin-right: 10px;
    font-size: 20px;
    opacity: 0;
    transition: opacity .5s ease;
    cursor: pointer;
    color: rgba(72, 87, 106, 0.63);
}
</style>

<style>
.full-dialog .el-dialog__body{
  padding-top: 0;
}
</style>

<script>
export default {
  name: "leaveModal",
  data() {
    return {
      endDateOpt: {
        disabledDate: (time) => {
          return time.getTime() < this.partForm[this.index].startDate;
        }
      },
      modal: false,
      minTime(index) {
        if ((this.partForm[index].startDate && this.partForm[index].startDate.getTime()) == (this.partForm[index].endDate && this.partForm[index].endDate.getTime())) { //如果是同一天
          return this.partForm[index].startTime;
        }
        return '06:00';
      },
      flag: false,
      params: [],
      index: 0,  //当前作用的表单序号
      partForm: [],   // 存储多个表单
      form: {
        aTime: '',
        bTime: '',
        startDate: undefined,
        startTime: undefined,
        endDate: undefined,
        endTime: undefined,
        address: '',
        reason: '',
        timeLength: ''
      },
    };
  },
  created(){
   this.addAdpart();
  },
  methods: {
    openModal() {
      this.modal = true;
    },
    getAffairs(obj) { //获取请假类型
      this.form.type = obj.value;
      this.form.day = obj.day;
    },
    countTime(index) { //计算请假时长
      this.index = index;
      const {
        startDate,
        startTime,
        endDate,
        endTime
        } = this.partForm[index];
      if (startDate && startTime && endDate && endTime) {
        let START = (startDate).toString().split(' ')[0] + ' ' + startTime;
        let END = (endDate).toString().split(' ')[0] + ' ' + endTime;
        this.partForm[index].aTime = new Date(START).getTime();
        this.partForm[index].bTime = new Date(END).getTime();
        this.$refs['form'+index][0].validateField('timeLength');
      }
    },
    submit() {
      this.disable = true;
      const partForm = this.partForm;
      for(let i = 0; i < partForm.length; i++){
        this.$refs['form'+i][0].validate((valid)=>{
          this.params[i] = {
            startTime: partForm[i].aTime,
            endTime: partForm[i].bTime,
            timeLength:  partForm[i].timeLength,
            address:  partForm[i].address,
            reason: partForm[i].reason
          };
          this.flag = valid;
        });
      }

      setTimeout(()=>{
        if(this.flag){
          this.ajax({
            url: '/cwa/outside/start',
            type: 'post',
            data: {
              list: this.params
            },
            success(data, $this){
              if(data.code == 'success'){
                $this.successTips();
                $this.modal = false;
                $this.partForm = [];
                $this.addAdpart();

              }else{
                $this.errorTips(data.message);
              }
            }
          });
        }else{
          this.disable = false;
        }
      }, 500);
    },
    checkTime(rule, value, callback){
       this.ajax({
          url: '/cwa/overtime/timelong',
          data: {
            starttime: this.partForm[this.index].aTime,
            endtime: this.partForm[this.index].bTime
          },
          success(data, $this) {
            if (data.code == 'success') {
              callback();
              $this.partForm[$this.index].timeLength = data.content;
            }else{
              $this.errorTips('服务异常，时长计算失败!');
              $this.countTime($this.index);
            }
          }
        });
    },
    addAdpart(){
      let temp = {};
      for(let item in this.form){
        temp[item] = this.form.item;
      }
      this.partForm.push(temp);
    },
    deleteAdpart(index){
      this.partForm.splice(index, 1);
    }
  }
};
</script>





