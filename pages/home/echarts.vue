<template>
	<view class="charts">
		<view class="charts-box">
		    <qiun-data-charts type="column" :chartData="chartData" />
		</view>
		<view class="charts-box">
		    <qiun-data-charts type="pie" :chartData="chartData2" />
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				chartData:{
				  categories: ["hum", "temper","co1", "co2","cir"],
				  series: [{
				    name: "目标值",
				    data: [35, 30, 25, 25, 13, 2]
				  }]
				},
				chartData2:{
				  series: [{
				    data: [
				      {
				        name: "一",
				        value: 50
				      }, {
				        name: "二",
				        value: 30
				      }, {
				        name: "三",
				        value: 20
				      }, {
				        name: "四",
				        value: 18
				      }, {
				        name: "五",
				        value: 8
				      }
				    ]
				  }]
				}
			}
		},
	}
</script>

<style lang="scss">
	.charts{
		.charts-box{
			width: 600rpx;
			height: 600rpx;
			margin: 20rpx auto;
		}
	}
</style>

