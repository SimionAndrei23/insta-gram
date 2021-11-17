import Head from 'next/head'
import Feed from '../components/Feed'
import Header from '../components/Header'
import Confetti from 'react-confetti'
import { useContext, useEffect, useRef, useState } from 'react'
import { Context } from '../Context'
import ModalPost from '../components/ModalPost'
import ModalHorizontal from '../components/ModalHorizontal'

export default function Home() {

  const { modalOne, modalHorizontal } = useContext(Context)

  const [width, setWidth]   = useState(null);
  const [height, setHeight] = useState(null);
  console.log(height)
  const parentRef = useRef(null)
  const [loadingConfetti, setLoadingConfetti] = useState(false)

  console.log(loadingConfetti)

  useEffect(() => {
    setHeight(parentRef.current.clientHeight)
    setWidth(parentRef.current.clientWidth)
  },[width,height])
  
  useEffect(() => {
    if(loadingConfetti) {
      document.body.style.overflowX = 'hidden'
      const confettiLoading = setInterval(() => {
        setLoadingConfetti(false)
      }, 10000)
      return () => {
        clearInterval(confettiLoading)
      }
    }
  },[loadingConfetti])

  const [percentageWidth, setPercentageWidth] = useState(0)

  console.log(percentageWidth)

  const animateProgressBar = () => {
    let scrollDistance = -parentRef.current?.getBoundingClientRect().top
    let progressWidth = (scrollDistance / (parentRef.current?.getBoundingClientRect().height - document.documentElement.clientHeight)) * 100;
    let valueFixed = Math.floor(progressWidth)
    setPercentageWidth(valueFixed)
  }

  useEffect(() => {
    window.addEventListener('scroll', animateProgressBar)
  },[])



  return (
    <div ref = {parentRef}  className='min-h-screen w-full bg-gradient-to-r from-pink-100 to-white'>
      <div style = {{'width': percentageWidth + '%'}} className = 'scrollBar fixed z-50 top-0 left-0 bg-red-500 h-[0.3rem] transformWidth'></div>
          <div>
            <Head>
              <title>Instagram</title>
              <link rel="icon" href="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png" />
            </Head>

            {/* Header */}

            {
              loadingConfetti ? ( 
                <Confetti numberOfPieces = {400}  width = {width} height = {height}  />
              ) : (
                ''
              )
            }


            <Header />

            {/* Feed content */}

            <Feed />

            {modalOne ? (
              <ModalPost setLoadingConfetti = {setLoadingConfetti} loadingConfetti = {loadingConfetti} />
            ) : (
              <div className = 'hidden'></div>
            )}

            {modalHorizontal ? (
              <ModalHorizontal />
            ) : (
              <div className = 'hidden'></div>
            )}

          </div>
    </div>
  )
}

/*export async function getServerSideProps(context) {

  const session = await getSession(context);

  return {

    props: {
      
      session

    }
  }
}*/
