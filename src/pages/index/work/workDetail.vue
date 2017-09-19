<template>
  <div class="content">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/work/list' }">我的工作台</el-breadcrumb-item>
      <el-breadcrumb-item>详情</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="order-detail">
      <h2 class="order-title">{{title}}</h2>
      <div class="order-box order-detail-header">
        <img class="user-avatar" :src="getAvatar(this.userInfo)">
        <div class="user-info">
          <span class="user-name">{{userInfo.realname}}</span>
          <p class="user-section">{{userInfo.depName}}</p>
        </div>
        <span class="order-time">{{ details.addTime && new Date(details.addTime).toString()}}</span>
      </div>

      <div class="order-box order-detail-container">

        <ul v-if="type == 4">
          <!-- 合同相关信息 -->
          <contract :details="details"></contract>
          <contractApprove ref="contractApprove"></contractApprove>
        </ul>
      </div>

      <template v-if="btnList">
        <template v-if="btnList.contractAgree || btnList.contractRebut">
          <div class="approve-input">
            <el-input type="textarea" v-model="message" :autosize="{ minRows: 3, maxRows: 10}" placeholder="请输入审核意见">
            </el-input>
            <el-upload accept="image/*" id="approveImg" list-type="picture-card" :before-upload="uploadBefore" :on-success="uploadSuccess" :on-remove="uploadRemove" :action="domain+action">
              <a href="javascript:;" class="upload-img" title="上传图片"></a>
            </el-upload>
          </div>
          <div class="approve-btn">
            <div style="position: relative;top: 30px; left: -120px;" v-if="btnList.ceoApprove">
              <label for=""> CEO审批：</label>
              <el-switch on-text="是" off-text="否" v-model="ceoApprove"></el-switch>
            </div>
            <el-button v-if="btnList.contractAgree" @click="approveAgree" class="operate-btn" type="success">同意</el-button>
            <el-button v-if="btnList.contractRebut" @click="approveRebut" class="operate-btn" type="info">驳回</el-button>
          </div>
        </template>

        <template v-if="btnList.contractEnd || btnList.contractRestart">
          <div class="approve-btn">
            <el-button v-if="btnList.contractRestart" @click="approveRestart" class="operate-btn" type="success">重新发起审批</el-button>
            <el-button v-if="btnList.contractEnd" @click="approveEnd" class="operate-btn" type="info">结束流程</el-button>
          </div>
        </template>
      </template>

    </div>
    <div class="approve-box">
      <div class="approve-record">审批记录</div>
      <div id="approveResult"></div>
      <ul class="approve-record-list" id="processLine">
        <li class="approve-record-ing" v-for="(item, index) in doingList" :key="index">
          <p class="approve-name">{{item.nodeName}}
            <span class="approve-time">{{item.updateTime && new Date(item.updateTime).toString()}}</span>
          </p>
          <p class="approve-process">{{item.handlerName}}：
            <span class="deal-status">处理中</span>
          </p>
        </li>

        <li class="approve-record-end" v-for="(item, index) in doneList" :key="index">
          <p class="approve-name">{{item.nodeName}}
            <span class="approve-time">{{item.updateTime && new Date(item.updateTime).toString()}}</span>
          </p>
          <p class="approve-process">{{item.handlerName}}：
            <span class="deal-status">{{['驳回', '同意','重新发起审批', '结束流程'][item.result]}}</span>
          </p>
          <div class="approve-reason" v-html="item.opinion"></div>
            <!-- <div class="approve-reason">{{item.opinion}}</div> -->
        </li>

        <li class="approve-record-end">
          <p class="approve-name">发起申请
            <span class="approve-time">{{details.addTime && new Date(details.addTime).toString()}}</span>
          </p>
          <p class="approve-process">{{details.userName}}</p>
        </li>

      </ul>
    </div>
  </div>
</template>
<style>
.order-detail-container .el-form-item {
  margin-bottom: 5px;
}

.order-detail-container .el-icon-document {
  color: #97a8be;
  font-size: 18px;
}

