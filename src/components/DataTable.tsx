import * as React from 'react'
import { Cell, Row, StickyTable } from 'react-sticky-table'
import '../styles/custom-table.css'
import '../styles/react-sticky-table.css'

export default class DataTable extends React.Component {
  public state = {
    columnHeaders: [],
    containerHeight: null,
    rowHeaders: [],
    rows: [],
    table: null,
  }
  public componentWillMount() {
    fetch('/local/data.json')
      .then(response => response.json())
      .then(json => {
        this.setState({
          columnHeaders: json.columnHeaders,
          rowHeaders: json.rowHeaders,
          rows: json.rows,
        })
        this._checkData()
      })
  }

  public _checkData() {
    console.log(`Column Headers: `, this.state.columnHeaders)
    console.log(`Row Headers:`, this.state.rowHeaders)
    console.log(`Rows: `, this.state.rows)
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
            <Cell className={'custom-cell'} key={`header_${i}`}>{value}</Cell>
          )
        }
      </Row>
    )
  }

  public renderRows() {
    const { rowHeaders, rows } = this.state

    return (
      rowHeaders.map((rowHeader, i) => {
        const row = rows[i]
        return (
          <Row className='custom-row' key={`row-${i}`}>
                <Cell className={'custom-cell'}>{rowHeader}</Cell>
                {row.map((value, i2) => {
                  return (
                    <Cell className={'custom-cell'} key={`cell-${i}-${i2}`}>{value}</Cell>
                  )
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
    const { columnHeaders, rowHeaders, rows, containerHeight } = this.state
    if (columnHeaders.length > 0 && rowHeaders.length > 0 && rows.length > 0 && containerHeight) {
      return (
        <div style={{ maxWidth: '100%' }}>
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
