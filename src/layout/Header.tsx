import AppBar from '@material-ui/core/AppBar'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import ArrowBack from '@material-ui/icons/ArrowBack'
import * as React from 'react'

export default class Header extends React.Component {
    public render() {
        return (
            <AppBar position={"sticky"}>
                <Grid
                    container={true}
                    direction={'row'}
                    alignItems={'center'}
                    style={{
                        backgroundColor: '#ccc',
                    }}
                >
                    <Grid
                        item={true}
                    >
                        <IconButton>
                            <ArrowBack />
                        </IconButton>
                    </Grid>
                    <Grid
                        item={true}
                        justify={'flex-end'}
                    >
                        <h2
                            style={{
                                color: 'black',
                            }}
                        >
                            Matrix
                        </h2>
                    </Grid>
                </Grid>
            </AppBar>
        )
    }
}