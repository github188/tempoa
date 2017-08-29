<template>
  <div>
    <v-panel>
        <el-form label-width="90px" :inline="true">
            <el-form-item label="菜单名称：">
                    <el-input v-model="name"></el-input>
            </el-form-item>
            <button type="button" @click="getList" class="btn btn-green" style="margin-top:4px;">查询</button>
        </el-form>
    </v-panel>

    <v-panel title="菜单配置">
        <div slot="button">
            <button type="button" @click="addModal = true" class="btn btn-space">新增</button>
        </div>
        <div id="tableList"></div>
    </v-panel>


    <el-dialog @open="openModal" title="新增基础菜单" :visible.sync="addModal" size="small" class="menu-modal">
        <el-form ref="addForm" :model="addForm" :rules="rules" label-width="130px" label-position="right">
            <el-form-item label="菜单名称：" prop="name">
                <el-input v-model="addForm.name"></el-input>
            </el-form-item>

            <el-form-item label="上级菜单节点：" prop="parentId">
                <!-- <el-input v-model="addForm.parentId"></el-input> -->

                <el-cascader style="width: 100%"
                    :change-on-select="true"
                    :props="{
                        children: 'children',
                        value: 'id',
                        label: 'name'
                    }"
                    v-model="addForm.setOption"
                    @change="chooseMenu"
                    :options="menuTree">
                </el-cascader>
            </el-form-item>

            <el-form-item label="权限类型：" prop="type">
                <el-select v-model="addForm.type" placeholder="请选择" style="width: 100%">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="菜单所处路径：" >
                <el-input v-model="addForm.url"></el-input>
            </el-form-item>

            <el-form-item label="菜单图标：">
                <el-input v-model="addForm.icon"></el-input>
            </el-form-item>

        </el-form>

        <span slot="footer" class="dialog-footer">
            <el-button type="success" @click="addSubmit">确 定</el-button>
            <el-button type="info" @click="addModal = false">取 消</el-button>
        </span>
    </el-dialog>

    <el-dialog @open="openModal" title="编辑基础菜单" :visible.sync="editModal" size="small" class="menu-modal">
        <el-form ref="addForm" :model="editForm" :rules="rules" label-width="130px" label-position="right">
            <el-form-item label="菜单名称：" prop="name">
                <el-input v-model="editForm.name"></el-input>
            </el-form-item>

            <el-form-item label="上级菜单节点：" prop="parentId">
                <!-- <el-input v-model="addForm.parentId"></el-input> -->

                <el-cascader style="width: 100%"
                    :change-on-select="true"
                    :props="{
                        children: 'children',
                        value: 'id',
                        label: 'name'
                    }"
                    v-model="editForm.setOption"
                    @change="chooseMenu"
                    :options="menuTree">
                </el-cascader>
            </el-form-item>

            <el-form-item label="权限类型：" prop="type">
                <el-select v-model="editForm.type" placeholder="请选择" style="width: 100%">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="菜单所处路径：" >
                <el-input v-model="editForm.url"></el-input>
            </el-form-item>

            <el-form-item label="菜单图标：">
                <el-input v-model="editForm.icon"></el-input>
            </el-form-item>

        </el-form>

        <span slot="footer" class="dialog-footer">
            <el-button type="success" @click="editSubmit">确 定</el-button>
            <el-button type="info" @click="editModal = false">取 消</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<style>
    .menu-modal .el-dialog{
        width: 600px;
    }
</style>

<script>
    export default{
        name: 'menuManage',
        data(){
            return {
               addModal: false,
               editModal:false,
               name: '',   //菜单名称
               menuTree: [], //菜单树
               setOption: ['1'],
               addForm: {
                   type: '',
                   parentId: 1,
                   icon: '',
                   url: '',
                   setOption: []
               },
               editForm: {
                   type: '',
                   parentId: 1,
                   icon: '',
                   url: '',
                   setOption: []
               },
               rules:{
                   name: {
                       required: true,
                       message: "菜单名称不能为空！"
                   },
                   parentId: {
                       required: true,
                       message: "上级菜单不能为空！"
                   },
                   type: {
                       required: true,
                       message: "权限类型不能为空！"
                   }
               },
               options: [{  
                    name: '模块',
                    value: 0
               },{
                   name: '页面',
                   value:1
               },{
                   name: '操作',
                   value: 2
               }]
            }
        },
        created(){
            this.getList();
        },
        methods:{
           getList(){
               const params = {
                   name: this.name
               };
               const $this = this;
               this.tableList({
                   url: '/authority/resource/list',
                   data: Utils.filterObjectNull(params),
                   columns:[{
                       name: '菜单名称',
                       value: 'name'
                   },{
                       name: '菜单类型',
                       render(row){
                           const { type } = row;
                           console.log(type)
                           const typeText = ['模块','页面', '操作'];
                           return typeText[type];
                       }
                   },{
                       name: '菜单内容',
                       value: 'url'
                   },{
                       name: '上级菜单节点',
                       render(row){
                            const parentId = row.parentId;
                            if (parentId) {
                                return parentId;
                            } else {
                                return '【一级菜单】';
                            }
                       }
                   },{
                       name: '状态',
                       render(row){
                           return ['启用', '停用'][row.status];
                       }
                   },{
                       name: '操作',
                       operator(row){
                           let { status } = row;
                           let statusName = "启用";
                           if(status == 0){
                               status = 1;
                               statusName = '停用'
                           }else{
                               status = 0;
                               statusName = '启用'
                           }
                           return [{
                               name: '编辑',
                               click(row){
                                $this.editModal = true;
                                $this.ajax({
                                    url: 'authority/resource/'+ row.id +'/detail',
                                    success(data){
                                        if(data.code == 'success'){
                                            $this.editForm = data.content;
                                        }
                                    }
                                })

                               }
                           }, {
                               name: statusName,
                               click(row){
                                   $this.$confirm('确定'+  statusName +'【'+ row.name +'】菜单？', '提示', {
                                        confirmButtonText: '确定',
                                        cancelButtonText: '取消',
                                        type: 'warning'
                                    }).then(() => {
                                        $this.ajax({
                                            url: '/authority/resource',
                                            type: 'put',
                                            data:{
                                                id: row.id,
                                                status: status
                                            },
                                            success(data, $this){
                                                if(data.code == 'success'){
                                                    $this.$message({
                                                        type: 'success',
                                                        message: '操作成功!'
                                                    });   
                                                    $this.getList();
                                                }
                                            }
                                        })
                                    }).catch(() => {});
                               }
                           }]
                       }
                   }]
               })
           },
           getMenuTree(){
               this.ajax({
                   url: 'authority/resource/tree/list',
                   success(data, $this){
                       if(data.code == 'success'){
                           $this.menuTree = data.content;
                       }
                   }
               })
           },
           openModal(){
               this.getMenuTree();
           },
           chooseMenu(data){
               this.addForm.parentId = data[data.length -1];
           },
           
           addSubmit(){
               this.$refs.addForm.validate((valid)=>{
                   if(valid){
                       const { name, icon, type, url, parentId } = this.addForm;
                       this.ajax({
                            url: '/authority/resource',
                            type: 'post',
                            data: {
                                icon: icon,
                                name: name,
                                type: type,
                                url: url,
                                parentId: parentId
                            },
                            success(data, $this){
                                if(data.code =='success'){
                                    $this.$message({
                                        type: 'success',
                                        message: '添加成功!'
                                    });
                                    $this.addModal = false;
                                    $this.getList();
                                }
                            }
                        })
                   }
               })
           },
           editSubmit(){

           }
        }
    }

</script>

