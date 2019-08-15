
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
            <span class="span">物流角色</span>
            <el-select v-model="selectStatus" placeholder="请选择" size="mini" class="date_box">
              <el-option :label="'启用'" :value="1"></el-option>
              <el-option :label="'禁用'" :value="0"></el-option>
            </el-select>
          </el-row>
          <el-row>
            <span class="span">客户标志</span>
            <el-select v-model="selectStatus" placeholder="请选择" size="mini" class="date_box">
              <el-option :label="'启用'" :value="1"></el-option>
              <el-option :label="'禁用'" :value="0"></el-option>
            </el-select>
          </el-row>
          <el-row>
            <span class="span">供应商标志</span>
            <el-select v-model="selectStatus" placeholder="请选择" size="mini" class="date_box">
              <el-option :label="'启用'" :value="1"></el-option>
              <el-option :label="'禁用'" :value="0"></el-option>
            </el-select>
          </el-row>
          <el-row>
            <span class="span">结算单位标志</span>
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
            <span class="span">主业务板块</span>
            <el-select v-model="selectStatus" placeholder="请选择" size="mini" class="date_box">
              <el-option :label="'启用'" :value="1"></el-option>
              <el-option :label="'禁用'" :value="0"></el-option>
            </el-select>
          </el-row>
          <el-row>
            <span class="span">子业务板块</span>
            <el-select v-model="selectStatus" placeholder="请选择" size="mini" class="date_box">
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
          </el-row>
          <el-row>
            <span class="span">修改人</span>
            <el-select v-model="selectStatus" placeholder="请选择" size="mini" class="date_box">
              <el-option :label="'启用'" :value="1"></el-option>
              <el-option :label="'禁用'" :value="0"></el-option>
            </el-select>         
          </el-row>
          <el-row>
            <span class="span">审核人</span>
            <el-select v-model="selectStatus" placeholder="请选择" size="mini" class="date_box">
              <el-option :label="'启用'" :value="1"></el-option>
              <el-option :label="'禁用'" :value="0"></el-option>
            </el-select>
          </el-row>
        </el-aside>
      </transition>
      <el-main>
        <el-row class="cont_block">
          <el-button type="primary" plain size="mini" @click="toPriceEdit">编辑</el-button>
          <el-button type="danger" plain size="mini">批量删除</el-button>
          <el-button type="primary" plain size="mini">批量审核</el-button>
          <el-button type="danger" plain size="mini">批量取消审核</el-button>
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
            <el-table-column type="selection" align="center" width="55" prop="status"></el-table-column>
            <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
            <el-table-column align="center" type="index" label="操作" prop="status" width="80">
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
            <el-table-column prop="status" label="全称" align="center"></el-table-column>
            <el-table-column prop="status" label="简称" align="center"></el-table-column>
            <el-table-column prop="status" label="助记码" align="center"></el-table-column>
            <el-table-column prop="status" label="纳税人识别号" align="center"></el-table-column>
            <el-table-column prop="status" label="物流角色" align="center"></el-table-column>
            <el-table-column prop="status" label="客户标志" align="center"></el-table-column>
            <el-table-column prop="status" label="供应商标志" align="center"></el-table-column>
            <el-table-column prop="status" label="结算单位标志" align="center"></el-table-column>
            <el-table-column prop="status" label="业务板块" align="center"></el-table-column>
            <el-table-column prop="status" label="主业务类型" align="center"></el-table-column>
            <el-table-column prop="status" label="子业务类型" align="center"></el-table-column>
            <el-table-column prop="status" label="创建人" align="center"></el-table-column>
            <el-table-column prop="status" label="创建时间" align="center"></el-table-column>
            <el-table-column prop="status" label="修改人" align="center"></el-table-column>
            <el-table-column prop="status" label="修改时间" align="center"></el-table-column>
            <el-table-column prop="status" label="审核人" align="center"></el-table-column>
            <el-table-column prop="status" label="审核时间" align="center"></el-table-column>
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
      },
      tableData: [
          {
              status: '200'
          }
      ]
    };
  },
  computed: {},
  created() {
    console.log(getData());
  },
  mounted() {
   
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