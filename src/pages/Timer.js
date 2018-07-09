import React from 'react'

export default class Timer extends React.Component {

  constructor(props) {
    super(props)
    this.state = { timer: 5, timeLeft: 0 }
  }

  start = async () => {
    if( ! Notification ) return alert("Tu browser no soporta notificationes")

    if( Notification.permission === 'default' ) {
      await Notification.requestPermission()
    }

    if( Notification.permission !== 'granted' ) {
      alert("Tienes que aceptar el permiso de notificaciones")
      return;
    }

    var timer = this.state.timer
    this.setState({ timeLeft: timer })

    var countdownInterval = setInterval(() => {
      timer = timer - 1;
      this.setState({ timeLeft: timer }) 
      if( timer <= 0 ) { 
        clearInterval(countdownInterval) 
        new Notification("Listo el timer!", { body: 'Yastá', img: '/static/icon.png' })
      }
    }, 1000)

  }

  handleChange = (e) => {
    this.setState({timer: e.target.value})
  }

  render () {
    const { timer, timeLeft } = this.state

    return <div className="Timer">
      <div className="name">Timer</div>
      { timeLeft === 0 ? 
        <div>
          <input type="number" min="0" max="999" step="1" value={timer} onChange={this.handleChange} />
          <button onClick={ this.start }>Start</button>
        </div>
      :
        <div>{ timeLeft }s</div>
      }
    </div>
  }
}
