<template>
  <div>
    <v-panel title="审批设置">
      <div id="leaderList"></div>
    </v-panel>
    <v-panel title="考勤管理员设置">
      <div id="approveList"></div>
      <el-dialog title="考勤管理员设置" :visible.sync="modal" size="tiny" class="tiny-type-modal">
        <el-form label-width="80px" label-position="right">
          <el-form-item label="审批人：">
            <el-select v-model="person" filterable :multiple="false" placeholder="请输入关键字">
              <el-option v-for="item in personList" :key="item.id" :label="item.realname" :value="item.id + '|' + item.realname">
                <span style="float:left" class="search-label">{{item.realname}}</span>
                <span style="float:right; padding-right:40px;" class="search-label">{{item.phone}}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button type="success" :disabled="disable" v-if="disable">
            <i class="el-icon-loading"></i>
          </el-button>
          <el-button type="success" :disabled="disable" @click="submit" v-else>确 定</el-button>
          <el-button type="info" @click="modal = false">取 消</el-button>
        </span>
      </el-dialog>
    </v-panel>
  </div>
</template>
<style>
.tiny-type-modal .el-dialog {
  width: 500px;
}

.tiny-type-modal .el-input {
  width: 350px !important;
}
</style>
<script>
export default {
  name: 'setting',
  data() {
    return {
      person: '',  //当前已经设置好的审批人
      personList: [],  //所有员工列表
      leaderList: [],  //人事审批节点
      modal: false,
      form: {
        depId: '',  //部门id
        id: ''  //本条数据id
      }
    };
  },
  created() {
    this.getList();
    this.getPersonList();
    this.getLeaderList();
  },
  methods: {
    getLeaderList() {//获取审批设置人列表
      this.ajax({  //人事审批
        url: '/cwa/attendance/nodes/list',
        success(data, $this) {
          if (data.code == 'success') {
            $this.leaderList.push(data.content);
          }
        }
      });

      this.ajax({  //机票负责人
        url: '/cwa/travel/nodes/list',
        success(data, $this) {
          if (data.code == 'success') {
            $this.leaderList.push(data.content);
          }
        }
      });

      console.log(this.leaderList);


      this.tableList({
        columns: [{
          name: '审批名称',
          value: 'nodeName'
        }, {
          name: '审批人',
          value: 'name',
          render(row) {
            console.log(row);
            // const userName = row.userName;
            // return userName;
          }
        }, {
          name: '操作',
          operator() {
            return [{
              name: '设置',
              click(row) {
                // $this.modal = true;
                // $this.form.depId = row.depId;  // 获取当前部门id

                // let name = row.userName;
                // let id = row.userId;
                // if(!!id){
                // 	$this.person = id + '|' + name;
                // 	$this.form.id = row.id;  //本条数据id
                // }else{
                // 	$this.person = '';
                // }
              }
            }];
          }
        }],
        data: {
          attr: this.code
        },
        beforeData: this.leaderList,
        element: '#leaderList',
        isPage: false
      });
    },
    getList() {   //获取考勤管理员列表
      const $this = this;
      this.tableList({
        columns: [{
          name: '审批名称',
          value: 'depName'
        }, {
          name: '审批人',
          value: 'name',
          render(row) {
            const userName = row.userName;
            return userName;
          }
        }, {
          name: '操作',
          operator() {
            return [{
              name: '设置',
              click(row) {
                $this.modal = true;
                $this.form.depId = row.depId;  // 获取当前部门id

                let name = row.userName;
                let id = row.userId;
                if (!!id) {
                  $this.person = id + '|' + name;
                  $this.form.id = row.id;  //本条数据id
                } else {
                  $this.person = '';
                }
              }
            }];
          }
        }],
        url: '/cwa/attendance/dept/list',
        data: {
          attr: this.code
        },
        element: '#approveList',
        isPage: false
      });
    },
    getPersonList() {  //获取审批人列表
      this.ajax({
        url: '/authority/user/query/list',
        data: {
          pageNum: 1,
          pageSize: 1000
        },
        success(data, $this) {
          if (data.code == 'success') {
            $this.personList = data.content;
          }
        }
      });
    },
    submit() {
      const userId = this.person.split('|')[0];
      if (!userId) {
        this.$message({
          message: '考勤管理员不能为空！',
          type: 'warning'
        });
        return;
      }
      this.disable = true;
      let params = this.form;
      params.userId = this.person.split('|')[0],

        this.ajax({
          url: '/cwa/attendance/dept/update',
          type: 'put',
          data: Utils.filterObjectNull(params),
          success(data, $this) {
            if (data.code == 'success') {
              $this.$message({
                message: '操作成功！',
                type: 'success'
              });
              $this.modal = false;
              $this.getList();
            } else {
              $this.$message({
                message: data.message,
                type: 'warning'
              });
            }
          }
        });
    }
  }
};
</script>
