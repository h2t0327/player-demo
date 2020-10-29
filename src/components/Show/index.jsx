import React from 'react'
import { Row, Col, Switch } from 'antd'

import { inject, observer } from 'mobx-react'
import './style.css'

@inject('xmplayer')
@observer
class Show extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      xmplayer: { playInfo },
    } = this.props

    return (
      <div className='show-component'>
        <div>
          <Row justify='center' type='flex'>
            <Col className='music-cover music-cover-vertical'>
              <img
                src={
                  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHIAAAByCAMAAAC4A3VPAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAB7UExURUdwTPsoAP8yAPsoAPooAPwoAPooAPooAP80APooAPsoAPooAPsoAPsoAP8vAP8xAP8pAP7+/vooAPpPL/tZO/t2XftvVfx7Y/oqA/2pmftWN/yejfyjk/75+fpCH/o0D/78/PyQfP7r5/7h3P23qv3Duf7TzPooAftlSOLYsMAAAAARdFJOUwBpDMv3VaneB+nEs5B6Gxow6AzlgwAAAnlJREFUeNrt21uPqjAUhuGCHETNHvsJUnWgHK3//xfuySaKdeiIRpbZk75XagxPinihrLLbXH8VLEIPL8gLF8HKd9mPuc7Sw4vzlo5ZnTsRpkhFznxY9ENMVugPLTHApAXfFvpnhombfejiOsLkRWttjQSiEtHVOuczUKRm/ecZgIZUwVn0QZbfifMQZIXdqXVAmMO+ciMQFrndIqmXuQRlasmY64E0z2U+aFM+W4G4FQtAXMAWIG7BQgwnk8PutnIrcJ04lbt75bgpZB4G21a84N+rY/Tta36/DW7yGAY7cFMpziXFCLFSuG2YjLmxLEdXnvERpRhJ1txci65mjNiqkeSG/1Ahu0tnzCIbiZHktj/+pZsLQuT9e7LhqvYEjCUT3tVuBM6J+Mi7Yu1MHGMBY4+SxVE/mKwHyEoCryN5Ar1ygDzgpeQeetsBMrWkJS1pSUv+JrL9vFP+SnJckpysIKjJFCAmj4KabCVoyeakCL6X2i8aAVjSkpa0pCUtaUlLWtKSlrTk/0Se6MmSnsxicpIXTfnVVvYvT0ae+PW9GV7ttTsI+RSkLLhWJQBANN0TNQWJHdfbXN3KKzEJKeuBv6ja/hZRTyZmMlOPkNgcr8Vdf1rbHBoZm8kaD5FClJeFZgcBmRz/HSVV0MhKmMlPI2lM5l3i8lgAQicTGMlKmkgPI+olaGQDI1lsMZzHQjyQTmalMJJ1DEPhs6MMIm/KHIbSJpUwtWABnk0IgScK3jGW4oM4/x0jRmwJ0pbk42LKec9QHP3oH/2AI/0YZ1cAogLqkVzM5rSDx0D0QTxeraI1/RA5/ag8+YYA2m0PiJz5mzd30G9h+Qsv130W/fujxgAAAABJRU5ErkJggg=='
                }
              />
            </Col>
          </Row>
          <Row justify='center' type='flex' className='text-center'>
            <Col className='music-info music-info-vertical'>
              <h1>{playInfo.title}</h1>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default Show
