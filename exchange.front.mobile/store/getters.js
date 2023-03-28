export default {
  appLogo (state) {
    const logo = state.settings.find(item => item.key === 'mobile_logo_url')
    return logo ? logo.value : ''
  }
}