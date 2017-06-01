<template>
  <el-row class="panel">
	<el-row class="top">
		<el-col :span='23' class="panel-top" >
			<el-col :span='20' :push="1" style='font-size:26px;color:#20a0ff'>
				<span>DABAOGE</span>
			</el-col>
			<el-col :span='4' class="rightbar">
				<el-dropdown trigger="click">
					<span class="el-dropdown-link" style="color:#c0ccda;cursor: pointer;font-weight:700">
                		更多操作<i class="el-icon-caret-bottom el-icon--right"></i>
              		</span>
              		<el-dropdown-menu slot="dropdown">
              			<el-dropdown-item @click.native="toindex">博客首页</el-dropdown-item>
              			<el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
              		</el-dropdown-menu>
				</el-dropdown>
			</el-col>
		</el-col>
	</el-row>
	<!--顶部结束 -->
	<el-row class="panel-center">
		<el-col :span="5">
			<el-menu router class="el-menu-vertical-demo">
			<el-submenu index="1">
				<template slot="title">文章管理</template>
				<el-menu-item @click="toArticleList" index="1-1">内容管理</el-menu-item>
          		<el-menu-item @click="toClassifyList" index="1-2">分类管理</el-menu-item>
			</el-submenu>
			</el-menu>
		</el-col>
		
		<el-col :span='19' class="panel-center-right">
			<!-- <el-row>
				<el-col :span='24' class="breadcrumb">
					<el-breadcrumb separator="/" style="float:right">
						<el-breadcrumb-item>{{}}</el-breadcrumb-item>
						<el-breadcrumb-item>{{}}</el-breadcrumb-item>
					</el-breadcrumb>
				</el-col>
			</el-row> -->
			<router-view></router-view>
		</el-col>
	</el-row>
  </el-row>
</template>

<script>
export default {
  methods: {
    toArticleList () {
      this.$router.push({path: '/admin/articlelist'})
    },
    toClassifyList () {
      this.$router.push({path: '/admin/classifylist'})
    },
    toindex () {
      this.$router.push({path: '/'})
    },
    logout () {
      this.$store.dispatch('UserLogout')
    }
  }
}
</script>

<style>
	.panel{
		position: absolute;
		top: 0;
		bottom: 0;
		width: 100%;}
	.top{
		height: 60px;
		line-height: 60px;
		background: #1F2D3D;
	}
	.rightbar{
		text-align: right;
	}
	.panel-center{
		/*position: absolute;*/
		/*width: 100%;*/
	}
	.el-menu-vertical-demo{
		height: 610px;
	}
	.panel-center-right{
		padding: 30px;
	}
	.breadcrumb{
		margin-bottom: 15px;
	}
</style>
