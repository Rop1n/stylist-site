

function toggleTabs(tabsTriggerClass, tabsContentClass) {
  const tabsTriggers = document.querySelectorAll(tabsTriggerClass)
  const tabsContents = document.querySelectorAll(tabsContentClass)

  tabsContents.forEach(content => {
    content.classList.add('hidden')
  });

  tabsContents[0].classList.remove('hidden')


  tabsTriggers.forEach((trigger, idx) => {
    trigger.addEventListener('click', () => {
      tabsTriggers.forEach(t => t.classList.remove('active'))

      trigger.classList.add('active')

      tabsContents.forEach(content => {
        content.classList.add('hidden')
      });
      tabsContents[idx].classList.remove('hidden')
    })

  });



}

function toggleMenu() {
  const burger = document.querySelector("#burger")
  const menu = document.querySelector('#mobile-menu')
  const body = document.querySelector('body')
  burger.addEventListener('click', () => {
    burger.classList.toggle('active')
    menu.classList.toggle('hidden')
    menu.classList.toggle('flex')
    body.classList.toggle('overflow-hidden')
  })
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1023) {

      burger.classList.remove('active')
      menu.classList.add('hidden')
      menu.classList.remove('flex')
      body.classList.remove('overflow-hidden')
    }
  })
  const links = document.querySelectorAll("#mobile-link")
  links.forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('active')
      menu.classList.add('hidden')
      menu.classList.remove('flex')
      body.classList.remove('overflow-hidden')
    })
  })
}
toggleMenu()



mobileLinkClick()

toggleTabs('.tab-trigger', '.tab-content')

// modal

const modal = document.getElementById('modal');
const openBtns = document.querySelectorAll('button[data-modal]');
const closeBtns = document.querySelectorAll('[data-modal-close]');

openBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  });
});

closeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  });
});

const modalContent = document.getElementById('modal-content');

// Останавливаем клики внутри формы, чтобы они не доходили до родительского #modal
modalContent.addEventListener('click', (e) => {
  e.stopPropagation();
});



const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = new FormData(form);
  await fetch(form.action, {
    method: 'POST',
    body: data,
    headers: { 'Accept': 'application/json' }
  });
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  form.reset();
});