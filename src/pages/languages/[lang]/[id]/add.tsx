import Head from 'next/head'
import {
  arrayRemove,
  arrayUnion,
  doc,
  setDoc,
  updateDoc,
  getDoc,
} from 'firebase/firestore'
import { auth, db } from '@/firebase/firebase-setup'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'

export default function Modify() {
  const inputStyles = `w-full rounded-lg bg-primary-300 px-5 py-3 placeholder-white text-white`
  const router = useRouter()
  const uid = router.query.id as string
  const lang = router.query.lang as string
  const ref = useRef(true)
  const [english, setEnglish] = useState('')
  const [target, setTarget] = useState('')
  const language =
    router.query.lang &&
    (router.query.lang as string).charAt(0).toUpperCase() +
      (router.query.lang as string).slice(1)

  useEffect(() => {
    if (!auth.currentUser) {
      alert('Необходимо зарегистрироваться, чтобы добавить карточку!')
      router.push(`/`).then((r) => r)
    }
  }, [lang, router, uid])

  async function addCard() {
    if (english === '') {
      alert('Пустое поле для английского языка')
      return
    }
    if (target === '') {
      alert(`Empty ${language} field`)
      return
    }
    const uid = auth.currentUser
    if (uid) {
      const docRef = doc(db, `languages/${lang}/flashcards`, uid.uid)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        // if document exists, update it with new array entry
        await updateDoc(docRef, {
          card: arrayUnion({
            english: english,
            target: target,
          }),
        })
      } else {
        // if document doesn't exist, create it with initial array
        await setDoc(docRef, {
          card: [
            {
              english: english,
              target: target,
            },
          ],
        })
      }
    }
    router.push(`/languages/${lang}/${uid}`).then((r) => r)
  }

  async function deleteCard() {
    if (english === '') {
      alert('Пустое поле для английского языка')
      return
    }
    if (target === '') {
      alert(`Пустое ${language} поле`)
      return
    }
    if (uid) {
      for (const o of [{ english: english, target: target }]) {
        await updateDoc(doc(db, `languages/${lang}/flashcards`, uid), {
          card: arrayRemove(o),
        })
      }
    }
    router.push(`/languages/${lang}/${uid}`).then((r) => r)
  }

  return (
    <>
      <Head>
        <title>Добавление новой карточки</title>
      </Head>
      <section id="slanguages" className="mx-auto min-h-full w-5/6 py-20">
        <div>
          <p className='className="ms-70 sticky left-80 right-0 top-0 text-center text-2xl'>
            Добавление новой карточки
          </p>
          <div className="m-3">
            <input
              type="text"
              value={english}
              placeholder="English"
              onChange={(e) => setEnglish(e.target.value)}
              className={inputStyles}
            />
          </div>
          <div className="m-3">
            <input
              type="text"
              value={target}
              placeholder={lang && lang.charAt(0).toUpperCase() + lang.slice(1)}
              onChange={(e) => setTarget(e.target.value)}
              className={inputStyles}
            />
          </div>

          <button
            className="mx-2 rounded-md bg-secondary-500 px-10 py-2 hover:bg-primary-500 hover:text-white"
            onClick={addCard}
          >
            Добавить
          </button>
          <button
            className="mx-2 rounded-md bg-secondary-500 px-10 py-2 hover:bg-primary-500 hover:text-white"
            onClick={deleteCard}
          >
            Удалить
          </button>
        </div>
      </section>
    </>
  )
}
