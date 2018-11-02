import * as React from 'react'
import * as Router from 'react-router-dom'
import DataTable from './components/DataTable'
import Layout from './layout'

const { Switch, Route } = Router

export default class App extends React.Component {

    public render() {
        return(
            <Layout>
                <Switch>
                    <Route exact={true} path='/' component={DataTable} />
                </Switch>
            </Layout>
        )
    }
}