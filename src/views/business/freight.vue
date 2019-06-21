<template>
	<!--业务管理=>业务台账管理-->
	<el-container>
		<el-aside width="240px">
			<div class="cont_t">自定义查询区</div>
			<el-row class="el-m">
				<div align="center">					
					<el-button type="info" size="mini">重置</el-button>
					<el-button type="success" size="mini">查询</el-button>
				</div>
			</el-row>
			<el-row>				
				<el-input v-model="input" placeholder="请输入内容" size="mini" class="date_box"></el-input>
			</el-row>
			<el-row>
				<span class="span">业务类型</span>
				<el-select v-model="value" placeholder="请选择" size="mini" class="date_box">
			    	<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
  				</el-select>
			</el-row>
			<el-row>
				<span class="span">委托日期</span>
				<div class="block">
					<el-date-picker class="date_picker" v-model="value1" type="date" placeholder="选择日期" size="mini"></el-date-picker>
				</div>			
			</el-row>
			<el-row>
				<span class="span">合同编号</span>
				<div class="block">
					<el-input v-model="input" placeholder="请输入合同编号" size="mini" class="date_box"></el-input></el-date-picker>
				</div>			
			</el-row>
		</el-aside>
		<el-main>
			<el-row class="el-m">
				<el-button type="success" size="mini" @click="dialogVisible = true">新增</el-button>
				<el-button type="success" size="mini">复制</el-button>
				<el-button type="success" size="mini">保存</el-button>
				<el-button type="danger" size="mini">删除</el-button>
				<el-button type="warning" size="mini">修改历史</el-button>
				<el-button type="success" size="mini">分摊费用</el-button>
				<el-button type="success" size="mini">台账业务数据</el-button>
				<el-button type="success" size="mini">费用预录入</el-button>
				<el-button type="success" size="mini">单证管理</el-button>
				<el-button type="success" size="mini">拖车信息</el-button>
				<el-button type="success" size="mini">堆存信息</el-button>
				<el-button type="success" size="mini">打印</el-button>
			</el-row>
			<el-row class="el-m">
				<el-table :data="tableData" border stripe style="width: 100%" size="mini" show-summary>
					<el-table-column type="selection" align="center" width="55"></el-table-column>
					<el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
					<el-table-column label="操作" align="center" width="100">
						<el-button class="cont_btn" type="success" size="mini" @click="innerVisible = true">执行业务过程</el-button>					
					</el-table-column>
					<el-table-column prop="test" label="业务号" align="center"></el-table-column>
					<el-table-column prop="test" label="当前业务动态" align="center"></el-table-column>
					<el-table-column prop="name" label="业务类型" align="center"></el-table-column>
					<el-table-column prop="test" label="子业务类型" align="center"></el-table-column>
					<el-table-column prop="test" label="委托日期" align="center"></el-table-column>
					<el-table-column prop="test" label="委托单位" align="center"></el-table-column>
					<el-table-column prop="test" label="结算单位" align="center"></el-table-column>
					<el-table-column prop="test" label="揽货性质" align="center"></el-table-column>
					<el-table-column prop="test" label="主业务类型" align="center"></el-table-column>
					<el-table-column prop="test" label="货物类型" align="center"></el-table-column>
					<el-table-column prop="test" label="本外港选择" align="center"></el-table-column>
					<el-table-column prop="test" label="操作人" align="center"></el-table-column>
					<el-table-column prop="test" label="客服" align="center"></el-table-column>
					<el-table-column prop="test" label="销售员" align="center"></el-table-column>
				</el-table>
			</el-row>
			<!--新增货运代理订单     start-->
			<el-dialog title="" :visible.sync="dialogVisible" fullscreen :modal="false">
				<el-form class="cont_top"  :inline="true" :model="params" label-position="right">
					<el-row class="cont_button cont_border">
						<el-button type="success" size="mini" @click="dialogVisible = true">新增</el-button>
						<el-button type="success" size="mini">复制</el-button>
						<el-button type="success" size="mini">保存</el-button>
						<el-button type="danger" size="mini">删除</el-button>
						<el-button type="warning" size="mini">修改历史</el-button>
						<el-button type="success" size="mini">分摊费用</el-button>
						<el-button type="success" size="mini">台账业务数据</el-button>
						<el-button type="success" size="mini">费用预录入</el-button>
						<el-button type="success" size="mini">单证管理</el-button>
						<el-button type="success" size="mini">拖车信息</el-button>
						<el-button type="success" size="mini">堆存信息</el-button>
						<el-button type="success" size="mini">打印</el-button>
					</el-row>
					<el-row class="el-m ">
						<el-form-item class="el-item" label="合同编号:">
							<el-input v-model="input" placeholder="请输入内容" size="mini" class="date_input"></el-input>
		  				</el-form-item>
		  				<el-form-item class="el-item" label="委托日期">
							<div class="block">
							    <el-date-picker v-model="value1" type="date" placeholder="选择日期" size="mini" class="date_input"> </el-date-picker>
							</div>
		  				</el-form-item>
		  				<el-form-item class="el-item" label="揽货性质:" >
							<el-select  v-model="value" placeholder="请选择" size="mini" class="date_input">
						    	<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
			  				</el-select>
	  					</el-form-item>
	  					<el-form-item class="el-item" label="主业务类型:" >
							<el-select  v-model="value" placeholder="请选择" size="mini" class="date_input">
						    	<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
			  				</el-select>
	  					</el-form-item>
	  					<el-form-item class="el-item" label="子业务类型:" >
							<el-select  v-model="value" placeholder="请选择" size="mini" class="date_input">
						    	<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
			  				</el-select>
	  					</el-form-item>
	  					<el-form-item class="el-item" label="委托单位:" >
							<el-select  v-model="value" placeholder="请选择" size="mini" class="date_input">
						    	<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
			  				</el-select>
	  					</el-form-item>
	  					<el-form-item class="el-item" label="结算单位:" >
							<el-select  v-model="value" placeholder="请选择" size="mini" class="date_input">
						    	<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
			  				</el-select>
	  					</el-form-item>
					</el-row>
					<el-row>
						<strong class="el-item cont_s">合同编号与价格协议号对应关系</strong>
						<el-button type="success" size="mini" @click="centerDialogVisible = true">添加合同编号</el-button>
						<div class="cont_box">
							<el-row>
								<el-form-item class="el-item" label="">
									<el-button type="danger" size="mini">删除</el-button>
			  					</el-form-item>
								<el-form-item class="el-item" label="合同编号:">
									<el-input v-model="input" placeholder="合同编号" size="mini" class="date_box"></el-input>
			  					</el-form-item>
			  					<el-form-item class="el-item" label="价格协议号:">
									<el-input v-model="input" placeholder="价格协议号" size="mini" class="date_box"></el-input>
			  					</el-form-item>
							</el-row>
							<el-row>
								<el-form-item class="el-item" label="">
									<el-button type="danger" size="mini">删除</el-button>
			  					</el-form-item>
								<el-form-item class="el-item" label="合同编号:">
									<el-input v-model="input" placeholder="合同编号" size="mini" class="date_box"></el-input>
			  					</el-form-item>
			  					<el-form-item class="el-item" label="价格协议号:">
									<el-input v-model="input" placeholder="价格协议号" size="mini" class="date_box"></el-input>
			  					</el-form-item>
							</el-row>
							<el-row>
								<el-form-item class="el-item" label="">
									<el-button type="danger" size="mini">删除</el-button>
			  					</el-form-item>
								<el-form-item class="el-item" label="合同编号:">
									<el-input v-model="input" placeholder="合同编号" size="mini" class="date_box"></el-input>
			  					</el-form-item>
			  					<el-form-item class="el-item" label="价格协议号:">
									<el-input v-model="input" placeholder="价格协议号" size="mini" class="date_box"></el-input>
			  					</el-form-item>
			  				</el-row>
						</div>
					</el-row>
					<el-row>
						<el-form-item class="el-item" label="操作人:">
							<el-input v-model="input" placeholder="" size="mini" class="date_box"></el-input>
	  					</el-form-item>
	  					<el-form-item class="el-item" label="客服角色：">
							<el-input v-model="input" placeholder="" size="mini" class="date_box"></el-input>
	  					</el-form-item>
	  					<el-form-item class="el-item" label="销售角色：">
							<el-input v-model="input" placeholder="" size="mini" class="date_box"></el-input>
	  					</el-form-item>
					</el-row>
					<el-row>
						<span>操作时间：</span>
					</el-row>
				</el-form>
			</el-dialog>
			<!--新增货运代理订单     end-->
			<!--添加合同编号    start-->
			<el-row>
				<el-dialog title="" :visible.sync="centerDialogVisible" width="25%" center>
					<span class="cont_span_t">合同归档</span>
					 <el-form  :inline="true" :model="params" label-position="right">
						<el-row class="cont_center">
							<el-form-item label="价格协议类型:">
								<el-select  v-model="value" placeholder="请选择" size="mini" class="date_input">
							    	<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
				  				</el-select>
			  				</el-form-item>
						</el-row>
					</el-form>
					<span slot="footer" class="dialog-footer">
					    <el-button type="success" size="mini" @click="centerDialogVisible = false">确 定</el-button>
					</span>
				</el-dialog>
			</el-row>
			<!--添加合同编号    end-->
			<!--执行业务过程    start-->
			<el-dialog title="" :visible.sync="innerVisible" :modal="false" fullscreen>
				<el-form class=""  :inline="true" :model="params" label-position="right">
					<el-row class="cont_button cont_top">
						<el-button type="success" size="mini">新增业务台账</el-button>
						<el-button type="success" size="mini">复制</el-button>
						<el-button type="success" size="mini">保存</el-button>
						<el-button type="danger" size="mini">删除</el-button>
						<el-button type="warning" size="mini">变更记录</el-button>
						<el-button type="success" size="mini">分摊费用</el-button>
						<el-button type="success" size="mini">打印</el-button>
					</el-row>
					<el-row class="el-forms">
						<span>业务动态:</span>
						<el-steps class="cont_size"  :active="1" finish-status="success" align-center >
						  <el-step title="接单"></el-step>
						  <el-step title="订舱"></el-step>
						  <el-step title="空箱出场"></el-step>
						  <el-step title="重箱进场"></el-step>
						  <el-step title="报关"></el-step>
						  <el-step title="查验"></el-step>
						  <el-step title="放行"></el-step>
						  <el-step title="装船"></el-step>
						  <el-step title="离港"></el-step>
						  <el-step title="签提单"></el-step>
						</el-steps>
					</el-row>					
					<el-row>
						<div class="cont_border">							
							<strong class="el-item cont_bg">合同信息</strong>
						</div>
						<div class="cont_borders">							
							<el-row class="cont_bottom">
								<el-form-item class="el-item" label="业务号:">
									<el-input v-model="input" placeholder="请输入内容" size="mini" class="date_input"></el-input>
				  				</el-form-item>
				  				<el-form-item class="el-item" label="委托日期">
									<div class="block">
									    <el-date-picker v-model="value1" type="date" placeholder="选择日期" size="mini" class="date_input"> </el-date-picker>
									</div>
				  				</el-form-item>
				  				<el-form-item class="el-item" label="揽货性质:" >
									<el-input v-model="input" placeholder="请输入内容" size="mini" class="date_input"></el-input>
			  					</el-form-item>
			  					<el-form-item class="el-item" label="业务日期">
									<div class="block">
									    <el-date-picker v-model="value1" type="date" placeholder="选择日期" size="mini" class="date_input"> </el-date-picker>
									</div>
				  				</el-form-item>
			  					<el-form-item class="el-item" label="主业务类型:" >
									<el-input v-model="input" placeholder="请输入内容" size="mini" class="date_input"></el-input>
			  					</el-form-item>
			  					<el-form-item class="el-item" label="子业务类型:" >
									<el-input v-model="input" placeholder="请输入内容" size="mini" class="date_input"></el-input>
			  					</el-form-item>
			  					<el-form-item class="el-item" label="结算单位:" >
									<el-input v-model="input" placeholder="请输入内容" size="mini" class="date_input"></el-input>
			  					</el-form-item>
			  					<el-form-item class="el-item" label="委托单位:" >
									<el-input v-model="input" placeholder="请输入内容" size="mini" class="date_input"></el-input>
			  					</el-form-item>
			  					<el-form-item class="el-item" label="合同编号:" >
									<el-select  v-model="value" placeholder="请选择" size="mini" class="date_input">
								    	<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
					  				</el-select>
			  					</el-form-item>
			  					<el-form-item class="el-item" label="价格协议号:" >
									<el-input v-model="input" placeholder="请输入内容" size="mini" class="date_input"></el-input>
			  					</el-form-item>
			  					<el-form-item class="el-item" label="合同编号:" >
									<el-select  v-model="value" placeholder="请选择" size="mini" class="date_input">
								    	<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
					  				</el-select>
			  					</el-form-item>
			  					<el-form-item class="el-item" label="价格协议号:" >
									<el-input v-model="input" placeholder="请输入内容" size="mini" class="date_input"></el-input>
			  					</el-form-item>
								
							</el-row>
							<el-row>
								<el-form-item class="el-item" label="操作人:">
									<el-input v-model="input" placeholder="" size="mini" class="date_input"></el-input>
			  					</el-form-item>
			  					<el-form-item class="el-item" label="客服角色：">
									<el-input v-model="input" placeholder="" size="mini" class="date_input"></el-input>
			  					</el-form-item>
			  					<el-form-item class="el-item" label="销售角色：">
									<el-input v-model="input" placeholder="" size="mini" class="date_input"></el-input>
			  					</el-form-item>		
							</el-row>
						</div>
					</el-row>
					<el-row class="cont_top">
						<div class="">	
							<!--tab切换-->
							<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
								<!--基本信息       start-->
							    <el-tab-pane label="基本信息" name="first">
							    	<b class="cont_m_b">船港信息</b>
							  		<div class="cont_borders">
							  			<el-row>
											<el-form-item class="el-item" label="业务号:">
												<el-input v-model="input" placeholder="请输入内容" size="mini" class="date_input"></el-input>
							  				</el-form-item>
							  				<el-form-item class="el-item" label="航线:" >
												<el-select  v-model="value" placeholder="请选择" size="mini" class="date_input">
											    	<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
								  				</el-select>
						  					</el-form-item>
						  					<el-form-item class="el-item" label="船次/航线:" >
												<el-select  v-model="value" placeholder="请选择" size="mini" class="date_input">
											    	<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
								  				</el-select>
						  					</el-form-item><el-form-item class="el-item" label="船公司:" >
												<el-select  v-model="value" placeholder="请选择" size="mini" class="date_input">
											    	<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
								  				</el-select>
						  					</el-form-item>
							  			</el-row>
							  			<el-row>
											<el-form-item class="el-item" label="到港日期：">
												<div class="block">
												    <el-date-picker v-model="value1" type="date" placeholder="选择日期" size="mini" class="date_input"> </el-date-picker>
												</div>
							  				</el-form-item>
							  				<el-form-item class="el-item" label="离港日期：">
												<div class="block">
												    <el-date-picker v-model="value1" type="date" placeholder="选择日期" size="mini" class="date_input"> </el-date-picker>
												</div>
							  				</el-form-item>
							  				<el-form-item class="el-item" label="中转日期：">
												<div class="block">
												    <el-date-picker v-model="value1" type="date" placeholder="选择日期" size="mini" class="date_input"> </el-date-picker>
												</div>
							  				</el-form-item>
							  			</el-row>
							  			<el-row>											
							  				<el-form-item class="el-item" label="卸货港/国家:" >
												<el-select  v-model="value" placeholder="请选择" size="mini" class="date_input">
											    	<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
								  				</el-select>
						  					</el-form-item>
						  					<el-form-item class="el-item" label="装货港/国家:" >
												<el-select  v-model="value" placeholder="请选择" size="mini" class="date_input">
											    	<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
								  				</el-select>
						  					</el-form-item><el-form-item class="el-item" label="中转港/国家:" >
												<el-select  v-model="value" placeholder="请选择" size="mini" class="date_input">
											    	<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
								  				</el-select>
						  					</el-form-item>
							  			</el-row>
							  		</div>
							  		<b class="cont_m_b cont_top">货物信息</b>
							  		<div class="cont_borders">
							  			<el-row>											
							  				<el-form-item class="el-item" label="货物品名:" >
												<el-select  v-model="value" placeholder="请选择" size="mini" class="date_input">
											    	<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
								  				</el-select>
						  					</el-form-item>
						  					<el-form-item class="el-item" label="单证箱量/单证箱型:" >
												<el-input v-model="input" placeholder="" size="mini" class="date_samll_input"></el-input> 20GP
						  					</el-form-item>
						  					<el-form-item class="el-item" label="" >
												<el-input v-model="input" placeholder="" size="mini" class="date_samll_input"></el-input> 20HC
						  					</el-form-item>
						  					<el-form-item class="el-item" label="" >
												<el-input v-model="input" placeholder="" size="mini" class="date_samll_input"></el-input> 40GP
						  					</el-form-item>
						  					<el-form-item class="el-item" label="" >
												<el-input v-model="input" placeholder="" size="mini" class="date_samll_input"></el-input> 40HC
						  					</el-form-item>
						  					<el-form-item class="el-item" label="" >
												<el-input v-model="input" placeholder="" size="mini" class="date_samll_input"></el-input> 45GP
						  					</el-form-item>
						  					<el-form-item class="el-item" label="" >
												<el-input v-model="input" placeholder="" size="mini" class="date_samll_input"></el-input>45HC
						  					</el-form-item>
						  					<el-form-item class="el-item" label="" >
												<el-input v-model="input" placeholder="" size="mini" class="date_samll_input"></el-input> LCL
						  					</el-form-item>						  					
							  			</el-row>
							  			<el-row >
							  				<el-form-item class="el-item" label="品名明细:" >
												<el-input v-model="input" placeholder="请填写明细说明 20个字内" size="mini" class="date_in"></el-input>
						  					</el-form-item>						  					
							  			</el-row>
							  			<el-row>
											<el-form-item class="el-item" label="发货人:">
												<el-input v-model="input" placeholder="请填写发货人，200个字" size="mini" class="date_box"></el-input>
							  				</el-form-item>
							  				<el-form-item class="el-item" label="收货人:">
												<el-input v-model="input" placeholder="请填写收货人，200个字" size="mini" class="date_box"></el-input>
							  				</el-form-item>
							  				<el-form-item class="el-item" label="通知人:">
												<el-input v-model="input" placeholder="请填写通知人，200个字" size="mini" class="date_box"></el-input>
							  				</el-form-item>							  				
							  			</el-row>
							  		</div>
							  		<b class="cont_m_b cont_top">业务信息</b>
							  		<div class="cont_borders">
							  			<el-row>
											<el-form-item class="el-item" label="订舱日期:">
												<el-input v-model="input" placeholder="请输入内容" size="mini" class="date_input"></el-input>
							  				</el-form-item>
							  				<el-form-item class="el-item" label="订舱公司:" >
												<el-select  v-model="value" placeholder="请选择" size="mini" class="date_input">
											    	<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
								  				</el-select>
						  					</el-form-item>
						  					<el-form-item class="el-item" label="申报方式:" >
												<el-select  v-model="value" placeholder="请选择" size="mini" class="date_input">
											    	<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
								  				</el-select>
						  					</el-form-item>
						  					<el-form-item class="el-item" label="报关单号:" >
												<el-input v-model="input" placeholder="选填报关单号" size="mini" class="date_input"></el-input>
						  					</el-form-item>
							  			</el-row>
							  			<el-row>
											<el-form-item class="el-item" label="提单票数:">
												<el-input v-model="input" placeholder="请填写提单票数" size="mini" class="date_input"></el-input>
							  				</el-form-item>
							  				<el-form-item class="el-item" label="订舱公司:" >
												<el-input v-model="input" placeholder="请填写报关票数" size="mini" class="date_input"></el-input> 份
						  					</el-form-item>
						  					<el-form-item class="el-item" label="装箱方式:" >
												<el-select  v-model="value" placeholder="请选择" size="mini" class="date_input">
											    	<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
								  				</el-select>
						  					</el-form-item>
						  					<el-form-item class="el-item" label="商检单号:" >
												<el-input v-model="input" placeholder="请填写商检单号" size="mini" class="date_input"></el-input>
						  					</el-form-item>
							  			</el-row>
							  			
							  			<el-row>
							  				<el-row>
							  					<el-form-item class="el-item" label="是否监管：" >
									  				<el-radio-group class="el-item" v-model="radio">
													    <el-radio :label="1">是</el-radio>
													    <el-radio :label="2">否</el-radio>
													</el-radio-group>
												</el-form-item>
												<el-form-item class="el-item" label="是否电放：" >
									  				<el-radio-group class="el-item" v-model="radio">
													    <el-radio :label="1">是</el-radio>
													    <el-radio :label="2">否</el-radio>
													</el-radio-group>
												</el-form-item>
												<el-form-item class="el-item" label="是否查检：" >
									  				<el-radio-group class="el-item" v-model="radio">
													    <el-radio :label="1">是</el-radio>
													    <el-radio :label="2">否</el-radio>
													</el-radio-group>
												</el-form-item>
												<el-form-item class="el-item" label="是否改单：" >
									  				<el-radio-group class="el-item" v-model="radio">
													    <el-radio :label="1">是</el-radio>
													    <el-radio :label="2">否</el-radio>
													</el-radio-group>
												</el-form-item>
											</el-row>
											<el-row >
								  				<el-form-item class="el-item" label="单证备注:" >
													<el-input v-model="input" placeholder="请填写明细说明 100个字内" size="mini" class="date_in"></el-input>
							  					</el-form-item>						  					
							  				</el-row>
							  				<el-row>
								  				<el-form-item class="el-item" label="开票要求:" >
													<el-input v-model="input" placeholder="自己录入最多输入 100个字内" size="mini" class="date_input5"></el-input>
							  					</el-form-item>	
							  					<el-form-item class="el-item" label="业务要求:" >
													<el-input v-model="input" placeholder="自己录入最多输入 100个字内" size="mini" class="date_input5"></el-input>
							  					</el-form-item>	
							  				</el-row>
							  			</el-row>
							  			<el-row>
							  				<el-row class="cont_border">
												<div class="flex w">
													<div class="flex_1">
								  						<el-form-item class="cont_block" label="创建人:">
															<el-input v-model="input" placeholder="请输入内容" size="mini" class="date_box"></el-input>									
									  					</el-form-item>
									  					<el-form-item  label="创建时间：">2019-6-17</el-form-item>
								  					</div>
								  					<div class="flex_1">
								  						<el-form-item class="cont_block" label="修改人:">
															<el-input v-model="input" placeholder="请输入内容" size="mini" class="date_box"></el-input>									
									  					</el-form-item>
									  					<el-form-item  label="修改时间：">2019-6-17</el-form-item>
								  					</div>
							  					</div>
											</el-row>
							  			</el-row>
	
							  		</div>
							    </el-tab-pane>
							    <!--基本信息       end-->
							    <!--单证信息       start-->
							    <el-tab-pane label="单证信息" name="second">
							    	<el-row class="">
										<el-button type="success" size="mini" @click="add">新增单据</el-button>
										<el-button type="success" size="mini">复制</el-button>
										<el-button type="danger" size="mini" @click="handleDelete">删除</el-button>
									</el-row>
									<el-row class="el-m">
										<el-table :data="tableData" border stripe style="width: 100%" size="mini" show-summary>
											<el-table-column type="selection" align="center" width="55"></el-table-column>
											<el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
											<el-table-column label="单据类型" align="center" >
												<el-button class="cont_btn" type="success" size="mini">自己录入单据类型</el-button>
											</el-table-column>
											<el-table-column prop="test" label="单据状态" align="center">
												<el-select  v-model="value" placeholder="请选择" size="mini" class="date_input">
											    	<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
								  				</el-select>
											</el-table-column>
											<el-table-column prop="test" label="单据编号" align="center"></el-table-column>
											<el-table-column prop="test" label="份数" align="center"></el-table-column>
											<el-table-column prop="test" label="状态日期" align="center">
												<div class="block">
												    <el-date-picker v-model="value1" type="date" placeholder="选择日期" size="mini" class="date_input"> </el-date-picker>
												</div>
											</el-table-column>
											<el-table-column prop="test" label="上传附件" align="center">
												<el-upload class="upload-demo" action="" :on-remove="handleRemove" :file-list="fileList" list-type="picture">
												  <el-button size="small" type="primary">点击上传</el-button>
												</el-upload>
											</el-table-column>										
										</el-table>
									</el-row>
							    </el-tab-pane>
							    <!--单证信息       end-->
							    <!--拖车信息       start-->
							    <el-tab-pane label="角色管理" name="third">
							    	<el-row class="">
										<el-button type="success" size="mini" @click="add">新增</el-button>
										<el-button type="success" size="mini">复制</el-button>
										<el-button type="success" size="mini">保存</el-button>
										<el-button type="danger" size="mini" @click="handleDelete">删除</el-button>
									</el-row>
									<el-row class="el-m">
										<el-table :data="tableData" border stripe style="width: 100%" size="mini" show-summary>
											<el-table-column type="selection" align="center" width="55"></el-table-column>
											<el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
											<el-table-column prop="test" label="车队公司" align="center" ></el-table-column>
											<el-table-column prop="test" label="车牌号" align="center"></el-table-column>
											<el-table-column prop="test" label="拖车箱量" align="center"></el-table-column>
											<el-table-column prop="test" label="拖车箱型" align="center"></el-table-column>
											<el-table-column prop="test" label="装箱公司" align="center"></el-table-column>
											<el-table-column prop="test" label="装箱地点" align="center"></el-table-column>
											<el-table-column prop="test" label="装箱日期" align="center">
												<div class="block">
												    <el-date-picker v-model="value1" type="date" placeholder="选择日期" size="mini" class="date_input"> </el-date-picker>
												</div>
											</el-table-column>
											<el-table-column prop="test" label="装箱备注" align="center"></el-table-column>
											<el-table-column prop="test" label="装箱地点" align="center"></el-table-column>
											<el-table-column prop="test" label="送箱日期" align="center">
												<div class="block">
												    <el-date-picker v-model="value1" type="date" placeholder="选择日期" size="mini" class="date_input"> </el-date-picker>
												</div>
											</el-table-column>
											<el-table-column prop="test" label="送箱备注" align="center"></el-table-column>									
										</el-table>
									</el-row>
							    </el-tab-pane>
							    <!--拖车信息       end-->
							     <!--费用信息       start-->
							    <el-tab-pane label="定时任务补偿" name="fourth">
							    	<el-row class="">
										<el-button type="warning" size="mini">导入价格协议号</el-button>
										<el-button type="warning" size="mini">通知开票</el-button>
										<el-button type="danger" size="mini">取消开票通知</el-button>
										<el-button type="warning" size="mini">费用提交</el-button>
										<el-button type="danger" size="mini">取消费用提交</el-button>
										<el-button type="warning" size="mini">提交费用报批</el-button>
										<el-button type="danger" size="mini">取消费用报批</el-button>
										<el-button type="success" size="mini" @click="centerDialogVisibleInfo = true">业务日志</el-button>
										<el-button type="danger" size="mini" @click="centerDialogVisibleTwo = true">费用异常预警</el-button>
									</el-row>
									<el-row>
										<div class="cont_border cont_top">							
											<strong class="el-item cont_bg">应收费用</strong>
											<el-button type="warning" size="mini">应收审核</el-button>
											<el-button type="warning" size="mini">取消应收审核</el-button>
											<el-button type="success" size="mini">新增</el-button>
											<el-button type="success" size="mini">复制</el-button>
											<el-button type="success" size="mini">保存</el-button>
											<el-button type="danger" size="mini">删除</el-button>
											<el-button type="warning" size="mini">应收对账</el-button>
											<el-button type="warning" size="mini">收款确认</el-button>
										</div>
									</el-row>
									<el-row class="el-m">
										<el-table :data="tableData" border stripe style="width: 100%" size="mini" show-summary>
											<el-table-column type="selection" align="center" width="55"></el-table-column>
											<el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
											<el-table-column prop="test" label="价格协议号" align="center" ></el-table-column>
											<el-table-column prop="test" label="结算客户" align="center"></el-table-column>
											<el-table-column prop="test" label="免税标志" align="center"></el-table-column>
											<el-table-column prop="test" label="结算公司" align="center"></el-table-column>
											<el-table-column prop="test" label="币种" align="center"></el-table-column>
											<el-table-column prop="test" label="汇率" align="center"></el-table-column>
											<el-table-column prop="test" label="费用科目名称" align="center"></el-table-column>
											<el-table-column prop="test" label="单价表达式" align="center"></el-table-column>
											<el-table-column prop="test" label="单价" align="center"></el-table-column>									
											<el-table-column prop="test" label="计费单位" align="center"></el-table-column>									
											<el-table-column prop="test" label="数量" align="center"></el-table-column>									
											<el-table-column prop="test" label="开票类型" align="center"></el-table-column>									
											<el-table-column prop="test" label="税率" align="center"></el-table-column>									
											<el-table-column prop="test" label="本币不含税金额" align="center"></el-table-column>									
											<el-table-column prop="test" label="不币金额" align="center"></el-table-column>									
											<el-table-column prop="test" label="税金" align="center"></el-table-column>									
											<el-table-column prop="test" label="费用行备注" align="center"></el-table-column>									
											<el-table-column prop="test" label="录入人" align="center"></el-table-column>									
											<el-table-column prop="test" label="录入日期" align="center"></el-table-column>									
											<el-table-column prop="test" label="修改人" align="center"></el-table-column>									
											<el-table-column prop="test" label="修改日期" align="center"></el-table-column>									
											<el-table-column prop="test" label="应收对账单号" align="center"></el-table-column>									
											<el-table-column prop="test" label="开票人" align="center"></el-table-column>									
											<el-table-column prop="test" label="开票日期" align="center"></el-table-column>									
											<el-table-column prop="test" label="税务发票号" align="center"></el-table-column>									
											<el-table-column prop="test" label="发票标志" align="center"></el-table-column>									
											<el-table-column prop="test" label="信控逾期标志" align="center"></el-table-column>									
											<el-table-column prop="test" label="信控结算日" align="center"></el-table-column>									
											<el-table-column prop="test" label="信控结算开数" align="center"></el-table-column>									
											<el-table-column prop="test" label="应收核销标志" align="center"></el-table-column>									
											<el-table-column prop="test" label="应收未核销金额" align="center"></el-table-column>									
											<el-table-column prop="test" label="到账率" align="center"></el-table-column>									
											<el-table-column prop="test" label="补收标志" align="center"></el-table-column>									
											<el-table-column prop="test" label="结转标志" align="center"></el-table-column>									
											<el-table-column prop="test" label="轧差标志" align="center"></el-table-column>									
											<el-table-column prop="test" label="分摊标志" align="center"></el-table-column>									
											<el-table-column prop="test" label="分摊人" align="center"></el-table-column>									
											<el-table-column prop="test" label="分摊日期" align="center"></el-table-column>									
										</el-table>
									</el-row>
									<el-row>
										<div class="cont_border cont_top">							
											<strong class="el-item cont_bg">应付费用</strong>
											<el-button type="warning" size="mini">应收审核</el-button>
											<el-button type="warning" size="mini">取消应收审核</el-button>
											<el-button type="success" size="mini">新增</el-button>
											<el-button type="success" size="mini">复制</el-button>
											<el-button type="success" size="mini">保存</el-button>
											<el-button type="danger" size="mini">删除</el-button>
											<el-button type="warning" size="mini">应收对账</el-button>
											<el-button type="warning" size="mini">付款申请</el-button>
										</div>
									</el-row>
									<el-row class="el-m">
										<el-table :data="tableData" border stripe style="width: 100%" size="mini" show-summary>
											<el-table-column type="selection" align="center" width="55"></el-table-column>
											<el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
											<el-table-column prop="test" label="价格协议号" align="center" ></el-table-column>
											<el-table-column prop="test" label="结算供应商" align="center"></el-table-column>
											<el-table-column prop="test" label="免税标志" align="center"></el-table-column>
											<el-table-column prop="test" label="结算公司" align="center"></el-table-column>
											<el-table-column prop="test" label="币种" align="center"></el-table-column>
											<el-table-column prop="test" label="汇率" align="center"></el-table-column>
											<el-table-column prop="test" label="费用科目名称" align="center"></el-table-column>
											<el-table-column prop="test" label="单价表达式" align="center"></el-table-column>
											<el-table-column prop="test" label="单价" align="center"></el-table-column>									
											<el-table-column prop="test" label="计费单位" align="center"></el-table-column>									
											<el-table-column prop="test" label="数量" align="center"></el-table-column>									
											<el-table-column prop="test" label="开票类型" align="center"></el-table-column>									
											<el-table-column prop="test" label="税率" align="center"></el-table-column>									
											<el-table-column prop="test" label="本币不含税金额" align="center"></el-table-column>									
											<el-table-column prop="test" label="不币金额" align="center"></el-table-column>									
											<el-table-column prop="test" label="税金" align="center"></el-table-column>									
											<el-table-column prop="test" label="费用行备注" align="center"></el-table-column>									
											<el-table-column prop="test" label="录入人" align="center"></el-table-column>									
											<el-table-column prop="test" label="录入日期" align="center"></el-table-column>									
											<el-table-column prop="test" label="修改人" align="center"></el-table-column>									
											<el-table-column prop="test" label="修改日期" align="center"></el-table-column>									
											<el-table-column prop="test" label="应收对账单号" align="center"></el-table-column>									
											<el-table-column prop="test" label="开票人" align="center"></el-table-column>									
											<el-table-column prop="test" label="开票日期" align="center"></el-table-column>									
											<el-table-column prop="test" label="税务发票号" align="center"></el-table-column>									
											<el-table-column prop="test" label="发票标志" align="center"></el-table-column>									
											<el-table-column prop="test" label="信控结算日" align="center"></el-table-column>									
											<el-table-column prop="test" label="信控结算开数" align="center"></el-table-column>									
											<el-table-column prop="test" label="应付核销标志" align="center"></el-table-column>									
											<el-table-column prop="test" label="应付已核销金额" align="center"></el-table-column>								
											<el-table-column prop="test" label="补收标志" align="center"></el-table-column>									
											<el-table-column prop="test" label="结转标志" align="center"></el-table-column>									
											<el-table-column prop="test" label="轧差标志" align="center"></el-table-column>									
											<el-table-column prop="test" label="分摊标志" align="center"></el-table-column>									
											<el-table-column prop="test" label="分摊人" align="center"></el-table-column>									
											<el-table-column prop="test" label="分摊日期" align="center"></el-table-column>									
										</el-table>
									</el-row>
									<el-row>
										<div class="cont_border cont_top">							
											<strong class="el-item cont_bg">汇总利润</strong>
										</div>
									</el-row>
									<el-row class="el-m">
										<el-table :data="tableData" border stripe style="width: 100%" size="mini" show-summary>
											<el-table-column type="selection" align="center" width="55"></el-table-column>
											<el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
											<el-table-column prop="test" label="免税标志" align="center"></el-table-column>
											<el-table-column prop="test" label="本币" align="center"></el-table-column>
											<el-table-column prop="test" label="含税应收总额" align="center"></el-table-column>
											<el-table-column prop="test" label="含税应付总额" align="center"></el-table-column>
											<el-table-column prop="test" label="含税毛利" align="center"></el-table-column>
											<el-table-column prop="test" label="含税毛利率" align="center"></el-table-column>
											<el-table-column prop="test" label="不含税应收总额" align="center"></el-table-column>
											<el-table-column prop="test" label="不含税应付总额" align="center"></el-table-column>
											<el-table-column prop="test" label="不含税毛利" align="center"></el-table-column>
											<el-table-column prop="test" label="不含税毛利率" align="center"></el-table-column>						
										</el-table>
									</el-row>
							    </el-tab-pane>
							    <!--费用信息  end-->
							</el-tabs>								
						</div>							
					</el-row>
				</el-form>
			</el-dialog>
			<!--执行业务过程 end--> 
			<!--业务日志   start-->
			<el-row>
				<el-dialog title="" :visible.sync="centerDialogVisibleInfo" width="50%" center>
					<span class="cont_span_t">业务日志窗口</span>
					<el-row class="">
						<el-table :data="tableData" border stripe style="width: 100%" size="mini" show-summary>
							<el-table-column type="selection" align="center" width="55"></el-table-column>
							<el-table-column label="序号" type="index" width="50" align="center"></el-table-column>					
							<el-table-column prop="test" label="步骤" align="center"></el-table-column>
							<el-table-column prop="test" label="经办人" align="center"></el-table-column>
							<el-table-column prop="test" label="经办日期" align="center"></el-table-column>
						</el-table>
					</el-row>
					
				</el-dialog>
			</el-row>
			<!--业务日志   end-->
			<!--费用异常预警页面   start-->
			<el-row>
				<el-dialog title="" :visible.sync="centerDialogVisibleTwo" width="50%" center>
					<span class="cont_span_t">费用异常预警页面</span>
					<el-row class="">
						<el-table :data="tableData" border stripe style="width: 100%" size="mini" show-summary>
							<el-table-column type="selection" align="center" width="55"></el-table-column>
							<el-table-column label="序号" type="index" width="50" align="center"></el-table-column>					
							<el-table-column prop="test" label="总预警项" align="center"></el-table-column>
							<el-table-column prop="test" label="子预警项" align="center"></el-table-column>
							<el-table-column prop="test" label="超额/超期/亏损" align="center"></el-table-column>
							<el-table-column prop="test" label="判断条件" align="center"></el-table-column>
						</el-table>
					</el-row>
					
				</el-dialog>
			</el-row>
			<!--费用异常预警页面   end-->
		</el-main>
	</el-container>
