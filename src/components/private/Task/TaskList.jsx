import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'; // Eliminar useNavigate
import axios from 'axios';
import { Button, List, Typography, Popconfirm, message, Modal, Input } from 'antd';
import './tasklist.css';

const apiUrl = process.env.REACT_APP_ENDPOINT;


const { Title } = Typography;

const TaskList = () => {
  const { userId } = useParams(); // Obtener el userId desde la URL
  // const navigate = useNavigate(); // Eliminar esta línea, ya que no se usa
  const [tasks, setTasks] = useState([]);
  const [userTasks, setUserTasks] = useState([]);
  
  // Estado para el modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentTask, setCurrentTask] = useState(null); // Tarea actual a editar
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/task`, {

          headers: {
          'Content-Type': 'application/json',

            params: JSON.stringify({ page: 0, perPage: 100 }) // Ajusta según tus necesidades
          }
        });

        if (response.data && response.data.data) {
          setTasks(response.data.data);
        } else {
          console.log('Error al cargar tareas:', response.data);
        }
      } catch (error) {
        console.error('Error al cargar tareas:', error);
      }
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    const filteredTasks = tasks.filter(task => String(task.user._id) === String(userId));
    setUserTasks(filteredTasks);
  }, [tasks, userId]);

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`${apiUrl}/api/task/${taskId}`);
      setUserTasks(userTasks.filter(task => task._id !== taskId));
      message.success('Tarea eliminada exitosamente'); // Mensaje de éxito
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
      message.error('Error al eliminar la tarea'); // Mensaje de error
    }
  };

  const handleEdit = (task) => {
    setCurrentTask(task);
    setTaskName(task.name);
    setTaskDescription(task.description);
    setIsModalVisible(true); // Abrir el modal
  };

  const handleOk = async () => {
    try {
      // Actualizar la tarea
      await axios.put(`${apiUrl}/api/task/${currentTask._id}`, {
        name: taskName,
        description: taskDescription
      });

      // Actualizar la lista de tareas
      setUserTasks(userTasks.map(task => 
        task._id === currentTask._id ? { ...task, name: taskName, description: taskDescription } : task
      ));
      message.success('Tarea editada exitosamente');
      setIsModalVisible(false); // Cerrar el modal
    } catch (error) {
      console.error('Error al editar la tarea:', error);
      message.error('Error al editar la tarea');
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false); // Cerrar el modal sin guardar cambios
  };

  return (
    <div className="task-list-container">
      <Title level={2}>Tareas del Usuario</Title>
      {userTasks.length === 0 ? (
        <p>No hay tareas para este usuario.</p>
      ) : (
        <List
          dataSource={userTasks}
          renderItem={(task) => (
            <List.Item actions={[
              <Button type="link" onClick={() => handleEdit(task)}>Editar</Button>,
              <Popconfirm
                title="¿Está seguro de que desea eliminar esta tarea?"
                onConfirm={() => handleDelete(task._id)}
                okText="Sí"
                cancelText="No"
              >
                <Button type="link" danger>Eliminar</Button>
              </Popconfirm>
            ]}>
              <List.Item.Meta
                title={task.name}
                description={task.description}
              />
            </List.Item>
          )}
        />
      )}
      <Link to="/dashboard">
        <Button type="primary" style={{ marginTop: '20px' }}>
          Volver al Dashboard
        </Button>
      </Link>

      {/* Modal para editar tarea */}
      <Modal
        title="Editar Tarea"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          placeholder="Nombre de la tarea"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <Input.TextArea
          placeholder="Descripción de la tarea"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          style={{ marginTop: '10px' }}
        />
      </Modal>
    </div>
  );
}

export default TaskList;
