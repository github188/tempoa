<template>
  <div>
    <v-panel>
      <div class="catalogue">
        <el-tree :data="catalogue" :default-expanded-keys="[tempId]" :highlight-current="true" :expand-on-click-node="false" @node-click="loadTemplate" node-key="id" :render-content="renderContent" :props="{
                    label: 'name',
                    children: 'children'
                }">
        </el-tree>
      </div>

      <div style="padding-left: 320px;">
        <el-upload ref="upload" :on-progress="startHandle" :on-success="uploadHandle" :action="url" :show-file-list="false" style="margin-bottom: 20px; float: right">
          <button type="button" class="btn btn-space">添加</button>
        </el-upload>

        <div id="catalogueList"></div>
      </div>
    </v-panel>
    <el-dialog :title="title" :visible.sync="modal" size="tiny" class="tiny-type-modal">
      <el-form ref="form" :model="form" :rules="rules" label-width="95px" label-position="right">
        <el-form-item label="目录名称：" prop="name">
          <el-input v-model="form.name" style="width: 90%"></el-input>
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
  </div>
</template>

<style scoped>
.catalogue {
  border-right: 4px solid #eee;
  padding-right: 20px;
  float: left;
  width: 300px;
}

#catalogueList {
  clear: right;
}
</style>
<style>
.middle-modal .el-dialog {
  width: 800px;
  height: 700px;
  overflow: auto;
}

.catalogue .el-tree {
  height: 580px;
}

.catalogue .edit-tree {
  float: right;
}

.catalogue .edit-tree i {
  padding: 0 8px;
  color: #8391a5;
  visibility: hidden;
}

.catalogue .el-tree-node__content:hover .edit-tree i {
  visibility: visible;
}

.catalogue .el-tree-node__content .edit-tree i:hover {
  color: #01cd78;
}
</style>

<script>
import { appHost, appRoot } from '@/config/config';
let id = 100000;
export default {
  name: 'template',
  data() {
    return {
      url: appHost + appRoot + '/ctm/template/upload',
      modal: false,
      title: '新增',
      catalogue: [],  //目录
      tempId: "1000000",  //目录id
      type: '',  //操作类型
      form: {
        name: '',  //模板名称
      },
      rules: {
        name: [{
          required: true,
          message: '合同类型不能为空！'
        }]
      }
    };
  },
  created() {
    this.getCatalogue();
    this.getTemplateList();
  },
  methods: {
    getCatalogue() {  //获取文件目录
      this.ajax({
        url: '/ctm/template/tree',
        success(data, $this) {
          console.log(data);
          if (data.code == 'success') {
            $this.catalogue = [];
            $this.catalogue.push(data.content);
          }
        }
      });

    },
    getTemplateList() {//获取目录对应的文件
      const $this = this;
      this.tableList({
        columns: [{
          name: '文件名',
          operator(row) {
            let name = row.name;
            return [{
              name: name,
              click(row) {
                let link = (appHost + appRoot + '/ctm/template/download?id=' + row.id + '&realname=' + name);
                window.open(link);
              }
            }];
          }
        }, {
          name: '添加时间',
          render(row) {
            return (new Date(row.addTime).toString());
          }
        }, {
          name: '操作',
          operator() {
            return [{
              name: '删除',
              click(row) {
                $this.$confirm('确定要删除此文件？', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  $this.ajax({
                    url: '/ctm/template/temp/delete',
                    type: 'put',
                    data: {
                      id: row.id,
                    },
                    success(data, $this) {
                      if (data.code == 'success') {
                        $this.$message({
                          type: 'success',
                          message: '操作成功!'
                        });
                        $this.getTemplateList();
                      } else {
                        $this.$message({
                          message: data.message,
                          type: 'warning'
                        });
                      }
                    }
                  });
                }).catch(() => { });

              }
            }];
          }
        }],
        element: '#catalogueList',
        url: '/ctm/template/temp/list/',
        data: {
          tempId: this.tempId
        }
      });
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.disable = true;
          if (this.type == 0) {  //编辑
            this.ajax({
              url: '/ctm/template/update',
              type: 'put',
              data: {
                id: this.tempId,
                name: this.form.name
              },
              success(data, $this) {
                if (data.code == 'success') {
                  $this.$message({
                    message: '操作成功！',
                    type: 'success'
                  });
                  $this.modal = false;
                  $this.getCatalogue();
                } else {
                  $this.$message({
                    message: data.message,
                    type: 'warning'
                  });
                }
              }
            });

          } else if (this.type == 1) {  //添加

            this.ajax({
              url: '/ctm/template/add',
              type: 'post',
              data: {
                parentId: this.tempId,
                name: this.form.name
              },
              success(data, $this) {
                if (data.code == 'success') {
                  $this.$message({
                    message: '操作成功！',
                    type: 'success'
                  });
                  $this.modal = false;
                  $this.getCatalogue();
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
      });
    },
    openModal(store, data, type) {

      this.type = type;

      if (type == 0) {  //编辑
        this.title = '编辑';
        this.form.name = data.name;
      } else if (type == 1) {  //添加
        this.title = '添加';
        this.form.name = '';
      }
      this.tempId = data.id;
      this.modal = true;
    },

    remove(store, $data) {  //移除模板
      if ($data.id == "1000000") {
        this.$message({
          message: "不能删除根节点！",
          type: 'warning'
        });
        return;
      }
      this.$confirm('确定要删除此模板及其子模板？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.ajax({
          url: '/ctm/template/delete',
          type: 'put',
          data: {
            id: $data.id,
          },
          success(data, $this) {
            if (data.code == 'success') {
              store.remove($data);
              $this.$message({
                type: 'success',
                message: '操作成功!'
              });
            } else {
              $this.$message({
                message: data.message,
                type: 'warning'
              });
            }
          }
        });
      }).catch(() => { });

    },
    renderContent(h, { node, data, store }) {
      return (
        <span>
          <span>{node.label}</span>
          <span class="edit-tree">
            <i title="编辑" on-click={() => this.openModal(store, data, 0)} class="el-icon-edit"></i>
            <i title="新增" on-click={() => this.openModal(store, data, 1)} class="el-icon-plus"></i>
            <i title="删除" on-click={() => this.remove(store, data)} class="el-icon-delete"></i>
          </span>
        </span>);
    },
    loadTemplate(a) {
      this.tempId = a.id;
      this.getTemplateList();
    },
    startHandle() {
      this.$loading({
        target: document.querySelector('#catalogueList')
      });
    },
    uploadHandle(response, file) {

      this.ajax({
        url: '/ctm/template/submit',
        data: {
          id: response.content.split('.')[0],
          name: file.name,
          refId: this.tempId
        },
        type: 'post',
        success(data, $this) {
          if (data.code == 'success') {
            $this.$message({
              type: 'success',
              message: '操作成功!'
            });
            $this.getTemplateList();
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
