<template>
	<div>
       <v-panel class="search-panel">
            <el-form :model="form" label-width="120px" :inline="true">
                <el-form-item label="项目归属：">
                    <v-choose type="radio" @change="getChoose" :data="form.tabChoose"></v-choose>
                </el-form-item>

                   
            </el-form>

            <div class="search-box">
                <button type="button" @click="getList" class="btn btn-green">查询</button>
            </div>
		</v-panel>
    </div>
</template>

<script>
	export default {
		name: 'contracSetting',
		data(){
			return {
				form: {
					tabChoose: [{
						name: '已通过',
						value: 2
					},{
						name: '审批中',
						value: 1
					},{
						name: '已驳回',
						value: 3
					}]
				}
			}
		},
		methods:{
			getList(){

			},
			getChoose(){

			}
		}
	}
	
</script>
