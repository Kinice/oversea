<template>
	<nv-head></nv-head>
	<div class="g-bd">
		<div class="g-side">
			<side-nav></side-nav>
		</div>
		<div class="g-main">
			<router-view keep-alive></router-view>
		</div>
	</div>
</template>
<script>
	export default {
		data (){
			return {
				
			}
		},
		components: {
			'nvHead': require('../components/Header.vue'),
			'sideNav': require('../components/SideNav.vue'),
		}
	}
</script>
<style lang="less">
    
</style>