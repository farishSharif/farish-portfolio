/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollDown = window.scrollY

  sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
        
        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        }else{
            sectionsClass.classList.remove('active-link')
        }                                                    
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
//     reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.skills__data, .work__img, .contact__input',{interval: 200});

const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;
const icon = themeToggle.querySelector('i');

// Load saved theme
if (localStorage.getItem('theme') === 'light') {
  root.classList.add('light-mode');
  icon.classList.remove('fa-moon');
  icon.classList.add('fa-sun');
} else {
  root.classList.remove('light-mode');
  icon.classList.remove('fa-sun');
  icon.classList.add('fa-moon');
}

themeToggle.addEventListener('click', () => {
  root.classList.toggle('light-mode');
  if (root.classList.contains('light-mode')) {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
    localStorage.setItem('theme', 'light');
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
    localStorage.setItem('theme', 'dark');
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const workSlides = document.querySelectorAll('.work__slide');
  const workPrev = document.querySelector('.work__prev');
  const workNext = document.querySelector('.work__next');
  const workDotsContainer = document.querySelector('.work__dots');
  let workCurrent = 0;

  function showWorkSlide(index) {
    workSlides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    // Update dots
    if (workDotsContainer) {
      const dots = workDotsContainer.querySelectorAll('.work__dot');
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
    }
  }

  // Create dots
  if (workDotsContainer && workSlides.length) {
    workDotsContainer.innerHTML = '';
    workSlides.forEach((_, i) => {
      const dot = document.createElement('span');
      dot.classList.add('work__dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
        workCurrent = i;
        showWorkSlide(workCurrent);
      });
      workDotsContainer.appendChild(dot);
    });
  }

  if (workPrev && workNext && workSlides.length) {
    workPrev.addEventListener('click', () => {
      workCurrent = (workCurrent - 1 + workSlides.length) % workSlides.length;
      showWorkSlide(workCurrent);
    });

    workNext.addEventListener('click', () => {
      workCurrent = (workCurrent + 1) % workSlides.length;
      showWorkSlide(workCurrent);
    });

    showWorkSlide(workCurrent);
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  if (form) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      status.textContent = "Sending...";
      const formData = {
        name: form.name.value,
        email: form.email.value,
        message: form.message.value
      };

      try {
        const response = await fetch('http://localhost:3000/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        const result = await response.json();
        if (response.ok) {
          status.textContent = "Message sent!";
          form.reset();
        } else {
          status.textContent = "Failed to send. Try again.";
        }
      } catch (err) {
        status.textContent = "Failed to send. Try again.";
      }
    });
  }
});
