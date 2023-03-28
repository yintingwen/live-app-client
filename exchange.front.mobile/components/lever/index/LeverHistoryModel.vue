<template>
    <view>
        <view class="history-model">
            <view v-if="actionIndex === 0 && putOrderBool" class="orders">
                <view
                @tap="onEntrustWaiting()"
                :class="['waiting', {'orders-action': entrustModel}]"
                >{{ $t('lever.entrust.model.entrusting') }}</view>
                <view
                @tap="onEntrustCancel()"
                :class="{'orders-action': !entrustModel}"
                >{{ $t('lever.entrust.model.canceled') }}</view>
            </view>
            <view v-if="actionIndex === 0 && !putOrderBool" class="orders">
                <!-- <view :class="['waiting', 'orders-action']">{{ $t('lever.entrust.model.allCanceled') }}</view> -->
            </view>
            <view
                v-if="actionIndex === 1"
                @tap="onOnceStorage()"
                class="storage"
            >{{ $t('lever.entrust.model.onceFlatStorage') }}</view>
            <view v-if="actionIndex === 2" @tap="onTime" class="history">
                <view class="mr-10">{{ $t('lever.entrust.model.time') }}</view>
                <c-icon name="up" size="12" class="c-text" />
            </view>
        </view>

        <!-- 一键平仓弹窗 -->
        <c-confirm
            ref="flatAllPop"
            @confirm="flatAllPopConfirm" >
            {{ $t('lever.entrust.pop.onceFlatStorage') }}
        </c-confirm>
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
        putOrderBool: {
            default() {
                return true
            }
        }
    },
    data () {
        return {
            entrustModel: true,
        }
    },
    methods: {
        // 点击 委托中
        onEntrustWaiting() {
            this.entrustModel = true
            this.$emit('onHistoryTitle', 'entrusting')
        },
        // 点击 已取消
        onEntrustCancel() {
            this.entrustModel = false
            this.$emit('onHistoryTitle', 'cancel')
        },
        // 点击 一键平仓
        onOnceStorage() {
            this.$refs.flatAllPop.open()
        },
        // 点击 时间 进行排序
        onTime() {
            this.$emit('onTime')
        },
         // 点击 一键平仓 确定
        flatAllPopConfirm() {
            this.$emit('onOnceFlatStorage')
        },
    }
}
</script>

<style lang="scss" scoped>
.history-model {
    display: flex;
    justify-content: flex-end;
    background-color: #f5f5f5;
    padding-right: 30rpx;
    .orders {
        display: flex;
        justify-content: flex-end;
        font-size: 30rpx;
        height: 48rpx;
        align-items: center;
        & > view {
            font-size: 30rpx;
        }
        .waiting {
            margin-right: 38rpx;
        }
        .orders-action {
            color: #4f5cd1;
        }
    }
    .storage {
        font-size: 30rpx;
        color: #4f5cd1;
        height: 48rpx;
        line-height: 48rpx;
    }
    .history {
        font-size: 30rpx;
        display: flex;
        align-items: center;
        height: 48rpx;
    }
}
</style>