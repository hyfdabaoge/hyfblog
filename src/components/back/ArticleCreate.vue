<template>
	<el-row>
		<el-col :span="24">
			<el-form >
				<el-row style="">
					<el-col :span='10' :push="1">
						<el-form-item label="文章标题" label-width="90px">
							<el-input placeholder="请输入标题" v-model="article.title"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span='10' :push="3">
						<el-form-item label="所属分类" label-width="90px">
							<el-select placeholder="请选择分类" v-model="article.classify">
								<el-option v-for="item in classlists" :label="item.classname" :value="item.classname" :key="item.value"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span='12'>
						<el-form-item prop="content">
							<!-- <el-input type="textarea" v-model="article.content" placeholder="请输入文章" :rows="25"></el-input> -->
              <textarea rows="27" style="width: 100%" v-model="article.content" placeholder="请输入文章"></textarea>
						</el-form-item>
					</el-col>
					<el-col :span='12'>
						<div style="background:#EFF2F7;height:410px;margin-left:20px;overflow-y:auto" v-html='markedToHtml'></div>
					</el-col>
				</el-row>
				<el-form-item>
					<el-button @click="saveArticle">发布</el-button>
					<el-button>取消</el-button>
				</el-form-item>
			</el-form>
		</el-col>
	</el-row>
</template>

<script>
import marked from 'marked'
import hlj from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
import api from '../../api'
export default {
  data () {
    return {
      article: {
        classify: '', // 文章所属分类
        title: '', // 文章标题
        content: '' // 文章内容
      },
      classlists: []
    }
  },
  methods: {
    getLists () {
      setInterval(() => {
        // this.$http.get('/api/classify/list')
        api.getClassifyList()
        .then((response) => {
          this.classlists = response.data
        })
      }, 500)
    },
    saveArticle () {
      // this.$http.post('/api/article/save', {ARTICLE: this.article})
      api.saveArticle({ARTICLE: this.article})
      .then((data) => {
        console.log(data)
      })
      .catch(err => console.log(err))
      this.$router.push({path: '/admin/articlelist'})
    }
  },
  computed: {
    markedToHtml () {
      marked.setOptions({
        highlight: function (code) {
          return hlj.highlightAuto(code).value
        }
      })
      return marked(this.article.content)
    }
  },
  mounted () {
    this.getLists()
  }
}
</script>

<style>
	
</style>
