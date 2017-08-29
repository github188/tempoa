<template>
	<div>
		<v-panel title="组织架构管理">
            
            <div slot="button">
                <el-form ref="formInline" :model="form" label-width="60px" :inline="true">
                    <el-form-item label="姓名：">
                        <el-input v-model="form.queryInfo" placeholder="请输入员工姓名或者手机号"></el-input>
                    </el-form-item>
                    <button type="button" @click="getList(form.id)" class="search-btn btn btn-green">查询</button>
                    <button type="button" @click="getList" class="search-btn btn btn-space">添加成员</button>
                    <button type="button" @click="getList" class="search-btn btn btn-space">导出列表</button>
                </el-form>
            </div>
            
			<el-row :gutter="24">
				<el-col :span="6">
                    <button @click="editTree" class="btn btn-space edit-tree-btn">编辑</button>
					<div class="department">
						<v-department @click="treeClick"></v-department>
					</div>
				</el-col>
				<el-col :span="18">
					<div id="tableList"></div>
				</el-col>
			</el-row>
		</v-panel>

       <el-dialog title="编辑部门" :visible.sync="modal.editBoxModal" size="tiny">
           <v-panel title="功能操作">
               <div slot="button">
                   <button type="button" @click="modal.addModal = true" class="btn btn-space">添加</button>
                   <button type="button" @click="editDepart" class="btn btn-space">编辑</button>
                   <button type="button" @click="delDepart" class="btn btn-space">删除</button>
               </div>
               <v-department ref="getTree" @click="treeClickEdit"></v-department>
           </v-panel>
       </el-dialog>

       <el-dialog title="添加部门" :visible.sync="modal.addModal" size="tiny">
          <el-form ref="addForm" :model="addForm" :rules="rules" label-width="120px" label-position="right">
                <el-form-item label="部门名称：" prop="name">
                    <el-input v-model="addForm.name"></el-input>
                </el-form-item>

                <el-form-item label="部门负责人：">
                    <v-person @change="chooseAddPerson" style="width:100%"></v-person>
                </el-form-item>
          </el-form>

          <span slot="footer" class="dialog-footer">
                <el-button type="success" @click="addDepart">确 定</el-button>
                <el-button type="info" @click="modal.addModal = false">取 消</el-button>
            </span>
       </el-dialog>

        <el-dialog title="编辑部门" :visible.sync="modal.editModal" size="tiny">
          <el-form ref="addForm" :model="editForm" :rules="rules" label-width="120px" label-position="right">
                <el-form-item label="部门名称：" prop="name">
                    <el-input v-model="addForm.name"></el-input>
                </el-form-item>

                 <el-form-item label="上级部门：">
                    <!-- <v-department @change="choosePerson" style="width:100%"></v-department> -->
                    <el-cascader
                    style="width: 100%"
                    :options="departOptions"
                    :change-on-select="true"
                    :value="editForm.value"
                    @change="departOptionsChange"
                    :props="{
                        value: 'id',
                        label: 'name'
                    }"
                    :show-all-levels="true"
                    ></el-cascader>
                </el-form-item>

                <el-form-item label="部门负责人：">
                    <v-person @change="choosEditPerson" style="width:100%"></v-person>
                </el-form-item>
          </el-form>

          <span slot="footer" class="dialog-footer">
                <el-button type="success" @click="editDepartSubmit">确 定</el-button>
                <el-button type="info" @click="modal.editModal = false">取 消</el-button>
            </span>
       </el-dialog>


        <el-dialog title="个人信息详情" :visible.sync="modal.pesonModal" size="small" class="person-modal">
            <el-row :gutter="24">
				<el-col :span="8">

                    <el-form label-width="120px" label-position="right">
                        <el-form-item label="姓　　名：">
                            <span> {{personInfo.realname}} </span>
                        </el-form-item>

                        <el-form-item label="手　　机：">
                            <span> {{personInfo.phone}} </span>
                        </el-form-item>

                        <el-form-item label="部　　门：">
                            <span>  {{personInfo.depName}} </span>
                        </el-form-item>

                        <el-form-item label="专业级别：">
                            <span> {{personInfo.professLevel || '/'}} </span>
                        </el-form-item>

                        <el-form-item label="直接上级：">
                            <span> {{personInfo.leaderName || '/'}} </span>
                        </el-form-item>

                    </el-form>
					
				</el-col>
				<el-col :span="8">
                    <el-form label-width="120px" label-position="right">
                        <el-form-item label="工　　号：">
                            <span> {{personInfo.usercode}} </span>
                        </el-form-item>

                        <el-form-item label="性　　别：">
                             <span> {{ personInfo.sex == 1? '男': '女'}} </span>
                        </el-form-item>

                        <el-form-item label="岗　　位：">
                            <span> {{personInfo.post}} </span>
                        </el-form-item>

                        <el-form-item label="管理级别：">
                            <span> {{personInfo.manageLevel || '/'}} </span>
                        </el-form-item>

                        <el-form-item label="常　驻　地：">
                            <span> {{personInfo.address || '/'}} </span>
                        </el-form-item>
                    </el-form>
				</el-col>

                <el-col :span="8">
                    <img :src="personInfo.avatar" alt="" style="height: 120px; width: 120px; border-radius: 50%">
				</el-col>
			</el-row>
       </el-dialog>


        <el-dialog title="编辑员工信息" :visible.sync="modal.editPersonModal" size="tiny" class="person-edit-modal">
            <el-form ref="editForm1" :model="editPersonForm" :rules="editPersonRule" label-width="100px" label-position="right">

                <el-row :gutter="24">
                    <el-col :span="10">
                        <el-form-item label="姓名：" prop="realname">
                            <el-input v-model="editPersonForm.realname"></el-input>
                        </el-form-item>

                        <el-form-item label="手机：" prop="phone">
                            <el-input v-model="editPersonForm.phone"></el-input>
                        </el-form-item>

                        <el-form-item label="邮箱：" prop="username">
                            <el-input v-model="editPersonForm.username"></el-input>
                        </el-form-item>

                        <el-form-item label="直接上级：" prop="leaderName">
                            <!-- <el-input v-model="editPersonForm.leaderName"></el-input> -->
                            <v-person  @change="chooseLeader"></v-person>
                        </el-form-item>

                        <el-form-item label="部门：" prop="depName">
                            <el-input v-model="editPersonForm.depName"></el-input>
                        </el-form-item>

                        <el-form-item label="专业级别：">
                            <el-input v-model="editPersonForm.professLevel"></el-input>
                        </el-form-item>

                    </el-col>

                    <el-col :span="10">

                        <el-form-item label="工号：" prop="usercode">
                            <el-input v-model="editPersonForm.usercode"></el-input>
                        </el-form-item>

                        <el-form-item label="性别：" prop="sex">
                            <!-- <el-input v-model="editPersonForm.sex"></el-input> -->
                            <el-radio class="radio" v-model="editPersonForm.sex" :label="1">男</el-radio>
                            <el-radio class="radio" v-model="editPersonForm.sex" :label="2">女</el-radio>

                        </el-form-item>

                        <el-form-item label="岗位：" prop="post">
                            <el-input v-model="editPersonForm.post"></el-input>
                        </el-form-item>

                        <el-form-item label="常驻地：" prop="address">
                            <el-input v-model="editPersonForm.address"></el-input>
                        </el-form-item>

                        <el-form-item label="管理级别：">
                            <el-input v-model="editPersonForm.manageLevel"></el-input>
                        </el-form-item>

                    </el-col>

                    <el-col :span="4">

                    </el-col>

                </el-row>

            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button type="info" @click="modal.editPersonModal = false">取 消</el-button>
            </span>
        </el-dialog>

      

	</div>
