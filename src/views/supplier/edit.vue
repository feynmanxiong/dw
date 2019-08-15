<template>
  <div class="edit">
    <el-form :inline="true" :model="params" label-position="right" label-width="110px">
      <el-row class="cont_button">
        <div class="cont_border cont_top cont_bm">
          <el-button type="success" size="mini">新增</el-button>
          <el-button type="success" size="mini">复制</el-button>
          <el-button type="success" size="mini">保存</el-button>
          <el-button type="danger" size="mini">删除</el-button>
          <el-button type="success" size="mini">审核</el-button>
          <el-button type="warning" size="mini">取消审核</el-button>
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
          <div class="left">
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
              </el-form-item>
            </el-row>
            <el-row>
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
        <div >
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
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.edit {
  padding: 20px;
}
.cont_flex .left {
  width: 300px;
  float: left;
}
.left{
    width: 300px;
  float: left;
}
</style>>