#approveImg .el-upload--picture-card {
  background-color: #fbfdff;
  border: none;
  border-radius: 6px;
  box-sizing: border-box;
  width: 34px;
  height: 30px;
  cursor: pointer;
  float: left;
}

#approveImg .el-upload-list--picture-card .el-upload-list__item {
  margin-top: 20px;
  margin-left: 20px;
}

#approveImg .el-upload--picture-card .upload-img {
  float: left;
}
.approve-reason img{
  height: 100px;
  width: 100px;
  display: inline-block;
  margin: 10px;
  margin-left: 0;
  cursor: pointer;
}

</style>

<style scoped>
.content {
  max-width: 1440px;
  margin: 0 auto;
}

.order-detail {
  font-size: 14px;
  background: #fff;
  padding: 15px;
}

.order-title {
  padding: 0;
  margin: 0;
  text-align: center;
  height: 82px;
  line-height: 82px;
  font-size: 27px;
  font-weight: normal;
}

.order-box {
  border: 1px solid #e6e9eb;
  background: #f9f9f9;
  margin-bottom: 24px;
}

.order-detail-header {
  height: 126px;
  padding: 22px 30px;
}

.user-avatar {
  height: 80px;
  width: 80px;
  border-radius: 50%;
}

.user-info {
  display: inline-block;
  margin-left: 25px;
  height: 80px;
  position: relative;
  top: -30px;
}

.user-section {
  color: #888a95;
  font-size: 14px;
  position: relative;
  top: 8px;
}

.order-time {
  color: #888a95;
  font-size: 12px;
  float: right;
}

.user-name {
  color: #2f313a;
  font-size: 20px;
}

.order-detail-container {
  min-height: 410px;
  padding: 10px 30px;
}

.approve-box {
  position: relative;
  clear: both;
  background: #fff;
  padding: 20px;
  font-size: 14px
}

.approve-result {
  height: 88px;
  width: 76px;
  position: absolute;
  right: 0;
  top: 25px;
  /*background-image: url("./img/approve-result.png");*/
}

.approve-record {
  height: 54px;
  line-height: 54px;
  font-size: 16px;
  color: #2f313a;
  clear: both;
  border-bottom: 1px solid #e6e9eb;
}

.approve-result-agree {
  background-position: right center;
}

.approve-result-refuse {
  background-position: left center;
}

.approve-record-list {
  border-left: 1px dashed #e6e9eb;
  margin-top: 30px;
  margin-bottom: 100px;
}

.approve-record-list p {
  margin-bottom: 5px;
}

.approve-record-list li {
  padding: 20px 50px;
  padding-bottom: 0;
}

.approve-record-list li:before {
  content: '';
  display: block;
  height: 12px;
  width: 12px;
  border-radius: 50%;
  margin-left: -56px;
  position: relative;
  top: 16px;
}

.approve-reason {
  color: #888a95;
  font-size: 12px;
  word-break: break-all;
  word-wrap: break-word;
}

.approve-time {
  font-size: 12px;
  color: #888a95;
  padding-left: 16px;
}

.approve-record-ing .approve-name {
  color: #fc5f45;
}

.approve-record-end .approve-name {
  color: #38c695;
}

.approve-record-ing:before {
  background: #fc5f45;
}

.approve-record-end:before {
  background: #38c695;
}

.deal-status {
  color: #888a95;
}

.approve-btn {
  text-align: right;
}

.operate-btn {
  height: 32px;
  width: 120px;
  margin-top: 50px;
}

.upload-img {
  display: inline-block;
  width: 34px;
  height: 30px;
  margin-top: 26px;
  background: url('./img/photo-icon.png')
}
</style>

