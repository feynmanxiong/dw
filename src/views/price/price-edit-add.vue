<template>
  <div>
    <el-dialog title :visible.sync="dialogVisible" fullscreen :modal="true" :append-to-body="true">
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
          </el-form>
        </div>
        <div class="priceRule">
          收费规则
          <el-row>
            <el-table
              :data="tableData"
              border
              stripe
              size="mini"
              style="width: 100%"
              class="mainTable"
            >
              <el-table-column type="selection" align="center" width="55"></el-table-column>
              <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
              <el-table-column prop="test" label="收付标志" align="center"></el-table-column>
              <el-table-column prop="test" label="免税标志" align="center"></el-table-column>
              <el-table-column prop="test" label="费用项目" align="center"></el-table-column>
              <el-table-column prop="test" label="应收单位来源" align="center"></el-table-column>
              <el-table-column prop="test" label="应付单位来源" align="center"></el-table-column>
              <el-table-column prop="test" label="固定应付单位" align="center"></el-table-column>
              <el-table-column prop="test" label="币别" align="center"></el-table-column>
              <el-table-column prop="test" label="开票类型" align="center"></el-table-column>
              <el-table-column prop="test" label="税率" align="center"></el-table-column>
              <el-table-column prop="test" label="单价表达式" align="center"></el-table-column>
              <el-table-column prop="test" label="单价" align="center"></el-table-column>
              <el-table-column prop="test" label="计费单位" align="center"></el-table-column>
              <el-table-column prop="test" label="最小值开票金额" align="center"></el-table-column>
              <el-table-column prop="test" label="最大值开票金额" align="center"></el-table-column>
              <el-table-column prop="test" label="价格条件字段1" align="center"></el-table-column>
              <el-table-column prop="test" label="操作符1" align="center"></el-table-column>
              <el-table-column prop="test" label="值1" align="center"></el-table-column>
              <el-table-column prop="test" label="逻辑符" align="center"></el-table-column>
              <el-table-column prop="test" label="价格条件字段2" align="center"></el-table-column>
              <el-table-column prop="test" label="操作符2" align="center"></el-table-column>
              <el-table-column prop="test" label="值2" align="center"></el-table-column>
            </el-table>
          </el-row>
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
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false,
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
      ]
    };
  },
  methods: {
    showAndHideDialog() {
      this.dialogVisible = !this.dialogVisible;
    }
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
.form {
  padding: 10px;
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