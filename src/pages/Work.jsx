import React, { useState, useRef } from 'react'
import { useReveal } from '../hooks/useReveal'
import styles from './Work.module.css'

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'branding', label: 'Branding' },
  { id: 'uxui', label: 'UX/UI' },
  { id: 'webgl', label: 'Web & WebGL' },
  { id: 'motion', label: '3D & Motion' }
]

const PROJECTS = [
  {
    id: 'kronos',
    title: 'Kronos Shader Engine',
    category: 'webgl',
    catLabel: 'Web & WebGL',
    tag: 'Featured Studio Project',
    year: '2024',
    metric: '+320% Shader FPS',
    desc: 'Real-time 3D shader pipeline & spatial canvas built for GPU-accelerated graphics rendering across web applications.',
    layout: 'hero'
  },
  {
    id: 'aura',
    title: 'Aura Health System',
    category: 'branding',
    catLabel: 'Branding · UX/UI',
    tag: 'Client Case Study',
    year: '2024',
    metric: 'Design Token System',
    desc: 'Complete visual identity redesign and multi-platform design token architecture.',
    layout: 'colLeft'
  },
  {
    id: 'nebula',
    title: 'Nebula Telemetry',
    category: 'uxui',
    catLabel: 'UX/UI & WebGL',
    tag: 'Studio Project',
    year: '2024',
    metric: '<16ms Render Latency',
    desc: 'High-density telemetry interface featuring customizable node graphs and glass UI widgets.',
    layout: 'colRightStagger'
  },
  {
    id: 'vortex',
    title: 'Vortex Spatial Kinetics',
    category: 'motion',
    catLabel: '3D & Motion',
    tag: 'Client Case Study',
    year: '2024',
    metric: '4K Spatial Render',
    desc: 'Photorealistic 3D product motion systems and interactive asset pipeline for physical hardware.',
    layout: 'hero'
  }
]

export default function Work ({ onOpenProject }) {
  const [activeCategory, setActiveCategory] = useState('all')
  const headerRef = useRef()
  useReveal(headerRef)

  const filteredProjects = activeCategory === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeCategory)

  return (
    <section id="work" className={styles.section}>
      <div className={styles.container}>
        <div ref={headerRef} className={`${styles.header} reveal`}>
          <span className={`${styles.eyebrow} mono`}>SELECTED WORK</span>
          <h2 className={styles.title}>Projects & <em>Case Studies</em></h2>
          <p className={styles.subtext}>
            Digital presences, brand identities, and high-performance WebGL platforms built for ambition.
          </p>

          {/* Category Filter Bar */}
          <div className={styles.filterBar}>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                className={`${styles.filterChip} ${activeCategory === cat.id ? styles.filterChipActive : ''}`}
                onClick={() => setActiveCategory(cat.id)}
                data-cursor
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Asymmetric Editorial Project Grid */}
        <div className={styles.projectGrid}>
          {filteredProjects.map((project, i) => {
            const cardRef = useRef()
            useReveal(cardRef, i * 0.08)

            const layoutClass = activeCategory === 'all' ? styles[project.layout] : ''

            return (
              <div
                key={project.id}
                ref={cardRef}
                className={`${styles.projectCard} ${layoutClass} reveal`}
                onClick={() => onOpenProject && onOpenProject(project)}
                data-cursor
              >
                <div className={styles.cardHeader}>
                  <span className={`${styles.projectTag} mono`}>{project.tag}</span>
                  <span className={`${styles.projectYear} mono`}>{project.year}</span>
                </div>

                <div className={styles.cardBody}>
                  <span className={`${styles.projectCat} mono`}>{project.catLabel}</span>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <p className={styles.projectDesc}>{project.desc}</p>
                </div>

                <div className={styles.cardFooter}>
                  <span className={`${styles.metricTag} mono`}>{project.metric}</span>
                  <span className={styles.arrowIcon}>→</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
