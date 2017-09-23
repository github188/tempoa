<template>
  <div>
    <ul id="calendar">
      <li class="calendar-list calendar-week" v-for="(item, index) in week" :key="index">周&nbsp;&nbsp;{{item}}</li>

      <template v-if="date.length == 0">
        <div class="no-data" v-loading="false"></div>
      </template>
      <li v-else class="calendar-list" v-for="(item, index) in date" :key="index" :class="(item.last?item.last:'workday')">

        <div v-if="item.disabled" class="disabled">
          <!-- 本月日历之外的数据 -->
          <!-- {{item.date}} -->
        </div>

        <div v-else :class="item.klass">
            <template>
              <div class="calendar-list-box calendar-list-all" >
                <div class="name" :style="{'color': item.style.color, 'background': item.style.bg}">{{item.name}}</div>
                <span class="date">{{item.day}}</span>
                <span class="sign early" :style="{'color': item.early[1]}">{{item.early[0]}}</span>
                <span class="sign night" :style="{'color': item.night[1]}">{{item.night[0]}}</span>
              </div>
            </template>
        </div>
      </li>
    </ul>

    <el-dialog title="修改考勤记录" :visible.sync="modal" size="tiny" class="edit-calendar-modal" @close="closeModal" :modal="false">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px" label-position="right">
        <el-form-item label="状态：" prop="type">
          <v-affairs @change="getAffairs"></v-affairs>
          <span :class="[day == 0? 'error': '']" v-if="form.type == 4" style="padding-left: 10px">剩余年休假 {{day}} 天</span>
          <span :class="[day == 0? 'error': '']" v-if="form.type == 5" style="padding-left: 10px">剩余调休假 {{day}} 天</span>
        </el-form-item>

        <el-form-item label="时长：" prop="time">
          <el-select v-model="form.time" placeholder="请选择">
            <el-option label="1天" value="1"></el-option>
            <el-option label="0.5天" value="0.5"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="修改备注：" prop="reason">
          <el-input v-model="form.reason" type="textarea"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button type="success" :disabled="disabled" @click="submit" v-if="disabled">
          <i class="el-icon-loading"></i>
        </el-button>
        <el-button type="success" :disabled="disabled" @click="submit" v-else>确 定</el-button>
        <el-button type="info" @click="modal = false">取 消</el-button>

      </span>

    </el-dialog>

  </div>
</template>

<style scoped>
.error {
  color: red;
}

#calendar {
  border: 1px solid #e5e6e5;
  border-bottom: none;
  border-right: none;
  overflow: hidden;
  width: 100%;
  font-size: 14px;
  margin-bottom: 12px;
}

.calendar-list {
  float: left;
  width: 14.28%;
  height: 90px;
  border-bottom: 1px solid #e5e6e5;
  border-right: 1px solid #e5e6e5;
  text-align: center;
  position: relative;
  list-style: none;
  background: rgba(238, 238, 238, 0.15);
}

.calendar-week {
  line-height: 60px;
  height: 60px;
  background: #fff;
}

.calendar-list .disabled {
  color: #dadddb;
}

.calendar-list .normal-day {}

.calendar-list.weekend {
  background: #f2f2f2;
}

.calendar-list-box,
.calendar-list .enabled {
  height: 100%;
}

.calendar-list-box .date {
  position: absolute;
  left: 12px;
  top: 12px;
  font-size: 16px;
  font-family: cursive;
  font-weight: bold;
}

.calendar-list-box .name {
  position: absolute;
  right: 12px;
  top: 12px;
  height: 24px;
  line-height: 24px;
  text-align: center;
  width: 48px;
  font-size: 12px;
  border-radius: 30px;
}

.calendar-list-box .sign {
  position: absolute;
  left: 12px;
  color: #a9a9a9;
  font-size: 12px;
}

.calendar-list-box .sign.early {
  top: 40px;
}

