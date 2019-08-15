<template>
  <!-- 价格协议编辑 -->
  <div id="priceEdit">
    <div class="header">
      <!-- 功能按钮区 -->
      <div class="left">
        <el-button type="primary" plain size="mini">新增</el-button>
        <el-button type="primary" plain size="mini">复制</el-button>
        <el-button type="primary" plain size="mini">保存</el-button>
        <el-button type="danger" plain size="mini">删除</el-button>
        <el-button type="primary" plain size="mini">审核</el-button>
        <el-button type="danger" plain size="mini">取消审核</el-button>
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
        <el-form-item label="全称：" class="item">
          <el-input v-model="formInline.number" placeholder="请录入全称" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="简称：" class="item">
          <el-input v-model="formInline.content" placeholder="请录入简称" class="input" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="助记码：" class="item">
          <el-input v-model="formInline.number" placeholder="请录入助记码" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="纳税人识别号：" class="item">
          <el-input v-model="formInline.number" placeholder="请录入纳税人识别号" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="联系人：" class="item">
          <el-input v-model="formInline.number" placeholder="请录入全称" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="身份证号：" class="item">
          <el-input v-model="formInline.number" placeholder="请录入身份证号" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="固定电话：" class="item">
          <el-input v-model="formInline.number" placeholder="区号" size="mini"></el-input>
          <el-input v-model="formInline.number" placeholder="固定号码" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="手机号码：" class="item">
          <el-input v-model="formInline.number" placeholder="请录入手机号码" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="国家：" class="item">
          <el-select v-model="formInline.settleCompany" placeholder size="mini">
            <el-option label="公司1" value="0"></el-option>
            <el-option label="公司2" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="城市：" class="item">
          <el-select v-model="formInline.settleCompany" placeholder size="mini">
            <el-option label="公司1" value="0"></el-option>
            <el-option label="公司2" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="详细地址：" class="item">
          <el-input v-model="formInline.number" placeholder="请录入详细地址" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="E-mail：" class="item">
          <el-input v-model="formInline.number" placeholder="请录入E-mail地址" size="mini"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="singleSelect">
      <div>
        <span>客户标志:</span>
        <el-radio-group v-model="radio">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </div>
      <div>
        <span>供应商标志:</span>
        <el-radio-group v-model="radio">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </div>
      <div>
        <span>结算单位标志:</span>
        <el-radio-group v-model="radio">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </div>
      <div>
        <span>结算公司:</span>
        <el-radio-group v-model="radio">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </div>
    </div>

    <div class="mulSelect">
      <span>物流角色勾选 :</span>
      <el-checkbox-group v-model="checkList">
        <el-checkbox label="委托人" class="checkbox"></el-checkbox>
        <el-checkbox label="船/铁路公司" class="checkbox"></el-checkbox>
        <el-checkbox label="订舱公司" class="checkbox"></el-checkbox>
        <el-checkbox label="换单公司" class="checkbox"></el-checkbox>
        <el-checkbox label="贷代公司" class="checkbox"></el-checkbox>
        <el-checkbox label="车队公司" class="checkbox"></el-checkbox>
        <el-checkbox label="保险公司" class="checkbox"></el-checkbox>
        <el-checkbox label="仓储公司" class="checkbox"></el-checkbox>
        <el-checkbox label="开证公司" class="checkbox"></el-checkbox>
        <el-checkbox label="装箱公司" class="checkbox"></el-checkbox>
        <el-checkbox label="还箱公司" class="checkbox"></el-checkbox>
        <el-checkbox label="检测公司" class="checkbox"></el-checkbox>
        <el-checkbox label="消毒公司" class="checkbox"></el-checkbox>
        <el-checkbox label="熏蒸公司" class="checkbox"></el-checkbox>
        <el-checkbox label="理货公司" class="checkbox"></el-checkbox>
        <el-checkbox label="装卸公司" class="checkbox"></el-checkbox>
        <el-checkbox label="其他公司" class="checkbox"></el-checkbox>
      </el-checkbox-group>
    </div>
    <div class="bankPart">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="开户行：" class="item">
          <el-input v-model="formInline.number" placeholder="请录入全称" size="mini" class="bank-input"></el-input>
        </el-form-item>

        <el-form-item label="银行账号：" class="item">
          <el-input
            v-model="formInline.number"
            placeholder="请录入详细地址"
            size="mini"
            class="bank-input"
          ></el-input>
        </el-form-item>

        <el-form-item label="预计收款日：" class="item">
          <el-select v-model="formInline.settleCompany" placeholder size="mini" class="bank-input">
            <el-option label="公司1" value="0"></el-option>
            <el-option label="公司2" value="1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="预计付款日：" class="item">
          <el-select v-model="formInline.settleCompany" placeholder size="mini" class="bank-input">
            <el-option label="公司1" value="0"></el-option>
            <el-option label="公司2" value="1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="信控金额：" class="item">
          <el-select v-model="formInline.settleCompany" placeholder size="mini" class="bank-input">
            <el-option label="公司1" value="0"></el-option>
            <el-option label="公司2" value="1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="信控宽限天数：" class="item">
          <el-select v-model="formInline.settleCompany" placeholder size="mini" class="bank-input">
            <el-option label="公司1" value="0"></el-option>
            <el-option label="公司2" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="man">
      <div>
        <span>创建人：</span>
        <el-input size="mini"></el-input>
      </div>
      <div>
        <span>修改人：</span>
        <el-input size="mini"></el-input>
      </div>
      <div>
        <span>审核人：</span>
        <el-input size="mini"></el-input>
      </div>
    </div>
    <div class="man date">
      <div>
        <span>创建时间：</span>
        <span>2019-08-13</span>
      </div>
      <div>
        <span>修改时间：</span>
        <span>2019-08-13</span>
      </div>
      <div>
        <span>审核时间：</span>
        <span>2019-08-13</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
          test: 100
        },
        {
          test: 100
        }
      ],
      radio: 1,
      checkList: ["委托人"]
    };
  }
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  padding: 0 10px;
  border-bottom: 3px solid #e4e4e4;
}
.checkSelect {
  width: 100px;
  height: 16px;
}
.form,
.mulSelect {
  padding: 10px;
  border-bottom: 2px solid #e4e4e4;
}
.singleSelect {
  display: flex;
  padding: 10px;
  border-bottom: 2px solid #e4e4e4;
}
.singleSelect div {
  margin-right: 20px;
}
.singleSelect div span {
  margin-right: 20px;
}
.mulSelect span {
  padding-bottom: 15px;
}
.mulSelect .checkbox {
  margin: 5px 15px;
}
.bankPart {
  border-bottom: 2px solid #e4e4e4;
}

.item {
  margin-right: 100px !important;
  margin-bottom: 10px !important;
}

.item.changeLength {
  width: 700px;
}
.item.changeLength .input {
  width: 500px;
}
.priceRule {
  padding-bottom: 20px;
  border-bottom: 3px solid #e4e4e4;
  color: red;
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