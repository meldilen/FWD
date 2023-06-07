import Head from 'next/head'
import { motion } from 'framer-motion'
import imageRuslan from '@/assets/Ruslan.png'
import imageDiana from '@/assets/Diana.png'
import imageNikita from '@/assets/Nikita.png'
import imageSergey from '@/assets/Sergey.png'
import { PhotosType } from '@/shared/types'

type Props = {
  name: string
  description?: string
  image: string
}

export default function AboutUs() {
  const photos: Array<PhotosType> = [
    {
      name: 'Руслан Хакимов',
      description:
        'Руководитель нашей команды и серверный разработчик. Пользователь не видит серверную часть страницы, но это то, что управляет сайтом или приложением. Руслан не только разработчик и профессионал своего дела, но и хороший менеджер. Он помогает команде и руководит процессом разработки.',
      image: imageRuslan.src,
    },
    {
      name: 'Диана Мельникова',
      description:
        'Наш frontend-разработчик и UX/UI дизайнер. Диана задала дизайн и направление для всего проекта, поэтому эксперты по пользовательскому интерфейсу не менее важны, чем разработчики. Тем не менее, все, что вы видите на этом сайте, является работой наших разработчиков интерфейса.',
      image: imageDiana.src,
    },
  ]

  const Photo = ({ name, image, description }: Props) => {
    return (
      <li className="relative mx-8 w-[20%]">
        <img src={image} alt={`${image}`} className="rounded-full" />
        <p className="mt-2 text-center text-2xl">{name}</p>
        <p className="mt-1 text-center">{description}</p>
      </li>
    )
  }

  return (
    <section
      id="AboutUs"
      className="mx-auto min-h-full w-5/6 py-20" // min-h-full it can expend and fit the content
    >
      <Head>
        <title>About us</title>
        <meta
          key="description"
          name="description"
          content="We welcome you to familiarize yourself with creators of HummiLang"
        />
        <meta property="og:title" content="About us" />
        <meta
          property="og:description"
          content="We welcome you to familiarize yourself with creators of HummiLang"
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
            НАША КОМАНДА
          </h1>
          <p className="py-5 text-center text-base font-normal">
            Мы обладаем способностью превратить даже самую эксцентричную идею в
            действующий и востребованный на рынке проект. Очевидно, что наличие
            компетентной и квалифицированной команды составляет 50% успеха
            проекта. Мы приглашаем вас познакомиться с нашей командой!
          </p>
        </motion.div>
        <div className="mt-10 w-full overflow-x-auto overflow-y-hidden">
          <ul className="flex items-baseline justify-center text-center align-middle">
            {photos.map((item: PhotosType, index) => (
              <Photo
                key={`${item.name}-${index}`}
                name={item.name}
                description={item.description}
                image={item.image}
              />
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  )
}
