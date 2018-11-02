import AppBar from '@material-ui/core/AppBar'
import Grid from '@material-ui/core/Grid'
import * as React from 'react'

export default class Header extends React.Component {
    public render() {
        return (
            <AppBar position={"sticky"}>
                <Grid
                    container={true}
                    direction={'row'}
                    alignItems={'center'}
                >
                    <Grid
                        item={true}
                        justify={'flex-end'}
                    >
                        <h2>
                            _
                        </h2>
                    </Grid>
                </Grid>
            </AppBar>
        )
    }
}