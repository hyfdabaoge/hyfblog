<template>
	<el-row>
		<el-row style="margin-bottom:15px">
			<el-col :span="24">
				<el-button size="small" type="primary" @click="createArticle">新建文章</el-button>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span='24'>
				<!-- <el-table :data="articleLists">
					<el-table-column type='index'></el-table-column>
					<el-table-column label="创建时间"></el-table-column>
					<el-table-column label="分类"></el-table-column>
					<el-table-column label="标题"></el-table-column>
					<el-table-column label="操作">
						<template scope='scope'>
							<el-button size="small">查看</el-button>
							<el-button size="small" type='primary'>编辑</el-button>
							<el-button size="small" type='danger'>删除</el-button>
						</template>
					</el-table-column>
				</el-table> -->
			    <el-row class="article_list_title">
                  <el-col :span="3">序号</el-col>
                  <el-col :span="5">分类</el-col>
                  <el-col :span="5">标题</el-col>
                  <el-col :span="6">时间</el-col>
                  <el-col :span="5">操作</el-col>
                </el-row>
                <li v-for="(item, index) in articlelists" class="article_list_item" style="list-style: none;">
                  <span class="num">{{index+1}}</span>
                  <span class="ca">{{item.classify}}</span>
                  <span class="tit">{{item.title}}</span>
                  <span class="ct">{{item.create_at}}</span>
                  <el-button type="primary" size="small" @click.native="getdetail(index)">查看</el-button>
                  <el-button type="success" size="small" @click="editarticle(index)">编辑</el-button>
                  <el-button type="danger" size="small" @click="delarticle(index)">删除</el-button>
                </li>
			</el-col>
		</el-row>
		<el-row class="page">
      <el-col :span="24" >
          <el-pagination layout="sizes,prev,pager,next" @current-change="handleCurrentChange" :total="total" :page-size="limit"></el-pagination>
      </el-col>
    </el-row>
	</el-row>
</template>

<script>
import api from '../../api'
export default {
  data () {
    return {
      articlelists: [],
      total: 100,
      page: 1,
      limit: 10
    }
  },
  methods: {
    getLists () {
      setInterval(() => {
        // this.$http.post('/api/article/list', {page: this.page, limit: this.limit}).then((response) => {
        //   this.articlelists = response.data
        // })
        api.getArticleList({page: this.page, limit: this.limit})
        .then((response) => {
          this.articlelists = response.data
        })
      }, 200)
    },
    createArticle () {
      this.$router.push({path: '/admin/articleCreate'})
    },
    delarticle (index) {
      // this.$http.post('/api/article/del', {_id: this.articlelists[index]._id})
      // .then((data) => {
      //   console.log(data)
      // })
      api.delArticle({_id: this.articlelists[index]._id})
      .then((response) => {
        console.log(response)
      })
      .catch(err => console.log(err))
    },
    editarticle (index) {
      var id = this.articlelists[index]._id
      this.$router.push({path: `/admin/articleedit/${id}`})
    },
    getdetail (index) {
      var id = this.articlelists[index]._id
      this.$router.push({path: `/details/${id}`})
    },
    handleCurrentChange (val) {
      this.page = val
      this.getLists()
    }
  },
  mounted () {
    this.getLists()
  }
}
</script>

<style scoped>
	.article_list_title{
	    background: #EEF1F6;
        height: 40px;
        line-height: 40px;
        padding-left: 40px;
	}
	.article_list_item{
	    height: 35px;
        line-height: 35px;
        padding-bottom: 5px;
        border-bottom: 1px solid #BEBEBE;
	}
	.num{
        width: 100px;
        display: inline-block;
        text-align: center;
    }
    .ca{
        width: 100px;
        margin-right: 40px;
        margin-left: 15px;
        display: inline-block;
        text-align: center;
    }
    .tit{
    	margin-right: 30px;
    	width: 200px;
    	display: inline-block;
    	text-align: center;
    }
    .ct{
    	margin-right: 50px;
    }
    .page{
      position: absolute;
      top: 520px;
      right: 20px;
    }
</style>
