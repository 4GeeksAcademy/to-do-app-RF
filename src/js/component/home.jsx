import React, { useState, useEffect } from "react";

// URL de tu API 
const API_URL = "https://playground.4geeks.com/todo";
const user = "frqmx";

const Home = () => {
    const [nuevoTodo, setNuevoTodo] = useState("");  // Estado para la nueva tarea
    const [todos, setTodos] = useState([]); // Estado para la lista de tareas

    // Obtener las tareas de la API
    const getTodos = async () => {
        try {
            const response = await fetch(`${API_URL}/users/${user}`);
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setTodos(Array.isArray(data.todos) ? data.todos : []); 
            } else {
                console.error("Error al obtener las tareas:", response);
                createUserTodos();
            }
        } catch (error) {
            console.error("Error al hacer la solicitud GET:", error);
        }
    };
    // Crear una lista de tareas vacía en la API si no existe
    const createUserTodos = async () => {
        try {
            const response = await fetch(`${API_URL}/users/${user}`, {
                method: "POST",
                
            });
            if (response.ok) {
                getTodos()
                console.log("Lista de tareas creada.");
            } else {
                console.error("Error al crear lista de tareas:", response.status);
            }
        } catch (error) {
            console.error("Error al crear la lista:", error);
        }
    };
    
    // Función para actualizar las tareas en la API
    const updateTodos = async (newTodos) => {
        try {
            const response = await fetch(`${API_URL}/todos/${user}`, {
                method: "POST",
                body: JSON.stringify(newTodos),
                headers: {
                    "Content-Type": "application/json",
                },
            });
    
            if (response.ok) {
                const data = await response.json()
                setTodos([...todos,data]);
                console.log("Tareas actualizadas.");
            } else {
                console.error("Error al actualizar tareas:", response.status);
            }
        } catch (error) {
            console.error("Error al hacer la solicitud PUT:", error);
        }
    };

    // Función para agregar una nueva tarea
    const handleAddTodo = () => {
        if (nuevoTodo.trim() === "") return;
        const newTodo = { label: nuevoTodo, is_done: false };
        setNuevoTodo("");
        updateTodos(newTodo); // Envía sólo una tarea
    };

    const removeTodos = async () => {
        try {
            const response = await fetch(`${API_URL}/users/${user}`, {
                method: "DELETE",
                    
            });
    
            if (response.ok) {
             getTodos() 
                console.log("Todas las tareas han sido eliminadas.");
            } else {
                console.error("Error al eliminar todas las tareas:", response.status);
            }
        } catch (error) {
            console.error("Error al hacer la solicitud de eliminación:", error);
        }
    };

    // Función para eliminar una tarea
    const handleDeleteTodo = async (id) => {
        try { 
            const response = await fetch(`${API_URL}/todos/${id}`, {
                method : "DELETE"
            }) 
            if (response.ok){
                getTodos()
            }
            
        } catch (error) {
           console.log(error) 
        }
    };

    // Función para manejar el cambio en el input de nueva tarea
    const handleChange = (event) => {
        setNuevoTodo(event.target.value);
    };

    // Usamos useEffect para cargar las tareas al inicio
    useEffect(() => {
        getTodos();
    }, []); // Solo se ejecuta una vez cuando se monta el componente

    return (
        <div className="text-center">
            <h1 className="text-center mt-5">To Do List React + Fetch</h1>
            <div className="container">
                <div className="d-flex gap-2">
                    <input
                        type="text"
                        className="form-control"
                        value={nuevoTodo}
                        onChange={handleChange}
                        placeholder="Escribe una tarea"
                    />
                    <button onClick={handleAddTodo} className="btn btn-primary">
                        Agregar tarea
                    </button>
                </div>
            </div>
            <ul className="list-group mt-3">
                {todos.map((todo, index) => (
                    <li
                        key={index}
                        className={`list-group-item d-flex justify-content-between align-items-center ${
                            index % 2 === 0 ? "bg-light" : ""
                        }`}
                    >
                        {todo.label}
                        <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDeleteTodo(todo.id)}
                        >
                            Eliminar
                        </button>
                    </li>
                ))}
            </ul>
            <button className="btn btn-danger btn-sm" onClick={() => removeTodos()}>
                Eliminar todas las tareas
            </button>
        </div>
    );
};

export default Home;
