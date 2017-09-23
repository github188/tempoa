<template>
  <div>
      <!-- <el-form ref="formInline" :model="form" label-width="60px" :inline="true">
          <el-form-item label="月份：">
            <el-date-picker style="cursor:pointer" :editable="false" @change="chooseMonth" :picker-options="pickerOptions" v-model="form.month" type="month" placeholder="选择月">
            </el-date-picker>
          </el-form-item>

          <div class="operator-panel">
            <button type="button" @click="openLeavel" class="btn btn-space">+&nbsp;请假</button>
            <button type="button" @click="openOvertime" class="btn btn-space">+&nbsp;加班</button>
            <button type="button" @click="openAway" class="btn btn-space">+&nbsp;出差</button>
          </div>

        </el-form> -->

      <div class="human-attendance">
        <ul>
          <li class="human-calendar">
            <p id="layYear">{{form.yearHead}}</p>
            <div class="human-calendar-choose">
              <a title="前一月" class="h-prev" @click="prevMonth" href="javascript:;"></a>
              <span id="layDate" class="human-calendar-month">{{form.monthHead}}</span>
              <em class="human-calendar-text">月</em>
              <el-date-picker @change="chooseMonth" :picker-options="pickerOptions" v-model="form.month" popper-class="popper-choose-calendar" class="month-choose-calendar" type="month"></el-date-picker>
              <a title="后一月" :disabled="noChoose" class="h-next" @click="nextMonth"  href="javascript:;"></a>
            </div>
          </li>
          <li>
            <p>正常打卡</p>
            <div class="human-calendar-count">{{summary.normal}}</div>
          </li>
          <li>
            <p>未打卡</p>
            <div class="human-calendar-count h-red">{{summary.noPunch}}</div>
          </li>
          <li>
            <p>未签到</p>
            <div class="human-calendar-count h-red">{{summary.noFrist}}</div>
          </li>
          <li>
            <p>未签退</p>
            <div class="human-calendar-count h-red">{{summary.noLast}}</div>
          </li>
          <li></li>
          <li></li>
          <li></li>
          <li>
            <p>剩余年假</p>
            <div class="human-calendar-count">{{summary.annual}}</div>
          </li>
          <li>
            <p>剩余调休假</p>
            <div class="human-calendar-count">{{summary.takeoff}}</div>
          </li>
          <li style="width: 100px;">
            <p>应出勤</p>
            <div class="human-calendar-count">{{summary.workday}}</div>
          </li>
          <li>
            <p>正常出勤</p>
            <div class="human-calendar-count">{{report.normal}}</div>
          </li>
          <li>
            <p>加班</p>
            <div class="human-calendar-count">{{report &&　report.overtime + report　&& report.overtimeHoli}}</div>
          </li>
          <li>
            <p>出差</p>
            <div class="human-calendar-count">{{report.travel}}</div>
          </li>
          <li>
            <p>外出</p>
            <div class="human-calendar-count">{{report.outside}}</div>
          </li>
          <li>
            <p>年休假</p>
            <div class="human-calendar-count">{{report.leave0}}</div>
          </li>
          <li>
            <p>调休假</p>
            <div class="human-calendar-count">{{report.leave1}}</div>
          </li>
          <li>
            <p>病假</p>
            <div class="human-calendar-count">{{report.leave2}}</div>
          </li>
          <li>
            <p>事假</p>
            <div class="human-calendar-count">{{report.leave3}}</div>
          </li>
          <li>
            <p>有薪假</p>
            <div class="human-calendar-count">{{report.leave4}}</div>
          </li>
        </ul>

        <div class="human-operator">
          <button class="ask-for-leave" @click="openLeavel">请假</button>
          <button class="over-time" @click="openOvertime" >加班</button>
          <button class="away-official" @click="openAway">出差</button>
          <button class="be-out" @click="openOutOff">外出</button>
        </div>
      </div>

    <v-panel>
      <calendar ref="calendar"></calendar>
    </v-panel>

    <leave ref="leaveModal"></leave>
    <overtime ref="overtimeModal"></overtime>
    <awayOffcial ref="awayModal"></awayOffcial>
    <outOff ref="outOffModal"></outOff>
    </div>
</template>
<style scoped>
.human-attendance {
  background: #fff;
  padding-top: 24px;
}

.human-attendance ul {
  height: 275px;
  padding: 0;
  border-bottom: 1px solid #e8e9e8;
  margin: 0 24px;
}

.human-attendance ul li {
  float: left;
  width: 10%;
  height: 110px;
  list-style: none;
  text-align: center;
  margin-bottom: 24px;
}

.human-attendance ul li p {
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  margin: 0;
  color: rgba(0, 0, 0, 0.6);
}

.human-attendance ul li .human-calendar-count {
  line-height: 70px;
  position: relative;
  font-size: 22px;
  color: #3e3e3e;
  font-family: cursive;
}

.human-attendance ul li .human-calendar-count.h-red {
  color: #f35857 !important;
}

.human-attendance ul li.human-calendar {
  border: 1px solid #01cd78;
  width: 100px;
}

.human-attendance ul li.human-calendar p {
  color: #01cd78;
  background-color: #ccffea;
  border-bottom: 1px solid #01cd78;
  font-size: 14px;
}

.human-calendar-choose {
  line-height: 70px;
  position: relative;
}

.human-calendar-choose a {
  height: 30px;
  width: 30px;
  display: inline-block;
  background: url("../../../pages/Index/img/icon.png") no-repeat center;
  zoom: .8;
  top: 30px;
  position: absolute;
}

