<template>
<div class="wrapper">
<bhead></bhead>
<router-view class="content"></router-view>
<bfoot></bfoot>
</div>
</template>

<script>
	import bhead from './bhead'
	import bfoot from './bfoot'

	export default{

  components: {
    bhead,
    bfoot
  }
}
</script>

<style scoped>
	.wrapper{
		display: flex;
		flex-direction: column;
		height: 100%;
	}
	.content{
		width: 80%;
		max-width: 800px;
		padding: 2rem auto;
		min-height: 17rem;
	}
	@media screen and (max-width: 480px){
		.content{
			width: 100%;
			padding: 1rem auto;
		}
	}
</style>
