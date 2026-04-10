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

toggleTabs('.tab-trigger', '.tab-content')

// modal

const modal = document.getElementById('modal');
const openBtns = document.querySelectorAll('button[data-modal]');
const closeBtn = document.getElementById('modal-close');

openBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  });
});

closeBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
  modal.classList.remove('flex');
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