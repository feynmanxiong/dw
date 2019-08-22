
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
              <el-button type="info" plain size="mini" @click="reset">重置</el-button>
              <el-button type="success" plain size="mini" @click="selectSearch">查询</el-button>
            </div>
          </el-row>
          <el-row>
            <input type="text" autocomplete="off" placeholder="请输入内容" class="el-input__inner"  v-model="getKeyList.search"/>
          </el-row>
          <el-row>
            <span class="span">审核状态</span>
            <el-select v-model="getKeyList.is_lock" placeholder="请选择" size="mini" class="date_box"  clearable>
              <el-option :label="'已审核'" :value="1"></el-option>
              <el-option :label="'未审核'" :value="0"></el-option>
            </el-select>
          </el-row>
          <el-row>
            <span class="span">物流角色</span>
            <el-select v-model="getKeyList.logistics_role" placeholder="请选择" size="mini" class="date_box" clearable>
              <el-option
                v-for="item in logistecsList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-row>
          <el-row>
            <span class="span">客户标志</span>
            <el-select v-model="getKeyList.is_customer" placeholder="请选择" size="mini" class="date_box" clearable>
              <el-option :label="'是'" :value="1"></el-option>
              <el-option :label="'否'" :value="0"></el-option>
            </el-select>
          </el-row>
          <el-row>
            <span class="span">供应商标志</span>
            <el-select v-model="getKeyList.is_supplier" placeholder="请选择" size="mini" class="date_box" clearable>
             <el-option :label="'是'" :value="1"></el-option>
              <el-option :label="'否'" :value="0"></el-option>
            </el-select>
          </el-row>
          <el-row>
            <span class="span">结算单位标志</span>
            <el-select v-model="getKeyList.is_invoice" placeholder="请选择" size="mini" class="date_box" clearable>
             <el-option :label="'是'" :value="1"></el-option>
              <el-option :label="'否'" :value="0"></el-option>
            </el-select>
          </el-row>
          <el-row>
            <span class="span">业务板块</span>
            <!-- <el-select v-model="getKeyList.segment_business_id" filterable placeholder="请选择" size="mini" class="date_box" clearable>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select> -->
            <el-select @change="bussinessMouble" v-model="getKeyList.segment_business_id" placeholder="请选择" size="mini" class="date_box">
								<el-option v-for="item in businessModule" :key="item.id" :label="item.name" :value="item.id"> </el-option>
							</el-select>
          </el-row>
          <el-row>
            <span class="span">主业务类型</span>
            <!-- <el-select v-model="getKeyList.master_business_id" filterable placeholder="请选择" size="mini" class="date_box" clearable>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select> -->
            <el-select @change="MBussinessClassFunc" v-model="getKeyList.master_business_id" placeholder="请选择" size="mini" class="date_box">
								<el-option v-for="item in MBusinessClass" :key="item.id" :label="item.name" :value="item.id"> </el-option>
							</el-select>
          </el-row>
          <el-row>
            <span class="span">子业务类型</span>
            <!-- <el-select v-model="getKeyList.slaver_business_id" placeholder="请选择" size="mini" class="date_box" clearable>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select> -->
            <el-select v-model="getKeyList.slaver_business_id" placeholder="请选择" size="mini" class="date_box">
								<el-option v-for="item in SBusinessClass" :key="item.id" :label="item.name" :value="item.id"> </el-option>
							</el-select>
          </el-row>
          <el-row>
            <span class="span">创建人</span>
            <el-select v-model="getKeyList.created_user_id" placeholder="请选择" size="mini" class="date_box" clearable>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-row>
          <el-row>
            <span class="span">修改人</span>
            <el-select v-model="getKeyList.updated_user_id" placeholder="请选择" size="mini" class="date_box" clearable>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-row>
          <el-row>
            <span class="span">审核人</span>
            <el-select v-model="getKeyList.lock_user_id" placeholder="请选择" size="mini" class="date_box" clearable>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-row>
        </el-aside>
      </transition>
      <el-main>
        <el-row class="cont_block">
          <el-button type="danger" plain size="mini" @click="mulSelectedDelete">删除</el-button>
          <el-button type="primary" plain size="mini" @click="mulSelectedCheck">审核</el-button>
          <el-button type="danger" plain size="mini" @click="mulSelectedCheckCancel">取消审核</el-button>
        </el-row>
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
            <el-table-column type="selection" align="center" width="55" prop="price_id"></el-table-column>
            <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
            <el-table-column align="center" type="index" label="操作" prop="id" width="80">
              <template slot-scope="scope">
                <i class="fa fa-edit" aria-hidden="true" @click.stop="handleEdit(scope.$index, scope.row)"></i>
                <i class="fa fa-trash" aria-hidden="true" @click.stop="handleDelete(scope.$index, scope.row)"></i>
              </template>
            </el-table-column>
            <el-table-column prop="is_lock_alias" label="审核状态" align="center"></el-table-column>
            <el-table-column prop="name" label="全称" align="center"></el-table-column>
            <el-table-column prop="name_abbreviation" label="简称" align="center"></el-table-column>
            <el-table-column prop="name_code" label="助记码" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="tax_identification_number" label="纳税人识别号" align="center"></el-table-column>
            <el-table-column prop="role" label="物流角色" align="center"></el-table-column>
            <el-table-column prop="is_customer_alias" label="客户标志" align="center"></el-table-column>
            <el-table-column prop="is_supplier_alias" label="供应商标志" align="center"></el-table-column>
            <el-table-column prop="is_invoice_alias" label="结算单位标志" align="center"></el-table-column>
            <el-table-column prop="master_business_name" label="业务板块" align="center"></el-table-column>
            <el-table-column prop="segment_business_name" label="主业务类型" align="center"></el-table-column>
            <el-table-column prop="slaver_business_name" label="子业务类型" align="center"></el-table-column>
            <el-table-column prop="created_user_name" label="创建人" align="center"></el-table-column>
            <el-table-column prop="created_time" label="创建时间" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="updated_user_name" label="修改人" align="center"></el-table-column>
            <el-table-column prop="updated_time" label="修改时间" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="lock_user_name" label="审核人" align="center"></el-table-column>
            <el-table-column prop="lock_time" label="审核时间" align="center" show-overflow-tooltip></el-table-column>
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
      //是否展示侧边栏
      isShowAside: true,
  
      //获取查询关键字列表
      getKeyList: {
        page: 1, //第几页，默认第一页
        per_page: 10, //每页记录数，默认是10
        // search: "", //模糊搜索
        is_lock: "", //状态0:未审核，1:已审核
        search:"",
        logistics_role: "", //物流角色
        is_customer: "", //客户角色
        is_supplier: "", //供应商角色
        is_invoice: "", //结算单位标志
        segment_business_id: "", //主业务板块
        master_business_id: "", //主业务类型
        slaver_business_id: "", //子业务类型
        created_user_id: "", //创建人
        updated_user_id: "", //修改人
        lock_user_id: "", //审核人
      },

      //列表数据
      tableData: [],

      //选中列表行数据
      selectedData: [],

      //多选数据
      multipleSelection: [],

      //业务模块
      businessModule: [],

      //主业务
      MBusinessClass: [],
      
      //子业务
      SBusinessClass: [],

      //分页
      total: 0,
      currentPage: 1,
      pageSize: 10,

      //新增编辑框数量
      customerNumber: 0
    };
  },
  computed: {},
  created() {
  },
  mounted() {
    this.businessModule = this.$store.state.businessModule;
    this.getCustomerList();
     
  },
  methods: {
    //获取列表数据  
    getCustomerList(){
      this.$postFunc("customerSuppliers/list",{}, (response)=>{
        this.tableData = response.data.data.result;
        this.total = this.tableData.length; 
        console.log(this.tableData);
      }, function(){}); 
    },
    //查询
    selectSearch() {
      this.$postFunc("customerSuppliers/list",this.getKeyList, (response)=>{
        this.tableData = response.data.data.result;
        this.total = this.tableData.length; 
        console.log(this.tableData);
      }, function(){}); 
    },
    //重置
    reset(){
      this.getKeyList = {
        page: 1, //第几页，默认第一页
        per_page: 10, //每页记录数，默认是10
        // search: "", //模糊搜索
        is_lock: "", //状态0:未审核，1:已审核
        search:"",
        logistics_role: "", //物流角色
        is_customer: "", //客户角色
        is_supplier: "", //供应商角色
        is_invoice: "", //结算单位标志
        segment_business_id: "", //主业务板块
        master_business_id: "", //主业务类型
        slaver_business_id: "", //子业务类型
        created_user_id: "", //创建人
        updated_user_id: "", //修改人
        lock_user_id: "", //审核人
      };
      this.getCustomerList();
    },

    //业务板块change事件
			bussinessMouble(){
				this.$getBusinessModule(this.getKeyList.segment_business_id).then(item=>{
					this.MBusinessClass=item;
				});
      },
      
      //主业务类型change事件
			MBussinessClassFunc(){
				this.$getBusinessModule(this.getKeyList.master_business_id).then(item=>{
					this.SBusinessClass=item;
				});
			},
    //删除图标
    handleDelete(index, row) {
      this.$confirm("是否确定删除？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          console.log(row);
          this.$postFunc("customerSuppliers/destroy",{ids: row.id},(response)=>{
            console.log(response);
            this.getCustomerList();
          },()=>{})
          
        })
        .catch(() => {});
    },

    // //编辑按钮
    // dialogVisibleAddview() {
    //   this.$refs.addDialog.showAndHideDialog();
    // },
    //编辑按钮新增框
    dialogVisibleAddview() {
      var obj = new Object();
      if (this.customerNumber <= 0) {
        obj.title = "客户供应商编辑";
      } else {
        obj.title = "客户供应商编辑" + this.customerNumber;
      }
      this.customerNumber++;
      obj.content = "supplierCustomerEdit";
      this.$emit("clickSearch", obj);
    },
    //编辑图标
    handleEdit(index, row) {
      this.dialogVisibleAddview();
    },
    
    //多选
    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val;
    },
    //删除
    mulSelectedDelete() {
      this.$confirm("选定项是否确定删除？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          let idArray = [], str = '';
          this.multipleSelection.forEach((item)=>{
            idArray.push(item.id);            
          })
          str = idArray.join(',');
          console.log(str);
          this.$postFunc("customerSuppliers/destroy",{ids: str},(response)=>{
          console.log(response);
            this.getCustomerList();
          },()=>{})
        })
        .catch(() => {});
    },
    //审核
    mulSelectedCheck() {
      let lockArray = []
      this.multipleSelection.forEach(item => {
        item.status = "已审核";
      });
      
    },
    //批量取消审核
    mulSelectedCheckCancel() {
      this.multipleSelection.forEach(item => {
        item.status = "未审核";
      });
      this.$refs.multipleTable.clearSelection();
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