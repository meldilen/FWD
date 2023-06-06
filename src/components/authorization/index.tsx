import { useState } from 'react'
import { SelectedPage } from '@/shared/types'
import { motion } from 'framer-motion'
import HText from '@/shared/HText'
import Login from '@/components/signIn'
import SignUp from '@/components/signUp'

type Props = {
  setSelectedPage: (value: SelectedPage) => void
}

const SignIn = ({ setSelectedPage }: Props) => {
  const [signIn, setSignIn] = useState(true)

  return (
    <section id="sign" className="mx-auto w-5/6 pb-32 pt-24">
      <motion.div onViewportEnter={() => setSelectedPage(SelectedPage.SignIn)}>
        <motion.div
          className="md:w-3/5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, x: -75 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          <HText>
            <span className="text-primary-500">ПРИСОЕДИНЯЙТЕСЬ И ВЫ!</span>
          </HText>
          <p className="my-5">
            Стань частью нашей команды сегодня и отправляйся в увлекательное
            лингвистическое путешествие!
          </p>
        </motion.div>
        <div className="mt-10 justify-between gap-8 md:flex">
          {signIn ? (
            <div>
              <Login />
            </div>
          ) : (
            <div>
              <SignUp />
            </div>
          )}
        </div>
        <button
          onClick={() => setSignIn(true)}
          className="mx-5 hover:underline"
        >
          Уже есть аккаунт
        </button>
        <button
          onClick={() => setSignIn(false)}
          className="mx-5 hover:underline"
        >
          Регистрация
        </button>
      </motion.div>
    </section>
  )
}

export default SignIn
