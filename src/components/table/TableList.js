import Vue from 'vue';
// beforeData 预处理数据。自己注入数据
// checkbox: {
//   selected: selected,   当前已存在的数据
//   change(obj){  选中数据回调
//   }
// },
const TableListConstructor = Vue.extend(require('./TableList.vue'));
const TableList = ({ columns = [], complete = false, element = "#tableList", checkbox = false, beforeData = false, data = {}, isPage = true, url = '' } = {}) => {
    const pageInfo = {};
    var instance = new TableListConstructor({
        methods: {
            loadData(pageNum, pageSize) {
                let arg = data;
                pageInfo.pageNum = pageNum || 1;
                pageInfo.pageSize = pageSize || 10;
                arg.pageNum = pageInfo.pageNum; //当前第几页
                arg.pageSize = pageInfo.pageSize; //每页显示条数
                instance.columns = columns; //设置表头
                instance.checkbox = checkbox; //是否多选
                instance.isPage = isPage; //是否分页

                if (beforeData) { //预处理数据， 没有分页
                    instance.data = beforeData;
                } else {
                    instance.ajax({
                        url: url,
                        data: arg,
                        success(result, $this) {
                            if (result.code == 'success') {
                                instance.data = result.content; //表列数据
                                instance.totals = result.totals;
                                instance.pageIndex = result.pageIndex;
                                instance.pageSize = arg.pageSize;

                                if(complete){
                                  complete(result);
                                }

                                if (instance.data.length == 0) {
                                    instance.status = '暂无数据';
                                }
                            } else {
                                instance.status = '加载失败';
                            }
                        }
                    });
                }
            }
        },
        updated() {
            $(element).html(instance.$el); //添加元素到界面上
        }
    });

    instance.loadData(1, data.pageSize); //默认第一页
    instance.change = (pageNum) => {
        instance.loadData(pageNum, pageInfo.pageSize);
    };
    instance.siezeChange = (size) => {
        instance.loadData(pageInfo.pageNum, size);
    };
    instance.$mount(document.createElement("div")); //挂载元素
};

export default TableList;
