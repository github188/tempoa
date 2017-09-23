<template>
  <div>
    <v-panel>
      <el-form id="searchPanel" ref="formInline" :model="form" label-width="100px" :inline="true">
        <el-form-item label="考勤类型：">
          <el-select clearable v-model="form.cwaType" placeholder="请选择">
            <el-option v-for="item in cwaTypeList" :key="item.value" :label="item.name" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="日期：">
            <el-date-picker type="date" placeholder="开始日期" v-model="form.starttime"></el-date-picker>
            <span>-</span>
            <el-date-picker type="date" placeholder="结束日期" v-model="form.endtime"></el-date-picker>
        </el-form-item>

        <el-form-item label="部门：">
            <el-cascader
              clearable
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

        <el-form-item label="申请人：">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <button type="button" @click="getList" class="btn btn-green" style="margin-top:4px; margin-left: 10px;">查询</button>

      </el-form>
    </v-panel>

    <v-panel>
      <div id="tableList"></div>
    </v-panel>
  </div>
</template>
<style>
  #searchPanel .el-input__inner, #searchPanel .el-date-editor.el-input{
    width: 160px;
  }
</style>

<script>
export default {
  name: 'approve',
  data() {
    return {
      cwaTypeList: [],
      departCascader: [], //部门树
      depId: [],
      form: {
        cwaType: '', //考勤类型
        starttime: '',  //开始日期
        endtime: '', //结束日期
        depId: '',  //部门id
        authorName: '' //申请人
      }
    };
  },
  created() {
    this.getAffairTypes();
    this.getDepartment();
    this.getList();
  },

  methods: {
    getAffairTypes() {
      this.ajax({
        url: '/ctm/setting/param/list',
        data: {
          code: 'processtype'
        },
        success(data, $this) {
          if (data.code == 'success') {
            const content = data.content;
            for (let i = 0; i < content.length; i++) {
              if (content[i].value != 4) {
                $this.cwaTypeList.push(content[i]);
              }
            }
          } else {
            $this.errorTips('考勤类型获取失败!');
          }
        }
      });
    },
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
    getList(){
      const $this = this;
      let params = this.form;
      params.depId = this.depId[this.depId.length - 1] || 1;
      params.starttime = this.form.starttime && new Date(this.form.starttime).getTime();
      params.endtime = this.form.endtime && new Date(this.form.endtime).getTime();
      this.tableList({
        url: '/sys/process/cwa/list',
        data: Utils.filterObjectNull(params),
        columns: [{
            name: "考勤类型",
            value: "typeName"
        }, {
            name: "日期",
            render(row) {
              return new Date(parseInt(row.addTime)).toString();
            }
        }, {
            name: "部门",
            render(row) {
              return  $this.reverseDepart(row.depName);
            }
        },{
            name: "申请人",
            value: "authorName"
        },{
            name: "操作",
           operator(row) {
            return [{
              name: '详情',
              click(row) {
                $this.$router.push({
                  path: '/work/detail',
                  query: {
                    type: row.cwaType,
                    id: row.id
                  }
                });
              }
            }];
          }
        }],
      });
    }
  }
};
</script>
