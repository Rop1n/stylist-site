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
const submitBtn = document.getElementById('submit-btn');
const successMessage = document.getElementById('form-success');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  clearErrors();
  successMessage.classList.add('hidden');

  const name = form.querySelector('input[name="name"]').value.trim();

  let hasError = false;

  if (!name) {
    showError('name-error', 'Введите имя');
    hasError = true;
  }

  if (!mask.masked.isComplete) {
    showError('phone-error', 'Введите корректный номер телефона');
    hasError = true;
  }

  if (hasError) return;

  // 🔒 Блокируем кнопку
  submitBtn.disabled = true;
  submitBtn.textContent = 'Отправка...';

  try {
    const data = new FormData(form);

    const res = await fetch(form.action, {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    });

    if (res.ok) {
      form.reset();
      mask.value = '';
      clearErrors();

      // ✅ Показываем сообщение
      successMessage.classList.remove('hidden');

      // (опционально) закрыть модалку через время
      setTimeout(() => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
      }, 500);

    } else {
      showError('phone-error', 'Ошибка отправки формы');
    }

  } catch {
    showError('phone-error', 'Ошибка сети');
  } finally {
    // 🔓 Разблокируем кнопку
    submitBtn.disabled = false;
    submitBtn.textContent = 'Оставить заявку';
  }
});


const phoneInput = document.querySelector('input[name="phone-number"]');

const mask = IMask(phoneInput, {
  mask: '+{7} (000) 000-00-00'
});

function showError(id, message) {
  const el = document.getElementById(id);
  el.textContent = message;
  el.classList.remove('hidden');
}

function clearErrors() {
  document.querySelectorAll('[id$="-error"]').forEach(el => {
    el.textContent = '';
    el.classList.add('hidden');
  });
}

console.log(document.getElementById('name-error'));
console.log(document.getElementById('phone-error'));