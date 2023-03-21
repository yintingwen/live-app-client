const plugins = import.meta.glob('./*.js', { eager: true, import: 'default' })

export default (app) => {
  Object.values(plugins).forEach(plugin => plugin(app))
}

