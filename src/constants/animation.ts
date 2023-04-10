const backdrop = {
  hidden: {
    y: '-500px',
    opacity: 0,
  },
  visible: {
    y: '0px',
    opacity: 1,
    transition: {
      delay: 0.1,
      duration: 0.8,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.7,
    },
  },
}

export default backdrop
