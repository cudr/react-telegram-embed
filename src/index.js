import React, { Component } from 'react'

const styles = {
  width: '100%',
  frameBorder: '0',
  scrolling: 'no',
  border: 'none',
  overflow: 'hidden'
}

/**
 * Simple Component for Telegram embedding
 * @extends Component
 */

class TelegramEmbed extends Component {
  constructor(props) {
    super(props)

    this.state = {
      src: this.props.src,
      id: '',
      height: '80px'
    }

    this.urlObj = document.createElement('a')

  }

  componentDidMount() {
    window.addEventListener('message', this.messageHandler)
    this.messageHandler = this.messageHandler.bind(this);
    
    this.iFrame.addEventListener('load', () => {

      this.checkFrame(this.state.id)
    })
  }

  componentWillUnmount() {
    window.removeEventListener('message', this.messageHandler)
  }

  messageHandler({ data, source }) {
    if (!data || typeof data !== 'string' || source !== this.iFrame.contentWindow) {
      return
    }

    const action = JSON.parse(data)

    if (action.event === 'resize' && action.height) {
      this.setState({
        height: action.height + 'px',
      })
    }
  }

  checkFrame(id) {
    this.iFrame.contentWindow.postMessage(JSON.stringify({ event: 'visible', frame: id }), '*')
  }

  componentWillReceiveProps({ src }) {
    if (this.state.src !== src) {
      this.urlObj.href = src
      const id = `telegram-post${this.urlObj.pathname.replace(/[^a-z0-9_]/ig, '-')}`

      this.setState({ src, id }, () =>
        this.checkFrame(id)
      )
    }
  }

  render () {
    const { src, height } = this.state
    const { container } = this.props

    return (
      <div data-sharing-id={container}>
        <iframe
          ref={node => this.iFrame = node}
          src={src + '?embed=1'}
          height={height}
          id={'telegram-post' + this.urlObj.pathname.replace(/[^a-z0-9_]/ig, '-')}
          style={styles}
        />
      </div>
    )
  }
}

export default TelegramEmbed
