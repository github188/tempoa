// 加班
<template>
  <div>
    <el-dialog title="加班申请" :visible.sync="modal" size="tiny" class="tiny-type-modal">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px" label-position="right">
        <el-form-item label="开始时间：" prop="startDate" style="display:inline-block; width: 228px;">
          <el-date-picker style="width: 228px;" :editable="false" @change="countTime" v-model="form.startDate" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>

        <el-form-item prop="startTime" style="display:inline-block; width: 228px">
          <el-time-select style="width: 228px;"
          v-model="form.startTime"
          :editable="false"
           @change="countTime"
           :picker-options="{
                  start: '09:00',
                  step: '01:00',
                  end: '18:00'
              }"
            placeholder="选择时间">
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
          <el-input disabled v-model="form.timeLength"></el-input>
        </el-form-item>

        <el-form-item label="加班说明：" prop="reason">
          <el-input v-model="form.reason" type="textarea"></el-input>
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
        reason: '',
        id: '',
        timeLength: ''  //加班时长
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
        reason: [{
          required: true,
          message: '加班说明不能为空！'
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
      this.countTime();
      this.modal = true;
    },
    getAffairs(obj) {  //获取请假类型
      this.form.type = obj.value;
      this.form.day = obj.day;
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
      const { startDate, startTime, endDate, endTime } = this.form;
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
          let params = {
            userId: this.$store.state.u,
            startTime: this.startDate,
            endTime: this.endDate,
            timeLength: this.form.timeLength,
            reason: this.form.reason,
            id: this.form.id
          };
          this.ajax({
            url: '/cwa/overtime/update',
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
  },
  props: ['reStart']
};
</script>





