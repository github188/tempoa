<template>
  <div class="side-menu">
    <a class="side-toggle" href="javascript:;">
      <label for="toggleMenu" id="toggleMenuLabel"></label>
    </a>

    <ul class="menu-list">
      <!-- <li v-for="(item, index) in menuList" :key="index">
  				<router-link to="/attendance/department">
  					<span>{{item.name}}</span>
  				</router-link>
  			</li> -->

        <li>
  				<router-link to="/attendance/report" data-id="1501039773776563">
  					<span>考勤统计</span>
  				</router-link>
  			</li>

  			<li>
  				<router-link to="/attendance/setting" data-id="1501039889775823">
  					<span>考勤设置</span>
  				</router-link>
  			</li>

        <li>
  				<router-link to="/attendance/approve" data-id="1505112351336567">
  					<span>考勤审批单</span>
  				</router-link>
  			</li>

        <li>
  				<router-link to="/attendance/punch" data-id="1505112351336567">
  					<span>打卡统计</span>
  				</router-link>
  			</li>

  			<!-- <li>
  				<router-link to="/affairs/attendance" data-id="1501494080731695">
  					<span>我的考勤</span>
  				</router-link>
  			</li>
        <li>
  				<router-link to="/affairs/contacts" data-id="1501494677601161">
  					<span>通讯录</span>
  				</router-link>
  			</li> -->

      <!-- <li>
        <router-link to="/trends/newsManage" data-id="1493891929755783">
          <span>新闻公告</span>
        </router-link>
      </li> -->

      <!-- <li>
        <router-link to="/project/manage" data-id="1493089982195835">
          <span>项目</span>
        </router-link>
      </li>

       <li>
        <router-link to="/project/demand" data-id="1493090013334368">
          <span>需求</span>
        </router-link>
      </li> -->



      <!-- <li>
  				<router-link to="/contract/manage" data-id="1497949460291559">
  					<span>合同</span>
  				</router-link>
  			</li>
  			<li>
  				<router-link to="/contract/setting" data-id="1497957466761717">
  					<span>合同设置</span>
  				</router-link>
  			</li> -->

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
        console.log(data, '获取菜单');
        if (data.code == 'success') {
          $this.menuList = data.content;
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
