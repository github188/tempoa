<template>
    <div>
       <ul id="calendar">
           <li class="calendar-list calendar-week" v-for="(item, index) in week"  :key="index">星期{{item}}</li>
           <li class="calendar-list" v-for="(item, index) in date" :key="index" :class="(item.last?item.last:'workday')" >

               <div v-if="item.disabled" class="disabled">  
                    {{item.date}}
               </div>

               <div :class="item.record.klass" v-else>
                    <template v-if="edit && item.record.klass != 'disabled'">
                        <!-- 可编辑的状态 -->
                        <template v-if="item.record.more">
                        <!-- 两个非正常半天 -->
                            <div class="calendar-list-box calendar-list-half">
                                <div style="cursor:pointer" title="编辑" @click="editHandel(item.record[0].id, item.day)" class="double-half" :style="{'background-color': item.record[0].bg}">
                                    <div class="name" :style="{'color': item.record[0].color}">{{item.record[0].name}}</div>
                                </div>

                                <div style="cursor:pointer" title="编辑" @click="editHandel(item.record[1].id, item.day)" class="double-half" :style="{'background-color': item.record[1].bg}">
                                    <div class="name" :style="{'color': item.record[1].color}">{{item.record[1].name}}</div>
                                </div>
                            </div>
                        </template>

                        <template v-else>
                            <!-- 半天 -->
                            <div style="cursor:pointer" title="编辑" @click="editHandel(item.record.id, item.day)" class="calendar-list-box calendar-list-half"  v-if="item.record.half">    
                                    <div class="name" :style="{'color': item.record.color}">{{item.record.name}}</div>
                                    <span class="date">{{item.date}}</span>
                                    <div class="half" :style="{'background-color': item.record.bg}"></div>
                                </div>
                                <template v-else>
                                    <!-- 全天 -->
                                    <template v-if="item.record.type == 0">
                                        <!-- 正常全天 -->
                                        <div style="cursor:pointer" title="编辑" @click="editHandel(item.record.id, item.day)" class="calendar-list-box calendar-list-all">
                                            <div class="name">{{item.record.name}}</div>
                                            <span class="date">{{item.date}}</span>
                                        </div>
                                    </template>

                                    <div style="cursor:pointer" title="编辑" @click="editHandel(item.record.id, item.day)" class="calendar-list-box calendar-list-all" :style="{'background-color': item.record.bg}" v-else>
                                        <!-- 非正常全天 -->
                                        <span class="name" :style="{'color': item.record.color}">{{item.record.name}}</span>
                                        <span class="date">{{item.date}}</span>
                                    </div>
                                </template>
                        </template>
                   </template>



                   <template v-else>
                        <!-- 不可编辑的状态 -->
                        <template v-if="item.record.more">
                        <!-- 两个非正常半天 -->
                            <div class="calendar-list-box calendar-list-half">
                                <div class="double-half" :style="{'background-color': item.record[0].bg}">
                                    <div class="name" :style="{'color': item.record[0].color}">{{item.record[0].name}}</div>
                                </div>

                                <div class="double-half" :style="{'background-color': item.record[1].bg}">
                                    <div class="name" :style="{'color': item.record[1].color}">{{item.record[1].name}}</div>
                                </div>
                            </div>
                        </template>

                        <template v-else>
                            <!-- 半天 -->
                            <div class="calendar-list-box calendar-list-half"  v-if="item.record.half">    
                                    <div class="name" :style="{'color': item.record.color}">{{item.record.name}}</div>
                                    <span class="date">{{item.date}}</span>
                                    <div class="half" :style="{'background-color': item.record.bg}"></div>
                                </div>
                                <template v-else>
                                    <!-- 全天 -->
                                    <template v-if="item.record.type == 0">
                                        <!-- 正常全天 -->
                                        <div class="calendar-list-box calendar-list-all">
                                            <div class="name">{{item.record.name}}</div>
                                            <span class="date">{{item.date}}</span>
                                        </div>
                                    </template>

                                    <div class="calendar-list-box calendar-list-all" :style="{'background-color': item.record.bg}" v-else>
                                        <!-- 非正常全天 -->
                                        <span class="name" :style="{'color': item.record.color}">{{item.record.name}}</span>
                                        <span class="date">{{item.date}}</span>
                                    </div>
                                </template>
                        </template>
                   </template>
                   
               </div>
           </li>
       </ul>

       <el-dialog title="修改考勤记录" :visible.sync="modal" size="tiny">
            <el-form ref="form" :model="form" :rules="rules" label-width="100px" label-position="right">
                <el-form-item label="状态：" prop="type">
                    <v-affairs @change="getAffairs"></v-affairs>
                    <span :class="[form.day == 0? 'error': '']" v-if="form.type == 4" style="padding-left: 10px">剩余年休假 {{form.day}} 天</span>
                    <span :class="[form.day == 0? 'error': '']" v-if="form.type == 5" style="padding-left: 10px">剩余调休假 {{form.day}} 天</span>
                </el-form-item>

                <el-form-item label="时长：" prop="time">
                    <el-select v-model="form.time" placeholder="请选择">
                        <el-option label="1天" value="1"></el-option>
                        <el-option label="0.5天" value="0.5"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="修改备注：" prop="reason">
                    <el-input v-model="form.reason" type="textarea"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button type="success" :disabled="disabled" @click="submit" v-if="disabled"><i class="el-icon-loading"></i></el-button>
                <el-button type="success" :disabled="disabled"  @click="submit" v-else>确 定</el-button>
                <el-button type="info" @click="modal = false">取 消</el-button>

            </span>

        </el-dialog>


    </div>
