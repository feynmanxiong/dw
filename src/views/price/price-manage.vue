
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
              v-model="selectStatus"
              placeholder="请选择"
              size="mini"
              class="date_box"
              filterable
            >
              <el-option :label="'启用'" :value="1"></el-option>
              <el-option :label="'禁用'" :value="0"></el-option>
            </el-select>
          </el-row>
          <el-row>
            <span class="span">价格协议号</span>
            <el-select v-model="selectStatus" placeholder="请选择" size="mini" class="date_box">
              <el-option :label="'启用'" :value="1"></el-option>
              <el-option :label="'禁用'" :value="0"></el-option>
            </el-select>
          </el-row>
          <el-row>
            <span class="span">价格协议内容</span>
            <el-select v-model="selectStatus" placeholder="请选择" size="mini" class="date_box">
              <el-option :label="'启用'" :value="1"></el-option>
              <el-option :label="'禁用'" :value="0"></el-option>
            </el-select>
          </el-row>
          <el-row>
            <span class="span">结算公司</span>
            <el-select v-model="selectStatus" placeholder="请选择" size="mini" class="date_box">
              <el-option :label="'启用'" :value="1"></el-option>
              <el-option :label="'禁用'" :value="0"></el-option>
            </el-select>
          </el-row>
          <el-row>
            <span class="span">业务板块</span>
            <el-select
              v-model="selectStatus"
              filterable
              placeholder="请选择"
              size="mini"
              class="date_box"
            >
              <el-option :label="'启用'" :value="1"></el-option>
              <el-option :label="'禁用'" :value="0"></el-option>
            </el-select>
          </el-row>
          <el-row>
            <span class="span">主业务类型</span>
            <el-select
              v-model="selectStatus"
              filterable
              placeholder="请选择"
              size="mini"
              class="date_box"
            >
              <el-option :label="'启用'" :value="1"></el-option>
              <el-option :label="'禁用'" :value="0"></el-option>
            </el-select>
          </el-row>
          <el-row>
            <span class="span">子业务类型</span>
            <el-select v-model="selectStatus" placeholder="请选择" size="mini" class="date_box">
              <el-option :label="'启用'" :value="1"></el-option>
              <el-option :label="'禁用'" :value="0"></el-option>
            </el-select>
          </el-row>
          <el-row>
            <span class="span">创建人</span>
            <el-select
              v-model="selectStatus"
              filterable
              placeholder="请选择"
              size="mini"
              class="date_box"
            >
              <el-option :label="'启用'" :value="1"></el-option>
              <el-option :label="'禁用'" :value="0"></el-option>
            </el-select>
          </el-row>
          <el-row>
            <span class="span">创建人</span>
            <el-select v-model="selectStatus" placeholder="请选择" size="mini" class="date_box">
              <el-option :label="'启用'" :value="1"></el-option>
              <el-option :label="'禁用'" :value="0"></el-option>
            </el-select>
            <el-date-picker type="date" placeholder="申请开始时间" size="mini" class="date_input"></el-date-picker>
            <el-date-picker type="date" placeholder="申请结束时间" size="mini" class="date_input"></el-date-picker>
          </el-row>
          <el-row>
            <span class="span">修改人</span>
            <el-select v-model="selectStatus" placeholder="请选择" size="mini" class="date_box">
              <el-option :label="'启用'" :value="1"></el-option>
              <el-option :label="'禁用'" :value="0"></el-option>
            </el-select>
            <el-date-picker type="date" placeholder="商务会签开始时间" size="mini" class="date_input"></el-date-picker>
            <el-date-picker type="date" placeholder="商务会签结束时间" size="mini" class="date_input"></el-date-picker>
          </el-row>
          <el-row>
            <span class="span">审核人</span>
            <el-select v-model="selectStatus" placeholder="请选择" size="mini" class="date_box">
              <el-option :label="'启用'" :value="1"></el-option>
              <el-option :label="'禁用'" :value="0"></el-option>
            </el-select>
            <el-date-picker type="date" placeholder="业务开始时间" size="mini" class="date_input"></el-date-picker>
            <el-date-picker type="date" placeholder="业务结束时间" size="mini" class="date_input"></el-date-picker>
          </el-row>
        </el-aside>
      </transition>
      <el-main>
        <el-row class="cont_block">
          <el-button type="primary" plain size="mini" @click="toPriceEdit">编辑</el-button>
          <el-button type="danger" plain size="mini">删除</el-button>
          <el-button type="primary" plain size="mini">批量审核</el-button>
          <el-button type="danger" plain size="mini">批量取消审核</el-button>
          <el-button type="primary" plain size="mini">批量启用</el-button>
          <el-button type="danger" plain size="mini">批量禁用</el-button>
        </el-row>
        <el-row>
          <el-table
            :data="tableData"
            border
            stripe
            style="width: 100%"
            size="mini"
            class="mainTable"
            :header-cell-style="{background:'#e0f4ff',color:'#000'}"
          >
            <el-table-column type="selection" align="center" width="55" prop="price_id"></el-table-column>
            <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
            <el-table-column align="center" type="index" label="操作" prop="price_id" width="80">
              <template slot-scope="scope">
                <i class="fa fa-edit" aria-hidden="true" @click.stop="mainTableEdit(scope.row.id)"></i>
                <i
                  class="fa fa-trash"
                  aria-hidden="true"
                  @click.stop="mainTableSingleDelete(scope.row.id)"
                ></i>
              </template>
            </el-table-column>
            <el-table-column prop="status" label="审核状态" align="center"></el-table-column>
            <el-table-column prop="price_id" label="价格协议号" align="center"></el-table-column>
            <el-table-column prop="price_con" label="价格协议内容" align="center"></el-table-column>
            <el-table-column prop="settle_com" label="结算公司" align="center"></el-table-column>
            <el-table-column prop="business_type" label="业务板块" align="center"></el-table-column>
            <el-table-column prop="main_business" label="主业务类型" align="center"></el-table-column>
            <el-table-column prop="child_business" label="子业务类型" align="center"></el-table-column>
            <el-table-column prop="createman" label="创建人" align="center"></el-table-column>
            <el-table-column prop="createdDate" label="创建时间" align="center"></el-table-column>
            <el-table-column prop="modifyman" label="修改人" align="center"></el-table-column>
            <el-table-column prop="modifiedDate" label="修改时间" align="center"></el-table-column>
            <el-table-column prop="checkman" label="审核人" align="center"></el-table-column>
            <el-table-column prop="checkedDate" label="审核时间" align="center"></el-table-column>
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
    </el-container>
  </div>
