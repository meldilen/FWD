import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '@/firebase/firebase-setup'
import { motion } from 'framer-motion'
import Card from '@/components/card'
import { CardType } from '@/shared/types'
import { DocumentSnapshot } from '@firebase/firestore'
import { FirebaseError } from 'firebase/app'

export default function Container() {
  const router = useRouter()
  const [words, setWords] = useState<Array<CardType>>([])
  const [snap, setSnap] = useState<DocumentSnapshot>()
  const [cardNum, setCardNum] = useState(0)
  const [front, setFront] = useState(true)

  const buttomStyles =
    'm-2 h-[3vw] w-[10vw] rounded-lg bg-red-400 px-10 py-3 text-center text-white hover:bg-secondary-500'

  // render everytime for some reason
  useEffect(() => {
    async function getCards() {
      const uid = router.query.id as string
      if (uid) {
        const docRef = doc(db, `languages/${router.query.lang}/flashcards`, uid)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          setWords(docSnap.data().card)
          const id = router.query.id ?? ''
          const userRef = doc(db, `users`, id as string)
          getDoc(userRef).then((r) => {
            setSnap(r)
          })
        }
      }
    }
    if (words.length === 0) {
      getCards().then((r) => r)
    }
  }, [router.query.id, router.query.lang, words])

  function talk(text: string | undefined) {
    if (text) {
      const utterance = new SpeechSynthesisUtterance(text)
      let language = ''
      if (router.query.lang === 'french') language = 'fr'
      if (router.query.lang === 'german') language = 'de'
      if (router.query.lang === 'russian') language = 'ru'
      if (router.query.lang === 'spanish') language = 'es'
      utterance.lang = front ? 'en' : language
      speechSynthesis.speak(utterance)
    }
  }

  function deleteCard(wordIndex: number) {
    const newWords = [...words]
    newWords.splice(wordIndex, 1)
    const uid = router.query.id as string
    if (uid) {
      const docRef = doc(db, `languages/${router.query.lang}/flashcards`, uid)
      setDoc(docRef, { card: newWords }, { merge: true }).then(() => {
        setWords(newWords)
        setCardNum(cardNum - 1)
      })
      router.push(`/languages/${router.query.lang}`)
    }
  }

  return (
    <>
      <Head>
        <title>{snap?.data()?.username}</title>
      </Head>
      <section id="slanguages" className="mx-auto min-h-full w-5/6 py-20">
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
              Карточки
            </h1>
            <p className="py-5 text-center text-base font-normal">
              Теперь вы можете ознакомиться с карточками пользователя{' '}
              {snap?.data()?.username}:
            </p>
          </motion.div>
          <div
            className="m-4 ml-[33vw] flex h-[4vw] w-[16vw] items-center justify-center rounded-lg bg-red-400 px-5 py-8 text-white hover:bg-secondary-500"
            onClick={() => setFront(!front)}
            style={{
              marginLeft: '34vw',
              textAlign: 'center',
            }}
          >
            <Card
              isEmpty={words.length === 0}
              card={words[cardNum]}
              front={front}
              language={router.query.lang as string}
            />
          </div>
          {words.length !== 0 && (
            <>
              <button
                className={buttomStyles}
                style={{ marginLeft: '17vw' }}
                onClick={() => {
                  if (cardNum + 1 < words.length) {
                    setCardNum(cardNum + 1)
                  }
                  if (cardNum + 1 === words.length) {
                    setCardNum(0)
                  }
                  setFront(true)
                }}
              >
                Вперед
              </button>
              <button
                className={buttomStyles}
                onClick={() => {
                  if (cardNum - 1 >= 0) {
                    setCardNum(cardNum - 1)
                  }
                  if (cardNum - 1 === -1) {
                    setCardNum(words.length - 1)
                  }
                  setFront(true)
                }}
              >
                Назад
              </button>
              <button
                className={buttomStyles}
                onClick={() =>
                  talk(front ? words[cardNum].english : words[cardNum].target)
                }
              >
                Озвучить
              </button>
            </>
          )}
          <button
            className={
              cardNum != 0
                ? buttomStyles
                : 'm-2 ml-[31vw] h-[3vw] w-[11vw] rounded-lg bg-red-400 px-10 py-3 text-center text-white hover:bg-secondary-500'
            }
            onClick={() =>
              router.push(
                `/languages/${router.query.lang}/${router.query.id}/modify`
              )
            }
          >
            Добавление
          </button>
          <button className={buttomStyles} onClick={() => deleteCard(cardNum)}>
            Удаление
          </button>
        </motion.div>
      </section>
    </>
  )
}