.human-calendar-choose a.h-prev,
.human-calendar-choose a.h-prev[disabled]:hover {
  background-position: -212px -130px;
  left: 10px;
}

.human-calendar-choose a.h-prev:hover {
  background-position: -294px -130px;
}

.human-calendar-choose a.h-next,
.human-calendar-choose a.h-next[disabled]:hover {
  background-position: -250px -130px;
  right: 10px;
}

.human-calendar-choose a.h-next:hover {
  background-position: -330px -130px;
}

.human-calendar-choose a[disabled] {
  cursor: not-allowed;
}

.human-calendar-month {
  font-size: 24px;
  color: #01cd78;
  cursor: pointer;
  display: inline-block;
  height: 68px;
  width: 50px;
  z-index: 11;
}

.human-calendar-text {
  font-size: 16px;
  font-style: normal;
  color: #222222;
  position: relative;
  left: -14px;
}

.human-operator {
  height: 80px;
  background: #fff;
  float: right;
  margin-right: 24px;
}

.human-operator button {
  cursor: pointer;
  display: inline-block;
  height: 32px;
  width: 80px;
  text-align: center;
  color: #fff;
  font-size: 14px;
  margin-left: 16px;
  border: none;
  border-radius: 4px;
  outline: none;
  margin-top: 24px;
}

.human-operator .ask-for-leave {
  background: #20a9f7;
}

.human-operator .over-time {
  background: #f35857;
}

.human-operator .away-official {
  background: #f7a039;
}

.human-operator .be-out {
  background: #ca4ef0;
}

</style>
<style>
.month-choose-calendar .el-icon-date{
  display: none;
}
.month-choose-calendar .el-input__inner{
    width: 50px;
    padding-right: 0;
    position: absolute;
    left: 25px;
    top: -95px;
    border: none;
    opacity: 0;
    cursor: pointer;
}
.month-choose-calendar .el-input__inner:hover{
  border: none;
}
.popper-choose-calendar{
  margin-top: -50px;
}
</style>

<script>
import leave from './leave';   //请假
import overtime from './overtime';  //加班
import awayOffcial from './awayOfficial';  //出差
import outOff from './outOff';  //出差
import calendar from '@/components/Calendar';  //日历考勤

export default {
  name: 'myAttendance',
  components: {
    leave,
    overtime,
    awayOffcial,
    calendar,
    outOff
  },
  data() {
    let date = new Date();
    let month = (date.getMonth() + 1).toString();
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e7;
        }
      },
      summary: {},  //考勤总结
      report: {}, //考勤报表
      noChoose: true,  //大于本月不能选择
      form: {
        monthHead: date.getMonth() + 1,
        yearHead: date.getFullYear(),
        month: date.getFullYear() + '-' + (month.length == 1 ? '0' + month : month),
        type: []
      }
    };
  },
  created() {
    this.getType();
    this.getSummary();
  },
  updated(){
    $('.human-calendar-count').each(function(a, b){
      if($(b).text() == '0'){
        $(b).css('color', 'rgb(153, 153, 153)');
      }
    });
  },
  methods: {
    getType() {
      this.ajax({   //获取请假类型
        url: 'ctm/setting/param/list',
        data: {
          code: 'cwa_leave_type'
        },
        success(data, $this) {
          if (data.code == 'success') {
            $this.getData($this.form.month);
            $this.form.type = data.content;
          }
        }
      });
    },
    getData(month) {
      this.ajax({
        url: '/cwa/attendance/list',
        data: {
          month: month,
          userId: Utils.getValue('u')
        },
        success(data, $this) {
          if (data.code == 'success') {
            $this.$refs.calendar.dateList(month, data.content, $this.form.type);
          }
        }
      });
    },
    getSummary(val){  //获取考勤总结
      this.ajax({
        url: 'cwa/attendance/my/total',
        data: {
          month: val || this.form.month,
          userId: Utils.getValue('u')
        },
        success(data, $this){
          if(data.code == 'success'){
            $this.summary = data.content;
            $this.report = data.content.report || {};
          }
        }
      });

    },
    openLeavel() {
      this.$refs.leaveModal.openModal();
    },
    openOvertime() {
      this.$refs.overtimeModal.openModal();
    },
    openAway() {
      this.$refs.awayModal.openModal();
    },
    openOutOff(){
        this.$refs.outOffModal.openModal();
    },
    prevMonth(){
      if(this.form.monthHead == 1){
        this.form.monthHead = 12;
        this.form.yearHead--;
      }else{
        this.form.monthHead--;
      }
      this.form.month = this.form.yearHead + '-' +  this.form.monthHead;
      this.noChoose = false;
    },
    nextMonth(){
      if( new Date(this.form.yearHead + '-' + (this.form.monthHead + 1)).getTime() >= new Date().getTime()){
        this.noChoose = true;
        return;
      }else{
        this.noChoose = false;
      }

      if(this.form.monthHead == 12){
        this.form.monthHead = 1;
        this.form.yearHead++;
      }else{
        this.form.monthHead++;
      }
      this.form.month = this.form.yearHead + '-' +  this.form.monthHead;
    },
    chooseMonth(val) {
      this.getData(val);
      let _val = val.split('-');
      let year = _val[0];
      let month = _val[1];
      if(month > 9){
        this.form.monthHead = month;
      }else{
        this.form.monthHead = parseInt(month);
      }
      this.form.yearHead = year;
      this.getSummary(val);
    }
  }
};
</script>
