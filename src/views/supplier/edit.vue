<template>
  <div class="edit">
    <el-form :inline="true" :model="params" label-position="right" label-width="110px">
      <el-row class="cont_button">
        <div class="cont_border cont_top cont_bm">
          <el-button type="primary" size="mini" plain @click="dialogVisibleAddview">新增</el-button>
          <el-button type="primary" size="mini" plain>复制</el-button>
          <el-button type="primary" size="mini" plain>保存</el-button>
          <el-button type="danger" size="mini" plain>删除</el-button>
          <el-button type="primary" size="mini" plain>审核</el-button>
          <el-button type="danger" size="mini" plain>取消审核</el-button>
        </div>
      </el-row>
      <el-row class="cont_border">
        <div class="cont_bottom_b">
          <el-row>
            <el-form-item class="el-item" label="全称:">
              <el-input v-model="input" placeholder="请录入全称" size="mini" class="date_input"></el-input>
            </el-form-item>
            <el-form-item class="el-item" label="简称:">
              <el-input v-model="input" placeholder="请录入简称" size="mini" class="date_input"></el-input>
            </el-form-item>
            <el-form-item class="el-item" label="助记码:">
              <el-input v-model="input" placeholder="请输入助记码" size="mini" class="date_input"></el-input>
            </el-form-item>
            <el-form-item class="el-item" label="纳税人识别号:">
              <el-input v-model="input" placeholder="请录入纳税人识别号" size="mini" class="date_input2"></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item class="el-item" label="联系人:">
              <el-input v-model="input" placeholder="请录入全称" size="mini" class="date_input"></el-input>
            </el-form-item>
            <el-form-item class="el-item" label="身份证号:">
              <el-input v-model="input" placeholder="请录入身份证" size="mini" class="date_input"></el-input>
            </el-form-item>
            <el-form-item class="el-item" label="固定电话:">
              <el-input v-model="input" placeholder="固定号码" size="mini" class="date_input"></el-input>
            </el-form-item>
            <el-form-item class="el-item" label="手机号码:">
              <el-input v-model="input" placeholder="请录入手机号码" size="mini" class="date_input2"></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item class="el-item" label="国家:">
              <el-select v-model="value" placeholder="请选择" size="mini" class="date_input">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="el-item" label="城市:">
              <el-select v-model="value" placeholder="请选择" size="mini" class="date_input">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="el-item" label="详细地址:">
              <el-input v-model="input" placeholder="请录入详细地址" size="mini" class="date_input5"></el-input>
            </el-form-item>
            <el-form-item class="el-item" label="E-mail:">
              <el-input v-model="input" placeholder="请录入E-mail地址" size="mini" class="date_input2"></el-input>
            </el-form-item>
          </el-row>
        </div>
        <el-row class="cont_bottom_b cont_top">
          <el-form-item class="el-item" label="客户标志:">
            <el-radio-group class="el-item" v-model="radio">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="2">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item class="el-item" label="供应商标志：">
            <el-radio-group class="el-item" v-model="radio">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="2">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item class="el-item" label="结算单位标志：">
            <el-radio-group class="el-item" v-model="radio">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="2">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item class="el-item" label="结算公司：">
            <el-radio-group class="el-item" v-model="radio">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="2">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <el-row class="cont_bottom_b">
          <div class="flex">
            <span class="flex_1">物流角色勾选：</span>
          </div>
          <el-row class="cont_top">
            <el-checkbox class="el-item" v-model="checked">委托人</el-checkbox>
            <el-checkbox class="el-item" v-model="checked">船/铁路公司</el-checkbox>
            <el-checkbox class="el-item" v-model="checked">订舱公司</el-checkbox>
            <el-checkbox class="el-item" v-model="checked">换单公司</el-checkbox>
            <el-checkbox class="el-item" v-model="checked">货代公司</el-checkbox>
            <el-checkbox class="el-item" v-model="checked">车队公司</el-checkbox>
            <el-checkbox class="el-item" v-model="checked">保险公司</el-checkbox>
            <el-checkbox class="el-item" v-model="checked">仓储公司</el-checkbox>
          </el-row>
          <el-row class="cont_top">
            <el-checkbox class="el-item" v-model="checked">开证公司</el-checkbox>
            <el-checkbox class="el-item" v-model="checked">装箱公司</el-checkbox>
            <el-checkbox class="el-item" v-model="checked">还箱公司</el-checkbox>
            <el-checkbox class="el-item" v-model="checked">检测公司</el-checkbox>
            <el-checkbox class="el-item" v-model="checked">消毒公司</el-checkbox>
            <el-checkbox class="el-item" v-model="checked">熏蒸公司</el-checkbox>
            <el-checkbox class="el-item" v-model="checked">理货公司</el-checkbox>
            <el-checkbox class="el-item" v-model="checked">装卸公司</el-checkbox>
            <el-checkbox class="el-item" v-model="checked">其它公司</el-checkbox>
          </el-row>
        </el-row>
        <el-row class="cont_flex">
          <div class="left bank">
            <el-row>
              <el-form-item class="el-item" label="开户行:">
                <el-select v-model="value" placeholder="请选择" size="mini" class="date_input">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-button size="mini" class="add-bank bankBtn">添加</el-button>
                <el-button size="mini" class="bankBtn">删除</el-button>
              </el-form-item>
            </el-row>
            <el-row class="bankAccount">
              <el-form-item class="el-item" label="银行账号:">
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
          </div>
          <div class="left">
            <el-row>
              <el-form-item class="el-item" label="预计收款日:">
                <el-input v-model="input" placeholder="请录入信控金额" size="mini" class="date_input"></el-input>
              </el-form-item>
            </el-row>

            <el-row>
              <el-form-item class="el-item" label="预计付款日:">
                <el-input v-model="input" placeholder="请录银行卡账号" size="mini" class="date_input"></el-input>
              </el-form-item>
            </el-row>
          </div>
          <div class="left">
            <el-row>
              <el-form-item class="el-item" label="信控金额:">
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
            <el-row>
              <el-form-item class="el-item" label="信控宽限天数:">
                <el-input v-model="input" placeholder="请录入宽限天数" size="mini" class="date_input"></el-input>
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
                <el-input v-model="input" placeholder="请输入内容" size="mini" class="date_input"></el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="创建时间：">2019-6-17</el-form-item>
            </el-row>
          </div>
          <div class="left">
            <el-row>
              <el-form-item class="cont_block" label="修改人:">
                <el-input v-model="input" placeholder="请输入内容" size="mini" class="date_input"></el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="修改时间：">2019-6-17</el-form-item>
            </el-row>
          </div>
          <div class="left">
            <el-row>
              <el-form-item class="cont_block" label="审核人:">
                <el-input v-model="input" placeholder="请输入内容" size="mini" class="date_input"></el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="审核时间：">2019-6-17</el-form-item>
            </el-row>
          </div>
        </div>
      </el-row>
    </el-form>
    <div class="box cont_top">
      <p class="relations">客户供应商 / 业务板块类型关系 :</p>
      <el-row>
        <el-button type="primary" size="mini" plain>新增</el-button>
        <el-button type="primary" size="mini" plain>复制</el-button>
        <el-button type="primary" size="mini" plain>保存</el-button>
        <el-button type="danger" size="mini" plain>删除</el-button>
      </el-row>
    </div>
    <template>
      <el-table
        :data="tableData"
        border
        size="mini"
        :header-cell-style="{background:'#e0f4ff',color:'#000'}"
        style="width: 1037px;"
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
      <el-dialog
        :title="供应商与业务板块类型关系"
        :visible.sync="innerVisibleSon"
        width="70%"
        :append-to-body="true"
        :modal="true"
        :before-close="handleDialogCloseSon"
      >
        <el-table
          :data="PortDataSon"
          :header-cell-style="{background:'#e0f4ff',color:'#000'}"
          border
          size="mini"
          class="PortDataSon"
          style="margin-bottom:10px;"
        >
          <el-table-column align="center" prop="id" label="操作" width="80">
            <template slot-scope="scope">
              <i class="fa fa-plus" aria-hidden="true" @click="PortDataSonCopy(scope.row.id)"></i>
              <i class="fa fa-trash" aria-hidden="true" @click="PortDataSonDelete(scope.row.id)"></i>
            </template>
          </el-table-column>
          <el-table-column align="center" type="index" label="序号" width="80"></el-table-column>
          <el-table-column align="center" prop="segment_business_id" label="业务板块">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.segment_business_id"
                @change="businessModuleChange(scope.row.segment_business_id,scope.row.id)"
                placeholder="请选择"
                class="selectInTable"
              >
                <el-option
                  v-for="item in businessModule"
                  :label="item.name"
                  :key="item.id"
                  :value="item.id"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="master_business_id" label="主业务类型">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.master_business_id"
                @change="MBusinessClassChange(scope.row.master_business_id,scope.row.id)"
                placeholder="请选择"
                class="selectInTable"
              >
                <el-option
                  v-for="item in PortDataSon[scope.$index].master_business_list"
                  :label="item.name"
                  :key="item.id"
                  :value="item.id"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="slaver_business_id" label="子业务类型">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.slaver_business_id"
                placeholder="请选择"
                class="selectInTable"
              >
                <el-option
                  v-for="item in PortDataSon[scope.$index].slaver_business_list"
                  :label="item.name"
                  :key="item.id"
                  :value="item.id"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleDialogCloseSon" size="small">取 消</el-button>
          <el-button type="primary" @click="handleDialogCommitSon" size="small">确 定</el-button>
        </span>
      </el-dialog>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [{ test: 1 },{ test: 1 }, { test: 1 }],
      options: [
        {
          value: "选项1",
          label: "外贸业务"
        },
        {
          value: "选项2",
          label: "内贸业务"
        }
      ],
      value: "",
      customerNumber: 0
    };
  },
  methods: {
     //新增按钮新增框
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
  margin-bottom: 10px;
}
.bank {
  border: 1px solid rgb(218, 210, 210);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  width: 410px !important;
  padding: 10px;
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
</style>>
