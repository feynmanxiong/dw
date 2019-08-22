<template>
  <div class="edit">
    <el-form
      :inline="true"
      :model="getKeysList"
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
                v-model="getKeysList.name"
                placeholder="请录入全称"
                size="mini"
                class="date_input"
              ></el-input>
            </el-form-item>
            <el-form-item class="el-item" label="简称:" prop="forshort">
              <el-input
                v-model="getKeysList.name_abbreviation"
                placeholder="请录入简称"
                size="mini"
                class="date_input"
              ></el-input>
            </el-form-item>
            <el-form-item class="el-item" label="助记码:" prop="mnemonic">
              <el-input
                v-model="getKeysList.name_code"
                placeholder="请输入助记码"
                size="mini"
                class="date_input"
              ></el-input>
            </el-form-item>
            <el-form-item class="el-item" label="纳税人识别号:">
              <el-input
                v-model="getKeysList.tax_identification_number"
                placeholder="请录入纳税人识别号"
                size="mini"
                class="date_input2"
              ></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item class="el-item" label="联系人:">
              <el-input
                v-model="getKeysList.contact"
                placeholder="请录入全称"
                size="mini"
                class="date_input"
              ></el-input>
            </el-form-item>
            <el-form-item class="el-item" label="身份证号:">
              <el-input
                v-model="getKeysList.id_card_number"
                placeholder="请录入身份证"
                size="mini"
                class="date_input"
              ></el-input>
            </el-form-item>
            <el-form-item class="el-item" label="固定电话:">
              <el-input
                v-model="getKeysList.tel_area_code"
                placeholder="区域号"
                size="mini"
                class="date_input"
                style="width: 70px;margin-right:5px;"
              ></el-input>
              <el-input v-model="getKeysList.tel" placeholder="固定号码" size="mini" class="date_input"></el-input>
            </el-form-item>
            <el-form-item class="el-item" label="手机号码:">
              <el-input
                v-model="getKeysList.mobile"
                placeholder="请录入手机号码"
                size="mini"
                class="date_input2"
              ></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item class="el-item" label="城市:">
              <el-select
                v-model="getKeysList.city_id"
                placeholder="请选择"
                size="mini"
                class="date_input"
              >
                <el-option :label="'苏州'" :value="0"></el-option>
                <el-option :label="'杭州'" :value="1"></el-option>
                <el-option :label="'上海'" :value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="el-item" label="国家:">
              <el-select
                v-model="getKeysList.country"
                placeholder="请选择"
                size="mini"
                class="date_input"
              >
                <el-option :label="'中国'" :value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="el-item" label="详细地址:">
              <el-input
                v-model="getKeysList.address"
                placeholder="请录入详细地址"
                size="mini"
                class="date_input5"
              ></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item class="el-item" label="E-mail:">
              <el-input
                v-model="getKeysList.email"
                placeholder="请录入E-mail地址"
                size="mini"
                class="date_input2"
              ></el-input>
            </el-form-item>
          </el-row>
        </div>
        <el-row class="cont_bottom_b cont_top">
          <el-form-item class="el-item" label="客户标志:">
            <el-radio-group class="el-item" v-model="getKeysList.is_customer">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item class="el-item" label="供应商标志：">
            <el-radio-group class="el-item" v-model="getKeysList.is_supplier">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item class="el-item" label="结算单位标志：">
            <el-radio-group class="el-item" v-model="getKeysList.is_invoice">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item class="el-item" label="结算公司：">
            <el-radio-group class="el-item" v-model="getKeysList.is_self">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <el-row class="cont_bottom_b logistic">
          <div class="flex">
            <span class="flex_1">物流角色勾选：</span>
          </div>
          <el-checkbox-group v-model="getKeysList.logistics_role">
            <el-row class="cont_top">
              <el-checkbox class="el-item" :label="1">委托人</el-checkbox>
              <el-checkbox class="el-item" :label="2">船/铁路公司</el-checkbox>
              <el-checkbox class="el-item" :label="3">订舱公司</el-checkbox>
              <el-checkbox class="el-item" :label="4">换单公司</el-checkbox>
              <el-checkbox class="el-item" :label="5">货代公司</el-checkbox>
              <el-checkbox class="el-item" :label="6">车队公司</el-checkbox>
              <el-checkbox class="el-item" :label="7">保险公司</el-checkbox>
              <el-checkbox class="el-item" :label="8">仓储公司</el-checkbox>
            </el-row>
            <el-row class="cont_top">
              <el-checkbox class="el-item" :label="9">开证公司</el-checkbox>
              <el-checkbox class="el-item" :label="10">装箱公司</el-checkbox>
              <el-checkbox class="el-item" :label="11">还箱公司</el-checkbox>
              <el-checkbox class="el-item" :label="12">检测公司</el-checkbox>
              <el-checkbox class="el-item" :label="13">消毒公司</el-checkbox>
              <el-checkbox class="el-item" :label="14">熏蒸公司</el-checkbox>
              <el-checkbox class="el-item" :label="15">理货公司</el-checkbox>
              <el-checkbox class="el-item" :label="16">装卸公司</el-checkbox>
              <el-checkbox class="el-item" :label="17">其它公司</el-checkbox>
            </el-row>
          </el-checkbox-group>
        </el-row>

        <el-row class="cont_flex logistic">
          <div class="left bank">
            <el-row v-for="(num, index) in bankNum" :key="num">
              <el-form-item label="开户行:">
                <el-input
                  v-model="bankNum[index].name"
                  placeholder="请录入银行账号"
                  size="mini"
                  class="date_input"
                ></el-input>
              </el-form-item>
              <el-form-item label="银行账号:">
                <el-input
                  v-model="bankNum[index].account"
                  placeholder="请录入银行账号"
                  size="mini"
                  class="date_input"
                ></el-input>
              </el-form-item>
              <el-form-item label="币别:">
                <el-select
                  v-model="bankNum[index].currency"
                  placeholder="请选择"
                  size="mini"
                  class="date_input"
                  style="width: 85px;"
                >
                  <el-option :label="'CNY'" :value="'CNY'"></el-option>
                  <el-option :label="'USD'" :value="'USD'"></el-option>
                </el-select>
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
                  v-model="getKeysList.pay_max_time"
                  placeholder="请选择"
                  size="mini"
                  class="date_input"
                >
                  <!-- <el-option
                    v-for="item in receive_options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>-->
                  <el-option :label="'15'" :value="15"></el-option>
                  <el-option :label="'30'" :value="30"></el-option>
                  <el-option :label="'45'" :value="45"></el-option>
                  <el-option :label="'60'" :value="60"></el-option>
                </el-select>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item class="el-item" label="预计付款日:">
                <el-select
                  v-model="getKeysList.receive_max_time"
                  placeholder="请选择"
                  size="mini"
                  class="date_input"
                >
                  <!-- <el-option
                    v-for="item in pay_options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>-->
                  <el-option :label="'15'" :value="15"></el-option>
                  <el-option :label="'30'" :value="30"></el-option>
                  <el-option :label="'45'" :value="45"></el-option>
                  <el-option :label="'60'" :value="60"></el-option>
                </el-select>
              </el-form-item>
            </el-row>
          </div>
          <div class="left">
            <el-row>
              <el-form-item class="el-item" label="信控金额:">
                <el-input
                  v-model="getKeysList.credit_max_money"
                  placeholder="请录入信控金额"
                  size="mini"
                  class="date_input"
                ></el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item class="el-item" label="信控宽限天数:">
                <el-input
                  v-model="getKeysList.credit_max_time"
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
                  v-model="getKeysList.createman"
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
                  v-model="getKeysList.modifyman"
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
                  v-model="getKeysList.checkman"
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
          :data="businessList"
          border
          size="mini"
          :header-cell-style="{background:'#e0f4ff',color:'#000'}"
          style="width: 1206px;"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" align="center" width="55"></el-table-column>
          <el-table-column align="center" type="index" label="序号" width="70"></el-table-column>
          <el-table-column align="center" prop="segment_business_name" label="业务模块" width="240">
            <template slot-scope="scope">
               <el-select @change="businessModuleChange(scope.row.segment_business_id,scope.row.id)" v-model="scope.row.segment_business_id" placeholder="请选择" size="mini" class="date_box">
								<el-option v-for="item in businessModule" :key="item.id" :label="item.name" :value="item.id"> </el-option>
							</el-select>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="master_business_name" label="主业务类型" width="240">
            <template slot-scope="scope">
             <el-select @change="MBusinessClassChange(scope.row.master_business_id,scope.row.id)" v-model="scope.row.master_business_id" placeholder="请选择" size="mini" class="date_box">
								<el-option v-for="item in businessList[scope.$index].master_business_list" :key="item.id" :label="item.name" :value="item.id"> </el-option>
							</el-select>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="slaver_business_name" label="子业务类型" width="240">
            <template slot-scope="scope">
               <el-select v-model="scope.row.slaver_business_id" placeholder="请选择" size="mini" class="date_box">
								<el-option v-for="item in businessList[scope.$index].slaver_business_list" :key="item.id" :label="item.name" :value="item.id"> </el-option>
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
// import store from '../../store';
export default {
  data() {
    return {
     
      pay_options: [
        { value: "1", label: 15 },
        { value: "2", label: 30 },
        { value: "3", label: 45 },
        { value: "4", label: 60 }
      ],
      receive_options: [
        { value: "1", label: 15 },
        { value: "2", label: 30 },
        { value: "3", label: 45 },
        { value: "4", label: 60 }
      ],

      multipleSelection: [],
      bankNum: [{ "bank": "", "bankcounter": "","currency": "" }],
      rules: {
        fullname: [{ required: true, message: "请输入全称", trigger: "blur" }],
        forshort: [{ required: true, message: "请输入简称", trigger: "blur" }],
        mnemonic: [{ required: true, message: "请输入助记符", trigger: "blur" }]
      },
      businessType: [],
      mainBusiness: [],
      segmentBusiness: [],
      businessType_value: "",
     

      getKeysList: {
        name: "",
        name_abbreviation: "",
        name_code: "",
        tax_identification_number: "",
        contact: "",
        id_card_number: "",
        tel_area_code: "",
        tel: "",
        mobile: "",
        city_id: 1,
        address: "",
        email: "",
        logistics_role: [],
        bank: [{"name": "","account":"", "currency": ""}],
        is_customer: 2,
        is_supplier: 2,
        is_invoice: 2,
        is_self: 2,
        is_lock: 0,
        pay_max_time: "",
        receive_max_time: "",
        credit_max_money: "",
        credit_max_time: ""
      },
      getKeysList_: {
        name: "xiong3",
        name_abbreviation: "x66",
        name_code: "AD",
        tax_identification_number: "4564",
        contact: "lisi",
        id_card_number: "211985",
        tel_area_code: '021',
        tel: 1456446,
        mobile: 145665446,
        city_id: 1,
        address: "shanghai",
        email: "aa@qq.com",
        logistics_role: "1,2,3,4",
        bank: [{"name": "中国银行","account":"888888", "currency": "CNY"}],
        is_customer: 0,
        is_supplier: 0,
        is_invoice: 0,
        is_self: 0,
        is_lock: 0,
        pay_max_time: 15,
        receive_max_time: 15,
        credit_max_money: 100,
        credit_max_time: 10
      },
      
      //业务模块
      businessModule: [],

      //主业务
      MBusinessClass: [],
      
      //子业务
      SBusinessClass: [],

      //
      businessList: [{
        segment_business_id: '',
        master_business_list: [],
        master_business_id: '',
        slaver_business_list: [],
        slaver_business_id: ''
      }]
    };
  },
  computed(){
   

  },
  methods: {
    //业务板块change事件
			bussinessMouble(){
				this.$getBusinessModule(this.businessList.segment_business_id).then(item=>{
					this.MBusinessClass=item;
				});
      },
      
      //主业务类型change事件
			MBussinessClassFunc(){
				this.$getBusinessModule(this.businessList.master_business_id).then(item=>{
					this.SBusinessClass=item;
				});
			},
    //选择或多选
    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val;
      console.log(this.businessList)
    },
    //业务模块新增BUTTON
    addBusiness() {
      this.businessList.push({
        segment_business_id: '',
        master_business_id: '',
        slaver_business_id: ''
      });
      console.log(this.businessList)
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
      // this.getKeysList.createman = localStorage.getItem(
      //   "dw_erp_user_name"
      // );
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
    //保存
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      console.log(this.getKeysList.logistics_role)
      var new_ = this.getKeysList.logistics_role.join(',');
      console.log(new_);
      this.getKeysList.logistics_role = new_;
  
      this.$postFunc(
        "customerSuppliers/update",
        
        this.getKeysList,
        function(response) {
          console.log("xiongwencheng");
          console.log(response);
        },
        function() {}
      );
      console.log(this.getKeysList);
    },
      //主业务类型列表change事件
        businessModuleChange(id,listid){
            var _this=this;
            _this.$getBusinessModule(id).then((item)=>{
                _this.businessList.forEach((each,index)=>{
                    if(each.id==listid){
                        _this.businessList[index].master_business_list=item;
                    }
                })
            })
        },
        //子业务板块列表change事件
        MBusinessClassChange(id,listid){
            var _this=this;
            _this.$getBusinessModule(id).then((item)=>{
                _this.businessList.forEach((each,index)=>{
                    if(each.id==listid){
                        _this.businessList[index].slaver_business_list=item;
                    }
                })
            })
        }
  },
  mounted() {
    this.getUserName();
    this.businessModule = this.$store.state.businessModule;

  
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
  width: 840px !important;
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
  margin-bottom: 150px;
}
.time_left {
  margin-left: 20px;
}
</style>>