.calendar-list-box .sign.night {
  top: 64px;
}

.calendar-list-half .half {
  width: 50%;
  height: 100%;
}

.calendar-list-half .double-half {
  width: 50%;
  height: 100%;
  float: left;
  position: relative;
}

.calendar-list-half .double-half:first-child {
  border-right: 1px solid #fff;
}

.calendar-list .edit-tag {
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
}

.calendar-list .edit-tag:after {
  position: absolute;
  content: '';
  left: -10px;
  top: -10px;
  height: 20px;
  width: 20px;
  background: #01cd78;
  transform: rotate(-130deg);
  -webkit-transform: rotate(-130deg);
  -ms-transform: rotate(-130deg);
  -o-transform: rotate(-130deg);
  -moz-transform: rotate(-130deg);
  ;
}

.calendar-list .edit-log {
  padding: 20px 0;
  width: 200%;
  min-height: 200%;
  box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
  position: absolute;
  left: 0;
  top: 0;
  background: #fff;
  z-index: 9999;
  display: none;
  max-height: 280px;
  overflow: auto;
  color: #333;
}

.calendar-list .edit-log p {
  line-height: 20px;
  text-align: justify;
  margin: 0;
  margin-bottom: 8px;
  padding: 0 10px;
  word-break: break-all;
  word-wrap: break-word;
}

.calendar-list .edit-tag {
  display: block;
  height: 20px;
  width: 20px;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
}

.no-data {
  height: 300px;
  margin-top: 60px;
  border-bottom: 1px solid #e5e6e5;
  border-right: 1px solid #e5e6e5;
}
</style>
<style>
.edit-calendar-modal .el-dialog {
  width: 600px;
  height: 380px;
}
</style>

