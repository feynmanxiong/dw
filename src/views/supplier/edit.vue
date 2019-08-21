<template>
  <div class="edit">
    <el-form
      :inline="true"
      :model="customerEditList"
      :rules="rules"
      ref="ruleForm"
      label-position="right"
      label-width="110px"
    >
      <el-row class="cont_button">
        <div class="cont_border cont_top cont_bm">
          <el-button
            type="primary"
            size="mini"
            plain
            class="btn-left"
            @click="submitForm('ruleForm')"
          >保存</el-button>
          <el-button type="primary" size="mini" plain>审核</el-button>
          <el-button type="danger" size="mini" plain>取消审核</el-button>
        </div>
      </el-row>
      <el-row class="cont_border">
        <div class="cont_bottom_b">
          <el-row>
            <el-form-item class="el-item" label="全称:" prop="fullname">
              <el-input
                v-model="customerEditList.fullname"
                placeholder="请录入全称"
                size="mini"
                class="date_input"
              ></el-input>
            </el-form-item>
            <el-form-item class="el-item" label="简称:" prop="forshort">
              <el-input
                v-model="customerEditList.forshort"
                placeholder="请录入简称"
                size="mini"
                class="date_input"
              ></el-input>
            </el-form-item>
            <el-form-item class="el-item" label="助记码:" prop="mnemonic">
              <el-input
                v-model="customerEditList.mnemonic"
                placeholder="请输入助记码"
                size="mini"
                class="date_input"
              ></el-input>
            </el-form-item>
            <el-form-item class="el-item" label="纳税人识别号:">
              <el-input
                v-model="customerEditList.taxpayer"
                placeholder="请录入纳税人识别号"
                size="mini"
                class="date_input2"
              ></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item class="el-item" label="联系人:">
              <el-input
                v-model="customerEditList.linkman"
                placeholder="请录入全称"
                size="mini"
                class="date_input"
              ></el-input>
            </el-form-item>
            <el-form-item class="el-item" label="身份证号:">
              <el-input
                v-model="customerEditList.identifycard"
                placeholder="请录入身份证"
                size="mini"
                class="date_input"
              ></el-input>
            </el-form-item>
            <el-form-item class="el-item" label="固定电话:">
              <el-input
                v-model="customerEditList.fixedlinetel"
                placeholder="固定号码"
                size="mini"
                class="date_input"
              ></el-input>
            </el-form-item>
            <el-form-item class="el-item" label="手机号码:">
              <el-input
                v-model="customerEditList.mobilephone"
                placeholder="请录入手机号码"
                size="mini"
                class="date_input2"
              ></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item class="el-item" label="国家:">
              <el-select
                v-model="customerEditList.country"
                placeholder="请选择"
                size="mini"
                class="date_input"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="el-item" label="城市:">
              <el-select
                v-model="customerEditList.city"
                placeholder="请选择"
                size="mini"
                class="date_input"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="el-item" label="详细地址:">
              <el-input
                v-model="customerEditList.address"
                placeholder="请录入详细地址"
                size="mini"
                class="date_input5"
              ></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item class="el-item" label="E-mail:">
              <el-input
                v-model="customerEditList.email"
                placeholder="请录入E-mail地址"
                size="mini"
                class="date_input2"
              ></el-input>
            </el-form-item>
          </el-row>
        </div>
        <el-row class="cont_bottom_b cont_top">
          <el-form-item class="el-item" label="客户标志:">
            <el-radio-group class="el-item" v-model="customerEditList.customerlogo">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="2">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item class="el-item" label="供应商标志：">
            <el-radio-group class="el-item" v-model="customerEditList.supplierlogo">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="2">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item class="el-item" label="结算单位标志：">
            <el-radio-group class="el-item" v-model="customerEditList.settlelogo">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="2">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item class="el-item" label="结算公司：">
            <el-radio-group class="el-item" v-model="customerEditList.settlecompany">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="2">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <el-row class="cont_bottom_b logistic">
          <div class="flex">
            <span class="flex_1">物流角色勾选：</span>
          </div>
          <el-checkbox-group v-model="customerEditList.logisticrolelist">
            <el-row class="cont_top">
              <el-checkbox class="el-item" label="委托人"></el-checkbox>
              <el-checkbox class="el-item" label="船/铁路公司"></el-checkbox>
              <el-checkbox class="el-item" label="订舱公司"></el-checkbox>
              <el-checkbox class="el-item" label="换单公司"></el-checkbox>
              <el-checkbox class="el-item" label="货代公司"></el-checkbox>
              <el-checkbox class="el-item" label="车队公司"></el-checkbox>
              <el-checkbox class="el-item" label="保险公司"></el-checkbox>
              <el-checkbox class="el-item" label="仓储公司"></el-checkbox>
            </el-row>
            <el-row class="cont_top">
              <el-checkbox class="el-item" label="开证公司"></el-checkbox>
              <el-checkbox class="el-item" label="装箱公司"></el-checkbox>
              <el-checkbox class="el-item" label="还箱公司"></el-checkbox>
              <el-checkbox class="el-item" label="检测公司"></el-checkbox>
              <el-checkbox class="el-item" label="消毒公司"></el-checkbox>
              <el-checkbox class="el-item" label="熏蒸公司"></el-checkbox>
              <el-checkbox class="el-item" label="理货公司"></el-checkbox>
              <el-checkbox class="el-item" label="装卸公司"></el-checkbox>
              <el-checkbox class="el-item" label="其它公司"></el-checkbox>
            </el-row>
          </el-checkbox-group>
        </el-row>

        <el-row class="cont_flex logistic">
          <div class="left bank">
            <el-row v-for="(num, index) in bankNum" :key="num">
              <el-form-item label="开户行:">
                <el-select
                  v-model="num.bank"
                  placeholder="请选择"
                  size="mini"
                  class="date_input"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="银行账号:">
                <el-input
                  v-model="num.bankcounter"
                  placeholder="请录入银行账号"
                  size="mini"
                  class="date_input"
                ></el-input>
              </el-form-item>
              <span class="icon_span">
                <i class="fa fa-plus" title="添加" @click="addBank(index)"></i>
                <i class="fa fa-trash" title="删除" @click="deleteBank(index)"></i>
              </span>
            </el-row>
          </div>
          <div class="left">
            <el-row>
              <el-form-item class="el-item" label="预计收款日:">
                <el-select
                  v-model="customerEditList.expectreceiptday"
                  placeholder="请选择"
                  size="mini"
                  class="date_input"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-row>

            <el-row>
              <el-form-item class="el-item" label="预计付款日:">
                <el-select
                  v-model="customerEditList.expectpayday"
                  placeholder="请选择"
                  size="mini"
                  class="date_input"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-row>
          </div>
          <div class="left">
            <el-row>
              <el-form-item class="el-item" label="信控金额:">
                <el-input
                  v-model="customerEditList.creditamount"
                  placeholder="请录入信控金额"
                  size="mini"
                  class="date_input"
                ></el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item class="el-item" label="信控宽限天数:">
                <el-input
                  v-model="customerEditList.extendtime"
                  placeholder="请录入宽限天数"
                  size="mini"
                  class="date_input"
                ></el-input>
              </el-form-item>
            </el-row>
          </div>
        </el-row>
      </el-row>
      <el-row class="cont_top">
        <div>
          <div class="left">
            <el-row>
              <el-form-item class="cont_block" label="创建人:">
                <el-input
                  v-model="customerEditList.createman"
                  placeholder="请输入内容"
                  size="mini"
                  class="date_input"
                ></el-input>
              </el-form-item>
            </el-row>
            <el-row class="time_left">
              <el-form-item label="创建时间：">2019-6-17</el-form-item>
            </el-row>
          </div>
          <div class="left">
            <el-row>
              <el-form-item class="cont_block" label="修改人:">
                <el-input
                  v-model="customerEditList.modifyman"
                  placeholder="请输入内容"
                  size="mini"
                  class="date_input"
                ></el-input>
              </el-form-item>
            </el-row>
            <el-row class="time_left">
              <el-form-item label="修改时间：">2019-6-17</el-form-item>
            </el-row>
          </div>
          <div class="left">
            <el-row>
              <el-form-item class="cont_block" label="审核人:">
                <el-input
                  v-model="customerEditList.checkman"
                  placeholder="请输入内容"
                  size="mini"
                  class="date_input"
                ></el-input>
              </el-form-item>
            </el-row>
            <el-row class="time_left">
              <el-form-item label="审核时间：">2019-6-17</el-form-item>
            </el-row>
          </div>
        </div>
      </el-row>
    </el-form>
    <div class="box cont_top logistic">
      <p class="relations">客户供应商 / 业务板块类型关系 :</p>
      <el-row>
        <el-button type="primary" size="mini" plain @click="addBusiness">新增</el-button>
        <el-button type="primary" size="mini" plain>复制</el-button>
        <el-button type="danger" size="mini" plain @click="mulSelectedDelete">删除</el-button>
      </el-row>
    </div>
    <div class="logistic_">
      <template>
        <el-table
          :data="tableData"
          border
          size="mini"
          :header-cell-style="{background:'#e0f4ff',color:'#000'}"
          style="width: 1037px;"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" align="center" width="55"></el-table-column>
          <el-table-column align="center" type="index" label="序号" width="80"></el-table-column>
          <el-table-column align="center" prop="segment_business_name" label="业务模块" width="180">
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
          <el-table-column align="center" prop="test" label="主业务类型" width="180">
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
          <el-table-column align="center" prop="test" label="子业务类型" width="180">
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
          <el-table-column align="center" prop="test" label="操作人" width="180"></el-table-column>
          <el-table-column align="center" prop="test" label="操作时间" width="180"></el-table-column>
        </el-table>
      </template>
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
      tableData: [{ test: 1 }, { test: 1 }, { test: 1 }],

      customerEditList: {
        fullname: "",
        forshort: "",
        mnemonic: "",
        taxpayer: "",
        linkman: "",
        identiycard: "",
        fixedlinetel: "",
        mobilephone: "",
        country: "",
        city: "",
        address: "",
        email: "",
        customerlogo: "",
        supplierlogo: "",
        settlelogo: "",
        settlecompany: "",
        logisticrolelist: [],
        bank: "",
        bankcounter: "",
        expectreceiptday: "",
        expectpayday: "",
        creditamount: "",
        extendtime: "",
        createman: "",
        modifyman: "",
        checktman: ""
      },
      multipleSelection: [],
      bankNum: [{ bank: "", bankcounter: "" }],
      rules: {
        fullname: [{ required: true, message: "请输入全称", trigger: "blur" }],
        forshort: [{ required: true, message: "请输入简称", trigger: "blur" }],
        mnemonic: [{ required: true, message: "请输入助记符", trigger: "blur" }]
      }
    };
  },
  methods: {
    //选择或多选
    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val;
    },
    //业务模块新增BUTTON
    addBusiness() {
      let test = { test: 1 };
      this.tableData.push(test);
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
    },
    //获取登录人姓名
    getUserName() {
      console.log(localStorage.getItem("dw_erp_user_name"));
      this.customerEditList.createman = localStorage.getItem(
        "dw_erp_user_name"
      );
    },

    //添加银行信息
    addBank() {
      this.bankNum.push({ bank: "", bankcounter: "" });
    },
    //删除银行信息
    deleteBank() {
      if (this.bankNum.length > 1) {
        this.bankNum.pop();
      } else {
        return;
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  mounted() {
    this.getUserName();
  }
};
</script>

<style scoped>
.edit {
  padding: 20px;
}
.cont_flex .left {
  width: 300px;
  float: left;
}
.left {
  width: 300px;
  float: left;
}
.box {
  padding: 20px 0 10px;
  border-top: 2px solid rgb(243, 239, 239);
}
.relations {
  margin-bottom: 20px;
}
.bank {
  border: 1px solid rgb(231, 226, 226);
  width: 650px !important;
}
.add-bank {
  margin-left: 15px;
}
.bankAccount {
  margin-top: 0px;
}
.bankBtn {
  padding-right: 5px !important;
  padding-left: 5px !important;
}
.logistic {
  padding: 20px;
}

.icon_span {
  margin-left: 10px;
  line-height: 40px;
}
.btn-left {
  margin-left: 40px;
}
.logistic_ {
  padding-left: 20px;
}
.time_left {
  margin-left: 20px;
}
</style>>
