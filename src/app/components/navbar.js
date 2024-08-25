'use client'

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';

export default function Navbar() {
  const [isLogin, setLogin] = useState();
  const [user] = useAuthState(auth);
  const session = sessionStorage.getItem('login');


  useEffect(() => {
    // Only access sessionStorage on the client side
    if (typeof window !== 'undefined') {
      if (user && session) {
        setLogin(true);
      } else {
        setLogin(false);
      }
    }
  }, [user]);

  const handleSignOut = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('login');
    }
    signOut(auth)
      .then(() => {
        setLogin(false);
      })
      .catch((error) => {
        console.error('Sign out error:', error);
      });
  };

  return (
    <nav className="bg-white p-2 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link className="p-3 font-bold" href="/">
          Home
        </Link>
        <div className="p-2">
          {isLogin ? (
            <button className="p-3 font-bold" onClick={handleSignOut}>
              Sign out
            </button>
          ) : (
            <div>
              <Link className="p-3 font-bold" href="/sign-in">
                Sign In
              </Link>
              <Link className="p-3 font-bold" href="/sign-up">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
