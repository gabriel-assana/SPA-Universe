export class Router {
  routes = {}

  add(routeName, page) {
    this.routes[routeName] = page
  }

  route(event) {
    event = event || window.event
    event.preventDefault()

    window.history.pushState({}, '', event.target.href)

    this.handle()
  }

  handle() {
    const { pathname } = window.location
    const route = this.routes[pathname] || this.routes[404]
    let pageName = String(this.routes[pathname]).split('/pages/').pop()
    pageName = pageName.split('.').shift()

    fetch(route)
      .then(data => data.text())
      .then(html => {
        document.querySelector('#app').innerHTML = html
        document.querySelector('main').removeAttribute('class')
        document.querySelector('main').classList.toggle(pageName)

        if (this.routes[pathname] != undefined) {
          console.log(this.routes[pathname])
          document.body.style.background = `url('./images/${pageName}-bg.webp') 0% 0% / cover no-repeat`
        } else {
          document.body.style.background = `url('./images/home-bg.webp') 0% 0% / cover no-repeat`
        }
      })
  }
}
