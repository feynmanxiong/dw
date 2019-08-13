<template>
  <!--价格管理  =>价格管理-->
  <el-container>
      <el-form :inline="true" :model="priceForm">
        <div class="cont_t">自定义查询区</div>
        <el-row class="row_s">
          <div class="cont_btns">
            <el-button type="info" size="mini" class="aside-button">重置</el-button>
            <el-button type="success" size="mini" class="aside-button">查询</el-button>
          </div>
        </el-row>
        <el-row>
          <el-input
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            v-model="priceForm.searchValue"
          ></el-input>
        </el-row>

        <el-row>
          <el-form-item label="审核状态:" class="item">
            <el-select
              placeholder="审核状态"
              class="date_input"
              size="mini"
              v-model="priceForm.checkValue"
            >
              <el-option label="已审核" value="已审核"></el-option>
              <el-option label="未审核" value="未审核"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="价格协议号:" class="item">
            <el-input
              v-model="priceForm.numberInput"
              placeholder="价格协议名称"
              size="mini"
              class="date_input"
            ></el-input>
          </el-form-item>
          <el-form-item label="价格协议内容:" class="item">
            <el-input
              v-model="priceForm.contentInput"
              placeholder="价格协议名称"
              size="mini"
              class="date_input"
            ></el-input>
          </el-form-item>
          <el-form-item label="结算公司:" class="item">
            <el-select
              v-model="priceForm.settleCompany"
              placeholder="请选择"
              size="mini"
              class="date_input"
            >
              <el-option label="公司1" value="1"></el-option>
              <el-option label="公司2" value="2"></el-option>
              <el-option label="公司3" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="业务板块:" class="item">
            <el-select
              v-model="priceForm.businessType"
              placeholder="请选择"
              size="mini"
              class="date_input"
            >
              <el-option label="货运代理" value="1"></el-option>
              <el-option label="船运代理" value="2"></el-option>
              <el-option label="仓储物流" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="主业务类型:" class="item">
            <el-select
              v-model="priceForm.mainBusiness"
              placeholder="请选择"
              size="mini"
              class="date_input"
            >
              <el-option label="外贸出口" value="1"></el-option>
              <el-option label="外贸进口" value="2"></el-option>
              <el-option label="内贸进港" value="3"></el-option>
              <el-option label="内贸出港" value="4"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="子业务类型:" class="item">
            <el-select
              v-model="priceForm.childBusiness"
              placeholder="请选择"
              size="mini"
              class="date_input"
            >
              <el-option label="集装箱" value="1"></el-option>
              <el-option label="散货" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="创建人:" class="item">
            <el-select
              v-model="priceForm.createMan"
              placeholder="请选择"
              size="mini"
              class="date_input"
            >
              <el-option label="王五" value="1"></el-option>
              <el-option label="赵六" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label class="date-item">
            <el-date-picker
              v-model="priceForm.createdStart"
              type="date"
              placeholder="申请开始时间"
              size="mini"
              class="date_input"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label>
            <el-date-picker
              v-model="priceForm.createdEnd"
              type="date"
              placeholder="申请结束时间"
              class="date_input"
              size="mini"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="修改人:" class="item">
            <el-select
              v-model="priceForm.modifyMan"
              placeholder="请选择"
              size="mini"
              class="date_input"
            >
              <el-option label="张三" value="1"></el-option>
              <el-option label="李四" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label>
            <div class="block">
              <el-date-picker
                v-model="priceForm.modifiedStart"
                type="date"
                placeholder="申请开始时间"
                size="mini"
                class="date_input"
              ></el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label>
            <div class="block">
              <el-date-picker
                v-model="priceForm.modifiedEnd"
                type="date"
                placeholder="申请结束时间"
                size="mini"
                class="date_input"
              ></el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="审核人:" class="item">
            <el-select
              v-model="priceForm.checkMan"
              placeholder="请选择"
              size="mini"
              class="date_input"
            >
              <el-option label="刘一" value="1"></el-option>
              <el-option label="李二" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label>
            <el-date-picker
              v-model="priceForm.checkedStart"
              type="date"
              placeholder="申请开始时间"
              size="mini"
              class="date_input"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label>
            <el-date-picker
              v-model="priceForm.checkedEnd"
              type="date"
              placeholder="申请结束时间"
              size="mini"
              class="date_input"
            ></el-date-picker>
          </el-form-item>
        </el-row>
      </el-form>
     
    
    <el-main class="main-box">
      <!-- 功能按钮区 -->
      <el-row>
        <el-button type="primary" plain size="mini">编辑</el-button>
        <el-button type="danger" plain size="mini">删除</el-button>
        <el-button type="primary" plain size="mini">批量审核</el-button>
        <el-button type="danger" plain size="mini">批量取消审核</el-button>
        <el-button type="primary" plain size="mini">批量启用</el-button>
        <el-button type="danger" plain size="mini">批量禁用</el-button>
      </el-row>
      <!-- 价格协议列表区 -->
      <el-row>
        <el-table
          :data="tableData"
          border
          stripe
          style="width: 100%"
          size="mini"
          show-summary
          :header-cell-style="{background:'#e0f4ff',color:'#000'}"
        >
          <el-table-column type="selection" align="center" width="55"></el-table-column>
          <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
          <el-table-column align="center" type="index" label="操作" prop="id" width="80">
            <template slot-scope="scope">
              <i class="fa fa-edit" aria-hidden="true" @click.stop="mainTableEdit(scope.row.id)"></i>
              <i
                class="fa fa-trash"
                aria-hidden="true"
                @click.stop="mainTableSingleDelete(scope.row.id)"
              ></i>
            </template>
          </el-table-column>

          <el-table-column prop="test" label="审核状态" align="center"></el-table-column>
          <el-table-column prop="test" label="价格协议号" align="center"></el-table-column>
          <el-table-column prop="test" label="价格协议内容" align="center"></el-table-column>
          <el-table-column prop="test" label="结算公司" align="center"></el-table-column>
          <el-table-column prop="test" label="业务板块" align="center"></el-table-column>
          <el-table-column prop="test" label="主业务类型" align="center"></el-table-column>
          <el-table-column prop="test" label="子业务类型" align="center"></el-table-column>
          <el-table-column prop="test" label="创建人" align="center"></el-table-column>
          <el-table-column prop="test" label="创建时间" align="center"></el-table-column>
          <el-table-column prop="test" label="修改人" align="center"></el-table-column>
          <el-table-column prop="test" label="修改时间" align="center"></el-table-column>
          <el-table-column prop="test" label="审核人" align="center"></el-table-column>
          <el-table-column prop="test" label="审核时间" align="center"></el-table-column>
        </el-table>
      </el-row>
      <!--新增价格协议   start-->
      <el-dialog title :visible.sync="dialogVisible" :modal="false" fullscreen>
        <el-form :inline="true" :model="params" label-position="right">
          <el-row class="cont_button">
            <div class="cont_border cont_top cont_bm">
              <el-button type="success" size="mini">编辑</el-button>
              <el-button type="danger" size="mini">删除</el-button>
              <el-button type="success" size="mini">批量审核</el-button>
              <el-button type="warning" size="mini">批量取消审核</el-button>
              <el-button type="success" size="mini">批量启用</el-button>
              <el-button type="warning" size="mini">批量禁用</el-button>
            </div>
          </el-row>
          <el-row class="cont_border">
            <el-form-item class="el-item" label="价格协议号:">
              <el-input v-model="input" placeholder="价格协议号" size="mini" class="date_input"></el-input>
            </el-form-item>
            <el-form-item class="el-item" label="价格协议名称:">
              <el-input v-model="input" placeholder="价格协议号" size="mini" class="date_input"></el-input>
            </el-form-item>
            <el-form-item class="el-item" label="价格协议内容:">
              <el-input
                v-model="input"
                placeholder="请输入价格协议内容，100字以内"
                size="mini"
                class="date_input5"
              ></el-input>
            </el-form-item>
            <el-row>
              <el-form-item class="el-item" label="结算公司:">
                <el-select v-model="value" placeholder="请选择" size="mini" class="date_input">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="el-item" label="业务板块:">
                <el-select v-model="value" placeholder="请选择" size="mini" class="date_input">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="el-item" label="主业务类型:">
                <el-select v-model="value" placeholder="请选择" size="mini" class="date_input">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="el-item" label="子业务类型:">
                <el-select v-model="value" placeholder="请选择" size="mini" class="date_input">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-row>
          </el-row>
          <el-row>
            <b class="cont_m_b">船港信息</b>
            <el-row class>
              <el-table
                :data="tableData"
                border
                stripe
                style="width: 100%"
                size="mini"
                show-summary
              >
                <el-table-column type="selection" align="center" width="55"></el-table-column>
                <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
                <el-table-column prop="test" label="收付标志" align="center"></el-table-column>
                <el-table-column prop="test" label="费用科目名称" align="center"></el-table-column>
                <el-table-column prop="test" label="免税标志" align="center"></el-table-column>
                <el-table-column prop="test" label="应收单位来源" align="center"></el-table-column>
                <el-table-column prop="test" label="固定应收单位" align="center" disabled></el-table-column>
                <el-table-column prop="test" label="应付单位来源" align="center"></el-table-column>
                <el-table-column prop="test" label="固定应付单位" align="center"></el-table-column>
                <el-table-column prop="test" label="币别" align="center"></el-table-column>
                <el-table-column prop="test" label="开票类型" align="center"></el-table-column>
                <el-table-column prop="test" label="税率" align="center"></el-table-column>
                <el-table-column prop="test" label="单价" align="center"></el-table-column>
                <el-table-column prop="test" label="计算单位" align="center"></el-table-column>
                <el-table-column prop="test" label="箱量类型" align="center"></el-table-column>
                <el-table-column prop="test" label="最小值开票金额" align="center"></el-table-column>
                <el-table-column prop="test" label="最大值开票金额" align="center"></el-table-column>
                <el-table-column prop="test" label="单值限制" align="center"></el-table-column>
                <el-table-column prop="test" label="操作符" align="center"></el-table-column>
                <el-table-column prop="test" label="值" align="center"></el-table-column>
                <el-table-column prop="test" label="单值限制2" align="center"></el-table-column>
                <el-table-column prop="test" label="操作符" align="center"></el-table-column>
                <el-table-column prop="test" label="值" align="center"></el-table-column>
                <el-table-column prop="test" label="条件限制" align="center"></el-table-column>
              </el-table>
            </el-row>
          </el-row>
          <el-row class="cont_top">
            <div class="flex w">
              <div class="flex_1">
                <el-form-item class="cont_block" label="创建人:">
                  <el-input v-model="input" placeholder="请输入内容" size="mini" class="date_input"></el-input>
                </el-form-item>
                <el-form-item label="创建时间：">2019-6-17</el-form-item>
              </div>
              <div class="flex_1">
                <el-form-item class="cont_block" label="修改人:">
                  <el-input v-model="input" placeholder="请输入内容" size="mini" class="date_input"></el-input>
                </el-form-item>
                <el-form-item label="修改时间：">2019-6-17</el-form-item>
              </div>
              <div class="flex_1">
                <el-form-item class="cont_block" label="审核人:">
                  <el-input v-model="input" placeholder="请输入内容" size="mini" class="date_input"></el-input>
                </el-form-item>
                <el-form-item label="审核时间：">2019-6-17</el-form-item>
              </div>
            </div>
          </el-row>
        </el-form>
      </el-dialog>
      <!--新增价格协议   end-->
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      priceForm: {
        searchValue: "",
        checkValue: "",
        settleCompany: "",
        numberInput: "",
        contentInput: "",
        businessType: "",
        mainBusiness: "",
        childBusiness: "",
        createMan: "",
        modifyMan: "",
        checkMan: "",
        createdStart: "",
        createdEnd: "",
        modifiedStart: "",
        modifiedEnd: "",
        checkedStart: "",
        checkedEnd: ""
      },
      tableData: [
        {
          test: "王小虎"
        },
        {
          test: "王小虎"
        },
        {
          test: "王小虎"
        },
        {
          test: "王小虎"
        },
        {
          test: "王小虎"
        }
      ]
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    handleDelete(index, row) {
      console.log(index);
      console.log(row);
      this.$confirm("此操作将永久删除该店铺和其下所有数据,是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.tableData.splice(index, 1);
      });
    },
    add() {
      this.n++;
      this.tableData.push({
        id: this.n,
        test: "test",
        state: false
      });
    }
  }
};
</script>

<style scoped>
.aside-button {
  width: 100px;
}

.item {
  margin-right: 0px;
  margin-left: -10px;
  width: 250px;
  display: flex;
  justify-content: flex-end;
}
.date-item {
  text-align: right;
}
.select {
  width: 140px;
  height: 16px !important;
}
.main-box {
  padding: 10px;
}
</style>