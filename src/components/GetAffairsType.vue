<template>
    <el-select v-model="result" class="select-area" @change="getCode">
	    <el-option
		      v-for="item in code"
		      :key="item.id"
		      :label="item.name"
		      :value="item.value +'|'+ item.name">
		    </el-option>
	 </el-select>
</template>
<style scoped>
	
</style>

<script>
	export default {
		name: 'getCode',
		data(){
            console.log(this.filter)
			return {
				code: [],
				result: ''
			}
		},
		created(){
			this.ajax({   //获取请假类型
				url: 'ctm/setting/param/list',
				data:{
					code: 'cwa_leave_type'
				},
				success(data, $this){
					if(data.code == 'success'){
                        let content = data.content;
                        if($this.filter == 'true'){
                            let temp = [];
                            for(let i = 0; i < content.length; i++){
                                if(content[i].value >= 4 && content[i].value != 9){
                                    temp.push(content[i])
                                }
                            }
                            $this.code = temp;
                        }else{
                            $this.code = content;
                        }
					}
				}
            });
            
            
		},
		methods: {
			getCode(code){
				this.result = code;
                let value = code.split('|');
                this.surplusDay(value[0], (day)=>{
                    const obj = {
                        name: value[1],
                        value: value[0],
                        day: day
                    };
                    this.$emit('change', obj);
                })
            },
            surplusDay(type, callback){ //查询剩余假期天数
                this.ajax({
                    url: '/cwa/leave/user/holiday',
                    data: {
                        type: type
                    },
                    success(data, $this){
                        if(data.code == 'success'){
                            callback(data.content);
                        }
                    }
                })
            }
        },
		props: ['change', 'filter']
	}
</script>