<script>
export default {
  name: 'calendar',
  data() {
    return {
      week: ['日', '一', '二', '三', '四', '五', '六'],
      date: [],
      type: [],
      modal: false,
      disabled: false,
      day: '',  //假期剩余天数
      form: {
        reason: '',
        type: '1', //修改类型
        time: '',  //时长
        userId: '',  //用户id
        typeName: '',
        id: '',
        date: ''  //修改的那一天
      },
      rules: {
        type: [{
          required: true,
          message: '状态不能为空！'
        }],
        time: [{
          required: true,
          message: '请选择时长！'
        }],
        reason: [{
          required: true,
          message: '修改备注不能为空！'
        }],

      }
    };
  },
  props: ['edit'],
  methods: {
    getType() {
      this.ajax({   //获取请假类型
        url: 'ctm/setting/param/list',
        data: {
          code: 'cwa_leave_type'
        },
        success(data, $this) {
          if (data.code == 'success') {
            $this.type = data.content;
            $this.dateList();
          }
        }
      });
    },
    getAffairs(obj) {  //获取请假类型
      this.form.type = obj.value;
      this.form.typeName = obj.name;
      this.day = obj.day;
    },

    editHandel(id, date) {
      this.modal = true;
      this.form.id = id;
      this.form.date = date;
    },
    submit() {   //修改考勤记录
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.disabled = true;
          this.ajax({
            url: '/cwa/attendance/update',
            type: 'put',
            data: Utils.filterObjectNull(this.form),
            success(data, $this) {
              if (data.code == 'success') {
                $this.$message({
                  type: 'success',
                  message: '修改成功！'
                });
                $this.modal = false;
              } else {
                $this.$message({
                  type: 'error',
                  message: data.message
                });
              }
              $this.disabled = false;
            }
          });
        }
      });
    },
    dateList(month, data, type, id) {
      this.date = [];
      this.form.userId = id;
      // console.log(month, data, type, id);
      if (!month) {
        return;
      }
      let DATE = month.split('-');  //传过来的日期
      let $year = DATE[0];  //年
      let $month = DATE[1];  //月
      let activeDate = new Date($year, $month - 1, 1);
      let bf = true, af = false;
      activeDate.setDate(1);
      activeDate.setDate(1 - activeDate.getDay());

      let leaveTypeObj = {};   //请假类型
      let leaveType = type;
      for (let type = 0; type < leaveType.length; type++) {
        let value = leaveType[type].value;   //考勤类型
        leaveTypeObj[value] = {
          name: leaveType[type].name,
          value: leaveType[type].value,
          style: (function() {
            if (leaveType[type].value == 2 || value == 9) {  //加班
              return {
                bg: '#ffe6e6',
                color: '#f46564'
              };
            }
            if (leaveType[type].value == 3) {  //出差
              return {
                bg: '#fff1e1',
                color: '#f8a64a'
              };
            }
            if (leaveType[type].value == 10) { //外出
              return {
                bg: '#f7ebff',
                color: '#c06dec'
              };
            }
            if (value >= 4 && value != 9) {  //请假
              return {
                bg: '#e8f8ff',
                color: '#4bb5f8'
              };
            }
            return {   //正常
              bg: '#e8fff6',
              color: '#23d183'
            };
          })()
        };
      }


      let dayInfo = {};
      const $DATE = new Date();

      for (let j = 0; j < 42; j++) {
        let $date = activeDate.getDate();
        if ($date == 1) {
          if (bf) {
            bf = false;
          } else {
            af = true;
          }
        }
        activeDate.setDate($date + 1);





        var toDayYear = [$DATE.getFullYear(), $DATE.getMonth() + 1, 0].join('-').toTime();
        var dayYear = [$year, $month, 0].join('-').toTime();

        if ($date > $DATE.getDate() && toDayYear == dayYear) {   //不可用
          dayInfo = {
            day: $date,
            name: '',
            klass: 'disabled',
            style: {
              color: '',
              bg: ''
            },
            early: '',
            night: ''
          };
        }


        for (let item = 0; item < data.length; item++) {
          let $item = data[item];
          let _day = parseInt(($item.date).split('-')[2]);
          if ($date == _day) {
            if ($item.dayList) {
              if ($item.dayList.length == 1) {
                let dayList = $item.dayList[0];
                let $type = leaveTypeObj[dayList.type];
                dayInfo = {
                  day: $date,
                  date: $item.date,
                  name: $type.name,
                  type: dayList.type,
                  style: $type.style
                };
              }
            } else {
              dayInfo = {
                day: $date,
                date: $item.date,
                name: '正常',
                type: 0,
                style: {
                  bg: '#e8fff6',
                  color: '#23d183'
                }
              };
            }

            dayInfo.early = $item.fristTime == '未签到'?['未签到', '#ed6b6a']:[$item.fristTime, '#bdbdbd'];
            dayInfo.night = $item.lastTime == '未签退'?['未签退', '#ed6b6a']:[$item.lastTime, '#bdbdbd'];
            // if ($item.fristTime == '未签到') {
            //   dayInfo.early = ['未签到', '#ed6b6a'];
            // } else {
            //   dayInfo.early = [$item.fristTime, '#bdbdbd'];
            // }
            // if ($item.lastTime == '未签退') {
            //   dayInfo.night = ['未签退', '#ed6b6a'];
            // } else {
            //   dayInfo.night = [$item.lastTime, '#bdbdbd'];
            // }
          }
        }
        if (j % 7 == 0 || (j + 1) % 7 == 0) {  //周六或周日
          // dayInfo.record.name = "休息";
          dayInfo.klass = 'enabled';
          if ((j) % 7 == 0) {
            dayInfo.last = 'weekend diurnal';
          } else {
            dayInfo.last = 'weekend sat';
          }
        }

        if (af || bf) {
          dayInfo.disabled = true;   //是否本月日历之外
        }

        this.date.push(dayInfo);
      }
    },
    closeModal() {
      this.$refs.form.resetFields();
      this.disabled = false;
    }
  }
};

</script>

