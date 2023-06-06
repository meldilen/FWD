import HText from '@/shared/HText'
import { BenefitType, SelectedPage } from '@/shared/types'
import {
  HomeModernIcon,
  UserGroupIcon,
  AcademicCapIcon,
} from '@heroicons/react/24/solid'
import BenefitsPageGraphic from '@/assets/BenefitsPageGraphic.png'
import { motion } from 'framer-motion'
import Benefit from './Benefit'
import ActionButton from '@/shared/ActionButton'

const benefits: Array<BenefitType> = [
  {
    icon: <HomeModernIcon className="h-6 w-6" />,
    title: 'Большая библиотека знаний',
    description: '',
  },
  {
    icon: <UserGroupIcon className="h-6 w-6" />,
    title: 'Большое и надежное сообщество',
    description: '',
  },
  {
    icon: <AcademicCapIcon className="h-6 w-6" />,
    title: 'Преподаватели со всего мира',
    description: '',
  },
]

type Props = {
  setSelectedPage: (value: SelectedPage) => void
}

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
}

const Benefits = ({ setSelectedPage }: Props) => {
  return (
    <section
      id="benefits"
      className="mx-auto min-h-full w-5/6 py-20" // min-h-full it can expend and fit the content
    >
      <motion.div
        onViewportEnter={() => setSelectedPage(SelectedPage.Benefits)}
      >
        {/* HEADER */}
        <motion.div
          className="md:my-5 md:w-3/5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, x: -75 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          <HText>БОЛЬШЕ, ЧЕМ ПРОСТО ПЛАТФОРМА</HText>
          <p className="my-5 text-sm">
            {
              'Разносторонняя деятельность нашей платформы направлена на создание дружественной и увлекательной среды для пользователей, позволяющей изучать и практиковать иностранные языки! Участвуя в этих мероприятиях, вы не только улучшите свои языковые навыки, но и установите прочные связи с другими любителями языка.'
            }
          </p>
        </motion.div>

        {/* BENEFITS */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={container}
          className="items-center justify-between gap-8 md:mt-5 md:flex"
        >
          {benefits.map((benefit: BenefitType) => (
            <Benefit
              key={benefit.title}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
              setSelectedPage={setSelectedPage}
            />
          ))}
        </motion.div>

        {/* GRAPHIC AND DESCRIPT */}
        <div className="mt-16 items-center justify-between gap-20 md:mt-28 md:flex">
          {/* GRAPHIC */}
          <img
            className="w-100 mx-auto"
            src={BenefitsPageGraphic.src}
            alt="benefit-page-graphic"
          />

          {/* DESCRIPT */}
          <div>
            {/* TITTLE */}
            <div className="relative">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
                variants={{
                  hidden: { opacity: 0, x: -75 },
                  visible: { opacity: 1, x: 0 },
                }}
                className="before:absolute before:-left-20 before:-top-20
                            before:z-[1] before:content-abstractwaves"
              >
                <div className="relative">
                  <HText>ТЫСЯЧА НОВЫХ СЛОВ В МЕСЯЦ</HText>
                </div>
              </motion.div>
            </div>
            {/* DESCRIPT */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              variants={{
                hidden: { opacity: 0, x: -75 },
                visible: { opacity: 1, x: 0 },
              }}
            >
              <p className="mb-5 mt-5">
                Овладение знанием одного языка подобно получению доступа к
                бесконечному числу незабываемых воспоминайний и приключений в
                жизни, в то время как владение двумя языками позволяет вам
                исследовать и испытать на себе все возможности, которые может
                предложить вам жизнь. Каждая дверь перед вами становится легко
                доступной, что способствует более широкому взгляду и более
                глубокому пониманию различных культур и людей.
              </p>
              <p className="mb-5">
                Присоединяйтесь к нашей платформе и изучайте новые языки без
                особых усилий. Вы не только выиграете от свободного владения
                разными языками, но и получите возможность внести свой вклад в
                сообщество, делясь своим опытом, выполняя задания разного уровня
                сложности и отслеживая свой прогресс в любое удобное для вас
                время. Присоединяйтесь к нам прямо сейчас и превратите изучение
                языка в радостный опыт!
              </p>
            </motion.div>
            {/* BUTTON */}
            <div className="relative mt-16">
              <div
                className="before:absolute before:-bottom-20 before:right-40 
                           before:z-[-1] before:content-sparkles"
              >
                <ActionButton setSelectedPage={setSelectedPage}>
                  Присоединиться
                </ActionButton>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default Benefits