</template>
<style scoped>
    .search-btn.btn{
        margin-right: 15px;
        margin-top: -4px;
    }
	.department{
		width:  300px;
		float: left;
		overflow: auto;
		height: 600px;
	}
	.panel{
		overflow: hidden;
	}
    .edit-tree-btn{
        width: 300px;;
        margin-bottom: 20px;
        height: 40px;
    }
</style>
<style>
    .person-modal .el-form-item{
        margin-bottom: 0;
    }

   .person-modal .el-dialog, .person-edit-modal .el-dialog{
       width: 800px;
   }
</style>


<script>
	export default{
		name: 'deparment',
		data(){
			return {
				pickerOptions: {
					disabledDate(time) {
						return time.getTime() > Date.now() - 8.64e7;
					}
                },
                modal: {
                    editBoxModal: false, //弹出编辑的大框
                    editModal: false,
                    addModal: false,
                    pesonModal: false,
                    editPersonModal: false
                },
               rules: {
                    name: [{
                        required: true,
                        message: '部门名称不能为空！'
                    }]
                },
           
                addForm: {
                    name: '',
                    departId: undefined,  //新增部门时的id
                    departName: undefined,  //新增部门时的名称
                    leaderName: null,   //部门负责人
                    leaderId: null,   //部门负责人id
                },
                editForm: {
                    value: [],
                    name: '',
                    departId: undefined,  //删除部门时的id
                    departName: undefined,  //删除部门时的名称
                    leaderName: null,   //部门负责人
                    leaderId: null,   //部门负责人id
                },
                editPersonForm: {},
                editPersonRule:{
                    realname: [{
                        required: true,
                        message: '姓名不能为空！'
                    }],
                    usercode: [{
                        required: true,
                        message: '工号不能为空！'
                    }],
                    sex: [{
                        required: true,
                        message: '性别为必选项！'
                    }],
                    phone: [{
                        required: true,
                        message: '电话号码不能为空！'
                    }],
                    depName: [{
                        required: true,
                        message: '部门不能为空！'
                    }],
                    post: [{
                        required: true,
                        message: '岗位不能为空！'
                    }],
                    username: [{
                        required: true,
                        message: '邮箱不能为空！'
                    }],
                    directLeader: [{
                        required: true,
                        message: '直接上级不能为空！'
                    }],
                    address: [{
                        required: true,
                        message: '常驻地不能为空！'
                    }],
                    leaderName: [{
                        required: true,
                        message: '直接上级不能为空！'
                    }]
                },
             
                // personForm:{
                //     realname: '1',
                //     usercode: '1',
                //     phone: '',
                //     sex: 0,
                //     depId: '',
                //     post: '',
                //     username: '',
                //     email: '',
                //     professLevel: '',
                //     manageLevel: '',
                //     directLeader: '',
                //     address: '',
                //     headPic: ''
                // },
				form: {
                    queryInfo: undefined,
                    id: 1
                },
                personInfo: {},  //个人信息
                departOptions: []   //部门数据
			};
		},
		created(){
			this.getList(this.form.id);
		},	
		methods: {
            getDepartOptions(){  //获取部门
                this.ajax({
					url: '/authority/dep/tree/list',
					success(data, $this){
						if(data.code == "success"){
							$this.departOptions = data.content;
						}
					}
				})
            },
			treeClick(a, b, c){
                this.form.id = a.id;
                this.getList(this.form.id);
            },
            editTree(){
                this.modal.editBoxModal = true;
            },
            treeClickEdit(a, b, c){  //编辑树
                this.departId = a.id;
                this.departName = a.name;
                console.log(a, b, c)
            },
            chooseAddPerson(obj){  //选择添加里的部门负责人
                this.addForm.leaderName = obj.name;
                this.addForm.leaderId = obj.value;
            },
            choosEditPerson(){   //选择编辑里的部门负责人
                this.editForm.leaderName = obj.name;
                this.editForm.leaderId = obj.value;

            },
            addDepart(){  //添加部门
                 this.$refs.addForm.validate((valid)=>{
                     if(valid){
                         if(!this.departId){
                            this.$message({
                                type: 'info',
                                message: '请先选择父部门!'
                            });   
                        }else if(!this.addForm.leaderName){
                            this.$message({
                                type: 'info',
                                message: '请选择部门负责人!'
                            });   
                        }else{
                            this.ajax({
                                url: 'authority/dep',
                                type: 'post',
                                data:{
                                    name: this.addForm.name,
                                    parentId: this.departId,
                                    leaderName: this.addForm.leaderName,
                                    leaderId: this.addForm.leaderId
                                },
                                success(data, $this){
                                    $this.$message({
                                        type: 'success',
                                        message: '添加部门成功!'
                                    });   
                                    this.modal.addModal = false;
                                }
                            })
                        }
                     }
                     
                 })
            },
            editDepart(){  //编辑部门
                if(!this.departId){
                    this.$message({
                        type: 'info',
                        message: '请先选择父部门!'
                    });   
                }else{
                    this.getDepartOptions();
                    this.modal.editModal = true;
                }
                // this.$refs.editForm.validate((valid)=>{

                // })
            },
            editDepartSubmit(){  //提交编辑部门的form

            },
            delDepart(){ //删除部门

                if(!this.departId){
                    this.$message({
                        type: 'info',
                        message: '请先选择父部门!'
                    });   
                }else{

                    this.$confirm('确定删除'+ this.departName +'及其子部门？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        this.ajax({
                            url: '/authority/dep/' + this.departId + '/delete',
                            type: 'delete',
                            success(data, $this){
                                if(data.code == 'success'){
                                    $this.$message({
                                        type: 'success',
                                        message: '删除部门成功!'
                                    });   
                                }
                            }
                        })
                    }).catch(() => {});
                }
            },
            editPersonSubmit(){  //编辑用户信息
                console.log(this.personForm)
            },
			getList(id){   //查询部门对应的员工
                const { queryInfo } =  this.form;
                let $this = this;
				this.tableList({
                    url: '/authority/user/dep/' + id,
                    
                    checkbox(data){

                    },
                    expand: true,
                    data: {
                        queryInfo: queryInfo
                    },
					columns:[{
						name: "姓名",
						value: "realname"
					},{
						name: "工号",
						value: "usercode"
					},{
						name: '岗位名称',
						value: 'post'
					}, {
						name: '手机',
						value: 'phone'
                    },{
                        name: '操作',
                        width: 300,
                        operator(row){
                            let status =  0;
                            let statusName = '启用'
                            if(row.isLeave == 0){  //启用
                                status = 1;
                                statusName = '停用'
                            }
                            return [{
                                name: '详情',
                                click(row){
                                    $this.modal.pesonModal = true;
                                    $this.ajax({
                                        url: 'authority/user/'+ row.id +'/detail',
                                        success(data, that){
                                            if(data.code == 'success'){
                                                $this.personInfo = data.content;
                                                $this.personInfo.avatar = Utils.getAvatar(data.content);
                                            }
                                        }
                                    })
                                }
                            },{
                                name: '编辑',
                                click(row){
                                    $this.modal.editPersonModal = true
                                    $this.ajax({
                                        url: 'authority/user/'+ row.id +'/detail',
                                        success(data, that){
                                            if(data.code == 'success'){
                                                $this.editPersonForm = data.content;
                                            }
                                        }
                                    })

                                }
                            },{
                                name: statusName,
                                click(row){
                                    $this.$confirm('确定'+ statusName +'【'+ row.realname +'】的信息？', '提示', {
                                        confirmButtonText: '确定',
                                        cancelButtonText: '取消',
                                        type: 'warning'
                                    }).then(() => {
                                        $this.ajax({
                                            url: '/authority/user/' + row.id + '/' + status + '/leave',
                                            type: 'put',
                                            success(data, $that){
                                                if(data.code == 'success'){
                                                    $that.$message({
                                                        type: 'success',
                                                        message: '操作成功!'
                                                    }); 
                                                    $this.getList($this.form.id)
                                                }
                                            }
                                        })
                                    }).catch(() => {});

                                }
                            },{
                                name: '角色权限'
                            },{
                                name: '重置密码',
                                click(row){
                                    $this.$confirm('确定要重置【'+ row.realname +'】的登录密码？', '提示', {
                                        confirmButtonText: '确定',
                                        cancelButtonText: '取消',
                                        type: 'warning'
                                    }).then(() => {
                                        $this.ajax({
                                            url: '/authority/user/update/restart',
                                            type: 'put',
                                            data:{
                                                id: row.id
                                            },
                                            success(data, $that){
                                                if(data.code == 'success'){
                                                    $that.$message({
                                                        type: 'success',
                                                        message: '操作成功!'
                                                    });   
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
            chooseLeader(obj){  //选择领导人
                console.log(obj)
            },
            departOptionsChange(){
               
            }
		}
	}
</script>
