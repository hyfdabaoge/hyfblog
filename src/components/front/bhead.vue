<template>
	<header>
		<div class="bg"></div>
		<nav>
			<ul>
				<li><router-link to="/main">主页</router-link></li>
				<li><router-link to="/tags">标签</router-link></li>
				<li><router-link to="/about">关于</router-link></li>
				<li><router-link to="/login">管理员登录</router-link></li>
			</ul>
		</nav>
		<section class="home_title">
			<transition name="fade">
				<h1 v-if="show_headline">{{finalheadline}}</h1>
			</transition>
		</section>
	</header>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data () {
    return {
      finalheadline: '',
      show_headline: true
    }
  },
  computed: mapState(['headline']),
  watch: {
    headline: function (val) {
      this.show_headline = false
      setTimeout(() => {
        this.show_headline = true
        this.finalheadline = val
      }, 200)
    }
  }
}
</script>

<style scoped>
	.fade-enter-active,.fade-leave-active{
		transition: all .5s;
	}
	.fade-enter,.fade-leave-active{
		opacity: 0;
	}
	header{
		height: 20rem;
		display: flex;
		flex-direction: column;
	}
	.bg{
		height: 20rem;
		width: 100%;
		background: url("../../assets/1006577.jpg") no-repeat center /cover;
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
	}
	nav ul{
		display: flex;
		justify-content: flex-end;
		list-style: none;
		cursor: default;
	}
	nav a{
		font-size: 1rem;
		color: #000;
		display: block;
		padding: 0.5rem 0.5rem;
		margin: 0 0.7rem;
		text-decoration: none;
	}
	
	.home_title{
		display: flex;
		color: #000;
		margin: auto;

	}
	.home_title h1{
		font-size: 4rem;
		font-weight: 400;
	}
	@media screen and (max-width: 768px){
		header,.bg{
			height: 24rem;
		}
		.home_title h1{
			font-size: 2.6rem;
		}
	}
	@media screen and (max-width: 480px){
		header,.bg{
			height: 25rem;
		}
		nav a{
			font-size: 1.2rem;
		}
	}
</style>
