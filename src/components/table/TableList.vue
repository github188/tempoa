<template>
  <div>
    <el-table @select-all="selectAll" ref="tableList" @select="select" :empty-text="status" :data="data" :border="true" style="width: 100%">
      <el-table-column type="selection" v-if="checkbox"></el-table-column>
      <template v-for="(item, index) in columns">
        <el-table-column align="center" v-if="item.operator" :key="index" :label="item.name" :width="item.width">
          <template scope="scope">
            <a @click="label.click(scope.row, scope)" class="operator" href="javascript:;" v-for="(label, key) in item.operator(scope.row)" :data-key="key" :key="key">{{label.name}}</a>
          </template>
        </el-table-column>
        <el-table-column v-else :key="index" show-overflow-tooltip :formatter="item.render" :align="item.align || 'center'" :prop="item.value" :label="item.name" :width="item.width">
        </el-table-column>
      </template>

    </el-table>
    <el-pagination v-if="isPage" @current-change="changes" @size-change="siezeChange" :current-page="pageIndex" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totals">
    </el-pagination>
  </div>
</template>

<style scoped>
.operator {
  padding: 0 5px;
}

.el-pagination {
  margin-bottom: 10px;
  margin-top: 30px;
}
</style>

<script>
export default {
  name: 'tablelist',
  data() {
    return {
      status: '加载中...',
      columns: [],
      data: [],
      totals: 0,
      pageIndex: 1,
      pageSize: 0,
      selection: {},
      checkbox: {},
      flag: true
    };
  },
  updated() {
    if (this.checkbox) {
      let temp = {};
      let $selected = this.checkbox.selected;
      if (this.flag && $selected) {
        for (let i = 0; i < $selected.length; i++) {
          temp[$selected[i].id] = $selected[i];
        }
        this.selection = temp;
        this.flag = false;
      }
      let data = this.data;
      let selection = this.selection;
      for (let i = 0; i < data.length; i++) {
        for (let key in selection) {
          if (data[i].id == key) {
            this.$refs.tableList.toggleRowSelection(data[i], true);
          }
        }
      }
    }
  },
  methods: {
    changes(pages) {
      this.change(pages);
    },
    siezeChange(size) {
      // this.siezeChange(size);
    },
    select(a, row) {
      let _selection = this.selection;
      if (Object.keys(_selection).length == 0) {
        _selection[row.id] = row;
      } else {
        for (var key in _selection) {
          if (row.id == key) {
            delete _selection[key];
            break;
          } else {
            _selection[row.id] = row;
          }
        }
      }
      this.checkbox.change(_selection);
    },
    selectAll(selection) {
      let _selection = this.selection;
      let data = this.data;

      for (let i = 0; i < selection.length; i++) {
        _selection[selection[i].id] = selection[i];
      }

      if (selection.length == 0) {
        for (let i = 0; i < data.length; i++) {
          delete _selection[data[i].id];
        }
      }
      this.checkbox.change(_selection);
    }
  }
};
</script>
