<template>
	<div>
		<v-panel>
	
			<el-form ref="formInline" :model="form" label-width="60px" :inline="true">
				<el-form-item label="月份：">
					<el-date-picker style="cursor:pointer" :editable="false" @change="chooseMonth" :picker-options="pickerOptions" v-model="form.month" type="month" placeholder="选择月">
					</el-date-picker>
				</el-form-item>
	
				<div class="operator-panel">
					<button type="button" @click="openLeavel" class="btn btn-space">+&nbsp;请假</button>
					<button type="button" @click="openOvertime" class="btn btn-space">+&nbsp;加班</button>
					<button type="button" @click="openAway" class="btn btn-space">+&nbsp;出差</button>
				</div>
	
			</el-form>
		</v-panel>

		<v-panel>
			<v-calendar ref="calendar"></v-calendar>
		</v-panel>

		<v-leave ref="leaveModal"></v-leave>
		<v-overtime ref="overtimeModal"></v-overtime>
		<v-away ref="awayModal"></v-away>
		
	</div>
</template>
<style scoped>
	.operator-panel {
		float: right;
	}
	.operator-panel button {
		margin-left: 15px;
	}
</style>
<script>
	import leave from './leave'   //请假
	import overtime from './overtime'  //加班
	import awayOffcial from './awayOfficial'  //出差
	import Calendar from '@/components/Calendar'  //日历考勤

	export default {
		name: 'myAttendance',
		components: {
			'v-leave': leave,
			'v-overtime': overtime,
			'v-away': awayOffcial,
			'v-calendar': Calendar
		},
		data() {
			let date = new Date();
			let month = (date.getMonth() + 1).toString();
			return {
				pickerOptions: {
					disabledDate(time) {
						return time.getTime() > Date.now() - 8.64e7;
					}
				},
				form: {
					month: date.getFullYear() + '-' + (month.length == 1?'0'+month:month),
					type: []
				}
			}
		},
		created(){
			this.getType();
		},
		methods:{
			getType(){
                this.ajax({   //获取请假类型
                    url: 'ctm/setting/param/list',
                    data:{
                        code: 'cwa_leave_type'
                    },
                    success(data, $this){
                        if(data.code == 'success'){
							$this.getData($this.form.month);
							$this.form.type = data.content;
                        }
                    }
                });
            },
			getData(month){
				this.ajax({
					url: '/cwa/attendance/list',
					data:{
						month: month,
						userId: Utils.getValue('u')
					},
					success(data, $this){
						if(data.code == 'success'){
							$this.$refs.calendar.dateList(month,  data.content, $this.form.type);
						}
					}
				})
			},
			openLeavel(){
				this.$refs.leaveModal.openModal();
			},
			openOvertime(){
				this.$refs.overtimeModal.openModal();
			},
			openAway(){
				this.$refs.awayModal.openModal();
			},
			chooseMonth(val){
				this.getData(val);
			}
		}
	}
</script>
