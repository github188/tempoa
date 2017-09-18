<!-- 编辑项目 -->
<template>
  <div>
    <el-dialog title="编辑项目" :visible.sync="modal" size="small" class="edit-project">
      <el-form ref="projectForm" :model="form" :rules="rules" label-width="110px" label-position="right">
        <el-form-item label="项目名称：" prop="proName">
          <el-input v-model="form.proName"></el-input>
        </el-form-item>

        <el-form-item label="营销中心：" class="inline-block" prop="market">
          <el-select v-model="form.market" placeholder="请选择" style="width: 180px;">
            <el-option v-for="item in marketList" :key="item.id" :label="item.name" :value="item.id +'|'+  item.name">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="立项日期：" class="inline-block" style="margin-left: 62px;" prop="proDate">
          <el-date-picker type="date" :editable="false" v-model="form.proDate" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="所属区域：" prop="province" id="provinceLabel">
          <!-- <v-area ref="area" selected="name" @change="getArea"></v-area> -->
          <el-select v-model="form.province" clearable class="select-area" @change="getCityList" placeholder="请选择">
            <el-option v-for="item in provinceList" :key="item.provinceId" :label="item.province" :value="item.provinceId+'|'+item.province">
            </el-option>
          </el-select>

          <el-select v-model="form.city" clearable class="select-area" @change="getAreaList" placeholder="请选择">
            <el-option v-for="item in cityList" :key="item.cityId" :label="item.city" :value="item.cityId + '|' + item.city">
            </el-option>
          </el-select>

          <el-select v-model="form.area" clearable class="select-area" placeholder="请选择">
            <el-option v-for="item in countyList" :key="item.areaId" :label="item.area" :value="item.areaId+'|'+item.area">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="项目背景：" prop="proContents">
          <el-input :autosize="{ minRows: 2, maxRows: 6}" type="textarea" v-model="form.proContents"></el-input>
        </el-form-item>

        <hr>
        <el-form-item label="市场负责人：" class="inline-block" prop="personMarket">
          <el-select v-model="form.personMarket" filterable placeholder="请输入关键字">
            <el-option v-for="item in personList" :key="item.id" :label="item.realname" :value="item.id + '|' + item.realname">
              <span style="float:left" class="search-label">{{item.realname}}</span>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="项目经理：" class="inline-block" prop="personManage">
          <el-select v-model="form.personManage" filterable placeholder="请输入关键字">
            <el-option v-for="item in personList" :key="item.id" :label="item.realname" :value="item.id + '|' + item.realname">
              <span style="float:left" class="search-label">{{item.realname}}</span>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="项目成员：" prop="personMember">
          <el-select class="w-100" v-model="form.personMember" filterable :multiple="true" placeholder="请输入关键字">
            <el-option v-for="item in personList" :key="item.id" :label="item.realname" :value="item.id + '|' + item.realname">
              <span style="float:left" class="search-label">{{item.realname}}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button type="success" :disabled="disable" v-if="disable">
          <i class="el-icon-loading"></i>
        </el-button>
        <el-button type="success" :disabled="disable" @click="submit" v-else>确 定</el-button>
        <el-button type="info" @click="modal = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<style>
.edit-project .el-dialog {
  width: 700px;
}

.edit-project .item-right {
  margin-right: 30px;
}

#provinceLabel .select-area {
  width: 180px;
  margin-right: 0;
}
</style>

