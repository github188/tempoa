<template>
	<div>
		<v-panel>
			
			<div class="department">
				<v-department @click="treeClick"></v-department>
			</div>
			<div style="padding-left: 320px;">
				<el-form ref="formInline" :model="form" label-width="60px" :inline="true">
					<el-form-item label="月份：">
						<el-date-picker :editable="false" :picker-options="pickerOptions" @change="getMonth" v-model="form.month" type="month" placeholder="选择月">
						</el-date-picker>
					</el-form-item>

					<el-form-item label="姓名：">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<button type="button" @click="getList" class="btn btn-green" style="margin-top:4px; margin-left: 10px;">查询</button>

					<div class="pull-right">
						<button v-for="(item, index) in button" :key="index" type="button" @click="submitReport(item.url)" class="btn btn-space" style="margin-top:4px; margin-left: 10px;">{{item.name}}</button>
					</div>
					
				</el-form>
				<div id="tableList"></div>
			</div>
			
		</v-panel>

		<el-dialog title="考勤详情" :visible.sync="modal" size="small" @close="closeModal" class="calendar-modal">
			<v-calendar ref="calendar" :edit="true"></v-calendar>
        </el-dialog>

	</div>
</template>
<style scoped>
	.department{
		width:  300px;
		float: left;
		
	}
	.panel{
		overflow: hidden;
	}
</style>
<style>
	.department .el-tree{
		overflow: auto;
		height: 600px;
	}
	.calendar-modal .el-dialog{
		width: 1300px;
		height: 700px;;
	}
</style>


<script>
	import Calendar from '@/components/Calendar'  //日历考勤
	export default{
		name: 'report',
		components: {
			'v-calendar': Calendar
		},
		data(){
			let date = new Date();
			let month = (date.getMonth() + 1).toString();
			return {
				pickerOptions: {
					disabledDate(time) {
						return time.getTime() > Date.now() - 8.64e7;
					}
				},
				flag: true, //是否提交报表
				modal: false,
				form: {
					month: date.getFullYear() + '-' + (month.length == 1?'0'+month:month),
					name: '',
					depId: 1
				},
				button: []
			};
		},
		created(){
			this.getList();
		},	
		mounted(){
			//获取当前用户看到的按钮
			Utils.getButton((data)=>{
				this.button = data;
			})
		},
		methods: {
			treeClick(a){
				this.form.depId = a.id;
			},
			getMonth(month){
				this.form.month = month;
			},
			getType(id){
                this.ajax({   //获取请假类型
                    url: 'ctm/setting/param/list',
                    data:{
                        code: 'cwa_leave_type'
                    },
                    success(data, $this){
                        if(data.code == 'success'){
							$this.getData(id, $this.form.month, data.content);
                        }
                    }
                });
            },
			getData(id, month, type){  //用户的出勤数据
				this.ajax({
					url: '/cwa/attendance/list',
					data:{
						month: month,
						userId: id
					},
					success(data, $this){
						if(data.code == 'success'){
							$this.$refs.calendar.dateList(month,  data.content, type, id);
						}
					}
				})
			},
			isSubmit(){
				this.ajax({
					url: '/cwa/attendance/issubmit',
					data: {
						depId: depId,
						date: month
					},
					success(data, $this) {
						if (data.code == "success") {
							if(data.content == 0){ //未提交
								$this.flag = false;
							}
						} 
					}
				});
			},
			submitReport(id){  //提交报表或导出报表
				let object = this.form;
				if(id == 'exportReport'){  //导出
					Utils.exportReport('/cwa/attendance/dept/export', object);
				}else if(id == 'submitReport'){  //提交报表
					
					if(this.flag){
						this.$message({
							type: 'warning',
							message: '报表已经提交过了！'
						})
					}else{
						
						this.ajax({
							url: '/cwa/attendance/table/submit',
							data: Utils.filterObjectNull(params),
							type: 'post',
							success(data){
								if(data.code == 'success'){
									$this.$message({
										type: 'success',
										message: '报表提交成功！'
									})
								}
							}
						})
					}
				}
			},
	
			getList(){
				let month = (((this.form.month).toString()).split(' ')[0]).split('-');
				let params = this.form;
				const $this = this;
				this.tableList({
					url: '/cwa/attendance/atten/list',
					data: Utils.filterObjectNull(params),
					columns:[{
						name: "姓名",
						value: "userRealname"
					},{
						name: "工号",
						value: "usercode"
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
						width: 100,
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
					},{
						name: '操作',
						operator(row){
							return [{
								name: '详情',
								click(row){
									$this.modal = true;
									$this.getType(row.id);
								}
							}]
						}
					}]
				})
			},
			closeModal(){
				this.$refs.calendar.modal = false;
			}
		}
	}
</script>
