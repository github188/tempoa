
<template>
	<div>
		<v-panel title="组织架构管理">
            <div slot="button">
                <el-form ref="formInline" :model="form" label-width="60px" :inline="true">
                    <el-form-item label="姓名：">
                        <el-input v-model="form.queryInfo" placeholder="请输入员工姓名或者手机号"></el-input>
                    </el-form-item>
                    <button type="button" @click="getPersonList()" class="search-btn btn btn-green">查询</button>
                    <button type="button" @click="getPersonList" class="search-btn btn btn-space">添加成员</button>
                    <button type="button" @click="getPersonList" class="search-btn btn btn-space">导出列表</button>
                </el-form>
            </div>
	
            <div class="department">
                    <el-tree
                        node-key="id"
                        :default-expanded-keys="['1']"
                        :render-content="renderContent"
                        highlight-current
                        :expand-on-click-node="false"
                        :data="departList"
                        ref="tree"
                        :props="{
                            label: 'name',
                            children: 'children'
                        }">
                    </el-tree>


            </div>
            <div id="tableList" style="padding-left: 320px"></div>
		</v-panel>

        <el-dialog :title="depart.title" :visible.sync="depart.modal" size="tiny" class="tiny-type-modal">
            <el-form ref="form" :model="depart.form" :rules="depart.rules" label-width="110px" label-position="right">
                <el-form-item label="部门名称：" prop="name">
                    <el-input v-model="depart.form.name"  style="width: 90%"></el-input>
                </el-form-item>


                <el-form-item v-if="type == 0" label="上级部门：" prop="parentName">
                    <el-input v-model="depart.form.parentName"  style="width: 90%"></el-input>
                </el-form-item>

                <el-form-item label="部门负责人：" prop="currentLeader">
                    <el-select  style="width:90%"
                        v-model="depart.form.currentLeader"
                        filterable
                        clearable
                        placeholder="请输入关键字">
                        <el-option
                            v-for="item in personList"
                            :key="item.id"
                            :label="item.realname"
                            :value="item.id + '|' + item.realname">
                            <span style="float:left" class="search-label">{{item.realname}}</span>
                            <span style="float:right; padding-right:40px;" class="search-label">{{item.phone}}</span>
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button type="success" :disabled="disabled" v-if="disabled"><i class="el-icon-loading"></i></el-button>
                <el-button type="success" :disabled="disabled" @click="submit" v-else>确 定</el-button>
                <el-button type="info" @click="depart.modal = false">取 消</el-button>
            </span>
        </el-dialog>

        <el-dialog title="个人信息详情" :visible.sync="person.detailModal" size="small" class="person-modal">
            <el-row :gutter="24">
				<el-col :span="8">

                    <el-form label-width="120px" label-position="right">
                        <el-form-item label="姓　　名：">
                            <span> {{person.info.realname}} </span>
                        </el-form-item>

                        <el-form-item label="邮　　箱：">
                            <span> {{person.info.email}} </span>
                        </el-form-item>

                        <el-form-item label="手　　机：">
                            <span> {{person.info.phone}} </span>
                        </el-form-item>

                        <el-form-item label="部　　门：">
                            <span>  {{person.info.depName}} </span>
                        </el-form-item>

                        <el-form-item label="专业级别：">
                            <span> {{person.info.professLevel || '/'}} </span>
                        </el-form-item>

                        <el-form-item label="直接上级：">
                            <span> {{person.info.leaderName || '/'}} </span>
                        </el-form-item>

                    </el-form>
					
				</el-col>
				<el-col :span="8">
                    <el-form label-width="120px" label-position="right">
                        <el-form-item label="工　　号：">
                            <span> {{person.info.usercode}} </span>
                        </el-form-item>

                        <el-form-item label="生　　日：">
                            <span> {{person.info.idcard || '/'}} </span>
                        </el-form-item>

                        <el-form-item label="性　　别：">
                             <span> {{ person.info.sex == 1? '男': '女'}} </span>
                        </el-form-item>

                        <el-form-item label="岗　　位：">
                            <span> {{person.info.post}} </span>
                        </el-form-item>

                        <el-form-item label="管理级别：">
                            <span> {{person.info.manageLevel || '/'}} </span>
                        </el-form-item>

                        <el-form-item label="常 驻 地：">
                            <span> {{person.info.address || '/'}} </span>
                        </el-form-item>
                    </el-form>
				</el-col>

                <el-col :span="8">
                    <img @click="person.avatarModal = true"  :src="person.avatar" alt="" style="cursor:pointer; height: 120px; width: 120px; border-radius: 50%">
				</el-col>
			</el-row>
       </el-dialog>

        <el-dialog v-model="person.avatarModal" size="small">
            <img width="100%" :src="person.avatar" alt="">
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
       width: 1000px;
    }
    .department .el-tree{
        height: 530px;
        overflow: auto;
    }
    .department .edit-tree i{
        padding: 0 8px;
        color: #8391a5;
        visibility: hidden;
    }
    .department .edit-tree{
        float: right;
    }
    .department .el-tree-node__content:hover .edit-tree i{
        visibility: visible;
    }
    .department .el-tree-node__content .edit-tree i:hover{
        color: #01cd78;
    }
</style>


