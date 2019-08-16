
<template>
  <div>
    <div class="container"></div>
    <el-container :class="['elContianer',isShowAside?'':'contain_box_in']">
      <transition name="select_out">
        <div class="select_out" v-show="!isShowAside" @click="isShowAside=true">
          <i class="el-submenu__icon-arrow el-icon-arrow-right"></i>
        </div>
      </transition>
      <transition name="select_in">
        <el-aside width="320px" v-show="isShowAside" class="select_box">
          <div class="select_in" @click="isShowAside=false">
            <i class="el-submenu__icon-arrow el-icon-arrow-left"></i>
          </div>
          <div class="cont_t">自定义查询区</div>
          <el-row class="el-m publicSelect">
            <div align="center">
              <el-button type="info" plain size="mini">重置</el-button>
              <el-button type="success" plain size="mini">查询</el-button>
            </div>
          </el-row>
          <el-row>
            <input type="text" autocomplete="off" placeholder="请输入内容" class="el-input__inner" />
          </el-row>
          <el-row>
            <span class="span">审核状态</span>
            <el-select
              v-model="value"
              placeholder="请选择"
              size="mini"
              class="date_box"
              filterable
            >
               <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-row>
          <el-row>
            <span class="span">物流角色</span>
            <el-select v-model="value" placeholder="请选择" size="mini" class="date_box">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-row>
          <el-row>
            <span class="span">客户标志</span>
            <el-select v-model="value" placeholder="请选择" size="mini" class="date_box">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-row>
          <el-row>
            <span class="span">供应商标志</span>
            <el-select v-model="value" placeholder="请选择" size="mini" class="date_box">
             <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-row>
          <el-row>
            <span class="span">结算单位标志</span>
            <el-select v-model="value" placeholder="请选择" size="mini" class="date_box">
             <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-row>
          <el-row>
            <span class="span">业务板块</span>
            <el-select
              v-model="value"
              filterable
              placeholder="请选择"
              size="mini"
              class="date_box"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-row>
          <el-row>
            <span class="span">主业务类型</span>
            <el-select
              v-model="value"
              filterable
              placeholder="请选择"
              size="mini"
              class="date_box"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-row>
          <el-row>
            <span class="span">子业务类型</span>
            <el-select v-model="value" placeholder="请选择" size="mini" class="date_box">
             <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-row>
          <el-row>
            <span class="span">创建人</span>
            <el-select v-model="value" placeholder="请选择" size="mini" class="date_box">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            
          </el-row>
          <el-row>
            <span class="span">修改人</span>
            <el-select v-model="value" placeholder="请选择" size="mini" class="date_box">
             <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            
          </el-row>
          <el-row>
            <span class="span">审核人</span>
            <el-select v-model="value" placeholder="请选择" size="mini" class="date_box">
             <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
           
          </el-row>
        </el-aside>
      </transition>
      <el-main>
        <el-row class="cont_block">
          <el-button type="primary" plain size="mini" @click="dialogVisibleAddview">编辑</el-button>
          <el-button type="danger" plain size="mini" @click="mulSelectedDelete">批量删除</el-button>
          <el-button type="primary" plain size="mini" @click="mulSelectedCheck">批量审核</el-button>
          <el-button type="danger" plain size="mini" @click="mulSelectedCheckCancel">批量取消审核</el-button>
        </el-row>
        <el-row>
          <el-table
            :data="tableData"
            border
            ref="multipleTable"
            style="width: 100%"
            size="mini"
            class="mainTable"
            :header-cell-style="{background:'#e0f4ff',color:'#000'}"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" align="center" width="55" prop="price_id"></el-table-column>
            <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
            <el-table-column align="center" type="index" label="操作" prop="id" width="80">
              <template slot-scope="scope">
                <i
                  class="fa fa-edit"
                  aria-hidden="true"
                  @click.stop="handleEdit(scope.$index, scope.row)"
                ></i>
                <i
                  class="fa fa-trash"
                  aria-hidden="true"
                  @click.stop="handleDelete(scope.$index, scope.row)"
                ></i>
              </template>
            </el-table-column>
            <el-table-column prop="status" label="审核状态" align="center"></el-table-column>
            <el-table-column prop="price_id" label="全称" align="center"></el-table-column>
            <el-table-column prop="price_con" label="简称" align="center"></el-table-column>
            <el-table-column prop="settle_com" label="助记码" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="business_type" label="纳税人识别号" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column
              prop="main_business"
              label="物流角色"
              align="center"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="child_business"
              label="客户标志"
              align="center"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column prop="createman" label="供应商标志" align="center"></el-table-column>
            <el-table-column prop="createman" label="结算单位标志" align="center"></el-table-column>
            <el-table-column prop="createman" label="业务板块" align="center"></el-table-column>
            <el-table-column prop="createman" label="主业务类型" align="center"></el-table-column>
            <el-table-column prop="createman" label="子业务类型" align="center"></el-table-column>
            <el-table-column prop="createman" label="创建人" align="center"></el-table-column>
            <el-table-column prop="createdDate" label="创建时间" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="modifyman" label="修改人" align="center"></el-table-column>
            <el-table-column prop="modifiedDate" label="修改时间" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="checkman" label="审核人" align="center"></el-table-column>
            <el-table-column prop="checkedDate" label="审核时间" align="center" show-overflow-tooltip></el-table-column>
          </el-table>
        </el-row>
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 50, 100, 200]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </el-main>
      <priceeditadd ref="addDialog"></priceeditadd>
    </el-container>
  </div>