</template>

<script>
import getData from "./tool/ajax";
export default {
  data() {
    return {
      selectStatus: "1",
      isShowAside: true, //是否展示侧边栏
      tableData: [],
      MainTableSelectChangeIdList: [], //列表页多选框，选中的id
      newid: 1,
      fileList: "",
      params: "",
      total: 5,
      currentPage: 1,
      pageSize: 10,
      radio: "1",
      buildSettlementCompany: {
        mnemonicCode: "",
        descName: "",
        name: "",
        status: ""
      }
    };
  },
  computed: {},
  created() {
    console.log(getData());
  },
  mounted() {
    // this.tableData = getData();
    this.tableData = [
      {
        status: "已审核",
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
        status: "未审核",
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
        status: "已审核",
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
      }
    ];
  },
  methods: {
    //主表格单条修改
    mainTableEdit(id) {
      this.tableData.forEach((it, index) => {
        if (id == it.Id) {
          this.buildSettlementCompany = it;
          this.innerVisibleType = false;
          this.innerVisible = true;
        }
      });
    },
    //主表格单条删除
    mainTableSingleDelete(id) {
      this.$confirm("是否确定删除？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.tableData.forEach((it, index) => {
            if (id == it.Id) {
              this.tableData.splice(index, 1);
            }
          });
        })
        .catch(() => {});
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
    },

    toPriceEdit(){
      this.$router.push({ path: 'priceEdit' })
    }
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