<script>
	export default {
		name: 'deparment',
		data(){
			return {
                type: '',  //当前部门是编辑模式还是添加模式
                departList: [],  //部门树
                personList: [],  //全部人员
                form: {   //查询条件
                    queryInfo: undefined,
                    id: 1
                },
                disabled: false,
                person: {
                    detailModal: false,  //个人详情模态框
                    avatarModal: false, //个人头像大图
                    info: [], //个人信息
                    avatar: '',  //头像
                },
                depart: {   //部门相关
                    modal: false,
                    title: '',  
                    rules:{
                        name: [{
                            required: true,
                            message: '部门名称不能为空！'
                        }],
                        parentName: [{
                            required: true,
                            message: '上级部门不能为空！'
                        }],
                        currentLeader: [{
                            required: true,
                            message: '部门负责人不能为空！'
                        }]
                    },
                    form: {
                        name: '',  //部门名称
                        id: '', //部门id
                        parentId: '',  //上级部门id
                        parentName: '',  //上级部门名称
                        currentLeader: '',  //当前的部门负责人
                    }
                }
			};
		},
		created(){
            this.getDepartment();
            this.getPersonList();
            this.getAllPerson();
		},	
		methods: {
            getDepartment(){  // 获取部门树
                this.ajax({
					url: '/authority/dep/tree/list',
					success(data, $this){
						if(data.code == "success"){
							$this.departList = data.content;
						}
					}
				})
            },
            getAllPerson(){   //获取全部人员
                this.ajax({
					url: '/authority/user/dep/1',
					data: {
						pageNum: 1,
						pageSize: 1000
					},
					success(data, $this){
						if(data.code == 'success'){
							$this.personList = data.content;
						}
					}
				})
            },
            getDepartLeader(){ //获取部门负责人
                this.ajax({
                    url: '/authority/dep/'+ this.depart.form.id  +'/detail',
                    success(data, $this){
                        if(data.code == 'success'){
                            const content = data.content;
                            if(content.leaderName != null){
                                $this.depart.form.currentLeader = content.leaderId + '|' + content.leaderName;
                            }
                        }
                    }
                })
            },
    
            getPersonList(id){   //查询部门对应的员工
                const { queryInfo } =  this.form;
                let $this = this;
				this.tableList({
                    url: '/authority/user/dep/' + this.form.id,
                    
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
                                    $this.person.detailModal = true;
                                    $this.ajax({
                                        url: 'authority/user/'+ row.id +'/detail',
                                        success(data, that){
                                            if(data.code == 'success'){
                                                $this.person.info = data.content;
                                                $this.person.avatar = Utils.getAvatar(data.content);
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
                                                    $this.getPersonList($this.form.id)
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
            renderContent(h, { node, data, store }) {
                return (
                <span>
                    <span>{node.label}</span>
                    <span class="edit-tree">
                        <i title="编辑" on-click={ () => this.openModal(store, data, 0)} class="el-icon-edit"></i>
                        <i title="新增" on-click={ () => this.openModal(store, data, 1)} class="el-icon-plus"></i>
                        <i title="删除" on-click={ () => this.remove(store, data)} class="el-icon-delete"></i>
                    </span>
                </span>);
            },
            openModal(store, data, type){
                this.type = type;
                this.depart.form.id = data.id;
                
                if(type == 0){  //编辑
                    this.depart.title = '编辑';
                    this.depart.form.name = data.name;
                    this.depart.form.parentId = data.pId;
                    this.getDepartLeader();
                }else if(type == 1){  //添加
                    this.depart.title = '添加';
                    this.depart.form.name = '';
                    this.depart.form.parentId = data.id;
                    this.depart.form.currentLeader = '';
                }
                
                this.depart.modal = true;
            },
            remove(store, $data){
                this.$confirm('确定要删除此部门及其子部门吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.ajax({
                        url: '/authority/dep/'+ $data.id +'/delete',
                        type: 'delete',
                        success(data, $this){
                            if(data.code == 'success'){
                                store.remove($data);
                                $this.$message({
                                    type: 'success',
                                    message: '操作成功!'
                                });  
                            }else{
                                $this.$message({
                                    message: data.message,
                                    type: 'warning'
                                });
                            }
                        }
                    })
                }).catch(() => {});

            },
            submit(){  //
                this.$refs.form.validate((valid)=>{
                    if(valid){
                        this.disabled = true;
                        const depart = this.depart.form;
                        let leader = this.depart.form.currentLeader.split('|');
                        const leaderId = leader[0];
                        const leaderName = leader[1];
                        let params = {
                            name: depart.name,
                            leaderName: leaderName,
                            leaderId: leaderId,
                            parentId: depart.parentId,
                        }

                        console.log(params)
                        if(this.type == 0){  //编辑
                            params.id = depart.id;
                        }else if(this.type == 1){  //添加

                        }

                        this.ajax({
                            url: '/authority/dep',
                            type: 'post',
                            data: params,
                            success(data, $this){
                                if(data.code == 'success'){
                                    $this.$message({
                                        message: '操作成功！',
                                        type: 'success'
                                    });
                                    $this.depart.modal = false;
                                    $this.getDepartment();
                                    $this.disabled = false;
                                }else{
                                    $this.$message({
                                        message: data.message,
                                        type: 'warning'
                                    });
                                    $this.disabled = false;
                                }

                            }
                        })
                    }
                })  
            }
        }
	}
</script>
