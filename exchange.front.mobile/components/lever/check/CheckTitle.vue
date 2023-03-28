<template>
    <view class="check-title">
        <view class="title">
            <view
                @tap="onTitle(index)"
                v-for="(title, index) in [$t('lever.entrust.title.putOrder'), $t('lever.entrust.title.handStorage'), $t('lever.entrust.title.flatHistory')]"
                :key="index"
            >
                <view :class="{'title-action': index === actionIndex}">{{ title }}</view>
            </view>
        </view>
        <view class="d-flex jc-center" v-if="actionIndex === 0">
            <view @tap="onWaiting" :class="['put-order', 'mr-60', {'title-action': putOrderBool}]">{{ $t('lever.entrust.model.entrusting') }}</view>
            <view @tap="onCancel" :class="['put-order', {'title-action': !putOrderBool}]">{{ $t('lever.entrust.model.canceled') }}</view>
        </view>
    </view>
</template>

<script>
export default {
    props: {
        actionIndex: {
            default() {
                return 0
            }
        }
    },
    data () {
        return {
            putOrderBool: true      
        }
    },
    methods: {
        // 点击头部 例如: 挂单 持仓 平仓记录
        onTitle(index) {
            switch (index) {
                case 0:
                this.$emit('onTitle', 'putLever')
                break
                case 1:
                this.$emit('onTitle', 'handStorage')
                break
                case 2:
                this.$emit('onTitle', 'flatStorageHt')
                break
            }
        },
        // 点击 委托中
        onWaiting() {
            this.putOrderBool = true
            this.$emit('onHistoryTitle', 'entrusting')
        },
        // 点击 已取消
        onCancel() {
            this.putOrderBool = false
            this.$emit('onHistoryTitle', 'cancel')
        },
    }
}
</script>

<style lang="scss" scoped>
.check-title {
    @extend .fs-md, .c-text;
    padding: 0 86rpx;
    .title {
        display: flex;
        & > view {
            flex: 1;
            height: 79rpx;
            line-height: 79rpx;
            text-align: center;
        }
    }
    .put-order {
        margin-top: 10rpx;
        width: 167rpx;
        height: 79rpx;
        line-height: 79rpx;
        text-align: center;
    }
    .title-action {
        font-size: 28rpx;
        color: #4f5cd1;
        border-bottom: 1rpx solid map-get($colors, "primary");
    }
}
</style>