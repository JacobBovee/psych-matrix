import * as React from 'react'
import { Cell, Row, StickyTable } from 'react-sticky-table'
import '../styles/custom-table.css'
import '../styles/react-sticky-table.css'
import Modal from './Modal'

export default class DataTable extends React.Component {
  public state = {
    columnHeaders: [],
    containerHeight: null,
    modalText: '',
    modalTitle: '',
    rowHeaders: [],
    rows: [],
    table: null,
  }

  public stripLinking = (text) => {
    return text.map(line => line.split('\n').map(subLine => subLine.split('.').slice(1)).join('\n'))
  }

  public componentWillMount() {
    fetch('/local/data.json')
      .then(response => response.json())
      .then(json => {
        this.setState({
          columnHeaders: json.columnHeaders,
          rowHeaders: json.rowHeaders,
          rows: json.rows.map(row => this.stripLinking(row)),
        })
      })
  }

  public containerHeight = () => {
    const container = document.getElementsByTagName('body') || null
    const header = document.getElementsByTagName('header') || null
    if (container && header) {
      return container[0].clientHeight - header[0].clientHeight
    }
    return null
  }

  public renderHeader() {
    const { columnHeaders } = this.state
    return (
      <Row className={'custom-header'}>
       <Cell className={'custom-cell disabled-cell'} />
        {
          columnHeaders.map((value, i) =>
            <Cell className={'custom-cell header-cell header-border'} key={`header_${i}`}>{value}</Cell>
          )
        }
      </Row>
    )
  }

  public updateAndOpenModal = (value, rowI, colI) => event => {
      const { rowHeaders, columnHeaders } = this.state

      this.setState({
        modalText: value,
        modalTitle: `${rowHeaders[rowI]} and ${columnHeaders[colI]}`,
      })
  }

  public renderRows() {
    const { rowHeaders, rows } = this.state

    return (
      rowHeaders.map((rowHeader, i) => {
        const row = rows[i]
        return (
          <Row className='custom-row' key={`row-${i}`}>
                <Cell className={'custom-cell header-cell'}>{rowHeader}</Cell>
                {row.map((value, i2) => {
                  if (value.length > 0) {
                    return (
                      <Cell className={'custom-cell'} key={`cell-${i}-${i2}`} onClick={this.updateAndOpenModal(value, i, i2)}>{value.slice(0, 30)}...</Cell>
                    )
                  }
                  else {
                    return (
                      <Cell className={'custom-cell empty-cell'} key={`cell-${i}-${i2}`} />
                    )
                  }
                })}
          </Row>
        )
      })
    )
  }

  public componentDidMount() {
    window.addEventListener("resize", () => this.setState({ containerHeight: this.containerHeight() }))
    this.setState({ containerHeight: this.containerHeight() })
  }


  public render() {
    const { columnHeaders, rowHeaders, rows, containerHeight, modalText, modalTitle } = this.state

    if (columnHeaders.length > 0 && rowHeaders.length > 0 && rows.length > 0 && containerHeight) {
      return (
        <div style={{ maxWidth: '100%' }}>
          <Modal text={modalText} title={modalTitle} />
          <div style={{width: '100%', height: containerHeight}}>
            <StickyTable className={'custom-table'} stickyColumnCount={1} stickyHeaderCount={1}>
              { this.renderHeader() }
              { this.renderRows() }
            </StickyTable>
            </div>
          </div>
        )
      }
      else {
        return (
          <div className='loading' />
        )
      }
  }
}
