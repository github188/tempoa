<template>
	<div>
		<v-panel>
			<el-form ref="formInline" :model="form" label-width="120px" :inline="true">
                
                <el-form-item label="姓名：">
                    <el-input v-model="form.realname"></el-input>
                </el-form-item>

                 <el-form-item label="直接上级：">
                    <el-input v-model="form.driectName"></el-input>
                </el-form-item>

                 <el-form-item label="常驻地：">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>

                <button style="margin-top:4px; margin-left: 60px;" type="button" @click="getList" class="btn btn-green">查询</button>

            </el-form>

		</v-panel>
		<v-panel>
			<div id="tableList">
				<p class="search-tips">请输入员工信息以查询！</p>
			</div>
		</v-panel>
	</div>
</template>
<style scoped>
	.search-tips{
		text-align: center;
		padding: 40px;
		font-size: 14px;
	}
</style>
<script>
	export default{
		name: 'contacts',
		data(){
			return {
				form: {
					realname: '',
					driectName: '',
					address: ''
				}
			}
		},
		methods:{
			getList(){
				const data = Utils.filterObjectNull(this.form);  //过滤值为空的对象
				console.log(Object.keys(data), 'data');
				if(Object.keys(data).length == 0){
					this.$message.error({
			            message: '查询字段不能为空！',
			            duration: 3000,
			            type: 'error',
			            showClose: true
			        });
			        return;
				}

				this.tableList({
					columns:[{
						name: '员工编号',
						value: 'usercode'
					},{
						name: '姓名',
						value: 'realname'
					},{
						name: '电话',
						value: 'phone'
					},{
						name: '常驻地',
						value: 'address'
					}],
					url: 'authority/user/phone/list',
					data: data
				})
			}
		}
	}
</script>
