<template>
	<nav class="m-nav">
		<ul class="nav-wrap">
			<li class="nav-li">
				<a v-link="{name: 'pandect'}"><i class="fa fa-binoculars"></i><span>总览</span></a>
			</li>
			<li class="nav-li">
				<a v-link="{name: 'stat'}"><i class="fa fa-signal"></i><span>统计信息</span><i class="fa fa-angle-left arrow"></i></a>
				<div class="subnav">
					<a class="subnav-item" v-link="{name:'school'}"><i class="fa fa-circle-o"></i><span>机构统计</span></a>
				</div>
			</li>
		</ul>
	</nav>
</template>
<script>
	export default{
		data (){
			return {
				
			}
		}
	}
</script>
<style lang="less">
	@import '~assets/less/var.less';
	.m-nav{
		.nav-wrap{
			.nav-li{
				border-bottom: 1px solid @borderColor;
				> a{
					display: block;
					padding: 8px 20px;
					line-height: 32px;
					font-size: 14px;
					cursor: pointer;
					text-decoration: none;
					> i{
						margin-right: 5px;
						color:#49AF49;
					}
					.arrow{
						float: right;
						margin-top: 9px;
						transition: all .5s ease;
					}
					&.selected{
						background-color: #f9f9f9;
						.arrow{
							transform: rotateZ(-90deg);
						}
						~ .subnav{
							height: auto;
						}
					}

				}
				.subnav{
					height: 0;
					transition: all .5s ease;
					overflow: hidden;
					.subnav-item{
						display: block;
						padding: 8px 20px 8px 40px;
						line-height: 24px;
						font-size: 12px;
						cursor: pointer;
						text-decoration: none;
						&.selected{
							background-color: #fff;
						}
						> i{
							margin-right: 5px;
							color:#49AF49;
						}
					}
				}
			}
		}
	}
</style>