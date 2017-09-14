<template>
  <div class="content">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>我的工作台</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="work-order">
      <div class="work-filter">
        <el-form ref="form" label-width="85px" inline>
          <el-form-item label="流程类型：">
            <v-code ref="code" style="width: 192px;" codeType="processtype" @change="getCode"></v-code>
          </el-form-item>
          <el-form-item label="发起人：" v-if="activeTab != 'myapply'">
            <el-input v-model="search.sponsorsName"></el-input>
          </el-form-item>
          <el-form-item label="流程名称：">
            <el-input v-model="search.title"></el-input>
          </el-form-item>
          <el-button type="success" class="search-btn" @click="queryList(activeTab)">查询</el-button>
        </el-form>
      </div>
      <el-tabs v-model="activeTab" @tab-click="queryList" class="work-list-tab" type="card">
        <el-tab-pane name="todo">
          <span slot="label">
            <i class="icon icon-todo"></i> 我的待办</span>
          <div v-if="todoList.length">
            <ul class="work-box">
              <li v-for="(item, index) in todoList" :key="index">
                <el-row>
                  <router-link :to="{path: '/work/detail', query: {id: item.processId, type: item.type}}">
                    <p class="padding-b-10">{{item.title}}</p>
                    <el-col :span="8">
                      <i class="el-icon-time"></i>
                      <span class="padding-t-15">{{item.nodesName}}</span>
                    </el-col>
                    <el-col :span="8" style="text-align: center">
                      <span v-if="item.doingPerson.length">
                        {{item.donePerson | dealStatus(item.doingPerson)}}&nbsp;&nbsp;
                        <span class="deal-status">处理中</span>
                      </span>
                      <span v-else>
                        <span v-if="item.doingPerson.length == 0 && item.donePerson.length == 0">itme.nodesName</span>
                        <span v-else>已完成</span>
                      </span>
                    </el-col>
                    <el-col :span="8" style="text-align:right">
                      <span class="padding-r-20">{{ item.sponsorsName }}</span>
                      <span class="deal-time">{{ item.addTime | addTime(item.addTime, item.updateTime)}} </span>
                    </el-col>
                  </router-link>
                </el-row>
              </li>
            </ul>
            <el-pagination layout="prev, pager, next" :page-size="search.pageSize" @current-change="changePage" :total="totalPages">
            </el-pagination>
          </div>
          <p style="margin-top: 130px; text-align:center" v-else>
            勤劳如您，一个待办都木有，点赞！
          </p>
        </el-tab-pane>
        <el-tab-pane name="done">
          <span slot="label">
            <i class="icon icon-done"></i> 我的已办</span>
          <div v-if="doneList.length">
            <ul class="work-box">
              <li v-for="(item, index) in doneList" :key="index">
                <el-row>
                  <router-link :to="{path: '/work/detail', query: {id: item.processId, type: item.type}}">
                    <p class="padding-b-10">{{item.title}}</p>
                    <el-col :span="8">
                      <i class="el-icon-time"></i>
                      <span class="padding-t-15">{{item.nodesName}}</span>
                    </el-col>
                    <el-col :span="8" style="text-align: center">
                      <span v-if="item.doingPerson.length">
                        {{item.donePerson | dealStatus(item.doingPerson)}}&nbsp;&nbsp;
                        <span class="deal-status">处理中</span>
                      </span>
                      <span v-else>
                        <span v-if="item.doingPerson.length == 0 && item.donePerson.length == 0">itme.nodesName</span>
                        <span v-else>已完成</span>
                      </span>
                    </el-col>
                    <el-col :span="8" style="text-align:right">
                      <span class="padding-r-20">{{ item.sponsorsName }}</span>
                      <span class="deal-time">{{ item.addTime | addTime(item.addTime, item.updateTime)}} </span>
                    </el-col>
                  </router-link>
                </el-row>
              </li>
            </ul>
            <el-pagination layout="prev, pager, next" :page-size="search.pageSize" @current-change="changePage" :total="totalPages">
            </el-pagination>
          </div>
          <p style="margin-top: 130px; text-align:center" v-else>
            四大皆空，已办也空。
          </p>
        </el-tab-pane>
        <el-tab-pane name="myapply">
          <span slot="label">
            <i class="icon icon-myapply"></i> 我申请的</span>
          <div v-if="applyList.length">
            <ul class="work-box">
              <li v-for="(item, index) in applyList" :key="index">
                <el-row>
                  <router-link :to="{path: '/work/detail', query: {id: item.id, type: item.type, nodeId: item.nodeId}}">
                    <p class="padding-b-10">{{item.title}}</p>
                    <el-col :span="8">
                      <i class="el-icon-time"></i>
                      <span class="padding-t-15">{{item.nodesName}}</span>
                    </el-col>
                    <el-col :span="8" style="text-align: center">
                      <span v-if="item.doingPerson.length">
                        {{item.donePerson | dealStatus(item.doingPerson)}}&nbsp;&nbsp;
                        <span class="deal-status">处理中</span>
                      </span>
                      <span v-else>
                        <span v-if="item.doingPerson.length == 0 && item.donePerson.length == 0">itme.nodesName</span>
                        <span v-else>已完成</span>
                      </span>
                    </el-col>
                    <el-col :span="8" style="text-align:right">
                      <span class="padding-r-20">{{ item.sponsorsName }}</span>
                      <span class="deal-time">{{ item.addTime | addTime(item.addTime, item.updateTime)}} </span>
                    </el-col>
                  </router-link>
                </el-row>
              </li>
            </ul>
            <el-pagination layout="prev, pager, next" :page-size="search.pageSize" @current-change="changePage" :total="totalPages">
            </el-pagination>
          </div>
          <p style="margin-top: 130px; text-align:center" v-else>
            您还没有发起过任何申请，此处空空如也。
          </p>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<style scoped>
