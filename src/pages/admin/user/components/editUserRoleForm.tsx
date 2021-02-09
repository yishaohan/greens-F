import React, { useState, useEffect } from 'react';
import { Form, Input, message, Modal, Select, Space, Tag } from 'antd';
import { useIntl } from 'umi';
import { addUserRole, deleteUserRole } from '../services/userList';
import { getRoles } from '../../auth/services/roleList';

const FormItem = Form.Item;
const { Option } = Select;
const InputGroup = Input.Group;

interface SetUserRoleFormProps {
  modalVisible: boolean;
  onCancel: () => void;
  currentEditUser: API.UserListItem;
  // roles: API.RoleListItem[];
}

const EditUserRoleForm: React.FC<SetUserRoleFormProps> = (props) => {
  const { modalVisible, onCancel, currentEditUser } = props;
  const [roles, setRoles] = useState<API.RoleListItem[]>([]);
  const [userRoles, setUserRoles] = useState<API.RoleListItem[]>(currentEditUser.roles);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [prefix, setprefix]: [string, any] = useState('1');
  const [form] = Form.useForm(); // 创建用于管理antd表单数据的实例对象,表单中所有数据都会保存于此
  const intl = useIntl();

  const changePrefix = (value: string) => {
    setprefix(value);
  };

  // 添加用户角色
  const handleSubmit = () => {
    setConfirmLoading(true);
    form
      .validateFields()
      .then((values) => {
        const data: API.AddUserRoleParams = {
          userID: currentEditUser.id,
          roleID: values.roleID,
        };
        // 提交数据到远程服务器
        addUserRole(data)
          .then((response) => {
            if (response.status === 201) {
              setConfirmLoading(false);
              onCancel();
              message.success('编辑用户角色成功!').then(() => {});
            } else {
              setConfirmLoading(false);
              message.error(`编辑用户角色失败-1: ${response.msg}`).then(() => {});
            }
          })
          .catch((e) => {
            setConfirmLoading(false);
            message.error(`编辑用户角色失败-2: ${e}`).then(() => {});
          });
      })
      .catch((info) => {
        console.log(info);
        setConfirmLoading(false);
      });
  };

  // 删除用户角色
  const handleDeleteUserRole = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    role: API.RoleListItem,
  ) => {
    e.preventDefault();
    const data: API.DeleteUserRoleParams = {
      userID: currentEditUser.id,
      roleID: role.id,
    };
    // 提交数据到远程服务器
    deleteUserRole(data)
      .then((response) => {
        if (response.status === 204) {
          message.success('删除用户角色成功!').then(() => {});
          // 更新本地数据, 以驱动界面自动更新
          const newUserRoles = [...userRoles];
          const deletedRoleID = newUserRoles.findIndex((item) => {
            return item.id === role.id;
          });
          newUserRoles.splice(deletedRoleID, 1);
          setUserRoles(newUserRoles);
        } else {
          message.error(`删除用户角色失败-1: ${response.msg}`).then(() => {});
        }
      })
      .catch((ee) => {
        message.error(`删除用户角色失败-2: ${ee}`).then(() => {});
      });
  };

  // 获取所有角色列表
  const handleGetRoles = () => {
    getRoles({})
      .then((response) => {
        if (response.status !== 200) {
          throw new Error('出错了!!!!!!!!!!!!!!!!!!!!!!!!!!!');
        }
        return response.data;
      })
      .then((data) => {
        setRoles(data.content);
      })
      .catch((e) => {
        message.error(`获取角色信息出错!${e}`).then(() => {});
      });
  };

  // 生命周期钩子, 页面加载时, 自动触发获取用户列表
  useEffect(() => {
    handleGetRoles();
  }, []);

  // 处理角色选择
  const handleSelectChange = (value: number) => {
    form.setFieldsValue({
      roleID: value,
    });
  };
  return (
    <Modal
      destroyOnClose
      title="设置用户权限"
      visible={modalVisible}
      onCancel={() => onCancel()}
      onOk={handleSubmit}
      confirmLoading={confirmLoading}
    >
      <Form form={form} name="SetUserRole" initialValues={currentEditUser}>
        <FormItem name="nickname">
          <Input
            size="large"
            disabled={true}
            placeholder={intl.formatMessage({ id: 'createuser.nickname.placeholder' })}
          />
        </FormItem>
        <FormItem name="username">
          <Input
            size="large"
            disabled={true}
            placeholder={intl.formatMessage({ id: 'createuser.email.placeholder' })}
          />
        </FormItem>
        <InputGroup compact>
          <Select
            size="large"
            value={prefix}
            disabled={true}
            onChange={changePrefix}
            style={{ width: '20%' }}
          >
            <Option value="1">+1</Option>
            <Option value="86">+86</Option>
          </Select>
          <FormItem style={{ width: '80%' }} name="mobilePhone">
            <Input
              size="large"
              disabled={true}
              placeholder={intl.formatMessage({ id: 'createuser.phone-number.placeholder' })}
            />
          </FormItem>
        </InputGroup>
        <FormItem name={'hasRoles'}>
          <Space>
            {userRoles.length === 0 && <Tag color={'red'}>{'未分配角色'}</Tag>}
            {userRoles.map((role) => {
              return (
                <Tag
                  key={role.id}
                  color={'green'}
                  closable
                  onClose={(e) => {
                    handleDeleteUserRole(e, role);
                  }}
                >
                  {role.roleDescript}
                </Tag>
              );
            })}
          </Space>
        </FormItem>
        <FormItem name="roleID">
          <Select onChange={handleSelectChange}>
            {roles.map((role) => {
              return (
                <Option value={role.id} key={role.id}>
                  {role.roleDescript}
                </Option>
              );
            })}
          </Select>
        </FormItem>
      </Form>
    </Modal>
  );
};

export default EditUserRoleForm;
