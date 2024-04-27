import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { account } from '../appwrite/appwriteConfig'
import { TodoList } from './index'

function Profile() {
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState();

    const fetchUserDetails = async () => {
        try {
            const response = await account.get();
            setUserDetails(response);
        } catch (error) {
            console.error("Appwrite Error :: Profile :: error - ", error);
        }
    };

    useEffect(() => {
        fetchUserDetails();
    }, [])

    const handleLogout = async () => {
        try {
            await account.deleteSession('current');
            navigate('/');
        } catch (error) {
            // console.log("Appwrite Error :: handleLogout :: error - ", error);
            alert("Error in Logout")

        }
    }


    return (
        <>
            {userDetails ? (
                <>
                    <div className=" bg-slate-400 min-h-min mx-auto shadow-md flex justify-between text-right py-3 px-3">
                        <div>
                            <p className="text-lg pt-1">Hello <span className='font-serif'>{userDetails.name}</span></p>
                        </div>
                        <div>
                            <button
                                className="mx-2 p-2 cursor-pointer text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-md"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                    <TodoList />
                </>
            ) : (
                <p className="flex justify-center item-center py-12 sm:px-6 lg:px-8">
                    <div className='border rounded-md p-5 shadow-lg'>
                        Please Login To see Profile{" "}
                        <Link to="/">
                            <span className="mx-2 p-2 cursor-pointer text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-md">
                                Login
                            </span>
                        </Link>
                    </div>
                </p>
            )}
        </>
    )
}

export default Profile