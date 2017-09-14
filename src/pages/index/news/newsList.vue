<template>
  <div class="news-list">
    <div class="banner"></div>
    <div class="content">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="news-content">
        <el-tabs v-model="activeTab" @tab-click="loadList" class="news-list-tab" type="card">
          <el-tab-pane name="all">
            <span slot="label">
              <i class="icon icon-all"></i> 全部</span>
            <div v-if="all.length">
              <ul class="news-box">
                <li v-for="(item, index) in all" :key="index">
                  <p>
                    <router-link class="news-title" :to="{ path: '/news/detail', query: {id: item.id}}">{{item.newsTitle}}</router-link>
                  </p>
                  <p class="news-time">
                    {{new Date(item.publishDate).toString()}}
                    <span style="padding-left: 10px;">撰稿人：{{ item.newsAuthor}}</span>
                    <span class="comments-num">{{item.commentCount}}</span>
                  </p>
                  <p class="news-abstract">{{item.content | getContent}}</p>
                  <router-link class="read-more" :to="{ path: '/news/detail', query: {id: item.id}}">查看全文></router-link>
                </li>
              </ul>
              <el-pagination layout="prev, pager, next" :page-size="search.pageSize" @current-change="changePage" :total="totalPages">
              </el-pagination>
            </div>
            <p style="margin-top: 130px; text-align:center" v-else>
              暂无数据！
            </p>
          </el-tab-pane>
          <el-tab-pane name="news">
            <span slot="label">
              <i class="icon icon-news"></i> 新闻</span>
            <div v-if="newsList.length">
              <ul class="news-box">
                <li v-for="(item, index) in newsList" :key="index">
                  <p>
                    <router-link class="news-title" :to="{ path: '/news/detail', query: {id: item.id}}">{{item.newsTitle}}</router-link>
                  </p>
                  <p class="news-time">
                    {{new Date(item.publishDate).toString()}}
                    <span style="padding-left: 10px;">撰稿人：{{ item.newsAuthor}}</span>
                    <span class="comments-num">{{item.commentCount}}</span>
                  </p>
                  <p class="news-abstract">{{item.content | getContent}}</p>
                  <router-link class="read-more" :to="{ path: '/news/detail', query: {id: item.id}}">查看全文></router-link>
                </li>
              </ul>
              <el-pagination layout="prev, pager, next" :page-size="search.pageSize" @current-change="changePage" :total="totalPages">
              </el-pagination>
            </div>
            <p style="margin-top: 130px; text-align:center" v-else>
              暂无数据！
            </p>
          </el-tab-pane>
          <el-tab-pane name="notice">
            <span slot="label">
              <i class="icon icon-notice"></i> 公告</span>
            <div v-if="noticeList.length">
              <ul class="news-box">
                <li v-for="(item, index) in noticeList" :key="index">
                  <p>
                    <router-link class="news-title" :to="{ path: '/news/detail', query: {id: item.id}}">{{item.newsTitle}}</router-link>
                  </p>
                  <p class="news-time">
                    {{new Date(item.publishDate).toString()}}
                    <span style="padding-left: 10px;">撰稿人：{{ item.newsAuthor}}</span>
                    <span class="comments-num">{{item.commentCount}}</span>
                  </p>
                  <p class="news-abstract">{{item.content | getContent}}</p>
                  <router-link class="read-more" :to="{ path: '/news/detail', query: {id: item.id}}">查看全文></router-link>
                </li>
              </ul>
              <el-pagination layout="prev, pager, next" :page-size="search.pageSize" @current-change="changePage" :total="totalPages">
              </el-pagination>
            </div>
            <p style="margin-top: 130px; text-align:center" v-else>
              暂无数据！
            </p>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<style scoped>
.banner {
  background: url('./img/news-list-banner.png') no-repeat center;
  height: 300px;
}

.content {
  max-width: 1440px;
  margin: 0 auto;
}

.news-content {
  background: #fff;
  padding: 30px 20px;
}

.news-box li {
  margin-bottom: 42px;
  border-bottom: 1px solid #E6E9EB;
  position: relative;
}

.news-box li p a.news-title {
  font-size: 20px;
  color: #2F313A;
}

