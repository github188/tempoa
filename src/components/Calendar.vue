<template>
    <div>
       <ul id="calendar">
           <li class="calendar-list calendar-week" v-for="(item, index) in week"  :key="index">星期{{item}}</li>
           <li class="calendar-list" v-for="(item, index) in date" :key="index" :class="[item.last]" >

               <div v-if="item.disabled" class="disabled">
                    {{item.date}}
               </div>

               <div class="enabled" v-else>

                   <template v-if="Array.isArray(item.info)">
                       <!-- 两个非正常半天 -->
                        <div class="calendar-list-box calendar-list-half">
                            <div class="double-half" v-for="(half, index) in item.info" :key="index" :style="{'background-color': half.bg}">
                                <div class="name" :style="{'color': half.color}">{{half.name}}</div>
                            </div>
                        </div>
                   </template>


                   <template v-else>
                    <!-- 半天 -->
                       <div class="calendar-list-box calendar-list-half"  v-if="item.info.half">    
                            <div class="name" :style="{'color': item.info.color}">{{item.info.name}}</div>
                            <span class="date">{{item.date}}</span>
                            <div class="half" :style="{'background-color': item.info.bg}"></div>
                        </div>


                        <template v-else>
                            <!-- 全天 -->
                            <template v-if="item.info.type == 0">
                                <!-- 正常全天 -->
                               <div class="normal-day">{{item.date}}</div>
                            </template>

                            <div class="calendar-list-box calendar-list-all" :style="{'background-color': item.info.bg}" v-else>

                                <!-- 非正常全天 -->
                                <span class="name" :style="{'color': item.info.color}">{{item.info.name}}</span>
                                <span class="date">{{item.date}}</span>
                            </div>
                        </template>
                   </template>
               </div>
           </li>
       </ul>
    </div>
</template>

<style scoped>
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
    }
    .calendar-list .disabled{
        color: #dadddb;
        padding: 35px;
    }
    .calendar-list .normal-day{
        padding: 35px;
    }
    .calendar-list.last{
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
</style>

<script>
    export default{
        name: 'calendar',
        data(){
            return {
                week: ['日', '一', '二', '三', '四', '五', '六'],
                date: []
            }
        },
        created(){
            this.dateList();
        },
        props:['month'],
        methods: {
            dateList (month) {
                let date = month || this.month.toString();
                let DATE = date.split('-');  //传过来的日期

                let activeDate = new Date(DATE[0], DATE[1] - 1 , 1);

                let bf = true, af = false;
                activeDate.setDate(1);
                activeDate.setDate(1 - activeDate.getDay());
                this.date = [];
                for (let j = 0; j < 42; j++) {
                    let date = activeDate.getDate();
                    if (date == 1) {
                        if (bf) {
                            bf = false;
                        } else {
                            af = true;
                        }
                    }

                    activeDate.setDate(date + 1);

                    let dayInfo = {
                        index: j,
                        date: date,
                        info: {
                            name: '',
                            bg: '#ffffff',
                            color: '#222222',
                            type: 0,
                            half: false                            
                        }
                    }
                    if(af || bf){
                        dayInfo.disabled = true;
                    }

                    if ((j) % 7 == 0 || (j+1) % 7 == 0) {  //周六或周日
                       dayInfo.last = 'last';
                    }

                    if(date == 8 || date == 10){
                        dayInfo.info = {
                            type: 2,
                            name: '事假',
                            bg: '#ddf8ed',
                            color: '#00cd78',
                            edit: {
                                name: '123123',
                                time: 213131313
                            }
                        }
                    }

                    if(date == '14'){
                        dayInfo.info = {
                            type: 2,
                            name: '出差',
                            bg: '#d7f5fa',
                            color: '#30bfee',
                            half: true,
                            edit: {
                                name: '123123',
                                time: 213131313
                            }
                        }
                    }

                    if(date == '16'){
                        dayInfo.info = [{
                            type: 2,
                            name: '出差',
                            bg: '#d7f5fa',
                            color: '#30bfee',
                            half: true
                        },
                        {
                            type: 2,
                            name: '请假',
                            bg: '#ddf8ed',
                            color: '#00cd78',
                            half: true
                        }]
                    }

                    this.date.push(dayInfo)
                }

            }     
        }
    }

</script>

