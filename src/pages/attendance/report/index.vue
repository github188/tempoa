<template>
	<div>
		<v-panel>
			<el-row :gutter="24">
				<el-col :span="6">
					<div class="department">
						<v-department @click="treeClick"></v-department>
					</div>
				</el-col>
				<el-col :span="18">
					<el-form ref="formInline" :model="form" label-width="60px" :inline="true">
						<el-form-item label="月份：">
							<el-date-picker :editable="false" :picker-options="pickerOptions" v-model="form.month" type="month" placeholder="选择月">
							</el-date-picker>
						</el-form-item>

						<el-form-item label="姓名：">
							<el-input v-model="form.name"></el-input>
						</el-form-item>
						<button type="button" @click="getList" class="btn btn-green" style="margin-top:4px; margin-left: 10px;">查询</button>

					</el-form>

					<div id="tableList"></div>
				</el-col>
			</el-row>

		</v-panel>
	</div>
</template>
<style scoped>
	.department{
		width:  300px;
		float: left;
		overflow: auto;
		height: 600px;
	}
	.panel{
		overflow: hidden;
	}
</style>

<script>
	export default{
		name: 'report',
		data(){
			return {
				pickerOptions: {
					disabledDate(time) {
						return time.getTime() > Date.now() - 8.64e7;
					}
				},
				form: {
					month: new Date(),
					name: ''
				}
			};
		},
		created(){
			// this.getList();
		},	
		methods: {
			treeClick(a, b, c){
				console.log(a, b, c)
			},
			getList(id){
				this.tableList({
					url: '/cwa/attendance/att/sub/list',
					data: {
						depId: 1
					},
					columns:[{
						name: "姓名",
						valie: "userRealname"
					},{
						name: "工号",
						valie: "usercode"
					},{
						name: '部门',
						value: 'depName'
					}, {
						name: '正常',
						value: 'normal'
					}, {
						name: '加班',
						value: 'overtime'
					}, {
						name: '节假日加班',
						value: 'overtimeHoli'
					}, {
						name: '出差',
						value: 'travel'
					}, {
						name: '年休假',
						value: 'leave0'
					}, {
						name: '调休假',
						value: 'leave1'
					}, {
						name: '病假',
						value: 'leave2'
					}, {
						name: '事假',
						value: 'leave3'
					}, {
						name: '有薪假',
						value: 'leave4'
					}]
				})
			}
		}
	}
</script>
