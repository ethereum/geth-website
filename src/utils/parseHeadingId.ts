const check = '{#';

const nameToKebabCase = (name: string): string =>
  name
    .replace(/[#]/g, '')
    .trim()
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^a-z0-9-]/g, '');

export const parseHeadingId = (children: string[]) => {
  const lastChild = children[children.length - 1];
  const split = children[children.length - 1].split(check);
  if (lastChild.includes(check)) {
    const headingId = split[split.length - 1].split('}')[0];
    const newChildren = [...children];
    newChildren[newChildren.length - 1] = split[0];
    return {
      children: newChildren,
      title: split[0].replaceAll('#', ''),
      headingId
    };
  }
  return { children, title: split[0].replaceAll('#', ''), headingId: nameToKebabCase(split[0]) };
};
