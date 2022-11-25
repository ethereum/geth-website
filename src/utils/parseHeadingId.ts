const check = '{# '

export const parseHeadingId = (children: string[]) => {
  if (children[children.length-1].includes(check)) {
    const temp = children[children.length-1].split(check)
    const heading = temp[temp.length-1].split('}')[0]

    // const headingIndex = children.findIndex(item => {
    //   if (typeof item === 'string') {
    //     return item.includes('{# ')
    //   }
    //   return false
    // })

    return {
      children,
      title: heading,
      headingId: heading.split(' ').join('-')
    }
  }

  return null
}