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
		        <img class="user-avatar" :src="getAvatar()">
		        <div class="user-info">
		            <span class="user-name">{{userInfo.realname}}</span>
		            <p class="user-section">{{userInfo.depName}}</p>
		        </div>
		        <span class="order-time">{{ details.addTime && new Date(details.addTime).toString()}}</span>
		    </div>

	    	<div class="order-box order-detail-container">
		    	<!-- 合同相关信息 -->
		        <ul v-if="type == 4">   
		            <li>
		                <label>合同名称：</label>
		                <span class="order-detail-control" id="contractName">{{details.contractName}}</span>
		            </li>
		            <li>
		                <label>客户名称：</label>
		                <span class="order-detail-control" id="customerName">{{details.customerName}}</span>
		            </li>
		            <li>
		                <label>片&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;区：</label>
		                <span class="order-detail-control" id="regionName">{{details.regionName}}</span>
		            </li>
		            <li>
		                <label>业&nbsp;&nbsp;务&nbsp;&nbsp;员：</label>
		                <span class="order-detail-control" id="salesmanName">{{details.salesmanName}}</span>
		            </li>
		            <li>
		                <label>产&nbsp;&nbsp;品&nbsp;&nbsp;线：</label>
		                <span class="order-detail-control" id="departmentName">{{details.departmentId}}</span>
		            </li>
		            <li>
		                <label>合同说明：</label>
		                <span class="order-detail-control" id="contractRemark">{{details.remark}}</span>
		            </li>

		            <li>
		                <label style="vertical-align: top">合同附件：</label>
		                <span class="order-detail-control" id="contractFile">

		                </span>
		            </li>
		        </ul>
	    	</div>
		</div>

	   <div class="approve-box">
	       <div class="approve-record">审批记录</div>
	        <div id="approveResult"></div>
	       <ul class="approve-record-list" id="processLine">
              <li class="approve-record-ing" v-for="(item, index) in doingList" :key="index">
	               <p class="approve-name">{{item.nodeName}} <span class="approve-time">{{item.updateTime && new Date(item.updateTime).toString()}}</span></p>
	               <p class="approve-process">{{item.handlerName}}：<span class="deal-status">处理中</span></p>
	           </li>

	           <li class="approve-record-end" v-for="(item, index) in doneList" :key="index">
	               <p class="approve-name">{{item.nodeName}} <span class="approve-time">{{item.updateTime && Date(item.updateTime).toString()}}</span></p>
	               <p class="approve-process">{{item.handlerName}}：<span class="deal-status">{{['驳回', '同意','重新发起审批', '结束流程'][item.result]}}</span></p>
	               <div class="approve-reason">{{item.opinion}}</div>
	           </li>

	           <li class="approve-record-end">
           			<p class="approve-name">发起申请<span class="approve-time">{{details.addTime && new Date(details.addTime).toString()}}</span></p>
           			<p class="approve-process">{{details.salesmanName}}</p>
       			</li>
	           
	       </ul>
	   </div>
	</div>
</template>

<style scoped>
	.content{
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

	.order-box{
	    border: 1px solid #e6e9eb;
	    background: #f9f9f9;
	    margin-bottom: 24px;
	}
	.order-detail-header{
	    height: 126px;
	    padding: 22px 30px;
	}
	.user-avatar{
	    height: 80px;
	    width: 80px;
	    border-radius: 50%;
	    background: #01cd78;
	}
	.user-info{
	    display: inline-block;
	    margin-left: 25px;
	    height: 80px;
	    position: relative;
	    top: -30px;
	}
	.user-section{
	    color: #888a95;
	    font-size: 14px;
	    position: relative;
	    top: 8px;
	}
	.order-time{
	    color: #888a95;
	    font-size: 12px;
	    float: right;
	}
	.user-name{
	    color: #2f313a;
	    font-size: 20px;
	}
	.order-detail-container{
	    min-height: 410px;
	    padding: 10px 30px;
	}
	.order-detail-container ul li{
	    line-height: 40px;
	}
	.order-detail-container ul li label{
	    color: #888a95;
	}

	.approve-box{
	    position: relative;
	    clear: both;
	    background: #fff;
	    padding: 20px;
	}
	.approve-result{
	    height: 88px;
	    width: 76px;
	    position: absolute;
	    right: 0;
	    top: 25px;
	    /*background-image: url("./img/approve-result.png");*/
	}
	.approve-record{
	    height: 54px;
	    line-height: 54px;
	    font-size: 16px;
	    color: #2f313a;
	    clear: both;
	    border-bottom: 1px solid #e6e9eb;
	}
	.approve-result-agree{
	    background-position: right center;
	}
	.approve-result-refuse{
	    background-position: left center;
	}
	.approve-record-list{
	    border-left: 1px dashed #e6e9eb;
	    margin-top: 30px;
	    margin-bottom: 100px;
	}
	.approve-record-list p{
	    margin-bottom: 5px;
	}
	.approve-record-list li{
	    height: 120px;
	    padding: 25px 50px;
	}
	.approve-record-list li:before{
	    content: '';
	    display: block;
	    height: 12px;
	    width: 12px;
	    border-radius: 50%;
	    margin-left: -56px;
	    position: relative;
	    top: 16px;
	}
	.approve-reason{
	    color: #888a95;
	    font-size: 12px;
	    word-break: break-all;
	    word-wrap: break-word;
	}
	.approve-time{
	    font-size: 12px;
	    color: #888a95;
	    padding-left: 16px;
	}
	.approve-record-ing .approve-name{
	    color: #fc5f45;
	}
	.approve-record-end .approve-name{
	    color: #38c695;
	}
	.approve-record-ing:before{
	    background: #fc5f45;
	}
	.approve-record-end:before{
	    background: #38c695;
	}
	.deal-status{
		color: #888a95;
	}
</style>

<script>
	export default{
		name: 'workDetail',
		data(){
			return {
				details: {},
				userInfo: {},
				doingList: [],
				doneList: [],
				file: [],
				title: '',
				type: this.$route.query.type
			}
		},
		created(){
			this.getProcessInfo();
		},
		methods: {
			getAvatar(){
				return Utils.getAvatar(this.userInfo);
			},
			getProcessInfo(){  //获取流程信息
				const query = this.$route.query;
				const { type } = query;
				const id = query.id;
				this.ajax({
					url: '/sys/process/details',
					data: {
						processId: id,
						type: this.type
					},
					success(data, $this){
						
						if(data.message == "success"){
							const content = data.content;
							$this.details = content.detailsObject;
							$this.userInfo = content.user;
							$this.doingList = content.doingList;
							$this.doneList = content.doneList;
							$this.file = content.list;
							$this.title = content.title;

							console.log(data, 'data')
						}
					}
				})

			}
		}
		
	}
</script>