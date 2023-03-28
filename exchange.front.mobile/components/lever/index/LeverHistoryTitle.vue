<template>
        <view class="history-title">
            <view
                @tap="onTitle(index)"
                class="title"
                v-for="(title, index) in [$t('lever.entrust.title.putOrder'), $t('lever.entrust.title.handStorage'), $t('lever.entrust.title.flatHistory')]"
                :key="index">
                <view :class="{'title-action': index === actionIndex}">{{ title }}</view>
                <text
                :class="['underline', 
                {'underline-last': index === 2},
                {'underline-action': index === actionIndex}]" />
            </view>
            <view class="ml-30 d-flex flex-center" @tap="onBtn">
                <view class="btn">
                    <view  :style="{backgroundColor: ( isShow === 1 ? '#4f5cd1' : '')}" />
                </view>
                {{ $t('lever.entrust.title.showAll') }}
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
        },
        isShow: {
            default() {
                return 1
            }
        }
    },
    methods: {
        // 点击头部 例如: 挂单 持仓 平仓记录
        onTitle(index) {
            switch (index) {
                case 0:
                this.$emit('onHistoryTitle', 'putLever')
                break
                case 1:
                this.$emit('onHistoryTitle', 'handStorage')
                break
                case 2:
                this.$emit('onHistoryTitle', 'flatStorageHt')
                break
            }
        },
        // 点击显示 所有交易对 / 单个交易对 信息
        onBtn() {
            this.$emit('onHistoryTitle', 'showAll')
        }
    }
}
</script>

<style lang="scss" scoped>
.history-title {
    @extend .fs-xs, .c-text;
    display: flex;
    justify-content: flex-start;
    padding-left: 27rpx;
    border-top: 16rpx solid #f5f5f5;
    .title {
        position: relative;
				font-size: 28rpx;
        height: 79rpx;
        line-height: 79rpx;
        margin-right: 93rpx;
    }
    .underline {
        @include size(40, 4);
        display: block;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 0);
    }
    .title-action {
        color: #4f5cd1;
    }
    .underline-action {
        background-color: #4f5cd1;
    }
    .underline-last {
        width: 100rpx;
    }
    .btn {
        @include size(30, 30);
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 14rpx 10rpx 15rpx 10rpx;
        border: 4rpx solid #4f5cd1;
        // background-color: #4f5cd1;
        border-radius: 50%;

        & > view {
            @include size(10, 10);
            border-radius: 50%;
        }
    }
}
</style>