<!-- 新增项目 -->
<template>
	<div>
		<el-dialog
		  :title="title"
		  :visible.sync="modal"
		  size="small" class="add-project">
			<el-form :model="form" label-width="100px"  label-position="right" >
				  <el-form-item label="项目名称：">
				    <el-input v-model="form.proName"></el-input>
				  </el-form-item>

				  <el-form-item label="营销中心：" style="display: inline-block">
				   <v-market ref="market" @change="getMarket" style="width:190px"></v-market>
				  </el-form-item>

				   <el-form-item label="立项日期：" style="display: inline-block; margin-left: 72px;">
	                    <el-date-picker
					      type="date"
					      :editable="false"
					      v-model="form.proDate"
					      placeholder="选择日期">
					    </el-date-picker>
	                </el-form-item>

				   <el-form-item label="所属区域：">
	                    <v-area ref="area" @change="getArea"></v-area>
	                </el-form-item>

	                <el-form-item label="项目背景：">
	                    <el-input type="textarea" v-model="form.proContents"></el-input>
	                </el-form-item>

	                <hr>
	            <el-form-item label="市场负责人：" style="display: inline-block">
				   <el-input @focus="openPersonModal"></el-input>
				</el-form-item>

			   <el-form-item label="项目经理：" style="display: inline-block; margin-left: 72px;">
	                <el-date-picker
				      type="date"
				      placeholder="选择日期">
				    </el-date-picker>
	            </el-form-item>

	             <el-form-item label="项目成员：">
	               
	            </el-form-item>
			</el-form>

		  <span slot="footer" class="dialog-footer">
		    <el-button type="success" @click="modal = false">确 定</el-button>
		    <el-button type="info" @click="modal = false">取 消</el-button>
		  </span>
		</el-dialog>
		<v-person ref="choosePerson"></v-person>
	</div>
</template>

<style>
	.add-project .el-dialog{
		width: 700px;
	}
	.add-project .item-right{
		margin-right: 30px;
	}
</style>

<script>
	export default{
		name: 'addProject',
		data() {
	      return {
	        modal: false,
	        form: {
	        	proName: '',   //项目名称
	        	marktName: '',   //营销中心名称
	        	marktId: '',   //营销中心名称
	        	province: '',  //省名字
  	        	provinceId: '',  //省id
  	        	city: '',  //市名称
  	        	cityId: '',  //市ID
  	        	area: '',  //区名称
  	        	areaId: '',  //区ID
  	        	proDate: '',  //立项日期
  	        	proContents: '', //项目背景
  	        	pmo: {  //管理信息
  	        		1: {  //项目经理
  	        			personCategory: 1,
  	        			personId: '',   
  	        			personName: ''
  	        		},
  	        		2: {  //市场负责人
  	        			personCategory: 2,
  	        			personId: '',   
  	        			personName: ''
  	        		},
  	        		3: {  //项目成员
  	        			personCategory: 3,
  	        			personId: '',   
  	        			personName: ''
  	        		}
  	        	}

	        }
	      };
	    },
	    methods: {
	      openModal(){
	      	this.modal = true
	      },
	      getMarket(value, b){
	      	this.form.marktId = value;
	      },
	      getArea(obj){
	      	const { province, city, area } = obj;
	      	this.form.provinceId = province;
	      	this.form.cityId = city;
	      	this.form.areaId = area;
	      },
	      openPersonModal(){
	      	console.log(this.$refs.choosePerson)
      		this.$refs.choosePerson.openModal();
	      }
	    },
	    props: ['title']
	}
</script>
