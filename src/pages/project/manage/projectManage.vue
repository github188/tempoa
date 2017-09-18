<template>
  <div>
    <v-panel class="search-panel">
      <el-form ref="formInline" :model="form" label-width="120px" :inline="true">
        <el-form-item label="项目归属：">
          <v-choose type="radio" @change="getChoose" :data="tabChoose"></v-choose>
        </el-form-item>

        <div>
          <el-form-item label="营销中心：">
            <v-market ref="market" @change="getMarket" style="width:160px"></v-market>
          </el-form-item>

          <el-form-item label="区域：">
            <v-area ref="area" @change="getArea"></v-area>
          </el-form-item>

          <el-form-item label="负责人：">
            <el-input v-model="form.peopleName"></el-input>
          </el-form-item>

          <el-form-item label="项目状态：">
            <el-select v-model="form.proStatus" clearable placeholder="请选择" style="width:160px">
              <el-option v-for="item in projectAll" :key="item.id" :label="item.name" :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="项目名称/编号：">
            <el-input v-model="form.proMsg"></el-input>
          </el-form-item>
        </div>
      </el-form>

      <div class="search-box">
        <button type="button" @click="getList" class="btn btn-green">查询</button>
      </div>
    </v-panel>

    <v-panel title="项目">
      <div slot="button">
        <el-button v-for="(item, index) in buttonList" :key="index" type="info" @click="btnHandle(item.url)">{{item.name}}</el-button>
      </div>
      <div id="tableList"></div>
    </v-panel>
    <v-add ref="projectAdd" @getList="getList" title="新增项目"></v-add>
    <v-detail ref="projectDetail" @getList="getList"></v-detail>
    <v-demandAdd ref="demandAdd"></v-demandAdd>
  </div>
</template>

<script>
import ProjectAdd from './projectAdd';
import ProjectDetail from './projectDetail';
import DemandAdd from '../demand/demandAdd';
export default {
  name: 'projectManage',
  components: {
    'v-add': ProjectAdd,
    'v-detail': ProjectDetail,
    'v-demandAdd': DemandAdd
  },
  created() {
    this.getProjectStatus();
  },
  mounted() {
    this.getList();
    this.getButton((button)=>{
      this.buttonList = button;
    });
  },
  data() {
    return {
      form: {
        marktId: '',  //营销中心id
        proStatus: '', //选中的项目状态
        proMsg: '',  //项目名称
        scope: '1',  //项目归属
        peopleName: '', //项目负责人
      },
      buttonList: [],
      tabChoose: [{ name: "所有项目", value: 1 }, { name: "我负责的", value: 2 }],
      projectAll: []  //所有的项目状态
    };
  },
  methods: {
    getMarket(object) {
      this.form.marktId = object.value;  //获取营销中心 id
    },
    getArea(obj) {
      this.form.provinceId = obj.province.value;
      this.form.cityId = obj.city.value;
      this.form.areaId = obj.area.value;
    },
    getChoose(value) {
      this.form.scope = value;
    },
    getList() {
      const data = Utils.filterObjectNull(this.form);  //过滤值为空的对象
      const $this = this;
      this.tableList({
        columns: [
          {
            name: '项目编号',
            value: 'proCode',
            width: 150,
          },
          {
            name: '项目名称',
            value: 'proName',
          },
          {
            name: '片区',
            value: 'marktName',
          },
          {
            name: '区域',
            width: 250,
            render(row) {
              return (row.province + '-' + row.city + '-' + row.area).trimAll();
            }
          },
          {
            name: '市场负责人',
            value: 'marktPersonName'
          },
          {
            name: '项目经理',
            value: 'managePersonName'
          },
          {
            name: '项目状态',
            value: 'proStatusName'
          },
          {
            name: '需求',
            value: 'requireCount'
          },
          {
            name: '操作',
            operator(){
              return [{
                name: '详情',
                click(row){
                  console.log(row);
                  $this.$refs.projectDetail.openModal(row);
                }
              },{
                name: '新建需求',
                click(row){
                  $this.$refs.demandAdd.openModal(row);
                }
              }];
            }
          }
        ],
        url: '/pmo/project/list',
        data: data,
        element: '#tableList'
      });
    },
    getProjectStatus() {
      this.ajax({//获取项目状态
        url: '/pmo/common/project/status/pmo_project_status',
        success(data, $this) {
          if (data.code == 'success') {
            $this.projectAll = data.content;
          }
        }
      });
    },
    btnHandle(url){
      if(url == 'pmo_add_project'){  //新增
       this.$refs.projectAdd.openModal();
      }else if(url == 'pmo_export_project'){  //导出
       this.exportReport('/pmo/project/download/excel', this.form);
      }
    },
  }
};
</script>
