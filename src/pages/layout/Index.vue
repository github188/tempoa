<template>
  <div id="index" class="module-content">
    <v-header></v-header>
    <input class="z-hide" type="checkbox" id="toggleMenu">
    <div class="wrap">
      <v-side ref="side"></v-side>
      <router-view class="content" :style="{'min-height': sideHeight+'px'}"></router-view>
    </div>
  </div>
</template>

<style scoped>
.content {
  background: #eee;
  margin-top: 59px;
  padding: 24px 24px 40px;
}

.wrap {
  padding-left: 230px;
}

#toggleMenu:checked+.wrap {
  padding-left: 50px;
}
</style>
<style>
.module-content .header-box {
  max-width: 100% !important;
}

.module-content .logo {
  width: 230px !important;
}
</style>
<script>
import { setStore } from '@/utils/localStorage';
import Header from '@/pages/index/header';
import Side from './Side';
import components from '@/components/';  //获取注册的全局组件

export default {
  name: 'header',
  components: {
    'v-header': Header,
    'v-side': Side
  },
  data(){
    return {
      sideHeight: 0
    };
  },
  mounted(){
    this.sideHeight = this.$refs.side.$el.clientHeight - 78;
  },
  beforeRouteEnter(to, from, next) {
    if (to.params && to.params.id && to.params.name) {
      setStore('menuParmas', to.params);
    }
    next();
  },
  updated(){
    $(".el-table__body-wrapper").niceScroll({
      cursorcolor:"rgba(125, 125, 125, 0.7)",
      cursorwidth:"5px",
      cursorborderradius: 5
    });
  }
};

</script>


