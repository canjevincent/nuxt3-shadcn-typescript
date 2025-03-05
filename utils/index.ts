export const getResourceName = (resourceUrl: string) => {
  return resourceUrl.split('.')[resourceUrl.split('.').length - 2].split('/').pop()
}

export const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});