.content {
  max-width: 1440px;
  margin: 0 auto;
}

.search-btn {
  margin-left: 20px;
}

.work-order {
  position: relative;
  overflow: hidden;
  padding: 20px;
  background: #fff;
  min-height: 650px;
}

.work-filter {
  margin-left: 300px;
  z-index: 99;
  overflow: hidden;
}

.work-list-tab {
  float: left;
}

.work-box {
  margin-top: 20px;
}

.work-box li {
  padding: 15px 0;
  border-bottom: 1px solid #e6e9eb;
  color: #40474d;
  font-size: 14px;
}

.deal-status {
  color: #888a95;
}

.deal-time {
  color: #92939d;
}

.el-icon-time {
  font-size: 14px;
  font-weight: normal;
  padding-left: 2px;
  color: #01cd78;
}

i.icon {
  display: inline-block;
  width: 22px;
  height: 24px;
  background-image: url('./img/icon.png');
  background-repeat: no-repeat;
  position: relative;
  top: 10px;
  padding-right: 30px;
}

i.icon.icon-todo {
  background-position: -110px 0;
}

.is-active i.icon.icon-todo {
  background-position: -110px -34px;
}

i.icon.icon-done {
  background-position: 0 0;
}

.is-active i.icon.icon-done {
  background-position: 0 -34px;
}

i.icon.icon-myapply {
  background-position: -56px 0;
}

.is-active i.icon.icon-myapply {
  background-position: -56px -34px;
}
</style>

<style>
.work-list-tab {
  width: 100%;
}

.work-list-tab .el-tabs__item {
  display: block;
  height: 48px;
  line-height: 48px;
  border-radius: 6px;
}

.work-list-tab .el-tabs__header {
  border-bottom: none;
  width: 280px;
  float: left;
  top: 20px;
  position: absolute;
}

.work-list-tab .el-tabs__content {
  margin-left: 310px;
}

.work-list-tab.el-tabs--card .el-tabs__header .el-tabs__item.is-active {
  border: none;
  color: #fff;
  background-color: #01cd78;
}

.work-list-tab .el-tabs__nav {
  width: 242px;
}

.work-order .el-pagination {
  float: right;
  margin: 60px 0;
}

.work-order .el-autocomplete-suggestion__wrap,
.work-order .el-pager li,
.work-order .el-pagination .btn-next,
.el-pagination .btn-prev,
.work-order .el-pager li:last-child {
  border: none;
}

.work-order .el-pager li.active {
  background-color: transparent;
  color: #01cd78;
  border-radius: 50%;
  border: 1px solid #01cd78;
}

.work-order .el-pager li:hover,
.work-order .el-pagination button:hover {
  color: #01cd78 !important;
}
</style>

<script>
import Code from '@/components/getCode';
export default {
  name: 'workList',
  components: {
    'v-code': Code
  },
  data() {
    return {
      todoList: [],
      doneList: [],
      applyList: [],
      activeTab: 'todo',
      totalPages: 1, //总页数
      search: {
        type: null, //流程类型
        title: null, //流程名称
        sponsorsName: null, //发起人
        pageNum: 1,
        pageSize: 5
      }
    };
  },
  created() {
    this.queryList('todo');
  },
  filters: {
    addTime(addTime, updateTime) {
      if (updateTime) {
        return new Date(updateTime).toString();
      }
      return new Date(addTime).toString();
    },
    dealStatus(donePerson, doingPerson) {
      let doingArr = [];
      for (let i = 0; i < doingPerson.length; i++) {
        doingArr.push(doingPerson[i].handlerName);
      }
      if (doingPerson.length !== 0) {
        return Utils.arrayUnique(doingArr).join('、');
      }
    }
  },
  methods: {
    getCode(code) {
      this.search.type = code;
    },
    queryList(tab) {
      if (typeof tab == 'string') {
        var name = tab;
      } else {
        var {
            name
          } = tab;
      }
      this.activeTab = name;
      this.ajax({
        url: '/sys/process/' + name + '/list',
        data: Utils.filterObjectNull(this.search),
        success(data, $this) {
          if (data.code == 'success') {
            if (name == 'todo') {
              $this.todoList = data.content;
            } else if (name == 'done') {
              $this.doneList = data.content;
            } else if (name == 'myapply') {
              $this.applyList = data.content;
            }
            $this.totalPages = data.totals;
          }
        }
      });
    },
    changePage(currentPage) {
      this.search.pageNum = currentPage;
      this.queryList(this.activeTab);
    }
  }
};
</script>
