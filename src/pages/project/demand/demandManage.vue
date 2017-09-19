<template>
  <div>
    <v-panel class="search-panel">
      <el-form ref="formInline" :model="form" label-width="120px" :inline="true">
        <div>
          <el-form-item label="项目归属：">
            <v-choose type="radio" @change="getChoose" :data="tabChoose"></v-choose>
          </el-form-item>
        </div>

        <el-form-item label="项目名称/编号：">
          <el-input v-model="form.proInfo"></el-input>
        </el-form-item>

        <el-form-item label="发起人：">
          <el-input v-model="form.addPerson"></el-input>
        </el-form-item>

        <el-form-item label="需求接收人：">
          <el-input v-model="form.receivePerson"></el-input>
        </el-form-item>
        <div>
          <el-form-item label="是否紧急：">
            <el-select clearable v-model="form.reqEmergency" placeholder="请选择">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="发起时间：">
            <el-date-picker v-model="form.startTime" type="date" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="需求状态：">
            <el-select v-model="form.actId" clearable placeholder="请选择">
              <el-option v-for="item in pmoStatus" :key="item.code" :label="item.name" :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
        </div>

      </el-form>
      <div class="search-box">
        <button type="button" @click="getList" class="btn btn-green">查询</button>
      </div>
    </v-panel>

    <v-panel title="需求管理">
      <div slot="button">
        <el-button v-for="(item, index) in buttonList" :key="index" type="info" @click="btnHandle(item.url)">{{item.name}}</el-button>
      </div>
      <div id="tableList"></div>
    </v-panel>

    <v-demandAdd ref="demandAdd"></v-demandAdd>
    <v-demandDetail ref="demandDetail"></v-demandDetail>
  </div>
</template>

<script>
import DemandAdd from './demandAdd';
import DemandDetail from './demandDetail';
export default {
  name: 'projectManage',
  components: {
    'v-demandAdd': DemandAdd,
    'v-demandDetail': DemandDetail
  },
  data() {
    return {
      tabChoose: [{
        name: '全部',
        value: 1
      }, {
        name: '我提出的',
        value: 2
      }, {
        name: '待我处理的',
        value: 3
      }],
      pmoStatus: [],
      buttonList: [],
      form: {
        scope: '',
        proInfo: '',  //名称编号
        addPerson: '',  //发起人
        receivePerson: '',  //需求接收人
        reqEmergency: '',  //是否紧急
        startTime: '',//   发起时间
        actId: ''  //需求状态
      }
    };
  },
  created() {
    this.getPmoStatus();
    this.getList();
  },
  mounted() {
    this.getButton((button) => {   //获取当前用户的按钮权限
      this.buttonList = button;
    });
  },
  methods: {
    getChoose(value) {
      this.form.scope = value;
    },
    getList() {
      const $this = this;
      this.tableList({
        url: '/pmo/require/list',
        data: Utils.filterObjectNull(this.form),
        columns: [{
          name: '所属项目',
          value: 'proName'
        }, {
          name: '需求名称',
          value: 'reqTitle'
        }, {
          name: '需求编号',
          value: 'reqCode',
          width: 190
        }, {
          name: '发起人',
          value: 'addPersonName',
          width: 120
        }, {
          name: '发起时间',
          width: 120,
          render(row) {
            let date = parseInt(row.startTime);
            return new Date(date).toDay();
          }
        }, {
          name: '需求接收人',
          value: 'receivePersonName',
          width: 120
        }, {
          name: '是否紧急',
          width: 100,
          render(row) {
            let reqEmergency = row.reqEmergency;
            return ['是', '否'][reqEmergency-1];
          }
        }, {
          name: '需求状态',
          value: 'actName',
          width: 100
        },{
          name: '操作',
          operator(){
            return [{
              name: '详情',
              click(row){
                // this.$refs.demandDetail.openModal(row);
              }
            }];
          }
        }]
      });
    },
    getPmoStatus() {
      this.ajax({
        url: '/pmo/common/project/status/pmo_require_status',
        success(data, $this) {
          if (data.code == 'success') {
            $this.pmoStatus = data.content;
          }
        }
      });
    },
    btnHandle(url) {
      if (url == 'pmo_add_demand') {
        this.$refs.demandAdd.openModal();
      }
    }
  }
};
</script>
