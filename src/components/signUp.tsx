import { auth, db, signUp } from '@/firebase/firebase-setup'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { collection, doc, getDocs, setDoc } from 'firebase/firestore'

const SignUp = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  async function checkUsername() {
    const querySnapshot = await getDocs(collection(db, `users`))
    const res: string[] = []
    querySnapshot.forEach((doc) => {
      res.push(doc.data().username)
    })
    return res.includes(username)
  }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    if (await checkUsername()) {
      setError('Такой ник уже используется!')
      return
    }
    const res = await signUp(email, password)
    if (typeof res !== 'boolean' && res?.error) {
      setError(res.error.toString().slice(10))
      setUsername('')
      setEmail('')
      setPassword('')
      setRole('')
    } else {
      const uid = auth.currentUser?.uid
      if (uid) {
        await setDoc(
          doc(db, 'users', uid),
          {
            username: username,
            email: email,
            password: password,
            role: role ? '0' : '1',
          },
          { merge: true }
        )
        router.push(`/languages`)
      }
    }
  }

  const inputStyles = `w-full rounded-lg bg-primary-300 px-5 py-3 placeholder-white text-white`

  return (
    <>
      <h2>Создание аккаунта</h2>
      <div>
        {error ? <div>{error}</div> : null}
        <form onSubmit={handleSubmit}>
          <div className="m-3">
            <input
              type="text"
              value={username}
              placeholder="Придумайте ник"
              required
              onChange={(e) => setUsername(e.target.value)}
              className={inputStyles}
            />
          </div>
          <div className="m-3">
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Введите Email"
              required
              onChange={(e) => setEmail(e.target.value)}
              className={inputStyles}
            />
          </div>
          <div className="m-3">
            <select
              className="my-2 block w-full rounded-md border-gray-300 px-4 py-2"
              value={role ? '0' : '1'}
              onChange={(e) => setRole((e.target.value = '0'))}
            >
              <option value="0">Пользователь</option>
              <option value="1">Администратор</option>
            </select>
          </div>
          <div className="m-3">
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Ваш пароль"
              required
              onChange={(e) => setPassword(e.target.value)}
              className={inputStyles}
            />
          </div>
          <button
            type="submit"
            className="m-3 rounded bg-secondary-500 px-4 py-2 font-bold text-white hover:bg-primary-500"
          >
            Зарегистрироваться
          </button>
        </form>
      </div>
    </>
  )
}

export default SignUp