<script>
import contract from './components/contract';
import contractApprove from '@/pages/contract/manage/approve';
export default {
  name: 'workDetail',
  components: {
    contract,
    contractApprove
  },
  data() {
    return {
      count: 0,   //图片数量限制为4
      message: null,  //审核意见
      approveImg: [],  //审核上传的图片
      ceoApprove: false, //是否需要ceo会审
      action: '/news/picture/content/upload',
      details: {},
      userInfo: {},
      doingList: [],
      doneList: [],
      file: [],
      title: '',
      btnList: null,  //流程处理的按钮
      type: '',  //工单类型
      id: '' //流程id
    };
  },
  created() {
    this.getProcessInfo();
    this.getBtn();
  },
  methods: {
    getBtn() {  //获取审批按钮
      this.ajax({
        url: '/sys/process/todo/btn',
        data: {
          id: this.id
        },
        success(data, $this) {
          if (data.code == 'success') {
            const content = data.content;
            if (content) {
              $this.btnList = {};
              for (let i = 0; i < content.length; i++) {
                $this.btnList[content[i]] = content[i];
              }
            }else{
              $this.btnList = null;
            }
            console.log($this.btnList);
          }
        }
      });
    },
    uploadBefore(file) {
      if (this.count >= 4) {
        this.errorTips('图片不能超过4张!');
        return false;
      }
    },
    uploadSuccess(response, file, fileList) {
      this.count++;
      this.approveImg = [];
      for (let i = 0; i < fileList.length; i++) {
        this.approveImg.push(fileList[i].response.content.picId);
      }
    },
    uploadRemove(file, fileList) {
      this.count--;
      this.approveImg = [];
      for (let i = 0; i < fileList.length; i++) {
        this.approveImg.push(fileList[i].response.content.picId);
      }
    },
    getProcessInfo() {  //获取流程信息
      const query = this.$route.query;
      this.type = query.type;
      this.id = query.id;
      this.ajax({
        url: '/sys/process/details',
        data: {
          processId: this.id,
          type: this.type
        },
        success(data, $this) {
          if (data.message == "success") {
            const content = data.content;
            $this.details = content.detailsObject;  //详情
            $this.details.file = content.list;   //附件
            $this.userInfo = content.user;   //发起人信息
            $this.doingList = content.doingList;  //处理中的流程
            $this.doneList = content.doneList;  //已处理的流程
            $this.title = content.title;   //合同标题
          }
        }
      });
    },
    approveAgree() {   //同意
       this.approveAction(1);
    },
    approveRebut() {  //驳回
      if (!this.message) {
        this.errorTips('审核意见不能为空!');
        return false;
      }
      this.approveAction(0);
    },
    approveRestart(){  //重新发起审批
      // this.approveAction(2);

      if(this.type == 4){
        this.$refs.contractApprove.openModal();
      }
    },
    approveEnd(){  //结束流程
      this.approveAction(3);
    },
    approveAction(type) {  //type[0-驳回，1-同意，2-重新发起审批， 3-结束流程]
      let url = '';
      let img = this.approveImg;
      let imgUrl = '';
      let params = {
        processId: this.id,
        result: type,
        flag: this.ceoApprove?1:0
      };
      for (let i = 0; i < img.length; i++) {  //拼接图像和审核意见
        imgUrl += `<img src="${this.domain}/news/picture/content/${img[i]}/download">`;
      }
      if(imgUrl){
        params.opinion = `<p>${this.message}</p><div>${imgUrl}</div>`;
      }else{
        params.opinion = this.message;
      }


      if (this.type == 4) {  //合同处理
        url = '/ctm/contract/exmine';
      } else if (this.type == 1) {  //请假
        url = '/cwa/leave/submit';
      } else if (this.type == 2) {  //加班
        url = '/cwa/overtime/submit';
      } else if (this.type == 3) { //出差
        url = "/cwa/travel/submit";
      }
      this.ajax({
        url: url,
        type: 'post',
        data: params,
        success(data, $this) {
          if (data.code == 'success') {
            $this.successTips();
            $this.getProcessInfo(); //重新获取审批流程
            $this.getBtn();//重新获取按钮
          } else {
            $this.errorTips(data.message);
          }
        }
      });
    }
  }
};
</script>
