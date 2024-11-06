import React, { useState, useEffect } from "react";

// URL de tu API (reemplázala con la correcta)
const API_URL = "https://playground.4geeks.com/todo/users/frqmx";

const Home = () => {
    const [nuevoTodo, setNuevoTodo] = useState("");  // Estado para la nueva tarea
    const [todos, setTodos] = useState([]); // Estado para la lista de tareas

    // Obtener las tareas de la API
    const getTodos = async () => {
        try {
            const response = await fetch(API_URL);
            if (response.ok) {
                const data = await response.json();
                setTodos(Array.isArray(data) ? data : []); // Asegurarnos de que es un array
            } else {
                console.error("Error al obtener las tareas:", response.status);
                createUserTodos(); // Si no existen tareas, creamos un usuario con tareas vacías
            }
        } catch (error) {
            console.error("Error al hacer la solicitud GET:", error);
        }
    };

    // Crear una lista de tareas vacía en la API si no existe
    const createUserTodos = async () => {
        try {
            const response = await fetch(API_URL, {
                method: "POST",
                body: JSON.stringify([]), // Lista vacía
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                setTodos([]); // Actualizamos el estado a lista vacía
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
            const response = await fetch(API_URL, {
                method: "PUT", // Usamos PUT para actualizar la lista
                body: JSON.stringify(newTodos), // Convertimos la lista de tareas a JSON
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                setTodos(newTodos); // Actualizamos el estado con las nuevas tareas
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
        if (nuevoTodo.trim() === "") return; // Evitamos agregar tareas vacías
        const newTodos = [...todos, { label: nuevoTodo, done: false }];
        setNuevoTodo(""); // Limpiamos el campo de texto
        updateTodos(newTodos); // Actualizamos las tareas en la API
    };

    // Función para eliminar una tarea
    const handleDeleteTodo = (index) => {
        const newTodos = todos.filter((_, i) => i !== index);
        updateTodos(newTodos); // Actualizamos la lista luego de eliminar la tarea
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
                            onClick={() => handleDeleteTodo(index)}
                        >
                            Eliminar
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
