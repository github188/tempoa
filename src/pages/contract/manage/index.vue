<template>
	<div>
       <v-panel class="search-panel">
            <el-form :model="form" label-width="120px" :inline="true">
                <el-form-item label="项目归属：">
                    <v-choose type="radio" @change="getChoose" :data="tabChoose"></v-choose>
                </el-form-item>
				<div></div>
				<el-form-item label="发起人：">
                   <el-input v-model="form.userName"></el-input>
                </el-form-item>

				<el-form-item label="合同类型：">
                   <v-code codeType="ctm_attr"  @change="getType"></v-code>
                </el-form-item>

				<el-form-item label="合同名称：">
                   <el-input placeholder="名称/编号" v-model="form.key"></el-input>
                </el-form-item>

				<div></div>

				<el-form-item label="归属部门：">
                   <el-select  @change="changeDapartTop" v-model="depart.departmantTop" placeholder="请选择一级部门" style="width:160px">
						<el-option v-for="(item, index) in depart.top" :key="index"
								:label="item.name"
								:value="item.id">
							</el-option>
						</el-select>
                </el-form-item>

				<el-form-item label="">
                   <el-select @change="changeDapartMiddle"  v-model="depart.departmantMiddle" placeholder="请选择二级部门" style="width:160px">
						<el-option v-for="(item, index) in depart.middle" :key="index"
								:label="item.name"
								:value="item.id">
							</el-option>
						</el-select>
					</el-select>
                </el-form-item>

				<el-form-item label="">
                   <el-select  @change="changeDapartBottom" v-model="depart.departmantBottom" placeholder="请选择三级部门" style="width:160px">
						<el-option v-for="(item, index) in depart.bottom" :key="index"
								:label="item.name"
								:value="item.id">
							</el-option>
						</el-select>
                </el-form-item>

				<div></div>

				<el-form-item label="合同金额：">
					<el-input placeholder="最小金额" v-model="form.startAmount"></el-input>
					<el-input style="margin-left: 10px" placeholder="最大金额" v-model="form.endAmount"></el-input>
				</el-form-item>
     
            </el-form>

            <div class="search-box">
                <button type="button" @click="getList" class="btn btn-green">查询</button>
            </div>
		</v-panel>

		<v-panel title="合同列表">
			<div slot="button">
				<button v-for="(item, index) in button" :key="index" type="button" @click="submitBtn(item.url)" class="btn btn-space" style="margin-top:4px; margin-left: 10px;">{{item.name}}</button>
				<button  @click="downTemplate" type="button" class="btn btn-space">下载模板</button>
			</div>
			<div id="tableList"></div>
		</v-panel>

		<v-approve ref="approve"></v-approve>
		<v-template ref="tempate"></v-template>
    </div>
</template>

<script>
	import Approve from './approve'
	import Template from './template'
	export default {
		name: 'contracManage',
		components: {
			'v-approve': Approve,
			'v-template': Template
		},
		data(){
			return {
				tabChoose: [{
					name: '已通过',
					value: 2
				},{
					name: '审批中',
					value: 1
				},{
					name: '已驳回',
					value: 3
				}],
				button: [], 
				depart:{
					top:[], //一级部门,
					middle: [],  //二级部门
					bottom: [], //三级部门
					departmantTop: '',
					departmantMiddle: '',
					departmantBottom: '',
				},
				form: {
					status: 2,   //审批状态
					key: '', //合同名称编号
					userName: '',
					ctmAttr: '', //合同类型
					startAmount: '',  //合同金额小
					endAmount: '',  //合同金额大
					departmentId: '',  //部门id
				}
			}
		},
		created(){
			this.getDepart();
			this.getList();
		},
		mounted(){
			Utils.getButton((data)=>{
				for(let i = 0; i < data.length; i++){
					if(data[i].url == 'startVerify' || data[i].url == 'export'){
						this.button.push(data[i])
					}
				}
			})
		},
		methods:{

			changeDapartTop(code){
				this.depart.departmantTop = code;
				this.depart.departmantMiddle = '';
				this.depart.departmantBottom = '';
				this.form.departmentId = code;
				this.getDepart(1);
			},
			changeDapartMiddle(code){
				
				this.depart.departmantMiddle = code;
				this.depart.departmantBottom = '';
				this.form.departmentId = code;
				this.getDepart(2);
			},
			changeDapartBottom(code){
				this.depart.departmantBottom = code;
				this.form.departmentId = code;
			},

			getDepart(type){  //获取部门
				this.ajax({
					url: '/authority/dep/list/pid',
					data: {
						parentId: this.form.departmentId || 1
					},
					success(data, $this){
						if(data.code == 'success'){
							const content = data.content;
							if(type == 1){
								$this.depart.middle = content;
							}else if(type == 2){
								$this.depart.bottom = content;
							}else{
								$this.depart.top = content;
							}
						}
					}
				})	

			},
			getType(obj){  //获取合同类型
				this.form.ctmAttr = obj.value;
			},
			getList(){  //获取合同列表
				const params = this.form;
				this.tableList({
					columns:[{
						name: '合同编号',
						value: 'ctmCode'
					},{
						name: '合同名称',
						value: 'ctmName'
					},{
						name: '合同类型',
						value: 'ctmAttr'
					},{
						name: '合同金额(元)',
						render(row){
							return (row.amount.addComma());
						}
					},{
						name: '归属部门',
						render(row){
							return (row.depName).split('-').reverse().join('-');
						}
					}, {
						name: '发起人',
						value: 'userName'
					}, {
						name: '操作',
						operator(row){
							return [{
								name: '详情',
								click(){
									console.log('click')
								}
							}]
						}
					}],
					url: '/ctm/contract/list',
					data: Utils.filterObjectNull(params)
				})

			},
			getChoose(value){
				this.form.status = value;
				this.getList();	
			},
			submitBtn(url){
				if(url == 'export'){ //导出数据
					let object = this.form;
					Utils.exportReport('/ctm/contract/export', object);

				}else if(url == 'startVerify'){  //发起审批
					this.$refs.approve.openModal();

				}
			},
			downTemplate(){  //下载模板
				this.$refs.tempate.openModal();

			}
		}
	}
	
</script>
