// 新闻公告管理
<template>
  <div>
    <v-panel>
      <el-form label-width="90px" :inline="true">
        <el-form-item label="标题：">
          <el-input v-model="search.newsTitle"></el-input>
        </el-form-item>
        <el-form-item label="发布人：">
          <el-input v-model="search.newsAuthor"></el-input>
        </el-form-item>
        <el-form-item label="当前状态：">
          <el-select style="width:90%" v-model="search.isPublish" clearable>
            <el-option :value="0" label="已发布"></el-option>
            <el-option :value="1" label="未发布"></el-option>
          </el-select>
        </el-form-item>
        <el-button type="success" @click="getList">查询</el-button>
      </el-form>
    </v-panel>

    <v-panel title="新鲜事儿列表">
      <div slot="button">
        <el-button type="info" @click="addPost">新 增</el-button>
      </div>
      <div id="tableList"></div>
    </v-panel>

    <el-dialog :title="title" :visible.sync="modal" size="full" id="postCreate">
      <el-form ref="postForm" :model="form" :rules="rules" label-width="100px" label-position="right">
        <el-form-item label="标题：" prop="newsTitle">
          <el-input v-model="form.newsTitle"></el-input>
        </el-form-item>
        <el-form-item label="作者：" prop="newsAuthor">
          <el-input placeholder="请输入部门+姓名  " v-model="form.newsAuthor"></el-input>
        </el-form-item>
        <el-form-item label="类型：" prop="newsType">
          <el-select style="width:100%" v-model="form.newsType" clearable>
            <el-option :value="0" label="新闻"></el-option>
            <el-option :value="1" label="公告"></el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="是否置顶：">
          <el-switch on-text="" off-text="" v-model="form.isTop"></el-switch>
        </el-form-item>

        <el-form-item label="头图："id="postHead">
          <el-upload
            :action="uploadUrl"
            :on-success="successPic"
            :on-remove="removePic"
            accept="image/*"
            :file-list="picList"
            list-type="picture-card">
            <i class="el-icon-plus"></i>
            <div slot="tip" class="el-upload__tip" style="display:inline-block; padding-left: 20px">此处添加的图片放置在首页展示(建议宽高比例2:1)</div>
          </el-upload>
        </el-form-item>

        <el-form-item label="附件：">
          <el-upload
            :on-success="successFile"
            :on-remove="removeFile"
            :file-list="fileList"
            :action="uploadFileUrl">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>

        <el-form-item label="正文：" prop="content">
          <froala :tag="'textarea'" :config="config" v-model="form.content"></froala>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button type="success" :disabled="disable" v-if="disable">
          <i class="el-icon-loading"></i>
        </el-button>
        <el-button type="success" :disabled="disable" @click="submit" v-else>发 布</el-button>
        <el-button type="info" @click="modal = false">取 消</el-button>
      </span>
    </el-dialog>

    <el-dialog :title="'评论管理 ' + ('('+comments.list.length+ ')')" :visible.sync="comments.modal" size="tiny" id="commentModal">
      <el-collapse v-if="comments.list.length != 0">
        <el-collapse-item v-for="(item, index) in comments.list" :key="index" :name="index">
           <template slot="title">
            <span>{{item.addPersonName}}</span>
            <span style="float: right; margin-right:20px">
              {{new Date(item.addTime).toString()}}
              <el-button @click="commentsManage(item.id, item.status, $event)" type="primary" size="mini">{{item.status==1?'显示':'隐藏'}}</el-button>
            </span>
          </template>
          <div>{{item.content}}</div>
        </el-collapse-item>
      </el-collapse>
      <p v-else>暂无评论哦!</p>
    </el-dialog>
  </div>
</template>
<style>
    #tableList a.operator {
      display: inline-block;
      width: 58px;
    }
    #postHead .el-upload-list--picture-card .el-upload-list__item{
      width: 296px;
    }
    #postCreate .el-dialog__body, #postCreate .el-dialog__footer{
      width: 800px;
      margin:0 auto;
    }
    #commentModal .el-dialog{
      width: 800px;
    }
    #commentModal .el-button--mini{
      padding: 3px;
      margin-left: 20px;
    }
