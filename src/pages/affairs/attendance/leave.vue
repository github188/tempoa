// 请假
<template>
  <div>
    <el-dialog title="请假申请" :visible.sync="modal" size="tiny" class="tiny-type-modal">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px" label-position="right">
        <el-form-item label="请假类型：" prop="type">
          <v-affairs filter="true" @change="getAffairs" style="display:inline-block; width: 228px;"></v-affairs>
          <span :class="[form.day == 0? 'error': '']" v-if="form.type == 4" style="padding-left: 10px">剩余年休假 {{form.day}} 天</span>
          <span :class="[form.day == 0? 'error': '']" v-if="form.type == 5" style="padding-left: 10px">剩余调休假 {{form.day}} 天</span>
        </el-form-item>

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
                              end: '18:00',
                              minTime: minTime()
                          }" placeholder="选择时间">
          </el-time-select>
        </el-form-item>

        <el-form-item label="时长(天)：" prop="timeLength">
          <el-input disabled v-model="form.timeLength"></el-input>
        </el-form-item>

        <el-form-item label="工作代理人：">
          <v-person style="width: 100%" @change="getPerson"></v-person>
        </el-form-item>

        <el-form-item label="请假理由：" prop="reason">
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
      minTime() {
        if ((this.form.startDate && this.form.startDate.getTime()) == (this.form.endDate && this.form.endDate.getTime())) {  //如果是同一天
          return this.form.startTime;
        }
        return '06:00';
      },
      startDate: undefined,
      endDate: undefined,
      form: {
        startDate: undefined,
        startTime: undefined,
        endDate: undefined,
        endTime: undefined,
        agentId: undefined,
        reason: '',
        type: '0',
        day: '',
        timeLength: ''  //请假时长
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
          message: '请假理由不能为空！'
        }],
        type: [{
          required: true,
          message: '请假类型不能为空！'
        }]
      }
    };
  },

  methods: {
    openModal() {
      this.modal = true;
    },
    getPerson(obj) {  //获取代理人
      this.form.agentId = obj.value;
    },
    getAffairs(obj) {  //获取请假类型
      this.form.type = obj.value;
      this.form.day = obj.day;
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
            type: this.form.type,
            startTime: this.startDate,
            endTime: this.endDate,
            timeLength: this.form.timeLength,
            reason: this.form.reason
          };
          const agentId = this.form.agentId;
          if (agentId) {
            params.agentId = agentId;
          }

          this.ajax({
            url: '/cwa/leave/start',
            type: 'post',
            data: params,
            success(data, $this) {
              if (data.code == 'success') {
                $this.$message({
                  message: '操作成功！',
                  type: 'success'
                });
                $this.modal = false;
                $this.$refs.form.resetFields();
              } else {
                $this.$message({
                  message: data.message,
                  type: 'warning'
                });
              }
            }
          });
        }
      });
    }
  }
};
</script>





