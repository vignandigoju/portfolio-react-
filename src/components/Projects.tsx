import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { projectsData, type Project } from '../data/projectsData'

interface ProjectsProps {
  darkMode?: boolean
}

const Projects = ({ darkMode = false }: ProjectsProps) => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  }

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-16 md:py-20 transition-colors duration-700 overflow-hidden"
      style={{
        backgroundColor: darkMode ? '#0A0A0A' : '#F8F8F8',
      }}
    >
      {/* Minimal Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: darkMode
              ? 'radial-gradient(circle at 2px 2px, rgba(255, 0, 0, 0.1) 1px, transparent 0)'
              : 'radial-gradient(circle at 2px 2px, rgba(255, 0, 0, 0.06) 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Compact Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <motion.span
              className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4"
              style={{
                backgroundColor: darkMode ? 'rgba(255, 0, 0, 0.1)' : 'rgba(255, 0, 0, 0.08)',
                color: '#FF0000',
              }}
            >
              PORTFOLIO
            </motion.span>
            <h2
              className="text-4xl md:text-5xl font-black mb-3"
              style={{ color: darkMode ? '#FFFFFF' : '#000000' }}
            >
              Projects
            </h2>
            <div
              className="w-16 h-1 mx-auto rounded-full"
              style={{ backgroundColor: '#FF0000' }}
            />
          </motion.div>

          {/* Compact Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projectsData.map((project, index) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="group relative cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <motion.div
                  className="relative rounded-2xl p-6 h-full"
                  style={{
                    backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.9)',
                    border: `2px solid ${darkMode ? 'rgba(255, 0, 0, 0.2)' : 'rgba(255, 0, 0, 0.15)'}`,
                  }}
                  whileHover={{
                    y: -8,
                    borderColor: '#FF0000',
                    boxShadow: darkMode
                      ? '0 20px 40px rgba(255, 0, 0, 0.2)'
                      : '0 20px 40px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  {/* Number Badge */}
                  <div className="flex items-start justify-between mb-4">
                    <span
                      className="text-4xl font-black opacity-20"
                      style={{ color: darkMode ? '#FFFFFF' : '#000000' }}
                    >
                      0{index + 1}
                    </span>
                    {project.featured && (
                      <motion.div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: '#FF0000' }}
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [1, 0.5, 1],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </div>

                  {/* Title */}
                  <h3
                    className="text-xl font-black mb-2 line-clamp-2"
                    style={{ color: darkMode ? '#FFFFFF' : '#000000' }}
                  >
                    {project.title}
                  </h3>

                  {/* Subtitle */}
                  <p
                    className="text-sm font-semibold mb-3 line-clamp-1"
                    style={{ color: '#FF0000' }}
                  >
                    {project.subtitle}
                  </p>

                  {/* Short Description */}
                  <p
                    className="text-sm leading-relaxed mb-4 line-clamp-2"
                    style={{ color: darkMode ? '#B8B8B8' : '#4A4A4A' }}
                  >
                    {project.description}
                  </p>

                  {/* Quick Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {Object.entries(project.techStack)
                      .flatMap(([_, techs]) => techs || [])
                      .slice(0, 3)
                      .map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 rounded text-xs font-medium"
                          style={{
                            backgroundColor: darkMode ? 'rgba(255, 0, 0, 0.1)' : 'rgba(255, 0, 0, 0.08)',
                            color: darkMode ? '#FF6666' : '#CC0000',
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    <span
                      className="px-2 py-1 rounded text-xs font-bold"
                      style={{ color: '#FF0000' }}
                    >
                      +{Object.entries(project.techStack).flatMap(([_, techs]) => techs || []).length - 3}
                    </span>
                  </div>

                  {/* View Details Button */}
                  <motion.button
                    className="w-full py-2.5 rounded-lg font-bold text-sm flex items-center justify-center gap-2"
                    style={{
                      backgroundColor: darkMode ? 'rgba(255, 0, 0, 0.1)' : 'rgba(255, 0, 0, 0.08)',
                      color: '#FF0000',
                      border: `1px solid ${darkMode ? 'rgba(255, 0, 0, 0.3)' : 'rgba(255, 0, 0, 0.2)'}`,
                    }}
                    whileHover={{
                      backgroundColor: '#FF0000',
                      color: '#FFFFFF',
                    }}
                  >
                    View Details
                    <motion.svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      whileHover={{ x: 3 }}
                    >
                      <line x1="5" y1="12" x2="19" y2="12"/>
                      <polyline points="12 5 19 12 12 19"/>
                    </motion.svg>
                  </motion.button>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Modal/Popup for Project Details */}
      <AnimatePresence>
        {selectedProject && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40"
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                backdropFilter: 'blur(10px)',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
            />

            {/* Modal */}
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                className="relative max-w-4xl w-full rounded-3xl p-8 md:p-12 my-8"
                style={{
                  backgroundColor: darkMode ? '#0A0A0A' : '#FFFFFF',
                  border: `2px solid #FF0000`,
                  maxHeight: '90vh',
                  overflowY: 'auto',
                }}
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
                transition={{ type: "spring", duration: 0.5 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <motion.button
                  className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: darkMode ? 'rgba(255, 0, 0, 0.1)' : 'rgba(255, 0, 0, 0.08)',
                    color: '#FF0000',
                  }}
                  whileHover={{
                    backgroundColor: '#FF0000',
                    color: '#FFFFFF',
                    rotate: 90,
                  }}
                  onClick={() => setSelectedProject(null)}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </motion.button>

                {/* Modal Content */}
                <div>
                  {/* Header */}
                  <div className="mb-6">
                    {selectedProject.featured && (
                      <motion.span
                        className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4"
                        style={{
                          backgroundColor: '#FF0000',
                          color: '#FFFFFF',
                        }}
                      >
                        ⭐ FEATURED PROJECT
                      </motion.span>
                    )}
                    <h3
                      className="text-3xl md:text-4xl font-black mb-3"
                      style={{ color: darkMode ? '#FFFFFF' : '#000000' }}
                    >
                      {selectedProject.title}
                    </h3>
                    <p
                      className="text-lg font-semibold mb-4"
                      style={{ color: '#FF0000' }}
                    >
                      {selectedProject.subtitle}
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <span style={{ color: darkMode ? '#666' : '#999' }}>
                        Status: <span className="font-bold" style={{ color: darkMode ? '#E5E5E5' : '#2D2D2D' }}>
                          {selectedProject.status}
                        </span>
                      </span>
                      <span style={{ color: darkMode ? '#666' : '#999' }}>•</span>
                      <span style={{ color: darkMode ? '#666' : '#999' }}>
                        Year: <span className="font-bold" style={{ color: darkMode ? '#E5E5E5' : '#2D2D2D' }}>
                          {selectedProject.year}
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p
                    className="text-base leading-relaxed mb-8"
                    style={{
                      color: darkMode ? '#B8B8B8' : '#4A4A4A',
                      lineHeight: '1.8',
                    }}
                  >
                    {selectedProject.description}
                  </p>

                  {/* Key Features */}
                  <div className="mb-8">
                    <h4
                      className="text-xl font-black mb-4"
                      style={{ color: darkMode ? '#FFFFFF' : '#000000' }}
                    >
                      Key Features
                    </h4>
                    <div className="space-y-3">
                      {selectedProject.features.map((feature, i) => (
                        <motion.div
                          key={i}
                          className="flex items-start gap-3 p-3 rounded-lg"
                          style={{
                            backgroundColor: darkMode ? 'rgba(255, 0, 0, 0.05)' : 'rgba(255, 0, 0, 0.03)',
                          }}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <div
                            className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                            style={{ backgroundColor: '#FF0000' }}
                          />
                          <span
                            className="text-sm leading-relaxed"
                            style={{ color: darkMode ? '#E5E5E5' : '#2D2D2D' }}
                          >
                            {feature}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="mb-8">
                    <h4
                      className="text-xl font-black mb-4"
                      style={{ color: darkMode ? '#FFFFFF' : '#000000' }}
                    >
                      Technologies Used
                    </h4>
                    {Object.entries(selectedProject.techStack).map(([category, techs]) => (
                      techs && techs.length > 0 && (
                        <div key={category} className="mb-4">
                          <h5
                            className="text-xs font-bold uppercase tracking-wide mb-2"
                            style={{ color: '#FF0000' }}
                          >
                            {category}
                          </h5>
                          <div className="flex flex-wrap gap-2">
                            {techs.map((tech, i) => (
                              <motion.span
                                key={i}
                                className="px-3 py-1.5 rounded-lg text-sm font-medium"
                                style={{
                                  backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
                                  color: darkMode ? '#E5E5E5' : '#2D2D2D',
                                  border: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)'}`,
                                }}
                                whileHover={{
                                  backgroundColor: darkMode ? 'rgba(255, 0, 0, 0.1)' : 'rgba(255, 0, 0, 0.08)',
                                  borderColor: '#FF0000',
                                }}
                              >
                                {tech}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                      )
                    ))}
                  </div>

                  {/* Highlights */}
                  <div>
                    <h4
                      className="text-xl font-black mb-4"
                      style={{ color: darkMode ? '#FFFFFF' : '#000000' }}
                    >
                      Project Highlights
                    </h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      {selectedProject.highlights.map((highlight, i) => (
                        <motion.div
                          key={i}
                          className="text-center p-4 rounded-xl"
                          style={{
                            backgroundColor: darkMode ? 'rgba(255, 0, 0, 0.05)' : 'rgba(255, 0, 0, 0.03)',
                            border: `1px solid ${darkMode ? 'rgba(255, 0, 0, 0.2)' : 'rgba(255, 0, 0, 0.15)'}`,
                          }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <div
                            className="text-3xl font-black mb-2"
                            style={{ color: '#FF0000' }}
                          >
                            {highlight.value}
                          </div>
                          <div
                            className="text-sm font-semibold"
                            style={{ color: darkMode ? '#666' : '#999' }}
                          >
                            {highlight.label}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Projects
