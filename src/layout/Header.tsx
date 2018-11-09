import AppBar from '@material-ui/core/AppBar'
import Grid from '@material-ui/core/Grid'
import * as React from 'react'
import '../styles/header-style.css'

export default class Header extends React.Component {
    public render() {
        return (
            <AppBar position={"sticky"}>
                <Grid
                    container={true}
                    direction={'row'}
                    alignItems={'center'}
                    justify={'center'}
                >
                    <Grid
                        item={true}
                        justify={'center'}
                        alignItems={'center'}
                    >
                        <h2 className={'header-title'}>
                            Mentor Matrix
                        </h2>
                    </Grid>
                </Grid>
            </AppBar>
        )
    }
}