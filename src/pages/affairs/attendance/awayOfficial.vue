// 出差
<template>
    <div >
        <el-dialog title="
        出差申请" :visible.sync="modal" size="tiny">
            <el-form ref="form" :model="form" :rules="rules" label-width="100px" label-position="right">
                <el-form-item label="开始时间：" prop="startDate" style="display:inline-block; width: 215px;">
                    <el-date-picker style="width: 215px;"
                        :editable="false"
                        @change="countTime"
                        v-model="form.startDate"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>

                <el-form-item prop="startTime" style="display:inline-block; width: 215px">
                    <el-time-select style="width: 215px;"
                        v-model="form.startTime"
                        :editable="false"
                        @change="countTime"
                        :picker-options="{
                            start: '09:00',
                            step: '01:00',
                            end: '18:00'
                        }"
                        placeholder="选择时间">
                    </el-time-select>
                </el-form-item>

                <el-form-item label="结束时间：" prop="endDate" style="width: 215px; display:inline-block">
                    <el-date-picker style="width: 215px;"
                        :editable="false"
                        :picker-options="endDateOpt"
                        @change="countTime"
                        v-model="form.endDate"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>

                <el-form-item prop="endTime" style="width: 215px; display:inline-block">
                    <el-time-select style="width: 215px;"
                        v-model="form.endTime"
                        @change="countTime"
                        :editable="false"
                        name="endTime"
                        :picker-options="{
                            start: '09:00',
                            step: '01:00',
                            end: '18:00',
                            minTime: minTime()
                        }"
                        placeholder="选择时间">
                    </el-time-select>
                </el-form-item>

                <el-form-item label="时长(天)："  prop="timeLength">
                    <el-input disabled v-model="form.timeLength" style="width: 80px; margin-right:20px;"></el-input>
                    <span>如果申请日期包括周末，如有加班请另提加班申请。</span>
                </el-form-item>

                 <el-form-item label="出发地点："  prop="startAddress">
                    <el-input v-model="form.startAddress"></el-input>
                </el-form-item>

                 <el-form-item label="目的地点："  prop="endAddress">
                    <el-input v-model="form.endAddress"></el-input>
                </el-form-item>
            
                <el-form-item label="出差说明：" prop="remark">
                    <el-input v-model="form.remark" type="textarea"></el-input>
                </el-form-item>

                <el-form-item label="机票服务：" prop="reason">
                    <el-radio class="radio" v-model="form.isNeedplane" label="0">不需要</el-radio>
                    <el-radio class="radio" v-model="form.isNeedplane" label="1">需要</el-radio>
                </el-form-item>

                <el-form-item label="" prop="planeRemark" v-if="form.isNeedplane == '1'">
                    <el-input v-model="form.planeRemark" type="textarea" placeholder="请详细描述定机票起止地点及日期"></el-input>
                </el-form-item>


            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button type="success" @click="submit">确 定</el-button>
                <el-button type="info" @click="modal = false">取 消</el-button>
            </span>

        </el-dialog>
    </div>
</template>

<style scoped>
    .error{
        color: #f00;
    }
</style>

<script>
export default {
    name: "leaveModal",
    data(){
        return {
            endDateOpt: {
                disabledDate: (time) => {
                    return time.getTime() < this.form.startDate;
                }
            },
            modal: false,
            minTime(){
                if( (this.form.startDate && this.form.startDate.getTime()) == (this.form.endDate && this.form.endDate.getTime())){  //如果是同一天
                    return this.form.startTime;
                }
                return '06:00'
            },
            startDate: undefined,
            endDate: undefined,
            form:{
                startDate: undefined,
                startTime: undefined,
                endDate: undefined,
                endTime: undefined,
                startAddress: '',  //出发地
                endAddress: '', //目的地
                remark: '',  //说明
                timeLength: '',  //加班时长
                isNeedplane: '0',  //是否需要机票服务
                planeRemark: ''  //机票说明
            },
            rules: {
                timeLength: [{
                    required: true,
                    message: '时长不能为空!'
                }],
                startDate: [{
                    required: true,
                    message: '开始日期不能为空！'
                }],
                 endDate: [{
                    required: true,
                    message: '结束日期不能为空！'
                }],
                startTime: [{
                    required: true,
                    message: '开始时间不能为空！'
                }],
                endTime: [{
                    required: true,
                    message: '结束时间不能为空！'
                }],
                startAddress: [{
                    required: true,
                    message: '出发地点不能为空！'
                }],
                endAddress: [{
                    required: true,
                    message: '目的地点不能为空！'
                }],
                planeRemark: [{
                    required: true,
                    message: '机票服务说明不能为空！'
                }],
                remark: [{
                    required: true,
                    message: '出差说明不能为空！'
                }]
            }
        }
    },

    methods:{
        openModal(){
            this.modal = true;
        },
        getAffairs(obj){  //获取请假类型
            this.form.type = obj.value;
            this.form.day = obj.day;
        },
        countTime(data){ //计算请假时长
            const { startDate, startTime, endDate, endTime } = this.form;
            if(startDate && startTime && endDate && endTime){
                let START = (startDate).toString().split(' ')[0] + ' ' + startTime;
                let END = (endDate).toString().split(' ')[0] + ' ' + endTime;
                this.startDate = new Date(START).getTime();
                this.endDate = new Date(END).getTime()
                this.ajax({
                    url: '/cwa/leave/timelong',
                    data: {
                        starttime: this.startDate,
                        endtime: this.endDate
                    },
                    success(data, $this){
                        if(data.code == 'success'){
                            $this.form.timeLength = data.content;
                        }
                    }
                })
            }
        },
        submit(){
            this.$refs.form.validate((valid)=>{
                const params = {
                    userId: this.$store.state.u,
                    startTime: this.startDate,
                    endTime: this.endDate,
                    timeLength: this.form.timeLength,
                    startAddress: this.form.startAddress,
                    endAddress: this.form.endAddress,
                    isNeedplane: this.form.isNeedplane,
                    remark: this.form.remark
                };
                if(this.form.isNeedplane){
                    params.planeRemark = this.form.planeRemark;
                }
                this.ajax({
                    url: '/cwa/travel/start',
                    type: 'post',
                    data: params,
                    success(data, $this){
                        if(data.code == 'success'){
                            $this.$message({
                                message: '操作成功！',
                                type: 'success'
                            });
                            $this.modal = false;
                        }
                    }
                })
            })
        }
    }
}
</script>