<script>
export default {
  name: 'editProject',
  data() {
    return {
      modal: false,
      personList: [],
      marketList: [],  //营销中心数据
      provinceList: [],  //省列表
      cityList: [],  //市列表
      countyList: [],  //区列表
      loadArea: false,  //加载默认数据的情况下
      form: {
        id: '',  //本条数据id
        proName: '',   //项目名称
        market: '',  //营销中心
        province: '',  //省
        city: '',  //市
        area: '',  //区
        proDate: '',  //立项日期
        proContents: '', //项目背景
        personManage: '',  //项目经理名称
        personMarket: '',  //市场负责人名称
        personMember: [],  //项目成员名称
        areaSelected: {},
        pmoPersonList: [
          {  //项目经理
            personCategory: 1,
            personId: '',
            personName: ''
          },
          {  //市场负责人
            personCategory: 2,
            personId: '',
            personName: ''
          }
        ]  //管理信息
      },
      rules: {
        proName: {
          required: true,
          message: '项目名称不能为空!'
        },
        proDate: {
          required: true,
          message: '日期不能为空!'
        },
        proContents: {
          required: true,
          message: '项目背景不能为空!'
        },
        marktName: {
          required: true,
          message: '营销中心不能为空!'
        },
        province: {
          required: true,
          message: '所属区域不能为空!'
        },
        personManage: {
          required: true,
          message: '项目经理不能为空!'
        },
        personMarket: {
          required: true,
          message: '市场负责人不能为空!'
        },
        personMember: {
          required: true,
          message: '项目成员不能为空!'
        }
      },
    };
  },
  created() {
    this.getPersonList();
    this.getMarketList();
  },
  methods: {
    getProvinceList() {
      this.ajax({
        url: '/region/province',
        success(data, $this) {
          if (data.code == 'success') {
            $this.provinceList = data.content;
            if ($this.form.province) {
              $this.getCityList( $this.form.province );
            }
          }
        }
      });
    },
    getCityList(value) {
      if (value) {
        const id = this.splitStr(value).value;
        this.ajax({
          url: '/region/' + id + '/city',
          success(data, $this) {
            if (data.code == 'success') {
              $this.cityList = data.content;
              if ($this.form.city) {
                $this.getAreaList( $this.form.city );
              }
            }
          }
        });
      }
    },
    getAreaList(value) {
      if (value) {
        const id = this.splitStr(value).value;
        this.ajax({
          url: '/region/' + id + '/area',
          success(data, $this) {
            if (data.code == 'success') {
              $this.countyList = data.content;
            }
          }
        });
      };
    },
    splitStr(value) {
      let _value = value.split('|');
      return {
        name: _value[1],
        value: _value[0]
      };
    },
    getMarketList() {
      this.ajax({
        url: '/pmo/common/markets',
        success(data, $this) {
          if (data.code == 'success') {
            $this.marketList = data.content;
          }
        }
      });
    },
    getPersonList() {
      this.ajax({
        url: '/authority/user/dep/1',
        data: {
          pageNum: 1,
          pageSize: 1000
        },
        success(data, $this) {
          if (data.code == 'success') {
            $this.personList = data.content;
          }
        }
      });
    },
    openModal(row) {
      this.modal = true;
      this.resetForm('projectForm');
      this.ajax({
        url: 'pmo/project/' + row.id + '/detail',
        success(data, $this) {
          if (data.code == 'success') {
            $this.form.personMember = [];
            const content = data.content;
            let temp = content.pmoPersonList;
            for (let i = 0; i < temp.length; i++) {
              $this.form.personMember.push(temp[i].personId + '|' + temp[i].personName);
            }
          }
        }
      });
      this.form.id = row.id;
      this.form.proName = row.proName;
      this.form.proDate = row.proDate;
      this.form.proContents = row.proContents;
      this.form.personMarket = row.marktPersonId + '|' + row.marktPersonName;
      this.form.personManage = row.managePersonId + '|' + row.managePersonName;
      this.form.market = row.marktId + '|' + row.marktName;
      this.form.province = row.provinceId + '|' + row.province;
      this.form.city = row.cityId + '|' + row.city;
      this.form.area = row.areaId + '|' + row.area;
      this.getProvinceList();
    },

    getMemberName(obj) {  //获取项目成员
      let length = obj.length;
      this.form.personMember = [];
      if (length > 0) {
        for (var i = 0; i < length; i++) {
          this.form.personMember.push({
            personCategory: 3,
            personId: obj[i].split('|')[0],
            personName: obj[i].split('|')[1]
          });
        }
      }
    },
    submit() {

      this.$refs.projectForm.validate((valid) => {
        if (valid) {
          this.disable = true;
          let {  province, city,  area, market, proDate, proName, proContents, personManage, personMarket, personMember, id } = this.form;

          const provinceObj = this.splitStr(province);
          const cityObj = this.splitStr(city);
          const areaObj = this.splitStr(area);
          const marketObj =  this.splitStr(market);
          const personManageObj = this.splitStr(personManage);
          const personMarketObj = this.splitStr(personMarket);

          this.form.pmoPersonList[0] = {//项目经理
            personCategory: 1,
            personId: personManageObj.value,
            personName: personManageObj.name
          };

          this.form.pmoPersonList[1] = {//市场负责人
            personCategory: 2,
            personId: personMarketObj.value,
            personName: personMarketObj.name
          };

          this.getMemberName(personMember);

          let params = {
            pmoProject: {
              id: id,
              proName: proName,
              area: areaObj.name,
              areaId: areaObj.value,
              city: cityObj.name,
              cityId: cityObj.value,
              province: provinceObj.name,
              provinceId: provinceObj.value,
              marktId: marketObj.value,
              marktName: marketObj.name,
              proContents: proContents,
              proDate: new Date(proDate).toDay()
            },
            pmoPersonList: this.form.pmoPersonList.concat(this.form.personMember)
          };
          this.ajax({
            url: 'pmo/project/update',
            type: 'put',
            data: params,
            success(data, $this) {
              if (data.code == 'success') {
                $this.successTips();
                $this.modal = false;
                $this.$emit('getList');
              } else {
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
