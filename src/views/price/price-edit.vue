<template>
  <!-- 价格协议编辑 -->
  <div id="priceEdit">
    <div class="header">
      <!-- 功能按钮区 -->
      <div class="left">
        <!-- <el-button type="primary" plain size="mini" @click="dialogVisibleAddview">新增</el-button> -->
        <!-- <el-button type="primary" plain size="mini">复制</el-button> -->
        <el-button type="primary" plain size="mini">保存</el-button>
        <!-- <el-button type="danger" plain size="mini">删除</el-button> -->
        <el-button type="primary" plain size="mini">审核</el-button>
        <el-button type="danger" plain size="mini">取消审核</el-button>
        <el-button type="primary" plain size="mini">启用</el-button>
        <el-button type="danger" plain size="mini">禁用</el-button>
      </div>
      <div class="right">
        审核状态:
        <el-select v-model="value" placeholder="请选择" class="checkSelect" size="mini">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
    </div>
    <div class="form">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="价格协议号：" class="item">
          <el-input v-model="formInline.number" placeholder="请输入价格协议号" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="价格协议内容：" class="item changeLength">
          <el-input
            v-model="formInline.content"
            placeholder="请输入价格协议内容，顶多100字"
            class="input"
            size="mini"
          ></el-input>
        </el-form-item>
        <el-form-item label="结算公司：" class="item">
          <el-select v-model="formInline.settleCompany" placeholder size="mini">
            <el-option label="公司1" value="0"></el-option>
            <el-option label="公司2" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-row>
          <el-form-item label="业务板块：" class="item">
            <el-select v-model="formInline.business" placeholder size="mini">
              <el-option label="业务1" value="0"></el-option>
              <el-option label="业务2" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="主业务类型：" class="item">
            <el-select v-model="formInline.mainBusiness" placeholder size="mini">
              <el-option label="主业务1" value="0"></el-option>
              <el-option label="主业务2" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="子业务类型：" class="item">
            <el-select v-model="formInline.childBusiness" placeholder size="mini">
              <el-option label="子业务1" value="0"></el-option>
              <el-option label="子业务2" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-row>
      </el-form>
    </div>
    <div class="priceRule">
      收费规则
      <div class="rule_button">
        <el-button type="primary" plain size="mini" @click="addInvoiceRule">新增</el-button>
        <el-button type="primary" plain size="mini">复制</el-button>
        <el-button type="danger" plain size="mini" @click="mulSelectedDelete">删除</el-button>
      </div>
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
          <el-table-column type="selection" align="center" width="45"></el-table-column>
          <!-- <el-table-column align="center" type="index" label="操作" prop="id" width="70">
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
          </el-table-column> -->
          <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
          <el-table-column label="收付标志" align="center">
            <template slot-scope="scope">
              <el-select
                v-model="values.re_pay_value"
                @change="businessModuleChange(scope.row.segment_business_id,scope.row.id)"
                placeholder="请选择"
                class="selectInTable"
              >
                <el-option
                  v-for="item in re_pay_options"
                  :label="item.label"
                  :key="item.value"
                  :value="item.value"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="免税标志" align="center">
            <template slot-scope="scope">
              <el-select
                v-model="values.free_value"
                @change="businessModuleChange(scope.row.segment_business_id,scope.row.id)"
                placeholder="请选择"
                class="selectInTable"
              >
                <el-option
                  v-for="item in free_options"
                  :label="item.label"
                  :key="item.value"
                  :value="item.value"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop label="费用项目" align="center">
            <template slot-scope="scope">
              <el-select
                v-model="values.item_value"
                @change="businessModuleChange(scope.row.segment_business_id,scope.row.id)"
                placeholder="请选择"
                class="selectInTable"
              >
                <el-option
                  v-for="item in item_options"
                  :label="item.label"
                  :key="item.value"
                  :value="item.value"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="test" label="应收单位来源" align="center">
            <template slot-scope="scope">
              <el-select
                v-model="values.receipt_source_value"
                @change="businessModuleChange(scope.row.segment_business_id,scope.row.id)"
                placeholder="请选择"
                class="selectInTable"
              >
                <el-option
                  v-for="item in receipt_source_options"
                  :label="item.label"
                  :key="item.value"
                  :value="item.value"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="test" label="固定应付单位" align="center">
            <template slot-scope="scope">
              <el-select
                v-model="value"
                @change="businessModuleChange(scope.row.segment_business_id,scope.row.id)"
                placeholder="请选择"
                class="selectInTable"
              >
                <el-option
                  v-for="item in options"
                  :label="item.label"
                  :key="item.value"
                  :value="item.value"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="test" label="应付单位来源" align="center">
            <template slot-scope="scope">
              <el-select
                v-model="values.pay_source_value"
                @change="businessModuleChange(scope.row.segment_business_id,scope.row.id)"
                placeholder="请选择"
                class="selectInTable"
              >
                <el-option
                  v-for="item in pay_source_options"
                  :label="item.label"
                  :key="item.value"
                  :value="item.value"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="test" label="固定应付单位" align="center">
            <template slot-scope="scope">
              <el-select
                v-model="value"
                @change="businessModuleChange(scope.row.segment_business_id,scope.row.id)"
                placeholder="请选择"
                class="selectInTable"
              >
                <el-option
                  v-for="item in options"
                  :label="item.label"
                  :key="item.value"
                  :value="item.value"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop label="币别" align="center">
            <template slot-scope="scope">
              <el-select
                v-model="values.currency_value"
                @change="businessModuleChange(scope.row.segment_business_id,scope.row.id)"
                placeholder="请选择"
                class="selectInTable"
              >
                <el-option
                  v-for="item in currency_options"
                  :label="item.label"
                  :key="item.value"
                  :value="item.value"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="test" label="开票类型" align="center">
            <template slot-scope="scope">
              <el-select
                v-model="values.invoice_value"
                @change="businessModuleChange(scope.row.segment_business_id,scope.row.id)"
                placeholder="请选择"
                class="selectInTable"
              >
                <el-option
                  v-for="item in invoice_options"
                  :label="item.label"
                  :key="item.value"
                  :value="item.value"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="test" label="税率" align="center">
            <template slot-scope="scope">
              <el-select
                v-model="values.tax_value"
                @change="businessModuleChange(scope.row.segment_business_id,scope.row.id)"
                placeholder="请选择"
                class="selectInTable"
              >
                <el-option
                  v-for="item in tax_options"
                  :label="item.label"
                  :key="item.value"
                  :value="item.value"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="test" label="单价表达式" align="center">
            <template slot-scope="scope">
              <el-input v-model="search_1" placeholder style="border:none;" size="mini" />
            </template>
          </el-table-column>
          <el-table-column prop="test" label="单价" align="center">
            <template slot-scope="scope">
              <el-input v-model="search_2" placeholder style="border:none;" size="mini" />
            </template>
          </el-table-column>
          <el-table-column prop="test" label="计费单位" align="center">
            <template slot-scope="scope">
              <el-select
                v-model="values.valuation_value"
                @change="businessModuleChange(scope.row.segment_business_id,scope.row.id)"
                placeholder="请选择"
                class="selectInTable"
              >
                <el-option
                  v-for="item in valuation_options"
                  :label="item.label"
                  :key="item.value"
                  :value="item.value"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop label="最小值开票金额" align="center">
            <template slot-scope="scope">
              <el-input v-model="search_3" placeholder style="border:none;" size="mini" />
            </template>
          </el-table-column>
          <el-table-column prop="test" label="最大值开票金额" align="center">
            <template slot-scope="scope">
              <el-input v-model="search_4" placeholder style="border:none;" size="mini" />
            </template>
          </el-table-column>
          <el-table-column prop="test" label="价格条件字段1" align="center">
            <template slot-scope="scope">
              <el-select
                v-model="value"
                @change="businessModuleChange(scope.row.segment_business_id,scope.row.id)"
                placeholder="请选择"
                class="selectInTable"
              >
                <el-option
                  v-for="item in options"
                  :label="item.label"
                  :key="item.value"
                  :value="item.value"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="test" label="操作符1" align="center">
            <template slot-scope="scope">
              <el-select
                v-model="value"
                @change="businessModuleChange(scope.row.segment_business_id,scope.row.id)"
                placeholder="请选择"
                class="selectInTable"
              >
                <el-option
                  v-for="item in options"
                  :label="item.label"
                  :key="item.value"
                  :value="item.value"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="test" label="值1" align="center">
            <template slot-scope="scope">
              <el-select
                v-model="value"
                @change="businessModuleChange(scope.row.segment_business_id,scope.row.id)"
                placeholder="请选择"
                class="selectInTable"
              >
                <el-option
                  v-for="item in options"
                  :label="item.label"
                  :key="item.value"
                  :value="item.value"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="test" label="添加/删除" align="center"></el-table-column>
          <!-- <el-table-column prop="test" label="逻辑符" align="center"></el-table-column>
          <el-table-column prop="test" label="价格条件字段2" align="center"></el-table-column>
          <el-table-column prop="test" label="操作符2" align="center"></el-table-column>
          <el-table-column prop="test" label="值2" align="center"></el-table-column>-->
        </el-table>
      </el-row>
    </div>
    <div class="man">
      <div>
        <span>创建人：</span>
        <el-input size="mini" v-model="created_man" :disabled="true"></el-input>
      </div>
      <div>
        <span>修改人：</span>
        <el-input size="mini" v-model="updated_man" :disabled="true"></el-input>
      </div>
      <div>
        <span>审核人：</span>
        <el-input size="mini" v-model="checked_man" :disabled="true"></el-input>
      </div>
    </div>
    <div class="man date">
      <div>
        <span>创建时间：</span>
        <span>{{created_date}}</span>
      </div>
      <div>
        <span>修改时间：</span>
        <span>{{modified_date}}</span>
      </div>
      <div>
        <span>审核时间：</span>
        <span>{{checked_date}}</span>
      </div>
    </div>
  </div>
