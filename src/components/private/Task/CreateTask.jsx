// src/components/private/Task/CreateTaskModal.jsx
import React from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import axios from 'axios';

const CreateTaskModal = ({ visible, onClose, userId }) => {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      const taskData = {
        ...values,
        user: userId,
      };

      // Realizar la solicitud POST para crear la tarea
      await axios.post(`${apiUrl}/api/task`, taskData);
      message.success('Task created successfully');
      form.resetFields();
      onClose(); // Cerrar el modal
    } catch (error) {
      message.error('Error creating task');
      console.error('Error:', error);
    }
  };

  return (
    <Modal
      title="Create Task"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item
          name="name"
          label="Task Name"
          rules={[{ required: true, message: 'Please input the task name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Please input the task description!' }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="resume"
          label="Resume"
          rules={[{ required: true, message: 'Please input a resume!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create Task
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateTaskModal;
