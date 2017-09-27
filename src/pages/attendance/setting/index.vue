<template>
  <div>
    <v-panel>
      <el-form ref="formInline" :model="form" label-width="100px" :inline="true">
        <el-form-item label="考勤设置：">
          <el-select v-model="form.select" placeholder="请选择" @change="changeHandle" style="width: 180px;">
            <el-option label="审批设置" :value="0"></el-option>
            <el-option label="考勤管理员设置" :value="1"></el-option>
            <el-option label="考勤查看设置" :value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div class="table-list" v-if="form.select == 0" id="planeList"></div>
      <div class="table-list" v-if="form.select == 1" id="approveList"></div>
      <template v-if="form.select == 2">

        <el-button type="success" @click="addCheckPerson" style="float:right; margin-top:-54px;">添 加</el-button>
        <span class="check-tips">可以查看所有人的考勤记录</span>
        <div class="table-list" id="checkList"></div>
      </template>

      <el-dialog :title="title" :visible.sync="modal" size="tiny" class="tiny-type-modal">
        <el-form label-width="80px" label-position="right">
          <el-form-item label="姓名：">
            <el-select v-model="person" filterable :multiple="false" placeholder="请输入关键字">
              <el-option v-for="item in personList" :key="item.id" :label="item.realname" :value="item.id + '|' + item.realname">
                <span style="float:left" class="search-label">{{item.realname}}</span>
                <!-- <span style="float:right; padding-right:40px;" class="search-label">{{item.phone}}</span> -->
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

.check-tips {
  position: relative;
  top: -48px;
  left: 300px;
  color: red;
}

.tiny-type-modal .el-input {
  width: 350px !important;
}

.table-list {
  margin-bottom: 30px;
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
      title: '审批设置',
      modal: false,
      form: {
        nodeId: '',
        select: 0,
        depId: '',  //部门id
        id: ''  //本条数据id
      }
    };
  },
  created() {
    this.getPersonList();
    this.getPlaneList();
  },
  methods: {
    getPlaneList() {//获取机票设置人列表
      const $this = this;
      this.tableList({
        columns: [{
          name: '名称',
          value: 'nodeName'
        }, {
          name: '姓名',
          render(row) {
            const userName = row.userName;
            return userName || '/';
          }
        }, {
          name: '操作',
          operator() {
            return [{
              name: '设置',
              click(row) {
                $this.modal = true;
                let id = row.userId;
                let name = row.userName;
                if (!!id) {
                  $this.person = id + '|' + name;
                  $this.form.id = row.id;  //本条数据id
                } else {
                  $this.person = '';
                }
                $this.form.nodeId = row.nodeId;
              }
            }];
          }
        }],
        url: '/cwa/attendance/handler/list',
        element: '#planeList',
        isPage: false
      });
    },
    geDeptList() {   //获取考勤管理员列表
      const $this = this;
      this.tableList({
        columns: [{
          name: '审批名称',
          value: 'depName'
        }, {
          name: '姓名',
          value: 'name',
          render(row) {
            const userName = row.userName;
            return userName || '/';
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
        element: '#approveList',
        isPage: false
      });
    },
    getCheckList() {  //获取考勤查看人员列表
      const $this = this;
      this.tableList({
        columns: [{
          name: '姓名',
          value: 'name',
          render(row) {
            const userName = row.userName;
            return userName;
          }
        }, {
          name: '操作',
          operator() {
            return [{
              name: '删除',
              click(row) {
                $this.confirmTips({
                  title: '删除确认',
                  content: '您确定删除吗？',
                  submit() {
                    $this.ajax({
                      url: '/authority/role/user/delete',
                      type: 'put',
                      data: {
                        userId: row.userId
                      },
                      success(data) {
                        if (data.code == 'success') {
                          $this.successTips();
                          $this.getCheckList();
                        } else {
                          $this.errorTips(data.message);
                        }
                      }
                    });
                  }
                });
              }
            }];
          }
        }],
        url: '/authority/role/list/code',
        element: '#checkList',
        isPage: false
      });
    },
    getPersonList() {  //获取所有人
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
    changeHandle(value) {
      if (value == 0) {  //机票审批设置
        this.title = '审批设置';
        this.getPlaneList();
      } else if (value == 1) {  //部门考勤管理员设置
        this.title = '考勤管理员设置';
        this.geDeptList();
      } else if (value == 2) {  //考勤查看设置
        this.getCheckList();
      }
    },
    addCheckPerson() {  //添加考勤查看人员
      this.modal = true;
      this.title = '考勤查看设置';
      this.person = '';
    },
    submit() {
      const userId = this.person.split('|')[0];
      if (!userId) {
        this.errorTips('审批人不能为空!');
        return;
      }
      this.disable = true;
      const { select } = this.form;
      if (select == 0) {  //机票审批设置
        this.ajax({
          url: '/cwa/attendance/handler/update',
          type: 'put',
          data: {
            nodeId: this.form.nodeId,
            userId: this.person.split('|')[0]
          },
          success(data, $this) {
            if (data.code == 'success') {
              $this.modal = false;
              $this.successTips();
              $this.getPlaneList();
            } else {
              $this.errorTips(data.message);
            }
          }
        });
      } else if (select == 1) { //部门考勤管理员设置
        let params = this.form;
        params.userId = this.person.split('|')[0],
          this.ajax({
            url: '/cwa/attendance/dept/update',
            type: 'put',
            data: Utils.filterObjectNull(params),
            success(data, $this) {
              if (data.code == 'success') {
                $this.modal = false;
                $this.successTips();
                $this.geDeptList();
              } else {
                $this.errorTips(data.message);
              }
            }
          });
      } else if (select == 2) {  //考勤查看人员设置
        this.ajax({
          url: '/authority/role/user/add',
          type: 'put',
          data: {
            userId: this.person.split('|')[0]
          },
          success(data, $this) {
            if (data.code == 'success') {
              $this.modal = false;
              $this.successTips();
              $this.getCheckList();
            } else {
              $this.errorTips(data.message);
            }
          }
        });
      }
    }
  }
};
</script>
