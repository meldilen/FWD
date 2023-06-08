import Link from 'next/link'
import React from 'react'
import Logo from '@/assets/Logo.png'
import Profile from '@/components/signOut'
import { auth } from '@/firebase/firebase-setup'
import { useEffect, useState } from 'react'
import { getFirestore, doc, getDoc } from 'firebase/firestore'

type Props = {
  isTopOfPage: boolean
}

const Navbar = ({ isTopOfPage }: Props) => {
  const flexBetween = 'flex items-center justify-between'
  const navbarBackground = isTopOfPage ? '' : 'bg-primary-100 drop-shadow'
  const [role, setRole] = useState<string | null>(null)
  useEffect(() => {
    const fetchUserRole = async () => {
      const userId = auth.currentUser?.uid
      if (userId) {
        const db = getFirestore()
        const docRef = doc(db, 'users', userId)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          setRole(docSnap.data().role)
        }
      }
    }

    fetchUserRole()
  }, [])
  return (
    <nav className="left-16 flex h-16">
      <div
        className={`${navbarBackground} ${flexBetween} fixed top-0 z-30 w-full py-6`}
      >
        <div className={`${flexBetween} mx-auto w-5/6`}>
          <div className={`${flexBetween} w-full gap-16`}>
            <img alt="logo" src={Logo.src} />

            <div className={`${flexBetween} w-full`}>
              <div className={`${flexBetween} gap-8 text-sm`}>
                <ul className="flex flex-row gap-8 text-lg font-medium">
                  <li>
                    <Link href={'/'}>Главная</Link>
                  </li>
                  <li>
                    <Link href={'/languages'}>Языки</Link>
                  </li>
                  <li>
                    <Link href={'/about'}>О наших создателях</Link>
                  </li>
                  {role === '1' && (
                    <li>
                      <Link href={'/users'}>Пользователи</Link>
                    </li>
                  )}
                </ul>
              </div>

              <div className={`${flexBetween} gap-8`}>
                {auth.currentUser && <Profile />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