</template>

<script>export default {
	data() {
		return {
			input:'',
			radio: 1,
			activeName: 'first',
			active: 0,
			dialogVisible:false,
			centerDialogVisible:false,
			innerVisible:false,
			centerDialogVisibleInfo:false,
			centerDialogVisibleTwo:false,
			options: [{
				value: '选项1',
				label: '黄金糕'
			}, {
				value: '选项2',
				label: '双皮奶'
			}, {
				value: '选项3',
				label: '蚵仔煎'
			}, {
				value: '选项4',
				label: '龙须面'
			}, {
				value: '选项5',
				label: '北京烤鸭'}],
			tableData: [{
				test:'test',
				name:'外贸出口'
			},
			{
				test:'test',
				name:'外贸进口'
			},
			{
				test:'test',
				name:'内贸进港/站'
			}],
			value:'',
			pickerOptions: {
					disabledDate(time) {
						return time.getTime() > Date.now();
					},
					shortcuts: [{
						text: '今天',
						onClick(picker) {
							picker.$emit('pick', new Date());
						}
					}, {
						text: '昨天',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24);
							picker.$emit('pick', date);
						}
					}, {
						text: '一周前',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', date);
						}
					}]
				},
				value1: '',
				value2: '',
			}
		},
		computed: {},
		created() {},
		mounted() {},
		methods: {
			next() {
				if(this.active++ > 2) this.active = 0;
			},
			handleClick(tab, event) {
				console.log(tab, event);
			},
			handleRemove(file, fileList) {
		        console.log(file, fileList);
		    },
		    handlePreview(file) {
		        console.log(file);
		    },
		    handleDelete(index, row) {
				console.log(index)
				console.log(row)
				this.$confirm("此操作将永久删除该店铺和其下所有数据,是否继续?", "提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					})
					.then(() => {
						this.tableData.splice(index, 1)
					})
			},
			add() {
				this.n++;
				this.tableData.push({
					id: this.n,
					test: 'test',
					state: false

				});
			}
			 
		}

	}
</script>

<style scoped>
	.el-aside {background-color:#E4E4E4;padding:10px  20px;margin:10px 0 10px 10px;}	
	.el-main{padding:0 10px;}
	.cont_block{display: block;}
	.date_picker{width:200px;}
	.el-item{margin-right:20px;}
</style>