</template>

<style scoped>
    .error{
        color: red;
    }
    #calendar{
        border: 1px solid #e5e6e5;
        border-bottom: none;
        border-right: none;
        overflow: hidden;
        width: 100%;
        font-size: 14px;
    }
    .calendar-week{
        font-weight: bold;
        line-height: 80px;
    }
    .calendar-list{
        float: left;
        width: 14.28%;
        height: 80px;
        border-bottom: 1px solid #e5e6e5;
        border-right: 1px solid #e5e6e5;
        text-align: center;
        position: relative;
        list-style: none;
    }
    .calendar-list .disabled{
        color: #dadddb;
        padding: 35px;
    }
    .calendar-list .normal-day{
        padding: 35px;
    }
    .calendar-list.weekend{
        background: #f2f2f2;
    }
    .calendar-list-box, .calendar-list .enabled{
        height: 100%;
    }
    .calendar-list-box .date{
        position: absolute;
        right: 10px;
        top: 10px;
    }
    .calendar-list-box .name{
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -15px;
        margin-top: -5px;
    }
    .calendar-list-half .half{
        width: 50%;
        height: 100%;
    }

    .calendar-list-half .double-half{
        width: 50%;
        height: 100%;
        float: left;
        position: relative;
    }
    .calendar-list-half .double-half:first-child{
        border-right: 1px solid #fff;
    }
    .calendar-list .edit-tag{
        overflow: hidden;
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
    }
    .calendar-list .edit-tag:after{
        position: absolute;
        content: '';
        left: -10px;
        top: -10px;
        height: 20px;
        width: 20px;
        background: #01cd78;
        transform: rotate(-130deg);
        -webkit-transform: rotate(-130deg);
        -ms-transform: rotate(-130deg);
        -o-transform: rotate(-130deg);
        -moz-transform: rotate(-130deg);;

    }
    .calendar-list .edit-log{
        padding: 20px 0;
        width: 200%;
        min-height: 200%;
        box-shadow: 0 1px 6px rgba(0,0,0,.2);
        position: absolute;
        left: 0;
        top: 0;
        background: #fff;
        z-index: 9999;
        display: none;
        max-height: 280px;
        overflow: auto;
        color: #333;
    }
    .calendar-list .edit-log p{
        line-height: 20px;
        text-align: justify;
        margin: 0;
        margin-bottom: 8px;
        padding: 0 10px;
        word-break: break-all;
        word-wrap: break-word;
    }
    .calendar-list .edit-tag{
        display: block;
        height:20px;
        width: 20px;
        overflow: hidden;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 100;
    }
</style>

