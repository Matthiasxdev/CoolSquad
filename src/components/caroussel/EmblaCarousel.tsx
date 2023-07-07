import React, { useState, useEffect, useCallback } from 'react'
import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react'
import {
  DotButton,
  PrevButton,
  NextButton,
} from './EmblaCarouselArrowsDotsButtons'
import styles from './embla.module.css'
import { Card } from '@/shared/types'
import CardComponentActivity from '../cards/activities'

type PropType = {
  slides: number[]
  myCards: Card[]
  options?: EmblaOptionsType
}

const  EmblaCarousel = (props:PropType) => {
  const { slides, myCards, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi],
  )
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi],
  )
  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi],
  )

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
    setPrevBtnEnabled(emblaApi.canScrollPrev())
    setNextBtnEnabled(emblaApi.canScrollNext())
  }, [emblaApi, setSelectedIndex])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
  }, [emblaApi, setScrollSnaps, onSelect])

  return (
      <div className={styles.container}>
        <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
        <div className={styles.embla}>
          <div className={styles.embla__viewport} ref={emblaRef}>
            <div className={styles.embla__container}>
              {slides.map((index) => (
                <div className={styles.embla__slide} key={index}>
                  <CardComponentActivity 
                  id={myCards[index].id}
                  image={myCards[index].image}
                  description={myCards[index].description}
                  link={myCards[index].link}
                  key={myCards[index].id}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
        <div className={styles.embla__dots}>
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              selected={index === selectedIndex}
              onClick={() => scrollTo(index)}
            />
          ))}
        </div>
      </div>
  )
}

export default EmblaCarousel