</template>

<script>
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
      //收付标志
      re_pay_options: [
        {
          value: "选项1",
          label: "付"
        },
        {
          value: "选项2",
          label: "收"
        },
        {
          value: "选项3",
          label: "收付"
        }
      ],
      //免税标志
      free_options: [
        {
          value: "选项1",
          label: "是"
        },
        {
          value: "选项2",
          label: "否"
        }
      ],
      //费用项目
      item_options: [
        {
          value: "选项1",
          label: "代理换单费"
        },
        {
          value: "选项2",
          label: "代理拖车费"
        },
        {
          value: "选项3",
          label: "代理报关费"
        }
      ],
      //应收单位来源
      receipt_source_options: [
        {
          value: "选项1",
          label: "结算客户"
        },
        {
          value: "选项2",
          label: "委托人"
        },
        {
          value: "选项3",
          label: "船公司"
        }
      ],
      //应付单位来源
      pay_source_options: [
        {
          value: "选项1",
          label: "结算客户"
        },
        {
          value: "选项2",
          label: "委托人"
        },
        {
          value: "选项3",
          label: "船公司"
        }
      ],
      //币种
      currency_options: [
        {
          value: "选项1",
          label: "CNY"
        },
        {
          value: "选项2",
          label: "USD"
        }
      ],
      //开票类型
      invoice_options: [
        {
          value: "选项1",
          label: "增6%"
        },
        {
          value: "选项2",
          label: "增9%"
        }
      ],
      //税率
      tax_options: [
        {
          value: "选项1",
          label: "6%"
        },
        {
          value: "选项2",
          label: "9%"
        }
      ],
      //计价单位
      valuation_options: [
        {
          value: "选项1",
          label: "小箱"
        },
        {
          value: "选项2",
          label: "大箱"
        },
        {
          value: "选项3",
          label: "特大箱"
        }
      ],
      //价格协议表单
      formInline: {
        number: "",
        content: "",
        settleCompany: "",
        business: "",
        mainBusiness: "",
        childBusiness: ""
      },
      tableData: [
        {
          test: ""
        }
      ],
      priceNumber: 0,
      search: "",
      values: {
        re_pay_value: "",
        free_value: "",
        item_value: "",
        receipt_source_value: "",
        pay_source_value: "",
        currency_value: "",
        invoice_value: "",
        tax_value: "",
        valuation_value: ""
      },
      search_1: "",
      search_2: "",
      search_3: "",
      search_4: "",
      created_man: "",
      updated_man: "",
      checked_man: "",
      created_date: "2019-08-17",
      modified_date: "2019-08-17",
      checked_date: "2019-08-17",
      multipleSelection: []
    };
  },
  methods: {
    //新增按钮
    dialogVisibleAddview() {
      var obj = new Object();
      if (this.priceNumber <= 0) {
        obj.title = "价格协议编辑";
      } else {
        obj.title = "价格协议编辑" + this.priceNumber;
      }
      this.priceNumber++;
      obj.content = "priceEdit";
      this.$emit("clickSearch", obj);
    },
    //获取登录人姓名
    getUserName() {
      console.log(localStorage.getItem("dw_erp_user_name"));
      this.created_man = localStorage.getItem("dw_erp_user_name");
    },
    //收费规则新增BUTTON
    addInvoiceRule() {
      let test = { test: "" };
      this.tableData.push(test);
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
    //选择或多选
    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val;
    },

    //删除按钮
    mulSelectedDelete() {
      if (this.multipleSelection.length > 0) {
        this.$confirm("选定项是否确定删除？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        })
          .then(() => {
            removeByValue(this.tableData, this.multipleSelection);
          })
          .catch(() => {});
      }
    }
  },
  mounted() {
    this.getUserName();
  }
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  padding: 0 10px;
  border-bottom: 3px solid #eee;
}
.checkSelect {
  width: 100px;
  height: 16px;
}
.form {
  padding: 10px;
}
.item {
  margin-right: 50px !important;
  margin-bottom: 10px !important;
}
.item.changeLength {
  width: 530px;
}
.item.changeLength .input {
  width: 400px;
}
.priceRule {
  padding: 30px 10px;
  border-bottom: 3px solid #eee;
  color: red;
}
.rule_button {
  margin-top: 10px;
}
.man {
  display: flex;
}
.man div {
  display: flex;
  margin: 10px;
  line-height: 48px;
  width: 230px;
}
.man div span {
  display: inline-block;
  width: 100px;
}
.date {
  margin-top: -28px !important;
}
.priceEdit {
  margin-bottom: 20px;
}
</style>