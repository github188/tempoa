<template>
   <div>
	    <el-select v-model="area.province" clearable class="select-area" @change="getCity" placeholder="请选择">
		    <el-option
			      v-for="item in provinceList"
			      :key="item.provinceId"
			      :label="item.province"
			      :value="item.provinceId+'|'+item.province">
			    </el-option>
		 </el-select>

		 <el-select v-model="area.city"  clearable class="select-area" @change="getArea" placeholder="请选择">
		    <el-option
		      v-for="item in cityList"
		      :key="item.cityId"
		      :label="item.city"
		      :value="item.cityId + '|' + item.city">
		    </el-option>
		 </el-select>

		 <el-select v-model="area.area" clearable class="select-area" @change="returnAll" placeholder="请选择">
		    <el-option
		      v-for="item in countyList"
		      :key="item.areaId"
		      :label="item.area"
		      :value="item.areaId+'|'+item.area">
		    </el-option>
		 </el-select>
   </div>
</template>
<style scoped>
	.select-area{
		width:160px;
		margin-right:15px;
	}
</style>
<script>
	/**
	 *  获取全国省市县数据
	 */
	export default{
		name: 'areaChoose',
		created(){
			this.ajax({
				url: '/region/province',
				success(data, $this){
					if(data.code == 'success'){
						$this.provinceList = data.content;
					}
				}
			})
		},
		data(){
			return {
		        provinceList: [],
		        cityList: [],
		        countyList: [],
		        area: {
		        	province:  {},
			        city: {},
			        area: {}
				},
				result: {
					province:  {},
			        city: {},
			        area: {}
				}
			}
		},
		methods: {
			getCity(value){
				if(!value) return;
				const _value = value.split('|');
				let temp = {
					name: _value[1],
					value: _value[0]
				}
				this.ajax({
					url: '/region/'+ temp.value +'/city',
					success(data, $this){
						if(data.code == 'success'){
							$this.cityList = data.content;
							$this.area.city = "";
							$this.area.area = "";
							$this.result.province = temp;
							$this.$emit('change', $this.result);
						}
					}
				})
			},
			getArea(value){
				if(!value) return;
				const _value = value.split('|');
				let temp = {
					name: _value[1],
					value: _value[0]
				}
				this.ajax({
					url: '/region/'+ temp.value +'/area',
					success(data, $this){
						if(data.code == 'success'){
							$this.countyList = data.content;
							$this.area.area = "";
							$this.result.city = temp;
							$this.$emit('change', $this.result);
						}
					}
				})
			},
			returnAll(value){
				if(!value) return;
				const _value = value.split('|');
				let temp = {
					name: _value[1],
					value: _value[0]
				}
				this.result.area = temp;
				this.$emit('change', this.result);
			},
			props: ['change']
		}
	}
</script>
