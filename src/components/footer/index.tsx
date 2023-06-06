import { SelectedPage } from '@/shared/types'
import Logo from '@/assets/Logo.png'
import imageTelegram from '@/assets/telegram.png'
import imageGithub from '@/assets/GitHub.png'
import imageInstagram from '@/assets/Instagram.png'
import { motion } from 'framer-motion'

type Props = {
  setSelectedPage: (value: SelectedPage) => void
}

const Footer = ({ setSelectedPage }: Props) => {
  return (
    <motion.footer
      onViewportEnter={() => setSelectedPage(SelectedPage.Contact)}
      className="bg-primary-100 py-5"
    >
      <div className="justify-content mx-auto w-5/6 gap-16 md:flex">
        <div className="mt-16 basis-1/2 md:mt-11">
          <img src={Logo.src} alt="logo" />
        </div>
        <p className="my-5">
          При изучении языка часто возникает ощущение, что процесс замедлился и
          что этот дело, возможно, никогда не закончится. Могут появиться лень,
          неуверенность в себе и чувство безнадежности. В эти трудные моменты
          HummiLang может стать отличным средством напомнить вам, что этот этап
          временный и что вы на правильном пути!
        </p>
        <div className="mt-16 basis-1/4 md:mt-4">
          <h4 className="font-bold">Our creator</h4>
          <p className="my-5">Diana Melnikova</p>
        </div>
        <div className="mt-16 basis-1/4 md:mt-4">
          <h4 className="font-bold">Contact us</h4>
          <a href="https://t.me/meldilen24">
            <img
              className="h-15 m-5 w-11"
              src={imageTelegram.src}
              alt="Telegram"
            />
          </a>
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer
