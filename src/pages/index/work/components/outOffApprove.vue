// 出差
<template>
  <div>
    <el-dialog title="
              出差申请" :visible.sync="modal" size="tiny" class="tiny-type-modal">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px" label-position="right">
        <el-form-item label="开始时间：" prop="startDate" style="display:inline-block; width: 228px;">
          <el-date-picker style="width: 228px;" :editable="false" @change="countTime" v-model="form.startDate" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="startTime" style="display:inline-block; width: 228px">
          <el-time-select style="width: 228px;" v-model="form.startTime" :editable="false" @change="countTime" :picker-options="{
                                  start: '09:00',
                                  step: '01:00',
                                  end: '18:00'
                              }" placeholder="选择时间">
          </el-time-select>
        </el-form-item>
        <el-form-item label="结束时间：" prop="endDate" style="width: 228px; display:inline-block">
          <el-date-picker style="width: 228px;" :editable="false" :picker-options="endDateOpt" @change="countTime" v-model="form.endDate" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="endTime" style="width: 228px; display:inline-block">
          <el-time-select style="width: 228px;" v-model="form.endTime" @change="countTime" :editable="false" name="endTime" :picker-options="{
                                  start: '09:00',
                                  step: '01:00',
                                  end: '18:00'
                              }" placeholder="选择时间">
          </el-time-select>
        </el-form-item>
        <el-form-item label="时长(天)：" prop="timeLength">
          <el-input disabled v-model="form.timeLength" style="width: 110px; margin-right:20px;"></el-input>
          <span>如果申请日期包括周末，如有加班请另提加班申请。</span>
        </el-form-item>
        <el-form-item label="出发地点：" prop="startAddress">
          <el-input v-model="form.startAddress"></el-input>
        </el-form-item>
        <el-form-item label="目的地点：" prop="endAddress">
          <el-input v-model="form.endAddress"></el-input>
        </el-form-item>
        <el-form-item label="出差说明：" prop="remark">
          <el-input v-model="form.remark" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="机票服务：" prop="reason">
          <el-radio class="radio" v-model="form.isNeedplane" label="0">不需要</el-radio>
          <el-radio class="radio" v-model="form.isNeedplane" label="1">需要</el-radio>
        </el-form-item>
        <el-form-item label="" prop="planeRemark" v-if="form.isNeedplane == '1'">
          <el-input v-model="form.planeRemark" type="textarea" placeholder="请详细描述定机票起止地点及日期"></el-input>
        </el-form-item>
      </el-form>
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
</style>

<style>
.tiny-type-modal .el-dialog {
  width: 600px;
}
</style>

<script>
export default {
  name: "leaveModal",
  data() {
    return {
      endDateOpt: {
        disabledDate: (time) => {
          return time.getTime() < this.form.startDate;
        }
      },
      modal: false,
      startDate: undefined,
      endDate: undefined,
      form: {
        startDate: undefined,
        startTime: undefined,
        endDate: undefined,
        endTime: undefined,
        startAddress: '', //出发地
        endAddress: '', //目的地
        remark: '', //说明
        timeLength: '', //加班时长
        isNeedplane: '0', //是否需要机票服务
        planeRemark: '' //机票说明
      },
      rules: {
        timeLength: [{
          required: true,
          message: '时长不能为空!'
        }],
        startDate: [{
          required: true,
          message: '开始日期不能为空！'
        }],
        endDate: [{
          required: true,
          message: '结束日期不能为空！'
        }],
        startTime: [{
          required: true,
          message: '开始时间不能为空！'
        }],
        endTime: [{
          required: true,
          message: '结束时间不能为空！'
        }],
        startAddress: [{
          required: true,
          message: '出发地点不能为空！'
        }],
        endAddress: [{
          required: true,
          message: '目的地点不能为空！'
        }],
        planeRemark: [{
          required: true,
          message: '机票服务说明不能为空！'
        }],
        remark: [{
          required: true,
          message: '出差说明不能为空！'
        }]
      }
    };
  },
  methods: {
    openModal(details) {
      this.form.timeLength = details.timeLength;
      this.form.reason = details.reason;
      this.form.startDate = this.tTs(details.startTime).date;
      this.form.startTime = this.tTs(details.startTime).ham;
      this.form.endDate = this.tTs(details.endTime).date;
      this.form.endTime = this.tTs(details.endTime).ham;
      this.form.id = details.id;
      this.form.startAddress = details.startAddress;
      this.form.endAddress = details.endAddress;
      this.form.remark = details.remark;
      if(details.isNeedplane){
        this.form.isNeedplane = details.isNeedplane.toString();
        this.form.planeRemark = details.planeRemark;
      }
      this.countTime();
      this.modal = true;
    },
    tTs(time){  //时间戳转为年月日
        let _dateTime = new Date(time).toString().split(' ');
        let _date = _dateTime[0];  //年月日
        let _time = _dateTime[1];  //时分秒
        let _ham = _time.split(':');
        let ham =  _ham[0]+':'+_ham[1];  //时分
        return {
          date: _date,
          time: _time,
          ham: ham
        };
    },
    countTime(data) { //计算请假时长
      const {
        startDate,
        startTime,
        endDate,
        endTime
        } = this.form;
      if (startDate && startTime && endDate && endTime) {
        let START = (startDate).toString().split(' ')[0] + ' ' + startTime;
        let END = (endDate).toString().split(' ')[0] + ' ' + endTime;
        this.startDate = new Date(START).getTime();
        this.endDate = new Date(END).getTime();
        this.ajax({
          url: '/cwa/leave/timelong',
          data: {
            starttime: this.startDate,
            endtime: this.endDate
          },
          success(data, $this) {
            if (data.code == 'success') {
              $this.form.timeLength = data.content;
            }
          }
        });
      }
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.disable = true;
          const { timeLength, startAddress, endAddress, isNeedplane, remark, planeRemark, id } = this.form;
          let params = {
            userId: this.$store.state.u,
            startTime: this.startDate,
            endTime: this.endDate,
            timeLength,
            startAddress,
            endAddress,
            isNeedplane,
            remark,
            id
          };
          if (isNeedplane) {
            params.planeRemark = planeRemark;
          }
          this.ajax({
            url: '/cwa/travel/update',
            type: 'put',
            data: params,
            success(data, $this) {
              if (data.code == 'success') {
                $this.successTips();
                $this.modal = false;
                $this.resetForm('form');
                $this.$emit('reStart', 2);
              } else {
                 $this.errorTips(data.message);
              }
            }
          });
        }
      });
    }
  }
};
</script>





