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