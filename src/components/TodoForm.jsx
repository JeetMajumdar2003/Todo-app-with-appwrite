import React, { useState } from 'react'
import { database, userId } from '../appwrite/appwriteConfig'
import config from '../appwrite/config'
import { ID } from 'appwrite'

function TodoForm({onNewTodo}) {
    const [todo, setTodo] = useState('')

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            if (!todo) return;
            await database.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                ID.unique(),
                { todo }
            )
            // console.log(response)
            setTodo('')
            onNewTodo()
        }
        catch (err) {
            // console.log("Appwrite Error :: TodoForm :: handleSubmit", err)
            alert("Error in creating Todo")
        }
    }

    return (
        <div className="max-w-7xl mx-auto mt-10 shadow-lg p-6 bg-gray-200 rounded-lg">
            <form
                action=""
                onSubmit={handleSubmit}
                className="flex justify-center mb-10"
            >
                <input
                    type="text"
                    name=""
                    id=""
                    placeholder="Enter Todo..."
                    className="border mt-5 p-2 w-2/3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    value={todo}
                    onChange={(e) => {
                        setTodo(e.target.value)
                    }}
                />
                <button
                    className="bg-purple-500 mt-5 p-2 text-white ml-2 rounded-md shadow hover:bg-purple-600 transition-colors duration-300"
                    type="submit"
                >
                    Add Todo
                </button>
            </form>
        </div>

    )
}

export default TodoForm