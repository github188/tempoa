<template>
  <div>
    <v-panel>
      <el-form id="searchPanel" ref="formInline" :model="form" label-width="95px" :inline="true">
        <el-form-item label="部门：">
          <el-cascader clearable
          :options="departCascader"
          :change-on-select="true"
          :show-all-levels="false"
          :props="{
              value: 'id',
              label: 'name',
              children: 'children'
            }"
            v-model="depId">
          </el-cascader>
        </el-form-item>

        <el-form-item label="常驻地：">
          <el-select v-model="form.address" placeholder="请选择">
            <el-option label="1" value="深圳">
            </el-option>
            <el-option label="0" value="全部">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="姓名：">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="日期：">
          <el-date-picker type="date" :editable="false" @change="getList(pages.pageNum)" placeholder="选择日期" format="yyyy-MM-dd" v-model="form.date"></el-date-picker>
        </el-form-item>

        <div></div>

        <el-form-item label="首次打卡：">
          <el-time-picker class="search-time" popper-class="search-time-panel" v-model="form.fbegin" format="HH:mm">
          </el-time-picker>
          <el-time-picker class="search-time" popper-class="search-time-panel" v-model="form.fend" format="HH:mm">
          </el-time-picker>
        </el-form-item>

        <el-form-item label="末次打卡：" style="margin-left: -13px;">
          <el-time-picker class="search-time" popper-class="search-time-panel" v-model="form.lbegin" format="HH:mm">
          </el-time-picker>
          <el-time-picker class="search-time" popper-class="search-time-panel" v-model="form.lend" format="HH:mm">
          </el-time-picker>
        </el-form-item>
        <button type="button" @click="getList(pages.pageNum)" class="btn btn-green" style="margin-top:4px; margin-left: 10px;">查询</button>
      </el-form>
    </v-panel>

    <v-panel>
      <el-table :data="dataList" border>
        <el-table-column label="员工信息" align="center">
          <el-table-column prop="name" label="姓名" align="center">
          </el-table-column>
          <el-table-column prop="depName" label="部门" align="center">
          </el-table-column>
          <el-table-column prop="address" label="常住地" align="center">
          </el-table-column>
        </el-table-column>
        <el-table-column label="前一天" align="center">
          <el-table-column prop="lastday" :formatter="lastday" label="末次打卡" align="center">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="weekAndDay" align="center">
          <el-table-column :formatter="fristTime" prop="fristTime" label="首次打卡" align="center">
          </el-table-column>
          <el-table-column :formatter="lastTime" prop="lastTime" label="末次打卡" align="center">
          </el-table-column>
          <el-table-column :formatter="cwaName" prop="cwaName" label="考勤状态" align="center">
          </el-table-column>
        </el-table-column>
      </el-table>
      <el-pagination style="margin-top:30px; margin-bottom:10px" @current-change="changeSize" :current-page="pages.pageIndex" :page-size="10" layout="total,  prev, pager, next, jumper" :total="pages.totals">
      </el-pagination>
    </v-panel>
  </div>
</template>
<style>
#searchPanel .el-input__inner,
#searchPanel .el-date-editor.el-input {
  width: 150px;
}

#searchPanel .search-time .el-input__icon {
  display: none;
}

#searchPanel .search-time {
  width: 80px !important;
}

#searchPanel .search-time .el-input__inner {
  width: 68px;
  padding-right: 0;
}

.search-time-panel {
  width: 120px !important;
}
</style>
<script>
export default {
  name: 'punch',
  data() {
    return {
      departCascader: [], //部门树
      depId: [],
      dataList: [],
      pages: {
        totals: 0,
        pageIndex: 1,
        pageNum: 1
      },
      weekAndDay: '',
      form: {
        depId: '',
        date: new Date(),
        name: '',
        address: '深圳',
        fbegin: '',
        fend: '',
        lbegin: '',
        lend: ''
      }
    };
  },
  created() {
    this.getDepartment();
    this.getList(this.pages.pageNum);
  },
  methods: {
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
    getDate(date) {
      let _date = date.toString().split(' ');
      return {
        date: _date[0],
        time: _date[1]
      };
    },
    getList(pageNum) {

      let { address, name, date, fbegin, fend, lbegin, lend } = this.form;
      let params = {
        depId: this.depId[this.depId.length - 1] || 1,
        pageSize: 10,
        pageNum,
        address,
        name,
        date: this.getDate(date).date,
        fbegin: this.getDate(fbegin).time,
        fend: this.getDate(fend).time,
        lbegin: this.getDate(lbegin).time,
        lend: this.getDate(lend).time
      };
      this.ajax({
        url: '/cwa/attendance/pc/list',
        data: Utils.filterObjectNull(params),
        success(data, $this) {
          if (data.code == 'success') {
            $this.pages.totals = data.totals;
            $this.pages.pageIndex = data.pageIndex;
            $this.dataList = data.content;
            $this.getWeekbyDay();
          } else {
            $this.errorTips(data.message);
          }
        }
      });
    },
    changeSize(num) {
      this.pages.pageNum = num;
      this.getList(num);
    },
    fillNull(value) {
      if (!value) {
        return '无记录';
      }
      return value;
    },
    getWeekbyDay(){
      let { date } = this.form;
      let day = new Date(date).getDay();
      var today = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
      this.weekAndDay = `${this.getDate(date).date} 星期（${today[day]}）`;
    },
    fristTime(row, b, c) {
      return this.fillNull(c);
    },
    lastTime(row, b, c) {
      return  this.fillNull(c);
    },
    cwaName(row, b, c) {
      return this.fillNull(c);
    },
    lastday(row, b, c){
      return this.fillNull(c);
    }
  }
};
</script>
