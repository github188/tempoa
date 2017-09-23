<template>
  <div>
    <v-panel>
      <div>
        <el-form ref="formInline" :model="form" label-width="80px" :inline="true">
           <el-form-item label="部门：">
              <el-cascader style="width: 140px"
                :options="departCascader"
                :change-on-select="true"
                :show-all-levels="false"
                :props="{
                    value: 'id',
                    label: 'name',
                    children: 'children'
                  }"
                  v-model="form.depId">
              </el-cascader>
          </el-form-item>

          <el-form-item label="月份：">
            <el-date-picker style="width: 140px;"
            :editable="false"
            :picker-options="pickerOptions"
            @change="getMonth"
            v-model="form.month" type="month" placeholder="选择月">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="姓名：">
            <el-input style="width: 140px;" v-model="form.name"></el-input>
          </el-form-item>
          <button type="button" @click="getList" class="btn btn-green" style="margin-top:4px; margin-left: 10px;">查询</button>

          <div class="pull-right">
            <button v-for="(item, index) in button" :key="index" type="button" @click="submitReport(item.url)" class="btn btn-space" style="margin-top:4px; margin-left: 10px;">{{item.name}}</button>
          </div>
        </el-form>

      </div>
    </v-panel>

    <v-panel>
      <div id="tableList"></div>
    </v-panel>

    <el-dialog title="考勤详情" :visible.sync="modal" size="small" @close="closeModal" class="calendar-modal">
      <calendar ref="calendar" :edit="true"></calendar>
    </el-dialog>

  </div>
</template>
<style scoped>
  .department {
    width: 300px;
    float: left;
  }
  .panel {
    overflow: hidden;
  }
</style>
<style>
  .calendar-modal .el-dialog {
    width: 1300px;
    height: 700px;
  }

</style>
<script>
import calendar from '@/components/Calendar';  //日历考勤
export default {
  name: 'report',
  components: {
    calendar
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
      modal: false,
      button: [],
      departCascader: [],  // 部门树
      form: {
        month: date.getFullYear() + '-' + (month.length == 1 ? '0' + month : month),
        name: '',
        depId: []
      }
    };
  },
  created() {
    this.getList();
    this.getDepartment();
  },
  mounted() {

    this.getButton((data) => { //获取当前用户看到的按钮
      this.button = data;
    });

  },
  methods: {
    // treeClick(a) {
    //   this.form.depId = a.id;
    // },
    getDepartment() { // 获取部门树
      this.ajax({
        url: '/authority/dep/tree/list',
        success(data, $this) {
          if (data.code == "success") {
            $this.departCascader = $this.delTree(data.content);
          }
        }
      });
    },
    getMonth(month) {
      this.form.month = month;
    },
    getType(id) {
      this.ajax({   //获取请假类型
        url: 'ctm/setting/param/list',
        data: {
          code: 'cwa_leave_type'
        },
        success(data, $this) {
          if (data.code == 'success') {
            $this.getData(id, $this.form.month, data.content);
          }
        }
      });
    },
    getData(id, month, type) {  //用户的出勤数据
      this.ajax({
        url: '/cwa/attendance/list',
        data: {
          month: month,
          userId: id
        },
        success(data, $this) {
          if (data.code == 'success') {
            $this.$refs.calendar.dateList(month, data.content, type, id);
          }
        }
      });
    },
    submitReport(id) {  //发送考勤邮件或导出报表
      let object = this.form;
      if (id == 'exportReport') {  //导出
        Utils.exportReport('/cwa/attendance/all/export', object);
      } else if (id == 'sendEmail') {  //发送考勤邮件
        this.ajax({
          url: '/cwa/attendance/sendemail',
          data: {
            month: object.month
          },
          type: 'get',
          success(data, $this) {
            if (data.code == 'success') {
              $this.$message({
                type: 'success',
                message: '发送成功！'
              });
            }
          }
        });
      }
    },
    getList() {
      const $this = this;
      const { month, name, depId } = this.form;
      let params = {
        month,
        name,
        depId: depId[depId.length - 1]
      };
      this.tableList({
        url: '/cwa/attendance/atten/list',
        data: Utils.filterObjectNull(params),
        columns: [{
          name: "姓名",
          value: "userRealname"
        }, {
          name: "工号",
          value: "usercode"
        }, {
          name: '部门',
          value: 'depName'
        }, {
          name: '正常',
          value: 'normal'
        }, {
          name: '周末加班',
          value: 'overtime'
        }, {
          name: '节假日加班',
          width: 100,
          value: 'overtimeHoli'
        }, {
          name: '出差',
          value: 'travel'
        }, {
          name: '年休假',
          value: 'leave0'
        }, {
          name: '调休假',
          value: 'leave1'
        }, {
          name: '病假',
          value: 'leave2'
        }, {
          name: '事假',
          value: 'leave3'
        }, {
          name: '有薪假',
          value: 'leave4'
        }, {
          name: '操作',
          operator(row) {
            return [{
              name: '详情',
              click(row) {
                $this.modal = true;
                $this.getType(row.userId);
              }
            }];
          }
        }]
      });
    },
    closeModal() {
      this.$refs.calendar.modal = false;
    }
  }
};
</script>
