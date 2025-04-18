// app web
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js')
        .then(reg => console.log('✅ Service Worker ro‘yxatdan o‘tdi', reg))
        .catch(err => console.error('❌ Xatolik:', err));
}




const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('three-bg').appendChild(renderer.domElement);

// Particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 5000;

const posArray = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 10;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.03,
    color: 0x6c5ce7,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

camera.position.z = 1;

function animate() {
    requestAnimationFrame(animate);
    
    particlesMesh.rotation.x += 0.0002;
    particlesMesh.rotation.y += 0.0003;
    
    renderer.render(scene, camera);
}

animate();



// Handle window resize   
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});



// Dark/Light mode toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    body.classList.add(currentTheme);
    updateIcon();
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const theme = body.classList.contains('dark-mode') ? 'dark-mode' : '';
    localStorage.setItem('theme', theme);
    updateIcon();
});

function updateIcon() {
    if (body.classList.contains('dark-mode')) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
}




// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';

    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

document.querySelectorAll('a, button, .project-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursor.style.borderColor = '#fd79a8';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorFollower.style.backgroundColor = 'rgba(253, 121, 168, 0.5)';
    });
    el.addEventListener('mouseleave', () => {
     

        cursor.style.transform = 'scale(1)';
        cursor.style.borderColor = '#fd79a8';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorFollower.style.backgroundColor = 'rgba(253, 121, 168, 0.3)';
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll progress indicator
window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / (scrollHeight - clientHeight)) * 100;
    document.querySelector('.scroll-progress').style.width = scrollPercent + '%';
});



const skillBars = document.querySelectorAll('.skill-progress');

function animateSkillBars() {
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
}


const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            if (entry.target.classList.contains('skills') || entry.target.classList.contains('about-text')) {
                animateSkillBars();
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.about-content, .project-card, .contact-container').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    observer.observe(el);
});





const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    

    console.log('Form submitted:', data);
    
    alert('Xabaringiz muvaffaqiyatli yuborildi! Tez orada siz bilan bog\'lanamiz.');
    contactForm.reset();
});



const projectGrid=document.querySelector(".projects-grid")

const projectCard=document.querySelector(".project-card")

const projectData=[
    {
    Image:"https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    title:"E-commerce sayt",
    info:"To'liq funksional onlayn do'kon tizimi React va Node.js asosida ishlab chiqilgan. Mahsulotlar filtirlashi, savat va to'lov tizimi mavjud.",
    tags:["React","Node.js","MongoDB","Redux"],
    demo:"#",
    kod:"#"
    },
    {
        Image:"https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
        title:"Portfolio dizayni",
        info:"Zamonaviy va interaktiv portfolio sayti Vue.js va GSAP bilan ishlab chiqilgan. Animatsiyalar va 3D effektlar bilan jihozlangan.",
        tags:["Vue.js","GSAP","SCSS","Three.js"],
        demo:"#",
        kod:"#"
        },
        {
            Image:"https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            title:"Mobil ilova",
            info:"iOS va Android uchun React Native bilan ishlab chiqilgan ilova. Firebase orqali real vaqt rejimida ma'lumotlar almashinuvi.",
            tags:["React Native","Firebase","Redux","Expo"],
            demo:"#",
            kod:"#"
            },
            {
                Image:"https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
                title:"Mobil ilova",
                info:"iOS va Android uchun React Native bilan ishlab chiqilgan ilova. Firebase orqali real vaqt rejimida ma'lumotlar almashinuvi.",
                tags:["React Native","Firebase","Redux","Expo"],
                demo:"#",
                kod:"#"
            }

]


const dataFunk = (data) => {
    projectGrid.innerHTML = ""; 
  
    data.forEach((item) => {
      projectGrid.innerHTML += `
        
        <div class="project-card  swiper-slide ">
          <div class="project-image">
            <img src="${item.Image}" alt="${item.title}">
            <div class="project-overlay">
              <h3>${item.title}</h3>
            </div>
          </div>
          <div class="project-info">
            <h3>${item.title}</h3>
            <p>${item.info}</p>
            <div class="project-tags">
              ${item.tags.map(item => `<span class="project-tag">${item}</span>`).join("")}
            </div>
            <div class="project-links">
              <a href="${item.demo}" target="_blank"><i class="fas fa-eye"></i> Demo</a>
              <a href="${item.kod}" target="_blank"><i class="fab fa-github"></i> Kod</a>
            </div>
          </div>
        </div>
      `;
    });
  };
  
  dataFunk(projectData);




  var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      }
    }
  });
  
  




const menuButtons = document.querySelectorAll('.menuBut');

menuButtons.forEach(button => {
  button.addEventListener('click', () => {
 
    menuButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
  });
});

















