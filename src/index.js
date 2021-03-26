/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react'
import styles from './styles.module.css'

export const ReactScroll = ({
  children,
  debug = false,
  width = 10,
  color = '#00000010'
}) => {
  const [showScroll, setShowScroll] = useState(false)
  const [barTop, setBarTop] = useState(100)
  const [barHeight, setBarHeight] = useState(200)
  const [wrapperHeight, setWrapperHeight] = useState(0)
  const [contentHeight, setContentHeight] = useState(0)
  const [contentScroll, setContentScroll] = useState(0)

  const [mouseConnected, setMouseConnected] = useState(false)

  const [refWrapper, setRefWrapper] = useState(null)
  const [refContent, setRefContent] = useState(null)

  const [moveY, setmoveY] = useState(0)

  useEffect(() => {
    const observer = new ResizeObserver(update)
    if (refContent) {
      update()
      observer.observe(refContent)
    }

    document.addEventListener('mouseup', () => setMouseConnected(false))
    document.addEventListener('mousemove', (ev) => setmoveY(ev.movementY))

    return () => {
      if (refContent) {
        observer.unobserve(refContent)
      }
    }
  }, [refContent])

  useEffect(() => {
    if (refContent) {
      if (mouseConnected) {
        refContent.scrollTop =
          refContent.scrollTop +
          moveY / (refWrapper.clientHeight / refContent.scrollHeight)
      }
    }
  }, [moveY])

  function handlerScroll() {
    update()
  }

  function handlerMouseDown() {
    setMouseConnected(true)
  }

  function update() {
    setBarTop(0)

    setContentHeight(refContent.scrollHeight)
    setContentScroll(refContent.scrollTop)
    setWrapperHeight(refWrapper.clientHeight)

    setBarHeight(
      (refWrapper.clientHeight / refContent.scrollHeight) *
        refWrapper.clientHeight
    )

    setBarTop(
      (refWrapper.clientHeight / refContent.scrollHeight) * refContent.scrollTop
    )

    if (refWrapper.clientHeight < refContent.scrollHeight) {
      setShowScroll(true)
    } else {
      setShowScroll(false)
    }
  }

  return (
    <div
      ref={setRefWrapper}
      style={{ userSelect: mouseConnected ? 'none' : 'inherit' }}
      className={styles.scrollWrapper}
    >
      <div
        ref={setRefContent}
        onScroll={handlerScroll}
        className={styles.scrollContent}
      >
        {children}
        {debug && (
          <div className={styles.debug}>
            {JSON.stringify({
              barTop
            })}
            {JSON.stringify({
              barHeight
            })}
            {JSON.stringify({
              wrapperHeight
            })}
            {JSON.stringify({
              contentHeight
            })}
            {JSON.stringify({
              contentScroll
            })}
            {JSON.stringify({
              mouseConnected
            })}
            {JSON.stringify({
              moveY
            })}
          </div>
        )}
      </div>
      {showScroll && (
        <div style={{ width: width }} className={styles.scrollBar}>
          <div
            onMouseDown={handlerMouseDown}
            style={{
              marginTop: barTop,
              height: barHeight,
              backgroundColor: color
            }}
            className={styles.scrollTracker}
          />
        </div>
      )}
    </div>
  )
}