</style>

<script>
require('froala-editor/js/froala_editor.pkgd.min');
require('froala-editor/css/froala_editor.pkgd.min.css');
require('font-awesome/css/font-awesome.css');
require('froala-editor/css/froala_style.min.css');
require('froala-editor/js/languages/zh_cn.js');
export default {
  name: 'newsManage',
  data() {
    return {
      search: {
        newsTitle: '',
        newsAuthor: '',
        isPublish: ''
      },
      modal: false,
      type: true,   //添加模式,反之编辑模式
      title: '新增文章',
      comments:{  //评论
        modal: false,
        list: [],
        newsId: ''  //当前评论所在的新闻id
      },
      form: {
        id: undefined,
        isTop: false,  //是否置顶  【0置顶，1置顶】
        newsTitle: '', //标题
        newsAuthor: '', //作者
        newsType: '',  //新闻类型
        content: '', //新闻正文
        pictureId: undefined,  //头图id
        attachmentName: '',// 附件地址
        attachmentId: '', //附件id
      },
      picList:[],
      fileList: [],  //附件列表
      config: {
        language: "zh_cn",
        height: 500,
        placeholderText: '写点什么吧...',
        imageUploadURL: '',
        imageManagerLoadParams: {user_id: 4219762},
        toolbarButtons: [ 'bold', 'italic', 'underline', 'strikeThrough', '|', 'fontFamily', 'fontSize', 'color', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertLink', 'insertImage', 'insertVideo', 'insertTable', '|', 'emoticons', 'insertHR', 'clearFormatting', '|', 'spellChecker', '|', 'undo', 'redo', 'fullscreen'],
        events: {
          'froalaEditor.initialized': function () {

          },
          'froalaEditor.image.error': function(e, editor, error, response) {
            console.log(e, editor, error, response);
            $('.fr-error').remove();
          },
          'froalaEditor.image.uploaded': (e, editor, response)=>{
            const picId = (JSON.parse(response)).content.picId;
            const url = this.domain + "/news/picture/content/"+ picId +"/download";
            editor.image.insert(url);
          }
        }
      },
      uploadPicUrl: '',  //头图上传地址
      uploadFileUrl: '' ,  //附件上传地址
      rules: {
        newsTitle: [{
          required: true,
          message: '标题不能为空!'
        }],
        newsAuthor: [{
          required: true,
          message: '请输入作者+部门!'
        }],
        newsType: [{
          required: true,
          message: '类型不能为空!'
        }],
        content:[{
          required: true,
          message: '正文不能为空!'
        }]
      }
    };
  },
  created() {
    this.uploadUrl = this.domain + '/news/picture/top/upload';  //头图
    this.uploadFileUrl = this.domain + '/news/attachment/upload'; //附件
    this.config.imageUploadURL = this.domain + '/news/picture/content/upload'; //编辑器内图片上传地址
    this.getList();
  },
  methods: {
    addPost() {  //新增
      this.modal = true;
      this.type = true;
      this.title = '新增文章';
      this.picList = [];
      this.fileList = [];
      this.resetForm('postForm');
    },
    getList() {
      const $this = this;
      this.tableList({
        url: '/news/common/list',
        data: this.search,
        columns: [{
          name: '类型',
          render(row) {
            return ['新闻', '公告'][row.newsType];
          }
        }, {
          name: '标题',
          value: 'newsTitle',
          width: 500,
          align: 'left'
        }, {
          name: '发布人',
          value: 'addPersonName'
        }, {
          name: '发布日期',
          render(row) {
            let date = row.publishDate;
            return new Date(date).toString();
          }
        }, {
          name: '当前状态',
          render(row) {
            return ['已发布', '未发布'][row.isPublish];
          }
        }, {
          name: '评论数量',
          value: 'commentCount'
        }, {
          name: '操作',
          width: 300,
          operator(row) {
            let publish = ['取消发布', '发布'][row.isPublish];
            let top = ['取消置顶', '置顶'][row.isTop];
            let doPublish = 0;
            let doTop = 0;
            return [{
              name: publish,
              click(row) {
                if (row.isPublish == 0) { // 取消发布
                  doPublish = 1;
                } else {
                  doPublish = 0;
                }
                $this.ajax({
                  url: '/news/' + row.id + '/' + doPublish + '/publish',
                  type: 'put',
                  success(data) {
                    if (data.code == 'success') {
                      $this.successTips();
                      $this.getList();
                    }
                  }
                });
              }
            }, {
              name: top,
              click(row) {
                if (row.isTop == 0) { // 取消置顶
                  doTop = 1;
                } else {
                  doTop = 0;
                }
                $this.ajax({
                  url: '/news',
                  type: 'put',
                  data: {
                    isTop: doTop,
                    id: row.id
                  },
                  success(data) {
                    if (data.code == 'success') {
                      $this.successTips();
                      $this.getList();
                    }
                  }
                });
              }
            }, {
              name: '修改',
              click(row) {
                if (row.isPublish == 1) { //未发布
                  $this.type = false;
                  $this.modal = true;
                  $this.title = '编辑文章';
                  $this.ajax({
                    url: '/news/'+ row.id +'/detail',
                    success(data){
                      if(data.code == 'success'){
                        $this.picList = [];
                        $this.fileList = [];
                        const {id, isTop, newsTitle, newsAuthor, newsType, content, pictureId, attachmentName, attachmentId } = data.content;
                        $this.form = {
                          id: id,
                          newsTitle: newsTitle,
                          newsAuthor: newsAuthor,
                          newsType: newsType,
                          content: content,
                          pictureId: pictureId,
                          attachmentName: attachmentName,
                          attachmentId: attachmentId,
                          isTop: false
                        };
                        $this.form.isTop = (isTop?false:true);
                        if(pictureId && pictureId != "false"){
                          $this.picList = [{
                            name: '',
                            url:  $this.domain + '/news/picture/top/' + content.pictureId + '/download'
                          }];
                        }
                        if(attachmentId && attachmentId != 'false'){
                          $this.fileList = [{
                            name: attachmentName,
                            url:  $this.domain + '/news/picture/top/' + content.attachmentId + '/download'
                          }];
                        }
                      }
                    }
                  });
                }else{
                  $this.errorTips('请先取消发布再修改!');
                }
              }
            },{
              name: '评论管理',
              click(row){
                $this.commentsRead(row.id);
              }
            }];
          }
        }]
      });
    },
    successPic(response, file){
      this.form.pictureId = (response.content.picId).split('.')[0];
    },
    removePic(){
      this.form.pictureId = false;
    },
    successFile(response, file){
      this.form.attachmentId = (response.content.picId).split('.')[0];
      this.form.attachmentName = file.name;
    },
    removeFile(){
      this.form.attachmentId = false;
      this.form.attachmentName = false;
    },
    commentsRead(id){
      this.comments.modal = true;
      this.ajax({
        url: '/news/comment/'+ id +'/12/list',
        success(data, $this){
          if(data.code == 'success'){
            $this.comments.list = data.content;
            $this.comments.newsId = id;
          }
        }
      });
    },
    commentsManage(id, state, e){
      e.stopPropagation();
      const status = state == 1 ? 0 : 1;
      this.ajax({
        url: '/news/comment/'+ id +'/'+ status +'/hide',
        type: 'put',
        success(data, $this){
          if(data.code == 'success'){
            $this.successTips();
            $this.commentsRead($this.comments.newsId);
          }else{
            $this.errorTips();
          }
        }
      });

    },
    submit(){
      this.$refs.postForm.validate((valid)=>{
        if(valid){
          this.disable = true;
          let params = Utils.filterObjectNull(this.form);
          let type = 'put';
          if(this.type){
            type = 'post';
          }

          if(params.isTop){
            params.isTop = 0;
          }else{
            params.isTop = 1;
          }
          this.ajax({
            url: '/news',
            type: type,
            data: params,
            success(data, $this){
              if(data.code == 'success'){
                $this.successTips('操作成功！');
                $this.modal = false;
                $this.getList();
              }else{
                $this.errorTips(data.message);
              }
            }
          });
        }
      });
    }
  }
};
</script>
