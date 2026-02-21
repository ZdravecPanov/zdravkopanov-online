// Scrollspy for nav
    document.addEventListener('scroll', () => {
      const sections = document.querySelectorAll('main section');
      const navLinks = document.querySelectorAll('nav a');
      let activeIdx = 0;
      sections.forEach((sec,i)=>{
        if(window.scrollY + 160 >= sec.offsetTop) activeIdx = i;
      });
      navLinks.forEach((l,i)=>l.classList.toggle('active', i===activeIdx));
    });

    // CV modal
    const cvBtn = document.getElementById('cvBtn');
    const cvModal = document.getElementById('cvModal');
    const closeCV = document.getElementById('closeCV');

    cvBtn.addEventListener('click', () => cvModal.style.display='flex');
    closeCV.addEventListener('click', () => cvModal.style.display='none');
    window.addEventListener('click', (e) => { if(e.target===cvModal) cvModal.style.display='none'; });
