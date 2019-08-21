<template>
    <div class="box">
        <div class="buttonList">
            <el-button size="mini" plain  type="primary" >保存</el-button>
            <el-button size="mini" plain  type="primary" >合同预览</el-button>
            <el-button size="mini" plain  type="primary" >提交</el-button>
            <el-button size="mini" plain  type="primary" >短信呼</el-button>
            <el-button size="mini" plain  type="primary" >打印审评记录</el-button>
            <el-button size="mini" plain  type="primary" >启用</el-button>
            <el-button size="mini" plain  type="danger" >禁用</el-button>
        </div>
        <div class="registrationInformation" style="margin-top:10px;padding-bottom:10px;margin-bottom:10px;">
            <div class="STableTitle">合同审批进度</div>
            <el-steps :active="active"  class="steps" align-center finish-status="success">
                <el-step title="合同草拟" description="2019-09-19"></el-step>
                <el-step title="商务会签" description="2019-09-19"></el-step>
                <el-step title="业务会签" description="2019-09-19"></el-step>
                <el-step title="领导审评" description="2019-09-19"></el-step>
                <el-step title="合同归档" description="2019-09-19"></el-step>
            </el-steps>
        </div>
        <div class="registrationInformation">
            <div class="STableTitle">登记信息</div>
            <el-form ref="registrationInformation" class="registrationInformation clearfix" :rules="rules" :model="registrationInformation"  label-width="100%"  size="small">
                <div class="dialogFormItem">
                    <el-form-item label="合同名称" prop="name">
                        <el-input v-model="registrationInformation.name"></el-input>
                    </el-form-item>
                </div>
                <div class="dialogFormItem">
                    <el-form-item label="对方合同号">
                        <el-input v-model="registrationInformation.otherContractNumber"></el-input>
                    </el-form-item>
                </div>
                <div class="dialogFormItem">
                    <el-form-item label="结算公司" prop="clear_company_id">
                        <el-input v-model="registrationInformation.clear_company_id"></el-input>
                    </el-form-item>
                </div>
                <div class="dialogFormItem">
                    <el-form-item label="上传合同附件">
                        <el-upload
                            style="display:inline-block"
                            :limit="1"
                            class="upload-demo"
                            ref="upload"
                            accept=".xls,.xlsx"
                            action="/hqx/knowledge/importKnowledge"
                            :file-list="fileList"
                            :http-request="uploadSectionFile"
                            :auto-upload="false">
                        <el-button slot="trigger" size="small" type="primary" plain>选取文件</el-button>
                        </el-upload>
                    </el-form-item>
                </div>
                <div class="dialogFormItem">
                    <el-form-item label="合同类型" prop="contractType">
                        <el-select v-model="registrationInformation.contractType" placeholder="请选择" class="selectInTable">
                            <el-option v-for="item in contractType" :label="item.name" :key="item.id" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </div>
                    <div class="dialogFormItem dialogFormItemList" v-if="registrationInformation.contractType==1">
                    <el-form-item label="客户及结算信息">
                        <div class="itemBox">
                            <el-form ref="customerList" class="coustomerList clearfix"  label-width="100%"  size="small">
                                <el-form-item v-for="mess in registrationInformation.customerList" :key="mess.id">
                                    <label class="el-form-item__label">客户名称</label>
                                    <el-select v-model="mess.id" placeholder="请选择" class="selectInTable" :key="mess.id">
                                        <el-option v-for="item in customerList" :label="item.name" :key="item.id" :value="item.id"></el-option>
                                    </el-select>
                                    <label class="el-form-item__label" style="margin-left:20px;">结算单位</label>
                                    <el-select v-model="mess.settlementUnit" placeholder="请选择" class="selectInTable">
                                        <el-option :label="'是'" :value="1"></el-option>
                                        <el-option :label="'否'" :value="0"></el-option>
                                    </el-select>
                                    <i class="fa fa-plus" title="添加" aria-hidden="true" @click="customerListAdd"></i>
                                    <i class="fa fa-trash" title="删除" aria-hidden="true" @click="customerListDelete(mess.id)"></i>
                                </el-form-item>
                            </el-form>
                        </div>
                    </el-form-item>
                </div>
                <div class="dialogFormItem dialogFormItemList" v-if="registrationInformation.contractType==2">
                    <el-form-item label="供应商及结算信息">
                        <div class="itemBox">
                            <el-form ref="customerList" class="coustomerList clearfix"  label-width="100%"  size="small">
                                <el-form-item v-for="mess in registrationInformation.supplierList" :key="mess.id">
                                    <label class="el-form-item__label">供应商名称</label>
                                    <el-select v-model="mess.id" placeholder="请选择" class="selectInTable" :key="mess.id">
                                        <el-option v-for="item in supplierList" :label="item.name" :key="item.id" :value="item.id"></el-option>
                                    </el-select>
                                    <label class="el-form-item__label" style="margin-left:20px;">结算单位</label>
                                    <el-select v-model="mess.settlementUnit" placeholder="请选择" class="selectInTable">
                                        <el-option :label="'是'" :value="1"></el-option>
                                        <el-option :label="'否'" :value="0"></el-option>
                                    </el-select>
                                    <i class="fa fa-plus" title="添加" aria-hidden="true" @click="supplierListAdd"></i>
                                    <i class="fa fa-trash" title="删除" aria-hidden="true" @click="supplierListDelete(mess.id)"></i>
                                </el-form-item>
                            </el-form>
                        </div>
                    </el-form-item>
                </div>
            </el-form>
        </div>
        <div class="controlInformation">
            <div class="STableTitle">信控协议</div>
            <el-form ref="controlInformation" class="registrationInformation clearfix" :rules="controlRules" :model="controlInformation"  label-width="100%"  size="small">
                <div class="dialogFormItem">
                    <el-form-item label="合同名称" prop="contract">
                        <el-input v-model="controlInformation.contract"></el-input>
                    </el-form-item>
                </div>
                <div class="dialogFormItem">
                    <el-form-item label="合同生效日" prop="contractStart">
                        <el-date-picker type="date" v-model="controlInformation.contractStart" placeholder="申请开始时间" size="mini" class="date_input"> </el-date-picker>
                    </el-form-item>
                </div>
                <div class="dialogFormItem">
                    <el-form-item label="合同失效日" prop="contractInvalid">
                        <el-date-picker type="date" v-model="controlInformation.contractInvalid" placeholder="申请开始时间" size="mini" class="date_input"> </el-date-picker>
                    </el-form-item>
                </div>
                <div class="dialogFormItem">
                    <el-form-item label="信控基准日" prop="controlDate">
                        <el-select v-model="controlInformation.controlDate" placeholder="请选择" class="selectInTable">
                            <el-option v-for="item in controlDateList" :label="item.name" :key="item.id" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div class="dialogFormItem dialogFormItem_form_radio">
                    <el-form-item label="" class="form_radio_box">
                        <el-radio-group v-model="controlInformation.controlType">
                            <el-radio :label="3" class="form_radio">
                                <span>延后月份:</span>
                                <el-select placeholder="请选择" v-model="controlInformation.controlTA.mouth" class="selectInTable" style="margin-right:10px;">
                                    <el-option label="次月" :value="1"></el-option>
                                    <el-option label="次月月底" :value="2"></el-option>
                                    <el-option label="次月月" :value="3"></el-option>
                                    <el-option label="次月月月底" :value="4"></el-option>
                                </el-select>
                                <span>延后月份结算日:</span>
                                <el-input-number v-model="controlInformation.controlTA.date" :min="1"  class="selectInTable"></el-input-number>
                            </el-radio>
                            <el-radio :label="6" class="form_radio">
                                <span>延后自然日数:</span>
                                <el-input-number v-model="controlInformation.controlTBTime" :min="1" class="selectInTable"></el-input-number>
                            </el-radio>
                            <el-radio :label="9" class="form_radio">
                                <span>延后工作日数:</span>
                                <el-input-number v-model="controlInformation.controlTCTime" :min="1" class="selectInTable"></el-input-number>
                            </el-radio>
                        </el-radio-group>
                    </el-form-item>
                </div>
                <div class="dialogFormItem dialogFormItemList">
                    <el-form-item label="合同/业务板块类型/价格协议关系">
                        <div class="itemBox">
                            <el-table :data="PortDataSon" :header-cell-style="{background:'#e0f4ff',color:'#000'}" border size="mini" class="PortDataSon"  style="margin-bottom:10px;">
                                <el-table-column align="center" prop="id" label="操作" width="80">
                                    <template slot-scope="scope">
                                        <i class="fa fa-plus" aria-hidden="true" @click="PortDataSonCopy(scope.row.id)"></i>
                                        <i class="fa fa-trash" aria-hidden="true" @click="PortDataSonDelete(scope.row.id)"></i>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" type="index" label="序号" width="80"></el-table-column>
                                <el-table-column align="center" prop="segment_business_id" label="业务板块">
                                    <template slot-scope="scope">
                                        <el-select v-model="scope.row.segment_business_id" @change="businessModuleChange(scope.row.segment_business_id,scope.row.id)"  placeholder="请选择" class="selectInTable">
                                            <el-option v-for="item in businessModule" :label="item.name" :key="item.id" :value="item.id"></el-option>
                                        </el-select>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" prop="master_business_id" label="主业务类型">
                                    <template slot-scope="scope">
                                        <el-select v-model="scope.row.master_business_id" @change="MBusinessClassChange(scope.row.master_business_id,scope.row.id)" placeholder="请选择" class="selectInTable">
                                            <el-option v-for="item in PortDataSon[scope.$index].master_business_list" :label="item.name" :key="item.id" :value="item.id"></el-option>
                                        </el-select>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" prop="slaver_business_id" label="子业务类型">
                                    <template slot-scope="scope"> 
                                        <el-select v-model="scope.row.slaver_business_id" placeholder="请选择" class="selectInTable">
                                            <el-option v-for="item in PortDataSon[scope.$index].slaver_business_list" :label="item.name" :key="item.id" :value="item.id"></el-option>
                                        </el-select>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-form-item>
                </div>
            </el-form>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                id:null,
                PortDataSon:[],
                fileList:"",
                uploadSectionFile:"",
                customernew:1,//客户及结算信息新增下标
                suppliernew:1,//客户及结算信息新增下标
                active:2,//步骤条,
                registrationInformation:{//登记信息数据
                    name:"编号001",//合同名称
                    clear_company_id:"结算公司",//结算公司id
                    otherContractNumber:"",//对方合同号
                    contractType:null,//合同类型,
                    customerList:[ //客户列表
                        {id:1,name:"客户1",settlementUnit:1},
                        {id:2,name:"客户2",settlementUnit:1}
                    ],
                    supplierList:[ //供应商列表
                        {id:1,name:"供应商1",settlementUnit:1},
                        {id:2,name:"供应商2",settlementUnit:0}
                    ]
                },
                controlInformation:{//信控协议
                    contract:"",//合同编号
                    contractStart:"",//合同生效日
                    contractInvalid:"",//合同失效日
                    controlDate:"",//信控基准日
                    controlType:null,//延后方式
                    controlTime:"",//延后时间
                    controlTA:{//延后方式月份
                        mouth:null,//月数
                        date:null//日数
                    },
                    controlTBTime:null,//延后方式自然日
                    controlTCTime:null,//延后方式工作日
                    controlTable:null//合同/业务板块类型/价格协议关系
                },
                controlDateList:[//信控基准日列表
                    {id:1,name:"业务日期"},
                    {id:2,name:"开票日期"},
                    {id:3,name:"到港日期"}
                ],
                customerList:[//客户及结算信息列表
                    {id:1,name:"客户1"},
                    {id:2,name:"客户2"},
                    {id:3,name:"客户3"},
                    {id:4,name:"客户4"},
                    {id:5,name:"客户5"}
                ],
                supplierList:[//客户及结算信息列表
                    {id:1,name:"供应商1"},
                    {id:2,name:"供应商2"},
                    {id:3,name:"供应商3"},
                    {id:4,name:"供应商4"},
                    {id:5,name:"供应商5"}
                ],
                contractType:[//合同类型
                    {id:1,name:"客户合同"},
                    {id:2,name:"供应商合同"}
                ],
                controlRules:{
                    contract: [
						{ required: true, message: '请输入合同名称', trigger: 'blur' },
					],
					contractStart: [
						{required: true, message: '请输入结算公司', trigger: 'blur'  }
                    ],
                    contractInvalid:[
                        {required: true, message: '请选择合同类型', trigger: 'blur'  }
                    ],
                    controlDate:[
                        {required: true, message: '请选择合同类型', trigger: 'blur'  }
                    ]
                },
                rules: {
					name: [
						{ required: true, message: '请输入合同名称', trigger: 'blur' },
					],
					clear_company_id: [
						{required: true, message: '请输入结算公司', trigger: 'blur'  }
                    ],
                    contractType:[
                        {required: true, message: '请选择合同类型', trigger: 'blur'  }
                    ]
				},
                tableData://列表数据
					{
                        id:"1",
                        sn:"编号001",//合同编号
                        type:"customer",//合同类型customer:客户合同、supplier:供应商合同
                        name:"编号001",//合同名称
                        clear_company_id:"结算公司",//结算公司id
                        process1_status:"合同草拟",//办理步骤
                        inner_sn:"1",//合同序号
                        segment_business_id:"1",//业务板块
                        master_business_id:"1",//主业务类型
                        slaver_business_id:"1",//子业务类型
                        process0_user_id:"1",//申请人Id
                        process0_time:"2019-09-19",//申请人时间
                        process1_user_id:"1",//商务会签人id
                        process1_time:"2019-09-19",//商务会签人时间
                        process2_user_id:"1",//业务会签人id
                        process2_time:"2019-09-19",//业务会签时间
                        process3_user_id:"1",//审批人id
                        process3_time:"2019-09-19",//审批会签时间
                        process4_user_id:"1",//归档人id
                        process4_time:"2019-09-19",//归档时间
                        processingSteps:"办理步骤",//办理步骤
                        processingStatus:"办理状态",//办理状态
                        processingResult:"办理结果",//办理结果
                        customer:"客户",//客户
                        supplier:"供应商",//供应商
                        priceCartel:"1",//价格协议编号
                        contractEffective:"2019-09-19",//合同生效日
                        contractFailure:"2019-09-19",//合同失效日
                        contractStatus:"启用",//合同状态
                    },
			}
        },
        
		methods:{
            //供应商及结算信息增加
            supplierListAdd(){
                this.registrationInformation.supplierList.push({id:'new'+this.suppliernew,name:' ',settlementUnit:null})
                this.suppliernew++;
            },
            //供应商及结算信息删除
            supplierListDelete(id){
                this.$confirm("是否确定删除？", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消"
				})
				.then(() => {
					this.registrationInformation.supplierList.forEach((item,index)=>{
                        if(item.id==id){
                            this.registrationInformation.supplierList.splice(index,1)
                        }
                    })
				}).catch(()=>{})
            },
            //客户及结算信息增加
            customerListAdd(){
                this.registrationInformation.customerList.push({id:'new'+this.customernew,name:' ',settlementUnit:null})
                this.customernew++;
            },
            //客户及结算信息删除
            customerListDelete(id){
                this.$confirm("是否确定删除？", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消"
				})
				.then(() => {
					this.registrationInformation.customerList.forEach((item,index)=>{
                        if(item.id==id){
                            this.registrationInformation.customerList.splice(index,1)
                        }
                    })
				}).catch(()=>{})
            },
            //dislog是否展示
			showAndHideDialog(){
				this.dialogVisible=!this.dialogVisible;
			}
        },
        created(){
            if(this.$store.state.id!=null){
                this.id=this.$store.state.id;
                this.$store.dispatch("changeFunc",null)
            }
        }
    }
</script>
<style scoped>
    .steps{margin-top:10px;margin-bottom:20px;}
    .registrationInformation{background-color: white;padding:0 20px;}
    .dialogFormItemList{width:100%;}
    .itemBox{width:100%;}
    .fa-plus{margin-left:20px;}
    .fa-trash{position: relative;top:-1px;}
    .controlInformation{background-color: white;padding:0 20px;margin-top:10px;}
    .buttonList{margin-top:20px;padding:0 30px;}
</style>