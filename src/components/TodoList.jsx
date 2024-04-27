import React, { useState, useEffect } from 'react'
import { database } from '../appwrite/appwriteConfig'
import config from '../appwrite/config'
import TodoForm from './TodoForm'


function TodoList() {
    const [todos, setTodos] = useState([])
    const [loader, setLoader] = useState(false)

    const fetchTodos = async () => {
        try {
            const response = await database.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId
            )
            setTodos(response.documents)
        }
        catch (err) {
            console.log("Appwrite Error :: TodoList :: fetchTodos", err)
        }
    }

    useEffect(() => {
        setLoader(true)
        fetchTodos()
        setLoader(false)
    }, [])

    const deleteTodo = async (id) => {
        try {
            const response = await database.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                id
            )
            console.log(response)
            setTodos(todos.filter(item => item.$id !== id))
        } catch (error) {
            console.log("Appwrite Error :: TodoList :: deleteTodo", error)
        }
    }
    return (
        <>
            <TodoForm onNewTodo={fetchTodos} />
            <div className="max-w-7xl mx-auto p-6 bg-gray-50 shadow-lg rounded-lg mt-5">
                <div className="text-xl font-bold mb-4 text-gray-800">Todo Lists</div>
                {loader ? (
                    <div className="text-center text-gray-500">Loading ...</div>
                ) : (
                    <div>
                        {todos && todos.map(item => (
                            <div key={item.$id} className="mb-2">
                                <div className="p-4 flex items-center justify-between bg-gray-100 rounded-lg shadow transition-all hover:shadow-md">
                                    <div>
                                        <p className="text-gray-700">{item.todo}</p>
                                    </div>
                                    <div>
                                        <button
                                            className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md transition-colors duration-300 cursor-pointer border border-red-700"
                                            onClick={() => {
                                                deleteTodo(item.$id)
                                            }}
                                        >
                                            Delete
                                        </button>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}

export default TodoList