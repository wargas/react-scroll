/* eslint-disable no-undef */
import React, { useCallback, useEffect, useState } from 'react'
import styles from './styles.module.css'

export const ReactScroll = ({ children }) => {
  const [showScroll, setShowScroll] = useState(false)
  const [barTop, setBarTop] = useState(100)
  const [barHeight, setBarHeight] = useState(200)
  const [wrapperHeight, setWrapperHeight] = useState(0)
  const [contentHeight, setContentHeight] = useState(0)
  const [contentScroll, setContentScroll] = useState(0)

  const [mouseConnected, setMouseConnected] = useState(false)

  const [refBar, setRefBar] = useState(null)
  const [refWrapper, setRefWrapper] = useState(null)
  const [refTraker, setRefTraker] = useState(null)
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
      {showScroll && (
        <div ref={setRefBar} className={styles.scrollBar}>
          <div
            ref={setRefTraker}
            onMouseDown={handlerMouseDown}
            style={{ marginTop: barTop, height: barHeight }}
            className={styles.scrollTracker}
          />
        </div>
      )}
      <div
        ref={setRefContent}
        onScroll={handlerScroll}
        className={styles.scrollContent}
      >
        <div style={{
          position: 'fixed',
          right: 0,
          bottom: 0,
          width: 200,
          backgroundColor: '#00000035',
          padding: 10,
            color: 'white'
        }}>
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
        {children}
      </div>
    </div>
  )
}
