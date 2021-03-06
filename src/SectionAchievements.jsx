import React, { Fragment, useContext, useEffect } from 'react'
import Timeline from './Timeline'
import Context from './Context'

const SectionAchievements = () => {
  const { ui: { showDisplayInfo, setSectionInfo } } = useContext(Context)
  useEffect(() => {
    showDisplayInfo()
    setSectionInfo({
      name: 'SectionAchievements.jsx',
      fullPath: 'src/SectionAchievements.jsx',
      getViewSourceUrl: ({ baseUrl, fullPath }) => [baseUrl, fullPath].join('/')
    })
  }, [])
  return (
    <Fragment>
      <h2>Here are my biggest achievements</h2>
      <Timeline />
    </Fragment>
  )
}

export default SectionAchievements
