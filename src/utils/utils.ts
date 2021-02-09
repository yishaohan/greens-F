/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

export const isAntDesignPro = (): boolean => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }
  return window.location.hostname === 'preview.pro.ant.design';
};

// 生成权限树
export const generatorAuthTree = (auths: API.AuthListItem[]) => {
  const tree: API.AuthListItem[] = [];
  auths.forEach((outItem: API.AuthListItem) => {
    if (outItem.authGrade === 1) {
      // eslint-disable-next-line no-param-reassign
      outItem.children = [];
      tree.push(outItem);
    }
    auths.forEach((inItem) => {
      if (outItem.id === inItem.parentId) {
        outItem.children.push(inItem);
      }
    });
  });
  return tree;
};

// 给官方演示站点用，用于关闭真实开发环境不需要使用的特性
export const isAntDesignProOrDev = (): boolean => {
  const { NODE_ENV } = process.env;
  if (NODE_ENV === 'development') {
    return true;
  }
  return isAntDesignPro();
};
