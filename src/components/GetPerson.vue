<!-- 组织架构人员选择 -->
<template>
  <!-- <el-dialog
  	  title="选择人员"
  	  :visible.sync="modal"
  	  @open="openHandle"
  	  size="small" class="choose-person">

  		<el-input placeholder="请输入员工姓名" style="margin-bottom:20px" v-model="realName">
  		    <el-button @click="getList" slot="append" icon="search" style="background-color: #01cd78; color: #fff;border-radius: 0;"></el-button>
  		</el-input>

  		<div id="personList"></div>

  		  <span slot="footer" class="dialog-footer">
  		    <el-button type="success" @click="modal = false">确 定</el-button>
  		    <el-button type="info" @click="modal = false">取 消</el-button>
  		  </span>
  	</el-dialog> -->

  <el-select v-model="value" filterable clearable :multiple="multiple" @change="getPerson" @remove-tag="removePerson" placeholder="请输入关键字">
    <el-option v-for="item in personList" :key="item.id" :label="item.realname" :value="item.id + '|' + item.realname">
      <span style="float:left" class="search-label">{{item.realname}}</span>
      <!-- <span style="float:right; padding-right:40px;" class="search-label">{{item.phone}}</span> -->
    </el-option>
  </el-select>
</template>

<style>
/* .choose-person .el-dialog__body{
		min-height: 580px;
	} */
</style>

<script>

export default {
  name: "getPerson",
  data() {
    return {
      value: undefined,
      personList: []
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.ajax({
        url: '/authority/user/dep/1',
        data: {
          pageNum: 1,
          pageSize: 1000
        },
        success(data, $this) {
          if (data.code == 'success') {
            $this.personList = data.content;
            $this.value = $this.selected;
          }
        }
      });
    },
    getPerson(data) {  //添加事件
      if (this.multiple) {
        let arr = [];
        for (let i = 0; i < data.length; i++) {
          arr.push({
            name: data[i].split('|')[1],
            value: data[i].split('|')[0]
          });
        }
        this.$emit('change', arr);
      } else {
        const person = data.split('|');
        const obj = {
          name: person[1],
          value: person[0]
        };
        this.$emit('change', obj);
      }
    },
    removePerson(data) {  //多选情况下的移除事件
      let { value } = data;
      let obj = {
        name: value.split('|')[1],
        value: value.split('|')[0]
      };
      this.$emit('remove', obj);
    }
  },
  props: ['change', 'multiple', 'remove', 'selected']   //selected 之前选中i的数据   remove 移除事件  multiple是否多选
};

	// export default{
	// 	name: 'getPerson',
	// 	data(){
	// 		return {
	// 			modal: false,
	// 			realName: '',
	// 			person:{}
	// 		}
	// 	},
	// 	methods:{
	// 		openModal(){
	// 			this.modal = true;
	// 		},
	// 		openHandle(){
	// 			setTimeout(()=>{
	// 				this.getList();
	// 			}, 200);
	// 		},
	// 		closeModal(){

	// 		},
	// 		getList(){
	// 			let $this = this;
	// 			this.tableList({
	// 				columns:[{
	// 					name: '工号',
	// 					value: 'usercode',
	// 					width: 100,
	// 				},{
	// 					name: "姓名",
	// 					value: 'realname',
	// 					width: 100,
	// 				},{
	// 					name: "所属部门",
	// 					value: 'depName'
	// 				},{
	// 					name: "手机",
	// 					value: "phone"
	// 				},{
	// 					name: "邮箱",
	// 					value: "email"
	// 				}],
	// 				url: '/authority/user/query/list',
	// 				data: {
	// 					queryInfo: this.realName
	// 				},
	// 				checkbox: function(selection){
	// 					this.person = selection;
	// 				},
	// 				element: '#personList',
	// 			})
	// 		}
	// 	}
	// }
</script>
