import React, { useState } from 'react'
import { BsFillShiftFill } from 'react-icons/bs';

const SrcollToTopBtn = props => {
  const [showScroll, setshowScroll] = useState(false);

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setshowScroll(true);
    }
    if (showScroll && window.pageYOffset <= 400) {
      setshowScroll(false);
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  window.addEventListener('scroll', checkScrollTop);
  
  return (
    
    <div className="scrollTop" style={{display: showScroll ? 'flex' : 'none'}} onClick={scrollToTop}>
      <BsFillShiftFill  />
    </div>

    
  )
}

SrcollToTopBtn.propTypes = {

}

export default SrcollToTopBtn
