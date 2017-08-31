<template>
  <div>
      <v-header></v-header>
      <div class="content">

          <div class="person-left">
            <a href="javascript:;" class="person-avatar">
                <img style="cursor:pointer" @click="dialogVisible = true " :src="avatar" alt="">
            </a>

            <p class="person-name">&nbsp;</p>
            <p class="person-day">这是您在亿车的第<span>{{info.joindate}}</span></p>

            <el-upload
                class="upload-demo"
                :action="upload.url"
                :on-success="handleSuccess"
                :show-file-list="false">
                <button type="button" class="person-avatar-edit" href="javascript:;">修改头像</button>
            </el-upload>

            <el-dialog v-model="dialogVisible" size="small">
                <img width="100%" :src="avatar" alt="">
            </el-dialog>

        </div>

        <div class="person-right">
            <div class="person-item">
                <div class="person-head">基本信息</div>
                <div class="person-info">
                    <div class="person-info-half">
                        <label class="person-info-label">工号</label>
                        <span class="person-info-value">{{info.usercode}}</span>
                    </div>

                    <div class="person-info-half">
                        <label class="person-info-label">姓名</label>
                        <span class="person-info-value">{{info.realname}}</span>
                    </div>
                </div>

                <div class="person-info">
                    <div class="person-info-half">
                        <label class="person-info-label">部门</label>
                        <span class="person-info-value">{{info.depName}}</span>
                    </div>

                    <div class="person-info-half">
                        <label class="person-info-label">岗位</label>
                        <span class="person-info-value">{{info.post}}</span>
                    </div>
                </div>
            </div>

            <div class="person-item">
                <div class="person-head">联系方式</div>
                <div class="person-info">
                    <div class="person-info-half">
                        <label class="person-info-label">手机</label>

                        <template v-if="status">
                            <el-input class="person-info-phone"  v-model="info.phone" placeholder="请输入手机号"></el-input>
                            <a href="javascript:;" @click="save" class="operate-light">保存</a>
                            <a href="javascript:;" @click="cancel">取消</a>
                        </template>

                        <template v-else>
                            <span class="person-info-value person-info-phone">{{info.phone}}</span>
                            <a href="javascript:;" @click="edit" class="operate-light">编辑</a>
                        </template>
                        
                    </div>

                    <div class="person-info-half">
                        <label class="person-info-label">座机</label>
                        <span class="person-info-value">{{info.tel || '-'}}</span>
                    </div>
                </div>

                <div class="person-info">
                    <div class="person-info-half">
                        <label class="person-info-label">邮箱</label>
                        <span class="person-info-value">{{info.username}}</span>
                    </div>

                    <div class="person-info-half">
                        <label class="person-info-label">常驻地</label>
                        <span class="person-info-value">{{info.address}}</span>
                    </div>
                </div>
            </div>
        </div>

      </div>
  </div>
</template>


<style scoped>
    .content{
        max-width: 1440px;
        margin: 0 auto;
        margin-top: 102px;
    }

    .person-left{
        width: 280px;
        background-color: #fff;
        height: 100%;
        float: left;
        text-align: center;
    }
    .person-avatar{
        display: block;
        width: 150px;
        height: 150px;
        margin: 0 auto;
        margin-top: 35px;
        cursor: default;
    }
    .person-avatar img{
        height: 100%;
        width: 100%;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
    }
    .person-name{
        margin-top: 30px;
        font-size: 16px;
    }
    .person-day{
        margin-top: 17px;
        font-size: 16px;
    }
    .person-day span{
        color: #f37f39;
        font-weight: bold;
    }
    .person-avatar-edit{
        height: 32px;
        line-height: 32px;
        width: 100px;
        background: #01cd78;
        color: #fff;
        border: none;
        margin-top: 35px;
        cursor: pointer;
    }
    .person-right{
        height: 100%;
        background: #fff;
        margin-left: 304px;
        padding-top: 50px;
        padding-left: 24px;
    }
    .person-head{
        color: #333333;
        font-size: 16px;
    }
    .person-item{
        margin-bottom: 50px;
    }
    .person-head:before{
        content: '';
        background: #01cd78;
        height: 16px;
        width: 4px;
        display: inline-block;
        position: relative;
        top: 2px;
        margin-right: 10px;
    }
    .person-info-half{
        display: inline-block;
        width: 400px;
        font-size: 14px;
        margin-top: 25px;
    }
    .person-info-label{
        display: block;
        color: #999;
        font-weight:normal;
        margin-bottom: 15px;
    }
    .person-info-phone{
        width: 180px;
        display: inline-block
    }
    .operate-light{
        color: #01cd78;
        margin-left: 60px;
        margin-right: 10px;
    }
    .btn-success,.btn-success:hover,.btn-success:active,.btn-success:focus{
        background-color: #01cd78;
        border-color: #01cd78;
    }

</style>

<script>
    import Header from '@/pages/index/header'
    import { getStore } from '@/utils/localStorage'
    import { appHost, appRoot, avatar } from '@/config/config'
    let u = getStore('u');
    export default {
        name: 'personInfo',
        components: {
            'v-header': Header
        },
        data(){
            return {
                info: {},  //个人信息
                avatar: '',  //头像
                status: false,  //手机号是否编辑状态
                phone: '',
                dialogVisible: false,  //大图预览
                upload: {
                    url: appHost + appRoot + '/authority/user/picture/head/upload'
                }
            }
        },
        created(){
            this.ajax({   //获取用户信息
                url: '/authority/user/'+ u +'/detail',
                success(data, $this){
                    if(data.code == 'success'){
                        $this.info = data.content;
                        $this.avatar = Utils.getAvatar(data.content);
                        $this.phone = $this.info.phone;
                    }
                }
            })
        },
        methods:{
            editInfo(info){
                let params = info;
                params.id = u;
                console.log(params, 'params')
                this.ajax({
                    url: '/authority/user',
                    data: params,
                    type: 'put',
                    success(data, $this){
                        if(data.code == 'success'){
                            $this.$message({
                                message: '操作成功！',
                                type: 'success'
                            })
                            $this.status = false;
                            $this.phone = info.phone;
                        }
                    }
                })
            },
            edit(){
                this.status = true;
            },
            cancel(){
                this.status = false;
                this.info.phone = this.phone;
            },
            save(){
                const reg = /^1[3|4|5|7|8][0-9]{9}$/;
                if(!reg.test(this.info.phone)){
                    this.$message({
                        message: '手机号码格式不正确！',
                        type: 'error'
                    })
                }else{
                    this.editInfo({
                        phone: this.info.phone
                    })
                }
            },
    
            handleSuccess(data, file){
                this.avatar = file.url;
                if(data.code == 'success' ){
                    const  { picId } = data.content;
                    this.editInfo({
                        headPic: picId
                    })
                }
            }
        },
        mounted(){
            $('.content').height($(document).height() - 103);
        }
    }

</script>
