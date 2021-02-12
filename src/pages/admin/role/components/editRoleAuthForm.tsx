import React, { useState, useEffect } from 'react';
import { message, Modal, Tree } from 'antd';
// import {useIntl} from 'umi';
import { getAuths } from '../../auth/services/authList';
import { updateRoleAuths } from '../services/roleList';
import { generatorAuthTree } from '@/utils/utils';

interface EditRoleAuthFormProps {
  modalVisible: boolean;
  onCancel: () => void;
  currentEditRole: API.RoleListItem;
}

interface DataNode {
  title: string;
  key: number;
  isLeaf?: boolean;
  children?: DataNode[];
}

const EditRoleAuthForm: React.FC<EditRoleAuthFormProps> = (props) => {
  const { modalVisible, onCancel, currentEditRole } = props;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [auths, setAuths] = useState<DataNode[]>([]);
  const [defaultCheckedKeys, setDefaultCheckedKeys] = useState<number[]>([]);
  const [currentCheckedKeys, setCurrentCheckedKeys] = useState<number[]>([]);
  const [defaultExpandedKeys, setDefaultExpandedKeys] = useState<number[]>([]);
  const [addCheckedKeys, setAddCheckedKeys] = useState<number[]>([]);
  const [removeCheckedKeys, setRemoveCheckedKeys] = useState<number[]>([]);
  // const intl = useIntl();

  const handleSubmit = () => {
    setConfirmLoading(true);
    const data: API.UpdateRoleAuthParam = {
      roleId: currentEditRole.id,
      addAuthIds: addCheckedKeys,
      removeAuthIds: removeCheckedKeys,
    };
    // 将收集的数据提交到远程服务器
    updateRoleAuths(data)
      .then((response) => {
        if (response.status === 201) {
          setConfirmLoading(false);
          onCancel();
          message.success('编辑角色权限成功!').then(() => {});
        } else {
          setConfirmLoading(false);
          message.error(`编辑角色权限失败-1: ${response.msg}`).then(() => {});
        }
      })
      .catch((e) => {
        setConfirmLoading(false);
        message.error(`编辑角色权限失败-2: ${e}`).then(() => {});
      });
  };

  // 生成树形组件需要格式数据
  const generatorTreeData = (authsTree: API.AuthListItem[]) => {
    const treeData: DataNode[] = [];
    authsTree.forEach((auth) => {
      if (auth.children && auth.children.length !== 0) {
        treeData.push({
          key: auth.id,
          title: auth.authDescript,
          children: generatorTreeData(auth.children),
        });
      } else {
        treeData.push({ key: auth.id, title: auth.authDescript });
      }
    });
    return treeData;
  };

  // 获取所有权限, 整理成树形结构
  const handleGetAllAuths = () => {
    getAuths({ pageSize: 1000 })
      .then((response) => {
        if (response.status !== 200) {
          console.log(`Error: getAllAuths - ${response.status}`);
          throw new Error(`Error: getAllAuths - ${response.status}`);
        }
        return response.data;
      })
      .then((data) => {
        const content = generatorAuthTree(data.content);
        const dataTree = generatorTreeData(content);
        setAuths(dataTree);
      })
      .catch((e) => {
        console.log(`获取权限信息出错 - ${e}`);
        message.error(`获取权限信息出错!${e}`).then(() => {});
      });
  };

  useEffect(() => {
    handleGetAllAuths();
    return () => {
      setConfirmLoading(false);
      setAuths([]);
      setDefaultCheckedKeys([]);
      setDefaultExpandedKeys([]);
    };
  }, []);

  useEffect(() => {
    if (auths.length === 0) return;
    // 生成默认选中权限
    const checkedKeys: number[] = [];
    const tempCurrentCheckedKeys: number[] = [];
    currentEditRole.auths.forEach((auth) => {
      checkedKeys.push(auth.id);
      // 不要主动选中一级菜单, 否则二级或被默认选中
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      auth.authGrade !== 1 && tempCurrentCheckedKeys.push(auth.id);
    });
    // console.log('checkedKeys', checkedKeys);
    setDefaultCheckedKeys(checkedKeys);
    setCurrentCheckedKeys(tempCurrentCheckedKeys);
    // 生成默认展开key
    const expandedKeys: number[] = [];
    auths.forEach((auth) => {
      expandedKeys.push(auth.key as number);
    });
    setDefaultExpandedKeys(expandedKeys);
  }, [auths]);

  // 处理选中权限
  const onCheck = (checkedKeys: any, info: any) => {
    // console.log('onCheck', checkedKeys, info);
    setCurrentCheckedKeys(checkedKeys);
    // eslint-disable-next-line no-param-reassign
    checkedKeys = [...checkedKeys, ...info.halfCheckedKeys];

    const addKeys: number[] = [];
    const removeKeys: number[] = [];
    // 保存要删除的key
    defaultCheckedKeys.forEach((key: number) => {
      if (!checkedKeys.includes(key)) {
        removeKeys.push(key);
      }
    });
    // 保存要添加的key
    checkedKeys.forEach((key: number) => {
      if (!defaultCheckedKeys.includes(key)) {
        addKeys.push(key);
      }
    });
    setAddCheckedKeys(addKeys);
    setRemoveCheckedKeys(removeKeys);
    // console.log(defaultCheckedKeys, addKeys, removeKeys);
  };

  return (
    <Modal
      destroyOnClose
      title="分配权限"
      visible={modalVisible}
      onCancel={() => onCancel()}
      onOk={handleSubmit}
      confirmLoading={confirmLoading}
    >
      <Tree
        checkable
        // 注意:default开头异步数据都无效, 详见受控Tree
        // defaultCheckedKeys={defaultCheckedKeys} // 异步数据无效
        // defaultExpandAll={true}  // 异步数据无效
        checkedKeys={currentCheckedKeys}
        expandedKeys={defaultExpandedKeys}
        onCheck={onCheck}
        treeData={auths}
      />
    </Modal>
  );
};

export default EditRoleAuthForm;