</template>

<script>
/**
 * 参数均为数组，arr1包含arr2
 * 批量删除
 */
function removeByValue(arr1, arr2) {
  for (var i = 0; i < arr1.length; i++) {
    for (var j = 0; j < arr2.length; j++) {
      if (arr1[i] == arr2[j]) {
        arr1.splice(i, 1);
      }
    }
  }
}
export default {
  data() {
    return {
      selectStatus: "1",
      //是否展示侧边栏
      isShowAside: true,
      //审核状态
      options: [
        {
          value: "选项1",
          label: "已审核"
        },
        {
          value: "选项2",
          label: "未审核"
        }
      ],
      value: "",
      tableData: [],
      //选中列表行数据
      selectedData: [],
      //多选数据
      multipleSelection: [],
      total: 0,
      currentPage: 1,
      pageSize: 10,
      //新增编辑框数量
      customerNumber: 0
    };
  },
  computed: {},
  created() {},
  mounted() {
    // this.tableData = getData();  模拟后台数据
    this.tableData = [
      {
        id: 1,
        status: "已审核",
        prohibit: "启用",
        price_id: 1,
        price_con: "船代系统",
        settle_com: "张三结算公司",
        business_type: "货运代理",
        main_business: "外贸出口",
        child_business: "外贸散货出口",
        createman: "刘一",
        createdDate: "2019-08-14",
        modifyman: "牛二",
        modifiedDate: "2019-08-14",
        checkman: "李四",
        checkedDate: "2019-08-14"
      },
      {
        id: 2,
        status: "未审核",
        prohibit: "禁用",
        price_id: 2,
        price_con: "船代系统",
        settle_com: "赵六结算公司",
        business_type: "货运代理",
        main_business: "外贸出口",
        child_business: "外贸散货出口",
        createman: "刘一",
        createdDate: "2019-08-14",
        modifyman: "牛二",
        modifiedDate: "2019-08-14",
        checkman: "李四",
        checkedDate: "2019-08-14"
      },
      {
        id: 3,
        status: "已审核",
        prohibit: "启用",
        price_id: 3,
        price_con: "船代系统",
        settle_com: "王五结算公司",
        business_type: "货运代理",
        main_business: "外贸出口",
        child_business: "外贸散货出口",
        createman: "刘一",
        createdDate: "2019-08-14",
        modifyman: "牛二",
        modifiedDate: "2019-08-14",
        checkman: "李四",
        checkedDate: "2019-08-14"
      },
      {
        id: 4,
        status: "未审核",
        prohibit: "启用",
        price_id: 4,
        price_con: "船代系统",
        settle_com: "王五结算公司",
        business_type: "货运代理",
        main_business: "外贸出口",
        child_business: "外贸散货出口",
        createman: "刘一",
        createdDate: "2019-08-14",
        modifyman: "牛二",
        modifiedDate: "2019-08-14",
        checkman: "李四",
        checkedDate: "2019-08-14"
      },
      {
        id: 5,
        status: "未审核",
        prohibit: "启用",
        price_id: 5,
        price_con: "船代系统",
        settle_com: "王五结算公司",
        business_type: "货运代理",
        main_business: "外贸出口",
        child_business: "外贸散货出口",
        createman: "刘一",
        createdDate: "2019-08-14",
        modifyman: "牛二",
        modifiedDate: "2019-08-14",
        checkman: "李四",
        checkedDate: "2019-08-14"
      },
      {
        id: 6,
        status: "未审核",
        prohibit: "启用",
        price_id: 6,
        price_con: "船代系统",
        settle_com: "王五结算公司",
        business_type: "货运代理",
        main_business: "外贸出口",
        child_business: "外贸散货出口",
        createman: "刘一",
        createdDate: "2019-08-14",
        modifyman: "牛二",
        modifiedDate: "2019-08-14",
        checkman: "李四",
        checkedDate: "2019-08-14"
      },
      {
        id: 7,
        status: "未审核",
        prohibit: "启用",
        price_id: 7,
        price_con: "船代系统",
        settle_com: "王五结算公司",
        business_type: "货运代理",
        main_business: "外贸出口",
        child_business: "外贸散货出口",
        createman: "刘一",
        createdDate: "2019-08-14",
        modifyman: "牛二",
        modifiedDate: "2019-08-14",
        checkman: "李四",
        checkedDate: "2019-08-14"
      }
    ];
    this.total = this.tableData.length;
    console.log(this.total)
  },
  methods: {
    // //编辑按钮
    // dialogVisibleAddview() {
    //   this.$refs.addDialog.showAndHideDialog();
    // },
    //编辑按钮新增框
			dialogVisibleAddview(){
				var obj=new Object();
				if(this.customerNumber<=0){
					obj.title="客户供应商编辑";
				}else{
					obj.title="客户供应商编辑"+this.customerNumber;
				}
				this.customerNumber++;
				obj.content="supplierCustomerEdit";
				this.$emit("clickSearch",obj)
			},
    //编辑图标
    handleEdit(index, row) {
      this.dialogVisibleAddview();
    },
    //删除图标
    handleDelete(index, row) {
      this.$confirm("是否确定删除？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.tableData.splice(index, 1);
          this.total = this.tableData.length;
        })
        .catch(() => {});
    },
    //多选
    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val;
    },
    // ----批量操作可进行封装----
    //批量删除
    mulSelectedDelete() {
      this.$confirm("选定项是否确定删除？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          removeByValue(this.tableData, this.multipleSelection);
          this.total = this.tableData.length;
        })
        .catch(() => {});
    },
    //批量审核
    mulSelectedCheck() {
      this.multipleSelection.forEach(item => {
        item.status = "已审核";
      });
      this.$refs.multipleTable.clearSelection();
    },
    //批量取消审核
    mulSelectedCheckCancel() {
      this.multipleSelection.forEach(item => {
        item.status = "未审核";
      });
      this.$refs.multipleTable.clearSelection();
    },
    //批量启用
    mulSelectedAllow() {
      this.multipleSelection.forEach(item => {
        item.prohibit = "启用";
      });
      this.$refs.multipleTable.clearSelection();
    },
    //批量禁用
    mulSelectedProhibit() {
      this.multipleSelection.forEach(item => {
        item.prohibit = "禁用";
      });
      this.$refs.multipleTable.clearSelection();
    },
    //分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      //this.fetchData(1, val);
      // console.log(`每页 ${val} 条`);
    },
    //分页
    handleCurrentChange(val) {
      this.currentPage = val;
      //this.fetchData(val, this.pageSize);
      // console.log(`当前页: ${val}`);
    }
  },
  components: {
    
  }
};
</script>

<style scoped>
.container {
  padding: 10px;
  width: 100%;
}
.cont_border {
  border-bottom: 2px solid #eeeeee;
  padding-bottom: 10px;
  width: 100%;
}
.cont_block {
  display: block;
}

.STableTitle_btn {
  float: right;
  margin-bottom: 0;
}
</style>