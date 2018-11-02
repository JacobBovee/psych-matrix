import Grid from '@material-ui/core/Grid'
import * as React from 'react'
import Header from './Header'

export default class Layout extends React.Component {
    public render() {
        const { children } = this.props

        return (
            <Grid container={true} style={{maxWidth: '100%'}}>
                <Header />
                { children }
            </Grid>
        )
    }
}