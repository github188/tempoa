<template>
  <div>
    <ul id="calendar">
      <li class="calendar-list calendar-week" v-for="(item, index) in week" :key="index">周&nbsp;&nbsp;{{item}}</li>
      <template v-if="date.length == 0">
        <div class="no-data" v-loading="false"></div>
      </template>

      <li v-else class="calendar-list" v-for="(item, index) in date" :key="index" :class="(item.last?item.last:'workday')">
        <div v-if="item.disabled" class="disabled"></div>
        <div v-else :class="item.record.klass">
          <template v-if="Array.isArray(item.record)">
            <!-- 存在多条数据 -->
            <div class="calendar-list-box calendar-list-all">
              <el-tooltip placement="top" effect="light" :disabled="!item.record[0].remark">
                <div slot="content" class="edit-record" v-if="item.record.remark">
                  <p>时间: {{item.record[0].remark.split('##')[2]}}</p>
                  <p>事项: {{item.record[0].remark.split('##')[0]}}</p>
                  <p>原因: {{item.record[0].remark.split('##')[1]}}</p>
                </div>
                <template v-if="edit">
                  <div title="修改" class="name" @click="editHandel(item.record.id, item.day)" :style="{'cursor':'pointer' ,'color': item.record[0].color, 'background': item.record[0].bg}">{{item.record[0].name}}
                  </div>
                  <div title="修改" class="name" @click="editHandel(item.record.id, item.day)" :style="{'top':'54px', 'cursor':'pointer', 'color': item.record[1].color, 'background': item.record[1].bg}">{{item.record[1].name}}
                  </div>
                </template>
                <template v-else>
                  <div class="name" :style="{'color': item.record[0].color, 'background': item.record[0].bg}">{{item.record[0].name}}</div>
                  <div class="name" style="top:54px;" :style="{'color': item.record[1].color, 'background': item.record[1].bg}">{{item.record[1].name}}</div>
                </template>
                <span class="date">{{item.date}}</span>

                <template v-if="item.record[0].sign">
                  <template v-if="item.record[0].sign.noPunch">
                    <span class="sign early" :style="{'color': item.record[0].sign.noPunch[1]}">{{item.record[0].sign.noPunch[0]}}</span>
                  </template>
                  <template v-else>
                    <span class="sign early" :style="{'color': item.record[0].sign.early[1]}">
                      {{item.record[0].sign.early[0]}}</span>
                    <span class="sign night" :style="{'color': item.record[0].sign.night[1]}">{{item.record[0].sign.night[0]}}</span>
                  </template>
                </template>
              </el-tooltip>
            </div>
          </template>

          <template v-else>
            <!-- 只有一条数据 -->
            <el-tooltip placement="top" effect="light" :disabled="!item.record.remark">
              <div slot="content" class="edit-record" v-if="item.record.remark">
                <p>时间: {{item.record.remark.split('##')[2]}}</p>
                <p>事项: {{item.record.remark.split('##')[0]}}</p>
                <p>原因: {{item.record.remark.split('##')[1]}}</p>
              </div>

              <div class="calendar-list-box calendar-list-all">
                <div class="edit-tag" v-if="item.record.remark"></div>
                <template v-if="edit">
                  <div title="修改" class="name" @click="editHandel(item.record.id, item.day)" :style="{'cursor': 'pointer','color': item.record.color, 'background': item.record.bg}">{{item.record.time==0.5? item.record.name+ 0.5:item.record.name}}</div>
                  <span class="date">{{item.date}}</span>
                </template>

                <template v-else>
                  <div class="name" :style="{'color': item.record.color, 'background': item.record.bg}">
                    {{item.record.time==0.5? item.record.name+ 0.5:item.record.name}}</div>
                  <span class="date">{{item.date}}</span>
                </template>

                <template v-if="item.record.sign">
                  <template v-if="item.record.sign.noPunch">
                    <span class="sign early" :style="{'color': item.record.sign.noPunch[1]}">{{item.record.sign.noPunch[0]}}</span>
                  </template>

                  <template v-else>
                    <span class="sign early" :style="{'color': item.record.sign.early[1]}">
                      {{item.record.sign.early[0]}}</span>
                    <span class="sign night" :style="{'color': item.record.sign.night[1]}">{{item.record.sign.night[0]}}</span>
                  </template>
                </template>
              </div>
            </el-tooltip>
          </template>
        </div>
      </li>
    </ul>

    <el-dialog title="修改考勤记录" :visible.sync="modal" size="tiny" class="edit-calendar-modal" :modal="false">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px" label-position="right">
        <el-form-item label="状态：" prop="type">
          <el-select v-model="form.type" class="select-area w-100">
            <el-option v-for="item in affairsType" :key="item.id" :label="item.name" :value="item.value +'|'+ item.name">
            </el-option>
          </el-select>
          <!-- <v-affairs @change="getAffairs"></v-affairs> -->
          <!-- <span :class="[day == 0? 'error': '']" v-if="form.type == 4" style="padding-left: 10px">剩余年休假 {{day}} 天</span>
            <span :class="[day == 0? 'error': '']" v-if="form.type == 5" style="padding-left: 10px">剩余调休假 {{day}} 天</span> -->
        </el-form-item>

        <el-form-item label="时长：" prop="time">
          <el-select class="w-100" v-model="form.time" placeholder="请选择">
            <el-option label="1天" value="1"></el-option>
            <el-option label="0.5天" value="0.5"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="修改备注：" prop="remark">
          <el-input v-model="form.remark" type="textarea"></el-input>
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

