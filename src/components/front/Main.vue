<template>
	<div class="main_wrapper">
		<article v-for='item in articlelists' class="onearticle">
			<header>
				<div>
					<router-link class="main_tit" :to="{path:`/details/${item._id}`}">{{item.title}}</router-link>
				</div>
				<div>
					<p>{{item.create_at}}</p>
				</div>
			</header>	
			<section class="main_con">{{item.content}}</section>
			<footer>
				<router-link class="readmore" :to="{path: `/details/${item._id}`}">阅读全文>></router-link>
			</footer>		
		</article>
		<footer class="loadMore"></footer>
	</div>
</template>

<script>
import api from '../../api'
export default {
  data () {
    return {
      articlelists: [],
      page: 1,
      limit: 6
    }
  },
  methods: {
    loadData () {
      setTimeout(() => {
        // this.$http.get('/api/article/list').then((response) => {
        //   this.articlelists = response.data
        // })
        api.getArticleLists()
        .then((response) => {
          this.articlelists = response.data
        })
      }, 500)
    }
  },
  mounted () {
    this.loadData()
  }
}
</script>

<style scoped>
  .main_wrapper{
  	margin: 0 auto;
  	padding: 20px 10px;
  }
  .main_con{
    color: #34495e;
    line-height: 1.5rem;
    padding: 0.6rem 0;
    height: 8.8rem;
    overflow: hidden;
    margin-bottom: 5px;
  }
  .main_tit{
  	text-decoration: none;
  	font-size: 1.6rem;
  }
  .main_wrapper p{
  }
  .onearticle{
  	margin-bottom: 10px;
  }
  .readmore{
    text-decoration: none;
    display: flex;
    justify-content: flex-end;
  }
</style>
