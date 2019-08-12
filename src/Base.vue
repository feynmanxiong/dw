<template>
	<el-container class="flex_col_str">
		<el-header class="header">
			<el-menu :default-active="current_tab" class="menu" background-color="#0089d5" text-color="#fff" active-text-color="#ffd04b" mode="horizontal" >						
				<el-submenu v-for="(item, index) in list" :index="item.title">					
					<div class="elMenuTriangle"></div>
					<template slot="title">					
						<span>{{item.title}}</span>
					</template>					
					<template class="" v-for="(child, ind) in item.children" :index="child.title">
						<el-menu-item :index="child.title" @click="showTab(child)" v-if="!child.hasOwnProperty('children')">
							{{child.title}}
						</el-menu-item>
						<el-submenu class="baseMenu" :index="child.title" v-else>
							<template slot="title">{{child.title}}</template>
							<el-menu-item v-for="(i, k) in child.children" :index="i.title" @click="showTab(i)">{{i.title}}</el-menu-item>
						</el-submenu>
					</template>
				</el-submenu>
				<el-row style="height:60px;line-height: 60px;" class="full_height" type="flex" justify="space-between" align="middle">
				<el-col :span="6">
				</el-col>
				<el-col  class="text-right ">
					<el-dropdown @command="handleCommand">
						<span class="el-dropdown-link white">
							{{ name }}<i class="el-icon-arrow-down el-icon--right"></i>
						</span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item command="logout">退出</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</el-col>
			</el-row>
			</el-menu>				
		</el-header>
		<el-main class="main">
			<el-tabs class="body_tab" v-model="current_tab" type="border-card" closable @tab-remove="removeTab" lazy>
				<el-tab-pane class="tab_content" v-for="(item, index) in tabs" :key="item.title" :label="item.title" :name="item.title">
					<keep-alive>
						<component :is="item.content"></component>
					</keep-alive>
				</el-tab-pane>
			</el-tabs>
		</el-main>
	</el-container>
</template>

<style scoped>
	.el-dropdown + .el-dropdown {
		margin-left: 15px;
	}
	.el-popper{margin-top:0;}
	.elMenuTriangle{width: 0;height:0;border-top:6px solid transparent;border-right: 6px solid transparent;border-bottom: 6px solid #00a4ff;border-left:6px solid transparent;position: absolute;top:-12px;left:20px;z-index:1;}
	.flex_col_str { height: 100%; }
	.menu { min-height: 100%; background: #333; overflow: hidden; border-right: 0px none;}
	.header { color: #fff; background: #0089d5;  }
	.body_tab { height: 100%; display: flex; flex-direction: column; align-items: stretch; }
	.main { padding: 0; }
	.tab_content { height: 100%; }
	.full_height_scrollbar{ height: calc(100% + 17px); background-color: #333333; }
	.el-menu--popup { min-width: 140px;}
	.logo_img{width:100px;}
	.el-submenu{display:inline-block;}
	.el-submenu__title i{color:initial!important;}
</style>

<script>
	export default {
		data() {
			return {
				activeIndex: '1',
        		activeIndex2: '1',
				name : localStorage.getItem("dw_erp_user_name"),
				list: [												
//					业务管理
					{
						title: "业务管理",
						children: [
							{
								title: "业务台账管理",
								children: [									
									{
										title: "货运管理",
										content: "businessFreight"
									},
								]
							},
							
						]
					},
					{
						title: "价格管理",					
						children: [
							{
								title: "合同信控管理",
								content: "contractRun"
							},
							{
								title: "价格管理",
								content: "contractPrice"
							},
							{
								title: "费用控制管理",
								content: "contractCost"
							},						
						]
					},
					{
						title: "供应商管理",					
						children: [
							{
								title: "客户供应商管理",
								content: "supplierCustomer"
							},
						]
					},
					{
						title: "审批管理",					
						children: [
							{
								title: "合同审批管理(子流程3)",
								content: "approvalContract"
							},
							{
								title: "费用报批管理",
								content: "approvalCost"
							}
						]
					},
					{
						title: "基础资料",					
						children: [
							{
								title: "业务基础资料",
								children:[
									{title: "结算公司维护",	content: "basicsSettle"},
									{title: "港口维护",	content: "basicsRecordPort"}
								]
							},
							{
								title: "商务基础资料",
								children: [
									{
										title: "开票类型税率",
										content: "basicsMerchantInvoice"
									},{
										title: "费用科目维护",
										content: "basicsMerchantCost"
									},{
										title: "价格条件字段",
										content: "basicsMerchantTax"
									}
								]
							},

						],
					},
					{
							title: "权限管理",
							children: [
								{
									title: "用户管理",
									content: "powerUser"
								},{
									title: "角色管理",
									content: "powerRole"
								}
							]
						},
						{
							title: "登录用户名称",
							children: [
								{
									title: "",
									content: ""
								}
							]
						},
					
				],
				current_tab: 'home',
				tabs: [],
			}
		},
		created() {
		},
		methods: {
			addTab(item) {
				for(let tab of this.tabs) {
					if(tab.title == item.title) {
						this.current_tab = item.title;
						return;
					}
				}
				this.tabs.push({
					title: item.title,
					name: item.title,
					content: item.content
				});
				this.current_tab = item.title;
			},
			removeTab(targetName) {
				let tabs = this.tabs;
				let activeName = this.current_tab;
				if(activeName === targetName) {
					tabs.forEach((tab, index) => {
						if(tab.name === targetName) {
							let nextTab = tabs[index + 1] || tabs[index - 1];
							if(nextTab) {
								activeName = nextTab.name;
							}
						}
					});
				}

				this.current_tab = activeName;
				this.tabs = tabs.filter(tab => tab.name !== targetName);
			},
			showTab(path) {
				for(let item of this.tabs) {
					if(item.name == path) {
						this.current_tab = path
						return;
					}
				}
				this.addTab(path);
			},
			newAdd(path,title){
                let count = 0;
                for (let item of this.tabs) {
                    if(item.content == path){
                        let temp = parseInt( item.title.replace(title,'') );
                        if(temp > count){
                            count = temp;
                        }
                    }
                }
                ++count;
                this.showTab(
                    {
                        title: title+count,
                        content: path
                    }
                )
            },
			removeCurTab(){
				this.removeTab(this.current_tab);
			},
			handleCommand(command){
				if(command == "logout"){
					this.$logout();
				}
			},
			handleSelect(key, keyPath) {
		        console.log(key, keyPath);
		    }
		}
	}
</script>
