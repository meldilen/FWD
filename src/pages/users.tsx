import { db } from '@/firebase/firebase-setup'
import Head from 'next/head'
import { lazy, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore'
import imageCube from '@/assets/Cube.png'
import imageArrow from '@/assets/Arrow.png'
import imageAbstractWaves from '@/assets/AbstractWaves.png'
import { useRouter } from 'next/router'

const buttomStyles =
  'ml-[33vw] h-[3vw] w-[16vw] rounded-lg bg-red-400 flex justify-center items-center px-5 py-5 text-white text-lg hover:bg-secondary-500'

export default function Cards() {
  const [users, setUsers] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, 'users'))
      const usernames: any[] = []
      querySnapshot.forEach((doc) => {
        usernames.push({ id: doc.id, ...doc.data() })
      })
      setUsers(usernames)
    }

    fetchUsers()
  }, [])

  async function deleteUser(userId: string) {
    const userRef = doc(db, 'users', userId)
    await deleteDoc(userRef)
    const languagesRef = collection(db, 'languages')
    const languagesSnapshot = await getDocs(languagesRef)
    languagesSnapshot.forEach(async (languageDoc) => {
      const language = languageDoc.id
      const flashcardsRef = collection(db, `languages/${language}/flashcards`)
      const flashcardsSnapshot = await getDocs(flashcardsRef)
      flashcardsSnapshot.forEach(async (flashcardDoc) => {
        if (flashcardDoc.data().userId === userId) {
          const flashcardRef = doc(
            db,
            `languages/${language}/flashcards`,
            flashcardDoc.id
          )
          await deleteDoc(flashcardRef)
        }
      })
    })
    router.push(`/users`)
  }
  return (
    <section
      className="mx-auto min-h-full w-5/6 py-20" // min-h-full it can expend and fit the content
    >
      <Head>
        <title>Our users</title>
        <meta
          key="description"
          name="description"
          content="See the users of HummiLang!"
        />
        <meta property="og:title" content="Users" />
        <meta
          property="og:description"
          content="Choose the language you would like to learn with HummiLang!"
        />
      </Head>
      <motion.div>
        <motion.div
          className="mx-auto w-5/6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, x: -75 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          <h1 className="ms-70 sticky left-80 right-0 top-0 text-center text-3xl font-bold underline">
            Наши пользователи
          </h1>
          <p className="py-5 text-center text-base font-normal">
            Выберете пользователя, которого необходимо удалить:
          </p>
        </motion.div>
        {users.length > 0 ? (
          users.map((user) => {
            return (
              <div className="my-2" key={user.id}>
                <button
                  className={buttomStyles}
                  onClick={() => deleteUser(user.id)}
                >
                  {user.username}
                </button>{' '}
              </div>
            )
          })
        ) : (
          <p className="text-center">Нет пользователей на данный момент</p>
        )}
        <div className="ml-[45vw] mt-[-12vw] flex">
          <img
            className="mx-auto w-[10vw]"
            src={imageArrow.src}
            alt="Pattern_arrow"
          />
        </div>
        <div className="ml-[-45vw] mt-[-3vw]">
          <img
            className="mx-auto flex w-[12vw] py-10"
            src={imageCube.src}
            alt="Pattern_cube"
          />
        </div>
        <div className="ml-[55vw] mt-[-13vw]">
          <img
            className="mx-auto flex w-[12vw] py-10"
            src={imageAbstractWaves.src}
            alt="Pattern_abstractWaves"
          />
        </div>
      </motion.div>
    </section>
  )
}