.news-box li p a.news-title:hover {
  color: #01cd78;
}

.news-box li p.news-time {
  color: #888A95;
  font-size: 12px;
  margin-top: 8px;
}

.news-box li p.news-abstract {
  color: #2F313A;
  font-size: 14px;
  margin-top: 25px;
  margin-bottom: 24px;
  position: relative;
  line-height: 30px;
  white-space: normal;
  text-overflow: ellipsis;
}

.news-box li a.read-more {
  background: #fff;
  padding: 0 10px;
  z-index: 5;
  cursor: pointer;
  color: #01cd78;
  width: 90px;
  float: right;
  margin-top: -45px;
}

.comments-num {
  float: right;
  height: 20px;
  width: 25px;
  background: #fff url('./img/icon.png') -336px -10px;
  display: block;
  padding-left: 28px;
  margin-right: 16px;
}

i.icon {
  display: inline-block;
  width: 22px;
  height: 22px;
  background-image: url('./img/icon.png');
  background-repeat: no-repeat;
  position: relative;
  top: 7px;
  padding-right: 38px;
}

i.icon.icon-all {
  background-position: -200px -31px;
}

.is-active i.icon.icon-all {
  background-position: -200px -6px;
}

i.icon.icon-news {
  background-position: -32px -33px;
}

.is-active i.icon.icon-news {
  background-position: -32px -6px;
}

i.icon.icon-notice {
  background-position: 0 -34px;
}

.is-active i.icon.icon-notice {
  background-position: 0 -8px;
}
</style>

<style>
.news-list-tab {
  width: 100%;
}

.news-list-tab .el-tabs__item {
  display: block;
  height: 48px;
  line-height: 48px;
  border-radius: 6px;
}

.news-list-tab .el-tabs__header {
  border-bottom: none;
  width: 280px;
  float: left;
}

.news-list-tab .el-tabs__content {
  margin-left: 310px;
}

.news-list-tab.el-tabs--card .el-tabs__header .el-tabs__item.is-active {
  border: none;
  color: #fff;
  background-color: #01cd78;
}

.news-list-tab .el-tabs__nav {
  width: 242px;
}
</style>

<script>
export default {
  name: 'newsList',
  data() {
    return {
      newsList: [], //新闻
      noticeList: [], //公告
      all: [], //全部
      activeTab: 'all',
      title: '全部',
      totalPages: 0, //总条数
      search: {
        pageNum: 1,
        pageSize: 10,
        isPublish: 0
      }
    };
  },
  created() {
    this.currentTab();
  },
  filters: {
    getContent(value) {
      if (value) {
        return (value.replace(/<\/?[^>]*>/g, '')).substring(0, 174) + '......';
      }
    }
  },
  methods: {
    currentTab() {
      const type = this.$route.query.type;
      if (type == 0) {
        this.activeTab = 'news';
        this.loadList('1');
      } else if (type == 1) {
        this.loadList('2');
        this.activeTab = 'notice';
      } else {
        this.loadList('3');
      }
    },
    loadList(tab) {

      if (typeof tab == 'string') {
        var index = tab;
      } else {
        var {
            index
          } = tab;
      }
      if (index == '1' || index == '2') { //0-新闻， 1-资讯
        this.search.newsType = index - 1;
      } else {
        delete this.search.newsType;
      }
      this.ajax({
        url: '/news/common/list',
        data: this.search,
        success(data, $this) {
          if (data.code == 'success') {
            $this.totalPages = data.totals;
            if (index == '1') {
              $this.newsList = data.content;
              $this.title = "新闻";
            } else if (index == '2') {
              $this.noticeList = data.content;
              $this.title = "公告";
            } else {
              $this.all = data.content;
              $this.title = "全部";
            }
          }
        }
      });
    },
    changePage(currentPage) {
      this.search.pageNum = currentPage;
      console.log(this.activeTab);
      if (this.activeTab == 'all') {
        this.loadList('3');
      } else if (this.activeTab == 'news') {
        this.loadList('1');
      } else if (this.activeTab == 'notice') {
        this.loadList('2');
      }
    }
  }
};
</script>
