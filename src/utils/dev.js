export async function log (type, data, model) {
  if (import.meta.env.DEV) {
    console.log(`log:${type} -----------------------------------------------------------------------`)
    console.log(data)
    model && await uni.showModal({
      title: 'log',
      content: JSON.stringify(data)
    })
  }
}