.edit-record p {
  line-height: 25px;
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
      affairsType: [],  //考勤类型数据
      modal: false,
      // day: '', //假期剩余天数
      form: {
        remark: '',
        type: '', //修改类型
        time: '', //时长
        userId: '', //用户id
        typeName: '',
        id: '',
        date: '' //修改的那一天
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
        remark: [{
          required: true,
          message: '修改备注不能为空！'
        }],
      }
    };
  },
  props: ['edit', 'getType'],
  methods: {
    getAffairs(obj) { //获取请假类型
      // this.form.type = obj.value;
      // this.form.typeName = obj.name;
    },
    editHandel(id, date) {
      this.modal = true;
      this.form.id = id;
      this.form.date = date;
    },
    submit() { //修改考勤记录
      this.$refs.form.validate((valid) => {
        if (valid) {
          let { type } = this.form;
          let params = this.form;
          params.type = type.split('|')[0];
          params.typeName = type.split('|')[1];
          this.disable = true;
          this.ajax({
            url: '/cwa/attendance/update',
            type: 'put',
            data: Utils.filterObjectNull(params),
            success(data, $this) {
              if (data.code == 'success') {
                $this.successTips('修改成功');
                $this.modal = false;
                $this.$emit('getType', $this.form.userId);
                $this.resetForm('form');
              } else {
                $this.errorTips(data.message);
              }
            }
          });
        }
      });
    },
    dateList(month, data, type, id) {
      this.affairsType = type;
      this.date = [];
      this.form.userId = id;
      if (!month) {
        return;
      }
      let DATE = month.split('-'); //传过来的日期
      let $year = DATE[0]; //年
      let $month = DATE[1]; //月
      let activeDate = new Date($year, $month - 1, 1);
      let bf = true,
        af = false;
      activeDate.setDate(1);
      activeDate.setDate(1 - activeDate.getDay());
      let leaveTypeObj = {}; //请假类型
      let leaveType = type;
      for (let type = 0; type < leaveType.length; type++) {
        let value = leaveType[type].value; //考勤类型
        leaveTypeObj[value] = {
          name: leaveType[type].name,
          value: leaveType[type].value,
          style: (function() {
            if (leaveType[type].value == 2 || value == 9) { //加班
              return {
                bg: '#ffe6e6',
                color: '#f46564'
              };
            }
            if (leaveType[type].value == 3) { //出差
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
            if (value >= 4 && value != 9) { //请假
              return {
                bg: '#e8f8ff',
                color: '#4bb5f8'
              };
            }
            return { //正常
              bg: '#e8fff6',
              color: '#23d183'
            };
          })()
        };
      }
      for (var j = 0; j < 42; j++) {
        var $date = activeDate.getDate(); //每月的日期
        if ($date == 1) {
          if (bf) {
            bf = false;
          } else {
            af = true;
          }
        }
        activeDate.setDate($date + 1);
        let dayInfo = { //每天对应的信息
          date: $date,
          day: [$year, $month, ($date.toString()).length == 1 ? '0' + $date : $date].join('-'),
          record: {
            name: '',
            klass: 'disabled'
          }
        };
        if (af || bf) {
          dayInfo.disabled = true; //是否本月日历之外
        }
        var tempDay = [];
        for (let day = 0; day < data.length; day++) { //获取当月数据
          let $day = data[day];
          let dayList = $day.dayList;
          if ([$year, $month, $date].join('-').toTime() === ($day.date).toTime()) {
            tempDay.push({
              date: $day.date, //日期
              fristTime: $day.fristTime,
              lastTime: $day.lastTime,
              status: $day.status,
              dayList: dayList
            });
          }
        }
        if ((j) % 7 == 0 || (j + 1) % 7 == 0) { //周六或周日
          // dayInfo.record.name = "休息";
          dayInfo.record.klass = 'enabled';
          if ((j) % 7 == 0) {
            dayInfo.last = 'weekend diurnal';
          } else {
            dayInfo.last = 'weekend sat';
          }
        }
        let toDayYear = [new Date().getFullYear(), new Date().getMonth() + 1, 0].join('-').toTime();
        let dayYear = [$year, $month, 0].join('-').toTime();
        if ($date > new Date().getDate() && toDayYear == dayYear) { //不可用
          dayInfo.record = {
            name: '',
            klass: 'disabled',
            type: 0,
            half: false
          };
        }
        for (let temp = 0; temp < tempDay.length; temp++) {
          let dayList = tempDay[temp].dayList;
          let sign = {};
          let fristTime = tempDay[temp].fristTime;
          let lastTime = tempDay[temp].lastTime;
          let status = tempDay[temp].status;
          if (status == 0) {
            sign.noPunch = ['未打卡', '#ed6b6a'];
          } else if (status == 1) { //未签退
            sign.early = [fristTime, '#bdbdbd'];
            sign.night = ['未签退', '#ed6b6a'];
          } else if (status == 2) { //未签到
            sign.early = ['未签到', '#ed6b6a'];
            sign.night = [lastTime, '#bdbdbd'];
          } else if (status == 3) { //完美
            sign.early = [fristTime, '#bdbdbd'];
            sign.night = [lastTime, '#bdbdbd'];
          }
          if (dayList) {
            if (dayList.length == 1) { // 非正常全天
              let style = leaveTypeObj[dayList[0].type];
              dayInfo.record = {
                id: dayList[0].id,
                time: dayList[0].time,
                name: style.name,
                type: style.value,
                bg: style.style.bg,
                color: style.style.color,
                sign: sign,
                klass: 'enabled',
                half: false,
                remark: dayList[0].remark
              };
            } else if (dayList.length >= 2) {
              dayInfo.record = [];
              for (let g = 0; g < dayList.length; g++) {
                let style = leaveTypeObj[dayList[g].type];
                dayInfo.record.push({
                  id: dayList[g].id,
                  time: dayList[g].time,
                  name: style.name,
                  type: style.value,
                  bg: style.style.bg,
                  color: style.style.color,
                  sign: sign,
                  klass: 'enabled',
                  half: true,
                  remark: dayList[g].remark
                });
              }
            }
          } else {
            let toDayYear = [new Date().getFullYear(), new Date().getMonth() + 1, 0].join('-').toTime();
            let dayYear = [$year, $month, 0].join('-').toTime();
            if ($date > new Date().getDate() && toDayYear == dayYear) {   //大于当前日期为不可用
              dayInfo.record = {
                name: '',
                klass: 'disabled',
                type: 0,
                half: false
              };
            }
            // else if(dayInfo.rest){  //周末休息
            // dayInfo.record =  {
            //     name: '休息',
            //     sign:sign,
            //     half: false
            // }
            // }
            else {
              dayInfo.record = {
                name: '正常',
                type: 0,
                bg: '#e8fff6',
                color: '#23d183',
                sign: sign,
                klass: 'enabled',
                half: false
              };

            }
          }
        }
        this.date.push(dayInfo);
      }
    }
  }
};
</script>


