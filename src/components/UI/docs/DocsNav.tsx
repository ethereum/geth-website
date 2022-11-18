import { FC } from 'react';

interface Props {
  paths: string[];
}

const makeTree = (paths: string[]) => {
  // TODO: typing
  const base: { children: any[] } = { children: [] };

  for (const path of paths) {
    const slugs = path.match(/\/[^\/]+/g);
    let curr = base;

    for (let idx in slugs) {
      const currPath = slugs.slice(0, Number(idx) + 1).join('');
      const child = curr.children.find(node => node.path === currPath);

      if (child) {
        curr = child;
      } else {
        curr.children.push({
          path: currPath,
          children: [],
          title: slugs[Number(idx)].substring(1)
        });
        curr = curr.children[curr.children.length - 1];
      }
    }
  }

  return base.children;
};

export const DocsNav: FC<Props> = ({ paths }) => {
  return <p>Test</p>;
};
