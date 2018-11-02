import Modal from '@material-ui/core/Modal'
import { withStyles } from '@material-ui/core/styles'
import * as React from 'react'
import '../styles/custom-modal.css'

interface ITableModalProps {
    open?: boolean
    title?: string
    text?: string
    classes?: any
}

function rand() {
    return Math.round(Math.random() * 20) - 10
}
  
  
function getModalStyle() {
    const top = 50 + rand()
    const left = 50 + rand()
  
    return {
        left: `${left}%`,
        maxHeight: '50%',
        top: `${top}%`,
        transform: `translate(-${top}%, -${left}%)`,        
    }
}

const styles = theme => ({
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        maxHeight: '70%',
        overflowY: 'scroll' as 'scroll',
        padding: theme.spacing.unit * 4,
        position: 'absolute' as 'absolute',
        width: theme.spacing.unit * 60,
    },
})

class TableModal extends React.Component<ITableModalProps> {
    public state = {
        open: false,
    }

    public componentDidUpdate(previousProps) {
        if (this.props !== previousProps && this.props.title && this.props.text && this.state.open !== true) {
            this.setState({ open: true })
        }
    }

    public handleClose = () => {
        this.setState({ open: false })
    }

    public render() {
        const { classes, title, text } = this.props

        return (
            <div>
                <Modal
                    aria-labelledby='simple-modal-title'
                    aria-describedby='simple-modal-description'
                    open={this.state.open}
                    onClose={this.handleClose}
                    className='custom-modal'
                >
                <div style={getModalStyle()} className={classes.paper}>
                    <h6 className={'modal-title'}>
                        {title}
                    </h6>
                    <p className={'modal-description'}>
                        <ul className='active-list'>
                            {text && text.split('\n').map((line, i) => <li key={i}>{line}</li>)}
                        </ul>
                    </p>
                    <SimpleModalWrapped />
                </div>
            </Modal>
        </div>
        )
    }
}

const SimpleModalWrapped = withStyles(styles)(TableModal)

export default SimpleModalWrapped