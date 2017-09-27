<template>
  <div class="side-menu">
    <a class="side-toggle" href="javascript:;">
      <label for="toggleMenu" id="toggleMenuLabel"></label>
    </a>

    <ul class="menu-list">
      <li v-for="(item, index) in menuList" :key="index">
  				<router-link :to="item.url" :data-id="item.id">
          <!-- <router-link :to="{ path: item.url, query: { id: item.id }}"> -->
  					<span>{{item.name}}</span>
  				</router-link>
  			</li>
    </ul>
  </div>
</template>

<style scoped>
.side-menu {
  position: fixed;
  height: 100%;
  width: 230px;
  background: #fff;
  left: 0;
  top: 72px;
  transition: all 80ms ease-in-out;
}

.side-toggle {
  display: block;
  width: 100%;
  margin: 0 auto;
  height: 36px;
  line-height: 36px;
  text-align: center;
  color: #90929c;
  font-size: 22px;
  border-bottom: 1px solid #eee;
}

.menu-list li {
  font-size: 16px;
  transition: background 180ms ease;
}

.menu-list li:hover {
  background: #f2f2f2;
  transition: background 180ms ease;
}

.menu-list li span {
  font-size: 14px;
}

.menu-list li a {
  display: block;
  height: 50px;
  line-height: 50px;
  overflow: hidden;
  padding-left: 40px;
  padding-right: 20px;
  transition: all 250ms ease-in-out;
  color: #555;
  border-left: 4px solid #fff;
}

.menu-list li a.router-link-active {
  color: #01cd78;
  background: #f2f2f2;
  border-left-color: #01cd78;
  border-left: 4px solid #01cd78;
}

#toggleMenuLabel {
  cursor: pointer;
  display: block;
  height: 35px;
  width: 16px;
  margin: 0 auto;
  background: url('./img/menu.png') center no-repeat;
}

#toggleMenu:checked+.wrap .side-menu {
  width: 50px;
  transition: all 80ms ease-in-out;
}

#toggleMenu:checked+.wrap .side-menu .menu-list li a {
  padding-left: 13px;
  transition: all 250ms ease-in-out;
}

.el-icon-menu {
  font-size: 16px;
}
</style>
<script>
import { getStore, setStore } from '@/utils/localStorage';
export default {
  name: 'side',
  data() {
    return {
      menuList: []
    };
  },
  created() {
    const menuParmas = JSON.parse(getStore('menuParmas'));
    this.ajax({  //获取菜单
      url: '/authority/resource/user/resources?resourceId=' + menuParmas.id,
      success(data, $this) {
        if (data.code == 'success') {
          const { content } = data;
          let temp = [];
          for(let i = 0; i < content.length; i++){
            if(content[i].type == 1 && content[i].status == 0){
              if(content[i].url == "/project/personManage.html"){  //人员管理
                content[i].url = '/organize/personManage';
              }
              if(content[i].url == "/project/roleManage.html"){  //角色管理
                content[i].url = '/organize/rolesManage';
              }
              if(content[i].url == "/project/menuManage.html"){  //菜单管理
                content[i].url = '/organize/menuManage';
              }
              if(content[i].url == "/project/proManage.html"){  //项目管理
                content[i].url = '/project/manage';
              }
              if(content[i].url == "/project/demandManage.html"){  //需求管理
                content[i].url = '/project/demand';
              }
              if(content[i].url == "/project/newsManage.html"){  //OA首页
                content[i].url = '/trends/newsManage';
              }
              if(content[i].url == "/project/projectContract.html"){  //项目合同
                content[i].url = '/contract/manage';
              }
              if(content[i].url == "/project/contractSetting.html"){  //项目合同设置
                content[i].url = '/contract/setting';
              }

              if(content[i].url == "/project/workAttendance.html"){  //考勤统计
                content[i].url = '/attendance/report';
              }
              if(content[i].url == "/project/workAttendanceSetting.html"){  //考勤设置
                content[i].url = '/attendance/setting';
              }
              if(content[i].url == "/project/punchClock.html"){  //打卡统计
                content[i].url = '/attendance/punch';
              }
              if(content[i].url == "/project/approve.html"){  //考勤审批单
                content[i].url = '/attendance/approve';
              }
              if(content[i].url == "/project/humanAttendance.html"){  //人事平台
                content[i].url = '/affairs/attendance';
              }
              if(content[i].url == "/project/humanAffairs.html"){  //通讯录
                content[i].url = '/affairs/contacts';
              }

              temp.push({
                id: content[i].id,
                url: content[i].url,
                name: content[i].name
              });
            }
          }
          $this.menuList = temp;
        } else {
          this.$message({
            showClose: true,
            message: '身份验证失败！',
            type: 'error',
            onClose() {
              $this.$router.push('/');
            }
          });
        }
      }
    });
  }
};
</script>
