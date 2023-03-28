var chartConfig = {
  autosize: true, // 图表是否应使用窗格中的所有可用空间，并在调整窗格本身大小时自动调整大小。
  fullscreen: false, // 是否占用窗口中所有可用的空间, 等于视口的全部高宽
  timezone: "Asia/Shanghai", // 时区
  container_id: "chart", // 挂载的DOM的id
  datafeed: new FeedBase(), // datafeed
  library_path: "charting_library/", // static目录路径
  custom_css_url: 'bundles/new.css', // 自定义样式文件
  loading_screen: { // 定制加载进度条
    "backgroundColor": style.bg,
    "foregroundColor": "#5d7d93"
  },
  theme: 'Dark', // 主题
  toolbar_bg: "transparent", // 工具栏背景色
  // 禁用的功能, 参考 https://tradingview.gitee.io/featuresets/
  disabled_features: [
    'border_around_the_chart', // 图表周围的边框
    'widget_logo', // logo
    "left_toolbar", // 左侧工具栏
    'compare_symbol',
    'display_market_status', // 禁用行情状态
    'go_to_date',
    'snapshot_trading_drawings',
    'symbol_info',
    'symbol_search_hot_key',
    'pane_context_menu', // 图表右键菜单
    // 头部
    "header_symbol_search", // 搜索
    'header_saveload', // 上传下载按钮, 
    "header_chart_type", // 图标类型按钮
    "header_undo_redo", // 左右箭头
    "header_screenshot", // 照相机按钮
    "header_resolutions", // 头部分辨率
    "header_compare",  //compare
    'header_interval_dialog_button',
    "header_settings", // 设置按钮
    "header_fullscreen_button", //全屏
    // 'header_indicators', // 技术指标

    "timeframes_toolbar", // 底部时间栏目
    "volume_force_overlay", // k线和volume重合
    'show_interval_dialog_on_key_press',
    'show_hide_button_in_legend',
    "legend_context_menu",
    "edit_buttons_in_legend",
    "control_bar", // 底部控制栏
    // 'dont_show_boolean_study_arguments',
    "save_chart_properties_to_local_storage",
    "use_localstorage_for_settings",
    "display_market_status",
    "border_around_the_chart", //边框环绕
  ],
  // 启用的功能
  enabled_features: [
    // 'remove_library_container_border', // 去除图标库容器的边框
    // 'header_widget_dom_node', // 顶部dom
    'move_logo_to_main_pane', // 去除logo
    'dont_show_boolean_study_arguments',
    'hide_last_na_study_output',
    'same_data_requery',
    // 'side_toolbar_in_fullscreen_mode',
    'disable_resolution_rebuild',
    // "study_templates" // 指标模板
  ],
  studies_overrides: { // 自定义默认指标的样式和输入值
    "volume.volume.color.0": style.down,  //第一根的颜色, 降
    "volume.volume.color.1": style.up,  //第二根的颜色， 升
    // "volume.precision": 0, // 小数精准度
    "volume.volume.transparency": 0.7, // 透明度
    // "volume.show ma": true,
    // "volume.volume.ma.transparency": 20,
    // "volume.volume ma.linewidth": 1,
    // "bollinger bands.median.color": "#33FF88",
    // "bollinger bands.upper.linewidth": 7
  },
  // 覆盖图表插件的默认样式
  overrides: {
    // 销量面板尺寸，支持的值: large, medium, small, tiny
    'volumePaneSize': "medium",
    // 刻度样式
    "scalesProperties.lineColor": style.bg,
    "scalesProperties.textColor": style.text,
    // 图标边距
    'paneProperties.topMargin': '20', // 图表上边距
    "paneProperties.background": style.bg, // 图标背景色
    "paneProperties.vertGridProperties.color": style.grid, // 网格颜色
    "paneProperties.horzGridProperties.color": style.grid, // 网格颜色
    "paneProperties.crossHairProperties.color": style.cross,
    // 图标左上角图例
    "paneProperties.legendProperties.showLegend": false, // 默认显示MA
    "paneProperties.legendProperties.showStudyArguments": true, // MA的参数
    "paneProperties.legendProperties.showStudyTitles": true, // MA的标题
    "paneProperties.legendProperties.showStudyValues": true, // MA的值
    "paneProperties.legendProperties.showSeriesTitle": true, // 当前商品标题
    "paneProperties.legendProperties.showSeriesOHLC": true, // 显示开盘/最高/最低
    // K线图样式
    "mainSeriesProperties.candleStyle.upColor": style.up,
    "mainSeriesProperties.candleStyle.downColor": style.down,
    "mainSeriesProperties.candleStyle.drawWick": true,
    "mainSeriesProperties.candleStyle.drawBorder": true, // 边框
    "mainSeriesProperties.candleStyle.borderColor": style.border,
    "mainSeriesProperties.candleStyle.borderUpColor": style.up,
    "mainSeriesProperties.candleStyle.borderDownColor": style.down,
    "mainSeriesProperties.candleStyle.wickUpColor": style.up,
    "mainSeriesProperties.candleStyle.wickDownColor": style.down,
    "mainSeriesProperties.candleStyle.barColorsOnPrevClose": false,
    // 空心K线图样式
    "mainSeriesProperties.hollowCandleStyle.upColor": style.up,
    "mainSeriesProperties.hollowCandleStyle.downColor": style.down,
    "mainSeriesProperties.hollowCandleStyle.drawWick": true,
    "mainSeriesProperties.hollowCandleStyle.drawBorder": true,
    "mainSeriesProperties.hollowCandleStyle.borderColor": style.border,
    "mainSeriesProperties.hollowCandleStyle.borderUpColor": style.up,
    "mainSeriesProperties.hollowCandleStyle.borderDownColor": style.down,
    "mainSeriesProperties.hollowCandleStyle.wickColor": style.line,
    // 平均K线图样式
    "mainSeriesProperties.haStyle.upColor": style.up,
    "mainSeriesProperties.haStyle.downColor": style.down,
    "mainSeriesProperties.haStyle.drawWick": true,
    "mainSeriesProperties.haStyle.drawBorder": true,
    "mainSeriesProperties.haStyle.borderColor": style.border,
    "mainSeriesProperties.haStyle.borderUpColor": style.up,
    "mainSeriesProperties.haStyle.borderDownColor": style.down,
    "mainSeriesProperties.haStyle.wickColor": style.border,
    "mainSeriesProperties.haStyle.barColorsOnPrevClose": false,
    // 美国线样式
    "mainSeriesProperties.barStyle.upColor": style.up,
    "mainSeriesProperties.barStyle.downColor": style.down,
    "mainSeriesProperties.barStyle.barColorsOnPrevClose": false,
    "mainSeriesProperties.barStyle.dontDrawOpen": false,
    // 线形图样式
    "mainSeriesProperties.lineStyle.color": style.border,
    "mainSeriesProperties.lineStyle.linewidth": 1,
    "mainSeriesProperties.lineStyle.priceSource": "close",
    // 面积图样式
    "mainSeriesProperties.areaStyle.color1": style.areatop,
    "mainSeriesProperties.areaStyle.color2": style.areadown,
    "mainSeriesProperties.areaStyle.linecolor": style.border,
    "mainSeriesProperties.areaStyle.linewidth": 1,
    "mainSeriesProperties.areaStyle.priceSource": "close",
  }
}
