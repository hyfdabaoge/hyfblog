<template>
  <article class="f_det_wrap">
    <header>
      <div class="f_tit">{{Article.title}}</div>
      <p class="f_ct">{{Article.create_at}}</p>
    </header>
    <section class="f_det">{{Article.content}}</section>
  </article>
</template>

<script>
export default {
  data () {
    return {
      Article: {
        title: '',
        create_at: '',
        content: ''
      }
    }
  },
  methods: {
    getdet () {
      this.$http.post('/api/article/getone', {_id: this.$route.params.id})
      .then((response) => {
        this.Article.title = response.data.title
        this.Article.create_at = response.data.create_at
        this.Article.content = response.data.content
        console.log(response)
      })
      .catch(err => console.log(err))
    }
  },
  mounted () {
    this.getdet()
  }
}
</script>

<style>
  .f_det_wrap{
    margin: 0 auto;
    padding: 20px 10px;
  }
  .f_tit{
    font-size: 1.6rem;
  }
  .f_tit,.f_ct{
    display: flex;
    justify-content: center;
  }
  .f_det{
    color: #34495e;
    line-height: 1.6rem;
    padding: 0.6rem 0;
  }
</style>
