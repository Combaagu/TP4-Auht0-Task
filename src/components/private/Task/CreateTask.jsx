// src/components/private/Task/CreateTaskModal.jsx
import React from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import axios from 'axios';
import './createTask.css';

const apiUrl = process.env.REACT_APP_ENDPOINT;

const CreateTaskModal = ({ visible, onClose, userId }) => {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      const taskData = {
        ...values,
        user: userId,
      };

      // endpoint POST tarea
      await axios.post(`${apiUrl}/api/task`, taskData);
      message.success('Tarea creada Exitosamente');
      form.resetFields();
      onClose(); // Cerrar el modal
    } catch (error) {
      message.error('Error al crear la tarea');
      console.error('Error:', error);
    }
  };

  return (
    <Modal
      title="Crear Nueva Tarea"
      visible={visible}
      onCancel={onClose}
      footer={null}
      centered
      className="task-modal"
    >
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item
          name="name"
          label="Nombre Tarea"
          rules={[{ required: true, message: 'Por favor ingrese el Nombre de la tarea!' }]}
        >
          <Input placeholder="Ingrese el nombre de la tarea" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Descripcion"
          rules={[{ required: true, message: 'Por favor ingrese la Descripcion' }]}
        >
          <Input.TextArea placeholder="Ingrese la descripcion" rows={4} />
        </Form.Item>
        <Form.Item
          name="resume"
          label="Resume"
          rules={[{ required: true, message: 'Por favor ingrese el Resume' }]}
        >
          <Input placeholder="Ingrese el resume" />
        </Form.Item>
        <Form.Item>
          <div className="button-container">
            <Button type="default" onClick={onClose} className="cancel-button">
              Cancelar
            </Button>
            <Button type="primary" htmlType="submit" className="create-button">
              Crear Tarea
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateTaskModal;
