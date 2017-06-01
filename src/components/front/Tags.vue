<template>
  <div class="tags_wrap">
    <ul class="tags_list">
      <li v-for='(item,index) in classlists' class="classitem">
      <!-- <a class="tag_btn">{{item.classify}}</a> -->
        <el-button type="primary" size="small" @click.prevent="getcon(item.classname)">{{item.classname}}</el-button>
      </li>
    </ul>
    <transition-group name='fade'>
      <article v-for='item in articlelists' v-if='show' :key="item._id" class="tags">
        <header>
          <div>
            <router-link class="tags_title" :to="{path:`/details/${item._id}`}">{{item.title}}</router-link>
          </div>
          <div>
            <p class="tags_createat">{{item.create_at}}</p>
          </div>
        </header>
        <section class="tags_con">{{item.content}}</section>
        <footer>
          <router-link class="tags_readmore" :to="{path: `/details/${item._id}`}">阅读全文>></router-link>
        </footer>
      </article>
    </transition-group>
  </div>
</template>

<script>
import api from '../../api'
export default {
  data () {
    return {
      classlists: [],
      articlelists: [],
      show: false
    }
  },
  methods: {
    getclassify () {
      api.getClassifyLists()
        .then((response) => {
          this.classlists = response.data
        })
      .catch(err => console.log(err))
    },
    getcon (ca) {
      this.show = false
      // this.$http.post('/api/article/bytag', {ClassName: ca})
      api.getconbyclassify({ClassName: ca})
      .then((response) => {
        console.log(response.data)
        this.articlelists = response.data
        this.show = true
      })
      .catch(err => console.log(err))
    }
  },
  mounted () {
    this.getclassify()
  }
}
</script>

<style scoped>
.tags_wrap{
	margin: 0 auto;
  padding: 20px 10px;
}
.classitem{
	list-style: none;
	margin: 0.2rem 0.5rem;
}
.tags_list{
    display: flex;
    width: 50rem;
    flex-flow: row wrap;
    padding-left: 0px;
    margin-top: 10px;
    margin-bottom: 20px;
}
.tags{
	margin-left: 0.5rem;
}
.tags_title,.tags_readmore{
	text-decoration: none;
}
.tags_title{
	font-size: 1.6rem;
    color: #666666;
}
.tags_con{
	color: #34495e;
    line-height: 1.5rem;
    padding: 0.6rem 0;
    height: 8.8rem;
    overflow: hidden;
    margin-bottom: 5px;
}
.tags_readmore{
	display: flex;
    justify-content: flex-end;
}
@media screen and (max-width:786px){
    .tags_list{
    	width: 32rem;
    	padding: 0 4.5rem;
    	width: 80%;
    }
}
@media screen and (max-width:480px){
    .tags_list{
        width: 20rem;
        padding: 0 1.8rem;
        width: 90%;
    }
}
</style>
