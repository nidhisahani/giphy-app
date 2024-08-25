'use client'
import { useState } from 'react'
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { auth } from '@/app/firebase/config'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

function Register() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);

  const handleRegister = async () => {
    try {
      const createdUser = await createUserWithEmailAndPassword(email, password);
      console.log(createdUser);
      router.push('/')
      setEmail('');
      setPassword('')
      sessionStorage.setItem('Login', 'true');
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 space-y-6 bg-white rounded-md shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-800">Sign Up</h1>
        <input
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full p-2 mt-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full px-4 py-2 mt-6 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          type="button"
          onClick={handleRegister}
        >
          Register
        </button>
        <div className="flex justify-center mt-4">
          <Link href="/sign-in">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Register
