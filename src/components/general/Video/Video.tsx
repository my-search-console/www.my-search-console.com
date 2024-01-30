import { PauseIcon, PlayIcon } from "@heroicons/react/20/solid"
import clsx from "clsx"
import React, { useEffect, useRef, useState } from "react"
import { Image } from "../Image/Image"

export const VideoPlayer: React.FC<{
  classNames?: { video?: string; image?: string }
  autoplay?: boolean
  src: string
  illustration: any
  alt: string
}> = (props) => {
  const [play, setPlay] = useState(false)
  const [loadVideo, setLoadVideo] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    setLoadVideo(true)
  }, [])

  const togglePlay = () => {
    if (play) {
      videoRef.current?.pause()
      setPlay(false)
    } else {
      videoRef.current?.play()
      setPlay(true)
    }
  }

  return (
    <div className="relative w-full rounded-lg ring-8 ring-blue-100">
      <Image
        className={clsx(props.classNames?.image, "ring-8 ring-blue-100")}
        src={props.illustration}
        alt={props.alt}
      />

      <video
        ref={videoRef}
        onLoadedData={() => {
          console.log(props)
          console.log(videoRef)

          if (props.autoplay) {
            setPlay(true)

            setTimeout(() => {
              videoRef.current?.play()
            }, 100)
          }
        }}
        className={clsx(props.classNames?.video, "absolute inset-0")}
        playsInline={props.autoplay}
        loop={props.autoplay}
        muted={props.autoplay}
        controls={false}
      >
        <source src={props.src} type="video/mp4" />
      </video>

      <div
        className={clsx(
          "absolute inset-0 flex w-full cursor-pointer items-center justify-center rounded-lg bg-slate-900 transition-all duration-300 ease-in-out hover:opacity-100",
          play && "bg-opacity-20 opacity-0",
          !play && "bg-opacity-0 opacity-100 hover:bg-opacity-20"
        )}
        onClick={togglePlay}
      >
        <div>
          {!play && <PlayIcon className="h-10 w-10 text-white" />}
          {play && <PauseIcon className="h-10 w-10 text-white" />}
        </div>
      </div>
    </div>
  )
}

export const Video: React.FC<{
  src: any
  autoplay?: boolean
  illustration: any
  alt: string
}> = (props) => {
  return (
    <div className="mx-auto mb-4 mt-2 px-4 md:max-w-3xl md:px-0">
      <VideoPlayer
        {...props}
        classNames={{
          video: "w-full rounded-lg safari-rounded-lg",
          image: "w-full rounded-lg safari-rounded-lg",
        }}
      />
    </div>
  )
}
