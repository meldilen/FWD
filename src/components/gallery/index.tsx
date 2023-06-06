import { SelectedPage, PhotosType } from '@/shared/types'
import Photo from './Photo'
import carouselImage1 from '@/assets/carouselImage1.png'
import carouselImage2 from '@/assets/carouselImage2.png'
import carouselImage3 from '@/assets/carouselImage3.png'
import carouselImage4 from '@/assets/carouselImage4.png'
import carouselImage5 from '@/assets/carouselImage5.png'
import React from 'react'
import { motion } from 'framer-motion'
import HText from '@/shared/HText'

const photos: Array<PhotosType> = [
  {
    name: 'Кружки для обсуждения',
    description:
      'Практикуйте навыки говорения и аудирования в благоприятной обстановке, участвуя в разговорных кружках, где учащиеся всех уровней участвуют в дискуссиях на различные темы. Носители языка и опытные изучающие язык приглашаются для содействия этим занятиям, предлагая рекомендации и исправления, когда это необходимо.',
    image: carouselImage1.src,
  },
  {
    name: 'Культурно-развлекательные вечера',
    description:
      'Погрузитесь в богатые традиции и обычаи разных стран, посещая культурные вечера. Эти мероприятия предоставляют уникальную возможность узнать о культуре, лежащей в основе изучаемых вами языков.',
    image: carouselImage2.src,
  },
  {
    name: 'Языковые задачи',
    description:
      'Участвуйте в регулярных языковых тестах, чтобы ставить личные цели, отслеживать свой прогресс и сохранять мотивацию. Задачи могут включать в себя определенное количество часов языковой практики, пополнение словарного запаса или прохождение языкового курса.',
    image: carouselImage3.src,
  },
  {
    name: 'Лекции приглашенных гостей',
    description:
      'Посетите содержательные беседы лингвистов, авторов и полиглотов, которые делятся своим опытом, советами и хитростями изучения языка, а также обсуждают различные лингвистические темы и культурные особенности.',
    image: carouselImage4.src,
  },
  {
    name: 'Языковые семинары',
    description:
      'Совершенствуйте свою грамматику, словарный запас и произношение с помощью интерактивных семинаров под руководством опытных преподавателей. Эти занятия адаптированы к конкретным уровням владения языком и направлены на развитие основных языковых навыков.',
    image: carouselImage5.src,
  },
]

type Props = {
  setSelectedPage: (value: SelectedPage) => void
}

const Gallery = ({ setSelectedPage }: Props) => {
  return (
    <section id="gallery" className="w-full bg-primary-100 py-40">
      <motion.div onViewportEnter={() => setSelectedPage(SelectedPage.Gallery)}>
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
          <div className="md:w-3/5">
            <HText>НАША ДЕЯТЕЛЬНОСТЬ</HText>
            <p className="py-5">
              Наша платформа предоставляет широкий спектр увлекательных занятий,
              которые подходят для различных стилей обучения и уровней владения
              языком. Ниже приведен список мероприятий, которые мы предлагаем,
              чтобы обеспечить увлекательное и эффективное обучение для всех.
            </p>
          </div>
        </motion.div>
        <div className="mt-10 h-[353px] w-full overflow-x-auto overflow-y-hidden">
          <ul className="w-[-2800px] whitespace-nowrap">
            {' '}
            {/*this is how overflow performed: child has bigger value then parent*/}
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

export default Gallery
