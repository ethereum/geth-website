import { getKebabCaseFromName } from './';

const check = '{#';

export const parseHeadingId = (children: string[]) => {
  const lastChild = children[children.length - 1];
  const split = lastChild.split(check);
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
  return {
    children,
    title: split[0].replaceAll('#', ''),
    headingId: getKebabCaseFromName(split[0])
  };
};
