<!-- <template>
	<el-row>
		<el-col :span="24">
			<el-form>
				<el-row>
					<el-col :span='10' >
						<el-form-item label="文章标题" prop="title">
							<el-input placeholder="请输入标题" v-model="article.title"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span='10' >
						<el-form-item label="所属分类" >
							<el-select placeholder="请选择分类" v-model="article.classify">
								<el-option ></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span='12'>
						<el-form-item prop="content">
							<el-input type="textarea" :rows="25" placeholder="请输入文章" v-model="article.content"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span='12'>
						<div style="background:#EFF2F7;height:410px;margin-left:20px;overflow-y:auto" v-html='markedToHtml'></div>
					</el-col>
				</el-row>
				<el-form-item>
					<el-button>更新</el-button>
					<el-button>返回</el-button>
				</el-form-item>
			</el-form>
		</el-col>
	</el-row>
</template>

<script>
import marked from 'marked'
import hlj from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'

export default {
  data () {
    return {
      article: {
        title: '',
        classify: '',
        content: ''
      }
    }
  },
  method: {
    getinfo () {
      this.$http.post('/api/article/getone', {_id: this.$route.params.id})
      .then((response) => {
        this.article.title = response.title
        this.article.classify = response.classify
        this.article.content = response.content
      })
      .catch(err => console.log(err))
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
    this.getinfo()
  }
}
</script>

<style>
	
</style>
 -->

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
							<!-- <el-input type="textarea" v-model="article.content" :rows="25" placeholder="请输入文章" ></el-input> -->
              <textarea rows="27" style="width: 100%" v-model="article.content" placeholder="请输入文章"></textarea>
						</el-form-item>
					</el-col>
					<el-col :span='12'>
						<div style="background:#EFF2F7;height:410px;margin-left:20px;overflow-y:auto" v-html='markedToHtml'></div>
					</el-col>
				</el-row>
				<el-form-item>
					<el-button @click="editArticle">发布</el-button>
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
        _id: '',
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
    delarticle (index) {
      // this.$http.post('/api/article/del', {_id: index})
      api.delArticle({_id: index})
      .then((data) => {
        console.log(data)
      })
      .catch(err => console.log(err))
    },
    editArticle () {
      this.article._id = this.$route.params.id
      var obj = {
        _id: this.article._id,
        title: this.article.title,
        content: this.article.content,
        classify: this.article.classify
      }
      // this.$http.post('/api/article/edit', {ARTICLE: obj})
      api.editArticle({ARTICLE: obj})
      .then((data) => {
        console.log(data)
      })
      .catch(err => console.log(err))
      this.$router.push({path: '/admin/articlelist'})
      this.delarticle(this.article._id)
    },
    getinfo () {
      // this.$http.post('/api/article/getone', {_id: this.$route.params.id})
      api.getOne({_id: this.$route.params.id})
      .then((response) => {
        this.article.title = response.data.title
        this.article.classify = response.data.classify
        this.article.content = response.data.content
      })
      .catch(err => console.log(err))
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
    this.getinfo()
  }
}
</script>

<style>
	
</style>