<script>
    export default{
        name: 'calendar',
        data(){
            return {
                week: ['日', '一', '二', '三', '四', '五', '六'],
                date: [],
                type: [],
                edit: false,
                modal: false,
                disabled: false,
                form: {
                    reason: '',
                    day: '',  //假期剩余天数
                    type: '', //修改类型
                    time: '',  //时长
                    userId: '',  //用户id
                    typeName: ''
                },
                rules: {
                    type:[{
                        required: true,
                        message: '状态不能为空！'
                    }],
                    time:[{
                        required: true,
                        message: '请选择时长！'
                    }],
                    reason: [{
                        required: true,
                        message: '修改备注不能为空！'
                    }],
                   
                }
            }
        },
        methods: {
            getType(){
                this.ajax({   //获取请假类型
                    url: 'ctm/setting/param/list',
                    data:{
                        code: 'cwa_leave_type'
                    },
                    success(data, $this){
                        if(data.code == 'success'){
                            $this.type = data.content;
                            console.log(data.content, 'content')
                            $this.dateList();
                        }
                    }
                });
            },

           getAffairs(obj){  //获取请假类型
                this.form.type = obj.value;
                this.form.day = obj.day;
            },

            editHandel(day, id){
                this.modal = true;
                console.log(day, id);
            },
            submit(){

                this.$refs.form.validate((valid)=>{
                    if(valid){
                        this.disabled = true;
                        console.log(this.form)
                    }
                })

            },
            dateList (month, data, type) {
                this.date = [];
                if(!month){
                    return;
                }
                let DATE = month.split('-');  //传过来的日期
                let $year = DATE[0];  //年
                let $month = DATE[1];  //月
                let activeDate = new Date($year, $month - 1 , 1);
                let bf = true, af = false;
                activeDate.setDate(1);
                activeDate.setDate(1 - activeDate.getDay());

                let leaveTypeObj = {};   //请假类型
                let leaveType = type;
                for (let type = 0; type < leaveType.length; type++) {
                    let value = leaveType[type].value;   //考勤类型
                    leaveTypeObj[value] = {
                        name: leaveType[type].name,
                        value: leaveType[type].value,
                        style: (function () {
                            if (value >= 4 && value != 9) {  //请假
                                return {
                                    bg: '#ddf8ed',
                                    color: '#00cd78'
                                }
                            }
                            if (leaveType[type].value == 2 || value == 9) {  //加班
                                return {
                                    bg: '#ffdecc',
                                    color: '#f05738'
                                }
                            }
                            if (leaveType[type].value == 3) {  //出差
                                return {
                                    bg: '#d7f5fa',
                                    color: '#30bfee'
                                }
                            }
                            return {   //正常
                                bg: '#ffffff',
                                color: '#222222'
                            }
                        })()
                    }
                }
                
                for (let j = 0; j < 42; j++) {
                    let $date = activeDate.getDate();
                    if ($date == 1) {
                        if (bf) {
                            bf = false;
                        } else {
                            af = true;
                        }
                    }

                    activeDate.setDate($date + 1);

                    let dayInfo = {
                        date: $date,
                        day: [$year, $month, ($date.toString()).length == 1?'0'+$date:$date].join('-'),
                        record: {}
                    }
                    if(af || bf){
                        dayInfo.disabled = true;   //是否本月日历之外
                    }

                    let tempDay = [];  

                    for(let day = 0; day < data.length; day++){   //获取当月数据
                        var $day =  data[day];
                        if( [$year, $month, $date].join('-').toTime()  === ($day.date).toTime() ){
                            tempDay.push({
                                $day: $day,
                                $type: leaveTypeObj[$day.type]
                            });
                        }
                    }

                    if ((j) % 7 == 0 || (j+1) % 7 == 0) {  //周六或周日
                        dayInfo.record.name = "休息";
                        dayInfo.record.klass = 'enabled';

                        if((j) % 7 == 0){
                            dayInfo.last = 'weekend diurnal';
                        }else{
                            dayInfo.last = 'weekend sat';
                        }
                    }else if(tempDay.length == 0){  //正常上班

                     dayInfo.record =  {
                            name: '正常',
                            klass: 'enabled',
                            bg: '#fff',
                            color: '#222',
                            type: 0,
                            half: false
                        }
                    }

                    var toDayYear = [new Date().getFullYear(), new Date().getMonth() + 1, 0].join('-').toTime();
                    var dayYear = [$year, $month, 0].join('-').toTime();
                    if($date > new Date().getDate()  && toDayYear == dayYear){   //不可用
                        dayInfo.record =  {
                            name: '',
                            klass: 'disabled',
                            bg: '#fff',
                            color: '#222',
                            type: 0,
                            half: false
                        }
                    }

                    for(let temp = 0; temp < tempDay.length; temp++ ){
                        if(tempDay.length == 1){   //一天或者半天
                            let $type = tempDay[0].$type;
                            let $day = tempDay[0].$day;
                            let style = $type.style;
                            
                            dayInfo.record = {
                                klass: 'enabled',
                                name: $type.name,
                                value: $type.value,
                                color: style.color,
                                bg: style.bg,
                                id: $day.id,
                                remark: $day.remark
                            };
                            if(tempDay[0].$day.time == 0.5){   //半天
                                dayInfo.record.half = true;
                            }
                        }
                        else if(tempDay.length == 2){  //两个半天
                            dayInfo.record.more = true;
                            dayInfo.record.klass = 'enabled';
                            let $type = tempDay[temp].$type;
                            let style = $type.style;
                            let $day = tempDay[0].$day;
                            dayInfo.record[temp] = {
                                name: $type.name,
                                value: $type.value,
                                color: style.color,
                                bg: style.bg,
                                half: true,
                                id: $day.id,
                                remark: $day.remark
                            }
                        }
                    }
                    this.date.push(dayInfo);
                    
                }

                console.log(this.date)
            }     
        }
    }

</script>

